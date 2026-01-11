import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { promises as fs } from "node:fs";
import path from "node:path";
import { exec } from "node:child_process";

const server = new McpServer({ name: "ignite-web-tools", version: "0.1.0" });

// Helper: run shell command and capture output
function runCommand(cmd: string, cwd: string): Promise<{ stdout: string; stderr: string }>{
  return new Promise((resolve, reject) => {
    exec(cmd, { cwd, env: process.env }, (error, stdout, stderr) => {
      if (error) {
        resolve({ stdout, stderr: `${stderr}\n${error.message}` });
        return;
      }
      resolve({ stdout, stderr });
    });
  });
}

// Tool: scaffold a React TSX component following project conventions
server.registerTool(
  "scaffoldReactComponent",
  {
    title: "Scaffold React Component",
    description: "Create a component file under src/components using Tailwind tokens and cn() util.",
    inputSchema: {
      name: z.string().min(1).describe("PascalCase component name"),
      description: z.string().optional().describe("Short description for the component"),
      subdir: z.string().optional().describe("Optional subdirectory under src/components, e.g., 'sections'"),
    },
  },
  async ({ name, description, subdir }: { name: string; description?: string; subdir?: string }) => {
    const workspaceRoot = process.cwd();
    const targetDir = path.join(workspaceRoot, "src", "components", subdir ?? "");
    const targetFile = path.join(targetDir, `${name}.tsx`);

    const relImportUtils = "@/lib/utils"; // per project alias

    const tpl = `import { cn } from "${relImportUtils}";

interface ${name}Props {
  title: string;
  description?: string;
  className?: string;
}

const ${name} = ({ title, description, className }: ${name}Props) => {
  return (
    <section className={cn("min-h-[200px] p-6 bg-background text-foreground", className)} aria-label={title}>
      <h2 className="font-display text-2xl md:text-3xl text-gradient">{title}</h2>
      {description && (
        <p className="mt-2 text-foreground/80 max-w-prose">{description}</p>
      )}
    </section>
  );
};

export default ${name};
`;

    await fs.mkdir(targetDir, { recursive: true });
    await fs.writeFile(targetFile, tpl, "utf8");

    return { content: [{ type: "text", text: `Created ${path.relative(workspaceRoot, targetFile)}` }] };
  }
);

// Tool: add a route to src/App.tsx for a component/page
server.registerTool(
  "addRoute",
  {
    title: "Add React Router Route",
    description: "Insert a <Route> into src/App.tsx for the given path and component import.",
    inputSchema: {
      routePath: z.string().min(1).describe("URL path, e.g., '/about'"),
      importPath: z.string().min(1).describe("Module path to component, e.g., '@/pages/About'"),
      componentName: z.string().min(1).describe("Component name, e.g., 'About'"),
    },
  },
  async ({ routePath, importPath, componentName }: { routePath: string; importPath: string; componentName: string }) => {
    const workspaceRoot = process.cwd();
    const appFile = path.join(workspaceRoot, "src", "App.tsx");
    let src = await fs.readFile(appFile, "utf8");

    // Add import if missing
    const importStmt = `import ${componentName} from "${importPath}";`;
    if (!src.includes(importStmt)) {
      src = importStmt + "\n" + src;
    }

    // Insert Route before catch-all
    const routeLine = `<Route path="${routePath}" element={<${componentName} />} />`;
    src = src.replace(
      /(<Route\s+path=\"\*\"\s+element=\{<NotFound\s*\/>\}\s*\/\>)/,
      `${routeLine}\n$1`
    );

    await fs.writeFile(appFile, src, "utf8");
    return { content: [{ type: "text", text: `Added route ${routePath} in src/App.tsx` }] };
  }
);

// Tool: run Bun scripts (dev, build, preview, lint) and return output
server.registerTool(
  "runBunScript",
  {
    title: "Run Bun Script",
    description: "Execute 'bun run <script>' in the workspace and return output.",
    inputSchema: {
      script: z.enum(["dev", "build", "preview", "lint"]).describe("Script name from package.json"),
    },
  },
  async ({ script }: { script: "dev" | "build" | "preview" | "lint" }) => {
    const { stdout, stderr } = await runCommand(`bun run ${script}`, process.cwd());
    const output = [stdout.trim(), stderr.trim()].filter(Boolean).join("\n\n");
    return { content: [{ type: "text", text: output || `bun run ${script} completed.` }] };
  }
);

// Tool: audit a file for design token and responsiveness usage
server.registerTool(
  "auditFile",
  {
    title: "Audit File",
    description: "Check a source file for Tailwind responsiveness and design token usage.",
    inputSchema: {
      relPath: z.string().min(1).describe("Path relative to repo, e.g., 'src/components/Footer.tsx'"),
    },
  },
  async ({ relPath }: { relPath: string }) => {
    const filePath = path.join(process.cwd(), relPath);
    const content = await fs.readFile(filePath, "utf8");
    const hasTokens = /(bg-background|text-foreground|border-border|text-gradient)/.test(content);
    const hasResponsive = /(md:|lg:|xl:)/.test(content);
    const usesHex = /#[0-9a-fA-F]{3,6}/.test(content);
    const summary = [
      `Tokens: ${hasTokens ? "yes" : "no"}`,
      `Responsive classes: ${hasResponsive ? "yes" : "no"}`,
      `Raw hex colors present: ${usesHex ? "yes" : "no"}`,
    ].join("\n");
    return { content: [{ type: "text", text: summary }] };
  }
);

// Tool: modify Tailwind classes within a file (simple find/replace)
server.registerTool(
  "modifyTailwindClasses",
  {
    title: "Modify Tailwind Classes",
    description: "Replace occurrences of a Tailwind class string within a file.",
    inputSchema: {
      relPath: z.string().min(1),
      find: z.string().min(1),
      replace: z.string().min(1),
    },
  },
  async ({ relPath, find, replace }: { relPath: string; find: string; replace: string }) => {
    const filePath = path.join(process.cwd(), relPath);
    const content = await fs.readFile(filePath, "utf8");
    const updated = content.split(find).join(replace);
    await fs.writeFile(filePath, updated, "utf8");
    return { content: [{ type: "text", text: `Updated classes in ${relPath}` }] };
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Ignite Web Tools MCP server running (stdio)");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
