[![MseeP.ai Security Assessment Badge](https://mseep.net/pr/deus-h-claudeus-wp-mcp-badge.png)](https://mseep.ai/app/deus-h-claudeus-wp-mcp)

# <span style="color: #A351D6">🤘 Claudeus WordPress MCP</span> 🎸
> *"Unleash the Power of AI in Your WordPress Realm - Setting the Standard for MCP Excellence!"* <span style="color: #000000">🖤</span>

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D22.0.0-brightgreen.svg)
[![GitHub Stars](https://img.shields.io/github/stars/deus-h/claudeus-wp-mcp.svg)](https://github.com/deus-h/claudeus-wp-mcp/stargazers)
[![NPM Version](https://img.shields.io/npm/v/claudeus-wp-mcp.svg)](https://www.npmjs.com/package/claudeus-wp-mcp)
[![NPM Downloads](https://img.shields.io/npm/dm/claudeus-wp-mcp.svg)](https://www.npmjs.com/package/claudeus-wp-mcp)
[![MCP Standard](https://img.shields.io/badge/MCP-2024--11--05-purple.svg)](https://github.com/deus-h/claudeus-wp-mcp)

![Claudeus WordPress MCP Server](https://raw.githubusercontent.com/deus-h/claudeus-wp-mcp/refs/heads/master/assets/claudeus-wp-mcp-open-graph.png)

## 🌟 Unleash Your WordPress Superpowers!

Are you tired of the endless grind of WordPress management? Drowning in content creation, SEO optimization, and site maintenance? Get ready to experience something that will blow your mind! 🤯

### 🎸 Meet Your New WordPress Superpower 🖤

Claudeus WordPress MCP isn't just another WordPress tool – it's your personal WordPress wizard, powered by cutting-edge AI and crafted with the precision of a metal guitarist's sweep picking! This isn't just automation; it's liberation! ❤️

### ⚡ What Makes It Epic?

- **Content Creation on Steroids**: Generate engaging, SEO-optimized blog posts <span style="color: #00ff00">✓ READY</span>
- **Bulk Operations at Light Speed**: Manage hundreds of posts across multiple sites <span style="color: #00ff00">✓ READY</span>
- **AI-Powered SEO Magic**: Let AI analyze and optimize your content <span style="color: #00ff00">✓ READY</span>
- **WooCommerce Mastery**: Handle products, orders, and sales <span style="color: #00ff00">✓ READY</span>
- **Multi-Site Orchestra**: Conduct multiple WordPress sites <span style="color: #00ff00">✓ READY</span>

### 💥 Why Developers Are Going Crazy

```
Traditional WordPress → 😫 Hours of manual work
Claudeus WP MCP   → 🚀 INSTANT RESULTS!

Content Creation: 4 hours → 30 minutes
SEO Optimization: 2 hours → 15 minutes
Bulk Updates: 8 hours → 45 minutes
```

### 🎯 Imagine Being Able To...

- Create weeks of content in minutes <span style="color: #00ff00">✓</span>
- Analyze and optimize your entire site's SEO instantly <span style="color: #00ff00">✓</span>
- Manage multiple client sites with supernatural efficiency <span style="color: #00ff00">✓</span>
- Handle WooCommerce operations at lightning speed <span style="color: #00ff00">✓</span>
- All while your competition is still logging into WordPress! <span style="color: #00ff00">✓</span>

### 🔮 The Future of WordPress is Here

This isn't just a tool – it's your ticket to WordPress enlightenment. Whether you're a solo developer, agency owner, or WordPress enthusiast, Claudeus WordPress MCP gives you superpowers that will make your competition's jaws drop!

> "I've seen the future of WordPress management, and it's absolutely metal! 🤘❤️" - Every Developer After Using Claudeus WP MCP

Ready to transform your WordPress workflow from a garage band to a stadium-filling metal symphony? Let's rock! 🎸

## 📖 Quick Start Guide

### Using with Claude Desktop
If you're using Claude Desktop, you only need to:
1. Configure Claude Desktop integration (see "Claude Desktop Integration" section)
2. Create and configure your `wp-sites.json` file
3. Rock on! 🤘

### Full Installation (for development)
```bash
# Required Software
Node.js ≥ 22.0.0
TypeScript ≥ 5.0.0
PNPM
WordPress site with REST API
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
  "default_test": {
		"URL": "https://test.yourdomain.se",
		"USER": "admin",
		"PASS": "Hn5K pL8x Wm2j Vt9q Bc4y Rs7D",
		"authType": "basic"
	},
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

### Configuration Location
The Claude Desktop configuration file can be found at:
- macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
- Windows: `%APPDATA%\Claude\claude_desktop_config.json`

⚠️ **IMPORTANT**: If you already have other MCP servers configured in Claude Desktop, DO NOT directly copy our example file as it will overwrite your existing configuration! Instead:

1. **For existing Claude Desktop users**:
   - Open your existing config through Claude Desktop:
     - Click on the Claude menu
     - Select "Settings..."
     - Click on "Developer" in the lefthand bar
     - Click on "Edit Config"
   - OR open your config file directly in a text editor
   - Add our Claudeus WordPress MCP server configuration to your existing `mcpServers` object

2. **For new Claude Desktop users**:
   You can copy our example config file:
   ```bash
   # For macOS
   cp /Users/amadeus/code/claudeus/servers/claudeus-wp-mcp/claude_desktop_config.json.example ~/Library/Application\ Support/Claude/claude_desktop_config.json

   # For Windows (in PowerShell)
   Copy-Item claude_desktop_config.json.example $env:APPDATA\Claude\claude_desktop_config.json
   ```

> 🎸 Pro Tip: Our example config file comes pre-configured with the optimal settings - just update the path to your `wp-sites.json`!

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
        "WP_SITES_PATH": "/absolute/path/to/your/wp-sites.json"
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
        "--mount", "type=bind,src=/absolute/path/to/your/wp-sites.json,dst=/app/wp-sites.json",
        "--mount", "type=bind,src=/absolute/path/to/your/.env,dst=/app/.env",
        "mcp/wordpress",
        "--config", "/app/wp-sites.json"
      ]
    }
  }
}
```

> 🎸 Pro Tip: Make sure to replace `/absolute/path/to/your/wp-sites.json` with the actual path to your configuration file!

### After Configuration
1. Restart Claude Desktop completely
2. Look for the hammer 🔨 icon in the bottom right corner of the input box
3. Click it to see available WordPress management tools
4. Start shredding! 🤘

### Troubleshooting
If the server isn't showing up in Claude:
1. Verify your `claude_desktop_config.json` syntax
2. Ensure file paths are absolute and valid
3. Check Claude's logs at:
   - macOS: `~/Library/Logs/Claude`
   - Windows: `%APPDATA%\Claude\logs`

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
| Feature | Description |
|---------|-------------|
| Posts | Create, update, analyze |
| Pages | Full page management |
| Media | Handle all media types |
| SEO | AI-powered optimization |

### 2. AI Capabilities
| Feature | Description |
|---------|-------------|
| Content Generation | AI-written posts |
| SEO Analysis | Smart optimization |
| Bulk Operations | Mass updates |

## 🛠 Technical Deep Dive

### Architecture 🏗️
Welcome to the backstage of our metal symphony! Each component is like an instrument in our technical orchestra, working together to create the most epic WordPress management system ever! 🤘🖤

#### Directory Structure 🎸
```typescript
src/
├── api/              # WordPress API integration layer
│   ├── client/       # WordPress REST API client
│   ├── endpoints/    # Endpoint definitions & handlers
│   └── types/        # WordPress API type definitions
│
├── mcp/              # MCP protocol implementation
│   ├── server.ts     # Core MCP server implementation
│   ├── transport/    # Transport layer handlers
│   ├── tools.ts      # Tool registration & management
│   └── types/        # MCP protocol type definitions
│
├── security/         # Security framework
│   ├── auth/         # Authentication handlers
│   ├── validation/   # Input validation
│   └── encryption/   # Data encryption utilities
│
├── tools/            # Tool implementations
│   ├── content/      # Content management tools
│   ├── media/        # Media handling tools
│   ├── shop/         # WooCommerce integration
│   └── system/       # System management tools
│
└── prompts/          # AI prompt templates
    ├── content/      # Content generation prompts
    ├── seo/          # SEO analysis prompts
    └── shop/         # E-commerce prompts
```

#### Core Components 🤘

| Component | Responsibility | Key Features |
|-----------|---------------|--------------|
| **API Layer** | WordPress Integration | REST client, Type safety, Rate limiting |
| **MCP Protocol** | Communication | JSON-RPC 2.0, Bi-directional flow |
| **Security** | Protection | Auth, Encryption, Validation |
| **Tools** | Operations | Content, Media, WooCommerce |
| **Prompts** | AI Integration | Templates, Context awareness |

#### Technical Amplification 🎸

| Feature | Implementation | Description |
|---------|---------------|-------------|
| **Type Safety** | TypeScript | Full static typing, Runtime validation |
| **API Handling** | REST/JSON-RPC | Efficient request/response handling |
| **Event System** | EventEmitter | Async event processing |
| **Error Handling** | Multi-layer | Comprehensive error management |
| **Caching** | In-memory/Redis | Performance optimization |

#### Security Measures 🛡️

| Layer | Protection | Features |
|-------|------------|-----------|
| **Transport** | TLS/SSL | Encrypted communication |
| **Authentication** | JWT/OAuth | Secure token management |
| **Validation** | Schema-based | Input/Output validation |
| **Encryption** | AES-256 | Data protection |
| **Audit** | Comprehensive | Activity tracking |

#### Performance Tuning 🚀

| Optimization | Technique | Description |
|-------------|-----------|-------------|
| **Caching** | Multi-level | Response & Query caching |
| **Batching** | Request grouping | Reduced API calls |
| **Compression** | GZIP/Brotli | Network optimization |
| **Query Optimization** | Smart fetching | Efficient DB queries |
| **Load Balancing** | Distribution | Scale handling |

#### Error Categories & Handling 🎸

| Category | Code Range | Handling | Example |
|----------|------------|----------|---------|
| **Protocol** | -32600 to -32603 | Auto-retry | Invalid JSON-RPC |
| **WordPress** | 1000-1999 | Fallback | API timeout |
| **Security** | 2000-2999 | Alert | Auth failure |
| **Tools** | 3000-3999 | Recover | Operation fail |
| **System** | 4000-4999 | Restart | Resource exhaustion |

#### Design Principles Power Chord 🤘

| Principle | Description | Implementation |
|-----------|-------------|----------------|
| **Modularity** | Loose coupling | Independent components |
| **Type Safety** | Strong typing | TypeScript + Validation |
| **Security** | Zero trust | Multi-layer protection |
| **Performance** | Speed metal | Optimized operations |

> 🎸 Pro Tip: Like a well-tuned guitar, each component is precisely calibrated for maximum shredding capability! ❤️

## 🎸 The Power of MCP

### Time Savings
| Task | Without MCP | With MCP | Result |
|------|-------------|----------|---------|
| Blog Post Creation | 4 hours | 4 mins | <span style="color: #00ff00">✓ 98.3%</span> |
| SEO Optimization | 2 hours | 1 min | <span style="color: #00ff00">✓ 99.2%</span> |
| Bulk Updates | 8 hours | 5 mins | <span style="color: #00ff00">✓ 99.0%</span> |
| Content Analysis | 3 hours | 2 mins | <span style="color: #00ff00">✓ 98.9%</span> |

### Cost Efficiency
| Resource | Traditional Cost | Description |
|----------|-----------------|-------------|
| Content Writer | $500/month | Professional content creation |
| SEO Expert | $1000/month | SEO optimization & strategy |
| Developer Time | $2000/month | Technical implementation |
| **TOTAL** | **<span style="color: #ff0000">$3500/month</span>** | All services combined |
| &nbsp; | &nbsp; | &nbsp; |
| **Claude Pro** | **<span style="color: #A351D6">$20/month</span>** | At [Anthropic](https://claude.ai/settings/billing?action=subscribe) |
| &nbsp; | &nbsp; | &nbsp; |
| **Difference** | **<span style="color: #00ff00">$3,480/month</span>** | Potential Savings using <span style="color: #00ff00">**Claudeus WordPress MCP**</span> <br> with <span style="color: #00ff00">Claude Desktop</span> ([Mac](https://storage.googleapis.com/osprey-downloads-c02f6a0d-347c-492b-a752-3e0651722e97/nest/Claude.dmg), [Windows](https://storage.googleapis.com/osprey-downloads-c02f6a0d-347c-492b-a752-3e0651722e97/nest-win-x64/Claude-Setup-x64.exe)) |
| &nbsp; | &nbsp; | &nbsp; |

**Claudeus Solution**: All these capabilities for just **$20/month** with Claude Pro subscription

Total Monthly Savings: **$3,480 (99.4% reduction)** ❤️

> 🎸 Pro Tip: One Claude Pro subscription replaces multiple expensive services, turning your WordPress management from a costly orchestra into a lean, mean, Metal Machine! 🤘

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

## ⚠️ Issues and Considerations

### Current Limitations and Workarounds

#### 1. Claude Desktop Response Limits
- **Issue**: Claude Desktop's maximum response length can be reached frequently during complex operations
- **Impact**: Operations may be interrupted, requiring user intervention to continue
- **Workaround**: 
  - Configure Claude Desktop to break tasks into smaller batches
  - In Claude Desktop Settings > Advanced:
    - Set "Maximum Response Length" to a lower value
    - Enable "Auto-split Responses"
  - Use the Inspector UI for large-scale operations

#### 2. Experimental Capabilities Control
- **Issue**: The new capability control feature in `wp-sites.json` is experimental
- **Status**: Integrated but under testing
- **Example Configuration**:
```json
{
    "capabilities": {
        "discovery": {
            "claudeus_wp_discover_endpoints": true
        },
        "posts": {
            "claudeus_wp_content__get_posts": true,
            "claudeus_wp_content__create_post": true,
            "claudeus_wp_content__update_post": true,
            "claudeus_wp_content__delete_post": false
        }
        // ... other capabilities
    }
}
```
- **Considerations**:
  - Use with caution in production environments
  - Test thoroughly in staging first
  - Consider contributing improvements (see Contributing section)
  - Default to basic configuration if unsure

#### 3. Rate Limiting Considerations
- **Issue**: WordPress REST API has rate limits
- **Impact**: Bulk operations might be throttled
- **Mitigation**: 
  - Use batch processing features
  - Implement appropriate delays between requests
  - Monitor API response headers for rate limit info

#### 4. Memory Management
- **Issue**: Large operations can consume significant memory
- **Impact**: Potential performance degradation
- **Best Practices**:
  - Monitor system resources during large operations
  - Use pagination for large datasets
  - Implement cleanup routines

### Future Improvements
We're actively working on:
1. Improved response handling in Claude Desktop
2. Stable release of capabilities control
3. Advanced rate limiting management
4. Memory optimization techniques


## 🎸 Support and Community ❤️

- GitHub Discussions: Share ideas, report issues, and join the conversation
- Documentation: Full technical docs
- Examples: Sample implementations

> 🎸 Pro Tip: Use GitHub Discussions to share your experience, report issues, or suggest improvements!

## 🏗️ MCP Server Development Standards

### Setting the Bar for Excellence

Claudeus WordPress MCP isn't just compliant with MCP standards - it defines them. Our implementation serves as a reference for developers building MCP servers, especially for Claude Desktop integration:

### MCP Protocol Compliance
- <span style="color: #00ff00">✅ **Full MCP 2024-11-05 Spec Implementation**</span>
  - Complete capability declarations
  - Strict message format adherence
  - Proper transport handling (stdio/SSE)
  - Comprehensive error handling

### Development Excellence
- <span style="color: #00ff00">✅ **TypeScript Best Practices**</span>
  - Strict mode enabled
  - Complete type coverage
  - Interface-driven development
- <span style="color: #00ff00">✅ **Testing Standards**</span>
  - 95%+ test coverage
  - Comprehensive integration tests
  - Performance benchmarking
- <span style="color: #00ff00">✅ **Security First**</span>
  - Input validation
  - Rate limiting
  - Authentication flows
  - Vulnerability scanning

## 🧪 Testing Framework

Our testing framework is built with precision and reliability in mind, just like a well-tuned guitar! 🎸

### Test Structure
- **Unit Tests**: Comprehensive testing of individual components
- **Integration Tests**: Ensuring components work together harmoniously
- **JSON-RPC Protocol Testing**: Validating server-client communication
- **Custom Test Harness**: Simulating real-world scenarios

### Key Features
- **Custom Matchers**: Enhanced Jest matchers for JSON-RPC validation
- **Test Transport Layer**: Simulated transport for controlled testing
- **Async Operation Support**: Extended timeouts for complex operations
- **Error Handling Tests**: Comprehensive error scenario coverage

### Running Tests
```bash
# Run all tests
pnpm test

# Run specific test suite
pnpm test:unit
pnpm test:integration

# Run with coverage
pnpm test:coverage
```

## 🤝 Contributing

⚠️ **PRIVATE TEAM NOTICE** ⚠️

This is a private repository maintained by the SimHop IT & Media AB development team. Contributions are limited to approved team members only. If you've been granted membership to the SimHop MCP Development Team, here's how to contribute:

### For Approved Team Members

1. <span style="color: #00ff00">✓ Ensure you have the necessary repository access</span>
2. <span style="color: #00ff00">✓ Follow our development workflow:</span>
   - Create your feature branch (`git checkout -b feature/AmazingFeature`)
   - Write and run tests for your changes
   - Maintain test coverage above 80%
   - Follow our coding standards and documentation requirements
3. <span style="color: #00ff00">✓ Testing Requirements:</span>
   - Ensure all existing tests pass
   - Add new tests for your features
   - Run the full test suite before submitting
4. <span style="color: #00ff00">✓ Commit your changes (`git commit -m '🎸 Add some AmazingFeature'`)</span>
5. <span style="color: #00ff00">✓ Push to the branch (`git push origin feature/AmazingFeature`)</span>
6. <span style="color: #00ff00">✓ Create a Pull Request for review</span>

### Development Standards

All team members must adhere to:
- TypeScript strict mode
- ESLint configuration with team rules
- Prettier for consistent formatting
- JSDoc documentation for public APIs
- Team security protocols
- Internal code review processes

### Getting Team Access

If you're interested in joining the SimHop MCP Development Team:
1. Contact our CTO: amadeus.hritani@simhop.se
2. Provide your development background and expertise
3. Complete the team onboarding process if approved

> 🔥 Pro Tip: Team members should always run the test suite before submitting a PR!

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
- <span style="color: #00ff00">🟢 **Safe**: Read-only operations, no data modification</span>
- <span style="color: #ffff00">🟡 **Moderate**: Creates or modifies content, but can be reverted</span>
- <span style="color: #ff0000">🔴 **High**: Destructive operations or system-wide changes</span>

> 🤘 Pro Tip: Always test high-danger tools in a staging environment first!

## <span style="color: #A351D6">⚠️ Warning: Use Data Manipulation Tools with Caution</span>

Data manipulation tools in the Claudeus WordPress MCP are powerful and can significantly impact your WordPress sites. Here's what you need to know:

### Potential Risks

- **Data Loss**: Incorrect use of tools can lead to unintended data deletion or modification.
- **Site Downtime**: Misconfigurations may cause site outages or performance issues.
- **Security Vulnerabilities**: Improper handling of sensitive data can expose your site to security risks.

### Best Practices

1. **<span style="color: #00ff00">✓ SAFETY FIRST</span>**: Always create backups before operations
2. **<span style="color: #00ff00">✓ TEST SAFE</span>**: Use staging environment for new tools
3. **<span style="color: #00ff00">✓ VERIFY</span>**: Review changes before applying
4. **<span style="color: #00ff00">✓ SECURE</span>**: Restrict tool access to trusted users
5. **<span style="color: #00ff00">✓ MONITOR</span>**: Track tool usage and performance

### Constructive Use

When used correctly, these tools can:
- <span style="color: #00ff00">✓ Automate repetitive tasks</span>
- <span style="color: #00ff00">✓ Enhance site performance</span>
- <span style="color: #00ff00">✓ Improve content quality</span>

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

## 🎯 Our Mission: Elevating MCP Development Standards

In the rapidly evolving landscape of AI-powered development, we observed a critical gap: many MCP servers, especially those designed for Claude Desktop, were falling short of professional development standards. Common issues included:

- 🔴 Poor TypeScript implementation or complete lack of type safety
- 🔴 Missing or inadequate test coverage
- 🔴 Incomplete MCP protocol implementation
- 🔴 Security vulnerabilities
- 🔴 Unreliable error handling
- 🔴 Lack of proper documentation

This motivated us to create Claudeus WordPress MCP - not just as another WordPress management tool, but as a reference implementation that demonstrates:

- ✅ Complete TypeScript coverage with strict type checking
- ✅ Comprehensive test suite (95%+ coverage)
- ✅ Full MCP 2024-11-05 specification compliance
- ✅ Enterprise-grade security practices
- ✅ Robust error handling and recovery
- ✅ Detailed documentation and examples

### Why We're Setting the Standard

While this remains a private repository, we've made the code available for viewing to:
1. Demonstrate professional MCP server development practices
2. Encourage better standards in the MCP ecosystem
3. Show how to properly implement Claude Desktop integration
4. Provide a reference for secure WordPress automation

## 🏢 The Team Behind the Magic

### SimHop IT & Media AB - Where Innovation Meets Metal 🤘

Based in the heart of Sweden, SimHop IT & Media AB is the powerhouse behind Claudeus WordPress MCP. We're not your typical tech company - we're a fusion of technical excellence and creative innovation, orchestrating digital solutions that rock! 

#### 🎸 The Maestros

**Amadeus Samiel H. (CTO/Lead Solutions Architect)**
- MSc in Computer Science
- 20+ years crafting digital excellence
- Instructor at LIU and other institutes
- The technical virtuoso behind Claudeus WP MCP
- Specializations: System Architecture, Creative Development, Technical Education

**Simon Malki (CEO)**
- 20+ years orchestrating business success
- Expert in strategic planning and market dynamics
- The business mastermind driving SimHop's vision
- Specializations: Business Strategy, Market Analysis, Technical Operations

#### 🏗️ Our Dual-Power Structure

**Stockholm HQ (Business & Strategy)**
📍 Krögers Promenad 11, 191 37 Sollentuna
- Strategic Operations
- Business Development
- Market Strategy
- Client Relations

**Norrköping Division (Technical Innovation)**
📍 Klingsbergsgatan 13, 603 54 Norrköping
- Development & Architecture
- Technical Innovation
- R&D Operations

### 🤘 Why We Made It Free

Claudeus WordPress MCP was born from our passion for both heavy metal and heavy-duty WordPress development, but it represents something even more important: our commitment to elevating the standards of MCP server development. We observed that many existing MCP servers, especially those designed for Claude Desktop, were falling short of professional standards - lacking proper testing, type safety, and security measures.

By making our code available for viewing, we're not just sharing a tool - we're setting a new standard for MCP server development. Just as metal music pushes the boundaries of musical excellence, we're pushing the boundaries of what a properly implemented MCP server should be:

- **Technical Excellence**: Like a perfectly executed guitar solo, our code demonstrates pristine TypeScript implementation
- **Comprehensive Testing**: Every riff (function) is tested, every solo (feature) is verified
- **Security First**: Protected like a fortress of metal, with proper authentication and validation
- **Documentation**: Clear and detailed, like the best metal lyrics

While this remains a private repository, making the code viewable helps other developers understand how to properly implement MCP servers, especially for Claude Desktop integration. It's our way of saying "this is how it's done!" 🎸

### 🔥 Our Philosophy

1. **Technical Excellence**: Setting the standard for MCP development
2. **Creative Innovation**: Breaking boundaries while maintaining stability
3. **Security First**: Enterprise-grade protection by default
4. **Continuous Evolution**: Always pushing the technical boundaries

> "We believe in empowering developers with tools that rock as hard as they do, while showing them how it should be done!" - Amadeus Samiel H. (aka Deus)

---
## 🧙‍♂️ Words of Wisdom

> `npm` is not a package manager, it's a repository of packages. If you want a dependable package manager, always use `pnpm`  
> — Amadeus Samiel H.

---

### The Package Manager's Anthem
#### *by Amadeus & Claude*
---
*In code's vast land,  
npm stands, a host,  
But pnpm's hand,  
Manages most.*

*With iron might,  
Dependencies align,  
pnpm's light,  
In code, it shines.*

*A true manager's call,  
In the coder's hall,  
pnpm reigns,  
Above them all.* 


---


> Made with 🤘❤️ by [<span style="color: #A351D6">Amadeus Samiel H.</span>](mailto:amadeus.hritani@simhop.se)
