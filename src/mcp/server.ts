import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { SSEServerTransport } from '@modelcontextprotocol/sdk/server/sse.js';
import express, { Express, Response } from 'express';
import cors from 'cors';

type ServerCapabilities = {
    [key: string]: unknown;
    prompts?: { listChanged?: boolean };
    tools?: { listChanged?: boolean };
    resources?: { listChanged?: boolean };
};

interface Connection {
    id: string;
    transport: unknown;
    initialized: boolean;
}

export class McpServer {
    private server: Server;
    private app: Express;
    private connections: Map<string, Connection> = new Map();
    private nextConnectionId = 1;
    private capabilities: ServerCapabilities = {
        prompts: { listChanged: true },
        tools: { listChanged: true },
        resources: { listChanged: true }
    };

    constructor(name: string, version: string) {
        // Create server with proper initialization
        this.server = new Server(
            { name, version },
            { capabilities: this.capabilities }
        );

        // Initialize express app for SSE
        this.app = express();
        this.app.use(cors());
        this.app.use(express.json());

        // Note: The MCP SDK handles initialize/shutdown protocol methods automatically
        // No need to register custom handlers for these
    }

    private trackConnection(transport: unknown): void {
        const id = `conn_${this.nextConnectionId++}`;
        this.connections.set(id, { id, transport, initialized: false });
        console.error(`🔌 New connection established: ${id}`);
    }

    private untrackConnection(transport: unknown): void {
        for (const [id, conn] of this.connections.entries()) {
            if (conn.transport === transport) {
                this.connections.delete(id);
                console.error(`🔌 Connection closed: ${id}`);
                break;
            }
        }
    }

    getServer(): Server {
        return this.server;
    }

    getApp(): Express {
        return this.app;
    }

    getActiveConnections(): number {
        return this.connections.size;
    }

    async connectStdio(): Promise<void> {
        const transport = new StdioServerTransport();
        this.trackConnection(transport);
        try {
            await this.server.connect(transport);
        } catch (error) {
            this.untrackConnection(transport);
            throw error;
        }
    }

    async connectSSE(port: number = 4000, path: string = '/'): Promise<void> {
        this.app.get(path, (_, res: Response) => {
            const transport = new SSEServerTransport(path, res);
            this.trackConnection(transport);
            
            this.server.connect(transport).catch(error => {
                this.untrackConnection(transport);
                console.error('Failed to connect transport:', error);
                res.status(500).end();
            });

            // Handle client disconnect
            res.on('close', () => {
                this.untrackConnection(transport);
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


