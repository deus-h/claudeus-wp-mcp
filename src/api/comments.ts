/**
 * WordPress Comments API Client
 * Handles comments, moderation, and replies
 */

import { BaseApiClient } from './base-client.js';
import { PaginatedResponse } from '../types/pagination.js';
import { Comment, CommentData, CommentFilters } from '../types/comment.js';

export class CommentsApiClient extends BaseApiClient {
    // ==========================================
    // COMMENTS CRUD
    // ==========================================

    /**
     * Get a list of comments with pagination metadata
     */
    async getComments(filters?: CommentFilters): Promise<PaginatedResponse<Comment[]>> {
        return this.getPaginated<Comment[]>('/comments', filters);
    }

    /**
     * Get a single comment by ID
     */
    async getComment(id: number, password?: string): Promise<Comment> {
        const params = password ? { password } : undefined;
        return this.get<Comment>(`/comments/${id}`, params);
    }

    /**
     * Create a new comment
     */
    async createComment(data: CommentData): Promise<Comment> {
        return this.post<Comment>('/comments', data);
    }

    /**
     * Update an existing comment
     */
    async updateComment(id: number, data: Partial<CommentData>): Promise<Comment> {
        return this.put<Comment>(`/comments/${id}`, data);
    }

    /**
     * Delete a comment
     * @param id Comment ID
     * @param force Whether to bypass trash and force deletion
     */
    async deleteComment(id: number, force: boolean = false): Promise<{ deleted: boolean; previous: Comment }> {
        const queryString = force ? '?force=true' : '';
        return this.delete<{ deleted: boolean; previous: Comment }>(`/comments/${id}${queryString}`);
    }

    // ==========================================
    // MODERATION HELPERS
    // ==========================================

    /**
     * Approve a comment
     */
    async approveComment(id: number): Promise<Comment> {
        return this.updateComment(id, { status: 'approve' });
    }

    /**
     * Hold a comment for moderation
     */
    async holdComment(id: number): Promise<Comment> {
        return this.updateComment(id, { status: 'hold' });
    }

    /**
     * Mark a comment as spam
     */
    async spamComment(id: number): Promise<Comment> {
        return this.updateComment(id, { status: 'spam' });
    }

    /**
     * Move a comment to trash
     */
    async trashComment(id: number): Promise<Comment> {
        return this.updateComment(id, { status: 'trash' });
    }
}

