import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { SITE_PARAM } from '../schemas/common.js';

export const healthTools: Tool[] = [
    {
        name: 'claudeus_wp_health__test_auth',
        description: 'Test authorization header. Verify that REST API authentication is working correctly.',
        inputSchema: {
            type: 'object',
            properties: {
                site: SITE_PARAM
            }
        }
    },
    {
        name: 'claudeus_wp_health__test_background_updates',
        description: 'Test background updates. Check if WordPress can perform background updates for core, plugins, and themes.',
        inputSchema: {
            type: 'object',
            properties: {
                site: SITE_PARAM
            }
        }
    },
    {
        name: 'claudeus_wp_health__test_dotorg_communication',
        description: 'Test WordPress.org communication. Verify that the site can connect to WordPress.org for updates and resources.',
        inputSchema: {
            type: 'object',
            properties: {
                site: SITE_PARAM
            }
        }
    },
    {
        name: 'claudeus_wp_health__test_https',
        description: 'Test HTTPS status. Check if the site is using HTTPS correctly and if SSL certificate is valid.',
        inputSchema: {
            type: 'object',
            properties: {
                site: SITE_PARAM
            }
        }
    },
    {
        name: 'claudeus_wp_health__test_loopback',
        description: 'Test loopback requests. Verify that the site can make HTTP requests to itself (required for WP-Cron and other features).',
        inputSchema: {
            type: 'object',
            properties: {
                site: SITE_PARAM
            }
        }
    },
    {
        name: 'claudeus_wp_health__test_page_cache',
        description: 'Test page cache configuration. Check if page caching is working correctly.',
        inputSchema: {
            type: 'object',
            properties: {
                site: SITE_PARAM
            }
        }
    },
    {
        name: 'claudeus_wp_health__get_directory_sizes',
        description: 'Get directory sizes. Retrieve storage usage for WordPress directories (core, themes, plugins, uploads, database).',
        inputSchema: {
            type: 'object',
            properties: {
                site: SITE_PARAM
            }
        }
    },
    {
        name: 'claudeus_wp_health__run_all_tests',
        description: 'Run all site health tests. Execute all available health checks in parallel and return comprehensive results.',
        inputSchema: {
            type: 'object',
            properties: {
                site: SITE_PARAM
            }
        }
    }
];

