import { BaseApiClient } from './base-client.js';
import { Theme, ThemeFilters, ThemeCustomization, ThemeCustomizationUpdate } from '../types/theme.js';
import { PaginatedResponse } from '../types/pagination.js';

export class ThemeApiClient extends BaseApiClient {
    async getThemes(filters?: ThemeFilters): Promise<PaginatedResponse<Theme[]>> {
        return this.getPaginated<Theme[]>('/themes', filters);
    }

    async getTheme(stylesheet: string): Promise<Theme> {
        return this.get<Theme>(`/themes/${stylesheet}`);
    }

    async getActiveTheme(): Promise<Theme> {
        const themes = await this.get<Theme[]>('/themes', { status: 'active' });
        if (!themes.length) {
            throw new Error('No active theme found');
        }
        return themes[0];
    }

    async activateTheme(stylesheet: string): Promise<Theme> {
        return this.post<Theme>(`/themes/${stylesheet}`, { status: 'active' });
    }

    async getThemeCustomization(): Promise<ThemeCustomization> {
        return this.get<ThemeCustomization>('/settings');
    }

    async updateThemeCustomization(updates: ThemeCustomizationUpdate): Promise<ThemeCustomization> {
        return this.post<ThemeCustomization>('/settings', updates);
    }

    async getCustomCss(): Promise<string> {
        const response = await this.get<{custom_css: string}>('/settings');
        return response.custom_css || '';
    }

    async updateCustomCss(css: string): Promise<void> {
        return this.post('/settings', { custom_css: css });
    }
} 