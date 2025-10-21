import { BaseApiClient } from './base-client.js';
import { Page, PageData, PageFilters } from '../types/page.js';
import { Revision, Autosave } from '../types/post.js';
import { PaginatedResponse } from '../types/pagination.js';

export class PagesApiClient extends BaseApiClient {
    async getPages(filters?: PageFilters): Promise<PaginatedResponse<Page[]>> {
        return this.getPaginated<Page[]>('/pages', filters);
    }

    async createPage(data: PageData): Promise<Page> {
        const cleanData = { ...data };
        if (cleanData.template === undefined || cleanData.template === null) {
            delete cleanData.template;
        }
        return this.post<Page>('/pages', cleanData);
    }

    async updatePage(id: number, data: Partial<PageData>): Promise<Page> {
        const cleanData = { ...data };
        if (cleanData.template === undefined || cleanData.template === null) {
            delete cleanData.template;
        }
        return this.put<Page>(`/pages/${id}`, cleanData);
    }

    async deletePage(id: number): Promise<void> {
        return this.delete(`/pages/${id}`);
    }

    async getPageRevisions(id: number): Promise<PaginatedResponse<Revision[]>> {
        return this.getPaginated<Revision[]>(`/pages/${id}/revisions`);
    }

    async getPageRevision(pageId: number, revisionId: number): Promise<Revision> {
        return this.get<Revision>(`/pages/${pageId}/revisions/${revisionId}`);
    }

    async deletePageRevision(pageId: number, revisionId: number): Promise<{ deleted: boolean; previous: Revision }> {
        // Revisions require force=true (they don't support trash)
        return this.delete<{ deleted: boolean; previous: Revision }>(`/pages/${pageId}/revisions/${revisionId}?force=true`);
    }

    async getPageAutosaves(id: number): Promise<Autosave[]> {
        return this.get<Autosave[]>(`/pages/${id}/autosaves`);
    }

    async getPageAutosave(pageId: number, autosaveId: number): Promise<Autosave> {
        return this.get<Autosave>(`/pages/${pageId}/autosaves/${autosaveId}`);
    }

    async createPageAutosave(id: number, data: Partial<PageData>): Promise<Autosave> {
        return this.post<Autosave>(`/pages/${id}/autosaves`, data);
    }
} 