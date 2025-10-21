import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { SITE_PARAM, ID_PARAM, FORCE_DELETE_PARAM } from '../schemas/common.js';

export const mediaTools: Tool[] = [{
  name: 'claudeus_wp_media__get_media',
  description: 'Get a list of media items with optional filters',
  inputSchema: {
    type: 'object',
    properties: {
      site: SITE_PARAM,
      filters: {
        type: 'object',
        description: 'Optional filters for media query'
      }
    },
    required: ['site']
  }
}, {
  name: 'claudeus_wp_media__upload',
  description: 'Upload a new media item',
  inputSchema: {
    type: 'object',
    properties: {
      site: SITE_PARAM,
      file: {
        type: 'string',
        description: 'Base64 encoded file content'
      },
      filename: {
        type: 'string',
        description: 'Filename for the uploaded file'
      },
      data: {
        type: 'object',
        description: 'Optional media metadata (title, alt_text, caption, description)'
      }
    },
    required: ['site', 'file', 'filename']
  }
}, {
  name: 'claudeus_wp_media__update',
  description: 'Update media item metadata',
  inputSchema: {
    type: 'object',
    properties: {
      site: SITE_PARAM,
      id: ID_PARAM,
      data: {
        type: 'object',
        description: 'Updated media metadata'
      }
    },
    required: ['site', 'id', 'data']
  }
}, {
  name: 'claudeus_wp_media__delete',
  description: 'Delete a media item',
  inputSchema: {
    type: 'object',
    properties: {
      site: SITE_PARAM,
      id: ID_PARAM,
      force: FORCE_DELETE_PARAM
    },
    required: ['site', 'id']
  }
}];
