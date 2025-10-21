# Tools Architecture Refactoring Plan

## 🎯 Objective
Refactor `/src/mcp/tools.ts` (1008 lines) to use the existing modular structure and prepare for 50+ new tools.

## 📊 Current Issues

### Issue #1: Duplication
- Tools are defined in `/src/tools/*/index.ts` 
- **BUT** they're re-defined in `/src/mcp/tools.ts` lines 227-709
- This means 2x maintenance burden

### Issue #2: Monolithic Handler
- All handlers are in ONE massive switch statement (lines 754-1006)
- Each new tool adds ~20-30 lines
- Hard to navigate, test, and maintain

### Issue #3: Mixed Concerns
- `tools.ts` handles:
  - Tool registration
  - Resource management
  - Prompts
  - Tool handling
  - Capabilities checking

## ✅ Proposed Architecture

### Structure
```
/src/
├── mcp/
│   ├── server.ts              (MCP server setup)
│   └── handlers.ts            (Request routing ONLY)
├── tools/
│   ├── taxonomy/
│   │   ├── index.ts           (Tool definitions)
│   │   └── handlers.ts        (Business logic)
│   ├── theme/
│   │   ├── index.ts
│   │   └── handlers.ts
│   ├── user/
│   │   ├── index.ts
│   │   └── handlers.ts
│   └── index.ts               (Aggregates ALL tools)
├── handlers/
│   ├── tools.ts               (Tool call routing)
│   ├── resources.ts           (Resource handling)
│   └── prompts.ts             (Prompt handling)
```

### Pattern for Each Domain

#### `/src/tools/[domain]/index.ts`
```typescript
import { Tool } from '@modelcontextprotocol/sdk/types.js';

export const taxonomyTools: Tool[] = [
    {
        name: 'claudeus_wp_taxonomy__get_categories',
        description: '...',
        inputSchema: { /* ... */ }
    },
    // ... more tools
];
```

#### `/src/tools/[domain]/handlers.ts`
```typescript
import { TaxonomiesApiClient } from '../../api/taxonomies.js';

export async function handleTaxonomyTools(
    name: string, 
    args: Record<string, unknown>, 
    client: TaxonomiesApiClient
) {
    switch (name) {
        case 'claudeus_wp_taxonomy__get_categories':
            return { /* ... */ };
        default:
            throw new Error(`Unknown taxonomy tool: ${name}`);
    }
}
```

#### `/src/handlers/tools.ts`
```typescript
import { handleContentTools } from '../tools/content/handlers.js';
import { handleTaxonomyTools } from '../tools/taxonomy/handlers.js';
// ... etc

export async function routeToolCall(toolName: string, args: any, client: any) {
    const domain = toolName.split('__')[0].split('_').pop(); // Extract domain
    
    switch (domain) {
        case 'content': return handleContentTools(toolName, args, client.posts);
        case 'taxonomy': return handleTaxonomyTools(toolName, args, client.taxonomies);
        case 'shop': return handleShopTools(toolName, args, client.shop);
        // ... etc
        default: throw new Error(`Unknown tool domain: ${domain}`);
    }
}
```

## 📝 Refactoring Steps

### Phase 1: Extract Existing Tools ✅
1. ✅ Move content tools from `tools.ts` → `/src/tools/content/`
2. ✅ Move media tools from `tools.ts` → `/src/tools/media/`
3. ✅ Move theme tools from `tools.ts` → `/src/tools/theme/` (NEW)
4. ✅ Move discovery tools from `tools.ts` → `/src/tools/discovery/`

### Phase 2: Create Taxonomy Module ✅
1. ✅ Create `/src/tools/taxonomy/index.ts` with tool definitions
2. ✅ Create `/src/tools/taxonomy/handlers.ts` with handlers
3. ✅ Add to `/src/tools/index.ts`

### Phase 3: Refactor Main Handler
1. Create `/src/handlers/tools.ts` with routing logic
2. Create `/src/handlers/resources.ts` for resource handling
3. Create `/src/handlers/prompts.ts` for prompt handling
4. Simplify `/src/mcp/tools.ts` to just registration

### Phase 4: Update Clients Interface
1. Update clients type to be more generic
2. Add proper TypeScript interfaces for client map

## 🎯 Benefits

1. **Scalability**: Adding 50+ tools = adding 50+ files in organized structure
2. **Maintainability**: Each domain is self-contained
3. **Testability**: Each handler can be unit tested independently
4. **DRY**: Single source of truth for each tool
5. **Readability**: `tools.ts` goes from 1008 lines → ~200 lines
6. **Team-friendly**: Multiple devs can work on different domains

## 📈 File Size Reduction

- **Before**: `tools.ts` = 1008 lines
- **After**: 
  - `handlers/tools.ts` = ~100 lines (routing)
  - `handlers/resources.ts` = ~100 lines
  - `handlers/prompts.ts` = ~50 lines
  - Each domain = ~50-100 lines

## 🚀 Next Steps

1. Shall we execute this refactoring now?
2. Or continue with adding tools in the current structure first?

**Recommendation**: Refactor NOW before adding more tools to avoid technical debt.

