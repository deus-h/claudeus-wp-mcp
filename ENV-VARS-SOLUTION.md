# 🔥 Environment Variables Solution - Technical Report

## Executive Summary

**Goal:** Have `WP_SITES_PATH` pre-filled in Inspector UI while allowing users to customize it.

**Solution:** Custom launcher script that passes default env vars to Inspector via `-e` flag.

**Result:** ✅ Works perfectly! Users see pre-filled value, can still change it in UI.

---

## 🎯 The Problem We Solved

### Original Issue
- Inspector required manually adding `WP_SITES_PATH` every time
- Users had to know the exact path
- Tedious for repeated testing

### Your Vision
- Have a **default path** hardcoded (your path)
- Users can **customize it** (their path)
- Appears **pre-filled in Inspector UI**
- Can still be **changed in the UI**

---

## 🏗️ Architecture Deep Dive

### How Inspector Handles Environment Variables

```
┌─────────────────┐
│  pnpm inspector │
└────────┬────────┘
         │
         ├─▶ Spawns Inspector Server (Proxy)
         │   ├─ Reads MCP_ENV_VARS from its own process.env
         │   ├─ Merges with getDefaultEnvironment() (PATH, HOME, etc.)
         │   └─ Serves via /config endpoint
         │
         └─▶ Spawns Inspector Client (UI)
             ├─ Fetches /config endpoint
             ├─ Calls setEnv(data.defaultEnvironment)
             └─ Pre-fills environment variable fields! 🎸
```

### Key Inspector Code Flow

**1. Inspector Server reads MCP_ENV_VARS:**
```typescript
// inspector/server/src/index.ts:31-34
const defaultEnvironment = {
  ...getDefaultEnvironment(),  // PATH, HOME, USER from SDK
  ...(process.env.MCP_ENV_VARS ? JSON.parse(process.env.MCP_ENV_VARS) : {}),
};
```

**2. Serves it via endpoint:**
```typescript
// inspector/server/src/index.ts:742-755
app.get("/config", (req, res) => {
  res.json({
    defaultEnvironment,  // ← Our WP_SITES_PATH is here!
    defaultCommand: values.command,
    defaultArgs: values.args,
  });
});
```

**3. UI fetches and pre-fills:**
```typescript
// inspector/client/src/App.tsx:524-527
fetch(`${getMCPProxyAddress(config)}/config`, { headers })
  .then((response) => response.json())
  .then((data) => {
    setEnv(data.defaultEnvironment);  // ← Pre-fills UI fields! 🎸
  });
```

---

## 💡 Our Solution

### Component 1: Launcher Script
**File:** `scripts/launch-inspector.js`

**Purpose:** 
- Computes default `WP_SITES_PATH` dynamically
- Spawns Inspector with `-e` flag to pass env vars
- Inspector reads this and pre-fills the UI

**Key Code:**
```javascript
const DEFAULT_WP_SITES_PATH = resolve(PROJECT_ROOT, 'wp-sites.json');

const inspectorArgs = [
  '@modelcontextprotocol/inspector',
  '-e',
  `WP_SITES_PATH=${DEFAULT_WP_SITES_PATH}`,  // ← Passed to Inspector!
  WRAPPER_PATH
];

spawn('npx', inspectorArgs, { stdio: 'inherit' });
```

**How `-e` flag works:**
```javascript
// inspector/client/bin/start.js:250-260
if (parsingFlags && arg === "-e" && i + 1 < args.length) {
  const envVar = args[++i];
  const equalsIndex = envVar.indexOf("=");
  const key = envVar.substring(0, equalsIndex);
  const value = envVar.substring(equalsIndex + 1);
  envVars[key] = value;  // ← Stored here
}

// Then passed to server:
MCP_ENV_VARS: JSON.stringify(envVars)  // ← Becomes process.env.MCP_ENV_VARS
```

### Component 2: Inspector Wrapper
**File:** `src/inspector-wrapper.ts`

