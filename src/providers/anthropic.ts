import { BaseProvider, ModelOptions } from './base';

export class AnthropicProvider extends BaseProvider {
  constructor() {
    super();
  }

  async executePrompt(prompt: string, options: ModelOptions): Promise<string> {
    return 'AnthropicProvider response';
  }

  async supportsWebSearch(modelName: string): Promise<{ supported: boolean; model?: string; error?: string }> {
    return { supported: false };
  }
} 