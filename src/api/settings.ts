/**
 * WordPress Site Settings API Client
 * Handles site configuration and post type/status discovery
 */

import { BaseApiClient } from './base-client.js';
import { SiteSettings, SiteSettingsData, PostType, PostStatus } from '../types/settings.js';

export class SettingsApiClient extends BaseApiClient {
    // ==========================================
    // SITE SETTINGS
    // ==========================================

    /**
     * Get all site settings
     */
    async getSettings(): Promise<SiteSettings> {
        return this.get<SiteSettings>('/settings');
    }

    /**
     * Update site settings
     * @param data Settings to update
     */
    async updateSettings(data: SiteSettingsData): Promise<SiteSettings> {
        return this.post<SiteSettings>('/settings', data);
    }

    // ==========================================
    // POST TYPES
    // ==========================================

    /**
     * Get all registered post types
     */
    async getPostTypes(): Promise<Record<string, PostType>> {
        return this.get<Record<string, PostType>>('/types');
    }

    /**
     * Get a specific post type
     * @param type Post type slug (e.g., 'post', 'page', 'attachment')
     */
    async getPostType(type: string): Promise<PostType> {
        return this.get<PostType>(`/types/${type}`);
    }

    // ==========================================
    // POST STATUSES
    // ==========================================

    /**
     * Get all registered post statuses
     */
    async getPostStatuses(): Promise<Record<string, PostStatus>> {
        return this.get<Record<string, PostStatus>>('/statuses');
    }

    /**
     * Get a specific post status
     * @param status Post status slug (e.g., 'publish', 'draft', 'pending')
     */
    async getPostStatus(status: string): Promise<PostStatus> {
        return this.get<PostStatus>(`/statuses/${status}`);
    }
}

