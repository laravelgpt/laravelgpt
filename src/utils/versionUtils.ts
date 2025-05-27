import { execSync } from 'child_process';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { exec } from 'node:child_process';
import { promisify } from 'node:util';
import consola from 'consola';
import { fileURLToPath } from 'url';

const execAsync = promisify(exec);
const __dirname = dirname(fileURLToPath(import.meta.url));

export interface VersionInfo {
  current: string;
  latest: string | null;
  isOutdated: boolean;
}

/**
 * Gets the currently installed version of laravelgpt by searching upwards
 * for a package.json file with the name "laravelgpt".
 */
export function getCurrentVersion(): string {
  try {
    // First try to get version from package.json in the current directory
    const packageJsonPath = join(process.cwd(), 'package.json');
    const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'));
    if (packageJson.version) {
      return packageJson.version;
    }

    // If that fails, try npm list
    try {
      const npmListOutput = execSync('npm list -g laravelgpt', { encoding: 'utf8' });
      const versionMatch = npmListOutput.match(/laravelgpt@([\d.]+)/);
      if (versionMatch && versionMatch[1]) {
        return versionMatch[1];
      }
    } catch (npmError) {
      consola.debug('npm list failed:', npmError);
    }

    // If all else fails, return a default version
    return '0.0.0';
  } catch (error) {
    consola.debug('Error getting version:', error);
    return '0.0.0';
  }
}

/**
 * Gets the latest available version of laravelgpt from the NPM registry.
 * Uses `npm view laravelgpt version`.
 */
export async function getLatestVersion(): Promise<string | null> {
  try {
    const { stdout } = await execAsync('npm view laravelgpt version');
    return stdout.trim();
  } catch (error) {
    consola.debug('Failed to fetch latest version from NPM:', error);
    return null; // Indicate failure to fetch
  }
}

/**
 * Checks if the currently installed version is outdated compared to the latest NPM version.
 * Note: This uses simple string comparison. For robust comparison (e.g., handling pre-releases),
 * a library like 'semver' would be better, but sticking to simplicity for now.
 */
export async function checkPackageVersion(): Promise<VersionInfo> {
  try {
    const currentVersion = getCurrentVersion();
    if (currentVersion === '0.0.0') {
      consola.debug('Could not determine current version');
      return {
        current: '0.0.0',
        latest: null,
        isOutdated: false,
      };
    }

    // Get latest version from npm
    try {
      const npmViewOutput = execSync('npm view laravelgpt version', { encoding: 'utf8' }).trim();
      const latestVersion = npmViewOutput;

      return {
        current: currentVersion,
        latest: latestVersion,
        isOutdated: latestVersion !== currentVersion,
      };
    } catch (npmError) {
      consola.debug('Failed to fetch latest version:', npmError);
      return {
        current: currentVersion,
        latest: null,
        isOutdated: false,
      };
    }
  } catch (error) {
    consola.debug('Error checking package version:', error);
    return {
      current: getCurrentVersion(),
      latest: null,
      isOutdated: false,
    };
  }
}
