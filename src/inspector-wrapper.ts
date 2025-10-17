#!/usr/bin/env node
/**
 * 🎸 Claudeus WP MCP - Inspector Wrapper
 * 
 * Simple passthrough wrapper for Inspector integration.
 * The default WP_SITES_PATH is set by scripts/launch-inspector.js
 * and appears pre-filled in the Inspector UI.
 */
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const serverPath = resolve(__dirname, 'index.js');
const nodePath = process.execPath;

// Spawn the actual MCP server with environment variables from Inspector
const child = spawn(nodePath, [serverPath], {
  stdio: ['pipe', 'pipe', 'inherit'], // stdin/stdout for MCP protocol, stderr for logs
  env: process.env,  // Environment variables set by Inspector (including WP_SITES_PATH)
  shell: false
});

// Forward stdin/stdout for MCP JSON-RPC communication
process.stdin.pipe(child.stdin);
child.stdout.pipe(process.stdout);

// Error handling
child.on('error', (error) => {
  console.error('Failed to start MCP server:', error);
  process.exit(1);
});

child.on('exit', (code) => {
  process.exit(code ?? 0);
});

// Signal handling
process.on('SIGTERM', () => child.kill('SIGTERM'));
process.on('SIGINT', () => child.kill('SIGINT')); 