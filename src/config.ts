import { config } from 'dotenv';
import { RawSiteConfig, SiteConfigurations } from './types/config.js';
import fs from 'fs';

// Quiet mode to avoid polluting stdout (breaks MCP JSON-RPC protocol)
config({ quiet: true });

export const DEFAULT_SITE = 'default_test';

export function loadSiteConfigurations(configPath: string): SiteConfigurations {
    const rawConfig = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
    const config: SiteConfigurations = {};

    for (const [alias, site] of Object.entries(rawConfig)) {
        const rawSite = site as RawSiteConfig;
        config[alias] = {
            url: rawSite.URL,
            username: rawSite.USER,
            auth: Buffer.from(`${rawSite.USER}:${rawSite.PASS}`).toString('base64'),
            authType: (rawSite.authType || 'basic') as 'basic' | 'jwt',
            capabilities: rawSite.capabilities
        };
    }

    return config;
} 