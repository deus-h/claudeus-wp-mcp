# 🎸 Inspector Quick Start - Clean Configuration

## 🔥 **Recommended Method: Use Servers File (CLEANEST)**

This avoids all the env var clutter in the UI!

### Step 1: Click "Servers File" Button

In the Inspector UI, click the **"Servers File"** button at the bottom (not "Server Entry").

### Step 2: Load the Config

Point it to:
```
/Users/deus/opus/mcp/claudeus-wp-mcp/mcp-inspector-config.json
```

### Step 3: Connect

Click "Connect" - **No env var clutter!** ✨

---

## Alternative: Manual Server Entry (If You Prefer)

### Inspector Settings

```
Transport Type: STDIO

Command: dist/inspector-wrapper.js

Arguments: dist/index.js
```

### Environment Variables

**Note:** The env vars you see (HOME, LOGNAME, etc.) are from your shell - just **ignore them**!

**✅ ONLY ADD THIS:**

```
Variable Name: WP_SITES_PATH
Value: /Users/deus/opus/mcp/claudeus-wp-mcp/wp-sites.json
```

The other variables are filtered out by our wrapper before reaching the server.

## Test Commands

Once connected, try these in the Inspector:

### 1. Discover WordPress Endpoints
```json
{
  "name": "claudeus_wp_discover_endpoints",
  "arguments": {
    "site": "default_test"
  }
}
```

### 2. List Posts
```json
{
  "name": "claudeus_wp_content__get_posts",
  "arguments": {
    "site": "default_test",
    "filters": {
      "per_page": 5
    }
  }
}
```

### 3. Get Pages
```json
{
  "name": "claudeus_wp_content__get_pages",
  "arguments": {
    "site": "default_test"
  }
}
```

## Before You Click Connect

1. ✅ Build completed: `pnpm build`
2. ✅ `wp-sites.json` exists in project root
3. ✅ WordPress URL is updated in `wp-sites.json`
4. ✅ WordPress Application Password is added to `wp-sites.json`
5. ✅ `WP_SITES_PATH` environment variable is set in Inspector

## What Success Looks Like

**✅ Connected:**
- Inspector shows "Connected" status
- Tools tab shows ~30 tools listed
- Can execute tools and get responses

**❌ Failed:**
- Error: "WP_SITES_PATH environment variable is required"
  → Solution: Add the environment variable in Inspector
  
- Error: "Config file not found"
  → Solution: Verify path to `wp-sites.json` is correct
  
- Error: "Invalid configuration"
  → Solution: Check `wp-sites.json` has valid JSON syntax

## Pro Tip 🤘

If you see those system env vars (HOME, PATH, etc.) in the Inspector, **that's normal**! They're inherited by any process. Just add the `WP_SITES_PATH` variable to the list - don't delete the others.

