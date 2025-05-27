import { BaseProvider, ModelOptions } from './base';
import OpenAI from 'openai';
import { ApiKeyMissingError } from '../errors';

export class OpenAIProvider extends BaseProvider {
  private client: OpenAI;

  constructor() {
    super();
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new ApiKeyMissingError('OPENAI_API_KEY');
    }
    this.client = new OpenAI({ apiKey });
  }

  async executePrompt(prompt: string, options: ModelOptions): Promise<string> {
    const model = await this.getModel(options);
    const maxTokens = options.maxTokens;
    const systemPrompt = this.getSystemPrompt(options);

    try {
      const messages = [
        ...(systemPrompt ? [{ role: 'system' as const, content: systemPrompt }] : []),
        { role: 'user' as const, content: prompt },
      ];

      const response = await this.client.chat.completions.create({
        model,
        messages,
        max_tokens: maxTokens,
        temperature: 0.7,
      });

      return response.choices[0]?.message?.content || '';
    } catch (error) {
      console.error('Error in OpenAI API call:', error);
      throw error;
    }
  }

  async supportsWebSearch(modelName: string): Promise<{ supported: boolean; model?: string; error?: string }> {
    return { supported: false };
  }
} 