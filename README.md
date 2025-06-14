# MCP Hub Multilingual Demo Site

Interactive demonstration platform for Model Context Protocol (MCP) with educational content and tutorial generation.

## 📁 Project Structure

```
├── public/           # Web assets and generated content
│   ├── index.html   # Main demo site
│   ├── videos/      # Generated tutorial videos
│   └── *.html       # Other HTML files
├── src/             # Source code
│   └── *.js         # JavaScript modules and tests
├── tests/           # Playwright test suites
│   └── *.spec.js    # Test specifications
├── docs/            # Documentation
│   ├── agent/       # Agent coordination and rules
│   ├── content/     # Educational content and scripts
│   ├── development/ # Development process docs
│   └── guides/      # User guides and best practices
├── reports/         # Agent reports and deliverables
└── node_modules/    # Dependencies
```

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Generate tutorial videos
npm run tutorials

# Serve locally (requires static server)
npx serve public -p 3000
```

## 📖 Key Documents

- **[CLAUDE.md](CLAUDE.md)** - Project instructions and workflow
- **[projectplan.md](projectplan.md)** - Current development plan
- **[docs/agent/](docs/agent/)** - Agent coordination system
- **[docs/content/](docs/content/)** - Educational content library

## 🎬 Tutorial Generation

Automated video tutorials are generated using Playwright:
- **Input:** Interactive demo interactions
- **Output:** WebM videos in `public/videos/`
- **Quality:** 720p, optimized for web delivery

## 🌍 Multilingual Support

Content available in:
- 🇺🇸 English (EN)
- 🇩🇰 Danish (DA) 
- 🇩🇪 German (DE)
- 🇪🇸 Spanish (ES)