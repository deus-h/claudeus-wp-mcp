# WordPress MCP Tools - Quick Reference 🚀

> **Fast lookup guide for available and planned WordPress MCP tools**

---

## 📊 Coverage Summary

| Category | Current | Planned | Total | Status |
|----------|---------|---------|-------|--------|
| **Content** | 16 | 15 | 31 | 🟡 Medium Coverage |
| **Taxonomies** | 0 | 11 | 11 | 🔴 No Coverage |
| **Users** | 0 | 10 | 10 | 🔴 No Coverage |
| **Comments** | 0 | 8 | 8 | 🔴 No Coverage |
| **Menus** | 0 | 10 | 10 | 🔴 No Coverage |
| **Templates** | 0 | 8 | 8 | 🔴 No Coverage |
| **Design** | 0 | 8 | 8 | 🔴 No Coverage |
| **Settings** | 0 | 5 | 5 | 🔴 No Coverage |
| **Themes** | 7 | 0 | 7 | 🟢 Full Coverage |
| **Media** | 4 | 0 | 4 | 🟢 Full Coverage |
| **Plugins** | 0 | 5 | 5 | 🔴 No Coverage |
| **Widgets** | 0 | 7 | 7 | 🔴 No Coverage |
| **Health** | 0 | 6 | 6 | 🔴 No Coverage |
| **Search** | 0 | 6 | 6 | 🔴 No Coverage |
| **Shop** | 5+ | 0 | 5+ | 🟢 Full Coverage |
| **Integrations** | 0 | 15 | 15 | 🔴 No Coverage |
| **TOTAL** | **32** | **114** | **146** | **22% Complete** |

---

## 🎯 Current Tools (32)

### Discovery
- ✅ `claudeus_wp_discover_endpoints` - Discover API endpoints

### Content - Posts (4)
- ✅ `claudeus_wp_content__get_posts` - List posts
- ✅ `claudeus_wp_content__create_post` - Create post
- ✅ `claudeus_wp_content__update_post` - Update post
- ✅ `claudeus_wp_content__delete_post` - Delete post

### Content - Pages (4)
- ✅ `claudeus_wp_content__get_pages` - List pages
- ✅ `claudeus_wp_content__create_page` - Create page
- ✅ `claudeus_wp_content__update_page` - Update page
- ✅ `claudeus_wp_content__delete_page` - Delete page

### Content - Blocks (5)
- ✅ `claudeus_wp_content__get_blocks` - List blocks
- ✅ `claudeus_wp_content__create_block` - Create block
- ✅ `claudeus_wp_content__update_block` - Update block
- ✅ `claudeus_wp_content__delete_block` - Delete block
- ✅ `claudeus_wp_content__get_block_revisions` - Get block revisions

### Media (4)
- ✅ `claudeus_wp_media__get_media` - List media
- ✅ `claudeus_wp_media__upload` - Upload file
- ✅ `claudeus_wp_media__update` - Update media metadata
- ✅ `claudeus_wp_media__delete` - Delete media

### Themes (7)
- ✅ `claudeus_wp_theme__list` - List themes
- ✅ `claudeus_wp_theme__get_active` - Get active theme
- ✅ `claudeus_wp_theme__activate` - Activate theme
- ✅ `claudeus_wp_theme__get_customization` - Get customization
- ✅ `claudeus_wp_theme__update_customization` - Update customization
- ✅ `claudeus_wp_theme__get_custom_css` - Get custom CSS
- ✅ `claudeus_wp_theme__update_custom_css` - Update custom CSS

### Shop (5+)
- ✅ WooCommerce products, orders, customers, etc.

---

## 🚀 Planned Tools by Priority

## TIER 1: Core WordPress (36 tools)

### Taxonomies (11)
- 🔴 `claudeus_wp_taxonomy__get_categories` - List categories
- 🔴 `claudeus_wp_taxonomy__create_category` - Create category
- 🔴 `claudeus_wp_taxonomy__update_category` - Update category
- 🔴 `claudeus_wp_taxonomy__delete_category` - Delete category
- 🔴 `claudeus_wp_taxonomy__get_tags` - List tags
- 🔴 `claudeus_wp_taxonomy__create_tag` - Create tag
- 🔴 `claudeus_wp_taxonomy__update_tag` - Update tag
- 🔴 `claudeus_wp_taxonomy__delete_tag` - Delete tag
- 🔴 `claudeus_wp_taxonomy__list_taxonomies` - List taxonomies
- 🔴 `claudeus_wp_taxonomy__get_taxonomy` - Get taxonomy
- 🔴 `claudeus_wp_taxonomy__get_terms` - Get custom terms

