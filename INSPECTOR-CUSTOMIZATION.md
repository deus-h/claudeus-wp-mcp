# 🎸 Inspector Customization Guide

## Default WP_SITES_PATH Configuration

When you run `pnpm inspector`, the Inspector UI will open with `WP_SITES_PATH` **pre-filled** with a default value. You can change this in two ways:

### Option 1: Change It In The Inspector UI (Quick & Easy) ✅

1. Run `pnpm inspector`
2. Inspector opens in your browser
3. Look at the **Environment Variables** section in the sidebar
4. You'll see `WP_SITES_PATH` already filled with the default path
5. Click the **value field** and change it to your custom path
6. Click **Connect** to use your custom path

**Perfect for:** Testing different configurations or one-time changes

### Option 2: Change The Default Path (Permanent) ⚙️

If you want **your path** to be the default every time:

1. Open `scripts/launch-inspector.js` in your editor
2. Find this section (around line 16):

```javascript
// 📝 TO CUSTOMIZE: Change the path below to match YOUR wp-sites.json location
const PROJECT_ROOT = resolve(__dirname, '..');
const DEFAULT_WP_SITES_PATH = resolve(PROJECT_ROOT, 'wp-sites.json');
```

3. Change `DEFAULT_WP_SITES_PATH` to your preferred path:

```javascript
// Example: Absolute path
const DEFAULT_WP_SITES_PATH = '/Users/yourname/my-wordpress-sites.json';

// Example: Relative to project root
const DEFAULT_WP_SITES_PATH = resolve(PROJECT_ROOT, 'config', 'sites.json');

// Example: Your home directory
const DEFAULT_WP_SITES_PATH = resolve(process.env.HOME, '.wp-mcp', 'sites.json');
```

4. Save the file
5. Run `pnpm inspector` - your custom path will now be pre-filled!

**Perfect for:** Team projects where everyone has the same structure, or your personal setup

---

## For Project Maintainers 🛠️

### Current Default Path

```javascript
const DEFAULT_WP_SITES_PATH = resolve(PROJECT_ROOT, 'wp-sites.json');
```

This resolves to: `/Users/deus/opus/mcp/claudeus-wp-mcp/wp-sites.json`

### Deus's Setup (Example)

```javascript
const DEFAULT_WP_SITES_PATH = '/Users/deus/opus/mcp/claudeus-wp-mcp/wp-sites.json';
```

### Distribution Consideration

When distributing this to other users:
- Keep the default as `resolve(PROJECT_ROOT, 'wp-sites.json')` ✅
- This makes it portable and relative to wherever they clone the repo
- Users can always customize via the UI or by editing the launcher script

---

## How It Works 🔍

The flow:

1. `pnpm inspector` runs `node scripts/launch-inspector.js`
2. Launcher reads `DEFAULT_WP_SITES_PATH`
3. Passes it to Inspector via `-e WP_SITES_PATH=<path>`
4. Inspector UI fetches the default and **pre-fills the field**
5. User can override it in the UI before connecting

**Key Benefits:**
- ✅ No manual typing every time
- ✅ Still flexible - can change in UI
- ✅ Portable for different team members
- ✅ Clean, simple architecture

---

## Troubleshooting

### Inspector doesn't show pre-filled value

**Check:** Is the launcher script being used?
```bash
# Should use launch-inspector.js, not directly call Inspector
grep "inspector" package.json
```

Should show:
```json
"inspector": "node scripts/launch-inspector.js"
```

### Wrong path appears

**Solution:** Edit `scripts/launch-inspector.js` and change `DEFAULT_WP_SITES_PATH`

### Want different defaults per environment

**Option:** Create multiple launcher scripts:
```json
{
  "scripts": {
    "inspector": "node scripts/launch-inspector.js",
    "inspector:prod": "node scripts/launch-inspector-prod.js",
    "inspector:test": "node scripts/launch-inspector-test.js"
  }
}
```

Each script can have different `DEFAULT_WP_SITES_PATH` values!

---

🤘 Rock on! Need help? Check the main README or reach out!

