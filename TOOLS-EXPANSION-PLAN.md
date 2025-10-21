# WordPress MCP Tools Expansion Plan 🔥

> **Comprehensive analysis of available WordPress REST API endpoints and strategic plan for expanding MCP tool coverage**

---

## Executive Summary

Analysis of the WordPress discovery endpoint reveals **144+ available endpoints** across core WordPress and custom namespaces. Current MCP implementation covers approximately **25% of core functionality**. This document outlines a strategic expansion plan to unlock the full potential of WordPress automation through MCP.

---

## Current Tool Coverage ✅

### Content Management (Well Covered)
- **Posts**: CRUD operations + list with filters
- **Pages**: CRUD operations + list with filters  
- **Media**: CRUD + upload + list with filters
- **Blocks**: CRUD + list + revisions

### Theme Management (Well Covered)
- List themes
- Activate themes
- Get/Update customization
- Get/Update custom CSS

### E-commerce (Shop Module)
- Products, Orders, Customers
- Payment gateways, Shipping methods
- Coupons, Reports, Settings

### Discovery
- Endpoint discovery tool

---

## Major Gaps & Opportunities 🎯

## TIER 1: Core WordPress Functionality (HIGH PRIORITY)

### 1. Taxonomies & Terms
**Endpoints Available:**
- `/wp/v2/categories` - Category CRUD
- `/wp/v2/categories/{id}` - Specific category operations
- `/wp/v2/tags` - Tag CRUD
- `/wp/v2/tags/{id}` - Specific tag operations
- `/wp/v2/taxonomies` - List all taxonomies
- `/wp/v2/taxonomies/{taxonomy}` - Get specific taxonomy
- `/wp/v2/{custom_taxonomy}` - Custom taxonomy terms

**Tools to Create:**
- `claudeus_wp_taxonomy__get_categories` - List categories with filters
- `claudeus_wp_taxonomy__create_category` - Create new category
- `claudeus_wp_taxonomy__update_category` - Update category
- `claudeus_wp_taxonomy__delete_category` - Delete category
- `claudeus_wp_taxonomy__get_tags` - List tags with filters
- `claudeus_wp_taxonomy__create_tag` - Create new tag
- `claudeus_wp_taxonomy__update_tag` - Update tag
- `claudeus_wp_taxonomy__delete_tag` - Delete tag
- `claudeus_wp_taxonomy__list_taxonomies` - List all available taxonomies
- `claudeus_wp_taxonomy__get_taxonomy` - Get specific taxonomy details
- `claudeus_wp_taxonomy__get_terms` - Get terms for custom taxonomy

**Value:** Essential for content organization, SEO, navigation

---

### 2. Users & Authentication
**Endpoints Available:**
- `/wp/v2/users` - User list/create
- `/wp/v2/users/{id}` - User CRUD
- `/wp/v2/users/me` - Current user
- `/wp/v2/users/{id}/application-passwords` - App password management
- `/wp/v2/users/{id}/application-passwords/{uuid}` - Specific password ops
- `/wp/v2/users/{id}/application-passwords/introspect` - Validate passwords

**Tools to Create:**
- `claudeus_wp_users__get_users` - List users with filters
- `claudeus_wp_users__get_user` - Get specific user
- `claudeus_wp_users__create_user` - Create new user
- `claudeus_wp_users__update_user` - Update user details
- `claudeus_wp_users__delete_user` - Delete user
- `claudeus_wp_users__get_me` - Get current user info
- `claudeus_wp_users__create_app_password` - Create application password
- `claudeus_wp_users__list_app_passwords` - List user's app passwords
- `claudeus_wp_users__revoke_app_password` - Revoke specific app password
- `claudeus_wp_users__introspect_password` - Validate app password

**Value:** User management, authentication automation, security

---

### 3. Comments
**Endpoints Available:**
- `/wp/v2/comments` - Comment list/create
- `/wp/v2/comments/{id}` - Comment CRUD

**Tools to Create:**
- `claudeus_wp_comments__get_comments` - List comments with filters (by post, author, status)
- `claudeus_wp_comments__get_comment` - Get specific comment
- `claudeus_wp_comments__create_comment` - Create new comment (for testing)
- `claudeus_wp_comments__update_comment` - Update comment (edit, moderate)
- `claudeus_wp_comments__delete_comment` - Delete comment
- `claudeus_wp_comments__approve` - Approve pending comment
- `claudeus_wp_comments__spam` - Mark as spam
- `claudeus_wp_comments__trash` - Move to trash

