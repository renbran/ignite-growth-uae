# Frontend Review MCP - Setup Guide

## ✅ Installation Complete!

The `frontend-review-mcp` has been cloned and built successfully at:
```
d:\GitHub\webpages\ignite-growth-uae\frontend-review-mcp
```

## 🔧 What is This?

An MCP (Model Context Protocol) server that:
- ✅ Takes before/after screenshots of your UI changes
- ✅ Uses AI vision models to visually review edits
- ✅ Validates that changes match your requirements
- ✅ Provides detailed feedback if changes need adjustment
- ✅ Helps with intuitive and responsive animation development

## 📋 Setup Steps

### Step 1: Get a Hyperbolic API Key

You need a **Hyperbolic API key** to use the vision models for review:

1. Visit: https://console.hyperbolic.xyz/
2. Sign up or log in
3. Create an API key
4. Copy your API key

### Step 2: Configure for Cursor Editor

Edit your **`.cursor/mcp.json`** file:

```json
{
	"mcpServers": {
		"frontend-review": {
			"command": "node",
			"args": ["d:\\GitHub\\webpages\\ignite-growth-uae\\frontend-review-mcp\\build\\index.js"],
			"env": {
				"HYPERBOLIC_API_KEY": "your-api-key-here"
			}
		}
	}
}
```

**OR** use the global installation:

```bash
npx frontend-review-mcp HYPERBOLIC_API_KEY=your-api-key-here
```

### Step 3: Configure for Windsurf

Edit your **`~/.codeium/windsurf/mcp_config.json`** file:

```json
{
	"mcpServers": {
		"frontend-review": {
			"command": "node",
			"args": ["d:\\GitHub\\webpages\\ignite-growth-uae\\frontend-review-mcp\\build\\index.js"],
			"env": {
				"HYPERBOLIC_API_KEY": "your-api-key-here"
			}
		}
	}
}
```

## 🎯 How to Use for Frontend Development

### Workflow for Animation & Responsive Design Changes:

1. **Request a change** (to Copilot/Agent):
   > "Make the hero section fade in smoothly with a 0.5s animation"

2. **Agent takes before screenshot**:
   - Uses screenshot tool to save current state

3. **Agent makes the change**:
   - Updates component code with new animations

4. **Agent takes after screenshot**:
   - Saves new state for comparison

5. **Agent reviews the change**:
   - Calls `mcp_reviewEdit` with:
     - Before screenshot path
     - After screenshot path
     - Description of change

6. **AI vision model reviews**:
   - Compares before/after
   - Validates animation looks good
   - Responsive design works on all sizes
   - Returns "yes" (success) or "no" (feedback)

7. **Iterate if needed**:
   - If "no", agent gets specific feedback
   - Agent adjusts and repeats process
   - Continues until "yes"

## 🚀 Available Review Models

The MCP automatically tries these models in order:

1. **Qwen/Qwen2-VL-72B-Instruct** (Primary - most capable)
2. **Qwen/Qwen2-VL-7B-Instruct** (Fallback)
3. **meta-llama/Llama-3.2-90B-Vision-Instruct** (Fallback)
4. **mistralai/Pixtral-12B-2409** (Fallback)

**Custom model**: Use `MODEL` env variable to specify a different primary model.

## 📸 Recommended Screenshot Tool

Install the **browser-tools-mcp** for taking screenshots:

```bash
# Clone the browser tools MCP
git clone https://github.com/AgentDeskAI/browser-tools-mcp.git

# Or use it globally
npx browser-tools-mcp
```

## 💡 AI Prompt Instructions

Give Copilot/Agent these instructions for optimal workflow:

```markdown
For Frontend Development Tasks:

1. Before making changes:
   - Take a screenshot: `mcp_takeScreenshot`
   - Save screenshot path

2. After making changes:
   - Take another screenshot: `mcp_takeScreenshot`
   - Get paths of both screenshots

3. Review changes:
   - Call `mcp_reviewEdit` with:
     * beforeScreenshotPath: path to first screenshot
     * afterScreenshotPath: path to second screenshot
     * editRequest: brief 2-3 sentence description

4. Iterate:
   - If review returns "no", read feedback carefully
   - Make adjustments based on feedback
   - Repeat steps 2-3 until "yes"

5. Screenshots location:
   - Look in /screenshots folder
   - Use latest 2 screenshots for comparison
```