**Purpose:**
- Simple passthrough for stdio communication
- Receives env vars from Inspector
- Forwards them to the actual MCP server

**Key Code:**
```typescript
// Spawn MCP server with Inspector's environment
const child = spawn(nodePath, [serverPath], {
  stdio: ['pipe', 'pipe', 'inherit'],
  env: process.env,  // ← Includes WP_SITES_PATH from Inspector
  shell: false
});

// Forward stdin/stdout for MCP protocol
process.stdin.pipe(child.stdin);
child.stdout.pipe(process.stdout);
```

### Component 3: MCP Server
**File:** `src/index.ts`

**Purpose:**
- Reads `WP_SITES_PATH` from environment
- Loads WordPress site configurations
- Provides MCP tools

**Key Code:**
```typescript
// src/config/site-config.ts:13-15
const configPath = process.env.WP_SITES_PATH;
if (!configPath) {
    throw new Error("WP_SITES_PATH environment variable is required");
}
```

---

## 🎸 The Complete Flow

```
User runs: pnpm inspector
            │
            ▼
launch-inspector.js
  - Computes: DEFAULT_WP_SITES_PATH = /Users/deus/.../wp-sites.json
  - Spawns: npx @modelcontextprotocol/inspector -e WP_SITES_PATH=<path> dist/inspector-wrapper.js
            │
            ▼
Inspector Server (Proxy)
  - Reads: process.env.MCP_ENV_VARS = {"WP_SITES_PATH": "<path>"}
  - Merges with: getDefaultEnvironment() (PATH, HOME, USER, etc.)
  - Creates: defaultEnvironment = {PATH: "...", HOME: "...", WP_SITES_PATH: "<path>"}
  - Serves: GET /config → { defaultEnvironment }
            │
            ▼
Inspector Client (UI)
  - Fetches: /config endpoint
  - Calls: setEnv(data.defaultEnvironment)
  - Result: WP_SITES_PATH field is PRE-FILLED! 🎸
            │
            ▼
User clicks "Connect" (can edit path first)
            │
            ▼
Inspector spawns: dist/inspector-wrapper.js
  - With env: {WP_SITES_PATH: "<path>", PATH: "...", HOME: "..."}
            │
            ▼
inspector-wrapper.js spawns: dist/index.js
  - Forwards env: process.env (includes WP_SITES_PATH)
            │
            ▼
MCP Server (index.js)
  - Reads: process.env.WP_SITES_PATH
  - Loads: WordPress site configurations
  - Ready: All tools available! 🤘
```

---

## ✅ Benefits of This Approach

### For Developers (You)
- ✅ **Hardcoded default** - Your path is pre-filled
- ✅ **Zero manual input** - Just run `pnpm inspector`
- ✅ **Fast iteration** - No setup each time
- ✅ **Clean architecture** - Separation of concerns

### For Users (Other Developers)
- ✅ **Easy customization** - Edit one file or use UI
- ✅ **Portable** - Relative paths work anywhere
- ✅ **Flexible** - Can change in UI per-session
- ✅ **Well-documented** - Clear instructions

### Technical Excellence
- ✅ **Follows MCP standards** - Uses Inspector as designed
- ✅ **No hacks** - Clean, official approach
- ✅ **Maintainable** - Simple, clear code
- ✅ **Extensible** - Easy to add more defaults

---

## 🔧 Customization Options

### Option 1: Quick UI Change (Per-Session)
```
1. Run: pnpm inspector
2. See pre-filled: WP_SITES_PATH = /Users/deus/.../wp-sites.json
3. Click value field
4. Change to: /your/custom/path.json
5. Click Connect
```

### Option 2: Permanent Default Change
**Edit:** `scripts/launch-inspector.js`
```javascript
// Line 28 - Change this:
const DEFAULT_WP_SITES_PATH = resolve(PROJECT_ROOT, 'wp-sites.json');

// To your path:
const DEFAULT_WP_SITES_PATH = '/Users/yourname/my-path.json';
```

