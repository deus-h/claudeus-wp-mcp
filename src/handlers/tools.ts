/**
 * Central tool routing handler
 * Routes tool calls to appropriate domain-specific handlers
 */

import { handleContentTools } from '../tools/content/handlers.js';
import { handleMediaTools } from '../tools/media/handlers.js';
import { handleShopTools } from '../tools/shop/handlers.js';
import { handleThemeTools } from '../tools/theme/handlers.js';
import { handleTaxonomyTools } from '../tools/taxonomy/handlers.js';
import { handleUserTools } from '../tools/user/handlers.js';
import { handleCommentTools } from '../tools/comment/handlers.js';
import { handleMenuTools } from '../tools/menu/handlers.js';
import { handleAstraTools } from '../tools/astra/handlers.js';
import { handleTemplateTools } from '../tools/template/handlers.js';
import { handleGlobalStylesTools } from '../tools/global-styles/handlers.js';
import { handlePatternTools } from '../tools/pattern/handlers.js';
import { handleSettingsTools } from '../tools/settings/handlers.js';
import { handlePluginTools } from '../tools/plugins/handlers.js';
import { handleWidgetTools } from '../tools/widgets/handlers.js';
import { handleHealthTools } from '../tools/health/handlers.js';
import { handleSearchTools } from '../tools/search/handlers.js';
import { PostsApiClient } from '../api/posts.js';
import { PagesApiClient } from '../api/pages.js';
import { MediaApiClient } from '../api/media.js';
import { BlocksApiClient } from '../api/blocks.js';
import { ThemeApiClient } from '../api/themes.js';
import { TaxonomiesApiClient } from '../api/taxonomies.js';
import { UsersApiClient } from '../api/users.js';
import { CommentsApiClient } from '../api/comments.js';
import { MenusApiClient } from '../api/menus.js';
import { AstraApiClient } from '../api/astra.js';
import { TemplatesApiClient } from '../api/templates.js';
import { GlobalStylesApiClient } from '../api/global-styles.js';
import { PatternsApiClient } from '../api/patterns.js';
import { SettingsApiClient } from '../api/settings.js';
import { PluginsApiClient } from '../api/plugins.js';
import { WidgetsApiClient } from '../api/widgets.js';
import { HealthApiClient } from '../api/health.js';
import { SearchApiClient } from '../api/search.js';
import { ShopAPI } from '../api/shop.js';
import { WordPressClient } from '../wordpress-client.js';
import axios from 'axios';

export interface ClientMap {
    posts: PostsApiClient;
    pages: PagesApiClient;
    media: MediaApiClient;
    blocks: BlocksApiClient;
    themes: ThemeApiClient;
    taxonomies: TaxonomiesApiClient;
    users: UsersApiClient;
    comments: CommentsApiClient;
    menus: MenusApiClient;
    astra: AstraApiClient;
    templates: TemplatesApiClient;
    globalStyles: GlobalStylesApiClient;
    patterns: PatternsApiClient;
    settings: SettingsApiClient;
    plugins: PluginsApiClient;
    widgets: WidgetsApiClient;
    health: HealthApiClient;
    search: SearchApiClient;
    shop: ShopAPI;
    wordpress?: WordPressClient;
}

/**
 * Route a tool call to the appropriate handler based on tool name
 */
