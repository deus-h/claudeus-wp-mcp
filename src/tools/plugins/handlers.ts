import { PluginsApiClient } from '../../api/plugins.js';
import { PluginFilters } from '../../types/plugin.js';

export async function handlePluginTools(name: string, args: Record<string, unknown>, client: PluginsApiClient) {
    switch (name) {
        case 'claudeus_wp_plugins__list': {
            const plugins = await client.getPlugins(args.filters as PluginFilters);
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(plugins, null, 2)
                }]
            };
        }
        case 'claudeus_wp_plugins__get': {
            const plugin = await client.getPlugin(args.plugin as string);
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(plugin, null, 2)
                }]
            };
        }
        case 'claudeus_wp_plugins__activate': {
            const plugin = await client.activatePlugin(args.plugin as string);
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(plugin, null, 2)
                }]
            };
        }
        case 'claudeus_wp_plugins__deactivate': {
            const plugin = await client.deactivatePlugin(args.plugin as string);
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(plugin, null, 2)
                }]
            };
        }
        case 'claudeus_wp_plugins__delete': {
            const result = await client.deletePlugin(args.plugin as string);
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(result, null, 2)
                }]
            };
        }
        default:
            throw new Error(`Unknown plugin tool: ${name}`);
    }
}

