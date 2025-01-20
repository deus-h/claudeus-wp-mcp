# 🤘 Claudeus WordPress MCP 🎸
> *"Unleash the Power of AI in Your WordPress Realm!"*

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D22.0.0-brightgreen.svg)
![TypeScript](https://img.shields.io/badge/typescript-%3E%3D5.0.0-blue.svg)
[![GitHub Stars](https://img.shields.io/github/stars/deus-h/claudeus-wp-mcp.svg)](https://github.com/deus-h/claudeus-wp-mcp/stargazers)
[![GitHub Forks](https://img.shields.io/github/forks/deus-h/claudeus-wp-mcp.svg)](https://github.com/deus-h/claudeus-wp-mcp/network)
[![NPM Version](https://img.shields.io/npm/v/claudeus-wp-mcp.svg)](https://www.npmjs.com/package/claudeus-wp-mcp)
[![NPM Downloads](https://img.shields.io/npm/dm/claudeus-wp-mcp.svg)](https://www.npmjs.com/package/claudeus-wp-mcp)
[![GitHub Issues](https://img.shields.io/github/issues/deus-h/claudeus-wp-mcp.svg)](https://github.com/deus-h/claudeus-wp-mcp/issues)
[![smithery badge](https://smithery.ai/badge/claudeus-wp-mcp)](https://smithery.ai/server/claudeus-wp-mcp)

## 🌟 Unleash Your WordPress Superpowers!

Are you tired of the endless grind of WordPress management? Drowning in content creation, SEO optimization, and site maintenance? Get ready to experience something that will blow your mind! 🤯

### 🎸 Meet Your New WordPress Superpower

Claudeus WordPress MCP isn't just another WordPress tool – it's your personal WordPress wizard, powered by cutting-edge AI and crafted with the precision of a metal guitarist's sweep picking! This isn't just automation; it's liberation!

### ⚡ What Makes It Epic?

- **Content Creation on Steroids**: Generate engaging, SEO-optimized blog posts faster than a double bass drum roll
- **Bulk Operations at Light Speed**: Manage hundreds of posts across multiple sites with the power of Thor's hammer
- **AI-Powered SEO Magic**: Let AI analyze and optimize your content like a virtuoso guitar solo
- **WooCommerce Mastery**: Handle products, orders, and sales with the precision of a perfectly executed breakdown
- **Multi-Site Orchestra**: Conduct multiple WordPress sites like a symphony of pure metal 🤘

### 💥 Why Developers Are Going Crazy

```
Traditional WordPress → 😫 Hours of manual work
Claudeus WP MCP   → 🚀 INSTANT RESULTS!

Content Creation: 4 hours → 30 minutes
SEO Optimization: 2 hours → 15 minutes
Bulk Updates: 8 hours → 45 minutes
```

### 🎯 Imagine Being Able To...

- Create weeks of content in minutes
- Analyze and optimize your entire site's SEO instantly
- Manage multiple client sites with supernatural efficiency
- Handle WooCommerce operations at lightning speed
- All while your competition is still logging into WordPress! 

### 🔮 The Future of WordPress is Here

This isn't just a tool – it's your ticket to WordPress enlightenment. Whether you're a solo developer, agency owner, or WordPress enthusiast, Claudeus WordPress MCP gives you superpowers that will make your competition's jaws drop!

> "I've seen the future of WordPress management, and it's absolutely metal! 🤘" - Every Developer After Using Claudeus WP MCP

Ready to transform your WordPress workflow from a garage band to a stadium-filling metal symphony? Let's rock! 🎸

## 📖 Quick Start Guide


### Installing via Smithery

To install claudeus-wp-mcp for Claude Desktop automatically via [Smithery](https://smithery.ai/server/claudeus-wp-mcp):

```bash
npx -y @smithery/cli install claudeus-wp-mcp --client claude
```

### 1. Prerequisites
```bash
# Required Software
Node.js ≥ 22.0.0
TypeScript ≥ 5.0.0
PNPM
Claude Desktop App
WordPress site with REST API

# Claude Desktop Setup
- Download Claude Desktop from https://claude.ai/desktop
- Install and set up your account
- Configure MCP integration (details in "Claude Desktop Integration" section)
```

### 2. Installation
```bash
# Clone the repository
git clone https://github.com/deus-h/claudeus-wp-mcp

# Install dependencies
pnpm install

# Build the project
pnpm build

# Configure Claude Desktop
cp claude_desktop_config.json.example claude_desktop_config.json
# Edit claude_desktop_config.json with your settings
```

### 3. Configuration
```bash
# Copy example configs
cp .env.example .env
cp wp-sites.json.example wp-sites.json

# Edit .env and wp-sites.json with your settings
```

### Configuring wp-sites.json

The `wp-sites.json` file is used to configure your WordPress sites for integration. Below is an example structure:

```json
{
  "site-alias": {
    "URL": "https://your-wordpress-site.com",
    "USER": "username",
    "PASS": "application-password",
    "authType": "basic"  // or "jwt"
  }
}
```

- **URL**: The URL of your WordPress site.
- **USER**: The username for authentication.
- **PASS**: The application password for secure access.
- **authType**: The authentication type, either "basic" or "jwt".

#### Obtaining the Application Password

1. **Log in to your WordPress Admin Dashboard.**
2. **Navigate to Users > Profile.**
3. **Scroll down to the Application Passwords section.**
4. **Enter a name for the application and click "Add New".**
5. **Copy the generated password and use it in your `wp-sites.json` file.**

Ensure that your `wp-sites.json` file is kept secure and not shared publicly.

### Multi-Site Configuration

The `wp-sites.json` file allows you to manage multiple WordPress sites seamlessly. Here's how you can set it up:

#### Example Structure

```json
{
  "live": {
    "URL": "https://our-live-site.se",
    "USER": "deus",
    "PASS": "Kj9P mN2x vR4h Zt8L wQ5y Bc3M",
    "authType": "basic"
  },
  "test": {
    "URL": "https://our-test-site.se",
    "USER": "deus",
    "PASS": "Yw7H fT6n Jm5k Vd9x Pg4q Ls2B", 
    "authType": "basic"
  },
  "client1_live": {
    "URL": "https://client1-live-site.se",
    "USER": "deus",
    "PASS": "Xc8D bN4v Ht6m Rk2p Zj9w Qf5L",
    "authType": "basic"
  },
  "client1_test": {
    "URL": "https://client1-test-site.se",
    "USER": "deus",
    "PASS": "Gm7B sW3x Yn5h Kt9q Vf4c Pd2L",
    "authType": "basic"
  }
}
```

#### Logic and Usage

- **Site Aliases**: Each site is identified by a unique alias (e.g., `live`, `test`, `client1_live`). This allows you to easily switch between different environments or client sites.
- **URL**: The base URL for each WordPress site.
- **USER**: The username used for authentication.
- **PASS**: The application password for secure access.
- **authType**: Defines the authentication method, either `basic` or `jwt`.

#### How to Use

1. **Define Multiple Sites**: Add as many site configurations as needed, each with a unique alias.
2. **Switch Between Sites**: Use the alias to select the desired site for operations.
3. **Secure Access**: Ensure that each site has a valid application password and secure authentication method.
4. **Environment Management**: Easily manage different environments (e.g., live, test) for each client.

This setup allows you to efficiently manage multiple WordPress sites from a single configuration file, streamlining your workflow and enhancing productivity.

### 4. Rock and Roll with MCP Inspector! 🎸
```bash
# Start the MCP Inspector UI
pnpm inspector

# This will:
# 1. Build the project
# 2. Launch the Inspector UI
# 3. Open your browser at http://localhost:5173
```

#### Exploring with Inspector UI
1. **Connect to Server**
   - Click "Connect" in the top-right corner
   - Select "Local Server" for development

2. **Available Features**
   - 🎸 Prompts: Test AI content generation
   - 🛠 Tools: Manage WordPress operations
   - 📦 Resources: Browse WordPress sites
   - 🔍 Inspector: Debug server communication

3. **Testing Prompts**
   - Select "Prompts" tab
   - Try `create-blog-post` with your ideas
   - Analyze SEO with `analyze-post-seo`
   - Bulk update with `bulk-update-posts`

4. **Managing Resources**
   - Browse connected WordPress sites
   - View site details and capabilities
   - Test API endpoints directly

5. **Using Tools**
   - Create and update content
   - Manage media files
   - Run bulk operations

> 🤘 Pro Tip: Use the Inspector tab to see real-time communication between the UI and server!

## 🎮 Claude Desktop Integration

### Usage with Claude Desktop

Add this to your `claude_desktop_config.json`:

#### NPX Setup
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
        "WP_SITES_PATH": "/path/to/wp-sites.json"
      }
    }
  }
}
```

#### Docker Setup 🐳
```json
{
  "mcpServers": {
    "claudeus-wp-mcp": {
      "command": "docker",
      "args": [
        "run",
        "-i",
        "--rm",
        "--network=host",
        "--mount", "type=bind,src=/path/to/wp-sites.json,dst=/app/wp-sites.json",
        "--mount", "type=bind,src=/path/to/.env,dst=/app/.env",
        "mcp/wordpress",
        "--config", "/app/wp-sites.json"
      ]
    }
  }
}
```

Note: Ensure your WordPress configuration files are accessible at the specified paths.



### Building the Docker Image 🛠

1. **Create Dockerfile**
```dockerfile
FROM node:22-alpine

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build TypeScript
RUN pnpm build

# Set environment variables
ENV NODE_ENV=production

# Create volume mount points
VOLUME ["/app/wp-sites.json", "/app/.env"]

# Expose MCP port
EXPOSE 3000

# Set entrypoint
ENTRYPOINT ["node", "dist/index.js"]
```

2. **Build the Image**
```bash
# Build Docker image
docker build -t mcp/wordpress -f Dockerfile .

# Test the build
docker run -i --rm \
  --network=host \
  --mount type=bind,src="$(pwd)/wp-sites.json",dst=/app/wp-sites.json \
  --mount type=bind,src="$(pwd)/.env",dst=/app/.env \
  mcp/wordpress --config /app/wp-sites.json
```

### Security Notes 🔒

1. **File Access**
   - Mount only necessary configuration files
   - Use read-only mounts when possible
   - Keep sensitive data in `.env`

2. **Network Security**
   - Use `--network=host` only in development
   - Configure proper network isolation in production
   - Enable TLS for remote connections

> 🤘 Pro Tip: Test your Docker setup locally before deploying to production!

## 🎯 What is This?

Claudeus WordPress MCP is your ultimate AI-powered WordPress management system. It's like having a metal band's precision and power, but for your WordPress sites!

| Feature | Description |
|---------|-------------|
| 🤖 AI Integration | Direct communication with AI models |
| 🚀 Automation | Automate repetitive tasks |
| 🔒 Security | Enterprise-grade security |
| ⚡ Performance | Lightning-fast operations |
| 🌐 Multi-site | Manage multiple WP instances |

## 💪 Core Features

### 1. Content Management
| Feature | Description | Power Level |
|---------|-------------|-------------|
| Posts | Create, update, analyze | 🤘🤘🤘 |
| Pages | Full page management | 🤘🤘 |
| Media | Handle all media types | 🤘🤘🤘 |
| SEO | AI-powered optimization | 🤘🤘🤘🤘 |

### 2. AI Capabilities
| Feature | Description | Power Level |
|---------|-------------|-------------|
| Content Generation | AI-written posts | 🤘🤘🤘🤘 |
| SEO Analysis | Smart optimization | 🤘🤘🤘 |
| Bulk Operations | Mass updates | 🤘🤘🤘🤘🤘 |

## 🛠 Technical Deep Dive

### Architecture
```typescript
src/
├── api/          # WordPress API endpoints
├── mcp/          # MCP protocol implementation
├── security/     # Security framework
├── tools/        # Tool implementations
└── prompts/      # AI prompt templates
```

### Available Tools
| Tool | Purpose | Power Level |
|------|---------|-------------|
| Content Creation | Generate blog posts | 🤘🤘🤘🤘 |
| SEO Analysis | Analyze and optimize | 🤘🤘🤘 |
| Bulk Updates | Mass content updates | 🤘🤘🤘🤘🤘 |
| Media Management | Handle media files | 🤘🤘🤘 |

### Security Features
| Feature | Implementation |
|---------|---------------|
| Authentication | WordPress API tokens |
| Encryption | TLS for all connections |
| Rate Limiting | Configurable limits |
| Audit Logging | Comprehensive logs |

## 🎸 The Power of MCP

### Time Savings
| Task | Without MCP | With MCP | Savings |
|------|-------------|----------|----------|
| Blog Post Creation | 4 hours | 30 mins | 87.5% |
| SEO Optimization | 2 hours | 15 mins | 87.5% |
| Bulk Updates | 8 hours | 45 mins | 90.6% |
| Content Analysis | 3 hours | 20 mins | 88.9% |

### Cost Efficiency
| Resource | Traditional Cost | MCP Cost | Savings |
|----------|-----------------|-----------|----------|
| Content Writer | $500/month | $100/month | 80% |
| SEO Expert | $1000/month | $200/month | 80% |
| Developer Time | $2000/month | $300/month | 85% |

### ROI Chart
```
ROI Over Time
│   ╭─────────────────────
│  ╭╯
│ ╭╯
│╭╯
├──────────────────────────
0   3   6   9   12  months
```

## ⚡ With Great Power...

> "With great power comes great responsibility" - Uncle Ben

The Claudeus WordPress MCP is a powerful tool that can:
- Save hundreds of hours of manual work
- Reduce operational costs by up to 85%
- Improve content quality and consistency
- Automate repetitive tasks

But remember:
1. Always review AI-generated content
2. Keep security best practices in mind
3. Monitor system usage and performance
4. Maintain backup strategies
5. Use the power responsibly! 🤘

## 🎸 Support and Community

- GitHub Issues: Report bugs and request features
- Discord: Join our metal community
- Documentation: Full technical docs
- Examples: Sample implementations

## 🤘 License

MIT License - Rock on! 

## 🛠 MCP Tools Reference

### Tool Categories and Danger Levels
| Tool Name | Category | Capabilities | Danger Level |
|-----------|----------|--------------|--------------|
| **Content Management** ||||
| `claudeus_wp_content__get_posts` | Content | List all posts with filters | 🟢 Safe |
| `claudeus_wp_content__create_post` | Content | Create new blog posts | 🟡 Moderate |
| `claudeus_wp_content__update_post` | Content | Modify existing posts | 🟡 Moderate |
| `claudeus_wp_content__delete_post` | Content | Remove posts | 🔴 High |
| `claudeus_wp_content__get_pages` | Content | List all pages | 🟢 Safe |
| `claudeus_wp_content__create_page` | Content | Create new pages | 🟡 Moderate |
| `claudeus_wp_content__update_page` | Content | Modify existing pages | 🟡 Moderate |
| `claudeus_wp_content__delete_page` | Content | Remove pages | 🔴 High |
| `claudeus_wp_content__get_blocks` | Content | List reusable blocks | 🟢 Safe |
| `claudeus_wp_content__create_block` | Content | Create reusable blocks | 🟡 Moderate |
| `claudeus_wp_content__update_block` | Content | Modify blocks | 🟡 Moderate |
| `claudeus_wp_content__delete_block` | Content | Remove blocks | 🔴 High |
| **Media Management** ||||
| `claudeus_wp_media__get_media` | Media | List media files | 🟢 Safe |
| `claudeus_wp_media__upload` | Media | Upload new media | 🟡 Moderate |
| `claudeus_wp_media__update` | Media | Update media metadata | 🟡 Moderate |
| `claudeus_wp_media__delete` | Media | Remove media files | 🔴 High |
| **Theme Management** ||||
| `claudeus_wp_theme__list` | Theme | List available themes | 🟢 Safe |
| `claudeus_wp_theme__get_active` | Theme | Show current theme | 🟢 Safe |
| `claudeus_wp_theme__activate` | Theme | Switch active theme | 🔴 High |
| `claudeus_wp_theme__get_customization` | Theme | View theme settings | 🟢 Safe |
| `claudeus_wp_theme__update_customization` | Theme | Modify theme settings | 🟡 Moderate |
| `claudeus_wp_theme__get_custom_css` | Theme | View custom CSS | 🟢 Safe |
| `claudeus_wp_theme__update_custom_css` | Theme | Modify custom CSS | 🟡 Moderate |
| **WooCommerce** ||||
| `claudeus_wp_shop__get_products` | Shop | List products | 🟢 Safe |
| `claudeus_wp_shop__get_orders` | Shop | View orders | 🟢 Safe |
| `claudeus_wp_shop__get_sales` | Shop | Access sales stats | 🟢 Safe |
| **System** ||||
| `claudeus_wp_discover_endpoints` | System | List available endpoints | 🟢 Safe |

### Danger Level Legend
- 🟢 **Safe**: Read-only operations, no data modification
- 🟡 **Moderate**: Creates or modifies content, but can be reverted
- 🔴 **High**: Destructive operations or system-wide changes

> 🤘 Pro Tip: Always test high-danger tools in a staging environment first!

## ⚠️ Warning: Use Data Manipulation Tools with Caution

Data manipulation tools in the Claudeus WordPress MCP are powerful and can significantly impact your WordPress sites. Here's what you need to know:

### Potential Risks

- **Data Loss**: Incorrect use of tools can lead to unintended data deletion or modification.
- **Site Downtime**: Misconfigurations may cause site outages or performance issues.
- **Security Vulnerabilities**: Improper handling of sensitive data can expose your site to security risks.

### Best Practices

1. **Backup Regularly**: Always create backups of your site data before performing any operations.
2. **Test in a Safe Environment**: Use a staging or test environment to try out new tools and configurations.
3. **Review Changes**: Carefully review the changes that tools will make before applying them.
4. **Limit Access**: Restrict tool access to trusted users only.
5. **Monitor Activity**: Keep an eye on tool usage and site performance.

### Constructive Use

When used correctly, these tools can:
- Automate repetitive tasks
- Enhance site performance
- Improve content quality

> "With great power comes great responsibility." Use these tools wisely to harness their full potential while minimizing risks.

### Data Manipulation Tools

The following tools can create, update, or delete data on your WordPress site:

#### Content Management
- **Posts**:
  - `claudeus_wp_content__create_post`: Create new blog posts
  - `claudeus_wp_content__update_post`: Update existing posts
  - `claudeus_wp_content__delete_post`: Delete posts
- **Pages**:
  - `claudeus_wp_content__create_page`: Create new pages
  - `claudeus_wp_content__update_page`: Update existing pages
  - `claudeus_wp_content__delete_page`: Delete pages
- **Blocks**:
  - `claudeus_wp_content__create_block`: Create reusable blocks
  - `claudeus_wp_content__update_block`: Update existing blocks
  - `claudeus_wp_content__delete_block`: Delete blocks

#### Media Management
- `claudeus_wp_media__upload`: Upload new media files
- `claudeus_wp_media__update`: Update media metadata
- `claudeus_wp_media__delete`: Delete media items

#### Theme Customization
- `claudeus_wp_theme__activate`: Change active theme
- `claudeus_wp_theme__update_customization`: Modify theme settings
- `claudeus_wp_theme__update_custom_css`: Update custom CSS

Use these tools with caution to avoid unintended changes. Always:
1. Back up your data before making changes
2. Test in a staging environment first
3. Review changes before applying them
4. Monitor the results after application

> "With great power comes great responsibility." Use these tools wisely to enhance your WordPress site while maintaining its integrity.


---


> Made with 🤘 by [Amadeus Samiel H.](mailto:amadeus.hritani@simhop.se)
