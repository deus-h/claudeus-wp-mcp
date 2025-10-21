import { SearchApiClient } from '../../api/search.js';
import { SearchFilters } from '../../types/search.js';

export async function handleSearchTools(name: string, args: Record<string, unknown>, client: SearchApiClient) {
    switch (name) {
        case 'claudeus_wp_search__search': {
            const results = await client.search(args.filters as SearchFilters);
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(results, null, 2)
                }]
            };
        }
        case 'claudeus_wp_search__oembed': {
            const result = await client.getOEmbed(
                args.url as string,
                args.maxwidth as number | undefined,
                args.maxheight as number | undefined
            );
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(result, null, 2)
                }]
            };
        }
        case 'claudeus_wp_search__oembed_proxy': {
            const result = await client.getOEmbedProxy(
                args.url as string,
                args.maxwidth as number | undefined,
                args.maxheight as number | undefined
            );
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(result, null, 2)
                }]
            };
        }
        case 'claudeus_wp_search__get_url_details': {
            const result = await client.getURLDetails(args.url as string);
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(result, null, 2)
                }]
            };
        }
        case 'claudeus_wp_search__block_directory': {
            const results = await client.searchBlockDirectory(
                args.term as string,
                args.page as number | undefined,
                args.per_page as number | undefined
            );
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(results, null, 2)
                }]
            };
        }
        default:
            throw new Error(`Unknown search tool: ${name}`);
    }
}

