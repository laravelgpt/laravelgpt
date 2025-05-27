import { BaseProvider, ModelOptions } from './base';
import { ApiKeyMissingError } from '../errors';

export class GeminiProvider extends BaseProvider {
  private apiKey: string;

  constructor() {
    super();
    this.apiKey = process.env.GEMINI_API_KEY || '';
    if (!this.apiKey) {
      throw new ApiKeyMissingError('GEMINI_API_KEY is not set in the environment.');
    }
  }

  async executePrompt(prompt: string, options: ModelOptions): Promise<string> {
    const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=' + this.apiKey;
    const body = {
      contents: [{ parts: [{ text: prompt }] }]
    };
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status} ${await response.text()}`);
    }
    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response from Gemini';
  }

  async supportsWebSearch(modelName: string): Promise<{ supported: boolean; model?: string; error?: string }> {
    return { supported: false };
  }
} 