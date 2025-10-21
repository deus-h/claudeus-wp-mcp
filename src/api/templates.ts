/**
 * WordPress Templates API Client
 * Handles FSE (Full Site Editing) templates and template parts
 */

import { BaseApiClient } from './base-client.js';
import { Template, TemplatePart, TemplateData, TemplateFilters } from '../types/template.js';

export class TemplatesApiClient extends BaseApiClient {
    // ==========================================
    // TEMPLATES
    // ==========================================

    /**
     * Get a list of templates
     */
    async getTemplates(filters?: TemplateFilters): Promise<Template[]> {
        return this.get<Template[]>('/templates', filters);
    }

    /**
     * Get a single template by ID
     * @param id Template ID (slug format, e.g., "twentytwentyfour//home")
     */
    async getTemplate(id: string): Promise<Template> {
        // Template IDs contain slashes and need special encoding
        const encodedId = id.split('/').map(encodeURIComponent).join('/');
        return this.get<Template>(`/templates/${encodedId}`);
    }

    /**
     * Create a new template
     */
    async createTemplate(data: TemplateData): Promise<Template> {
        return this.post<Template>('/templates', data);
    }

    /**
     * Update an existing template
     * @param id Template ID
     * @param data Template data to update
     */
    async updateTemplate(id: string, data: Partial<TemplateData>): Promise<Template> {
        const encodedId = id.split('/').map(encodeURIComponent).join('/');
        return this.put<Template>(`/templates/${encodedId}`, data);
    }

    /**
     * Delete a template
     * @param id Template ID
     * @param force Whether to bypass trash and force deletion
     */
    async deleteTemplate(id: string, force: boolean = false): Promise<{ deleted: boolean; previous: Template }> {
        const encodedId = id.split('/').map(encodeURIComponent).join('/');
        const queryString = force ? '?force=true' : '';
        return this.delete<{ deleted: boolean; previous: Template }>(`/templates/${encodedId}${queryString}`);
    }

    // ==========================================
    // TEMPLATE PARTS
    // ==========================================

    /**
     * Get a list of template parts
     */
    async getTemplateParts(filters?: TemplateFilters): Promise<TemplatePart[]> {
        return this.get<TemplatePart[]>('/template-parts', filters);
    }

    /**
     * Get a single template part by ID
     * @param id Template part ID (slug format, e.g., "twentytwentyfour//header")
     */
    async getTemplatePart(id: string): Promise<TemplatePart> {
        const encodedId = id.split('/').map(encodeURIComponent).join('/');
        return this.get<TemplatePart>(`/template-parts/${encodedId}`);
    }

    /**
     * Create a new template part
     */
    async createTemplatePart(data: TemplateData): Promise<TemplatePart> {
        return this.post<TemplatePart>('/template-parts', data);
    }

    /**
     * Update an existing template part
     * @param id Template part ID
     * @param data Template part data to update
     */
    async updateTemplatePart(id: string, data: Partial<TemplateData>): Promise<TemplatePart> {
        const encodedId = id.split('/').map(encodeURIComponent).join('/');
        return this.put<TemplatePart>(`/template-parts/${encodedId}`, data);
    }

    /**
     * Delete a template part
     * @param id Template part ID
     * @param force Whether to bypass trash and force deletion
     */
    async deleteTemplatePart(id: string, force: boolean = false): Promise<{ deleted: boolean; previous: TemplatePart }> {
        const encodedId = id.split('/').map(encodeURIComponent).join('/');
        const queryString = force ? '?force=true' : '';
        return this.delete<{ deleted: boolean; previous: TemplatePart }>(`/template-parts/${encodedId}${queryString}`);
    }
}

