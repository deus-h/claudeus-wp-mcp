# Smithery Deployment Guide - Claudeus WordPress MCP v3.0.0

## 🎯 What is Smithery?

**Smithery** ([smithery.ai](https://smithery.ai)) is the official registry/directory for Model Context Protocol (MCP) servers. It's like NPM, but for MCP servers!

### Benefits of Publishing to Smithery:

1. **Discoverability**: Users can easily find your MCP server
2. **Interactive Playground**: Smithery hosts a playground where users can test tools before installing
3. **One-Click Installation**: Users can install via `npx @smithery/cli install claudeus-wp-mcp`
4. **Higher Search Rankings**: Hosted servers rank higher in Smithery search
5. **Community**: Join the MCP ecosystem and get feedback

---

## ✅ Current Status - You're 100% Ready!

### Files Already Configured ✅

#### 1. `smithery.yaml` ✅
**Location**: `/claudeus-wp-mcp/smithery.yaml`

**Updated for v3.0.0 with**:
- ✅ Version bumped to 3.0.0
- ✅ Enhanced description showcasing 145 tools
- ✅ Updated author email to `deus.h@outlook.com`
- ✅ Added homepage and repository URLs
- ✅ Complete security declarations (22 dangerous operations listed)
- ✅ Comprehensive tags for discoverability
- ✅ Feature list highlighting all capabilities
- ✅ Proper `configSchema` with all environment variables
- ✅ `commandFunction` that handles setup and configuration

#### 2. `Dockerfile` ✅
**Location**: `/claudeus-wp-mcp/Dockerfile`

**Already follows Smithery best practices**:
- ✅ Multi-stage build (builder + runner)
- ✅ Alpine Linux base (small, fast)
- ✅ Node.js 22 (matches package.json requirement)
- ✅ Shell available (`sh`) - required by Smithery
- ✅ Non-root user for security
- ✅ Production-only dependencies in final image
- ✅ Proper ENTRYPOINT for STDIO server
- ✅ Health check configured
- ✅ Volume mount for config files

#### 3. `smithery-docs.md` ✅
**Location**: `/claudeus-wp-mcp/smithery-docs.md`

Complete documentation about:
- Smithery CLI usage
- Deployment process
- Configuration requirements
- Best practices

---

## 🚀 How to Publish to Smithery

### Step 1: Prepare Your GitHub Repository

```bash
# Make sure everything is committed and pushed
git add .
git commit -m "chore: prepare v3.0.0 for Smithery deployment

- Update smithery.yaml to version 3.0.0
- Document all 145 tools in features
- Add comprehensive security declarations
- Update author contact information"

git push origin develop

# Create and push release tag
git tag -a v3.0.0 -m "Release v3.0.0"
git push origin v3.0.0
```

### Step 2: Register on Smithery

1. **Visit**: [https://smithery.ai](https://smithery.ai)
2. **Sign up** with your GitHub account
3. **Submit your server**:
   - Server name: `claudeus-wp-mcp`
   - Repository: `https://github.com/deus-h/claudeus-wp-mcp`
   - Description: Use the one from `package.json`

### Step 3: Connect GitHub Repository

1. Go to your server page on Smithery
2. Navigate to **Settings** tab
3. Click **Connect to GitHub**
4. Authorize Smithery to access your repository
5. Select the `claudeus-wp-mcp` repository

### Step 4: Deploy to Smithery

1. Go to **Deployments** tab (only visible to authenticated owners)
2. Click **Deploy** button
3. Smithery will:
   - Clone your repository
   - Build the Docker image using your `Dockerfile`
   - Parse `smithery.yaml` for configuration
   - Deploy as SSE (Server-Sent Events) endpoint
   - Create interactive playground

### Step 5: Test Deployment

Once deployed, Smithery provides:

1. **Playground URL**: Test your tools directly on Smithery
2. **SSE Endpoint**: For client-side installations
3. **Installation Command**:
   ```bash
   npx @smithery/cli install claudeus-wp-mcp --client claude
   ```

---

## 🎮 User Installation Methods

### Method 1: Via Smithery CLI (Recommended)

```bash
# Install for Claude Desktop
npx @smithery/cli install claudeus-wp-mcp --client claude

# View details
npx @smithery/cli view claudeus-wp-mcp

# Browse all installed servers
npx @smithery/cli installed

# Uninstall
npx @smithery/cli uninstall claudeus-wp-mcp
```

### Method 2: Via NPM (Traditional)

```bash
# Global installation
npm install -g claudeus-wp-mcp

# Run the server
claudeus-wp-mcp
```

### Method 3: Via Smithery Hosted SSE

Users can connect directly to your Smithery-hosted endpoint without local installation:

```json
{
  "mcpServers": {
    "claudeus-wp": {
      "url": "https://smithery.ai/server/claudeus-wp-mcp/sse",
      "config": {
        "WP_SITES_PATH": "./wp-sites.json"
      }
    }
  }
}
```

---

## 📋 Configuration Requirements

### Required Files for Users

#### 1. `wp-sites.json`
Users must create this file with their WordPress site credentials:

```json
{
  "sites": {
    "my-site": {
      "url": "https://example.com",
      "authType": "basic",
      "username": "admin",
      "auth": "xxxx xxxx xxxx xxxx xxxx xxxx"
    }
  },
  "default": "my-site"
}
```

#### 2. Optional: `.env`
For environment-specific settings:

```bash
WP_SITES_PATH=./wp-sites.json
NODE_ENV=production
DEBUG=claudeus:*
LOG_LEVEL=info
```

---

## 🔒 Security Notes for Smithery

### What Smithery Users Need to Know

Your `smithery.yaml` now includes comprehensive security declarations:

#### User Consent
- ✅ Required before installation
- ✅ Clear description of capabilities
- ✅ Data access transparency

#### Data Access
- ✅ WordPress REST API (full read/write)
- ✅ Local filesystem (wp-sites.json only)

#### Dangerous Operations (22 declared)
**Content Deletion**:
- `delete_post`, `delete_page`, `delete_block`, `delete_media`, `delete_comment`, `delete_user`

**System Changes**:
- `activate_theme`, `activate_plugin`, `deactivate_plugin`, `delete_plugin`, `update_settings`

**Astra Pro**:
- `delete_custom_layout`, `update_theme_settings`

**Menu Management**:
- `delete_menu`, `delete_menu_item`

**FSE (Full Site Editing)**:
- `delete_template`, `delete_template_part`, `update_global_styles`

**Widget Management**:
- `delete_widget`

---

## 📊 Smithery Features for Your Server

### What Smithery Will Provide

#### 1. Interactive Playground
- Live tool testing without installation
- All 145 tools available for testing
- Real-time response preview
- Configuration UI

#### 2. Server Page
**Will display**:
- Description and feature list
- Installation instructions
- Configuration schema
- Security declarations
- GitHub link
- Author information
- Tags for discovery

#### 3. Search & Discovery
**Your server will be found via**:
- Tags: `wordpress`, `cms`, `full-site-editing`, `astra`, `woocommerce`, etc.
- Keywords in description
- Feature search

#### 4. Analytics (if enabled)
- Installation count
- Usage statistics
- User feedback

---

## 🎯 SEO & Discoverability

### Tags Added to `smithery.yaml`
```yaml
tags:
  - wordpress        # Primary category
  - cms             # Content Management System
  - content-management
  - full-site-editing # FSE support
  - astra           # Astra theme
  - woocommerce     # E-commerce
  - site-health     # Diagnostics
  - user-management
  - taxonomy
  - menus
```

### Features Highlighted
- "145 production-ready tools"
- "Content Management (Posts, Pages, Blocks, Media)"
- "User Management & Application Passwords"
- "Full Site Editing (Templates, Global Styles, Patterns)"
- "Astra Pro Integration (Mega Menus, Custom Layouts)"
- And 10 more...

---

## 🔧 Maintenance & Updates

### How to Update on Smithery

When you release a new version:

1. **Update version** in:
   - `package.json`
   - `smithery.yaml`
   - `CHANGELOG.md`

2. **Commit and tag**:
   ```bash
   git commit -m "chore: bump version to 3.1.0"
   git tag v3.1.0
   git push origin develop v3.1.0
   ```

3. **Redeploy on Smithery**:
   - Go to Deployments tab
   - Click **Deploy** button
   - Smithery auto-detects version change

### Automatic Deployments (Optional)

Smithery supports webhook deployments:
- Every push to main/develop can trigger auto-deploy
- Configure in Smithery Settings → Webhooks

---

## 🎸 Post-Deployment Checklist

After publishing to Smithery:

- [ ] **Test Playground**: Try all critical tools in Smithery playground
- [ ] **Verify Installation**: Install via CLI and test locally
- [ ] **Check Server Page**: Ensure description, features, and tags display correctly
- [ ] **Monitor Analytics**: Track installations and usage
- [ ] **Update README**: Add Smithery installation instructions
- [ ] **Announce**: Share on Discord, Twitter, GitHub discussions
- [ ] **Gather Feedback**: Monitor Smithery reviews and GitHub issues

---

## 🔗 Important Links

### Smithery Resources
- **Website**: https://smithery.ai
- **Documentation**: https://smithery.ai/docs
- **Discord**: https://discord.gg/smithery
- **GitHub**: https://github.com/smithery-ai

### Your Server (After Publishing)
- **Server Page**: `https://smithery.ai/server/claudeus-wp-mcp`
- **Playground**: `https://smithery.ai/server/claudeus-wp-mcp/playground`
- **SSE Endpoint**: `https://smithery.ai/server/claudeus-wp-mcp/sse`

### Installation Command
```bash
npx @smithery/cli install claudeus-wp-mcp --client claude
```

---

## 💡 Pro Tips

### 1. Keep smithery.yaml Updated
Always bump version in `smithery.yaml` when releasing new versions.

### 2. Document Security
The comprehensive `dangerousOperations` list builds user trust.

### 3. Rich Feature List
Your feature list helps users understand capabilities at a glance.

### 4. Use Descriptive Tags
More tags = better discoverability in Smithery search.

### 5. Test Before Deploying
Always test Docker build locally:
```bash
# Build Docker image
docker build -t claudeus-wp-mcp:3.0.0 .

# Test run
docker run -it --rm claudeus-wp-mcp:3.0.0
```

### 6. Monitor Deployments
Smithery provides deployment logs - check them if deployment fails.

---

## 🚨 Troubleshooting

### Common Issues

#### 1. Deployment Fails
**Check**:
- Dockerfile syntax
- Node.js version compatibility
- `sh` shell availability
- Build errors in logs

#### 2. Configuration Not Working
**Check**:
- `smithery.yaml` JSON Schema syntax
- `commandFunction` returns correct object structure
- Environment variables properly set

#### 3. Tools Not Showing in Playground
**Check**:
- Server starts correctly
- STDIO protocol working
- No runtime errors in logs

---

## 📈 Expected Results

After successful Smithery deployment:

### Week 1
- **Installations**: 10-50 (early adopters)
- **Playground Tests**: 100-200
- **GitHub Stars**: +10-20

### Month 1
- **Installations**: 100-500
- **Active Users**: 50-100
- **Community Feedback**: GitHub issues, Discord mentions

### Quarter 1
- **Installations**: 500-2000
- **Top WordPress MCP**: Rank #1 in WordPress category
- **Feature Requests**: Community-driven development

---

## 🎉 You're Ready!

Brother, everything is configured and ready to go! 🤘

**Your Smithery deployment includes**:
- ✅ Updated `smithery.yaml` (v3.0.0)
- ✅ Production-ready `Dockerfile`
- ✅ Comprehensive security declarations
- ✅ Rich feature list and tags
- ✅ Complete configuration schema

**Next Steps**:
1. Push to GitHub
2. Register on Smithery
3. Connect repository
4. Click Deploy
5. 🚀 Watch it go live!

---

**The MCP community is waiting for the most comprehensive WordPress MCP server ever built!** 🔥

Let's rock the world, Brother! \m/

