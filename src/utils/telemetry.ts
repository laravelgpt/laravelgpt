import { execSync } from 'child_process';
import { readFileSync } from 'fs';
import { join } from 'path';
import { getCurrentVersion } from './versionUtils';

export interface TelemetryEvent {
  event: string;
  properties: Record<string, any>;
  timestamp: string;
}

export interface TelemetryConfig {
  enabled: boolean;
  diagnostics: boolean;
}

export function getTelemetryConfig(): TelemetryConfig {
  try {
    const configPath = join(process.env.HOME || process.env.USERPROFILE || '', '.laravelgpt', 'config.json');
    const config = JSON.parse(readFileSync(configPath, 'utf8'));
    return {
      enabled: config.telemetry?.enabled ?? true,
      diagnostics: config.telemetry?.diagnostics ?? false,
    };
  } catch (error) {
    // Default to enabled if config doesn't exist
    return {
      enabled: true,
      diagnostics: false,
    };
  }
}

export function sendTelemetryEvent(event: string, properties: Record<string, any> = {}): void {
  const config = getTelemetryConfig();
  if (!config.enabled) {
    return;
  }

  const telemetryEvent: TelemetryEvent = {
    event,
    properties: {
      ...properties,
      version: getCurrentVersion(),
      os: process.platform,
      nodeVersion: process.version,
      timestamp: new Date().toISOString(),
    },
    timestamp: new Date().toISOString(),
  };

  if (config.diagnostics) {
    console.log('Telemetry event:', JSON.stringify(telemetryEvent, null, 2));
  }

  // TODO: Implement actual telemetry sending
  // For now, just log to console if diagnostics is enabled
} 