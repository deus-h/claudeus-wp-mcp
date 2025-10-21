#!/usr/bin/env node
/* eslint-env node */
/**
 * 🎸 Claudeus WP MCP - Inspector Launcher
 * 
 * This script launches the MCP Inspector with pre-filled default values.
 * Users can still change the WP_SITES_PATH in the Inspector UI after it opens.
 */

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 🎸 Default Configuration
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 📝 TO CUSTOMIZE: Change the path below to match YOUR wp-sites.json location
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//
// Example for different locations:
// const DEFAULT_WP_SITES_PATH = '/Users/yourname/my-wordpress-sites.json';
// const DEFAULT_WP_SITES_PATH = resolve(PROJECT_ROOT, 'config', 'wp-sites.json');
//
// The path below will appear pre-filled in the Inspector UI.
// Users can still change it in the UI after Inspector opens! 🎸
const PROJECT_ROOT = resolve(__dirname, '..');
const DEFAULT_WP_SITES_PATH = resolve(PROJECT_ROOT, 'wp-sites.json');
const WRAPPER_PATH = resolve(PROJECT_ROOT, 'dist', 'inspector-wrapper.js');

console.log('🎸 Launching Claudeus WP MCP Inspector...\n');
console.log(`📁 Default wp-sites.json path: ${DEFAULT_WP_SITES_PATH}`);
console.log('💡 You can change this path in the Inspector UI after it opens\n');

// Launch Inspector with default environment variable pre-filled
// The -e flag passes environment variables that appear in the Inspector UI
const inspectorArgs = [
  '--yes',  // Auto-accept prompts
  '@modelcontextprotocol/inspector',
  '-e',
  `WP_SITES_PATH=${DEFAULT_WP_SITES_PATH}`,
  WRAPPER_PATH
];

// Clean environment - remove npm config that triggers warnings
const env = { ...process.env };
delete env.npm_config_verify_deps_before_run;
delete env.npm_config__jsr_registry;
delete env.NPM_CONFIG_VERIFY_DEPS_BEFORE_RUN;
delete env.NPM_CONFIG__JSR_REGISTRY;

const child = spawn('npx', inspectorArgs, {
  stdio: 'inherit',
  shell: false,
  env
});

child.on('error', (error) => {
  console.error('❌ Failed to start Inspector:', error);
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

