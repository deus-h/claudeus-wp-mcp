/**
 * WordPress Block Patterns API Client
 * Handles FSE (Full Site Editing) block patterns
 */

import { BaseApiClient } from './base-client.js';
import { BlockPattern, PatternCategory, PatternDirectoryFilters } from '../types/pattern.js';

export class PatternsApiClient extends BaseApiClient {
    // ==========================================
    // REGISTERED PATTERNS (LOCAL)
    // ==========================================

    /**
     * Get all registered block patterns (local patterns)
     * Includes patterns from core, theme, and plugins
     */
    async getPatterns(): Promise<BlockPattern[]> {
        return this.get<BlockPattern[]>('/block-patterns/patterns');
    }

    /**
     * Get pattern categories
     */
    async getPatternCategories(): Promise<PatternCategory[]> {
        return this.get<PatternCategory[]>('/block-patterns/categories');
    }

    // ==========================================
    // PATTERN DIRECTORY (REMOTE)
    // ==========================================

    /**
     * Search WordPress.org pattern directory
     * Browse and search thousands of patterns from WordPress.org
     */
    async searchPatternDirectory(filters?: PatternDirectoryFilters): Promise<BlockPattern[]> {
        return this.get<BlockPattern[]>('/pattern-directory/patterns', filters);
    }
}