**Value:** Comment moderation, spam management, engagement tracking

---

### 4. Menus & Navigation
**Endpoints Available:**
- `/wp/v2/menus` - Menu CRUD
- `/wp/v2/menus/{id}` - Specific menu operations
- `/wp/v2/menu-items` - Menu item CRUD
- `/wp/v2/menu-items/{id}` - Specific menu item operations
- `/wp/v2/menu-locations` - List menu locations
- `/wp/v2/menu-locations/{location}` - Assign menu to location
- `/wp/v2/navigation` - Navigation blocks
- `/wp/v2/navigation/{id}` - Navigation block operations

**Tools to Create:**
- `claudeus_wp_menus__get_menus` - List all menus
- `claudeus_wp_menus__create_menu` - Create new menu
- `claudeus_wp_menus__update_menu` - Update menu
- `claudeus_wp_menus__delete_menu` - Delete menu
- `claudeus_wp_menus__get_menu_items` - List menu items for a menu
- `claudeus_wp_menus__create_menu_item` - Add item to menu
- `claudeus_wp_menus__update_menu_item` - Update menu item (reorder, change parent)
- `claudeus_wp_menus__delete_menu_item` - Remove menu item
- `claudeus_wp_menus__get_locations` - List available menu locations
- `claudeus_wp_menus__assign_location` - Assign menu to theme location

**Value:** Site navigation management, automated menu building

---

## TIER 2: Advanced Content Management (MEDIUM PRIORITY)

### 5. Revisions & Autosaves (Posts/Pages)
**Endpoints Available:**
- `/wp/v2/posts/{id}/revisions` - Post revisions
- `/wp/v2/posts/{id}/revisions/{revision_id}` - Specific revision
- `/wp/v2/posts/{id}/autosaves` - Post autosaves
- `/wp/v2/pages/{id}/revisions` - Page revisions
- `/wp/v2/pages/{id}/revisions/{revision_id}` - Specific page revision
- `/wp/v2/pages/{id}/autosaves` - Page autosaves

**Tools to Create:**
- `claudeus_wp_content__get_post_revisions` - List post revisions
- `claudeus_wp_content__get_post_revision` - Get specific revision
- `claudeus_wp_content__restore_post_revision` - Restore a revision
- `claudeus_wp_content__delete_post_revision` - Delete revision
- `claudeus_wp_content__get_page_revisions` - List page revisions
- `claudeus_wp_content__get_page_revision` - Get specific page revision
- `claudeus_wp_content__restore_page_revision` - Restore page revision

**Value:** Version control, content recovery, audit trails

---

### 6. Templates & Template Parts (FSE Support)
**Endpoints Available:**
- `/wp/v2/templates` - Template CRUD
- `/wp/v2/templates/{id}` - Specific template operations
- `/wp/v2/templates/lookup` - Find template by slug
- `/wp/v2/templates/{id}/revisions` - Template revisions
- `/wp/v2/template-parts` - Template part CRUD
- `/wp/v2/template-parts/{id}` - Template part operations
- `/wp/v2/template-parts/lookup` - Find template part

**Tools to Create:**
- `claudeus_wp_template__list_templates` - List all templates
- `claudeus_wp_template__get_template` - Get specific template
- `claudeus_wp_template__update_template` - Update template content
- `claudeus_wp_template__delete_template` - Delete custom template
- `claudeus_wp_template__list_template_parts` - List template parts
- `claudeus_wp_template__get_template_part` - Get specific part
- `claudeus_wp_template__update_template_part` - Update part
- `claudeus_wp_template__lookup_template` - Find template by conditions

**Value:** Full Site Editing (FSE) support, theme development automation

---

### 7. Global Styles & Design System
**Endpoints Available:**
- `/wp/v2/global-styles/{id}` - Global styles CRUD
- `/wp/v2/global-styles/{id}/revisions` - Style revisions
- `/wp/v2/global-styles/themes/{stylesheet}` - Theme styles
- `/wp/v2/global-styles/themes/{stylesheet}/variations` - Style variations
- `/wp/v2/font-families` - Font family management
- `/wp/v2/font-families/{id}` - Font family operations
- `/wp/v2/font-families/{id}/font-faces` - Font faces
- `/wp/v2/font-families/{id}/font-faces/{face_id}` - Font face operations

