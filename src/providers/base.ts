import type { Config } from '../types';
import type { VideoAnalysisOptions } from '../types';
import { loadConfig, loadEnv } from '../config';
import OpenAI, { BadRequestError } from 'openai';
import { ApiKeyMissingError, ModelNotFoundError, NetworkError, ProviderError } from '../errors';
import { exhaustiveMatchGuard } from '../utils/exhaustiveMatchGuard';
import { chunkMessage } from '../utils/messageChunker';
import Anthropic from '@anthropic-ai/sdk';
import { stringSimilarity, getSimilarModels } from '../utils/stringSimilarity';
import { GoogleAuth } from 'google-auth-library';
import { existsSync, readFileSync } from 'fs';
import { execSync } from 'child_process';
import { once } from '../utils/once';
import { getAllProviders } from '../utils/providerAvailability';
import { isModelNotFoundError } from './notFoundErrors';

const TEN_MINUTES = 600000;
// Interfaces for Gemini response types
interface GeminiGroundingChunk {
  web?: {
    uri: string;
    title?: string;
  };
}

interface GeminiGroundingSupport {
  segment: {
    startIndex?: number;
    endIndex?: number;
    text: string;
  };
  groundingChunkIndices: number[];
  confidenceScores?: number[];
}

interface GeminiGroundingMetadata {
  groundingChunks: GeminiGroundingChunk[];
  groundingSupports: GeminiGroundingSupport[];
  webSearchQueries?: string[];
}

// Request body types for Google APIs
interface GoogleVertexAIRequestBody {
  contents: { role: string; parts: { text: string }[] }[];
  generationConfig: { maxOutputTokens: number };
  system_instruction?: { parts: { text: string }[] };
  tools?: { google_search: Record<string, never> }[];
}

interface GoogleGenerativeLanguageRequestBody {
  contents: { parts: { text: string }[] }[];
  generationConfig: { maxOutputTokens: number };
  system_instruction?: { parts: { text: string }[] };
  tools?: { google_search: Record<string, never> }[];
}

// Common options for all providers
export interface ModelOptions {
  model: string;
  maxTokens: number;
  systemPrompt?: string;
  tokenCount?: number; // For handling large token counts
  webSearch?: boolean; // Whether to enable web search capabilities
  timeout?: number; // Timeout in milliseconds for model API calls
  debug: boolean | undefined; // Enable debug logging
  reasoningEffort?: 'low' | 'medium' | 'high'; // Support for o1 and o3-mini reasoning effort
}

// Provider configuration in Config
export interface ProviderConfig {
  model?: string;
  maxTokens?: number;
  apiKey?: string;
  // OpenRouter-specific fields
  referer?: string;
  appName?: string;
  // Debug logging config
  debugLogMaxLength?: number; // Maximum length for debug log messages from this provider (in characters)
}

// Base provider interface that all specific provider interfaces will extend
export interface BaseModelProvider {
  executePrompt(prompt: string, options?: ModelOptions): Promise<string>;
  supportsWebSearch(
    modelName: string
  ): Promise<{ supported: boolean; model?: string; error?: string }>;
  // Add DETAILED token usage tracking
  tokenUsage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
  // Add this optional method for video analysis
  executeVideoPrompt?(prompt: string, options: VideoAnalysisOptions): Promise<string>;
}

