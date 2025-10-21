/**
 * MCP Tools Registration
 * Simplified main file that delegates to modular handlers
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import {
    ListToolsRequestSchema,
    CallToolRequestSchema,
    ListResourcesRequestSchema,
    ListResourceTemplatesRequestSchema,
    ReadResourceRequestSchema,
    ListPromptsRequestSchema,
    GetPromptRequestSchema
} from '@modelcontextprotocol/sdk/types.js';
import { DEFAULT_SITE } from '../config.js';
import { isToolAllowed } from '../utils/capabilities.js';
import { allTools } from '../tools/index.js';
import { routeToolCall, ClientMap } from '../handlers/tools.js';
import { listResources, readResource, listResourceTemplates } from '../handlers/resources.js';
import { listPrompts, getPrompt } from '../handlers/prompts.js';

/**
 * Register all MCP handlers with the server
 */
export function registerTools(server: Server, clients: Map<string, ClientMap>) {
    // ==========================================
    // PROMPTS HANDLERS
    // ==========================================
    
    server.setRequestHandler(ListPromptsRequestSchema, async () => {
        return listPrompts();
    });

    server.setRequestHandler(GetPromptRequestSchema, async (request) => {
        const promptName = request.params?.name;
        if (!promptName || typeof promptName !== 'string') {
            throw new Error('Prompt name is required');
        }

        return getPrompt(promptName, request.params?.arguments as Record<string, unknown>);
    });

    // ==========================================
    // RESOURCES HANDLERS
    // ==========================================

    server.setRequestHandler(ListResourcesRequestSchema, async () => {
        return listResources(clients);
    });

    server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
        if (!request.params) {
            throw {
                code: -32602,
                message: 'Resource URI is required'
            };
        }

        const uri = request.params.uri;
        if (typeof uri !== 'string' || !uri) {
            throw {
                code: -32602,
                message: 'Resource URI must be a non-empty string'
            };
        }

        console.error(`🔍 Reading resource with URI: ${uri}`);
        return readResource(uri, clients);
    });

    server.setRequestHandler(ListResourceTemplatesRequestSchema, async (request) => {
        const resourceId = request.params?.id;
        if (!resourceId || typeof resourceId !== 'string') {
            console.error('No resource ID provided for templates');
            return { resourceTemplates: [] };
        }

        return listResourceTemplates(resourceId, clients);
    });

    // ==========================================
    // TOOLS HANDLERS
    // ==========================================

    server.setRequestHandler(ListToolsRequestSchema, async (request) => {
        // Get the site from request params or use default
        const site = (request.params?.site as string) || DEFAULT_SITE;
        const client = clients.get(site);

        if (!client) {
            throw new Error(`Unknown site: ${site}`);
        }

        const capabilities = client.posts.site.capabilities;

        // Map all tools with their disabled status
        const mappedTools = allTools.map(tool => ({
            ...tool,
            disabled: !isToolAllowed(capabilities, tool.name),
            // Add a note to the description if the tool is disabled
            description: !isToolAllowed(capabilities, tool.name)
                ? `${tool.description} (Disabled for this site)`
                : tool.description
        }));

        return { tools: mappedTools };
    });

    server.setRequestHandler(CallToolRequestSchema, async (request) => {
        if (!request.params || !request.params.name || !request.params.arguments) {
            throw new Error('Invalid request parameters');
        }

        const toolName = request.params.name;
        const args = request.params.arguments;

        // Set default site if not provided
        const site = args.site as string || DEFAULT_SITE;
        args.site = site;

        // CRITICAL SECURITY CHECK: Check tool permissions BEFORE making any API calls
        const client = clients.get(site);
        if (!client) {
            throw new Error(`Unknown site: ${site}`);
        }

        // Check if tool is allowed for this site
        if (!isToolAllowed(client.posts.site.capabilities, toolName)) {
            throw new Error(`Tool ${toolName} is not allowed for site ${site}`);
        }

        // Route to appropriate handler
        return routeToolCall(toolName, args, client);
    });
}
