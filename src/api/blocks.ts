import { BaseApiClient } from './base-client.js';
import { Block, BlockData, BlockFilters } from '../types/block.js';
import { Revision, Autosave } from '../types/post.js';
import { PaginatedResponse } from '../types/pagination.js';

export class BlocksApiClient extends BaseApiClient {
    async getBlocks(filters?: BlockFilters): Promise<PaginatedResponse<Block[]>> {
        return this.getPaginated<Block[]>('/blocks', filters);
    }

    async createBlock(data: BlockData): Promise<Block> {
        return this.post<Block>('/blocks', data);
    }

    async updateBlock(id: number, data: Partial<BlockData>): Promise<Block> {
        return this.put<Block>(`/blocks/${id}`, data);
    }

    async deleteBlock(id: number): Promise<void> {
        return this.delete(`/blocks/${id}`);
    }

    async getBlockRevisions(id: number): Promise<PaginatedResponse<Revision[]>> {
        return this.getPaginated<Revision[]>(`/blocks/${id}/revisions`);
    }

    async getBlockRevision(blockId: number, revisionId: number): Promise<Revision> {
        return this.get<Revision>(`/blocks/${blockId}/revisions/${revisionId}`);
    }

    async deleteBlockRevision(blockId: number, revisionId: number): Promise<{ deleted: boolean; previous: Revision }> {
        // Revisions require force=true (they don't support trash)
        return this.delete<{ deleted: boolean; previous: Revision }>(`/blocks/${blockId}/revisions/${revisionId}?force=true`);
    }

    async getBlockAutosaves(id: number): Promise<Autosave[]> {
        return this.get<Autosave[]>(`/blocks/${id}/autosaves`);
    }

    async getBlockAutosave(blockId: number, autosaveId: number): Promise<Autosave> {
        return this.get<Autosave>(`/blocks/${blockId}/autosaves/${autosaveId}`);
    }

    async createBlockAutosave(id: number, data: Partial<BlockData>): Promise<Autosave> {
        return this.post<Autosave>(`/blocks/${id}/autosaves`, data);
    }
} 