// Base provider class with common functionality
export abstract class BaseProvider implements BaseModelProvider {
  protected config: Config;
  protected availableModels?: Promise<Set<string>>;
  // Add DETAILED token usage tracking
  tokenUsage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };

  constructor() {
    loadEnv();
    this.config = loadConfig();
  }

  /**
   * Resolves a model name to an available model from the provider.
   * This method implements a multi-step resolution process:
   * 1. Try exact match with provider prefix
   * 2. Try exact match within any provider namespace
   * 3. Try prefix matching with various provider prefixes
   * 4. Try handling special suffixes like -latest or -exp
   * 5. Try finding similar models based on string similarity
   *
   * If no match is found, it throws a ModelNotFoundError with helpful suggestions.
   *
   * @param options The model options containing the requested model name
   * @returns The resolved model name that can be used with the provider's API
   * @throws ModelNotFoundError if no matching model is found
   */
  protected async getModel(options: ModelOptions | undefined): Promise<string> {
    if (!options?.model) {
      throw new ModelNotFoundError(this.constructor.name.replace('Provider', ''));
    }

    // Handle token count if provided
    if (options?.tokenCount) {
      const { model: tokenModel, error } = this.handleLargeTokenCount(options.tokenCount);
      if (error) {
        throw new ProviderError(error);
      }
      if (tokenModel) {
        if (tokenModel !== options.model) {
          console.log(
            `Using ${tokenModel} instead of ${options.model} to support ${options.tokenCount} tokens.`
          );
        }
        options = { ...options, model: tokenModel };
      }
    }

    const model = options.model;

    // If models aren't initialized yet, return the requested model as-is
    if (!this.availableModels) {
      return model;
    }

    const availableModels = await this.availableModels;
    const modelWithoutPrefix = model.includes('/') ? model.split('/')[1] : model;

    // Try each resolution strategy in sequence
    const resolvedModel =
      this.tryExactMatch(model, availableModels) ||
      this.tryProviderNamespaceMatch(model, modelWithoutPrefix, availableModels) ||
      this.tryPrefixMatch(model, modelWithoutPrefix, availableModels) ||
      this.trySuffixHandling(model, availableModels) ||
      this.tryExperimentalSuffixHandling(model, availableModels);

    if (resolvedModel) {
      return resolvedModel;
    }

    // If all resolution attempts fail, try to find similar models
    const similarModels = this.findSimilarModels(model, modelWithoutPrefix, availableModels);

    // If we found similar models, check if any contain the exact model string
    if (similarModels.length > 0) {
      // Check if the first similar model contains our exact model string

      if (similarModels[0].includes(model)) {
        console.log(
          `[${this.constructor.name}] Model '${model}' not found. Using similar model '${similarModels[0]}' that contains requested model string.`
        );
        return similarModels[0];
      }

      throw new ModelNotFoundError(
        `Model '${model}' not found in ${this.constructor.name.replace('Provider', '')}.\n\n` +
          `You requested: ${model}\n` +
          `Similar available models:\n${similarModels.map((m) => `- ${m}`).join('\n')}\n\n` +
          `Use --model with one of the above models.` +
          (this.constructor.name === 'ModelBoxProvider' ||
          this.constructor.name === 'OpenRouterProvider'
            ? " Note: This provider requires provider prefixes (e.g., 'openai/gpt-4' instead of just 'gpt-4')."
            : '')
      );
    }

    // If no similar models found, show all available models sorted by recency
    const recentModels = Array.from(availableModels).sort((a: string, b: string) =>
      b.localeCompare(a)
    ); // Sort in descending order

    throw new ModelNotFoundError(
      `Model '${model}' not found in ${this.constructor.name.replace('Provider', '')}.\n\n` +
        `You requested: ${model}\n` +
        `Recent available models:\n${recentModels.map((m) => `- ${m}`).join('\n')}\n\n` +
        `Use --model with one of the above models.` +
        (this.constructor.name === 'ModelBoxProvider' ||
        this.constructor.name === 'OpenRouterProvider'
          ? " Note: This provider requires provider prefixes (e.g., 'openai/gpt-4' instead of just 'gpt-4')."
          : '')
    );
  }

  /**
   * Try to find an exact match for the model in the available models.
   * @param model The requested model name
   * @param availableModels Set of available models
   * @returns The matched model name or undefined if no match found
   */
  private tryExactMatch(model: string, availableModels: Set<string>): string | undefined {
    if (availableModels.has(model)) {
      return model;
    }
    return undefined;
  }

  /**
   * Try to find a match for the model within any provider namespace.
   * @param model The requested model name
   * @param modelWithoutPrefix The model name without provider prefix
   * @param availableModels Set of available models
   * @returns The matched model name or undefined if no match found
   */
  private tryProviderNamespaceMatch(
    model: string,
    modelWithoutPrefix: string,
    availableModels: Set<string>
  ): string | undefined {
    const exactMatchWithProvider = Array.from(availableModels).find((m) => {
      const parts = m.split('/');
      return parts.length >= 2 && parts[1] === modelWithoutPrefix;
    });

    if (exactMatchWithProvider) {
      console.log(
        `[${this.constructor.name}] Using fully qualified model name '${exactMatchWithProvider}' for '${model}'.`
      );
      return exactMatchWithProvider;
    }
    return undefined;
  }

  /**
   * Try to find a match using various prefix matching strategies.
   * @param model The requested model name
   * @param modelWithoutPrefix The model name without provider prefix
   * @param availableModels Set of available models
   * @returns The matched model name or undefined if no match found
   */
  private tryPrefixMatch(
    model: string,
    modelWithoutPrefix: string,
    availableModels: Set<string>
  ): string | undefined {
    const matchingModels = Array.from(availableModels).filter(
      (m) =>
        m === model || // Exact match with prefix
        m.startsWith(`openai/${model}`) || // Try with openai prefix (allow for versions like openai/o3-mini-v1)
        m.endsWith(`/${modelWithoutPrefix}`) || // Match with any prefix
        m === modelWithoutPrefix // Exact match without prefix
    );

    if (matchingModels.length > 0) {
      const resolvedModel = matchingModels[0];
      console.log(
        `[${this.constructor.name}] Using prefix match '${resolvedModel}' for '${model}'.`
      );
      return resolvedModel;
    }
    return undefined;
  }

  /**
   * Try to handle models with -latest suffix by finding the latest version.
   * @param model The requested model name
   * @param availableModels Set of available models
   * @returns The matched model name or undefined if no match found
   */
  private trySuffixHandling(model: string, availableModels: Set<string>): string | undefined {
    if (model.endsWith('-latest')) {
      const modelWithoutLatest = model.slice(0, -'-latest'.length);
      const latestMatches = Array.from(availableModels)
        .filter((m: string) => m.startsWith(modelWithoutLatest))
        .sort((a: string, b: string) => b.localeCompare(a));

      if (latestMatches.length > 0) {
        const resolvedModel = latestMatches[latestMatches.length - 1];
        console.log(
          `[${this.constructor.name}] Model '${model}' not found. Using latest match '${resolvedModel}'.`
        );
        return resolvedModel;
      }
    }
    return undefined;
  }

  /**
   * Try to handle models with -exp or -exp-* suffix by finding a non-experimental version.
   * @param model The requested model name
   * @param availableModels Set of available models
   * @returns The matched model name or undefined if no match found
   */
  private tryExperimentalSuffixHandling(
    model: string,
    availableModels: Set<string>
  ): string | undefined {
    const expMatch = model.match(/^(.*?)(?:-exp(?:-.*)?$)/);
    if (expMatch) {
      const modelWithoutExp = expMatch[1];
      const expMatches = Array.from(availableModels)
        .filter((m: string) => m.startsWith(modelWithoutExp))
        .sort((a: string, b: string) => b.localeCompare(a));

      if (expMatches.length > 0) {
        const resolvedModel = expMatches[expMatches.length - 1];
        console.log(
          `[${this.constructor.name}] Model '${model}' not found. Using non-experimental match '${resolvedModel}'.`
        );
        return resolvedModel;
      }
    }
    return undefined;
  }

  /**
   * Find similar models based on string similarity.
   * @param model The requested model name
   * @param modelWithoutPrefix The model name without provider prefix
   * @param availableModels Set of available models
   * @returns Array of similar model names
   */
  private findSimilarModels(
    model: string,
    modelWithoutPrefix: string,
    availableModels: Set<string>
  ): string[] {
    return getSimilarModels(model, availableModels);
  }

  protected getSystemPrompt(options?: ModelOptions): string | undefined {
    return (
      options?.systemPrompt || 'You are a helpful assistant. Provide clear and concise responses.'
    );
  }

  protected logRequestStart(
    options: ModelOptions,
    model: string,
    maxTokens: number,
    systemPrompt: string | undefined,
    endpoint: string,
    headers?: Record<string, string>
  ): void {
    this.debugLog(options, `Executing prompt with model: ${model}, maxTokens: ${maxTokens}`);
    this.debugLog(options, `API endpoint: ${endpoint}`);
    if (headers) {
      this.debugLog(options, 'Request headers:', this.truncateForLogging(headers));
    }
    if (systemPrompt) {
      this.debugLog(options, 'System prompt:', this.truncateForLogging(systemPrompt));
    }
  }

  protected handleLargeTokenCount(tokenCount: number): { model?: string; error?: string } {
    return {}; // Default implementation - no token count handling
  }

  protected debugLog(options: ModelOptions | undefined, message: string, ...args: any[]): void {
    if (options?.debug) {
      console.log(`[${this.constructor.name}] ${message}`, ...args);
    }
  }

  protected truncateForLogging(obj: any, maxLength?: number): string {
    const defaultMaxLength = 500;
    const configMaxLength = (this.config as Record<string, any>)[
      this.constructor.name.toLowerCase()
    ]?.debugLogMaxLength;
    const effectiveMaxLength = maxLength ?? configMaxLength ?? defaultMaxLength;

    const str = typeof obj === 'string' ? obj : JSON.stringify(obj, null, 2);
    if (str.length <= effectiveMaxLength) return str;
    return str.slice(0, effectiveMaxLength) + '... (truncated)';
  }

  /**
   * Determines if the given model supports the reasoning effort parameter.
   * Also checks the OVERRIDE_SAFETY_CHECKS environment variable to allow bypassing model restrictions.
   */
  protected doesModelSupportReasoningEffort(model: string): boolean {
    // If OVERRIDE_SAFETY_CHECKS is set, allow reasoning effort on any model
    const safetyOverride = process.env.OVERRIDE_SAFETY_CHECKS?.toLowerCase();
    if (safetyOverride === 'true' || safetyOverride === '1') {
      return true;
    }

    // Extract model name without provider prefix if present
    const modelWithoutPrefix = model.includes('/') ? model.split('/')[1] : model;

    // OpenAI models that support reasoning effort
    const openAIModelsSupported = modelWithoutPrefix.startsWith('o') || model.startsWith('o');

    // Claude models that support extended thinking
    const claudeModelsSupported =
      modelWithoutPrefix.includes('claude-opus-4') ||
      modelWithoutPrefix.includes('claude-sonnet-4') ||
      model.includes('claude-opus-4') ||
      model.includes('claude-sonnet-4');

    return openAIModelsSupported || claudeModelsSupported;
  }

  // Set token usage helper method for derived classes
  protected setTokenUsage(promptTokens: number, completionTokens: number): void {
    this.tokenUsage = {
      promptTokens,
      completionTokens,
      totalTokens: promptTokens + completionTokens,
    };

    // Log token usage when debug is enabled
    // Keep this log for debugging provider implementations
    console.log(
      `[${this.constructor.name}] Token usage set: ${promptTokens} prompt + ${completionTokens} completion = ${this.tokenUsage.totalTokens} total`
    );
  }

  abstract supportsWebSearch(
    modelName: string
  ): Promise<{ supported: boolean; model?: string; error?: string }>;
  abstract executePrompt(prompt: string, options: ModelOptions): Promise<string>;
  // Add executeVideoPrompt as optional here as well if not already present
  executeVideoPrompt?(prompt: string, options: VideoAnalysisOptions): Promise<string>;
}

