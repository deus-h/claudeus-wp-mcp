import { PostsApiClient } from '../api/posts.js';
import { PostData, PostFilters } from '../types/index.js';

interface BlogPostArgs {
    topic: string;
    keywords?: string[];
    tone?: 'professional' | 'casual' | 'technical' | 'friendly';
}

interface SeoAnalysisArgs {
    post_id: number;
    target_keywords?: string[];
}

interface BulkUpdateArgs {
    criteria: {
        category?: string;
        status?: 'publish' | 'draft' | 'private';
        date_from?: string;
        date_to?: string;
    };
    updates: {
        status?: 'publish' | 'draft' | 'private';
        categories?: number[];
        tags?: number[];
    };
}

export async function handlePrompts(
    promptId: string, 
    args: Record<string, unknown>,
    client: { posts: PostsApiClient }
) {
    switch (promptId) {
        case 'create_blog_post': {
            const typedArgs = args as unknown as BlogPostArgs;
            const { topic, keywords = [], tone = 'professional' } = typedArgs;
            
            // Here we'd use the LLM to generate the content based on the template
            // For now, we'll create a basic post
            const postData: PostData = {
                title: `Blog Post about ${topic}`,
                content: `Generated content about ${topic} with keywords: ${keywords.join(', ')}. Tone: ${tone}`,
                status: 'draft'
            };

            const post = await client.posts.createPost(postData);
            return {
                messages: [
                    {
                        role: 'assistant',
                        content: {
                            type: 'text',
                            text: JSON.stringify(post, null, 2)
                        }
                    }
                ]
            };
        }

        case 'analyze_post_seo': {
            const typedArgs = args as unknown as SeoAnalysisArgs;
            const { post_id, target_keywords = [] } = typedArgs;
            
            // Get the post content
            const response = await client.posts.getPosts({ include: [post_id] } as PostFilters);
            const post = response.data[0];
            
            if (!post) {
                throw new Error(`Post not found: ${post_id}`);
            }
            
            // Here we'd use the LLM to analyze the post content
            return {
                messages: [
                    {
                        role: 'assistant',
                        content: {
                            type: 'text',
                            text: JSON.stringify({
                                post_id,
                                analysis: {
                                    title: `Analysis of post title: ${post.title}`,
                                    keywords: `Keyword analysis for: ${target_keywords.join(', ')}`,
                                    suggestions: [
                                        "Add more internal links",
                                        "Optimize meta description",
                                        "Include more target keywords"
                                    ]
                                }
                            }, null, 2)
                        }
                    }
                ]
            };
        }

        case 'bulk_update_posts': {
            const typedArgs = args as unknown as BulkUpdateArgs;
            const { criteria, updates } = typedArgs;
            
            // Here we'd use the criteria to find matching posts and apply updates
            return {
                messages: [
                    {
                        role: 'assistant',
                        content: {
                            type: 'text',
                            text: JSON.stringify({
                                plan: {
                                    criteria,
                                    updates,
                                    status: "Ready to update matching posts"
                                }
                            }, null, 2)
                        }
                    }
                ]
            };
        }

        default:
            throw new Error(`Unknown prompt: ${promptId}`);
    }
} 