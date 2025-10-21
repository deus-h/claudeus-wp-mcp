/**
 * Astra Theme API Client
 * Handles Astra Pro addon features: Mega Menus, Custom Layouts, etc.
 */

import axios, { AxiosInstance } from 'axios';
import { SiteConfig } from '../types/index.js';
import { AstraMegaMenu, AstraMegaMenuData } from '../types/astra-mega-menu.js';
import { AstraCustomLayout, AstraCustomLayoutData } from '../types/astra-custom-layout.js';

export class AstraApiClient {
    protected client: AxiosInstance;
    protected _site: SiteConfig;

    constructor(site: SiteConfig) {
        this._site = site;
        // Create client with base URL pointing to wp-json root (not wp/v2)
        this.client = axios.create({
            baseURL: `${site.url}/wp-json`,
            auth: site.authType === 'basic' ? {
                username: site.username,
                password: site.auth
            } : undefined,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                ...(site.authType === 'jwt' ? { 'Authorization': `Bearer ${site.auth}` } : {})
            }
        });
    }

    get site(): SiteConfig {
        return this._site;
    }

    // ==========================================
    // MEGA MENUS
    // ==========================================

    /**
     * Get mega menu configuration for a specific menu item
     * @param menuItemId The menu item ID to get mega menu config for
     */
    async getMegaMenu(menuItemId: number): Promise<AstraMegaMenu> {
        try {
            const response = await this.client.get<AstraMegaMenu>(
                `/astra_addon/v1/mega_menu/${menuItemId}`
            );
            return response.data;
        } catch (error) {
            throw new Error(`Failed to get mega menu: ${error}`);
        }
    }

    /**
     * Create or update mega menu configuration
     * @param data Mega menu configuration data
     */
    async updateMegaMenu(data: AstraMegaMenuData): Promise<AstraMegaMenu> {
        try {
            const response = await this.client.post<AstraMegaMenu>(
                '/astra_addon/v1/mega_menu',
                data
            );
            return response.data;
        } catch (error) {
            throw new Error(`Failed to update mega menu: ${error}`);
        }
    }

    /**
     * Enable mega menu for a menu item
     * @param menuItemId The menu item ID to enable mega menu for
     * @param columns Number of columns (2-6)
     */
    async enableMegaMenu(menuItemId: number, columns: number = 3): Promise<AstraMegaMenu> {
        return this.updateMegaMenu({
            menu_item_id: menuItemId,
            enabled: true,
            columns,
        });
    }

    /**
     * Disable mega menu for a menu item
     * @param menuItemId The menu item ID to disable mega menu for
     */
    async disableMegaMenu(menuItemId: number): Promise<AstraMegaMenu> {
        return this.updateMegaMenu({
            menu_item_id: menuItemId,
            enabled: false,
        });
    }

    // ==========================================
    // CUSTOM LAYOUTS
    // ==========================================

    /**
     * Get all custom layouts
     * Returns custom headers, footers, and hook layouts
     */
    async getCustomLayouts(): Promise<AstraCustomLayout[]> {
        try {
            const response = await this.client.get<AstraCustomLayout[]>(
                '/astra-addon/v1/custom-layouts'
            );
            return response.data;
        } catch (error) {
            throw new Error(`Failed to get custom layouts: ${error}`);
        }
    }

    /**
     * Get a specific custom layout by ID
     * @param id Custom layout ID
     */
    async getCustomLayout(id: number): Promise<AstraCustomLayout> {
        try {
            const response = await this.client.get<AstraCustomLayout>(
                `/wp/v2/astra-advanced-hook/${id}`
            );
            return response.data;
        } catch (error) {
            throw new Error(`Failed to get custom layout: ${error}`);
        }
    }

    /**
     * Create a new custom layout
     * @param data Custom layout data
     */
    async createCustomLayout(data: AstraCustomLayoutData): Promise<AstraCustomLayout> {
        try {
            const response = await this.client.post<AstraCustomLayout>(
                '/wp/v2/astra-advanced-hook',
                data
            );
            return response.data;
        } catch (error) {
            throw new Error(`Failed to create custom layout: ${error}`);
        }
    }

    /**
     * Update an existing custom layout
     * @param id Custom layout ID
     * @param data Updated layout data
     */
    async updateCustomLayout(id: number, data: Partial<AstraCustomLayoutData>): Promise<AstraCustomLayout> {
        try {
            const response = await this.client.put<AstraCustomLayout>(
                `/wp/v2/astra-advanced-hook/${id}`,
                data
            );
            return response.data;
        } catch (error) {
            throw new Error(`Failed to update custom layout: ${error}`);
        }
    }

    /**
     * Delete a custom layout
     * @param id Custom layout ID
     * @param force Whether to force delete (bypass trash)
     */
    async deleteCustomLayout(id: number, force: boolean = false): Promise<{ deleted: boolean; previous: AstraCustomLayout }> {
        try {
            const response = await this.client.delete<{ deleted: boolean; previous: AstraCustomLayout }>(
                `/astra-addon/v1/custom-layouts/${id}${force ? '?force=true' : ''}`
            );
            return response.data;
        } catch (error) {
            throw new Error(`Failed to delete custom layout: ${error}`);
        }
    }

    // ==========================================
    // THEME SETTINGS
    // ==========================================

    /**
     * Get Astra theme settings
     * Returns all theme configuration (header, footer, colors, typography, etc.)
     */
    async getThemeSettings(): Promise<Record<string, any>> {
        try {
            const response = await this.client.get<Record<string, any>>(
                '/astra/v1/admin/settings'
            );
            return response.data;
        } catch (error) {
            throw new Error(`Failed to get theme settings: ${error}`);
        }
    }

    /**
     * Update Astra theme settings
     * @param settings Updated settings object
     */
    async updateThemeSettings(settings: Record<string, any>): Promise<Record<string, any>> {
        try {
            const response = await this.client.post<Record<string, any>>(
                '/astra/v1/admin/settings',
                settings
            );
            return response.data;
        } catch (error) {
            throw new Error(`Failed to update theme settings: ${error}`);
        }
    }
}