// Helper function for exponential backoff retry
export async function retryWithBackoff<T>(
  operation: () => Promise<T>,
  maxAttempts: number = 5,
  baseDelay: number = 1000, // 1 second
  shouldRetry: (error: any) => boolean = () => true
): Promise<T> {
  let attempt = 1;
  while (true) {
    try {
      return await operation();
    } catch (error) {
      if (attempt >= maxAttempts || !shouldRetry(error)) {
        throw error;
      }
      const delay = baseDelay * Math.pow(2, attempt - 1); // Exponential backoff
      console.warn(`Attempt ${attempt} failed, retrying in ${delay}ms...`);
      await new Promise((resolve) => setTimeout(resolve, delay));
      attempt++;
    }
  }
}

// Base class for OpenAI-compatible providers (OpenAI and OpenRouter)
abstract class OpenAIBase extends BaseProvider {
  protected defaultClient: OpenAI;
  protected webSearchClient: OpenAI;

  constructor(
    apiKey: string,
    baseURL?: string,
    options?: { defaultHeaders?: Record<string, string> },
    webSearchOptions?: { baseURL?: string; defaultHeaders?: Record<string, string> }
  ) {
    super();
    this.defaultClient = new OpenAI({
      apiKey,
      ...(baseURL ? { baseURL } : {}),
      defaultHeaders: options?.defaultHeaders,
    });
    // Use the same client for web search by default
    this.webSearchClient = webSearchOptions
      ? new OpenAI({
          apiKey,
          baseURL: webSearchOptions.baseURL ?? baseURL,
          defaultHeaders: webSearchOptions.defaultHeaders ?? options?.defaultHeaders,
        })
      : this.defaultClient;
  }

