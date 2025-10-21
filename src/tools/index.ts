import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { contentTools } from './content/index.js';
import { mediaTools } from './media/index.js';
import { shopTools } from './shop/index.js';
import { discoveryTools } from './discovery/index.js';
import { themeTools } from './theme/index.js';
import { taxonomyTools } from './taxonomy/index.js';
import { userTools } from './user/index.js';
import { commentTools } from './comment/index.js';
import { menuTools } from './menu/index.js';
import { astraTools } from './astra/index.js';
import { templateTools } from './template/index.js';
import { globalStylesTools } from './global-styles/index.js';
import { patternTools } from './pattern/index.js';
import { settingsTools } from './settings/index.js';
import { pluginTools } from './plugins/index.js';
import { widgetTools } from './widgets/index.js';
import { healthTools } from './health/index.js';
import { searchTools } from './search/index.js';

// Combine all tools
export const allTools: Tool[] = [
  ...contentTools,
  ...mediaTools,
  ...shopTools,
  ...discoveryTools,
  ...themeTools,
  ...taxonomyTools,
  ...userTools,
  ...commentTools,
  ...menuTools,
  ...astraTools,
  ...templateTools,
  ...globalStylesTools,
  ...patternTools,
  ...settingsTools,
  ...pluginTools,
  ...widgetTools,
  ...healthTools,
  ...searchTools
];

// Define tool capabilities
export const toolCapabilities = {
  // Discovery
  claudeus_wp_discover_endpoints: true,
  
  // Content
  claudeus_wp_content__get_posts: true,
  claudeus_wp_content__create_post: true,
  claudeus_wp_content__update_post: true,
  claudeus_wp_content__delete_post: true,
  claudeus_wp_content__get_pages: true,
  claudeus_wp_content__create_page: true,
  claudeus_wp_content__update_page: true,
  claudeus_wp_content__delete_page: true,
  claudeus_wp_content__get_blocks: true,
  claudeus_wp_content__create_block: true,
  claudeus_wp_content__update_block: true,
  claudeus_wp_content__delete_block: true,
  claudeus_wp_content__get_block_revisions: true,
  
  // Media
  claudeus_wp_media__get_media: true,
  claudeus_wp_media__upload: true,
  claudeus_wp_media__update: true,
  claudeus_wp_media__delete: true,
  
  // Theme
  claudeus_wp_theme__list: true,
  claudeus_wp_theme__get_active: true,
  claudeus_wp_theme__activate: true,
  claudeus_wp_theme__get_customization: true,
  claudeus_wp_theme__update_customization: true,
  claudeus_wp_theme__get_custom_css: true,
  claudeus_wp_theme__update_custom_css: true,
  
  // Shop
  claudeus_wp_shop__get_products: true,
  claudeus_wp_shop__get_orders: true,
  claudeus_wp_shop__get_sales: true,
  
  // MCP specific
  listChanged: true
}; 