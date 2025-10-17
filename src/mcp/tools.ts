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
import { PostsApiClient } from '../api/posts.js';
import { PagesApiClient } from '../api/pages.js';
import { MediaApiClient } from '../api/media.js';
import { BlocksApiClient } from '../api/blocks.js';
import { ThemeApiClient } from '../api/themes.js';
import { ShopAPI } from '../api/shop.js';
import { shopTools } from '../tools/shop/index.js';
import { handleShopTools } from '../tools/shop/handlers.js';
import { DEFAULT_SITE } from '../config.js';
import { 
    PostFilters, 
    PostData, 
    PageFilters, 
    PageData, 
    MediaFilters, 
    MediaData,
    BlockFilters,
    BlockData,
    ThemeFilters,
    ThemeCustomizationUpdate
} from '../types/index.js';
import axios from 'axios';
import { prompts } from '../prompts/index.js';
import { isToolAllowed } from '../utils/capabilities.js';

function constructResourceUri(alias: string, baseUrl: string): string {
    return `wordpress://${alias}@${new URL(baseUrl).hostname}`;
}

export function registerTools(server: Server, clients: Map<string, { 
    posts: PostsApiClient; 
    pages: PagesApiClient; 
    media: MediaApiClient;
    blocks: BlocksApiClient;
    themes: ThemeApiClient;
    shop: ShopAPI;
}>) {
    // Register all handlers
    server.setRequestHandler(ListPromptsRequestSchema, async () => ({
        prompts: Object.entries(prompts).map(([id, prompt]) => ({
            name: id,
            description: prompt.description,
            arguments: prompt.arguments
        }))
    }));

    server.setRequestHandler(GetPromptRequestSchema, async (request) => {
        const promptName = request.params?.name;
        if (!promptName || typeof promptName !== 'string') {
            throw new Error('Prompt name is required');
        }

        const prompt = prompts[promptName];
        if (!prompt) {
            throw new Error(`Unknown prompt: ${promptName}`);
        }

        return {
            description: prompt.description,
            messages: [
                {
                    role: 'assistant',
                    content: {
                        type: 'text',
                        text: `I am a WordPress content expert, ready to help you with ${prompt.name}.`
                    }
                },
                {
                    role: 'user',
                    content: {
                        type: 'text',
                        text: `Please help me with ${prompt.name} using these arguments:\n${
                            prompt.arguments.map(arg => 
                                `${arg.name}: ${request.params?.arguments?.[arg.name] || '(not provided)'}`
                            ).join('\n')
                        }`
                    }
                }
            ]
        };
    });

    // Register resource handler
    server.setRequestHandler(ListResourcesRequestSchema, async () => {
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
    });

    // Register read resource handler
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
                        shop: Boolean(client.shop)
                    }
                }
            },
            contents: [{
                type: 'text',
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
                        shop: Boolean(client.shop)
                    }
                }, null, 2)
            }]
        };
    });

    // Register resource templates handler
    server.setRequestHandler(ListResourceTemplatesRequestSchema, async (request) => {
        const resourceId = request.params?.id;
        if (!resourceId || typeof resourceId !== 'string') {
            console.error('No resource ID provided for templates');
            return { resourceTemplates: [] };
        }

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
    });

    server.setRequestHandler(ListToolsRequestSchema, async (request) => {
        // Get the site from request params or use default
        const site = (request.params?.site as string) || DEFAULT_SITE;
        const client = clients.get(site);
        
        if (!client) {
            throw new Error(`Unknown site: ${site}`);
        }

        const capabilities = client.posts.site.capabilities;

        const tools = [
            {
                name: 'claudeus_wp_discover_endpoints',
                description: 'Discovers available REST API endpoints on a WordPress site.',
                disabled: !isToolAllowed(capabilities, 'claudeus_wp_discover_endpoints'),
                inputSchema: {
                    type: 'object',
                    required: [],
                    properties: {
                        site: { 
                            type: 'string', 
                            description: 'Site alias (defaults to default_test)',
                            default: 'default_test'
                        }
                    }
                }
            },
            ...shopTools.map(tool => ({
                ...tool,
                disabled: !isToolAllowed(capabilities, tool.name)
            })),
            {
                name: 'claudeus_wp_content__get_posts',
                description: 'Get a list of posts with optional filters',
                disabled: !isToolAllowed(capabilities, 'claudeus_wp_content__get_posts'),
                inputSchema: {
                    type: 'object',
                    required: [],
                    properties: {
                        site: { 
                            type: 'string', 
                            description: 'Site alias (defaults to default_test)',
                            default: 'default_test'
                        },
                        filters: {
                            type: 'object',
                            description: 'Optional filters for posts query',
                            required: false
                        }
                    }
                }
            },
            {
                name: 'claudeus_wp_content__create_post',
                description: 'Create a new post',
                disabled: !isToolAllowed(capabilities, 'claudeus_wp_content__create_post'),
                inputSchema: {
                    type: 'object',
                    required: ['data'],
                    properties: {
                        site: { 
                            type: 'string', 
                            description: 'Site alias (defaults to default_test)',
                            default: DEFAULT_SITE
                        },
                        data: {
                            type: 'object',
                            description: 'Post data (paste as JSON object)',
                            required: ['title', 'content'],
                            properties: {
                                title: { 
                                    type: 'string',
                                    description: 'Post title'
                                },
                                content: { 
                                    type: 'string',
                                    description: 'Post content (can include HTML)'
                                },
                                status: { 
                                    type: 'string',
                                    enum: ['publish', 'draft', 'pending', 'private'],
                                    description: 'Post status',
                                    default: 'draft'
                                },
                                excerpt: { 
                                    type: 'string',
                                    description: 'Optional post excerpt'
                                },
                                featured_media: { 
                                    type: 'number',
                                    description: 'Optional featured image ID'
                                },
                                categories: { 
                                    type: 'array',
                                    items: { type: 'number' },
                                    description: 'Optional array of category IDs'
                                },
                                tags: { 
                                    type: 'array',
                                    items: { type: 'number' },
                                    description: 'Optional array of tag IDs'
                                }
                            }
                        }
                    }
                }
            },
            {
                name: 'claudeus_wp_content__update_post',
                description: 'Update an existing post',
                inputSchema: {
                    type: 'object',
                    properties: {
                        site: { type: 'string', description: 'Site alias' },
                        id: { type: 'number', description: 'Post ID' },
                        data: { type: 'object', description: 'Updated post data' }
                    },
                    required: ['site', 'id', 'data']
                }
            },
            {
                name: 'claudeus_wp_content__delete_post',
                description: 'Delete a post',
                disabled: !isToolAllowed(capabilities, 'claudeus_wp_content__delete_post'),
                inputSchema: {
                    type: 'object',
                    properties: {
                        site: { type: 'string', description: 'Site alias' },
                        id: { type: 'number', description: 'Post ID' }
                    },
                    required: ['site', 'id']
                }
            },
            {
                name: 'claudeus_wp_content__get_pages',
                description: 'Get a list of pages with optional filters',
                inputSchema: {
                    type: 'object',
                    properties: {
                        site: { type: 'string', description: 'Site alias' },
                        filters: {
                            type: 'object',
                            description: 'Optional filters for pages query',
                            required: false
                        }
                    },
                    required: ['site']
                }
            },
            {
                name: 'claudeus_wp_content__create_page',
                description: 'Create a new page',
                inputSchema: {
                    type: 'object',
                    properties: {
                        site: { type: 'string', description: 'Site alias' },
                        data: {
                            type: 'object',
                            description: 'Page data',
                            required: true
                        }
                    },
                    required: ['site', 'data']
                }
            },
            {
                name: 'claudeus_wp_content__update_page',
                description: 'Update an existing page',
                inputSchema: {
                    type: 'object',
                    properties: {
                        site: { type: 'string', description: 'Site alias' },
                        id: { type: 'number', description: 'Page ID' },
                        data: { type: 'object', description: 'Updated page data' }
                    },
                    required: ['site', 'id', 'data']
                }
            },
            {
                name: 'claudeus_wp_content__delete_page',
                description: 'Delete a page',
                inputSchema: {
                    type: 'object',
                    properties: {
                        site: { type: 'string', description: 'Site alias' },
                        id: { type: 'number', description: 'Page ID' }
                    },
                    required: ['site', 'id']
                }
            },
            {
                name: 'claudeus_wp_media__get_media',
                description: 'Get a list of media items with optional filters',
                inputSchema: {
                    type: 'object',
                    properties: {
                        site: { type: 'string', description: 'Site alias' },
                        filters: {
                            type: 'object',
                            description: 'Optional filters for media query',
                            required: false
                        }
                    },
                    required: ['site']
                }
            },
            {
                name: 'claudeus_wp_media__upload',
                description: 'Upload a new media file',
                inputSchema: {
                    type: 'object',
                    properties: {
                        site: { type: 'string', description: 'Site alias' },
                        file: { type: 'string', description: 'File buffer' },
                        filename: { type: 'string', description: 'Name of the file' },
                        data: {
                            type: 'object',
                            description: 'Optional media metadata',
                            required: false
                        }
                    },
                    required: ['site', 'file', 'filename']
                }
            },
            {
                name: 'claudeus_wp_media__update',
                description: 'Update media item metadata',
                inputSchema: {
                    type: 'object',
                    properties: {
                        site: { type: 'string', description: 'Site alias' },
                        id: { type: 'number', description: 'Media ID' },
                        data: { type: 'object', description: 'Updated media metadata' }
                    },
                    required: ['site', 'id', 'data']
                }
            },
            {
                name: 'claudeus_wp_media__delete',
                description: 'Delete a media item',
                inputSchema: {
                    type: 'object',
                    properties: {
                        site: { type: 'string', description: 'Site alias' },
                        id: { type: 'number', description: 'Media ID' },
                        force: { type: 'boolean', description: 'Whether to bypass trash' }
                    },
                    required: ['site', 'id']
                }
            },
            {
                name: 'claudeus_wp_content__get_blocks',
                description: 'Get a list of blocks with optional filters',
                inputSchema: {
                    type: 'object',
                    properties: {
                        site: { type: 'string', description: 'Site alias' },
                        filters: {
                            type: 'object',
                            description: 'Optional filters for blocks query',
                            required: false
                        }
                    },
                    required: ['site']
                }
            },
            {
                name: 'claudeus_wp_content__create_block',
                description: 'Create a new block',
                inputSchema: {
                    type: 'object',
                    properties: {
                        site: { type: 'string', description: 'Site alias' },
                        data: {
                            type: 'object',
                            description: 'Block data',
                            required: true
                        }
                    },
                    required: ['site', 'data']
                }
            },
            {
                name: 'claudeus_wp_content__update_block',
                description: 'Update an existing block',
                inputSchema: {
                    type: 'object',
                    properties: {
                        site: { type: 'string', description: 'Site alias' },
                        id: { type: 'number', description: 'Block ID' },
                        data: { type: 'object', description: 'Updated block data' }
                    },
                    required: ['site', 'id', 'data']
                }
            },
            {
                name: 'claudeus_wp_content__delete_block',
                description: 'Delete a block',
                inputSchema: {
                    type: 'object',
                    properties: {
                        site: { type: 'string', description: 'Site alias' },
                        id: { type: 'number', description: 'Block ID' }
                    },
                    required: ['site', 'id']
                }
            },
            {
                name: 'claudeus_wp_content__get_block_revisions',
                description: 'Get revisions of a block',
                inputSchema: {
                    type: 'object',
                    properties: {
                        site: { type: 'string', description: 'Site alias' },
                        id: { type: 'number', description: 'Block ID' }
                    },
                    required: ['site', 'id']
                }
            },
            {
                name: 'claudeus_wp_theme__list',
                description: 'Get a list of installed themes',
                inputSchema: {
                    type: 'object',
                    properties: {
                        site: { type: 'string', description: 'Site alias' },
                        filters: {
                            type: 'object',
                            description: 'Optional filters for themes query',
                            required: false
                        }
                    },
                    required: ['site']
                }
            },
            {
                name: 'claudeus_wp_theme__get_active',
                description: 'Get the currently active theme',
                inputSchema: {
                    type: 'object',
                    properties: {
                        site: { type: 'string', description: 'Site alias' }
                    },
                    required: ['site']
                }
            },
            {
                name: 'claudeus_wp_theme__activate',
                description: 'Activate a theme',
                inputSchema: {
                    type: 'object',
                    properties: {
                        site: { type: 'string', description: 'Site alias' },
                        stylesheet: { type: 'string', description: 'Theme stylesheet name' }
                    },
                    required: ['site', 'stylesheet']
                }
            },
            {
                name: 'claudeus_wp_theme__get_customization',
                description: 'Get theme customization settings',
                inputSchema: {
                    type: 'object',
                    properties: {
                        site: { type: 'string', description: 'Site alias' }
                    },
                    required: ['site']
                }
            },
            {
                name: 'claudeus_wp_theme__update_customization',
                description: 'Update theme customization settings',
                inputSchema: {
                    type: 'object',
                    properties: {
                        site: { type: 'string', description: 'Site alias' },
                        updates: {
                            type: 'object',
                            description: 'Customization updates to apply',
                            properties: {
                                custom_css: { type: 'string' },
                                settings: { type: 'object' },
                                mods: {
                                    type: 'object',
                                    properties: {
                                        add: { type: 'object' },
                                        remove: { type: 'array', items: { type: 'string' } }
                                    }
                                }
                            }
                        }
                    }
                },
                required: ['site', 'updates']
            },
            {
                name: 'claudeus_wp_theme__get_custom_css',
                description: 'Get theme custom CSS',
                inputSchema: {
                    type: 'object',
                    properties: {
                        site: { type: 'string', description: 'Site alias' }
                    },
                    required: ['site']
                }
            },
            {
                name: 'claudeus_wp_theme__update_custom_css',
                description: 'Update theme custom CSS',
                inputSchema: {
                    type: 'object',
                    properties: {
                        site: { type: 'string', description: 'Site alias' },
                        css: { type: 'string', description: 'Custom CSS code' }
                    },
                    required: ['site', 'css']
                }
            }
        ];

        // Map all tools with their disabled status but don't filter them out
        const allTools = tools.map(tool => ({
            ...tool,
            disabled: !isToolAllowed(capabilities, tool.name),
            // Add a note to the description if the tool is disabled
            description: !isToolAllowed(capabilities, tool.name) 
                ? `${tool.description} (Disabled for this site)`
                : tool.description
        }));

        return { tools: allTools };
    });

    // Register tool handlers
    server.setRequestHandler(CallToolRequestSchema, async (request) => {
        if (!request.params || !request.params.name || !request.params.arguments) {
            throw new Error('Invalid request parameters');
        }

        const toolName = request.params.name;
        const args = request.params.arguments;
        
        // Set default site if not provided
        const site = args.site as string || DEFAULT_SITE;
        args.site = site;

        // CRITICAL SECURITY CHECK: Check tool permissions BEFORE getting client or making any API calls
        const client = clients.get(site);
        if (!client) {
            throw new Error(`Unknown site: ${site}`);
        }

        // Check if tool is allowed for this site - MOVED TO TOP
        if (!isToolAllowed(client.posts.site.capabilities, toolName)) {
            throw new Error(`Tool ${toolName} is not allowed for site ${site}`);
        }

        // Handle shop tools
        if (toolName.startsWith('claudeus_wp_shop__')) {
            return handleShopTools(toolName, args, client.shop);
        }

        // Handle other tools
        switch (toolName) {
            case 'claudeus_wp_discover_endpoints': {
                const baseUrl = client.posts.site.url;
                const response = await axios.get(`${baseUrl}/wp-json/`);
                return { 
                    content: [{ 
                        type: "text", 
                        text: JSON.stringify(response.data, null, 2)
                    }] 
                };
            }
            case 'claudeus_wp_content__get_posts': {
                const posts = await client.posts.getPosts(args.filters as PostFilters);
                return { 
                    content: [{ 
                        type: "text", 
                        text: JSON.stringify(posts, null, 2)
                    }] 
                };
            }
            case 'claudeus_wp_content__create_post': {
                let postData: PostData;
                
                // Check if data is a file upload
                if (args.data && (args.data as any).type === 'file') {
                    try {
                        const fileContent = (args.data as any).content.toString('utf-8');
                        postData = JSON.parse(fileContent);
                    } catch (error: unknown) {
                        const e = error as Error;
                        throw new Error(`Failed to parse JSON file: ${e.message}`);
                    }
                } else {
                    postData = args.data as PostData;
                }

                const post = await client.posts.createPost(postData);
                return { 
                    content: [{ 
                        type: "text", 
                        text: JSON.stringify(post, null, 2)
                    }] 
                };
            }
            case 'claudeus_wp_content__update_post': {
                const post = await client.posts.updatePost(args.id as number, args.data as Partial<PostData>);
                return { 
                    content: [{ 
                        type: "text", 
                        text: JSON.stringify(post, null, 2)
                    }] 
                };
            }
            case 'claudeus_wp_content__delete_post':
                await client.posts.deletePost(args.id as number);
                return { 
                    content: [{ 
                        type: "text", 
                        text: "Post deleted successfully"
                    }] 
                };
            case 'claudeus_wp_content__get_pages': {
                const pages = await client.pages.getPages(args.filters as PageFilters);
                return { 
                    content: [{ 
                        type: "text", 
                        text: JSON.stringify(pages, null, 2)
                    }] 
                };
            }
            case 'claudeus_wp_content__create_page': {
                const page = await client.pages.createPage(args.data as PageData);
                return { 
                    content: [{ 
                        type: "text", 
                        text: JSON.stringify(page, null, 2)
                    }] 
                };
            }
            case 'claudeus_wp_content__update_page': {
                const page = await client.pages.updatePage(args.id as number, args.data as Partial<PageData>);
                return { 
                    content: [{ 
                        type: "text", 
                        text: JSON.stringify(page, null, 2)
                    }] 
                };
            }
            case 'claudeus_wp_content__delete_page':
                await client.pages.deletePage(args.id as number);
                return { 
                    content: [{ 
                        type: "text", 
                        text: "Page deleted successfully"
                    }] 
                };
            case 'claudeus_wp_media__get_media': {
                const media = await client.media.getMedia(args.filters as MediaFilters);
                return { 
                    content: [{ 
                        type: "text", 
                        text: JSON.stringify(media, null, 2)
                    }] 
                };
            }
            case 'claudeus_wp_media__upload': {
                const media = await client.media.uploadMedia(args.file as Buffer, args.filename as string, args.data as MediaData);
                return { 
                    content: [{ 
                        type: "text", 
                        text: JSON.stringify(media, null, 2)
                    }] 
                };
            }
            case 'claudeus_wp_media__update': {
                const media = await client.media.updateMedia(args.id as number, args.data as Partial<MediaData>);
                return { 
                    content: [{ 
                        type: "text", 
                        text: JSON.stringify(media, null, 2)
                    }] 
                };
            }
            case 'claudeus_wp_media__delete':
                await client.media.deleteMedia(args.id as number, args.force as boolean);
                return { 
                    content: [{ 
                        type: "text", 
                        text: "Media deleted successfully"
                    }] 
                };
            case 'claudeus_wp_content__get_blocks': {
                const blocks = await client.blocks.getBlocks(args.filters as BlockFilters);
                return { 
                    content: [{ 
                        type: "text", 
                        text: JSON.stringify(blocks, null, 2)
                    }] 
                };
            }
            case 'claudeus_wp_content__create_block': {
                const block = await client.blocks.createBlock(args.data as BlockData);
                return { 
                    content: [{ 
                        type: "text", 
                        text: JSON.stringify(block, null, 2)
                    }] 
                };
            }
            case 'claudeus_wp_content__update_block': {
                const block = await client.blocks.updateBlock(args.id as number, args.data as Partial<BlockData>);
                return { 
                    content: [{ 
                        type: "text", 
                        text: JSON.stringify(block, null, 2)
                    }] 
                };
            }
            case 'claudeus_wp_content__delete_block':
                await client.blocks.deleteBlock(args.id as number);
                return { 
                    content: [{ 
                        type: "text", 
                        text: "Block deleted successfully"
                    }] 
                };
            case 'claudeus_wp_content__get_block_revisions': {
                const revisions = await client.blocks.getBlockRevisions(args.id as number);
                return { 
                    content: [{ 
                        type: "text", 
                        text: JSON.stringify(revisions, null, 2)
                    }] 
                };
            }
            case 'claudeus_wp_theme__list': {
                const themes = await client.themes.getThemes(args.filters as ThemeFilters);
                return { 
                    content: [{ 
                        type: "text", 
                        text: JSON.stringify(themes, null, 2)
                    }] 
                };
            }
            case 'claudeus_wp_theme__get_active': {
                const theme = await client.themes.getActiveTheme();
                return { 
                    content: [{ 
                        type: "text", 
                        text: JSON.stringify(theme, null, 2)
                    }] 
                };
            }
            case 'claudeus_wp_theme__activate': {
                const theme = await client.themes.activateTheme(args.stylesheet as string);
                return { 
                    content: [{ 
                        type: "text", 
                        text: JSON.stringify(theme, null, 2)
                    }] 
                };
            }
            case 'claudeus_wp_theme__get_customization': {
                const customization = await client.themes.getThemeCustomization();
                return { 
                    content: [{ 
                        type: "text", 
                        text: JSON.stringify(customization, null, 2)
                    }] 
                };
            }
            case 'claudeus_wp_theme__update_customization': {
                const customization = await client.themes.updateThemeCustomization(args.updates as ThemeCustomizationUpdate);
                return { 
                    content: [{ 
                        type: "text", 
                        text: JSON.stringify(customization, null, 2)
                    }] 
                };
            }
            case 'claudeus_wp_theme__get_custom_css': {
                const css = await client.themes.getCustomCss();
                return { 
                    content: [{ 
                        type: "text", 
                        text: css
                    }] 
                };
            }
            case 'claudeus_wp_theme__update_custom_css': {
                await client.themes.updateCustomCss(args.css as string);
                return { 
                    content: [{ 
                        type: "text", 
                        text: "Custom CSS updated successfully"
                    }] 
                };
            }
            default:
                throw new Error(`Unknown tool: ${toolName}`);
        }
    });
} 