  protected getClient(options: ModelOptions): OpenAI {
    if (options.webSearch) {
      return this.webSearchClient;
    }
    return this.defaultClient;
  }

  async supportsWebSearch(
    modelName: string
  ): Promise<{ supported: boolean; model?: string; error?: string }> {
    return {
      supported: false,
      error: 'OpenAI does not support web search capabilities',
    };
  }

  async executePrompt(prompt: string, options: ModelOptions): Promise<string> {
    const model = await this.getModel(options);
    const maxTokens = options.maxTokens;
    const systemPrompt = this.getSystemPrompt(options);
    const client = this.getClient(options);
    const startTime = Date.now();

    this.logRequestStart(
      options,
      model,
      maxTokens,
      systemPrompt,
      `${client.baseURL ?? 'https://api.openai.com/v1'}/chat/completions`
    );

    try {
      const messages = [
        ...(systemPrompt ? [{ role: 'system' as const, content: systemPrompt }] : []),
        { role: 'user' as const, content: prompt },
      ];

      this.debugLog(options, 'Request messages:', this.truncateForLogging(messages));

      const requestParams: any = {
        model,
        messages,
        ...(model.includes('o1') || model.includes('o3')
          ? {
              max_completion_tokens: maxTokens,
            }
          : {
              max_tokens: maxTokens,
            }),
      };

      // Add reasoning_effort parameter for o1 or o3-mini models if specified
      if (this.doesModelSupportReasoningEffort(model) && options?.reasoningEffort) {
        requestParams.reasoning_effort = options.reasoningEffort;
        this.debugLog(options, `Using reasoning_effort: ${options.reasoningEffort}`);
      } else if (options?.reasoningEffort) {
        console.log(
          `Model ${model} does not support reasoning effort. Parameter will be ignored. Set OVERRIDE_SAFETY_CHECKS=true to bypass this check and pass the reasoning effort parameter to the provider API`
        );
      }

      // Log full request parameters in debug mode
      this.debugLog(options, 'Full request parameters:', this.truncateForLogging(requestParams));

      const response = await client.chat.completions.create(requestParams);

      const endTime = Date.now();
      this.debugLog(options, `API call completed in ${endTime - startTime}ms`);
      this.debugLog(options, 'Response:', this.truncateForLogging(response));

      // Track token usage if available
      if (response.usage) {
        this.setTokenUsage(
          response.usage.prompt_tokens ?? 0,
          response.usage.completion_tokens ?? 0
        );
      }

      const content = response.choices?.[0].message.content;
      if (!content) {
        throw new ProviderError(`${this.constructor.name} returned an empty response`);
      }

      return content;
    } catch (error) {
      this.debugLog(options, `Error in ${this.constructor.name} executePrompt:`, error);
      // Always log the full error details for better debugging
      console.error(
        'Full error details:',
        JSON.stringify(error, Object.getOwnPropertyNames(error))
      );

      if (error instanceof ProviderError) {
        throw error;
      }
      if (error instanceof BadRequestError) {
        // BadRequestError if logged unmodified will leak credentials.
        // Remove headers from error object before logging
        Object.keys(error.headers || {}).forEach((key) => delete error.headers[key]);
        throw new NetworkError(`Failed to communicate with ${this.constructor.name} API`, error);
      }
      throw new NetworkError(`Failed to communicate with ${this.constructor.name} API`, error);
    }
  }
}

