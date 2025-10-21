import { WordPressClient } from '../../wordpress-client.js';
import { PostFilters, PostData, PageFilters, PageData, BlockFilters, BlockData } from '../../types/index.js';

export async function handleContentTools(name: string, args: Record<string, unknown>, client: WordPressClient) {
    switch (name) {
        case 'claudeus_wp_content__get_posts': {
            const posts = await client.get<any[]>('/wp/v2/posts', args.filters as PostFilters);
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(posts, null, 2)
                }]
            };
        }
        case 'claudeus_wp_content__create_post': {
            const data = args.data as PostData;
            const formattedData = {
                ...data,
                title: {
                    raw: data.title
                },
                content: {
                    raw: data.content
                },
                excerpt: data.excerpt ? {
                    raw: data.excerpt
                } : undefined
            };
            
            const post = await client.post<any>('/wp/v2/posts', formattedData);
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(post, null, 2)
                }]
            };
        }
        case 'claudeus_wp_content__update_post': {
            const data = args.data as Partial<PostData>;
            const formattedData = {
                ...data,
                title: data.title ? {
                    raw: data.title
                } : undefined,
                content: data.content ? {
                    raw: data.content
                } : undefined,
                excerpt: data.excerpt ? {
                    raw: data.excerpt
                } : undefined
            };
            
            const post = await client.put<any>(`/wp/v2/posts/${args.id}`, formattedData);
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(post, null, 2)
                }]
            };
        }
        case 'claudeus_wp_content__delete_post': {
            await client.delete(`/wp/v2/posts/${args.id}`);
            return {
                content: [{
                    type: "text",
                    text: "Post deleted successfully"
                }]
            };
        }
        case 'claudeus_wp_content__get_pages': {
            const pages = await client.get<any[]>('/wp/v2/pages', args.filters as PageFilters);
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(pages, null, 2)
                }]
            };
        }
        case 'claudeus_wp_content__create_page': {
            const page = await client.post<any>('/wp/v2/pages', args.data as PageData);
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(page, null, 2)
                }]
            };
        }
        case 'claudeus_wp_content__update_page': {
            const page = await client.put<any>(`/wp/v2/pages/${args.id}`, args.data as Partial<PageData>);
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(page, null, 2)
                }]
            };
        }
        case 'claudeus_wp_content__delete_page': {
            await client.delete(`/wp/v2/pages/${args.id}`);
            return {
                content: [{
                    type: "text",
                    text: "Page deleted successfully"
                }]
            };
        }
        case 'claudeus_wp_content__get_blocks': {
            const blocks = await client.get<any[]>('/wp/v2/blocks', args.filters as BlockFilters);
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(blocks, null, 2)
                }]
            };
        }
        case 'claudeus_wp_content__create_block': {
            const block = await client.post<any>('/wp/v2/blocks', args.data as BlockData);
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(block, null, 2)
                }]
            };
        }
        case 'claudeus_wp_content__update_block': {
            const block = await client.put<any>(`/wp/v2/blocks/${args.id}`, args.data as Partial<BlockData>);
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(block, null, 2)
                }]
            };
        }
        case 'claudeus_wp_content__delete_block': {
            await client.delete(`/wp/v2/blocks/${args.id}`);
            return {
                content: [{
                    type: "text",
                    text: "Block deleted successfully"
                }]
            };
        }
        // Post Revisions & Autosaves
        case 'claudeus_wp_content__get_post_revisions': {
            const revisions = await client.get(`/wp/v2/posts/${args.id}/revisions`);
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(revisions, null, 2)
                }]
            };
        }
        case 'claudeus_wp_content__get_post_revision': {
            const revision = await client.get(`/wp/v2/posts/${args.id}/revisions/${args.revision_id}`);
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(revision, null, 2)
                }]
            };
        }
        case 'claudeus_wp_content__delete_post_revision': {
            const result = await client.delete(`/wp/v2/posts/${args.id}/revisions/${args.revision_id}?force=true`);
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(result, null, 2)
                }]
            };
        }
        case 'claudeus_wp_content__get_post_autosaves': {
            const autosaves = await client.get(`/wp/v2/posts/${args.id}/autosaves`);
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(autosaves, null, 2)
                }]
            };
        }
        case 'claudeus_wp_content__get_post_autosave': {
            const autosave = await client.get(`/wp/v2/posts/${args.id}/autosaves/${args.autosave_id}`);
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(autosave, null, 2)
                }]
            };
        }
        case 'claudeus_wp_content__create_post_autosave': {
            const autosave = await client.post(`/wp/v2/posts/${args.id}/autosaves`, args.data);
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(autosave, null, 2)
                }]
            };
        }
        // Page Revisions & Autosaves
        case 'claudeus_wp_content__get_page_revisions': {
            const revisions = await client.get(`/wp/v2/pages/${args.id}/revisions`);
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(revisions, null, 2)
                }]
            };
        }
        case 'claudeus_wp_content__get_page_revision': {
            const revision = await client.get(`/wp/v2/pages/${args.id}/revisions/${args.revision_id}`);
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(revision, null, 2)
                }]
            };
        }
        case 'claudeus_wp_content__delete_page_revision': {
            const result = await client.delete(`/wp/v2/pages/${args.id}/revisions/${args.revision_id}?force=true`);
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(result, null, 2)
                }]
            };
        }
        case 'claudeus_wp_content__get_page_autosaves': {
            const autosaves = await client.get(`/wp/v2/pages/${args.id}/autosaves`);
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(autosaves, null, 2)
                }]
            };
        }
        case 'claudeus_wp_content__get_page_autosave': {
            const autosave = await client.get(`/wp/v2/pages/${args.id}/autosaves/${args.autosave_id}`);
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(autosave, null, 2)
                }]
            };
        }
        case 'claudeus_wp_content__create_page_autosave': {
            const autosave = await client.post(`/wp/v2/pages/${args.id}/autosaves`, args.data);
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(autosave, null, 2)
                }]
            };
        }
        // Block Revisions & Autosaves
        case 'claudeus_wp_content__get_block_revisions': {
            const revisions = await client.get(`/wp/v2/blocks/${args.id}/revisions`);
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(revisions, null, 2)
                }]
            };
        }
        case 'claudeus_wp_content__get_block_revision': {
            const revision = await client.get(`/wp/v2/blocks/${args.id}/revisions/${args.revision_id}`);
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(revision, null, 2)
                }]
            };
        }
        case 'claudeus_wp_content__delete_block_revision': {
            const result = await client.delete(`/wp/v2/blocks/${args.id}/revisions/${args.revision_id}?force=true`);
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(result, null, 2)
                }]
            };
        }
        case 'claudeus_wp_content__get_block_autosaves': {
            const autosaves = await client.get(`/wp/v2/blocks/${args.id}/autosaves`);
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(autosaves, null, 2)
                }]
            };
        }
        case 'claudeus_wp_content__get_block_autosave': {
            const autosave = await client.get(`/wp/v2/blocks/${args.id}/autosaves/${args.autosave_id}`);
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(autosave, null, 2)
                }]
            };
        }
        case 'claudeus_wp_content__create_block_autosave': {
            const autosave = await client.post(`/wp/v2/blocks/${args.id}/autosaves`, args.data);
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(autosave, null, 2)
                }]
            };
        }
        default:
            throw new Error(`Unknown content tool: ${name}`);
    }
} 