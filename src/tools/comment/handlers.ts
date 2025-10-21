import { CommentsApiClient } from '../../api/comments.js';
import { CommentFilters, CommentData } from '../../types/index.js';

export async function handleCommentTools(
    name: string,
    args: Record<string, unknown>,
    client: CommentsApiClient
) {
    switch (name) {
        // ==========================================
        // COMMENTS CRUD
        // ==========================================
        case 'claudeus_wp_comments__get_comments': {
            const comments = await client.getComments(args.filters as CommentFilters);
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(comments, null, 2)
                }]
            };
        }
        case 'claudeus_wp_comments__get_comment': {
            const comment = await client.getComment(
                args.id as number,
                args.password as string | undefined
            );
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(comment, null, 2)
                }]
            };
        }
        case 'claudeus_wp_comments__create_comment': {
            const comment = await client.createComment(args.data as CommentData);
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(comment, null, 2)
                }]
            };
        }
        case 'claudeus_wp_comments__update_comment': {
            const comment = await client.updateComment(
                args.id as number,
                args.data as Partial<CommentData>
            );
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(comment, null, 2)
                }]
            };
        }
        case 'claudeus_wp_comments__delete_comment': {
            const result = await client.deleteComment(
                args.id as number,
                args.force as boolean
            );
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(result, null, 2)
                }]
            };
        }
        // ==========================================
        // COMMENT MODERATION
        // ==========================================
        case 'claudeus_wp_comments__approve': {
            const comment = await client.approveComment(args.id as number);
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(comment, null, 2)
                }]
            };
        }
        case 'claudeus_wp_comments__spam': {
            const comment = await client.spamComment(args.id as number);
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(comment, null, 2)
                }]
            };
        }
        case 'claudeus_wp_comments__trash': {
            const comment = await client.trashComment(args.id as number);
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(comment, null, 2)
                }]
            };
        }
        default:
            throw new Error(`Unknown comment tool: ${name}`);
    }
}

