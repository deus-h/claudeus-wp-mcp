#!/usr/bin/env node
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const serverPath = resolve(__dirname, 'index.js');
const nodePath = process.execPath;

// Set environment variables for inspector mode
process.env.TRANSPORT_TYPE = 'stdio';
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Only pass relevant environment variables (filter out system noise)
const relevantEnvVars = [
  'WP_SITES_PATH',      // Critical: WordPress sites configuration
  'TRANSPORT_TYPE',     // MCP transport type
  'NODE_ENV',           // Node environment
  'PORT',               // Optional: SSE transport port
  'PATH',               // Required: For Node.js to find executables
];

const filteredEnv: Record<string, string> = {};
for (const key of relevantEnvVars) {
  if (process.env[key]) {
    filteredEnv[key] = process.env[key];
  }
}

const child = spawn(nodePath, [serverPath], {
  stdio: ['pipe', 'pipe', 'inherit'], // Use pipe for stdin/stdout, inherit stderr
  env: filteredEnv,
  shell: false
});

// Forward stdin to child process
process.stdin.pipe(child.stdin);

// Forward child stdout to process stdout
child.stdout.pipe(process.stdout);

child.on('error', (error) => {
  console.error('Failed to start child process:', error);
  process.exit(1);
});

child.on('exit', (code) => {
  process.exit(code ?? 0);
});

process.on('SIGTERM', () => {
  child.kill('SIGTERM');
});

process.on('SIGINT', () => {
  child.kill('SIGINT');
}); 