### Option 3: Multiple Environments
**Create multiple scripts:**
```json
// package.json
{
  "inspector": "node scripts/launch-inspector.js",
  "inspector:prod": "node scripts/launch-inspector-prod.js",
  "inspector:test": "node scripts/launch-inspector-test.js"
}
```

Each with different `DEFAULT_WP_SITES_PATH` values!

---

## 📊 Why Only WP_SITES_PATH?

| Environment Variable | Needed? | Why? |
|---------------------|---------|------|
| `WP_SITES_PATH` | ✅ YES | **Your application requires it** |
| `PATH` | ❌ NO | Inspector provides via `getDefaultEnvironment()` |
| `HOME` | ❌ NO | Inspector provides via `getDefaultEnvironment()` |
| `USER` | ❌ NO | Inspector provides via `getDefaultEnvironment()` |
| `SHELL` | ❌ NO | Inspector provides via `getDefaultEnvironment()` |
| `TRANSPORT_TYPE` | ❌ NO | Inspector sets this automatically |
| `NODE_ENV` | ❌ NO | Optional, not required for core functionality |
| `PORT` | ❌ NO | Only needed for SSE transport (we use stdio) |

**Bottom Line:** Inspector handles all system vars automatically. We only need application-specific vars!

---

## 🎯 Files Modified

### Created
- ✅ `scripts/launch-inspector.js` - Launcher with default env vars
- ✅ `INSPECTOR-CUSTOMIZATION.md` - User customization guide
- ✅ `ENV-VARS-SOLUTION.md` - This technical documentation

### Modified
- ✅ `src/inspector-wrapper.ts` - Simplified to clean passthrough
- ✅ `package.json` - Updated inspector script to use launcher
- ✅ `SETUP-GUIDE.md` - Updated with new workflow

### Unchanged
- ✅ `src/index.ts` - Still reads `WP_SITES_PATH` same way
- ✅ `src/config/site-config.ts` - No changes needed
- ✅ Claude Desktop config - Still works the same!

---

## 🔍 Testing Checklist

### Test 1: Default Path
```bash
pnpm inspector
# ✅ Inspector opens
# ✅ WP_SITES_PATH is pre-filled
# ✅ Click Connect
# ✅ Tools appear
```

### Test 2: Custom Path in UI
```bash
pnpm inspector
# ✅ Change WP_SITES_PATH in UI
# ✅ Click Connect
# ✅ Uses custom path
```

### Test 3: Permanent Custom Path
```bash
# Edit scripts/launch-inspector.js
# Change DEFAULT_WP_SITES_PATH
pnpm inspector
# ✅ New default appears
```

### Test 4: Claude Desktop (Unchanged)
```json
// claude_desktop_config.json
{
  "env": {
    "WP_SITES_PATH": "/your/path.json"
  }
}
```
✅ Still works exactly the same!

---

## 🤘 The Metal Way

**Before:** Complex filtering, unnecessary env var management  
**After:** Clean, simple, follows MCP conventions

**Philosophy:**
- Strip away complexity ✓
- Let the core riff shine ✓
- User-friendly defaults ✓
- Developer flexibility ✓

**Result:** A solution that's both **powerful for you** and **portable for others**! 🎸🔥

---

## 📚 References

### Inspector Source Code
- **Server env handling:** `inspector/server/src/index.ts:31-34`
- **Config endpoint:** `inspector/server/src/index.ts:742-755`
- **Client pre-fill:** `inspector/client/src/App.tsx:524-527`
- **CLI arg parsing:** `inspector/client/bin/start.js:250-260`
- **Environment merging:** `inspector/server/src/index.ts:339`

### MCP SDK
- **getDefaultEnvironment():** `@modelcontextprotocol/sdk/client/stdio.js`

### Our Implementation
- **Launcher:** `scripts/launch-inspector.js`
- **Wrapper:** `src/inspector-wrapper.ts`
- **Config loader:** `src/config/site-config.ts`

---

🔥 **Rock on, Brother!** This solution is clean, maintainable, and follows MCP best practices! 🤘❤️

