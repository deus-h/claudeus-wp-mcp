# 🤘 Claudeus WordPress MCP - Complete Setup Guide

**Get your 145-tool WordPress powerhouse running in minutes!** 🔥

---

## 📋 Table of Contents

1. [Quick Start (Inspector UI)](#-quick-start-inspector-ui)
2. [Claude Desktop Setup](#-claude-desktop-setup)
3. [WordPress Configuration](#-wordpress-configuration)
4. [Multi-Site Setup](#-multi-site-setup)
5. [Environment Variables](#-environment-variables)
6. [Testing & Verification](#-testing--verification)
7. [Advanced Configuration](#-advanced-configuration)
8. [Troubleshooting](#-troubleshooting)

---

## 🚀 Quick Start (Inspector UI)

**Best for:** Testing, development, and exploring all 145 tools

### Step 1: Configure WordPress Site

Create `wp-sites.json` in the project root:

```json
{
  "default_test": {
    "URL": "https://your-wordpress-site.com",
    "USER": "admin",
    "PASS": "your-application-password",
    "authType": "basic"
  }
}
```

### Step 2: Get Application Password

1. Log into WordPress Admin
2. Navigate to **Users → Profile**
3. Scroll to **"Application Passwords"** section
4. Enter name: `"Claude MCP"`
5. Click **"Add New"**
6. Copy the generated password
   - Format: `xxxx xxxx xxxx xxxx xxxx xxxx`
   - Use as-is with spaces

### Step 3: Launch Inspector

```bash
# From project root
pnpm inspector

# Inspector opens at http://localhost:5173
```

**What happens automatically:**
- ✅ Project builds
- ✅ Inspector UI launches
- ✅ `WP_SITES_PATH` pre-filled
- ✅ Ready to connect!

### Step 4: Test Connection

1. Click **"Connect"** in Inspector
2. Go to **"Tools"** tab
3. You should see all 145 tools listed
4. Try: `claudeus_wp_discover_endpoints`
   ```json
   {
     "site": "default_test"
   }
   ```
5. Success! You'll see available WordPress endpoints

---

## 🎸 Claude Desktop Setup

**Best for:** Production use with AI-powered workflows

### Prerequisites

- ✅ Node.js ≥ 22.0.0
- ✅ Claude Desktop installed ([Mac](https://storage.googleapis.com/osprey-downloads-c02f6a0d-347c-492b-a752-3e0651722e97/nest/Claude.dmg) | [Windows](https://storage.googleapis.com/osprey-downloads-c02f6a0d-347c-492b-a752-3e0651722e97/nest-win-x64/Claude-Setup-x64.exe))
- ✅ WordPress site with REST API enabled
- ✅ Application password generated

### Option 1: NPM Installation (Recommended)

#### Step 1: Install MCP Server

```bash
# Install globally
npm install -g claudeus-wp-mcp

# Or use npx (no installation needed)
# Configure in claude_desktop_config.json with npx command
```

#### Step 2: Create wp-sites.json

Create your sites configuration file:

```bash
# Create directory for config
mkdir -p ~/.claudeus-mcp

# Create wp-sites.json
cat > ~/.claudeus-mcp/wp-sites.json << 'EOF'
{
  "default_test": {
    "URL": "https://your-site.com",
    "USER": "admin",
    "PASS": "xxxx xxxx xxxx xxxx xxxx xxxx",
    "authType": "basic"
  }
}
EOF

# Secure the file
chmod 600 ~/.claudeus-mcp/wp-sites.json
```

#### Step 3: Configure Claude Desktop

**Find config file:**

| OS | Location |
|----|----------|
| **macOS** | `~/Library/Application Support/Claude/claude_desktop_config.json` |
| **Windows** | `%APPDATA%\Claude\claude_desktop_config.json` |

**Or open via Claude Desktop:**
- Claude menu → Settings → Developer → Edit Config

**Add configuration:**

```json
{
  "mcpServers": {
    "claudeus-wp-mcp": {
      "command": "npx",
      "args": [
        "-y",
        "claudeus-wp-mcp"
      ],
      "env": {
        "WP_SITES_PATH": "/Users/YOUR_USERNAME/.claudeus-mcp/wp-sites.json"
      }
    }
  }
}
```

**⚠️ Important:**
- Replace `/Users/YOUR_USERNAME/` with your actual home directory
- Use absolute paths (not `~` or relative paths)
- On Windows, use forward slashes: `C:/Users/...` or escape backslashes: `C:\\Users\\...`

### Option 2: Local Development Setup

#### Step 1: Clone & Build

```bash
# Clone repository
git clone https://github.com/deus-h/claudeus-wp-mcp
cd claudeus-wp-mcp

# Install dependencies
pnpm install

# Build project
pnpm build
```

#### Step 2: Configure wp-sites.json

```bash
# Copy example
cp wp-sites.json.example wp-sites.json

# Edit with your credentials
nano wp-sites.json

# Secure the file
chmod 600 wp-sites.json
```

#### Step 3: Configure Claude Desktop

```json
{
  "mcpServers": {
    "claudeus-wordpress": {
      "command": "node",
      "args": [
        "/absolute/path/to/claudeus-wp-mcp/dist/index.js"
      ],
      "env": {
        "WP_SITES_PATH": "/absolute/path/to/claudeus-wp-mcp/wp-sites.json"
      }
    }
  }
}
```

### Step 4: Restart & Test

1. **Completely quit Claude Desktop**
   - macOS: `Cmd + Q`
   - Windows: Right-click taskbar → Quit

2. **Restart Claude Desktop**

3. **Look for hammer icon (🔨)** in chat input

4. **Test with Claude:**
   ```
   "Can you show me what WordPress tools are available?"
   ```

5. **Success indicators:**
   - Hammer icon appears
   - Claude lists tools
   - Can execute WordPress operations

---

## 🌐 WordPress Configuration

### Enable REST API

WordPress REST API is enabled by default since version 4.7. Verify it's working:

```bash
# Test REST API (replace with your URL)
curl https://your-site.com/wp-json/

# Should return JSON with routes
```

### Application Passwords

**Requirements:**
- WordPress 5.6+
- HTTPS enabled (required for application passwords)
- User with appropriate capabilities

**Creating Application Password:**

1. **Log into WordPress Admin**
2. **Users → Profile**
3. **Scroll to "Application Passwords"**
4. **Enter name:** `Claude MCP` (or any identifier)
5. **Click "Add New"**
6. **Copy password:** Includes spaces - use as-is!

**Security Best Practices:**
- ✅ One password per application
- ✅ Use descriptive names
- ✅ Revoke when not needed
- ✅ Never commit to version control
- ✅ Use different passwords per environment

### Verify Permissions

Ensure your WordPress user has required capabilities:

| Operation | Required Capability |
|-----------|-------------------|
| Manage Posts | `edit_posts`, `publish_posts`, `delete_posts` |
| Manage Pages | `edit_pages`, `publish_pages`, `delete_pages` |
| Manage Media | `upload_files`, `delete_files` |
| Manage Users | `edit_users`, `create_users`, `delete_users` |
| Manage Plugins | `install_plugins`, `activate_plugins`, `delete_plugins` |
| Manage Themes | `switch_themes`, `edit_themes` |
| Site Settings | `manage_options` |

**Administrator role has all capabilities** - recommended for full access.

---

## 🎯 Multi-Site Setup

Manage multiple WordPress sites with a single configuration:

### Basic Multi-Site Configuration

```json
{
  "production": {
    "URL": "https://live-site.com",
    "USER": "admin",
    "PASS": "prod-password-here",
    "authType": "basic"
  },
  "staging": {
    "URL": "https://staging-site.com",
    "USER": "admin",
    "PASS": "stage-password-here",
    "authType": "basic"
  },
  "development": {
    "URL": "https://dev-site.local",
    "USER": "admin",
    "PASS": "dev-password-here",
    "authType": "basic"
  }
}
```

### Multi-Client Configuration

```json
{
  "client1_prod": {
    "URL": "https://client1-live.com",
    "USER": "admin",
    "PASS": "xxxx xxxx xxxx xxxx",
    "authType": "basic"
  },
  "client1_stage": {
    "URL": "https://client1-staging.com",
    "USER": "admin",
    "PASS": "yyyy yyyy yyyy yyyy",
    "authType": "basic"
  },
  "client2_prod": {
    "URL": "https://client2-live.com",
    "USER": "admin",
    "PASS": "zzzz zzzz zzzz zzzz",
    "authType": "basic"
  }
}
```

### Using Multiple Sites

**In Inspector UI:**
```json
{
  "site": "production"  // or "staging", "client1_prod", etc.
}
```

**With Claude:**
```
"Create a blog post on the staging site about..."
"List all posts from client1_prod"
"Check health status for production"
```

---

## 🔧 Environment Variables

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `WP_SITES_PATH` | Path to wp-sites.json | `/path/to/wp-sites.json` |

### Optional Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `production` |
| `LOG_LEVEL` | Logging verbosity | `info` |
| `DEBUG` | Enable debug mode | `false` |

### Setting Environment Variables

**macOS/Linux:**
```bash
# Temporary (current session)
export WP_SITES_PATH="/path/to/wp-sites.json"

# Permanent (add to ~/.zshrc or ~/.bashrc)
echo 'export WP_SITES_PATH="/path/to/wp-sites.json"' >> ~/.zshrc
source ~/.zshrc
```

**Windows (PowerShell):**
```powershell
# Temporary (current session)
$env:WP_SITES_PATH = "C:\path\to\wp-sites.json"

# Permanent (System Environment Variables)
[System.Environment]::SetEnvironmentVariable("WP_SITES_PATH", "C:\path\to\wp-sites.json", "User")
```

---

## ✅ Testing & Verification

### Test Checklist

#### 1. Connection Test
```bash
# Test with Inspector
pnpm inspector

# Or test REST API directly
curl https://your-site.com/wp-json/wp/v2/
```

#### 2. Authentication Test
**In Inspector, run:**
```json
Tool: claudeus_wp_health__test_auth
Arguments: { "site": "default_test" }
```

**Expected response:**
```json
{
  "status": "good",
  "label": "Authorization header test",
  "description": "The REST API can use the Authorization header..."
}
```

#### 3. Tools Discovery Test
**Run:**
```json
Tool: claudeus_wp_discover_endpoints
Arguments: { "site": "default_test" }
```

**Expected:** JSON with all available WordPress endpoints

#### 4. Content Read Test
**Run:**
```json
Tool: claudeus_wp_content__get_posts
Arguments: {
  "site": "default_test",
  "filters": {
    "per_page": 5
  }
}
```

**Expected:** List of posts with pagination metadata

#### 5. Health Check Test
**Run:**
```json
Tool: claudeus_wp_health__run_all_tests
Arguments: { "site": "default_test" }
```

**Expected:** Comprehensive health report

### Verification Script

Create `test-connection.sh`:

```bash
#!/bin/bash

echo "🧪 Testing Claudeus WordPress MCP..."

# Test 1: REST API Availability
echo "1️⃣ Testing REST API..."
curl -s https://your-site.com/wp-json/ > /dev/null && echo "✅ REST API accessible" || echo "❌ REST API unreachable"

# Test 2: Inspector Launch
echo "2️⃣ Testing Inspector..."
pnpm inspector &
sleep 5
curl -s http://localhost:5173 > /dev/null && echo "✅ Inspector running" || echo "❌ Inspector failed"

# Test 3: Build Status
echo "3️⃣ Testing Build..."
[ -f "dist/index.js" ] && echo "✅ Build complete" || echo "❌ Build missing"

echo "✅ Tests complete!"
```

---

## ⚙️ Advanced Configuration

### Site-Specific Capabilities

Restrict dangerous operations per site:

```json
{
  "production": {
    "URL": "https://live-site.com",
    "USER": "admin",
    "PASS": "xxxx xxxx xxxx xxxx",
    "authType": "basic",
    "capabilities": {
      "content": {
        "claudeus_wp_content__delete_post": false,
        "claudeus_wp_content__delete_page": false,
        "claudeus_wp_content__delete_block": false
      },
      "media": {
        "claudeus_wp_media__delete": false
      },
      "users": {
        "claudeus_wp_users__delete_user": false
      },
      "plugins": {
        "claudeus_wp_plugins__delete": false
      },
      "themes": {
        "claudeus_wp_theme__activate": false
      }
    }
  }
}
```

**Effect:** Production site becomes read/write only - no destructive operations.

### JWT Authentication

For sites using JWT authentication:

```json
{
  "jwt_site": {
    "URL": "https://jwt-site.com",
    "USER": "admin",
    "PASS": "your-jwt-token",
    "authType": "jwt"
  }
}
```

**JWT Token Setup:**
1. Install [JWT Authentication plugin](https://wordpress.org/plugins/jwt-authentication-for-wp-rest-api/)
2. Configure plugin
3. Generate token
4. Use token as `PASS` value

### Custom Headers

Add custom headers for specific sites:

```json
{
  "custom_site": {
    "URL": "https://custom-site.com",
    "USER": "admin",
    "PASS": "xxxx xxxx xxxx xxxx",
    "authType": "basic",
    "headers": {
      "X-Custom-Header": "custom-value",
      "X-API-Version": "v2"
    }
  }
}
```

---

## 🔍 Troubleshooting

### Common Issues & Solutions

#### Issue 1: "Connection Failed"

**Symptoms:**
- Inspector won't connect
- Claude Desktop shows no tools

**Solutions:**
1. **Verify wp-sites.json path is absolute**
   ```bash
   # Check file exists
   ls -la /absolute/path/to/wp-sites.json
   ```

2. **Test WordPress REST API**
   ```bash
   curl https://your-site.com/wp-json/
   ```

3. **Verify Application Password**
   - Check for typos
   - Ensure spaces are included
   - Try generating new password

4. **Check HTTPS**
   - Application Passwords require HTTPS
   - Test: Visit site with https://

#### Issue 2: "Authorization Failed"

**Symptoms:**
- `401 Unauthorized` errors
- "Authorization header test failed"

**Solutions:**
1. **Regenerate Application Password**
   - WordPress Admin → Users → Profile
   - Delete old password
   - Create new one

2. **Check User Capabilities**
   - Ensure user has required permissions
   - Try with Administrator role

3. **Verify REST API Authentication**
   ```bash
   curl -u admin:xxxx-xxxx-xxxx-xxxx \
     https://your-site.com/wp-json/wp/v2/users/me
   ```

#### Issue 3: "Tools Not Showing in Claude Desktop"

**Symptoms:**
- No hammer icon
- Tools list empty

**Solutions:**
1. **Verify Config Syntax**
   ```bash
   # Validate JSON
   cat ~/Library/Application\ Support/Claude/claude_desktop_config.json | python -m json.tool
   ```

2. **Check Paths Are Absolute**
   ```json
   // ❌ Wrong
   "WP_SITES_PATH": "~/wp-sites.json"
   
   // ✅ Correct
   "WP_SITES_PATH": "/Users/yourname/wp-sites.json"
   ```

3. **Completely Restart Claude**
   - Not just reload - full quit and restart
   - macOS: `Cmd + Q` then relaunch

4. **Check Claude Logs**
   ```bash
   # macOS
   tail -f ~/Library/Logs/Claude/mcp*.log
   
   # Look for errors or connection issues
   ```

#### Issue 4: "Some Tools Fail, Others Work"

**Symptoms:**
- Some tools return errors
- Others work fine

**Solutions:**
1. **Check Tool-Specific Requirements**
   - FSE tools require WordPress 5.9+
   - Astra tools require Astra theme installed
   - WooCommerce tools require WooCommerce plugin

2. **Verify Plugin/Theme Active**
   ```json
   Tool: claudeus_wp_plugins__list
   Tool: claudeus_wp_theme__list
   ```

3. **Check User Capabilities**
   - Different tools require different permissions
   - Administrator role recommended

#### Issue 5: "Performance Issues / Timeouts"

**Symptoms:**
- Slow responses
- Timeout errors
- Bulk operations fail

**Solutions:**
1. **Use Pagination**
   ```json
   {
     "filters": {
       "per_page": 10,  // Smaller batches
       "page": 1
     }
   }
   ```

2. **Check WordPress Performance**
   ```json
   Tool: claudeus_wp_health__run_all_tests
   ```

3. **Verify Server Resources**
   - Check WordPress hosting limits
   - Monitor PHP memory limit
   - Check WordPress debug log

### Debug Mode

Enable debug logging:

```bash
# Set environment variable
export DEBUG=claudeus:*

# Run with debug enabled
WP_SITES_PATH=/path/to/wp-sites.json \
DEBUG=claudeus:* \
node dist/index.js
```

### Getting Help

**Before Reporting Issues:**
1. ✅ Check this guide
2. ✅ Review [SECURITY.md](SECURITY.md)
3. ✅ Test with Inspector UI
4. ✅ Check Claude Desktop logs
5. ✅ Verify WordPress REST API works

**Team Members:**
- 📧 Email: amadeus.hritani@simhop.se
- 🔧 Internal: Slack #claudeus-mcp channel

---

## 📚 Quick Reference

### Essential Commands

```bash
# Install
npm install -g claudeus-wp-mcp

# Launch Inspector
pnpm inspector

# Build project
pnpm build

# Run tests
pnpm test

# Watch mode
pnpm watch
```

### Essential Paths

| OS | Config Location |
|----|----------------|
| macOS | `~/Library/Application Support/Claude/` |
| Windows | `%APPDATA%\Claude\` |

### Essential Files

| File | Purpose |
|------|---------|
| `wp-sites.json` | Site configuration |
| `claude_desktop_config.json` | Claude Desktop config |
| `dist/index.js` | Built MCP server |

---

## 🎯 Next Steps

After successful setup:

1. **📖 Explore Tools** - Try all 145 tools in Inspector
2. **🔒 Review Security** - Read [SECURITY.md](SECURITY.md)
3. **🎸 Start Creating** - Use with Claude for AI-powered workflows
4. **📊 Monitor Health** - Run regular health checks
5. **🚀 Automate** - Build custom workflows

---

> 🤘 **Setup complete! You now have 145 WordPress tools at your command!**

Made with 🤘🔥 by SimHop IT & Media AB
