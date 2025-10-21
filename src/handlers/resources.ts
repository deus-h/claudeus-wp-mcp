/**
 * Resource handling for WordPress MCP
 * Manages resource listings and content retrieval
 */

import { ClientMap } from './tools.js';

/**
 * Construct a resource URI for a WordPress site
 */
export function constructResourceUri(alias: string, baseUrl: string): string {
    return `wordpress://${alias}@${new URL(baseUrl).hostname}`;
}

/**
 * List all available WordPress site resources
 */
export function listResources(clients: Map<string, ClientMap>) {
    const resources = Array.from(clients.entries()).map(([alias, client]) => ({
        id: alias,
        name: `Alias: ${alias}`,
        type: "wordpress_site",
        uri: constructResourceUri(alias, client.posts.site.url),
        metadata: {
            url: client.posts.site.url,
            authType: client.posts.site.authType
        }
    }));

    return { resources };
}

/**
 * Read a specific WordPress site resource
 */
export function readResource(uri: string, clients: Map<string, ClientMap>) {
    // Extract alias from wordpress://alias@hostname format
    const match = uri.match(/^wordpress:\/\/([^@]+)@/);
    if (!match) {
        throw {
            code: -32602,
            message: `Invalid WordPress resource URI format: ${uri}`
        };
    }

    const alias = match[1];
    const client = clients.get(alias);
    if (!client) {
        throw {
            code: -32602,
            message: `Unknown site: ${alias}`
        };
    }

    return {
        resource: {
            id: alias,
            name: `Alias: ${alias}`,
            type: "wordpress_site",
            uri: constructResourceUri(alias, client.posts.site.url),
            metadata: {
                url: client.posts.site.url,
                authType: client.posts.site.authType,
                capabilities: {
                    posts: true,
                    pages: true,
                    media: true,
                    blocks: true,
                    themes: true,
                    taxonomies: true,
                    shop: Boolean(client.shop)
                }
            }
        },
        contents: [{
            type: 'text' as const,
            uri: constructResourceUri(alias, client.posts.site.url),
            text: JSON.stringify({
                url: client.posts.site.url,
                authType: client.posts.site.authType,
                capabilities: {
                    posts: true,
                    pages: true,
                    media: true,
                    blocks: true,
                    themes: true,
                    taxonomies: true,
                    shop: Boolean(client.shop)
                }
            }, null, 2)
        }]
    };
}

/**
 * List resource templates for a specific resource
 */
export function listResourceTemplates(resourceId: string, clients: Map<string, ClientMap>) {
    const client = clients.get(resourceId);
    if (!client) {
        console.error(`Client not found for resource: ${resourceId}`);
        return { resourceTemplates: [] };
    }

    console.error(`📋 Listing templates for resource: ${resourceId}`);

    return {
        resourceTemplates: [{
            id: "claudeus_wp_discover_endpoints_template",
            name: "Discover Endpoints",
            description: "Discover available REST API endpoints on this WordPress site",
            tool: "claudeus_wp_discover_endpoints",
            arguments: {
                site: resourceId
            }
        }]
    };
}

