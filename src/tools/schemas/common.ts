/**
 * Common JSON Schema definitions for tools
 * Reusable schema fragments to maintain DRY principles
 */

/**
 * Standard site parameter schema
 * Used across all WordPress tools
 */
export const SITE_PARAM = {
    type: 'string' as const,
    description: 'Site alias (defaults to default_test)',
    default: 'default_test'
};

/**
 * Standard pagination parameters
 */
export const PAGINATION_PARAMS = {
    page: {
        type: 'number' as const,
        description: 'Current page of the collection',
        minimum: 1
    },
    per_page: {
        type: 'number' as const,
        description: 'Maximum number of items to return',
        minimum: 1,
        maximum: 100
    }
};

/**
 * Standard search parameter
 */
export const SEARCH_PARAM = {
    type: 'string' as const,
    description: 'Limit results to those matching a string'
};

/**
 * Standard order parameters
 */
export const ORDER_PARAMS = {
    order: {
        type: 'string' as const,
        description: 'Order sort attribute ascending or descending',
        enum: ['asc', 'desc']
    }
};

/**
 * Standard ID parameter
 */
export const ID_PARAM = {
    type: 'number' as const,
    description: 'Resource ID'
};

/**
 * Standard force delete parameter
 */
export const FORCE_DELETE_PARAM = {
    type: 'boolean' as const,
    description: 'Whether to bypass trash and force deletion',
    default: false
};

