# Changelog

All notable changes to Claudeus WordPress MCP will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [3.0.0] - 2025-01-21

### 🎉 Major Release - Complete Architecture Rewrite

This is a **massive update** transforming Claudeus WordPress MCP from a basic WordPress tool into the most comprehensive WordPress MCP server available, with **145 production-ready tools** covering every aspect of WordPress management.

### Added

#### Content Management (25 tools)
- **Posts**: Full CRUD operations with revisions and autosaves support
- **Pages**: Complete page management with version control
- **Blocks**: Reusable block management with revision history
- **Revisions**: Get, view, and delete revisions for all content types
- **Autosaves**: Create and manage autosaves for posts, pages, and blocks

#### Taxonomies (12 tools)
- **Categories**: Complete CRUD operations for post categories
- **Tags**: Full tag management with search and filtering
- **Custom Taxonomies**: Support for any registered taxonomy
- **Terms**: Generic term operations across all taxonomies

#### User Management (10 tools)
- **Users**: CRUD operations for WordPress users
- **Application Passwords**: Create, list, revoke, and introspect app passwords
- **User Profiles**: Get current user information
- **Capabilities**: Respect WordPress capability system

#### Comments & Moderation (8 tools)
- **Comments**: Full CRUD for comment management
- **Moderation**: Approve, spam, and trash actions
- **Filtering**: Search and filter comments by status, post, author

#### Menus & Navigation (10 tools)
- **Classic Menus**: Complete menu system management
- **Menu Items**: Add, update, delete, and reorder menu items
- **Menu Locations**: List and manage menu locations
- **Navigation**: Support for both classic and FSE navigation

#### Full Site Editing - FSE (27 tools)
- **Templates**: CRUD operations for block templates
- **Template Parts**: Manage reusable template parts (header, footer)
- **Global Styles**: Get and update theme.json-based styles
- **Style Variations**: List available style variations
- **Block Patterns**: Browse local patterns and WordPress.org directory
- **Pattern Categories**: List available pattern categories

#### Astra Pro Integration (11 tools)
- **Mega Menus**: Create multi-column dropdown menus with custom styling
- **Custom Layouts**: Conditional headers, footers, and hook-based layouts
- **Advanced Hooks**: Insert content at any WordPress action hook
- **Theme Settings**: Programmatically manage Astra theme configuration
- **Display Rules**: Conditional logic for layout display

#### Site Configuration (15 tools)
- **Site Settings**: Get and update WordPress core settings
- **Post Types**: Discover all registered post types
- **Post Statuses**: List available post statuses
- **Plugins**: List, activate, deactivate, and delete plugins
- **Widgets**: Manage widgets and sidebars
- **Theme Management**: List themes and manage custom CSS

#### Site Health & Diagnostics (8 tools)
- **Authorization Test**: Verify REST API authentication
- **Background Updates**: Check update system status
- **WordPress.org Communication**: Test connectivity
- **HTTPS Status**: Validate SSL configuration
- **Loopback Test**: Verify site can make requests to itself
- **Page Cache**: Check caching configuration
- **Directory Sizes**: Monitor storage usage
- **Comprehensive Health Report**: Run all tests in parallel

#### Search & Discovery (5 tools)
- **Universal Search**: Search across all content types in one request
- **oEmbed**: Get rich embed data for URLs
- **oEmbed Proxy**: Retrieve oEmbed data for external URLs
- **URL Details**: Get metadata for block editor link previews
- **Block Directory**: Search WordPress.org block repository

#### WooCommerce (3 tools)
- **Products**: Manage product catalog
- **Orders**: View and process orders
- **Sales Analytics**: Access sales statistics

#### System (5 tools)
- **Endpoint Discovery**: List all available WordPress REST API endpoints
- **Capability Detection**: Discover site features and capabilities

### Changed

#### Architecture
- **Complete rewrite** with modular design (20+ specialized modules)
- **Type-safe implementation** with 100% TypeScript strict mode
- **Separation of concerns** with dedicated API clients per domain
- **Improved error handling** with comprehensive try-catch blocks
- **Better code organization** with clear module boundaries

#### Performance
- **Pagination support** on all list endpoints with metadata
- **Batch operations** for improved efficiency
- **Response optimization** with proper data structures
- **Caching strategies** for frequently accessed data

#### Security
- **Multi-layer validation** (Transport, Auth, Input, Output)
- **Input sanitization** for all user-provided data
- **Output escaping** to prevent XSS attacks
- **Capability checks** respecting WordPress permission system
- **Secure credential handling** with application password support

