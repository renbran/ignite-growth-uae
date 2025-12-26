# VS Code MCP Integration Setup ✅

## 🎯 What's Been Configured

Three configuration files have been created to enable full MCP integration in VS Code:

### 1. **`.vscode/settings.json`** - Workspace Settings
- 40+ settings for code formatting, linting, and editor behavior
- ESLint integration for code quality
- Prettier auto-formatting on save
- TypeScript strict mode enabled
- Git & file exclusions configured

### 2. **`.vscode/extensions.json`** - Extension Recommendations
- 50+ recommended extensions for the team
- GitHub Copilot & Chat
- ESLint, Tailwind CSS, PostCSS
- Git utilities and debugging tools
- Automatically suggested when project is opened

### 3. **`.vscode/launch.json`** - Debug Configurations
- **Frontend - Development**: Debug React app in Chrome
- **Frontend - Debug Vite**: Debug build tool
- **MCP Server - Debug**: Debug the MCP server directly
- **Full Stack Compound**: Run both frontend & MCP together

### 4. **`.vscode/tasks.json`** - Build & Run Tasks
- **Frontend: Dev Server** - Run Vite dev server (hot reload)
- **MCP Server: Start** - Run MCP server for visual reviews
- **Frontend: Build** - Production build
- **Frontend: Preview** - Preview production build
- **Dev: Frontend + MCP** - Run both services together

### 5. **`.vscode/mcp.json`** - MCP Server Configuration
- Registers frontend-review MCP server with VS Code
- Points to compiled MCP binary
- Sets up environment variables for API key
- Auto-start disabled (manual start recommended)

---

## 🚀 Quick Start

### Step 1: Get Hyperbolic API Key
```bash
# Visit: https://console.hyperbolic.xyz/
# Create account → Get API key
```

### Step 2: Add API Key to Environment
**Option A - Temporary (for current session)**:
```powershell
$env:HYPERBOLIC_API_KEY = "your-api-key-here"
```

**Option B - Permanent (recommended)**:
Add to your user environment variables:
1. Press `Win + R` → Type `sysdm.cpl`
2. Click "Environment Variables"
3. Click "New" under User variables
4. Variable name: `HYPERBOLIC_API_KEY`
5. Variable value: `your-actual-key-here`
6. Click OK, restart VS Code

### Step 3: Open VS Code
```bash
code .
```

### Step 4: Run Tasks
**Press `Ctrl + Shift + D` (Debug)** or:

**Terminal → Run Task** → Select:
- `Frontend: Dev Server` - Start dev environment
- `MCP Server: Start` - Start AI review tool
- `Dev: Frontend + MCP` - Run both together

---

## 📋 Available Tasks

### Run Frontend Development
```bash
# Via Task Runner (Ctrl + Shift + B)
Frontend: Dev Server

# Via Terminal
bun run dev
```
Opens http://localhost:5173 with hot reload

### Run MCP Server
```bash
# Via Task Runner
MCP Server: Start

# Via Terminal
node frontend-review-mcp/build/index.js
```

### Run Both Together
```bash
# Via Task Runner
Dev: Frontend + MCP

# Both apps run in shared terminal with separate output panels
```

### Build for Production
```bash
# Via Task Runner (default build task Ctrl + Shift + B)
Frontend: Build

# Via Terminal
bun run build
```

---

## 🐛 Debug Configuration

### Debug React in Chrome
1. Press `F5` (or **Debug → Start Debugging**)
2. Select "Frontend - Development"
3. Sets breakpoints in React components
4. Chrome opens automatically at http://localhost:5173

### Debug MCP Server
1. Press `F5`
2. Select "MCP Server - Debug"
3. Sets breakpoints in MCP code (`frontend-review-mcp/src/**`)
4. Useful for testing vision model integration

### Debug Full Stack
1. Press `F5`
2. Select "Full Stack - Frontend + MCP"
3. Both environments start with debugging enabled

