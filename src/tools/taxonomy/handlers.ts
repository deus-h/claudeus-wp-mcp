import { TaxonomiesApiClient } from '../../api/taxonomies.js';
import { CategoryFilters, TagFilters, CategoryData, TagData } from '../../types/index.js';

export async function handleTaxonomyTools(
    name: string,
    args: Record<string, unknown>,
    client: TaxonomiesApiClient
) {
    switch (name) {
        // ==========================================
        // CATEGORIES CRUD
        // ==========================================
        case 'claudeus_wp_taxonomy__get_categories': {
            const categories = await client.getCategories(args.filters as CategoryFilters);
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(categories, null, 2)
                }]
            };
        }
        case 'claudeus_wp_taxonomy__get_category': {
            const category = await client.getCategory(args.id as number);
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(category, null, 2)
                }]
            };
        }
        case 'claudeus_wp_taxonomy__create_category': {
            const category = await client.createCategory(args.data as CategoryData);
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(category, null, 2)
                }]
            };
        }
        case 'claudeus_wp_taxonomy__update_category': {
            const category = await client.updateCategory(args.id as number, args.data as Partial<CategoryData>);
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(category, null, 2)
                }]
            };
        }
        case 'claudeus_wp_taxonomy__delete_category': {
            const result = await client.deleteCategory(args.id as number, args.force as boolean);
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(result, null, 2)
                }]
            };
        }
        // ==========================================
        // TAGS CRUD
        // ==========================================
        case 'claudeus_wp_taxonomy__get_tags': {
            const tags = await client.getTags(args.filters as TagFilters);
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(tags, null, 2)
                }]
            };
        }
        case 'claudeus_wp_taxonomy__get_tag': {
            const tag = await client.getTag(args.id as number);
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(tag, null, 2)
                }]
            };
        }
        case 'claudeus_wp_taxonomy__create_tag': {
            const tag = await client.createTag(args.data as TagData);
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(tag, null, 2)
                }]
            };
        }
        case 'claudeus_wp_taxonomy__update_tag': {
            const tag = await client.updateTag(args.id as number, args.data as Partial<TagData>);
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(tag, null, 2)
                }]
            };
        }
        case 'claudeus_wp_taxonomy__delete_tag': {
            const result = await client.deleteTag(args.id as number, args.force as boolean);
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(result, null, 2)
                }]
            };
        }
        // ==========================================
        // TAXONOMY DISCOVERY
        // ==========================================
        case 'claudeus_wp_taxonomy__get_taxonomies': {
            const taxonomies = await client.getTaxonomies();
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(taxonomies, null, 2)
                }]
            };
        }
        case 'claudeus_wp_taxonomy__get_taxonomy': {
            const taxonomy = await client.getTaxonomy(args.slug as string);
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(taxonomy, null, 2)
                }]
            };
        }
        default:
            throw new Error(`Unknown taxonomy tool: ${name}`);
    }
}