## ✨ Use Cases

### 1. Animation Development
```
Goal: Add fade-in animation to hero section
Process:
1. Screenshot current state
2. Add CSS/JS animations
3. Screenshot new state
4. Review: "Does the fade-in look smooth and professional?"
5. AI reviews and gives feedback
```

### 2. Responsive Design Fixes
```
Goal: Make navbar responsive on mobile
Process:
1. Screenshot desktop version
2. Update responsive styles
3. Screenshot mobile view
4. Review: "Does navbar look good and functional on mobile?"
5. AI validates responsive behavior
```

### 3. Interactive Elements
```
Goal: Improve button hover effects
Process:
1. Screenshot button normal state
2. Add hover animations
3. Screenshot button hover state
4. Review: "Do the hover effects look intuitive and responsive?"
5. AI confirms visual feedback is appropriate
```

### 4. Layout Changes
```
Goal: Reorganize section layout
Process:
1. Screenshot current layout
2. Restructure HTML/CSS
3. Screenshot new layout
4. Review: "Does the new layout improve user experience?"
5. AI validates layout works well
```

## 📚 Documentation

- **Full README**: See `frontend-review-mcp/README.md`
- **Source Code**: See `frontend-review-mcp/src/`
- **Built Output**: See `frontend-review-mcp/build/index.js`

## 🔗 Project Integration

The MCP is now available for use with your ignite-growth-uae project:

**Current Setup**:
- ✅ Cloned to: `frontend-review-mcp/`
- ✅ Installed dependencies
- ✅ Built successfully
- ✅ Ready to configure with API key

**Next Steps**:
1. Get Hyperbolic API key
2. Add to your editor config (Cursor or Windsurf)
3. Install browser-tools-mcp for screenshots
4. Start using for frontend reviews!

## 🎓 Benefits for Your Project

### For SGC TECH AI Website:
- ✅ Validate animation quality during development
- ✅ Ensure responsive design across all devices
- ✅ Visual verification of UI changes
- ✅ Faster iteration with automated feedback
- ✅ Better consistency in design implementation

### Specifically for News Carousel:
- You can now use this to validate:
  - Smooth auto-rotation animation
  - Responsive layout on mobile/tablet/desktop
  - Navigation controls functionality
  - Category badge styling
  - Hover effects and interactions

## 🚀 Quick Start

```bash
# 1. Get API key from https://console.hyperbolic.xyz/

# 2. Set in environment
export HYPERBOLIC_API_KEY=your-key-here

# 3. Test the MCP
node frontend-review-mcp/build/index.js

# 4. Use with Cursor/Windsurf
# Add to your editor config with the API key
```

## ❓ FAQ

**Q: Do I need screenshots taken automatically?**
A: You'll need a screenshot tool like browser-tools-mcp to automate this.

**Q: Can I use this offline?**
A: No, it requires the Hyperbolic API for the vision models.

**Q: What formats do screenshots need to be?**
A: PNG format works best. The tool expects paths to PNG files.

**Q: Can I customize the review prompt?**
A: Currently no, but you can describe in detail what you want reviewed.

**Q: How much does Hyperbolic cost?**
A: Check their pricing at https://console.hyperbolic.xyz/ (Often has free tier)

## 📞 Support

- **MCP Repository**: https://github.com/zueai/frontend-review-mcp
- **Hyperbolic Docs**: https://docs.hyperbolic.xyz/
- **Browser Tools MCP**: https://github.com/AgentDeskAI/browser-tools-mcp

## ✅ Status

- ✅ MCP Cloned
- ✅ Dependencies Installed
- ✅ Built Successfully
- ⏳ Ready for API Key Configuration
- ⏳ Ready to Enable in Editor

---

**Next**: Get your Hyperbolic API key and configure your editor! 🚀
