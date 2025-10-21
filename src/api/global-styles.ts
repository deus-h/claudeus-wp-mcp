/**
 * WordPress Global Styles API Client
 * Handles FSE (Full Site Editing) global styles and variations
 */

import { BaseApiClient } from './base-client.js';
import { GlobalStyles, GlobalStylesData, GlobalStylesVariation } from '../types/global-styles.js';
import { PaginatedResponse } from '../types/pagination.js';
import { Revision } from '../types/post.js';

export class GlobalStylesApiClient extends BaseApiClient {
    // ==========================================
    // GLOBAL STYLES
    // ==========================================

    /**
     * Get global styles by ID
     * @param id Global styles ID (usually the theme slug or "custom")
     */
    async getGlobalStyles(id: string = 'custom'): Promise<GlobalStyles> {
        return this.get<GlobalStyles>(`/global-styles/${id}`);
    }

    /**
     * Update global styles
     * @param id Global styles ID
     * @param data Updated styles and/or settings
     */
    async updateGlobalStyles(id: string, data: GlobalStylesData): Promise<GlobalStyles> {
        return this.put<GlobalStyles>(`/global-styles/${id}`, data);
    }

    // ==========================================
    // THEME GLOBAL STYLES
    // ==========================================

    /**
     * Get global styles for a specific theme
     * @param stylesheet Theme stylesheet name (e.g., "twentytwentyfour")
     */
    async getThemeGlobalStyles(stylesheet: string): Promise<GlobalStyles> {
        return this.get<GlobalStyles>(`/global-styles/themes/${stylesheet}`);
    }

    /**
     * Get style variations for a theme
     * @param stylesheet Theme stylesheet name
     */
    async getStyleVariations(stylesheet: string): Promise<GlobalStylesVariation[]> {
        return this.get<GlobalStylesVariation[]>(`/global-styles/themes/${stylesheet}/variations`);
    }

    // ==========================================
    // REVISIONS
    // ==========================================

    /**
     * Get revisions for global styles
     * @param parentId Parent global styles ID
     */
    async getGlobalStylesRevisions(parentId: number): Promise<PaginatedResponse<Revision[]>> {
        return this.getPaginated<Revision[]>(`/global-styles/${parentId}/revisions`);
    }

    /**
     * Get a specific global styles revision
     * @param parentId Parent global styles ID
     * @param revisionId Revision ID
     */
    async getGlobalStylesRevision(parentId: number, revisionId: number): Promise<Revision> {
        return this.get<Revision>(`/global-styles/${parentId}/revisions/${revisionId}`);
    }
}

