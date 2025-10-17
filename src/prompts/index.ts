interface PromptArgument {
    name: string;
    description: string;
    required: boolean;
}

interface PromptDefinition {
    name: string;
    description: string;
    arguments: PromptArgument[];
}

interface Prompts {
    [key: string]: PromptDefinition;
}

export const prompts: Prompts = {
    "create-blog-post": {
        name: "create-blog-post",
        description: "Generate a blog post with SEO optimization",
        arguments: [
            {
                name: "topic",
                description: "Main topic or subject of the blog post",
                required: true
            },
            {
                name: "keywords",
                description: "Target SEO keywords (comma-separated)",
                required: true
            },
            {
                name: "tone",
                description: "Writing tone (e.g. professional, casual, technical)",
                required: false
            }
        ]
    },
    "analyze-post-seo": {
        name: "analyze-post-seo",
        description: "Analyze a post's SEO and suggest improvements",
        arguments: [
            {
                name: "post_id",
                description: "ID of the post to analyze",
                required: true
            },
            {
                name: "target_keywords",
                description: "Target keywords to check against",
                required: true
            }
        ]
    },
    "bulk-update-posts": {
        name: "bulk-update-posts",
        description: "Plan and execute bulk updates to multiple posts",
        arguments: [
            {
                name: "criteria",
                description: "Criteria to select posts for update (JSON)",
                required: true
            },
            {
                name: "updates",
                description: "Updates to apply to selected posts (JSON)",
                required: true
            }
        ]
    }
}; 