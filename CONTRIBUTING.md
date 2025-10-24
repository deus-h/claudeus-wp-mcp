# Contributing to Claudeus WordPress MCP

Thank you for your interest in contributing to the most comprehensive WordPress MCP server! 🎸

## 🎯 Ways to Contribute

### 1. Report Bugs
Found a bug? Please [open an issue](https://github.com/deus-h/claudeus-wp-mcp/issues) with:
- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Your environment (Node version, OS, WordPress version)

### 2. Suggest Features
Have ideas for new tools or improvements?
- Check [existing issues](https://github.com/deus-h/claudeus-wp-mcp/issues) first
- Open a feature request with clear use case
- Explain why it would benefit the community

### 3. Submit Pull Requests
Ready to code? Awesome! Here's how:

#### Getting Started
```bash
# Fork and clone the repository
git clone https://github.com/YOUR-USERNAME/claudeus-wp-mcp.git
cd claudeus-wp-mcp

# Install dependencies
pnpm install

# Create a feature branch
git checkout -b feature/your-feature-name
```

#### Development Workflow
```bash
# Build TypeScript
pnpm build

# Run linter
pnpm lint

# Fix linting issues
pnpm lint:fix

# Run tests
pnpm test

# Test with MCP Inspector
pnpm inspector
```

#### Code Standards
- ✅ Write TypeScript with strict mode
- ✅ Follow existing code structure (modular architecture)
- ✅ Add JSDoc comments for public APIs
- ✅ Include error handling
- ✅ Test your changes with real WordPress sites
- ✅ Update documentation if needed

#### Pull Request Process
1. **Update tests** - Add tests for new features
2. **Update docs** - Update README.md if you add tools
3. **Run linter** - Ensure `pnpm lint` passes
4. **Build successfully** - `pnpm build` must complete
5. **Commit message** - Use conventional commits:
   - `feat: add new tool for widget management`
   - `fix: resolve pagination issue in users API`
   - `docs: update security guide`
   - `refactor: improve error handling in base client`

6. **Submit PR** with:
   - Clear title and description
   - Link to related issue (if any)
   - Screenshots/examples if UI changes

### 4. Improve Documentation
Documentation is crucial! Help us improve:
- Fix typos or unclear instructions
- Add examples and use cases
- Translate documentation
- Create video tutorials

### 5. Test & Provide Feedback
- Test the MCP server with different WordPress setups
- Try different themes and plugins
- Report compatibility issues
- Share your use cases

## 🏗️ Architecture Overview

Understanding the codebase structure:

```
src/
├── api/          # API clients for WordPress REST API
├── tools/        # Tool definitions by category
│   ├── content/  # Posts, pages, blocks, media
│   ├── taxonomy/ # Categories, tags, custom taxonomies
│   ├── user/     # User management
│   ├── comment/  # Comment management
│   ├── menu/     # Menu management
│   ├── astra/    # Astra theme integration
│   └── ...
├── handlers/     # Request handlers (tools, resources, prompts)
├── types/        # TypeScript type definitions
├── security/     # Security & validation layers
└── utils/        # Helper utilities
```

## 🧪 Testing Guidelines

### Test Your Changes
```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Generate coverage report
pnpm test:coverage
```

### Manual Testing
1. Set up test WordPress site
2. Configure `wp-sites.json`
3. Run MCP Inspector: `pnpm inspector`
4. Test your new tool/feature
5. Verify error handling

## 🔒 Security Considerations

When adding new tools:
- ✅ Validate all input parameters
- ✅ Use proper WordPress capabilities
- ✅ Sanitize user input
- ✅ Escape output data
- ✅ Document dangerous operations
- ✅ Add to appropriate danger level in SECURITY.md

## 📝 Adding New Tools

### Step-by-Step Guide

1. **Create Tool Definition**
   ```typescript
   // src/tools/your-category/index.ts
   export const yourTools: Tool[] = [
     {
       name: 'claudeus_wp_category__action',
       description: 'Clear description of what it does',
       inputSchema: {
         type: 'object',
         required: ['site', 'requiredParam'],
         properties: {
           site: SITE_PARAM,
           requiredParam: { type: 'string', description: '...' }
         }
       }
     }
   ];
   ```

2. **Create Handler**
   ```typescript
   // src/tools/your-category/handlers.ts
   export async function handleYourTools(
     name: string,
     args: Record<string, unknown>,
     client: YourApiClient
   ) {
     switch (name) {
       case 'claudeus_wp_category__action':
         const result = await client.yourMethod(args.param);
         return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
     }
   }
   ```

3. **Add API Client** (if needed)
   ```typescript
   // src/api/your-client.ts
   export class YourApiClient extends BaseApiClient {
     async yourMethod(param: string): Promise<Result> {
       return this.get<Result>(`/your-endpoint/${param}`);
     }
   }
   ```

4. **Update Documentation**
   - Add tool to README.md
   - Add to appropriate danger level in SECURITY.md
   - Update CHANGELOG.md

## 🌟 Recognition

Contributors will be:
- Listed in CHANGELOG.md for their contributions
- Mentioned in release notes
- Part of building the most comprehensive WordPress MCP!

## 📞 Contact

- **Maintainer**: Amadeus Samiel H.
- **Email**: deus.h@outlook.com
- **Website**: https://deusware.se
- **Issues**: https://github.com/deus-h/claudeus-wp-mcp/issues

## 📜 Code of Conduct

### Be Respectful
- Treat all contributors with respect
- Welcome newcomers
- Be patient with questions
- Provide constructive feedback

### Be Professional
- Keep discussions on topic
- No spam or self-promotion
- No harassment or discrimination
- Follow GitHub's Terms of Service

## 🎸 Let's Rock!

Thank you for contributing to making WordPress + AI integration awesome!

Every contribution, no matter how small, makes a difference. \m/

---

**Questions?** Don't hesitate to ask in issues or discussions!