// Google Vertex AI provider implementation
export class GoogleVertexAIProvider extends BaseProvider {
  private readonly _getAuthHeaders: () => Promise<{
    [key: string]: string;
  }>;
  private readonly getAuthHeaders: () => Promise<{
    [key: string]: string;
  }>;

  constructor() {
    super();
    this._getAuthHeaders = async () => {
      // Implementation here
      return {};
    };
    this.getAuthHeaders = once(this._getAuthHeaders);
    // Initialize the promise in constructor
    this.availableModels = this.initializeModels();
    this.availableModels.catch((error) => {
      console.error('Error fetching Vertex AI models:', error);
    });
  }

  private async initializeModels(): Promise<Set<string>> {
    try {
      const { headers } = await this.getAuthHeaders();

      const response = await fetch(
        'https://us-central1-aiplatform.googleapis.com/v1beta1/publishers/google/models',
        {
          headers: headers,
        }
      );

      if (!response.ok) {
        console.error('Failed to fetch Vertex AI models:', await response.text());
        throw new NetworkError(`Failed to fetch Vertex AI models: ${response.statusText}`);
      }

      const data = await response.json();
      if (!data?.publisherModels) {
        console.warn('Unexpected API response format:', data);
        return new Set();
      }
      return new Set(
        data.publisherModels.map((model: any) => {
          // Extract just the model name without the publishers/google/models/ prefix
          const name = model.name.replace('publishers/google/models/', '');
          return name;
        })
      );
    } catch (error) {
      console.error('Error fetching Vertex AI models:', error);
      throw new NetworkError('Failed to fetch available Vertex AI models', error as Error);
    }
  }

