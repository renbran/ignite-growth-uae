# Ignite Web Tools MCP Server

This custom MCP server exposes tools tailored for the Ignite Growth UAE web app.

Tools

- scaffoldReactComponent: Create a component in src/components following Tailwind + cn() conventions
- addRoute: Insert a React Router route into src/App.tsx
- runBunScript: Run Bun scripts (dev, build, preview, lint)
- auditFile: Check a file for design tokens and responsive classes
- modifyTailwindClasses: Replace Tailwind classes in a file

Setup

```bash
# From repo root
cd mcp/web-tools
bun install
bun run build
```

Configure in VS Code MCP
See .vscode/mcp.json; entry: ignite-web-tools -> node path-to-build/index.js

Usage

- In Copilot Chat Agent Mode, call tools by name (with parameters) once the server is detected.
- Alternatively, test via MCP Inspector:

```bash
npx -y @modelcontextprotocol/inspector node ./build/index.js
```

Notes

- Uses stdio transport; logs are sent to stderr.
- Ensure Bun is installed if using runBunScript.
