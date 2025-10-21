/**
 * WordPress Menu Types
 * Based on WordPress REST API /wp/v2/menus and /wp/v2/menu-items endpoints
 */

import { QueryParams } from '../api/base-client.js';

/**
 * WordPress Menu
 */
export interface Menu {
    /** Unique identifier for the menu */
    id: number;
    
    /** The term assigned to the menu */
    term_id: number;
    
    /** HTML title attribute for the menu */
    name: string;
    
    /** HTML description for the menu */
    description: string;
    
    /** An alphanumeric identifier for the menu */
    slug: string;
    
    /** Meta fields */
    meta: Record<string, unknown>;
    
    /** The menu locations assigned to the menu */
    locations: string[];
    
    /** Whether to automatically add new top-level pages to this menu */
    auto_add: boolean;
}

/**
 * Menu data for create/update operations
 */
export interface MenuData {
    /** HTML title attribute for the menu */
    name?: string;
    
    /** HTML description for the menu */
    description?: string;
    
    /** An alphanumeric identifier for the menu */
    slug?: string;
    
    /** The menu locations assigned to the menu */
    locations?: string[];
    
    /** Whether to automatically add new top-level pages to this menu */
    auto_add?: boolean;
    
    /** Meta fields */
    meta?: Record<string, unknown>;
    
    /** Index signature for compatibility */
    [key: string]: string | string[] | boolean | Record<string, unknown> | undefined;
}

/**
 * Filters for querying menus
 */
export interface MenuFilters extends QueryParams {
    /** Current page of the collection */
    page?: number;
    
    /** Maximum number of items to be returned in result set */
    per_page?: number;
    
    /** Limit results to those matching a string */
    search?: string;
    
    /** Ensure result set excludes specific IDs */
    exclude?: number[];
    
    /** Limit result set to specific IDs */
    include?: number[];
    
    /** Offset the result set by a specific number of items */
    offset?: number;
    
    /** Order sort attribute ascending or descending */
    order?: 'asc' | 'desc';
    
    /** Sort collection by term attribute */
    orderby?: 'id' | 'include' | 'name' | 'slug' | 'include_slugs' | 'term_group' | 'description' | 'count';
    
    /** Whether to hide terms not assigned to any posts */
    hide_empty?: boolean;
    
    /** Limit result set to terms with one or more specific slugs */
    slug?: string | string[];
}

/**
 * Menu item type
 */
export type MenuItemType = 'taxonomy' | 'post_type' | 'post_type_archive' | 'custom';

/**
 * Menu item status
 */
export type MenuItemStatus = 'publish' | 'future' | 'draft' | 'pending' | 'private';

/**
 * WordPress Menu Item
 */
export interface MenuItem {
    /** Unique identifier for the menu item */
    id: number;
    
    /** The title for the menu item */
    title: {
        raw: string;
        rendered: string;
    };
    
    /** URL or slug of the menu item */
    url: string;
    
    /** The family of objects originally represented, such as "post_type" or "taxonomy" */
    type: MenuItemType;
    
    /** The type label */
    type_label: string;
    
    /** The DB ID of the original object this menu item represents */
    object_id: number;
    
    /** The type of object originally represented */
    object: string;
    
    /** The ID of the parent menu item */
    parent: number;
    
    /** The ID of the nav menu the menu item belongs to */
    menu_order: number;
    
    /** The target attribute of the link element for this menu item */
    target: string;
    
    /** The description of the menu item */
    attr_title: string;
    
    /** The title attribute of the link element for this menu item */
    description: string;
    
    /** The XFN relationship expressed in the link of this menu item */
    xfn: string[];
    
    /** The CSS classes for the link element of this menu item */
    classes: string[];
    
    /** The status of the menu item */
    status: MenuItemStatus;
    
    /** The date the menu item was published, in the site's timezone */
    date: string;
    
    /** The date the menu item was published, as GMT */
    date_gmt: string;
    
    /** The date the menu item was last modified, in the site's timezone */
    modified: string;
    
    /** The date the menu item was last modified, as GMT */
    modified_gmt: string;
    
    /** Meta fields */
    meta: Record<string, unknown>;
    
    /** The ID of the nav menu the menu item belongs to */
    menus: number;
}

/**
 * Menu item data for create/update operations
 */
export interface MenuItemData {
    /** The title for the menu item */
    title?: string;
    
    /** URL or slug of the menu item */
    url?: string;
    
    /** The family of objects originally represented */
    type?: MenuItemType;
    
    /** The DB ID of the original object this menu item represents */
    object_id?: number;
    
    /** The type of object originally represented */
    object?: string;
    
    /** The ID of the parent menu item */
    parent?: number;
    
    /** The order of the menu item */
    menu_order?: number;
    
    /** The target attribute of the link element */
    target?: string;
    
    /** The title attribute of the link element */
    attr_title?: string;
    
    /** The description of the menu item */
    description?: string;
    
    /** The XFN relationship expressed in the link */
    xfn?: string[];
    
    /** The CSS classes for the link element */
    classes?: string[];
    
    /** The status of the menu item */
    status?: MenuItemStatus;
    
    /** The ID of the nav menu the menu item belongs to */
    menus?: number;
    
    /** Meta fields */
    meta?: Record<string, unknown>;
    
    /** Index signature for compatibility */
    [key: string]: string | string[] | number | MenuItemType | MenuItemStatus | Record<string, unknown> | undefined;
}

/**
 * Filters for querying menu items
 */
export interface MenuItemFilters extends QueryParams {
    /** Current page of the collection */
    page?: number;
    
    /** Maximum number of items to be returned in result set */
    per_page?: number;
    
    /** Limit results to those matching a string */
    search?: string;
    
    /** Limit response to menu items published after a given ISO8601 compliant date */
    after?: string;
    
    /** Limit response to menu items modified after a given ISO8601 compliant date */
    modified_after?: string;
    
    /** Limit response to menu items published before a given ISO8601 compliant date */
    before?: string;
    
    /** Limit response to menu items modified before a given ISO8601 compliant date */
    modified_before?: string;
    
    /** Ensure result set excludes specific IDs */
    exclude?: number[];
    
    /** Limit result set to specific IDs */
    include?: number[];
    
    /** Offset the result set by a specific number of items */
    offset?: number;
    
    /** Order sort attribute ascending or descending */
    order?: 'asc' | 'desc';
    
    /** Sort collection by post attribute */
    orderby?: 'author' | 'date' | 'id' | 'include' | 'modified' | 'parent' | 'relevance' | 'slug' | 'include_slugs' | 'title' | 'menu_order';
    
    /** Limit result set to items with specific slugs */
    slug?: string[];
    
    /** Limit result set to items with one or more specific statuses */
    status?: MenuItemStatus[];
    
    /** Limit result set to items assigned to specific menus */
    menus?: number | number[];
    
    /** Limit result set to those of particular menu item types */
    menu_item_type?: MenuItemType | MenuItemType[];
}

/**
 * WordPress Menu Location
 */
export interface MenuLocation {
    /** The name of the menu location */
    name: string;
    
    /** The description of the menu location */
    description: string;
    
    /** The ID of the assigned menu */
    menu: number;
}