### Users (10)
- 🔴 `claudeus_wp_users__get_users` - List users
- 🔴 `claudeus_wp_users__get_user` - Get user
- 🔴 `claudeus_wp_users__create_user` - Create user
- 🔴 `claudeus_wp_users__update_user` - Update user
- 🔴 `claudeus_wp_users__delete_user` - Delete user
- 🔴 `claudeus_wp_users__get_me` - Get current user
- 🔴 `claudeus_wp_users__create_app_password` - Create app password
- 🔴 `claudeus_wp_users__list_app_passwords` - List app passwords
- 🔴 `claudeus_wp_users__revoke_app_password` - Revoke password
- 🔴 `claudeus_wp_users__introspect_password` - Validate password

### Comments (8)
- 🔴 `claudeus_wp_comments__get_comments` - List comments
- 🔴 `claudeus_wp_comments__get_comment` - Get comment
- 🔴 `claudeus_wp_comments__create_comment` - Create comment
- 🔴 `claudeus_wp_comments__update_comment` - Update comment
- 🔴 `claudeus_wp_comments__delete_comment` - Delete comment
- 🔴 `claudeus_wp_comments__approve` - Approve comment
- 🔴 `claudeus_wp_comments__spam` - Mark as spam
- 🔴 `claudeus_wp_comments__trash` - Trash comment

### Menus (10)
- 🔴 `claudeus_wp_menus__get_menus` - List menus
- 🔴 `claudeus_wp_menus__create_menu` - Create menu
- 🔴 `claudeus_wp_menus__update_menu` - Update menu
- 🔴 `claudeus_wp_menus__delete_menu` - Delete menu
- 🔴 `claudeus_wp_menus__get_menu_items` - List items
- 🔴 `claudeus_wp_menus__create_menu_item` - Add item
- 🔴 `claudeus_wp_menus__update_menu_item` - Update item
- 🔴 `claudeus_wp_menus__delete_menu_item` - Delete item
- 🔴 `claudeus_wp_menus__get_locations` - List locations
- 🔴 `claudeus_wp_menus__assign_location` - Assign menu

---

## TIER 2: Advanced Content (23 tools)

### Revisions (7)
- 🔴 `claudeus_wp_content__get_post_revisions` - List post revisions
- 🔴 `claudeus_wp_content__get_post_revision` - Get revision
- 🔴 `claudeus_wp_content__restore_post_revision` - Restore revision
- 🔴 `claudeus_wp_content__delete_post_revision` - Delete revision
- 🔴 `claudeus_wp_content__get_page_revisions` - List page revisions
- 🔴 `claudeus_wp_content__get_page_revision` - Get page revision
- 🔴 `claudeus_wp_content__restore_page_revision` - Restore page revision

### Templates (8)
- 🔴 `claudeus_wp_template__list_templates` - List templates
- 🔴 `claudeus_wp_template__get_template` - Get template
- 🔴 `claudeus_wp_template__update_template` - Update template
- 🔴 `claudeus_wp_template__delete_template` - Delete template
- 🔴 `claudeus_wp_template__list_template_parts` - List parts
- 🔴 `claudeus_wp_template__get_template_part` - Get part
- 🔴 `claudeus_wp_template__update_template_part` - Update part
- 🔴 `claudeus_wp_template__lookup_template` - Lookup template

### Design System (8)
- 🔴 `claudeus_wp_design__get_global_styles` - Get global styles
- 🔴 `claudeus_wp_design__update_global_styles` - Update styles
- 🔴 `claudeus_wp_design__get_style_variations` - Get variations
- 🔴 `claudeus_wp_design__list_font_families` - List fonts
- 🔴 `claudeus_wp_design__create_font_family` - Add font
- 🔴 `claudeus_wp_design__delete_font_family` - Delete font
- 🔴 `claudeus_wp_design__list_font_faces` - List font faces
- 🔴 `claudeus_wp_design__create_font_face` - Add font face

---

## TIER 3: Configuration (17 tools)

### Settings (5)
- 🔴 `claudeus_wp_settings__get_settings` - Get settings
- 🔴 `claudeus_wp_settings__update_settings` - Update settings
- 🔴 `claudeus_wp_settings__list_post_types` - List post types
- 🔴 `claudeus_wp_settings__get_post_type` - Get post type
- 🔴 `claudeus_wp_settings__list_statuses` - List statuses

### Plugins (5)
- 🔴 `claudeus_wp_plugins__list` - List plugins
- 🔴 `claudeus_wp_plugins__get` - Get plugin
- 🔴 `claudeus_wp_plugins__activate` - Activate plugin
- 🔴 `claudeus_wp_plugins__deactivate` - Deactivate plugin
- 🔴 `claudeus_wp_plugins__update` - Update plugin

