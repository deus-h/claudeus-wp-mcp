import { EventEmitter } from 'events';
import { McpServer } from '../../mcp/server.js';

export interface JsonRpcMessage {
    jsonrpc: '2.0';
    id?: number | string;
    method?: string;
    params?: Record<string, unknown>;
    result?: Record<string, unknown>;
    error?: {
        code: number;
        message: string;
        data?: unknown;
    };
}

export interface Transport {
    onMessage?: (message: JsonRpcMessage) => void;
    send(message: JsonRpcMessage): Promise<void>;
    start(): Promise<void>;
    close(): Promise<void>;
}

export class TestTransport extends EventEmitter implements Transport {
    onMessage?: (message: JsonRpcMessage) => void;
    private connected = false;
    private server?: McpServer;
    private initialized = false;
    private startTime = Date.now();
    private pendingRequests = new Map<number | string, { method: string }>();
    private static testCount = 0;
    private static totalTests = 0;
    private static progressBar = '';

    private static updateProgress(): void {
        // Ensure we have valid test counts
        if (this.totalTests === 0) {
            this.totalTests = 100; // Default value if not set
        }
        
        // Calculate progress ensuring non-negative values
        const percentage = Math.min(100, Math.max(0, (this.testCount / this.totalTests) * 100));
        const barLength = 25; // Increased length for smoother appearance
        const filledLength = Math.min(barLength, Math.max(0, Math.round((percentage / 100) * barLength)));
        const emptyLength = barLength - filledLength;

        // Using Unicode block characters for a more beautiful bar
        // '█' for filled blocks
        // '░' for empty blocks
        this.progressBar = '🤘 Testing: ' + 
            '█'.repeat(filledLength) + 
            '░'.repeat(emptyLength) + 
            ' ' + 
            Math.round(percentage) + '%';
        
        process.stdout.write('\r' + this.progressBar);
    }

    private logTest(_action: string): void {
        TestTransport.testCount++;
        TestTransport.updateProgress();
    }

    async send(message: JsonRpcMessage): Promise<void> {
        if (!this.connected) {
            throw new Error('Transport not connected');
        }
        
        // Update initialization state based on response
        if (message.result && message.id) {
            const request = this.pendingRequests.get(message.id);
            if (request?.method === 'initialize') {
                this.initialized = true;
            }
        }
        
        // Log based on message type
        if (message.error) {
            this.logTest(`ERROR ${message.error.code}: ${message.error.message}`);
        } else if (message.result) {
            this.logTest(`SUCCESS: ${message.id ? `ID ${message.id}` : 'Notification'}`);
        }
        
        this.emit('response', message);
    }

    async start(): Promise<void> {
        if (this.connected) {
            this.logTest('TRANSPORT: Already Connected');
            return;
        }
        this.connected = true;
        this.setupMessageHandling();
        this.logTest('TRANSPORT: Started & Connected');
    }

    private setupMessageHandling(): void {
        this.removeAllListeners('message');
        
        this.on('message', async (msg: unknown) => {
            if (!this.isValidJsonRpcMessage(msg)) {
                if ((msg as Partial<JsonRpcMessage>).id !== undefined) {
                    await this.sendError(msg as Partial<JsonRpcMessage>, -32600, 'Invalid Request');
                }
                return;
            }

            const message = msg as JsonRpcMessage;
            const method = message.method;
            this.logTest(`RECEIVED: ${method || 'Unknown Method'}`);

            // Track request for initialization state
            if (message.id && message.method) {
                this.pendingRequests.set(message.id, { method: message.method });
            }

            // Handle message based on method
            if (method === 'initialize') {
                if (!this.isValidCapabilities(message.params?.capabilities)) {
                    await this.sendError(message, -32602, 'Invalid params: capabilities must be an object');
                    return;
                }
                this.initialized = true;
                await this.send({
                    jsonrpc: '2.0',
                    id: message.id,
                    result: { 
                        capabilities: {
                            prompts: { listChanged: true },
                            tools: { listChanged: true },
                            resources: { listChanged: true }
                        }
                    }
                });
            } else if (method === 'shutdown') {
                if (!this.initialized) {
                    await this.sendError(message, -32603, 'Server error: Cannot shutdown before initialization');
                    return;
                }
                await this.send({
                    jsonrpc: '2.0',
                    id: message.id,
                    result: { success: true }
                });
                this.connected = false;
                this.initialized = false;
            } else if (!message.id) {
                // Handle notification
                this.logTest(`NOTIFICATION: ${method}`);
                if (this.onMessage) {
                    this.onMessage(message);
                }
                this.emit('notification', message);
            } else {
                await this.sendError(message, -32601, 'Method not found');
            }
        });
    }

    private isValidJsonRpcMessage(msg: unknown): msg is JsonRpcMessage {
        if (typeof msg !== 'object' || msg === null) return false;
        const rpcMsg = msg as Partial<JsonRpcMessage>;
        
        if (rpcMsg.jsonrpc !== '2.0') return false;

        if (rpcMsg.id !== undefined) {
            if (typeof rpcMsg.id !== 'number' && typeof rpcMsg.id !== 'string') return false;
        }

        if (rpcMsg.method !== undefined) {
            if (typeof rpcMsg.method !== 'string') return false;
        }

        return true;
    }

    private isValidCapabilities(capabilities: unknown): boolean {
        return typeof capabilities === 'object' && capabilities !== null && !Array.isArray(capabilities);
    }

    private async sendError(message: Partial<JsonRpcMessage>, code: number, errorMessage: string): Promise<void> {
        await this.send({
            jsonrpc: '2.0',
            id: message.id,
            error: {
                code,
                message: errorMessage
            }
        });
    }

    setServer(server: McpServer): void {
        this.server = server;
    }

    async close(): Promise<void> {
        this.connected = false;
        this.initialized = false;
        this.logTest('TRANSPORT: Closed');
        this.onMessage = undefined;
        this.server = undefined;
        this.removeAllListeners('message');
        
        // Clear progress bar on last test
        if (TestTransport.testCount >= TestTransport.totalTests) {
            process.stdout.write('\n🎸 All tests completed! 🤘\n');
            TestTransport.testCount = 0;
            TestTransport.totalTests = 0;
            TestTransport.progressBar = '';
        }
    }

    isConnected(): boolean {
        return this.connected;
    }

    isInitialized(): boolean {
        return this.initialized;
    }
} 