**Tools to Create:**
- `claudeus_wp_design__get_global_styles` - Get global styles
- `claudeus_wp_design__update_global_styles` - Update global styles
- `claudeus_wp_design__get_style_variations` - List style variations for theme
- `claudeus_wp_design__list_font_families` - List font families
- `claudeus_wp_design__create_font_family` - Add font family
- `claudeus_wp_design__delete_font_family` - Remove font family
- `claudeus_wp_design__list_font_faces` - List font faces for family
- `claudeus_wp_design__create_font_face` - Add font face (variant)

**Value:** Design system management, brand consistency, FSE customization

---

## TIER 3: Site Configuration & Admin (MEDIUM PRIORITY)

### 8. Site Settings & Configuration
**Endpoints Available:**
- `/wp/v2/settings` - Site settings
- `/wp/v2/types` - List post types
- `/wp/v2/types/{type}` - Get post type
- `/wp/v2/statuses` - List post statuses
- `/wp/v2/statuses/{status}` - Get post status

**Tools to Create:**
- `claudeus_wp_settings__get_settings` - Get site settings
- `claudeus_wp_settings__update_settings` - Update settings (title, tagline, etc.)
- `claudeus_wp_settings__list_post_types` - List registered post types
- `claudeus_wp_settings__get_post_type` - Get post type details
- `claudeus_wp_settings__list_statuses` - List available post statuses

**Value:** Site configuration automation, deployment scripts

---

### 9. Plugins & Extensions
**Endpoints Available:**
- `/wp/v2/plugins` - Plugin list
- `/wp/v2/plugins/{plugin}` - Plugin operations (activate/deactivate)

**Tools to Create:**
- `claudeus_wp_plugins__list` - List installed plugins
- `claudeus_wp_plugins__get` - Get plugin details
- `claudeus_wp_plugins__activate` - Activate plugin
- `claudeus_wp_plugins__deactivate` - Deactivate plugin
- `claudeus_wp_plugins__update` - Update plugin (if endpoint supports)

**Value:** Plugin management automation, deployment workflows

---

### 10. Widgets & Sidebars
**Endpoints Available:**
- `/wp/v2/sidebars` - Sidebar list
- `/wp/v2/sidebars/{id}` - Sidebar operations
- `/wp/v2/widgets` - Widget list/create
- `/wp/v2/widgets/{id}` - Widget CRUD
- `/wp/v2/widget-types` - Available widget types
- `/wp/v2/widget-types/{id}` - Widget type details
- `/wp/v2/widget-types/{id}/render` - Render widget

**Tools to Create:**
- `claudeus_wp_widgets__list_sidebars` - List theme sidebars
- `claudeus_wp_widgets__get_sidebar` - Get sidebar widgets
- `claudeus_wp_widgets__list_widgets` - List all widgets
- `claudeus_wp_widgets__create_widget` - Add widget to sidebar
- `claudeus_wp_widgets__update_widget` - Update widget settings
- `claudeus_wp_widgets__delete_widget` - Remove widget
- `claudeus_wp_widgets__list_types` - List available widget types

**Value:** Widget management, sidebar configuration

---

## TIER 4: Utilities & Advanced Features (LOW PRIORITY)

### 11. Site Health & Diagnostics
**Endpoints Available:**
- `/wp-site-health/v1/tests/authorization-header` - Test auth
- `/wp-site-health/v1/tests/background-updates` - Background update status
- `/wp-site-health/v1/tests/dotorg-communication` - WP.org connection
- `/wp-site-health/v1/tests/https-status` - HTTPS status
- `/wp-site-health/v1/tests/loopback-requests` - Loopback test
- `/wp-site-health/v1/tests/page-cache` - Page cache test
- `/wp-site-health/v1/directory-sizes` - Directory size info

**Tools to Create:**
- `claudeus_wp_health__test_auth` - Test authorization header
- `claudeus_wp_health__test_background_updates` - Check background updates
- `claudeus_wp_health__test_https` - Check HTTPS configuration
- `claudeus_wp_health__test_loopback` - Test loopback requests
- `claudeus_wp_health__get_directory_sizes` - Get storage usage
- `claudeus_wp_health__run_all_tests` - Run all health checks

**Value:** Site monitoring, diagnostics, troubleshooting

---

### 12. Search & Discovery
**Endpoints Available:**
- `/wp/v2/search` - Universal search endpoint
- `/oembed/1.0/embed` - oEmbed
- `/oembed/1.0/proxy` - oEmbed proxy
- `/wp-block-editor/v1/url-details` - URL details for blocks
- `/wp/v2/block-directory/search` - Block directory search
- `/wp/v2/block-patterns/patterns` - Block patterns
- `/wp/v2/block-patterns/categories` - Pattern categories

