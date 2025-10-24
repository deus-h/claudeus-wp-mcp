# Security Policy

## 🔒 Enterprise-Grade Security for WordPress Management

Claudeus WordPress MCP implements multiple layers of security to protect your WordPress sites, data, and credentials. With 145 tools accessing critical site functions, security is our top priority.

---

## 📋 Table of Contents

1. [Security Architecture](#security-architecture)
2. [Authentication & Authorization](#authentication--authorization)
3. [Data Protection](#data-protection)
4. [Input Validation](#input-validation)
5. [Tool Danger Levels](#tool-danger-levels)
6. [Best Practices](#best-practices)
7. [Reporting Vulnerabilities](#reporting-vulnerabilities)
8. [Security Updates](#security-updates)

---

## 🏗️ Security Architecture

### Multi-Layer Protection

```
╔═══════════════════════════════════════════════════════╗
║         🔒 SECURITY LAYERS 🔒                        ║
╚═══════════════════════════════════════════════════════╝

Layer 1: Transport Security (TLS/SSL)
   ↓
Layer 2: Authentication (App Passwords/JWT)
   ↓
Layer 3: Input Validation (Schema Validation)
   ↓
Layer 4: Authorization (WordPress Capabilities)
   ↓
Layer 5: Output Sanitization (XSS Prevention)
   ↓
Layer 6: Audit Logging (Activity Tracking)
```

### Security Components

| Component | Implementation | Purpose |
|-----------|---------------|---------|
| **Transport** | HTTPS/TLS 1.2+ | Encrypted communication |
| **Authentication** | WordPress App Passwords, JWT | Secure API access |
| **Validation** | JSON Schema + TypeScript | Input verification |
| **Sanitization** | WordPress sanitize functions | Output protection |
| **Authorization** | WordPress Capabilities | Permission checks |
| **Audit** | Logging framework | Activity tracking |

---

## 🔐 Authentication & Authorization

### Supported Authentication Methods

#### 1. Application Passwords (Recommended)

**Security Features:**
- ✅ No actual password exposure
- ✅ Revocable without affecting main account
- ✅ Scoped to REST API only
- ✅ Generates unique tokens per application

**Setup:**
```json
{
  "your-site": {
    "URL": "https://your-site.com",
    "USER": "admin",
    "PASS": "xxxx xxxx xxxx xxxx xxxx xxxx",
    "authType": "basic"
  }
}
```

**Getting Application Passwords:**
1. WordPress Admin → Users → Profile
2. Scroll to "Application Passwords"
3. Enter name (e.g., "Claude MCP")
4. Click "Add New"
5. Copy generated password
6. Use in `wp-sites.json`

**Security Notes:**
- ⚠️ Store `wp-sites.json` securely
- ⚠️ Never commit to version control
- ⚠️ Use file permissions (chmod 600)
- ⚠️ Rotate passwords regularly

#### 2. JWT Authentication

**Security Features:**
- ✅ Token-based authentication
- ✅ Time-limited tokens
- ✅ Stateless authentication

**Setup:**
```json
{
  "your-site": {
    "URL": "https://your-site.com",
    "USER": "admin",
    "PASS": "your-jwt-token",
    "authType": "jwt"
  }
}
```

### WordPress Capability Checks

All tools respect WordPress user capabilities:

| Tool Category | Required Capability |
|--------------|-------------------|
| Posts | `edit_posts`, `delete_posts` |
| Pages | `edit_pages`, `delete_pages` |
| Media | `upload_files`, `delete_files` |
| Users | `edit_users`, `delete_users` |
| Plugins | `install_plugins`, `activate_plugins` |
| Themes | `switch_themes`, `edit_themes` |
| Settings | `manage_options` |

**If a user lacks required capabilities, operations will fail with proper error messages.**

---

## 🛡️ Data Protection

### Credential Security

#### File System Security
```bash
# Secure wp-sites.json permissions
chmod 600 wp-sites.json
chown $USER:$USER wp-sites.json

# Never expose in public directories
# Never commit to git
echo "wp-sites.json" >> .gitignore
```

#### Environment Variables
```bash
# Alternative: Use environment variables
export WP_SITES_PATH="/secure/path/to/wp-sites.json"
```

### Data Encryption

| Data Type | Encryption Method | Usage |
|-----------|------------------|-------|
| **In Transit** | TLS 1.2+ | All API calls |
| **At Rest** | File system encryption | Credential storage |
| **Passwords** | Never logged | Security policy |

### Sensitive Data Handling

**What We Never Log:**
- ❌ Passwords or tokens
- ❌ Full user objects (only IDs)
- ❌ Payment information
- ❌ Personal user data

**What We Log:**
- ✅ Tool execution (names only)
- ✅ Errors (sanitized)
- ✅ Performance metrics
- ✅ API response codes

---

## ✅ Input Validation

### Schema Validation

Every tool input is validated against strict JSON schemas:

```typescript
// Example: Post creation validation
{
  "type": "object",
  "required": ["title", "content"],
  "properties": {
    "title": {
      "type": "string",
      "minLength": 1,
      "maxLength": 200
    },
    "content": {
      "type": "string",
      "minLength": 1
    },
    "status": {
      "type": "string",
      "enum": ["publish", "draft", "pending", "private"]
    }
  }
}
```

### Type Safety

**TypeScript Strict Mode:**
- ✅ No implicit any
- ✅ Strict null checks
- ✅ Strict property initialization
- ✅ No unused locals/parameters

### SQL Injection Prevention

**WordPress Handles:**
- ✅ Prepared statements
- ✅ Parameterized queries
- ✅ Input escaping

**Our Layer:**
- ✅ Type validation
- ✅ Schema enforcement
- ✅ Whitelist validation

### XSS Prevention

**Output Sanitization:**
```typescript
// All data sanitized before output
- HTML entities encoded
- Script tags stripped
- Attributes sanitized
- URLs validated
```

---

## ⚠️ Tool Danger Levels

Understanding tool risk levels helps you use them safely:

### 🟢 Safe (Read-Only Operations)

**No data modification, minimal risk**

| Tool | Description |
|------|-------------|
| `get_posts` | List posts |
| `get_users` | List users |
| `get_media` | List media |
| `get_settings` | View settings |
| `test_https` | Run health checks |

**Safe to use in production without backup**

### 🟡 Moderate (Content Modification)

**Creates or modifies content, reversible**

| Tool | Description | Mitigation |
|------|-------------|-----------|
| `create_post` | Creates posts | Can be deleted |
| `update_post` | Modifies posts | Has revisions |
| `upload_media` | Uploads files | Can be removed |
| `create_user` | Creates users | Can be deleted |

**Test in staging, have rollback plan**

### 🔴 High (Destructive Operations)

**Permanent changes or system-wide impact**

| Tool | Description | Risk |
|------|-------------|------|
| `delete_post` | Deletes posts | Permanent data loss |
| `delete_user` | Removes users | Loses user data |
| `delete_media` | Removes files | Breaks content |
| `delete_plugin` | Removes plugins | Breaks functionality |
| `activate_theme` | Switches themes | Changes site appearance |

**⚠️ ALWAYS backup before using destructive tools!**

### Tool Safety Matrix

```
╔═══════════════════════════════════════════════════════╗
║            TOOL SAFETY GUIDELINES                     ║
╚═══════════════════════════════════════════════════════╝

🟢 Safe:        Use freely, no backup needed
🟡 Moderate:    Test first, have backup ready
🔴 High:        ALWAYS backup, use staging first

Content Tools:
  - get_*       🟢 Safe
  - create_*    🟡 Moderate
  - update_*    🟡 Moderate  
  - delete_*    🔴 High

System Tools:
  - list_*      🟢 Safe
  - activate_*  🔴 High
  - delete_*    🔴 High

Health Tools:
  - test_*      🟢 Safe
  - run_all_*   🟢 Safe
```

---

## 🎯 Best Practices

### 1. Credential Management

✅ **DO:**
- Use application passwords (not main password)
- Store credentials in secure location
- Set restrictive file permissions (600)
- Use different passwords per environment
- Rotate passwords regularly

❌ **DON'T:**
- Commit credentials to git
- Share passwords in plain text
- Use same password across sites
- Store in public directories
- Log or print credentials

### 2. Environment Separation

```json
{
  "production": {
    "URL": "https://live-site.com",
    "USER": "prod-admin",
    "PASS": "prod-password"
  },
  "staging": {
    "URL": "https://staging-site.com",
    "USER": "stage-admin",
    "PASS": "stage-password"
  },
  "development": {
    "URL": "https://dev-site.com",
    "USER": "dev-admin",
    "PASS": "dev-password"
  }
}
```

**Workflow:**
1. Test in development first
2. Verify in staging
3. Deploy to production with caution

### 3. Backup Strategy

**Before Using Destructive Tools:**

```bash
# Database backup
wp db export backup-$(date +%Y%m%d).sql

# Files backup
tar -czf backup-$(date +%Y%m%d).tar.gz wp-content/

# Or use WordPress backup plugin
```

**Backup Schedule:**
- Daily: Automated backups
- Before bulk operations: Manual backup
- Before delete operations: Manual backup
- Before major updates: Manual backup

### 4. Access Control

**Principle of Least Privilege:**

| User Role | Allowed Tools |
|-----------|--------------|
| Administrator | All tools (with caution) |
| Editor | Content tools only |
| Author | Own content only |
| Contributor | Create/edit only |

**Implementation:**
- Use role-specific application passwords
- Grant minimum required capabilities
- Revoke access when not needed
- Monitor user activity

### 5. Monitoring & Auditing

**What to Monitor:**
- ✅ Failed authentication attempts
- ✅ Bulk operations execution
- ✅ Destructive tool usage
- ✅ Error rates
- ✅ API usage patterns

**Logging Recommendations:**
```bash
# Enable WordPress debug logging (in wp-config.php)
define('WP_DEBUG', true);
define('WP_DEBUG_LOG', true);
define('WP_DEBUG_DISPLAY', false);

# Monitor logs
tail -f wp-content/debug.log
```

---

## 🚨 Reporting Vulnerabilities

### ⚠️ PRIVATE REPOSITORY - INTERNAL USE ONLY

This repository is for SimHop IT & Media AB team use only.

### For Team Members

**If you discover a security vulnerability:**

1. **DO NOT** create a public issue
2. **DO NOT** commit fixes before clearance
3. **DO** document with reproduction steps
4. **DO** contact security team immediately

**Contact:**
- 📧 **Email**: security@simhop.se
- 📱 **Emergency**: +46-76-427-1243 (Amadeus)
- 🔒 **Encrypted**: Use PGP key from security@simhop.se

### Security Issue Template

```markdown
**Vulnerability Type:** [SQLi/XSS/Auth/etc]
**Severity:** [Critical/High/Medium/Low]
**Affected Component:** [API/Tool/Module]
**WordPress Version:** [5.x, 6.x]
**MCP Version:** [2.x.x]

**Description:**
[Detailed description]

**Reproduction Steps:**
1. Step 1
2. Step 2
3. Step 3

**Impact:**
[What can an attacker do?]

**Mitigation:**
[Temporary workaround if any]

**Proof of Concept:**
[Code/screenshots if applicable]
```

---

## 🔄 Security Updates

### Update Policy

**Security updates are handled internally by SimHop IT & Media AB.**

**Update Priority:**

| Severity | Response Time | Deployment |
|----------|--------------|------------|
| **Critical** | < 24 hours | Immediate |
| **High** | < 72 hours | Next release |
| **Medium** | < 1 week | Next release |
| **Low** | < 1 month | Scheduled |

### Staying Secure

**For Users:**
1. Keep MCP updated to latest version
2. Use latest WordPress version
3. Update application passwords regularly
4. Monitor WordPress security advisories
5. Follow security best practices

**Update Command:**
```bash
# Update to latest version
npm update -g claudeus-wp-mcp

# Or with pnpm
pnpm update -g claudeus-wp-mcp

# Verify version
claudeus-wp-mcp --version
```

---

## 🛡️ Additional Security Resources

### WordPress Security

- [WordPress Security Docs](https://wordpress.org/support/article/hardening-wordpress/)
- [WordPress Security Plugin](https://wordpress.org/plugins/wordfence/)
- [Application Passwords Guide](https://make.wordpress.org/core/2020/11/05/application-passwords-integration-guide/)

### MCP Security

- [MCP Specification](https://github.com/modelcontextprotocol/specification)
- [Security Best Practices](https://github.com/modelcontextprotocol/docs)

### General Security

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [REST API Security](https://restfulapi.net/security-essentials/)

---

## 📝 Security Checklist

Before going to production:

- [ ] Application passwords configured (not main passwords)
- [ ] `wp-sites.json` has 600 permissions
- [ ] `wp-sites.json` not in version control
- [ ] Using HTTPS for all sites
- [ ] Separate credentials per environment
- [ ] Backup strategy in place
- [ ] Monitoring configured
- [ ] Team trained on tool danger levels
- [ ] Tested all workflows in staging
- [ ] WordPress at latest version
- [ ] MCP at latest version

---

## 🔗 Quick Reference

| Task | Command/Action |
|------|---------------|
| Secure credentials | `chmod 600 wp-sites.json` |
| Check permissions | `ls -la wp-sites.json` |
| Backup database | `wp db export backup.sql` |
| View logs | `tail -f wp-content/debug.log` |
| Update MCP | `npm update -g claudeus-wp-mcp` |
| Report vulnerability | security@simhop.se |

---

## ⚖️ Disclaimer

While Claudeus WordPress MCP implements comprehensive security measures, **you are ultimately responsible for:**

- Securing your credentials
- Implementing proper access controls
- Maintaining backups
- Testing in non-production environments
- Monitoring for security issues
- Following WordPress security best practices

**Use destructive tools with extreme caution. Always have backups.**

---

> 🔒 **Security is not a feature, it's a foundation.** Every one of our 145 tools is built with security first.

Made with 🤘🔒 by SimHop IT & Media AB
