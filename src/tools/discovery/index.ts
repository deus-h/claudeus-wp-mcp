import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { SITE_PARAM } from '../schemas/common.js';

export const discoveryTools: Tool[] = [{
  name: 'claudeus_wp_discover_endpoints',
  description: 'Discover available WordPress REST API endpoints',
  inputSchema: {
    type: 'object',
    required: [],
    properties: {
      site: SITE_PARAM
    }
  }
}];
