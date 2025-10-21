/**
 * WordPress Taxonomies API Client
 * Handles categories, tags, and custom taxonomies
 */

import { BaseApiClient } from './base-client.js';
import { PaginatedResponse } from '../types/pagination.js';
import {
    Category,
    Tag,
    Term,
    Taxonomy,
    CategoryFilters,
    TagFilters,
    TermFilters,
    CategoryData,
    TagData,
    TermData
} from '../types/taxonomy.js';

export class TaxonomiesApiClient extends BaseApiClient {
    // ==========================================
    // CATEGORIES
    // ==========================================

    /**
     * Get a list of categories with pagination metadata
     */
    async getCategories(filters?: CategoryFilters): Promise<PaginatedResponse<Category[]>> {
        return this.getPaginated<Category[]>('/categories', filters);
    }

    /**
     * Get a single category by ID
     */
    async getCategory(id: number): Promise<Category> {
        return this.get<Category>(`/categories/${id}`);
    }

    /**
     * Create a new category
     */
    async createCategory(data: CategoryData): Promise<Category> {
        return this.post<Category>('/categories', data);
    }

    /**
     * Update an existing category
     */
    async updateCategory(id: number, data: Partial<CategoryData>): Promise<Category> {
        return this.put<Category>(`/categories/${id}`, data);
    }

    /**
     * Delete a category
     */
    async deleteCategory(id: number, force: boolean = false): Promise<{ deleted: boolean; previous: Category }> {
        return this.delete<{ deleted: boolean; previous: Category }>(`/categories/${id}?force=${force}`);
    }

    // ==========================================
    // TAGS
    // ==========================================

    /**
     * Get a list of tags with pagination metadata
     */
    async getTags(filters?: TagFilters): Promise<PaginatedResponse<Tag[]>> {
        return this.getPaginated<Tag[]>('/tags', filters);
    }

    /**
     * Get a single tag by ID
     */
    async getTag(id: number): Promise<Tag> {
        return this.get<Tag>(`/tags/${id}`);
    }

    /**
     * Create a new tag
     */
    async createTag(data: TagData): Promise<Tag> {
        return this.post<Tag>('/tags', data);
    }

    /**
     * Update an existing tag
     */
    async updateTag(id: number, data: Partial<TagData>): Promise<Tag> {
        return this.put<Tag>(`/tags/${id}`, data);
    }

    /**
     * Delete a tag
     */
    async deleteTag(id: number, force: boolean = false): Promise<{ deleted: boolean; previous: Tag }> {
        return this.delete<{ deleted: boolean; previous: Tag }>(`/tags/${id}?force=${force}`);
    }

    // ==========================================
    // TAXONOMIES
    // ==========================================

    /**
     * Get all registered taxonomies
     */
    async getTaxonomies(): Promise<Record<string, Taxonomy>> {
        return this.get<Record<string, Taxonomy>>('/taxonomies');
    }

    /**
     * Get a specific taxonomy by slug
     */
    async getTaxonomy(slug: string): Promise<Taxonomy> {
        return this.get<Taxonomy>(`/taxonomies/${slug}`);
    }

    // ==========================================
    // CUSTOM TAXONOMY TERMS
    // ==========================================

    /**
     * Get terms from a custom taxonomy with pagination metadata
     * @param taxonomy The taxonomy slug (e.g., 'category', 'post_tag', 'custom_taxonomy')
     */
    async getTerms(taxonomy: string, filters?: TermFilters): Promise<PaginatedResponse<Term[]>> {
        return this.getPaginated<Term[]>(`/${taxonomy}`, filters);
    }

    /**
     * Get a single term from a custom taxonomy
     */
    async getTerm(taxonomy: string, id: number): Promise<Term> {
        return this.get<Term>(`/${taxonomy}/${id}`);
    }

    /**
     * Create a term in a custom taxonomy
     */
    async createTerm(taxonomy: string, data: TermData): Promise<Term> {
        return this.post<Term>(`/${taxonomy}`, data);
    }

    /**
     * Update a term in a custom taxonomy
     */
    async updateTerm(taxonomy: string, id: number, data: Partial<TermData>): Promise<Term> {
        return this.put<Term>(`/${taxonomy}/${id}`, data);
    }

    /**
     * Delete a term from a custom taxonomy
     */
    async deleteTerm(taxonomy: string, id: number, force: boolean = false): Promise<{ deleted: boolean; previous: Term }> {
        return this.delete<{ deleted: boolean; previous: Term }>(`/${taxonomy}/${id}?force=${force}`);
    }
}
