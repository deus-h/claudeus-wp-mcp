import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { SITE_PARAM, ID_PARAM } from '../schemas/common.js';

export const contentTools: Tool[] = [{
  name: 'claudeus_wp_content__get_posts',
  description: 'Get a list of posts with optional filters',
  inputSchema: {
    type: 'object',
    properties: {
      site: SITE_PARAM,
      filters: {
        type: 'object',
        description: 'Optional filters for posts query'
      }
    },
    required: ['site']
  }
}, {
  name: 'claudeus_wp_content__create_post',
  description: 'Create a new post',
  inputSchema: {
    type: 'object',
    properties: {
      site: SITE_PARAM,
      data: {
        type: 'object',
        description: 'Post data'
      }
    },
    required: ['site', 'data']
  }
}, {
  name: 'claudeus_wp_content__update_post',
  description: 'Update an existing post',
  inputSchema: {
    type: 'object',
    properties: {
      site: SITE_PARAM,
      id: ID_PARAM,
      data: {
        type: 'object',
        description: 'Updated post data'
      }
    },
    required: ['site', 'id', 'data']
  }
}, {
  name: 'claudeus_wp_content__delete_post',
  description: 'Delete a post',
  inputSchema: {
    type: 'object',
    properties: {
      site: SITE_PARAM,
      id: ID_PARAM
    },
    required: ['site', 'id']
  }
}, {
  name: 'claudeus_wp_content__get_post_revisions',
  description: 'Get all revisions of a post with pagination',
  inputSchema: {
    type: 'object',
    properties: {
      site: SITE_PARAM,
      id: ID_PARAM
    },
    required: ['site', 'id']
  }
}, {
  name: 'claudeus_wp_content__get_post_revision',
  description: 'Get a specific revision of a post',
  inputSchema: {
    type: 'object',
    properties: {
      site: SITE_PARAM,
      id: {
        type: 'number',
        description: 'The post ID'
      },
      revision_id: {
        type: 'number',
        description: 'The revision ID'
      }
    },
    required: ['site', 'id', 'revision_id']
  }
}, {
  name: 'claudeus_wp_content__delete_post_revision',
  description: 'Delete a specific post revision permanently',
  inputSchema: {
    type: 'object',
    properties: {
      site: SITE_PARAM,
      id: {
        type: 'number',
        description: 'The post ID'
      },
      revision_id: {
        type: 'number',
        description: 'The revision ID to delete'
      }
    },
    required: ['site', 'id', 'revision_id']
  }
}, {
  name: 'claudeus_wp_content__get_post_autosaves',
  description: 'Get all autosaves of a post',
  inputSchema: {
    type: 'object',
    properties: {
      site: SITE_PARAM,
      id: ID_PARAM
    },
    required: ['site', 'id']
  }
}, {
  name: 'claudeus_wp_content__get_post_autosave',
  description: 'Get a specific autosave of a post',
  inputSchema: {
    type: 'object',
    properties: {
      site: SITE_PARAM,
      id: {
        type: 'number',
        description: 'The post ID'
      },
      autosave_id: {
        type: 'number',
        description: 'The autosave ID'
      }
    },
    required: ['site', 'id', 'autosave_id']
  }
}, {
  name: 'claudeus_wp_content__create_post_autosave',
  description: 'Create an autosave for a post',
  inputSchema: {
    type: 'object',
    properties: {
      site: SITE_PARAM,
      id: ID_PARAM,
      data: {
        type: 'object',
        description: 'Post data to autosave',
        properties: {
          title: { type: 'object' },
          content: { type: 'object' },
          excerpt: { type: 'object' },
          status: { type: 'string' }
        }
      }
    },
    required: ['site', 'id', 'data']
  }
}, {
  name: 'claudeus_wp_content__get_pages',
  description: 'Get a list of pages with optional filters',
  inputSchema: {
    type: 'object',
    properties: {
      site: SITE_PARAM,
      filters: {
        type: 'object',
        description: 'Optional filters for pages query'
      }
    },
    required: ['site']
  }
}, {
  name: 'claudeus_wp_content__create_page',
  description: 'Create a new page',
  inputSchema: {
    type: 'object',
    properties: {
      site: SITE_PARAM,
      data: {
        type: 'object',
        description: 'Page data'
      }
    },
    required: ['site', 'data']
  }
}, {
  name: 'claudeus_wp_content__update_page',
  description: 'Update an existing page',
  inputSchema: {
    type: 'object',
    properties: {
      site: SITE_PARAM,
      id: ID_PARAM,
      data: {
        type: 'object',
        description: 'Updated page data'
      }
    },
    required: ['site', 'id', 'data']
  }
}, {
  name: 'claudeus_wp_content__delete_page',
  description: 'Delete a page',
  inputSchema: {
    type: 'object',
    properties: {
      site: SITE_PARAM,
      id: ID_PARAM
    },
    required: ['site', 'id']
  }
}, {
  name: 'claudeus_wp_content__get_page_revisions',
  description: 'Get all revisions of a page with pagination',
  inputSchema: {
    type: 'object',
    properties: {
      site: SITE_PARAM,
      id: ID_PARAM
    },
    required: ['site', 'id']
  }
}, {
  name: 'claudeus_wp_content__get_page_revision',
  description: 'Get a specific revision of a page',
  inputSchema: {
    type: 'object',
    properties: {
      site: SITE_PARAM,
      id: {
        type: 'number',
        description: 'The page ID'
      },
      revision_id: {
        type: 'number',
        description: 'The revision ID'
      }
    },
    required: ['site', 'id', 'revision_id']
  }
}, {
  name: 'claudeus_wp_content__delete_page_revision',
  description: 'Delete a specific page revision permanently',
  inputSchema: {
    type: 'object',
    properties: {
      site: SITE_PARAM,
      id: {
        type: 'number',
        description: 'The page ID'
      },
      revision_id: {
        type: 'number',
        description: 'The revision ID to delete'
      }
    },
    required: ['site', 'id', 'revision_id']
  }
}, {
  name: 'claudeus_wp_content__get_page_autosaves',
  description: 'Get all autosaves of a page',
  inputSchema: {
    type: 'object',
    properties: {
      site: SITE_PARAM,
      id: ID_PARAM
    },
    required: ['site', 'id']
  }
}, {
  name: 'claudeus_wp_content__get_page_autosave',
  description: 'Get a specific autosave of a page',
  inputSchema: {
    type: 'object',
    properties: {
      site: SITE_PARAM,
      id: {
        type: 'number',
        description: 'The page ID'
      },
      autosave_id: {
        type: 'number',
        description: 'The autosave ID'
      }
    },
    required: ['site', 'id', 'autosave_id']
  }
}, {
  name: 'claudeus_wp_content__create_page_autosave',
  description: 'Create an autosave for a page',
  inputSchema: {
    type: 'object',
    properties: {
      site: SITE_PARAM,
      id: ID_PARAM,
      data: {
        type: 'object',
        description: 'Page data to autosave',
        properties: {
          title: { type: 'object' },
          content: { type: 'object' },
          status: { type: 'string' }
        }
      }
    },
    required: ['site', 'id', 'data']
  }
}, {
  name: 'claudeus_wp_content__get_blocks',
  description: 'Get a list of reusable blocks',
  inputSchema: {
    type: 'object',
    properties: {
      site: SITE_PARAM,
      filters: {
        type: 'object',
        description: 'Optional filters for blocks query'
      }
    },
    required: ['site']
  }
}, {
  name: 'claudeus_wp_content__create_block',
  description: 'Create a new reusable block',
  inputSchema: {
    type: 'object',
    properties: {
      site: SITE_PARAM,
      data: {
        type: 'object',
        description: 'Block data'
      }
    },
    required: ['site', 'data']
  }
}, {
  name: 'claudeus_wp_content__update_block',
  description: 'Update an existing reusable block',
  inputSchema: {
    type: 'object',
    properties: {
      site: SITE_PARAM,
      id: ID_PARAM,
      data: {
        type: 'object',
        description: 'Updated block data'
      }
    },
    required: ['site', 'id', 'data']
  }
}, {
  name: 'claudeus_wp_content__delete_block',
  description: 'Delete a reusable block',
  inputSchema: {
    type: 'object',
    properties: {
      site: SITE_PARAM,
      id: ID_PARAM
    },
    required: ['site', 'id']
  }
}, {
  name: 'claudeus_wp_content__get_block_revisions',
  description: 'Get all revisions of a reusable block with pagination',
  inputSchema: {
    type: 'object',
    properties: {
      site: SITE_PARAM,
      id: ID_PARAM
    },
    required: ['site', 'id']
  }
}, {
  name: 'claudeus_wp_content__get_block_revision',
  description: 'Get a specific revision of a reusable block',
  inputSchema: {
    type: 'object',
    properties: {
      site: SITE_PARAM,
      id: {
        type: 'number',
        description: 'The block ID'
      },
      revision_id: {
        type: 'number',
        description: 'The revision ID'
      }
    },
    required: ['site', 'id', 'revision_id']
  }
}, {
  name: 'claudeus_wp_content__delete_block_revision',
  description: 'Delete a specific block revision permanently',
  inputSchema: {
    type: 'object',
    properties: {
      site: SITE_PARAM,
      id: {
        type: 'number',
        description: 'The block ID'
      },
      revision_id: {
        type: 'number',
        description: 'The revision ID to delete'
      }
    },
    required: ['site', 'id', 'revision_id']
  }
}, {
  name: 'claudeus_wp_content__get_block_autosaves',
  description: 'Get all autosaves of a reusable block',
  inputSchema: {
    type: 'object',
    properties: {
      site: SITE_PARAM,
      id: ID_PARAM
    },
    required: ['site', 'id']
  }
}, {
  name: 'claudeus_wp_content__get_block_autosave',
  description: 'Get a specific autosave of a reusable block',
  inputSchema: {
    type: 'object',
    properties: {
      site: SITE_PARAM,
      id: {
        type: 'number',
        description: 'The block ID'
      },
      autosave_id: {
        type: 'number',
        description: 'The autosave ID'
      }
    },
    required: ['site', 'id', 'autosave_id']
  }
}, {
  name: 'claudeus_wp_content__create_block_autosave',
  description: 'Create an autosave for a reusable block',
  inputSchema: {
    type: 'object',
    properties: {
      site: SITE_PARAM,
      id: ID_PARAM,
      data: {
        type: 'object',
        description: 'Block data to autosave',
        properties: {
          title: { type: 'object' },
          content: { type: 'object' },
          status: { type: 'string' }
        }
      }
    },
    required: ['site', 'id', 'data']
  }
}];
