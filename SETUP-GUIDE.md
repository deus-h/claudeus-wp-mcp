# 🤘 Claudeus WordPress MCP - Setup Guide

## 🎸 Quick Start (Inspector)

### 1. Update Your wp-sites.json
Edit `/Users/deus/opus/mcp/claudeus-wp-mcp/wp-sites.json` with your WordPress credentials:

```json
{
  "default_test": {
    "URL": "https://your-actual-wordpress-site.com",
    "USER": "your-wp-username",
    "PASS": "your-application-password-here",
    "authType": "basic"
  }
}
```

**Get WordPress Application Password:**
1. Go to your WordPress Admin → Users → Profile
2. Scroll to "Application Passwords"
3. Enter name: "Claudeus MCP"
4. Click "Add New"
5. Copy the generated password (format: `xxxx xxxx xxxx xxxx xxxx xxxx`)

### 2. Configure MCP Inspector

In the Inspector UI you have open:

**Transport Type:** `STDIO`

**Command:** `dist/inspector-wrapper.js`

**Arguments:** `dist/index.js`

**Environment Variables (CRITICAL):**

Click **"Add Environment Variable"** and add:

| Variable Name | Value |
|--------------|-------|
| `WP_SITES_PATH` | `/Users/deus/opus/mcp/claudeus-wp-mcp/wp-sites.json` |

**Important:** The other env vars (HOME, LOGNAME, PATH, SHELL, TERM, USER) are inherited system variables - they're fine! You just need to ADD the `WP_SITES_PATH` variable.

### 3. Test in Inspector

1. Click **"Connect"** in the Inspector
2. Go to **"Tools"** tab
3. You should see all your WordPress tools listed
4. Try running: `claudeus_wp_discover_endpoints`
   - Arguments: `{ "site": "default_test" }`
5. You should get a JSON response with available WordPress REST API endpoints

---

## 🔥 Claude Desktop Configuration

### 1. Locate Claude Desktop Config

**macOS:**
```bash
~/Library/Application Support/Claude/claude_desktop_config.json
```

**Or open via Claude Desktop:**
- Claude menu → Settings → Developer → Edit Config

### 2. Add Your MCP Server

**If you already have other MCP servers**, ADD this to your existing `mcpServers` object:

```json
{
  "mcpServers": {
    "claudeus-wordpress": {
      "command": "node",
      "args": ["/Users/deus/opus/mcp/claudeus-wp-mcp/dist/index.js"],
      "env": {
        "WP_SITES_PATH": "/Users/deus/opus/mcp/claudeus-wp-mcp/wp-sites.json"
      }
    }
  }
}
```

**If this is your first MCP server**, use this complete config:

```json
{
  "mcpServers": {
    "claudeus-wordpress": {
      "command": "node",
      "args": ["/Users/deus/opus/mcp/claudeus-wp-mcp/dist/index.js"],
      "env": {
        "WP_SITES_PATH": "/Users/deus/opus/mcp/claudeus-wp-mcp/wp-sites.json"
      }
    }
  }
}
```

### 3. Restart Claude Desktop

**Completely quit and restart Claude Desktop** (not just reload).

### 4. Test in Claude Desktop

1. Look for the 🔨 hammer icon in the bottom-right of the chat input
2. Click it to see available tools
3. You should see your WordPress tools listed
4. Try asking Claude: "Can you list the WordPress tools available?"

---

## 🎯 Multi-Site Configuration

To manage multiple WordPress sites, add more entries to `wp-sites.json`:

```json
{
  "default_test": {
    "URL": "https://test-site.com",
    "USER": "admin",
    "PASS": "xxxx xxxx xxxx xxxx",
    "authType": "basic"
  },
  "production": {
    "URL": "https://live-site.com",
    "USER": "admin",
    "PASS": "yyyy yyyy yyyy yyyy",
    "authType": "basic",
    "capabilities": {
      "posts": {
        "claudeus_wp_content__delete_post": false
      },
      "pages": {
        "claudeus_wp_content__delete_page": false
      },
      "media": {
        "claudeus_wp_media__delete": false
      }
    }
  },
  "client_site": {
    "URL": "https://client-site.com",
    "USER": "deus",
    "PASS": "zzzz zzzz zzzz zzzz",
    "authType": "basic"
  }
}
```

### Capabilities Control (Optional)

By default, **all tools are enabled**. To restrict tools for specific sites, add a `capabilities` object:

**Example: Safe Production Site (no deletes)**
```json
"production": {
  "URL": "https://live-site.com",
  "USER": "admin",
  "PASS": "xxxx xxxx xxxx xxxx",
  "authType": "basic",
  "capabilities": {
    "posts": {
      "claudeus_wp_content__delete_post": false
    },
    "pages": {
      "claudeus_wp_content__delete_page": false
    },
    "blocks": {
      "claudeus_wp_content__delete_block": false
    },
    "media": {
      "claudeus_wp_media__delete": false
    },
    "themes": {
      "claudeus_wp_theme__activate": false
    }
  }
}
```

