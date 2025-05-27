import { BaseProvider, ModelOptions } from './base';

export class PerplexityProvider extends BaseProvider {
  constructor() {
    super();
  }

  async executePrompt(prompt: string, options: ModelOptions): Promise<string> {
    return 'PerplexityProvider response';
  }

  async supportsWebSearch(modelName: string): Promise<{ supported: boolean; model?: string; error?: string }> {
    return { supported: false };
  }
} 