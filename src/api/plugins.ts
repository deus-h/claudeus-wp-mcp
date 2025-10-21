/**
 * WordPress Plugins API Client
 * Handles plugin management operations
 */

import { BaseApiClient } from './base-client.js';
import { Plugin, PluginFilters, PluginData } from '../types/plugin.js';

export class PluginsApiClient extends BaseApiClient {
    // ==========================================
    // PLUGINS
    // ==========================================

    /**
     * Get all installed plugins
     * @param filters Optional filters (status, search)
     */
    async getPlugins(filters?: PluginFilters): Promise<Plugin[]> {
        return this.get<Plugin[]>('/plugins', filters);
    }

    /**
     * Get a specific plugin by its file path
     * @param plugin Plugin file path (e.g., "akismet/akismet")
     */
    async getPlugin(plugin: string): Promise<Plugin> {
        return this.get<Plugin>(`/plugins/${plugin}`);
    }

    /**
     * Activate a plugin
     * @param plugin Plugin file path
     */
    async activatePlugin(plugin: string): Promise<Plugin> {
        const data: PluginData = {
            status: 'active'
        };
        return this.post<Plugin>(`/plugins/${plugin}`, data);
    }

    /**
     * Deactivate a plugin
     * @param plugin Plugin file path
     */
    async deactivatePlugin(plugin: string): Promise<Plugin> {
        const data: PluginData = {
            status: 'inactive'
        };
        return this.post<Plugin>(`/plugins/${plugin}`, data);
    }

    /**
     * Delete a plugin
     * @param plugin Plugin file path
     */
    async deletePlugin(plugin: string): Promise<{ deleted: boolean; previous: Plugin }> {
        return this.delete<{ deleted: boolean; previous: Plugin }>(`/plugins/${plugin}`);
    }
}

