import { BaseProvider, ModelOptions } from './base';

export class OpenRouterProvider extends BaseProvider {
  constructor() {
    super();
  }

  async executePrompt(prompt: string, options: ModelOptions): Promise<string> {
    return 'OpenRouterProvider response';
  }

  async supportsWebSearch(modelName: string): Promise<{ supported: boolean; model?: string; error?: string }> {
    return { supported: false };
  }
} 