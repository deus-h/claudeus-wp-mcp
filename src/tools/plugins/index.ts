import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { SITE_PARAM, SEARCH_PARAM } from '../schemas/common.js';

export const pluginTools: Tool[] = [
    {
        name: 'claudeus_wp_plugins__list',
        description: 'List all installed WordPress plugins. View active, inactive, and network-active plugins with details.',
        inputSchema: {
            type: 'object',
            properties: {
                site: SITE_PARAM,
                filters: {
                    type: 'object',
                    description: 'Optional filters',
                    properties: {
                        status: {
                            type: 'string',
                            description: 'Filter by plugin status',
                            enum: ['active', 'inactive', 'network-active']
                        },
                        search: SEARCH_PARAM
                    }
                }
            }
        }
    },
    {
        name: 'claudeus_wp_plugins__get',
        description: 'Get details for a specific plugin. View name, version, author, description, status, and update availability.',
        inputSchema: {
            type: 'object',
            required: ['plugin'],
            properties: {
                site: SITE_PARAM,
                plugin: {
                    type: 'string',
                    description: 'Plugin file path (e.g., "akismet/akismet" or "hello")'
                }
            }
        }
    },
    {
        name: 'claudeus_wp_plugins__activate',
        description: 'Activate a plugin. Enable a currently inactive plugin.',
        inputSchema: {
            type: 'object',
            required: ['plugin'],
            properties: {
                site: SITE_PARAM,
                plugin: {
                    type: 'string',
                    description: 'Plugin file path to activate (e.g., "akismet/akismet")'
                }
            }
        }
    },
    {
        name: 'claudeus_wp_plugins__deactivate',
        description: 'Deactivate a plugin. Disable a currently active plugin without deleting it.',
        inputSchema: {
            type: 'object',
            required: ['plugin'],
            properties: {
                site: SITE_PARAM,
                plugin: {
                    type: 'string',
                    description: 'Plugin file path to deactivate (e.g., "akismet/akismet")'
                }
            }
        }
    },
    {
        name: 'claudeus_wp_plugins__delete',
        description: 'Delete a plugin. Permanently remove an inactive plugin from the site. Plugin must be deactivated first.',
        inputSchema: {
            type: 'object',
            required: ['plugin'],
            properties: {
                site: SITE_PARAM,
                plugin: {
                    type: 'string',
                    description: 'Plugin file path to delete (e.g., "akismet/akismet"). Must be inactive.'
                }
            }
        }
    }
];

