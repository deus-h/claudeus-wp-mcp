import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { ListToolsRequestSchema, CallToolRequestSchema } from '@modelcontextprotocol/sdk/types.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { SSEServerTransport } from '@modelcontextprotocol/sdk/server/sse.js';
import express, { Response } from 'express';
import { AxiosInstance } from 'axios';
import { SecurityManager } from './security/SecurityManager.js';
import { ShopAPI } from './api/shop.js';
import { allTools, toolCapabilities } from './tools/index.js';
import { handleContentTools } from './tools/content/handlers.js';
import { handleMediaTools } from './tools/media/handlers.js';
import { handleShopTools } from './tools/shop/handlers.js';
import { handleDiscoveryTools } from './tools/discovery/handlers.js';
import { SiteConfig } from './types.js';
import { BaseApiClient } from './api/base-client.js';

export class WordPressClient extends BaseApiClient {
  private mcp: Server;
  private app: express.Express;
  private security: SecurityManager;
  private shopAPI: ShopAPI;

  constructor(site: SiteConfig) {
    super(site);
    
    // Initialize MCP server with all capabilities
    this.mcp = new Server({
      name: "wordpress",
      version: "1.0.0"
    }, {
      capabilities: {
        tools: toolCapabilities,
        resources: {
          wordpress_site: {
            list: true,
            read: true,
            templates: {
              list: true
            }
          }
        }
      }
    });
    
    // Initialize express app
    this.app = express();
    this.app.use(express.json());

    // Initialize security manager
    this.security = new SecurityManager({
      requireExplicitConsent: true,
      auditEnabled: true,
      privacyControls: {
        maskSensitiveData: true,
        allowExternalDataSharing: false
      }
    });

    // Initialize APIs
    this.shopAPI = new ShopAPI(this, this.security);

    // Register all tools
    this.registerTools();
  }

  private registerTools() {
    // Register all tools together
    this.mcp.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: allTools
    }));

    // Handle all tool calls
    this.mcp.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args = {} } = request.params;

      // Route to appropriate handler based on tool name prefix
      if (name.startsWith('claudeus_wp_content__')) {
        return handleContentTools(name, args, this);
      }
      if (name.startsWith('claudeus_wp_media__')) {
        return handleMediaTools(name, args, this);
      }
      if (name.startsWith('claudeus_wp_shop__')) {
        return handleShopTools(name, args, this.shopAPI);
      }
      if (name.startsWith('claudeus_wp_discover_')) {
        return handleDiscoveryTools(name, args, this);
      }

      throw new Error(`Unknown tool: ${name}`);
    });
  }

  async connect(transportType: 'stdio' | 'sse', options: { port?: number; path?: string } = {}) {
    if (transportType === 'stdio') {
      const transport = new StdioServerTransport();
      await this.mcp.connect(transport);
    } else {
      const port = options.port || 4000;
      const path = options.path || '/';

      this.app.get(path, (_, res: Response) => {
        const transport = new SSEServerTransport(path, res);
        this.mcp.connect(transport).catch(error => {
          console.error('Failed to connect transport:', error);
          res.status(500).end();
        });
      });

      await new Promise<void>((resolve) => {
        this.app.listen(port, () => {
          console.info(`Server listening on port ${port}`);
          resolve();
        });
      });
    }
  }

  // Make client accessible for API implementations
  getClient(): AxiosInstance {
    return this.client;
  }
}