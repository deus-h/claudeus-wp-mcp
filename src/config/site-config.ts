import fs from 'fs/promises';
import { SiteConfigurations, RawSiteConfig } from '../types/config.js';

// Custom logger that ensures we only write to stderr
const log = {
    info: (...args: unknown[]) => console.error('\x1b[32m%s\x1b[0m', '[SUCCESS]', ...args),
    error: (...args: unknown[]) => console.error('[ERROR]', ...args),
    debug: (...args: unknown[]) => console.error('[DEBUG]', ...args),
    warn: (...args: unknown[]) => console.error('[WARN]', ...args)
};

export async function loadSiteConfig(): Promise<SiteConfigurations> {
    const configPath = process.env.WP_SITES_PATH;
    if (!configPath) {
        throw new Error("WP_SITES_PATH environment variable is required");
    }

    try {
        const configData = await fs.readFile(configPath, 'utf8');
        const config: Record<string, RawSiteConfig> = JSON.parse(configData);

        // Validate and normalize the config
        const normalizedConfig: SiteConfigurations = {};
        for (const [alias, site] of Object.entries(config)) {
            if (!site.URL || !site.USER || !site.PASS) {
                log.error(`Invalid configuration for site ${alias}: missing required fields`);
                continue;
            }

            try {
                const url = site.URL.startsWith('http') ? site.URL : `http://${site.URL}`;
                new URL(url);
                
                normalizedConfig[alias.toLowerCase()] = {
                    url: url.replace(/\/$/, ''),
                    username: site.USER,
                    auth: site.PASS,
                    authType: (site.authType || 'basic') as 'basic' | 'jwt',
                    restRouteFallback: site.restRouteFallback
                };
            } catch (error) {
                throw new Error(`Invalid site URL: ${site.URL} - ${error instanceof Error ? error.message : 'Unknown error'}`);
            }
        }

        if (Object.keys(normalizedConfig).length === 0) {
            throw new Error('No valid site configurations found');
        }

        return normalizedConfig;
    } catch (error) {
        if (error instanceof Error && 'code' in error && error.code === 'ENOENT') {
            throw new Error(`Config file not found at: ${configPath}`);
        }
        throw error;
    }
} 