export async function routeToolCall(
    toolName: string,
    args: Record<string, unknown>,
    clients: ClientMap
) {
    // Handle shop tools
    if (toolName.startsWith('claudeus_wp_shop__')) {
        return handleShopTools(toolName, args, clients.shop);
    }

    // Handle theme tools
    if (toolName.startsWith('claudeus_wp_theme__')) {
        return handleThemeTools(toolName, args, clients.themes);
    }

    // Handle taxonomy tools
    if (toolName.startsWith('claudeus_wp_taxonomy__')) {
        return handleTaxonomyTools(toolName, args, clients.taxonomies);
    }

    // Handle user tools
    if (toolName.startsWith('claudeus_wp_users__')) {
        return handleUserTools(toolName, args, clients.users);
    }

    // Handle comment tools
    if (toolName.startsWith('claudeus_wp_comments__')) {
        return handleCommentTools(toolName, args, clients.comments);
    }

    // Handle menu tools
    if (toolName.startsWith('claudeus_wp_menus__')) {
        return handleMenuTools(toolName, args, clients.menus);
    }

    // Handle Astra tools
    if (toolName.startsWith('claudeus_wp_astra__')) {
        return handleAstraTools(toolName, args, clients.astra);
    }

    // Handle template tools
    if (toolName.startsWith('claudeus_wp_templates__')) {
        return handleTemplateTools(toolName, args, clients.templates);
    }

    // Handle global styles tools
    if (toolName.startsWith('claudeus_wp_global_styles__')) {
        return handleGlobalStylesTools(toolName, args, clients.globalStyles);
    }

    // Handle pattern tools
    if (toolName.startsWith('claudeus_wp_patterns__')) {
        return handlePatternTools(toolName, args, clients.patterns);
    }

    // Handle settings tools
    if (toolName.startsWith('claudeus_wp_settings__')) {
        return handleSettingsTools(toolName, args, clients.settings);
    }

    // Handle plugin tools
    if (toolName.startsWith('claudeus_wp_plugins__')) {
        return handlePluginTools(toolName, args, clients.plugins);
    }

    // Handle widget tools
    if (toolName.startsWith('claudeus_wp_widgets__')) {
        return handleWidgetTools(toolName, args, clients.widgets);
    }

    // Handle health tools
    if (toolName.startsWith('claudeus_wp_health__')) {
        return handleHealthTools(toolName, args, clients.health);
    }

    // Handle search tools
    if (toolName.startsWith('claudeus_wp_search__')) {
        return handleSearchTools(toolName, args, clients.search);
    }

    // Handle media tools
    if (toolName.startsWith('claudeus_wp_media__')) {
        // Media tools use specialized handlers from media module
        switch (toolName) {
            case 'claudeus_wp_media__get_media': {
                const media = await clients.media.getMedia(args.filters as any);
                return {
                    content: [{
                        type: "text",
                        text: JSON.stringify(media, null, 2)
                    }]
                };
            }
            case 'claudeus_wp_media__upload': {
                const media = await clients.media.uploadMedia(
                    args.file as Buffer,
                    args.filename as string,
                    args.data as any
                );
                return {
                    content: [{
                        type: "text",
                        text: JSON.stringify(media, null, 2)
                    }]
                };
            }
            case 'claudeus_wp_media__update': {
                const media = await clients.media.updateMedia(
                    args.id as number,
                    args.data as any
                );
                return {
                    content: [{
                        type: "text",
                        text: JSON.stringify(media, null, 2)
                    }]
                };
            }
            case 'claudeus_wp_media__delete': {
                await clients.media.deleteMedia(args.id as number, args.force as boolean);
                return {
                    content: [{
                        type: "text",
                        text: "Media deleted successfully"
                    }]
                };
            }
            default:
                throw new Error(`Unknown media tool: ${toolName}`);
        }
    }

    // Handle content tools (posts, pages, blocks)
    if (toolName.startsWith('claudeus_wp_content__')) {
        // For backward compatibility, use the existing content handler
        // which expects a WordPressClient
        if (clients.wordpress) {
            return handleContentTools(toolName, args, clients.wordpress);
        }
        
        // Fallback to direct API calls if WordPress client not available
        switch (toolName) {
            case 'claudeus_wp_content__get_posts': {
                const posts = await clients.posts.getPosts(args.filters as any);
                return {
                    content: [{
                        type: "text",
                        text: JSON.stringify(posts, null, 2)
                    }]
                };
            }
            case 'claudeus_wp_content__create_post': {
                const post = await clients.posts.createPost(args.data as any);
                return {
                    content: [{
                        type: "text",
                        text: JSON.stringify(post, null, 2)
                    }]
                };
            }
            case 'claudeus_wp_content__update_post': {
                const post = await clients.posts.updatePost(args.id as number, args.data as any);
                return {
                    content: [{
                        type: "text",
                        text: JSON.stringify(post, null, 2)
                    }]
                };
            }
            case 'claudeus_wp_content__delete_post': {
                await clients.posts.deletePost(args.id as number);
                return {
                    content: [{
                        type: "text",
                        text: "Post deleted successfully"
                    }]
                };
            }
            case 'claudeus_wp_content__get_pages': {
                const pages = await clients.pages.getPages(args.filters as any);
                return {
                    content: [{
                        type: "text",
                        text: JSON.stringify(pages, null, 2)
                    }]
                };
            }
            case 'claudeus_wp_content__create_page': {
                const page = await clients.pages.createPage(args.data as any);
                return {
                    content: [{
                        type: "text",
                        text: JSON.stringify(page, null, 2)
                    }]
                };
            }
            case 'claudeus_wp_content__update_page': {
                const page = await clients.pages.updatePage(args.id as number, args.data as any);
                return {
                    content: [{
                        type: "text",
                        text: JSON.stringify(page, null, 2)
                    }]
                };
            }
            case 'claudeus_wp_content__delete_page': {
                await clients.pages.deletePage(args.id as number);
                return {
                    content: [{
                        type: "text",
                        text: "Page deleted successfully"
                    }]
                };
            }
            case 'claudeus_wp_content__get_blocks': {
                const blocks = await clients.blocks.getBlocks(args.filters as any);
                return {
                    content: [{
                        type: "text",
                        text: JSON.stringify(blocks, null, 2)
                    }]
                };
            }
            case 'claudeus_wp_content__create_block': {
                const block = await clients.blocks.createBlock(args.data as any);
                return {
                    content: [{
                        type: "text",
                        text: JSON.stringify(block, null, 2)
                    }]
                };
            }
            case 'claudeus_wp_content__update_block': {
                const block = await clients.blocks.updateBlock(args.id as number, args.data as any);
                return {
                    content: [{
                        type: "text",
                        text: JSON.stringify(block, null, 2)
                    }]
                };
            }
            case 'claudeus_wp_content__delete_block': {
                await clients.blocks.deleteBlock(args.id as number);
                return {
                    content: [{
                        type: "text",
                        text: "Block deleted successfully"
                    }]
                };
            }
            case 'claudeus_wp_content__get_block_revisions': {
                const revisions = await clients.blocks.getBlockRevisions(args.id as number);
                return {
                    content: [{
                        type: "text",
                        text: JSON.stringify(revisions, null, 2)
                    }]
                };
            }
            default:
                throw new Error(`Unknown content tool: ${toolName}`);
        }
    }

    // Handle discovery tools
    if (toolName === 'claudeus_wp_discover_endpoints') {
        const baseUrl = clients.posts.site.url;
        const response = await axios.get(`${baseUrl}/wp-json/`);
        return {
            content: [{
                type: "text",
                text: JSON.stringify(response.data, null, 2)
            }]
        };
    }

    throw new Error(`Unknown tool: ${toolName}`);
}

