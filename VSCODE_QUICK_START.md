# VS Code MCP Integration - Quick Reference

## 🚀 Get Started in 30 Seconds

### 1️⃣ Get API Key
```
https://console.hyperbolic.xyz/ → Create API key
```

### 2️⃣ Set Environment Variable (Windows)
```powershell
$env:HYPERBOLIC_API_KEY = "your-api-key-here"
```

### 3️⃣ Open VS Code
```bash
code .
```

### 4️⃣ Run Tasks
```
Ctrl + Shift + P → "Tasks: Run Task"

Select one:
  • Frontend: Dev Server       (Vite on localhost:5173)
  • MCP Server: Start          (AI review tool)
  • Dev: Frontend + MCP        (Both together)
```

---

## 📋 All Commands

| Task | Command | Effect |
|------|---------|--------|
| Dev Frontend | `Frontend: Dev Server` | http://localhost:5173 with hot reload |
| Start MCP | `MCP Server: Start` | Enables AI visual reviews |
| Both Together | `Dev: Frontend + MCP` | Run dev server + MCP in parallel |
| Build Prod | `Frontend: Build` | Creates `dist/` folder |
| Preview Build | `Frontend: Preview` | Test production build locally |

---

## 🐛 Debug

Press `F5` and select:
- `Frontend - Development` - Debug React in Chrome
- `MCP Server - Debug` - Debug MCP TypeScript
- `Full Stack - Frontend + MCP` - Debug both

---

## 📁 What Was Created

```
.vscode/
├── settings.json      (40+ workspace settings)
├── extensions.json    (50+ extension recommendations)
├── launch.json        (5 debug configurations)
├── tasks.json         (5 build/run tasks)
└── mcp.json          (MCP server registration)
```

---

## ⚡ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl + ~` | Toggle terminal |
| `Ctrl + Shift + B` | Run default build task |
| `Ctrl + Shift + D` | Open Debug view |
| `F5` | Start debugger |
| `Ctrl + Shift + P` | Command palette |

---

## 🔑 Environment Variables

### Set Temporarily (Current Session)
```powershell
$env:HYPERBOLIC_API_KEY = "sk-..."
```

### Set Permanently (Windows)
1. `Win + R` → `sysdm.cpl`
2. "Environment Variables"
3. New → `HYPERBOLIC_API_KEY` = `your-key`
4. Restart VS Code

---

## ✅ Verification

```bash
# Check MCP is built
ls -lh frontend-review-mcp/build/index.js
# Should show ~3.4 KB file

# Verify environment variable is set
echo $env:HYPERBOLIC_API_KEY
# Should show your API key (not empty)

# Test dev server
bun run dev
# Should show "VITE ready in XXX ms"
```

---

## 🎯 Next: Use MCP for Reviews

After MCP server is running, you can:

1. Make a UI change in `src/components/`
2. Save file (auto-reload in browser)
3. Take screenshot of the change
4. Use MCP to analyze and provide feedback

```bash
# Example: Review a component
mcp-client review-screenshot "path/to/screenshot.png"
```

See [MCP Workflow Guide](./FRONTEND_REVIEW_MCP_WORKFLOW.md) for detailed instructions.

---

## 📞 Troubleshooting

| Issue | Solution |
|-------|----------|
| Tasks don't show | `Ctrl + Shift + P` → Reload Window |
| Can't find `bun` | Install globally: `curl -fsSL https://bun.sh/install \| bash` |
| API key not found | Check environment variables: `echo $env:HYPERBOLIC_API_KEY` |
| MCP won't start | Rebuild it: `cd frontend-review-mcp && bun run build` |

---

## 📚 Full Guides

- **[VSCODE_MCP_SETUP_COMPLETE.md](./VSCODE_MCP_SETUP_COMPLETE.md)** - Complete setup guide
- **[FRONTEND_REVIEW_MCP_SETUP.md](./FRONTEND_REVIEW_MCP_SETUP.md)** - MCP detailed setup
- **[FRONTEND_REVIEW_MCP_WORKFLOW.md](./FRONTEND_REVIEW_MCP_WORKFLOW.md)** - How to use MCP
- **[NEWS_CAROUSEL_QUICK_START.md](./NEWS_CAROUSEL_QUICK_START.md)** - Carousel component

---

**Status**: ✅ Ready to Code!
