import { BaseApiClient } from './base-client.js';
import { Post, PostData, PostFilters, Revision, Autosave } from '../types/post.js';
import { PaginatedResponse } from '../types/pagination.js';

export class PostsApiClient extends BaseApiClient {
    async getPosts(filters?: PostFilters): Promise<PaginatedResponse<Post[]>> {
        return this.getPaginated<Post[]>('/posts', filters);
    }

    async createPost(data: PostData): Promise<Post> {
        return this.post<Post>('/posts', data);
    }

    async updatePost(id: number, data: Partial<PostData>): Promise<Post> {
        return this.put<Post>(`/posts/${id}`, data);
    }

    async deletePost(id: number): Promise<void> {
        return this.delete(`/posts/${id}`);
    }

    async getPostRevisions(id: number): Promise<PaginatedResponse<Revision[]>> {
        return this.getPaginated<Revision[]>(`/posts/${id}/revisions`);
    }

    async getPostRevision(postId: number, revisionId: number): Promise<Revision> {
        return this.get<Revision>(`/posts/${postId}/revisions/${revisionId}`);
    }

    async deletePostRevision(postId: number, revisionId: number): Promise<{ deleted: boolean; previous: Revision }> {
        // Revisions require force=true (they don't support trash)
        return this.delete<{ deleted: boolean; previous: Revision }>(`/posts/${postId}/revisions/${revisionId}?force=true`);
    }

    async getPostAutosaves(id: number): Promise<Autosave[]> {
        return this.get<Autosave[]>(`/posts/${id}/autosaves`);
    }

    async getPostAutosave(postId: number, autosaveId: number): Promise<Autosave> {
        return this.get<Autosave>(`/posts/${postId}/autosaves/${autosaveId}`);
    }

    async createPostAutosave(id: number, data: Partial<PostData>): Promise<Autosave> {
        return this.post<Autosave>(`/posts/${id}/autosaves`, data);
    }
} 