---

## 🛠️ Development Workflow

### Run Inspector for Testing
```bash
cd /Users/deus/opus/mcp/claudeus-wp-mcp
pnpm inspector
```

This will:
1. Build the project
2. Launch the MCP Inspector UI
3. Open browser at http://localhost:5173

### Watch Mode (Auto-rebuild)
```bash
pnpm watch
```

### Run Server Directly (stdio)
```bash
WP_SITES_PATH=/Users/deus/opus/mcp/claudeus-wp-mcp/wp-sites.json node dist/index.js
```

---

## 🔍 Troubleshooting

### Inspector Won't Connect

**Problem:** "Failed to connect to MCP server"

**Solutions:**
1. Check that `WP_SITES_PATH` environment variable is set in Inspector
2. Verify `wp-sites.json` exists and has valid JSON
3. Check that WordPress URL is accessible
4. Verify WordPress Application Password is correct
5. Look at the Inspector's console output (bottom panel)

### Claude Desktop Not Showing Tools

**Problem:** Hammer icon not appearing or no tools listed

**Solutions:**
1. Verify config file path is correct
2. Make sure you used absolute paths (not relative)
3. Completely quit and restart Claude Desktop
4. Check Claude's logs:
   - macOS: `~/Library/Logs/Claude/mcp*.log`
5. Verify `dist/index.js` exists and is executable:
   ```bash
   ls -la /Users/deus/opus/mcp/claudeus-wp-mcp/dist/index.js
   ```

### WordPress Connection Errors

**Problem:** "Failed to connect to WordPress site"

**Solutions:**
1. Test WordPress REST API directly:
   ```bash
   curl https://your-site.com/wp-json/
   ```
2. Verify Application Password is correct (no extra spaces)
3. Check that WordPress REST API is enabled
4. Verify user has sufficient permissions
5. Check for WordPress security plugins blocking REST API

### Build Errors

**Problem:** TypeScript compilation fails

**Solutions:**
```bash
# Clean build
pnpm clean
pnpm install
pnpm build

# If that doesn't work, check Node version
node --version  # Should be >= 16

# Reinstall dependencies
rm -rf node_modules pnpm-lock.yaml
pnpm install
pnpm build
```

---

## 📊 Available Tools

### Discovery
- `claudeus_wp_discover_endpoints` - List all WordPress REST API endpoints

### Posts
- `claudeus_wp_content__get_posts` - List posts with filters
- `claudeus_wp_content__create_post` - Create new post
- `claudeus_wp_content__update_post` - Update existing post
- `claudeus_wp_content__delete_post` - Delete post ⚠️

### Pages
- `claudeus_wp_content__get_pages` - List pages
- `claudeus_wp_content__create_page` - Create new page
- `claudeus_wp_content__update_page` - Update existing page
- `claudeus_wp_content__delete_page` - Delete page ⚠️

### Media
- `claudeus_wp_media__get_media` - List media files
- `claudeus_wp_media__upload` - Upload new media
- `claudeus_wp_media__update` - Update media metadata
- `claudeus_wp_media__delete` - Delete media ⚠️

### Blocks
- `claudeus_wp_content__get_blocks` - List reusable blocks
- `claudeus_wp_content__create_block` - Create new block
- `claudeus_wp_content__update_block` - Update existing block
- `claudeus_wp_content__delete_block` - Delete block ⚠️
- `claudeus_wp_content__get_block_revisions` - Get block revisions

### Themes
- `claudeus_wp_theme__list` - List installed themes
- `claudeus_wp_theme__get_active` - Get active theme
- `claudeus_wp_theme__activate` - Activate theme ⚠️
- `claudeus_wp_theme__get_customization` - Get theme settings
- `claudeus_wp_theme__update_customization` - Update theme settings
- `claudeus_wp_theme__get_custom_css` - Get custom CSS
- `claudeus_wp_theme__update_custom_css` - Update custom CSS

### WooCommerce
- `claudeus_wp_shop__get_products` - List products
- `claudeus_wp_shop__get_orders` - List orders
- `claudeus_wp_shop__get_sales` - Get sales statistics

**⚠️ = Dangerous operation** - Can be disabled via capabilities

---

## 🎸 Pro Tips

1. **Use Test Site First** - Always test on a staging/test WordPress site before production
2. **Disable Dangerous Tools** - Use capabilities to disable delete/activate tools on production
3. **Multiple Sites** - Set up different site aliases for different environments
4. **Git Ignore** - `wp-sites.json` is already in `.gitignore` to protect credentials
5. **Application Passwords** - Use WordPress Application Passwords, not your main password
6. **Monitor Usage** - Check WordPress logs for API activity

---

## 🔥 Next Steps

1. ✅ Update `wp-sites.json` with real credentials
2. ✅ Test in Inspector first
3. ✅ Configure Claude Desktop
4. ✅ Test basic operations
5. 🎸 Rock and roll!

Need help? Check the logs or reach out! 🤘❤️

