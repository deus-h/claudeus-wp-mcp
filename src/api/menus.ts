/**
 * WordPress Menus API Client
 * Handles menus, menu items, and menu locations
 */

import { BaseApiClient } from './base-client.js';
import { PaginatedResponse } from '../types/pagination.js';
import {
    Menu,
    MenuData,
    MenuFilters,
    MenuItem,
    MenuItemData,
    MenuItemFilters,
    MenuLocation
} from '../types/menu.js';

export class MenusApiClient extends BaseApiClient {
    // ==========================================
    // MENUS CRUD
    // ==========================================

    /**
     * Get a list of menus with pagination metadata
     */
    async getMenus(filters?: MenuFilters): Promise<PaginatedResponse<Menu[]>> {
        return this.getPaginated<Menu[]>('/menus', filters);
    }

    /**
     * Get a single menu by ID
     */
    async getMenu(id: number): Promise<Menu> {
        return this.get<Menu>(`/menus/${id}`);
    }

    /**
     * Create a new menu
     */
    async createMenu(data: MenuData): Promise<Menu> {
        return this.post<Menu>('/menus', data);
    }

    /**
     * Update an existing menu
     */
    async updateMenu(id: number, data: Partial<MenuData>): Promise<Menu> {
        return this.put<Menu>(`/menus/${id}`, data);
    }

    /**
     * Delete a menu
     * @param id Menu ID
     * @param force Whether to bypass trash and force deletion
     */
    async deleteMenu(id: number, force: boolean = false): Promise<{ deleted: boolean; previous: Menu }> {
        const queryString = force ? '?force=true' : '';
        return this.delete<{ deleted: boolean; previous: Menu }>(`/menus/${id}${queryString}`);
    }

    // ==========================================
    // MENU ITEMS CRUD
    // ==========================================

    /**
     * Get a list of menu items with pagination metadata
     */
    async getMenuItems(filters?: MenuItemFilters): Promise<PaginatedResponse<MenuItem[]>> {
        return this.getPaginated<MenuItem[]>('/menu-items', filters);
    }

    /**
     * Get a single menu item by ID
     */
    async getMenuItem(id: number): Promise<MenuItem> {
        return this.get<MenuItem>(`/menu-items/${id}`);
    }

    /**
     * Create a new menu item
     */
    async createMenuItem(data: MenuItemData): Promise<MenuItem> {
        return this.post<MenuItem>('/menu-items', data);
    }

    /**
     * Update an existing menu item
     */
    async updateMenuItem(id: number, data: Partial<MenuItemData>): Promise<MenuItem> {
        return this.put<MenuItem>(`/menu-items/${id}`, data);
    }

    /**
     * Delete a menu item
     * @param id Menu item ID
     * @param force Whether to bypass trash and force deletion
     */
    async deleteMenuItem(id: number, force: boolean = false): Promise<{ deleted: boolean; previous: MenuItem }> {
        const queryString = force ? '?force=true' : '';
        return this.delete<{ deleted: boolean; previous: MenuItem }>(`/menu-items/${id}${queryString}`);
    }

    // ==========================================
    // MENU LOCATIONS
    // ==========================================

    /**
     * Get all menu locations registered by the theme
     */
    async getMenuLocations(): Promise<Record<string, MenuLocation>> {
        return this.get<Record<string, MenuLocation>>('/menu-locations');
    }

    /**
     * Get a specific menu location by slug
     */
    async getMenuLocation(location: string): Promise<MenuLocation> {
        return this.get<MenuLocation>(`/menu-locations/${location}`);
    }
}

