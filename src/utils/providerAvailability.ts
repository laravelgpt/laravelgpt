import type { Provider } from '../types';
import { BaseModelProvider } from '../providers/base';
import { GeminiProvider } from '../providers/gemini';
import { OpenAIProvider } from '../providers/openai';
import { OpenRouterProvider } from '../providers/openrouter';
import { PerplexityProvider } from '../providers/perplexity';
import { ModelBoxProvider } from '../providers/modelbox';
import { AnthropicProvider } from '../providers/anthropic';
import { XAIProvider } from '../providers/xai';

interface ProviderInfo {
  provider: Provider;
  available: boolean;
  defaultModel?: string;
}

// Default models for each provider when none specified in config
const DEFAULT_MODELS: Record<Provider, string> = {
  perplexity: 'sonar-pro',
  gemini: 'gemini-2.5-pro-preview',
  openai: 'o3-mini',
  anthropic: 'claude-sonnet-4-20250514',
  openrouter: 'anthropic/claude-sonnet-4',
  modelbox: 'anthropic/claude-sonnet-4',
  xai: 'grok-3-mini-latest',
};

// Provider preference order for each command type
export const PROVIDER_PREFERENCE: Record<string, Provider[]> = {
  web: ['perplexity', 'gemini', 'modelbox', 'openrouter'],
  repo: ['gemini', 'modelbox', 'openrouter', 'openai', 'perplexity', 'anthropic', 'xai'],
  plan_file: ['gemini', 'modelbox', 'openrouter', 'openai', 'perplexity', 'anthropic', 'xai'],
  plan_thinking: ['openai', 'modelbox', 'openrouter', 'gemini', 'anthropic', 'perplexity', 'xai'],
  doc: ['gemini', 'modelbox', 'openrouter', 'openai', 'perplexity', 'anthropic', 'xai'],
  ask: ['openai', 'modelbox', 'openrouter', 'gemini', 'anthropic', 'perplexity'],
  browser: ['anthropic', 'openai', 'modelbox', 'openrouter', 'gemini', 'perplexity'],
};

export function getDefaultModel(provider: Provider): string {
  return DEFAULT_MODELS[provider];
}

export function getAllProviders(): ProviderInfo[] {
  return [
    {
      provider: 'perplexity',
      available: !!process.env.PERPLEXITY_API_KEY,
      defaultModel: DEFAULT_MODELS.perplexity,
    },
    {
      provider: 'gemini',
      available: !!process.env.GEMINI_API_KEY,
      defaultModel: DEFAULT_MODELS.gemini,
    },
    {
      provider: 'openai',
      available: !!process.env.OPENAI_API_KEY,
      defaultModel: DEFAULT_MODELS.openai,
    },
    {
      provider: 'anthropic',
      available: !!process.env.ANTHROPIC_API_KEY,
      defaultModel: DEFAULT_MODELS.anthropic,
    },
    {
      provider: 'openrouter',
      available: !!process.env.OPENROUTER_API_KEY,
      defaultModel: DEFAULT_MODELS.openrouter,
    },
    {
      provider: 'modelbox',
      available: !!process.env.MODELBOX_API_KEY,
      defaultModel: DEFAULT_MODELS.modelbox,
    },
    {
      provider: 'xai',
      available: !!process.env.XAI_API_KEY,
      defaultModel: DEFAULT_MODELS.xai,
    },
  ];
}

export function getProviderInfo(provider: string): ProviderInfo | undefined {
  return getAllProviders().find((p) => p.provider === provider);
}

export function isProviderAvailable(provider: string): boolean {
  return !!getProviderInfo(provider)?.available;
}

export function getAvailableProviders(): ProviderInfo[] {
  return getAllProviders().filter((p) => p.available);
}

export function getNextAvailableProvider(
  commandType: keyof typeof PROVIDER_PREFERENCE,
  currentProvider?: Provider
): Provider | undefined {
  const preferenceOrder = PROVIDER_PREFERENCE[commandType];
  if (!preferenceOrder) {
    throw new Error(`Unknown command type: ${commandType}`);
  }

  const availableProviders = getAllProviders();

  // If currentProvider is specified, start looking from the next provider in the preference order
  const startIndex = currentProvider ? preferenceOrder.indexOf(currentProvider) + 1 : 0;

  // Look through remaining providers in preference order
  for (let i = startIndex; i < preferenceOrder.length; i++) {
    const provider = preferenceOrder[i];
    const providerInfo = availableProviders.find((p) => p.provider === provider);
    if (providerInfo?.available) {
      return provider;
    } else {
      console.log(`Provider ${provider} is not available`);
    }
  }

  return undefined;
}

export function createProvider(provider: Provider): BaseModelProvider {
  switch (provider) {
    case 'gemini':
      return new GeminiProvider();
    case 'openai':
      return new OpenAIProvider();
    case 'openrouter':
      return new OpenRouterProvider();
    case 'perplexity':
      return new PerplexityProvider();
    case 'modelbox':
      return new ModelBoxProvider();
    case 'anthropic':
      return new AnthropicProvider();
    case 'xai':
      return new XAIProvider();
    default:
      throw new Error(`Unsupported provider: ${provider}`);
  }
}
