/**
 * Pagination metadata from WordPress REST API
 * Extracted from response headers
 */
export interface PaginationMeta {
    /** Total number of items in the collection */
    total: number;
    
    /** Total number of pages available */
    totalPages: number;
    
    /** Current page number */
    currentPage: number;
    
    /** Number of items per page */
    perPage: number;
    
    /** Whether there are more pages available */
    hasMore: boolean;
}

/**
 * Generic paginated response wrapper
 * Combines data with pagination metadata
 */
export interface PaginatedResponse<T> {
    /** The actual data returned from the API */
    data: T;
    
    /** Pagination metadata (if available) */
    pagination?: PaginationMeta;
}

/**
 * Create pagination metadata from WordPress REST API headers
 */
export function createPaginationMeta(
    headers: Record<string, string | undefined>,
    currentPage: number = 1,
    perPage: number = 10
): PaginationMeta | undefined {
    const total = headers['x-wp-total'];
    const totalPages = headers['x-wp-totalpages'];
    
    if (!total || !totalPages) {
        return undefined;
    }
    
    const totalNum = parseInt(total, 10);
    const totalPagesNum = parseInt(totalPages, 10);
    
    return {
        total: totalNum,
        totalPages: totalPagesNum,
        currentPage,
        perPage,
        hasMore: currentPage < totalPagesNum
    };
}

