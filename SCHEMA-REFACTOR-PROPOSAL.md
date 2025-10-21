# Schema Refactoring Proposal - DRY Tool Definitions

## 🎯 Problem

Currently, we're duplicating the `site` parameter across **ALL tools** manually:

```typescript
// Repeated in EVERY tool (50+ times!)
site: {
    type: 'string',
    description: 'Site alias (defaults to default_test)',
    default: 'default_test'
}
```

**Issues:**
- ❌ Not DRY - duplicated 50+ times
- ❌ Hard to maintain - change requires updating 50+ files
- ❌ Error-prone - easy to miss tools
- ❌ Tedious - manual fix for each tool

---

## ✅ Solution: Common Schema Definitions

### Create Shared Schema Constants

**File:** `/src/tools/schemas/common.ts`

```typescript
export const SITE_PARAM = {
    type: 'string' as const,
    description: 'Site alias (defaults to default_test)',
    default: 'default_test'
};

export const PAGINATION_PARAMS = { ... };
export const ID_PARAM = { ... };
// etc.
```

### Use Across All Tools

**Before:**
```typescript
export const contentTools: Tool[] = [{
  name: 'claudeus_wp_content__get_posts',
  inputSchema: {
    type: 'object',
    properties: {
      site: {
        type: 'string',
        description: 'Site alias (defaults to default_test)',
        default: 'default_test'
      },
      // ... rest
    }
  }
}];
```

**After:**
```typescript
import { SITE_PARAM, PAGINATION_PARAMS } from '../schemas/common.js';

export const contentTools: Tool[] = [{
  name: 'claudeus_wp_content__get_posts',
  inputSchema: {
    type: 'object',
    properties: {
      site: SITE_PARAM,  // ✅ Reused!
      filters: {
        type: 'object',
        properties: {
          ...PAGINATION_PARAMS,  // ✅ Spread common params!
          // ... tool-specific filters
        }
      }
    }
  }
}];
```

---

## 🎯 Benefits

### 1. **Single Source of Truth**
- Change site default once → applies everywhere
- Update pagination limits once → all tools updated

### 2. **Maintainability**
- Easy to update common parameters
- Consistent behavior across all tools
- Less code to maintain

### 3. **Consistency**
- All tools use identical schemas
- No variations or typos
- Better UX in Inspector

### 4. **Scalability**
- Add new common params easily
- Tools automatically inherit updates
- Future-proof architecture

---

## 📋 Implementation Plan

### Phase 1: Create Common Schemas ✅
- ✅ Create `/src/tools/schemas/common.ts`
- ✅ Define SITE_PARAM
- ✅ Define other common params (pagination, ID, etc.)

### Phase 2: Refactor Existing Tools
1. Content tools (14 tools)
2. Media tools (4 tools)
3. Shop tools (3 tools)
4. Theme tools (7 tools)
5. Taxonomy tools (12 tools)
6. Discovery tools (1 tool)

**Total:** 41 tools to refactor

### Phase 3: Document Pattern
- Update contribution guidelines
- Add examples to README
- Document schema composition

---

## 🔧 Common Schemas to Create

### Essential
- ✅ `SITE_PARAM` - Site alias
- ✅ `ID_PARAM` - Resource ID
- ✅ `PAGINATION_PARAMS` - page, per_page
- ✅ `SEARCH_PARAM` - Search query
- ✅ `ORDER_PARAMS` - order, orderby
- ✅ `FORCE_DELETE_PARAM` - Force deletion

### Content-Specific
- `STATUS_PARAM` - Post/page status (publish, draft, etc.)
- `AUTHOR_PARAM` - Author ID filter
- `DATE_PARAMS` - Date range filters

### Taxonomy-Specific
- `TERM_FILTERS` - Common term filters
- `HIERARCHICAL_PARAMS` - Parent/child params

---

## 🚀 Migration Strategy

### Option A: Gradual (Recommended)
1. Create common schemas
2. Refactor one module at a time
3. Test after each module
4. No breaking changes

### Option B: Big Bang
1. Create common schemas
2. Refactor all tools at once
3. Single comprehensive test
4. Faster but riskier

**Recommendation:** **Option A** - safer, testable, incremental

---

## 📊 Impact Analysis

### Before Refactoring
```
Lines of duplicated code: ~2000+ lines
Maintenance burden: HIGH
Change effort: 50+ files
Error risk: HIGH
```

### After Refactoring
```
Lines of duplicated code: ~100 lines (95% reduction!)
Maintenance burden: LOW
Change effort: 1 file
Error risk: LOW
```

---

## 🎯 Example Migration

### Content Tools - Before
```typescript
// 200+ lines of repeated properties across 14 tools
```

### Content Tools - After
```typescript
import { SITE_PARAM, PAGINATION_PARAMS, ID_PARAM } from '../schemas/common.js';

export const contentTools: Tool[] = [{
  name: 'claudeus_wp_content__get_posts',
  inputSchema: {
    type: 'object',
    properties: {
      site: SITE_PARAM,
      filters: {
        type: 'object',
        properties: {
          ...PAGINATION_PARAMS,
          // tool-specific only
        }
      }
    }
  }
}];

// Repeat pattern for all 14 tools - much cleaner!
```

**Reduction:** ~150 lines → ~80 lines (47% less code)

---

## ✅ Decision

**Recommended Approach:**
1. ✅ Create `/src/tools/schemas/common.ts` (DONE)
2. Refactor one module to prove pattern
3. If successful, apply to all modules
4. Document for future tools

**Time Estimate:**
- Schema creation: 10 min ✅
- Per-module refactor: ~15 min each
- Testing: 5 min per module
- **Total:** ~2 hours for all 6 modules

**ROI:** Saves hours of future maintenance!

---

## 🤘 Let's Do This!

**Your call, D:**
- **Option 1**: Refactor all modules now (~2 hours)
- **Option 2**: Refactor new tools going forward (gradual)
- **Option 3**: Different approach?

What do you think? 🔥