### Widgets (7)
- 🔴 `claudeus_wp_widgets__list_sidebars` - List sidebars
- 🔴 `claudeus_wp_widgets__get_sidebar` - Get sidebar
- 🔴 `claudeus_wp_widgets__list_widgets` - List widgets
- 🔴 `claudeus_wp_widgets__create_widget` - Add widget
- 🔴 `claudeus_wp_widgets__update_widget` - Update widget
- 🔴 `claudeus_wp_widgets__delete_widget` - Delete widget
- 🔴 `claudeus_wp_widgets__list_types` - List widget types

---

## TIER 4: Utilities (12 tools)

### Site Health (6)
- 🔴 `claudeus_wp_health__test_auth` - Test auth
- 🔴 `claudeus_wp_health__test_background_updates` - Test updates
- 🔴 `claudeus_wp_health__test_https` - Test HTTPS
- 🔴 `claudeus_wp_health__test_loopback` - Test loopback
- 🔴 `claudeus_wp_health__get_directory_sizes` - Get storage
- 🔴 `claudeus_wp_health__run_all_tests` - Run all tests

### Search & Discovery (6)
- 🔴 `claudeus_wp_search__search` - Universal search
- 🔴 `claudeus_wp_search__oembed` - Get oEmbed
- 🔴 `claudeus_wp_blocks__search_directory` - Search blocks
- 🔴 `claudeus_wp_blocks__list_patterns` - List patterns
- 🔴 `claudeus_wp_blocks__get_pattern_categories` - Pattern cats

---

## TIER 5: Integrations (15 tools)

### Astra (4)
- 🔴 `claudeus_wp_astra__get_settings` - Get settings
- 🔴 `claudeus_wp_astra__update_settings` - Update settings
- 🔴 `claudeus_wp_astra__list_custom_layouts` - List layouts
- 🔴 `claudeus_wp_astra__get_mega_menus` - Get mega menus

### Spectra (3)
- 🔴 `claudeus_wp_spectra__get_taxonomies` - Get taxonomies
- 🔴 `claudeus_wp_spectra__get_editor_settings` - Get editor
- 🔴 `claudeus_wp_spectra__check_custom_fields` - Check fields

### SureForms (5)
- 🔴 `claudeus_wp_sureforms__list_forms` - List forms
- 🔴 `claudeus_wp_sureforms__get_form` - Get form
- 🔴 `claudeus_wp_sureforms__create_form` - Create form
- 🔴 `claudeus_wp_sureforms__get_analytics` - Get analytics
- 🔴 `claudeus_wp_sureforms__generate_form` - AI generate

### Gutenberg Templates (3)
- 🔴 `claudeus_wp_templates__list_sites` - List templates
- 🔴 `claudeus_wp_templates__get_blocks` - Get blocks
- 🔴 `claudeus_wp_templates__get_onboarding` - Get onboarding

---

## 📈 Implementation Timeline

### Phase 1 (Weeks 1-2): TIER 1
**36 tools** - Taxonomies, Users, Comments, Menus
**Result:** 68 total tools (47% coverage)

### Phase 2 (Weeks 3-4): TIER 2  
**23 tools** - Revisions, Templates, Design
**Result:** 91 total tools (62% coverage)

### Phase 3 (Weeks 5-6): TIER 3
**17 tools** - Settings, Plugins, Widgets
**Result:** 108 total tools (74% coverage)

### Phase 4 (Week 7): TIER 4
**12 tools** - Health, Search
**Result:** 120 total tools (82% coverage)

### Phase 5 (Week 8): TIER 5
**15 tools** - Plugin Integrations
**Result:** 135 total tools (92% coverage)

---

## 🔍 Tool Usage Examples

### Content Management
```javascript
// Get posts
claudeus_wp_content__get_posts({ site: 'mysite', filters: { status: 'publish' } })

// Create category
claudeus_wp_taxonomy__create_category({ site: 'mysite', data: { name: 'News' } })
```

### User Management
```javascript
// List users
claudeus_wp_users__get_users({ site: 'mysite', filters: { role: 'author' } })

// Create app password
claudeus_wp_users__create_app_password({ site: 'mysite', user_id: 5, name: 'Mobile App' })
```

### Menu Management
```javascript
// Create menu
claudeus_wp_menus__create_menu({ site: 'mysite', name: 'Main Menu' })

// Add menu item
claudeus_wp_menus__create_menu_item({ 
  site: 'mysite', 
  menu_id: 3,
  data: { title: 'Home', url: '/' }
})
```

### Comment Moderation
```javascript
// Get pending comments
claudeus_wp_comments__get_comments({ site: 'mysite', filters: { status: 'hold' } })

// Approve comment
claudeus_wp_comments__approve({ site: 'mysite', id: 42 })
```

---

## 📝 Notes

- ✅ = Currently implemented
- 🔴 = Planned but not implemented
- 🟢 = Full category coverage
- 🟡 = Partial category coverage
- Tools marked with * require authentication
- Some tools may require specific plugin activation

---

*Last Updated: 2025-10-19*
*Total Tools: 146 (32 current + 114 planned)*