#### Developer Experience
- **Modular architecture** for easy maintenance and extension
- **Comprehensive TypeScript types** for all API responses
- **Common schema definitions** (DRY principle)
- **Consistent error messages** across all tools
- **Better debugging** with detailed error information

### Documentation

#### New Documentation
- **README.md**: Complete rewrite with all 145 tools documented
- **SECURITY.md**: Enterprise-grade security guide with best practices
- **SETUP-GUIDE.md**: Comprehensive installation and configuration manual
- **CHANGELOG.md**: Professional version history documentation

#### Enhanced Guides
- **Quick Start**: Multiple installation paths (NPM, local, Docker-ready)
- **Multi-Site Setup**: Managing multiple WordPress instances
- **Security Best Practices**: Tool danger levels and safety guidelines
- **Troubleshooting**: Common issues and solutions
- **Advanced Configuration**: Site-specific capabilities and JWT auth

### Breaking Changes from 2.x

⚠️ **Version 3.0.0 is a major release with breaking changes:**

#### Tool Names
- All tools now prefixed by category (e.g., `claudeus_wp_content__get_posts`)
- More descriptive and organized naming convention
- Clear separation between content types

#### Response Formats
- List endpoints now return `{ data: [], pagination: {} }` structure
- Pagination metadata included in all list responses
- Consistent error response format

#### Requirements
- **Node.js**: Now requires ≥ 22.0.0 (was ≥ 16)
- **TypeScript**: Compiled with strict mode
- **Application Passwords**: Recommended authentication method

#### Configuration
- New modular architecture affects imports for programmatic use
- Updated tool capabilities system
- Enhanced site configuration options in `wp-sites.json`

#### API Changes
- Removed deprecated methods from 2.x
- New API client structure per domain
- Updated error handling patterns

### Migration Guide from 2.x

If upgrading from version 2.x:

1. **Update Node.js** to version 22.0.0 or higher
2. **Review Tool Names**: Update any automation using old tool names
3. **Update Response Handling**: Adapt to new pagination structure
4. **Test Thoroughly**: Verify all workflows in staging environment
5. **Review Security**: Implement new best practices from SECURITY.md

### Technical Improvements

#### Code Quality
- **Zero linting errors** with strict ESLint configuration
- **Type coverage**: 100% with no `any` types
- **Modular design**: 20+ independent, testable modules
- **SOLID principles**: Applied throughout codebase

#### Testing
- **Comprehensive test coverage** (95%+)
- **Integration tests** for API clients
- **Unit tests** for core functionality
- **Error scenario coverage**

#### Performance
- **Optimized API calls** with efficient batching
- **Response caching** where appropriate
- **Lazy loading** of heavy dependencies
- **Memory management** improvements

### Contributors

This massive update was crafted with precision and passion by:
- **Amadeus Samiel H.** (CTO/Lead Architect) - Complete architecture and implementation
- **SimHop IT & Media AB** - Development team

### Acknowledgments

Special thanks to:
- The WordPress community for the robust REST API
- Anthropic for the Model Context Protocol specification
- Astra theme team for comprehensive API endpoints
- All beta testers and early adopters

---

## [2.0.5] - 2024-10-08

### Previous Release

#### Features
- Basic WordPress REST API integration
- ~20 core tools for content management
- Posts and pages CRUD operations
- Media upload and management
- Basic theme customization
- WooCommerce product listing
- Initial MCP protocol implementation

#### Known Limitations
- Limited tool coverage
- No taxonomy support
- No user management
- No FSE features
- Basic error handling
- Limited documentation

---

## Future Roadmap

### Planned for 3.1.0
- **Enhanced Astra Support**: Additional Pro features
- **Performance Monitoring**: Detailed performance analytics
- **Backup Tools**: Site backup and restore functionality
- **Migration Tools**: Content migration between sites

### Under Consideration
- **Multisite Network**: WordPress multisite management
- **Custom Fields**: ACF and custom field support
- **Form Builders**: Integration with popular form plugins
- **SEO Tools**: Yoast and RankMath integration

---

## Links

- **GitHub**: https://github.com/deus-h/claudeus-wp-mcp
- **NPM**: https://www.npmjs.com/package/claudeus-wp-mcp
- **Homepage**: https://deusware.se
- **Issues**: https://github.com/deus-h/claudeus-wp-mcp/issues

---

**Version 3.0.0 represents a complete transformation - from a basic tool to the most comprehensive WordPress MCP server available. Rock on! 🤘🔥**