**Tools to Create:**
- `claudeus_wp_search__search` - Universal search (posts, pages, terms)
- `claudeus_wp_search__oembed` - Get oEmbed data
- `claudeus_wp_blocks__search_directory` - Search block directory
- `claudeus_wp_blocks__list_patterns` - List block patterns
- `claudeus_wp_blocks__get_pattern_categories` - Get pattern categories

**Value:** Content discovery, integration features

---

## TIER 5: Plugin-Specific Namespaces (OPTIONAL)

### 13. Astra Theme
**Endpoints Available:**
- `/astra/v1/admin/settings` - Astra settings
- `/astra-addon/v1/custom-layouts` - Custom layouts
- `/astra-addon/v1/mega_menu` - Mega menu

**Tools to Create:**
- `claudeus_wp_astra__get_settings` - Get Astra settings
- `claudeus_wp_astra__update_settings` - Update Astra settings
- `claudeus_wp_astra__list_custom_layouts` - List custom layouts
- `claudeus_wp_astra__get_mega_menus` - Get mega menu config

**Value:** Astra-specific automation for sites using Astra theme

---

### 14. Spectra (Blocks)
**Endpoints Available:**
- `/spectra/v1/all_taxonomy` - Spectra taxonomies
- `/spectra/v1/editor` - Editor settings
- `/spectra/v1/check-custom-fields-support` - Custom fields support

**Tools to Create:**
- `claudeus_wp_spectra__get_taxonomies` - Get Spectra taxonomies
- `claudeus_wp_spectra__get_editor_settings` - Get editor settings
- `claudeus_wp_spectra__check_custom_fields` - Check custom fields support

**Value:** Spectra blocks automation for sites using Spectra

---

### 15. SureForms
**Endpoints Available:**
- `/sureforms/v1/forms-data` - List forms
- `/sureforms/v1/form-data` - Get form
- `/sureforms/v1/create-new-form` - Create form
- `/sureforms/v1/entries-chart-data` - Form analytics
- `/sureforms/v1/generate-form` - AI form generation
- `/sureforms/v1/send-test-email-summary` - Test email

**Tools to Create:**
- `claudeus_wp_sureforms__list_forms` - List all forms
- `claudeus_wp_sureforms__get_form` - Get specific form
- `claudeus_wp_sureforms__create_form` - Create new form
- `claudeus_wp_sureforms__get_analytics` - Get form analytics
- `claudeus_wp_sureforms__generate_form` - AI-generate form

**Value:** Form management automation for SureForms users

---

### 16. Gutenberg Templates (Starter Templates)
**Endpoints Available:**
- `/gutenberg-templates/v1/sites` - Template library
- `/gutenberg-templates/v1/blocks` - Template blocks
- `/gutenberg-templates/v1/pages-onboarding` - Onboarding pages
- `/gutenberg-templates/v1/favorite` - Favorite templates

**Tools to Create:**
- `claudeus_wp_templates__list_sites` - List starter templates
- `claudeus_wp_templates__get_blocks` - Get template blocks
- `claudeus_wp_templates__get_onboarding` - Get onboarding pages

**Value:** Template library integration for rapid site building

---

## Implementation Strategy

### Phase 1: Core Foundation (Weeks 1-2)
**Priority: TIER 1**
1. Taxonomies (Categories & Tags) - 8 tools
2. Users & Authentication - 10 tools
3. Comments - 8 tools

**Deliverable:** 26 new tools covering fundamental WordPress operations

---

### Phase 2: Navigation & Advanced Content (Weeks 3-4)
**Priority: TIER 1 + TIER 2**
4. Menus & Navigation - 10 tools
5. Revisions & Autosaves - 7 tools
6. Templates & Template Parts - 8 tools

**Deliverable:** 25 new tools for navigation and advanced content management

---

### Phase 3: Design System & Configuration (Weeks 5-6)
**Priority: TIER 2 + TIER 3**
7. Global Styles & Design System - 8 tools
8. Site Settings - 5 tools
9. Plugins - 5 tools
10. Widgets & Sidebars - 7 tools

**Deliverable:** 25 new tools for design and configuration

---

### Phase 4: Utilities & Polish (Week 7)
**Priority: TIER 4**
11. Site Health - 6 tools
12. Search & Discovery - 6 tools

**Deliverable:** 12 new tools for utilities and diagnostics

---