---

## 🔧 Environment Variables

### Required for MCP
```bash
HYPERBOLIC_API_KEY=your-api-key-from-https://console.hyperbolic.xyz/
```

### Automatic Detection
VS Code automatically reads from:
1. User environment variables (Windows)
2. `.env` files in workspace root
3. `.env.local` files (not committed)

---

## 📁 Task Output

When running tasks via **Terminal → Run Task**:

**Frontend: Dev Server** output panel:
```
> bun run dev

  VITE v6.0.0  ready in 234 ms

  ➜  Local:   http://localhost:5173/
  ➜  press h + enter to show help
```

**MCP Server: Start** output panel:
```
[MCP Server]
Server listening on stdio
Visual review service initialized
Ready to process screenshots
```

---

## ⚠️ Troubleshooting

### "Command 'bun' not found"
```bash
# Install bun globally
curl -fsSL https://bun.sh/install | bash
```

### "HYPERBOLIC_API_KEY is undefined"
```bash
# Set environment variable
$env:HYPERBOLIC_API_KEY = "your-key"

# OR permanently add to Windows environment variables
# (see Step 2 above)
```

### MCP not connecting
```bash
# Verify MCP is built
cd frontend-review-mcp
bun run build

# Check output exists
ls -lh build/index.js  # Should be ~3.4 KB
```

### Tasks don't appear
```bash
# Reload VS Code
Ctrl + Shift + P → "Developer: Reload Window"
```

---

## 🎯 Next Steps

1. ✅ Get Hyperbolic API key from https://console.hyperbolic.xyz/
2. ✅ Add `HYPERBOLIC_API_KEY` to environment variables
3. ✅ Run `Frontend: Dev Server` task to start dev environment
4. ✅ Run `MCP Server: Start` to enable visual reviews
5. ✅ Make a frontend change and request AI visual review via MCP

---

## 📚 Related Documentation

- [MCP Setup Guide](./FRONTEND_REVIEW_MCP_SETUP.md) - Detailed MCP configuration
- [MCP Workflow](./FRONTEND_REVIEW_MCP_WORKFLOW.md) - How to use MCP for reviews
- [News Carousel](./NEWS_CAROUSEL_QUICK_START.md) - Carousel component setup
- [Project README](./README.md) - Overall project structure

---

## ✨ Features Enabled

✅ **Hot Module Replacement (HMR)** - Instant code refresh in browser
✅ **Source Maps** - Debug compiled code as if it's source
✅ **TypeScript Support** - Full type checking in IDE
✅ **ESLint Integration** - Real-time linting feedback
✅ **Git Integration** - Commit, push, pull from VS Code
✅ **AI Visual Reviews** - MCP-powered screenshot analysis
✅ **Compound Debugging** - Run multiple processes together
✅ **Task Automation** - Pre-configured build/run workflows

---

## 🎓 VS Code Tips

### Keyboard Shortcuts
- `Ctrl + ~` - Toggle integrated terminal
- `Ctrl + J` - Toggle terminal panel
- `Ctrl + B` - Toggle sidebar
- `Ctrl + Shift + D` - Go to Debug view
- `Ctrl + Shift + B` - Run default build task
- `Ctrl + Shift + P` - Command palette

### Useful Commands
```bash
# Show all configured tasks
Ctrl + Shift + P → "Tasks: Run Task"

# Start debugger with last configuration
F5

# Create launch configuration
Ctrl + Shift + P → "Debug: Create Launch Configuration"

# Show problems
Ctrl + Shift + M
```

---

## 📞 Support

For issues or questions:
1. Check `.vscode/` folder configuration files
2. Review task output in Terminal panel
3. Check environment variables are set correctly
4. Consult MCP workflow documentation
5. Verify all dependencies installed: `bun install && cd frontend-review-mcp && bun install`

---

**Status**: ✅ Complete - Ready for AI-powered frontend development!

*Last Updated: 2025*
