/**
 * WordPress Widgets & Sidebars API Client
 * Handles widget and sidebar management operations
 */

import { BaseApiClient } from './base-client.js';
import { Sidebar, Widget, WidgetData, SidebarFilters, WidgetFilters } from '../types/widget.js';

export class WidgetsApiClient extends BaseApiClient {
    // ==========================================
    // SIDEBARS
    // ==========================================

    /**
     * Get all registered sidebars
     * @param filters Optional filters
     */
    async getSidebars(filters?: SidebarFilters): Promise<Sidebar[]> {
        return this.get<Sidebar[]>('/sidebars', filters);
    }

    /**
     * Get a specific sidebar by ID
     * @param id Sidebar ID
     */
    async getSidebar(id: string): Promise<Sidebar> {
        return this.get<Sidebar>(`/sidebars/${id}`);
    }

    /**
     * Update a sidebar (replace all widgets)
     * @param id Sidebar ID
     * @param widgets Array of widget IDs to place in sidebar
     */
    async updateSidebar(id: string, widgets: string[]): Promise<Sidebar> {
        return this.post<Sidebar>(`/sidebars/${id}`, { widgets });
    }

    // ==========================================
    // WIDGETS
    // ==========================================

    /**
     * Get all widgets
     * @param filters Optional filters (sidebar, context)
     */
    async getWidgets(filters?: WidgetFilters): Promise<Widget[]> {
        return this.get<Widget[]>('/widgets', filters);
    }

    /**
     * Get a specific widget by ID
     * @param id Widget ID
     */
    async getWidget(id: string): Promise<Widget> {
        return this.get<Widget>(`/widgets/${id}`);
    }

    /**
     * Create a new widget
     * @param data Widget data (id_base, sidebar, instance)
     */
    async createWidget(data: WidgetData): Promise<Widget> {
        return this.post<Widget>('/widgets', data);
    }

    /**
     * Update an existing widget
     * @param id Widget ID
     * @param data Widget data to update
     */
    async updateWidget(id: string, data: Partial<WidgetData>): Promise<Widget> {
        return this.post<Widget>(`/widgets/${id}`, data);
    }

    /**
     * Delete a widget
     * @param id Widget ID
     * @param force Whether to force delete (bypass trash)
     */
    async deleteWidget(id: string, force: boolean = false): Promise<{ deleted: boolean; previous: Widget }> {
        const endpoint = force ? `/widgets/${id}?force=true` : `/widgets/${id}`;
        return this.delete<{ deleted: boolean; previous: Widget }>(endpoint);
    }
}