### Phase 5: Plugin Integrations (Week 8 - Optional)
**Priority: TIER 5**
13. Astra Theme - 4 tools
14. Spectra - 3 tools
15. SureForms - 5 tools
16. Gutenberg Templates - 3 tools

**Deliverable:** 15 new tools for plugin-specific integrations

---

## Architecture Considerations

### 1. Code Organization
```
src/
├── api/
│   ├── taxonomies.ts      # New: Categories, Tags, Taxonomies
│   ├── users.ts           # New: User management
│   ├── comments.ts        # New: Comment operations
│   ├── menus.ts           # New: Menu management
│   ├── navigation.ts      # New: Navigation blocks
│   ├── templates.ts       # New: Template management
│   ├── global-styles.ts   # New: Design system
│   ├── fonts.ts           # New: Font management
│   ├── settings.ts        # New: Site settings
│   ├── plugins.ts         # New: Plugin management
│   ├── widgets.ts         # New: Widget management
│   ├── site-health.ts     # New: Health checks
│   └── search.ts          # New: Search utilities
├── tools/
│   ├── taxonomy/          # New: Taxonomy tools
│   ├── users/             # New: User tools
│   ├── comments/          # New: Comment tools
│   ├── menus/             # New: Menu tools
│   ├── templates/         # New: Template tools
│   ├── design/            # New: Design system tools
│   ├── settings/          # New: Settings tools
│   ├── plugins/           # New: Plugin tools
│   ├── widgets/           # New: Widget tools
│   ├── health/            # New: Health check tools
│   ├── search/            # New: Search tools
│   └── integrations/      # New: Plugin-specific tools
│       ├── astra/
│       ├── spectra/
│       ├── sureforms/
│       └── gutenberg-templates/
└── types/
    ├── taxonomy.ts        # New: Taxonomy types
    ├── users.ts           # New: User types
    ├── comments.ts        # New: Comment types
    ├── menus.ts           # New: Menu types
    ├── templates.ts       # New: Template types
    └── ...
```

### 2. Consistent Naming Convention
**Current Pattern:** `claudeus_wp_<category>__<action>`

**Examples:**
- `claudeus_wp_taxonomy__get_categories`
- `claudeus_wp_users__create_user`
- `claudeus_wp_comments__approve`
- `claudeus_wp_menus__create_menu_item`

### 3. Error Handling
- Consistent error responses
- Proper capability checking
- Rate limiting consideration
- Graceful fallbacks

### 4. Testing Strategy
- Unit tests for each API client
- Integration tests for tool handlers
- Mock WordPress responses
- End-to-end testing scenarios

---

## Success Metrics

### Coverage Metrics
- **Current:** ~25% of core WP endpoints
- **Phase 1 Target:** ~45% of core WP endpoints
- **Phase 2 Target:** ~65% of core WP endpoints
- **Phase 3 Target:** ~85% of core WP endpoints
- **Phase 4 Target:** ~95% of core WP endpoints
- **Complete:** 100% of commonly-used WP endpoints

### Quality Metrics
- All tools have comprehensive input validation
- All tools follow MCP specification
- All tools have proper error handling
- All tools are documented

### Performance Metrics
- Response time < 2s for standard operations
- Batch operations support where applicable
- Efficient caching where appropriate

---

## Next Steps

### Immediate Actions
1. ✅ Complete endpoint discovery analysis
2. ⚡ Review and approve this expansion plan
3. 🔧 Set up development branches for each phase
4. 📝 Create detailed technical specifications for Phase 1
5. 🚀 Begin Phase 1 implementation

### Development Process
1. Create API client for new resource type
2. Define TypeScript types/interfaces
3. Implement tool handlers
4. Add tool definitions to tools.ts
5. Write tests
6. Update documentation
7. Test with real WordPress sites

---

## Conclusion

This expansion plan transforms the WordPress MCP from covering basic content operations to providing **comprehensive WordPress automation capabilities**. By systematically implementing these 100+ new tools across 5 phases, we'll create the **most powerful WordPress automation MCP server** available.

The phased approach ensures:
- **Quick wins** with high-value core features first
- **Stable foundation** before advancing to complex features
- **Iterative improvement** with continuous testing
- **Flexibility** to adjust based on user feedback

**Total New Tools Planned:** ~120 tools
**Current Tools:** ~32 tools
**Final Tool Count:** ~152 tools

Let's make this MCP fucking legendary! 🤘🔥

---

*Generated: 2025-10-19*
*Analyst: Codeus*
*Project: Claudeus WordPress MCP Server*