  async supportsWebSearch(
    modelName: string
  ): Promise<{ supported: boolean; model?: string; error?: string }> {
    try {
      const webSearchModels = Array.from((await this.availableModels) ?? []).filter(
        (m) => m.includes('gemini') && !m.includes('thinking')
      );
      if (webSearchModels.length > 0) {
        if (webSearchModels.includes(modelName)) {
          return {
            supported: true,
          };
        }
        return {
          supported: false,
          model: webSearchModels[0],
          error: `Model ${modelName} does not support web search. Try one of these models:\n${webSearchModels.map((m) => `- ${m}`).join('\n')}`,
        };
      }
      return {
        supported: true,
      };
    } catch (error) {
      console.error('Error checking web search support:', error);
      return {
        supported: false,
        error: 'Failed to check web search support. Please try again.',
      };
    }
  }

  async executePrompt(prompt: string, options: ModelOptions): Promise<string> {
    const model = await this.getModel(options);

    // Validate model name if we have the list
    const availableModels = await this.availableModels;
    if (!availableModels) {
      throw new Error('Models not initialized. Call initializeModels() first.');
    }
    if (!availableModels.has(model)) {
      const similarModels = getSimilarModels(model, availableModels);
      throw new ModelNotFoundError(
        `Model '${model}' not found in Vertex AI.\n\n` +
          `You requested: ${model}\n` +
          `Similar available models:\n${similarModels.map((m) => `- ${m}`).join('\n')}\n\n` +
          `Use --model with one of the above models.`
      );
    }

    const maxTokens = options.maxTokens;
    const systemPrompt = this.getSystemPrompt(options);
    const startTime = Date.now();

    const { projectId, headers } = await this.getAuthHeaders();

    const location = 'us-central1'; // TODO: Make this configurable
    const baseURL = `https://${location}-aiplatform.googleapis.com/v1/projects/${projectId}/locations/${location}/publishers/google/models/${model}:generateContent`;

    this.logRequestStart(options, model, maxTokens, systemPrompt, baseURL);

    return retryWithBackoff(
      async () => {
        try {
          const requestBody: GoogleVertexAIRequestBody = {
            contents: [
              {
                role: 'user',
                parts: [{ text: prompt }],
              },
            ],
            generationConfig: { maxOutputTokens: maxTokens },
            ...(systemPrompt
              ? {
                  system_instruction: {
                    parts: [{ text: systemPrompt }],
                  },
                }
              : {}),
          };

          // Add web search tool only when explicitly requested
          if (options?.webSearch) {
            requestBody.tools = [
              {
                google_search: {},
              },
            ];
          }

          this.debugLog(options, 'Request body:', this.truncateForLogging(requestBody));

          const response = await fetch(baseURL, {
            method: 'POST',
            headers: {
              ...headers,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
          });

          const endTime = Date.now();
          this.debugLog(options, `API call completed in ${endTime - startTime}ms`);

          if (!response.ok) {
            const errorText = await response.text();
            if (response.status === 429) {
              console.warn(
                'Received 429 error from Google API. This can occur due to token limits on free accounts. ' +
                  'For more information, see: https://github.com/eastlondoner/laravelgpt/issues/35'
              );
            }
            throw new NetworkError(`Google Vertex AI API error (${response.status}): ${errorText}`);
          }

          const content = await response.json();
          if (!content) {
            throw new ProviderError(`${this.constructor.name} returned an empty response`);
          }

          return content;
        } catch (error) {
          this.debugLog(options, `Error in ${this.constructor.name} executePrompt:`, error);
          // Always log the full error details for better debugging
          console.error(
            'Full error details:',
            JSON.stringify(error, Object.getOwnPropertyNames(error))
          );

          if (error instanceof ProviderError) {
            throw error;
          }
          if (error instanceof BadRequestError) {
            // BadRequestError if logged unmodified will leak credentials.
            // Remove headers from error object before logging
            Object.keys(error.headers || {}).forEach((key) => delete error.headers[key]);
            throw new NetworkError(`Failed to communicate with ${this.constructor.name} API`, error);
          }
          throw new NetworkError(`Failed to communicate with ${this.constructor.name} API`, error);
        }
      }
    );
  }
}

export async function createProvider(name: string, options?: any) {
  switch (name) {
    case 'gemini':
      return new (await import('./gemini')).GeminiProvider();
    case 'openai':
      return new (await import('./openai')).OpenAIProvider();
    case 'openrouter':
      return new (await import('./openrouter')).OpenRouterProvider();
    case 'perplexity':
      return new (await import('./perplexity')).PerplexityProvider();
    case 'modelbox':
      return new (await import('./modelbox')).ModelBoxProvider();
    case 'anthropic':
      return new (await import('./anthropic')).AnthropicProvider();
    case 'xai':
      return new (await import('./xai')).XAIProvider();
    default:
      throw new Error(`Unknown provider: ${name}`);
  }
}
