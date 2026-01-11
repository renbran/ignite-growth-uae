# SGC TECH AI / Ignite Growth UAE - Copilot Instructions

**Project**: AI-powered business transformation website  
**Tech Stack**: React 18 + TypeScript + Vite + Tailwind CSS + shadcn/ui + Supabase  
**Package Manager**: Bun  
**Project Type**: Single-page application (SPA) with component-based architecture

---

## 🎯 Project Overview

This is a modern, high-performance marketing website for SGC TECH AI (by Scholarix Global), showcasing AI-native enterprise transformation solutions. The site emphasizes speed, visual impact, and conversion optimization with a cyberpunk-meets-corporate aesthetic.

---

## 📁 Architecture & Structure

### Directory Organization

```
src/
├── components/           # React components
│   ├── ui/              # shadcn/ui component library (DO NOT modify manually)
│   └── *.tsx            # Custom page components (Header, Footer, Hero, etc.)
├── pages/               # Route-level page components
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions
├── integrations/        # Third-party service integrations
│   └── supabase/        # Supabase client & types (auto-generated)
└── assets/              # Static images, videos, fonts
```

### Component Hierarchy

```
App.tsx (Root)
└── BrowserRouter
    ├── Index.tsx (Homepage)
    │   ├── Header
    │   ├── Hero
    │   ├── ValueProposition
    │   ├── Industries
    │   └── Footer
    └── NotFound.tsx (404)
```

---

## 🎨 Design System & Styling

### Color Palette

**Brand Colors** (Scholarix Global - Professional):
- Deep Navy: `hsl(210 60% 12%)`
- Ocean Blue: `hsl(221 83% 26%)`
- Sky Blue: `hsl(199 89% 63%)`
- Ice White: `hsl(200 67% 96%)`

**Accent Colors** (SGC TECH AI - Cyberpunk):
- Electric Cyan: `hsl(180 100% 50%)`
- Neon Green: `hsl(150 100% 50%)`
- Carbon Black: `hsl(0 0% 4%)`
- Gold: `hsl(45 100% 50%)`

### CSS/Tailwind Conventions

1. **Semantic Tokens**: Use CSS variables defined in `src/index.css`
   ```tsx
   // ✅ Good
   className="bg-background text-foreground"
   className="border-border hover:text-accent"
   
   // ❌ Avoid
   className="bg-[#0A1628] text-[#E0F2FE]"
   ```

2. **Responsive Design**: Mobile-first approach
   ```tsx
   // ✅ Good
   className="text-lg md:text-xl lg:text-2xl"
   className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
   ```

3. **Custom Utilities**: Defined in `src/index.css`
   - `.text-gradient` - Cyan-to-green gradient text
   - `.glass` - Glassmorphic background
   - `.shadow-glow` - Neon glow effect
   - `.pulse-glow` - Animated pulsing glow
   - `.grid-pattern` - Animated grid overlay
   - `.animate-fade-in`, `.stagger-1`, `.stagger-2`, etc. - Entrance animations

4. **Typography**:
   - **Display/Headings**: `font-display` (Orbitron)
   - **Body Text**: `font-body` (Inter)
   - **Monospace/Code**: `font-mono` (Share Tech Mono)

### Component Styling Rules

- **Always use `cn()` utility** from `@/lib/utils` to merge class names
- **Prefer Tailwind classes** over inline styles
- **Use shadcn/ui variants** for buttons, cards, dialogs
- **Maintain consistent spacing**: Use `gap-4`, `gap-6`, `gap-8` (not arbitrary values)

---

## 🧩 Component Guidelines

### shadcn/ui Components

The `src/components/ui/` directory contains auto-generated components from shadcn/ui.

**Rules**:
- ❌ **NEVER edit these files directly**
- ✅ **Extend via composition** or create wrapper components
- ✅ **Use variants** defined in the component (see `buttonVariants` example)

Example - Extending Button:
```tsx
// ✅ Good - Use existing variants
<Button variant="hero" size="lg">Click Me</Button>

// ✅ Good - Extend with custom classes
<Button className="pulse-glow">Click Me</Button>

// ❌ Bad - Modifying ui/button.tsx directly
```

### Custom Components

**Structure**:
```tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface MyComponentProps {
  title: string;
  description?: string;
  className?: string;
}

const MyComponent = ({ title, description, className }: MyComponentProps) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className={cn("p-6 bg-background", className)}>
      <h2 className="font-display text-2xl">{title}</h2>
      {description && <p className="text-foreground-muted">{description}</p>}
    </div>
  );
};

export default MyComponent;
```

**Best Practices**:
- Use TypeScript interfaces for props
- Export as default (not named export)
- Include `className` prop for style extensibility
- Destructure props with defaults
- Use semantic HTML elements
- Add accessibility attributes (`aria-label`, `role`, etc.)

---

## 🔧 TypeScript Conventions

### Configuration

This project uses relaxed TypeScript settings (see `tsconfig.json`):
- `noImplicitAny: false`
- `strictNullChecks: false`
- `noUnusedLocals: false`

**However**, still follow these practices:
- ✅ Define interfaces for component props
- ✅ Type function parameters and returns when non-obvious
- ✅ Use `type` for unions, `interface` for objects
- ✅ Leverage type inference (don't over-annotate)

### Import Aliases

Always use the `@/` alias for internal imports:
```tsx
// ✅ Good
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

// ❌ Bad
import { Button } from "../components/ui/button";
import { supabase } from "../../integrations/supabase/client";
```

---

## 🚀 State Management & Data Fetching

### React Query (TanStack Query)

**When to use**:
- Server state (API calls, Supabase queries)
- Data caching and synchronization
- Background refetching

**Example**:
```tsx
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const MyComponent = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['myData'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('my_table')
        .select('*');
      if (error) throw error;
      return data;
    }
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return <div>{/* Render data */}</div>;
};
```

### Local State

- Use `useState` for component-local state
- Use `useRef` for DOM references and mutable values
- Avoid prop drilling - consider Context API for deep hierarchies

---

## 🔌 Supabase Integration

### Client Usage

```tsx
import { supabase } from "@/integrations/supabase/client";

// Query
const { data, error } = await supabase
  .from('table_name')
  .select('*')
  .eq('column', value);

// Insert
const { data, error } = await supabase
  .from('table_name')
  .insert({ column1: 'value1', column2: 'value2' });

// Update
const { data, error } = await supabase
  .from('table_name')
  .update({ column: 'new_value' })
  .eq('id', recordId);

// Delete
const { data, error } = await supabase
  .from('table_name')
  .delete()
  .eq('id', recordId);
```

**Important**:
- Always handle errors
- Use React Query for data fetching
- Store auth state in local storage (configured in client)
- Types are auto-generated in `src/integrations/supabase/types.ts`

---

## 🧪 Development Workflow

### Running the Project

```powershell
# Install dependencies (first time)
bun install

# Start dev server (http://localhost:8080)
bun run dev

# Build for production
bun run build

# Preview production build
bun run preview

# Lint code
bun run lint
```

### File Creation Guidelines

1. **New Page Component**:
   - Create in `src/pages/PageName.tsx`
   - Add route in `src/App.tsx` (above the `*` catch-all route)
   - Use consistent layout structure (wrap in `<div className="min-h-screen">`)

2. **New UI Component**:
   - Create in `src/components/ComponentName.tsx`
   - Follow naming: PascalCase for files and components
   - Import and use in parent component

3. **New Utility Function**:
   - Add to `src/lib/utils.ts` or create new file in `src/lib/`
   - Export as named export

4. **New Hook**:
   - Create in `src/hooks/use-hook-name.ts`
   - Prefix with `use`
   - Follow React hooks rules

### Adding Routes

```tsx
// In src/App.tsx
<Routes>
  <Route path="/" element={<Index />} />
  <Route path="/about" element={<About />} />
  <Route path="/services" element={<Services />} />
  {/* Keep catch-all last */}
  <Route path="*" element={<NotFound />} />
</Routes>
```

---

## 📝 Code Quality & Best Practices

### ESLint Rules

- Unused variables: **off** (warning only)
- React Hooks: **on** (enforces rules of hooks)
- React Refresh: **warning** (component export validation)

### Accessibility (a11y)

- Use semantic HTML (`<nav>`, `<main>`, `<footer>`, `<article>`, etc.)
- Add `alt` text to all images
- Use `aria-label` for icon-only buttons
- Ensure keyboard navigation works
- Maintain color contrast ratios (WCAG AA)

### Performance

- Lazy load images/videos with `loading="lazy"`
- Use React.lazy() for code splitting on large pages
- Optimize images (WebP format when possible)
- Minimize third-party scripts
- Use `useMemo`/`useCallback` for expensive computations

### SEO

- Include meaningful `<title>` and meta tags
- Use heading hierarchy (`<h1>` → `<h2>` → `<h3>`)
- Add structured data (JSON-LD) when applicable
- Ensure proper robots.txt (in `public/robots.txt`)

---

## 🎭 Animation & Interaction Patterns

### Entrance Animations

Use predefined classes from `src/index.css`:
```tsx
<div className="animate-fade-in stagger-1">Content 1</div>
<div className="animate-fade-in stagger-2">Content 2</div>
<div className="animate-fade-in stagger-3">Content 3</div>
```

### Hover Effects

```tsx
// Button hover scale
<Button className="transform hover:scale-105 transition-transform">

// Glow effect
<div className="hover:shadow-glow transition-shadow">

// Text gradient glow
<span className="text-gradient animate-glow">
```

### Loading States

```tsx
import { Skeleton } from "@/components/ui/skeleton";

// Skeleton loader
{isLoading ? (
  <Skeleton className="h-20 w-full" />
) : (
  <div>{content}</div>
)}
```

---

## 🚨 Common Pitfalls & Solutions

| Issue | Solution |
|-------|----------|
| Import path errors | Use `@/` alias, not relative paths |
| Tailwind classes not applying | Ensure files are in `content` array in `tailwind.config.ts` |
| shadcn/ui component not found | Run `npx shadcn@latest add <component-name>` |
| TypeScript errors | Check `tsconfig.json` paths configuration |
| Styling conflicts | Use `cn()` to merge classes properly |
| Video autoplay blocked | Add `muted` attribute to `<video>` |
| Supabase types out of sync | Regenerate types from Supabase dashboard |

---

## 🔐 Environment Variables

Required in `.env.local`:
```bash
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-anon-key
```

**Rules**:
- Prefix all env vars with `VITE_` for Vite to expose them
- Never commit `.env.local` to Git
- Use `import.meta.env.VITE_VAR_NAME` to access in code

---

## 🧪 Testing Strategy

Currently, no test framework is configured. When adding tests:

1. **Install dependencies**:
   ```powershell
   bun add -d vitest @testing-library/react @testing-library/jest-dom jsdom
   ```

2. **Create test files**: `ComponentName.test.tsx`

3. **Write tests**:
   ```tsx
   import { describe, it, expect } from 'vitest';
   import { render, screen } from '@testing-library/react';
   import MyComponent from './MyComponent';

   describe('MyComponent', () => {
     it('renders correctly', () => {
       render(<MyComponent title="Test" />);
       expect(screen.getByText('Test')).toBeInTheDocument();
     });
   });
   ```

---

## 🎨 Brand Voice & Content Guidelines

**Tone**: Bold, confident, results-driven, no-nonsense  
**Style**: Short sentences. Action-oriented. Data-backed claims.  
**Avoid**: Jargon, buzzwords, vague promises, lengthy paragraphs

**Copy Examples**:
- ✅ "Transform in 14 days. Guaranteed 150-200% ROI."
- ❌ "We leverage cutting-edge synergistic solutions to optimize your digital transformation journey."

**Button Text**:
- Primary CTA: "Book Free Consultation"
- Secondary: "Learn More", "Get Started", "View Solutions"

---

## 🚢 Deployment

Build the project for production:

- **Build command**: `npm run build` or `bun run build`
- **Output directory**: `dist/`

### Deployment Options

**Vercel**:
```powershell
npm run build
# Deploy via Vercel CLI or connect GitHub repo
```

**Netlify**:
```powershell
npm run build
# Deploy via Netlify CLI or drag-and-drop dist folder
```

**Custom Server**:
```powershell
npm run build
# Upload `dist/` folder to hosting provider
```

---

## 📚 Key Dependencies Reference

| Package | Purpose | Docs |
|---------|---------|------|
| `react` | UI framework | [React Docs](https://react.dev) |
| `react-router-dom` | Routing | [React Router](https://reactrouter.com) |
| `@tanstack/react-query` | Server state | [TanStack Query](https://tanstack.com/query) |
| `tailwindcss` | Utility-first CSS | [Tailwind](https://tailwindcss.com) |
| `shadcn/ui` | Component library | [shadcn/ui](https://ui.shadcn.com) |
| `@supabase/supabase-js` | Backend/DB | [Supabase](https://supabase.com/docs) |
| `lucide-react` | Icon library | [Lucide](https://lucide.dev) |
| `vite` | Build tool | [Vite](https://vitejs.dev) |

---

## 🎯 Quick Reference: Common Tasks

### Add a new button variant
1. Open `src/components/ui/button.tsx`
2. Add variant to `buttonVariants` cva config
3. Use: `<Button variant="myVariant">Text</Button>`

### Add a new page
1. Create `src/pages/NewPage.tsx`
2. Add route in `src/App.tsx`: `<Route path="/new-page" element={<NewPage />} />`
3. Add navigation link in `Header.tsx`

### Add a new section to homepage
1. Create `src/components/NewSection.tsx`
2. Import and add to `src/pages/Index.tsx`
3. Style using Tailwind + design system tokens

### Add a form with validation
1. Install: `bun add react-hook-form zod`
2. Use `Form` component from `@/components/ui/form`
3. Define schema with Zod
4. Handle submission with React Hook Form

### Connect to Supabase table
1. Create table in Supabase dashboard
2. Regenerate types (if needed)
3. Use `supabase.from('table_name')` in component
4. Wrap in `useQuery` for automatic caching

---

## 🆘 Getting Help

- **Tailwind classes**: https://tailwindcss.com/docs
- **shadcn/ui components**: https://ui.shadcn.com
- **React patterns**: https://react.dev/learn
- **Supabase queries**: https://supabase.com/docs/reference/javascript
- **TypeScript help**: https://www.typescriptlang.org/docs

---

## 📋 Pre-commit Checklist

Before committing code, verify:
- [ ] No TypeScript errors (`bun run lint`)
- [ ] Imports use `@/` alias
- [ ] Components follow naming conventions
- [ ] Styles use design system tokens
- [ ] Responsive design tested (mobile, tablet, desktop)
- [ ] Accessibility attributes added
- [ ] No console.log statements
- [ ] Images have alt text
- [ ] No sensitive data hardcoded

---

**Last Updated**: November 2025  
**Maintainer**: GitHub Copilot for SGC TECH AI / Ignite Growth UAE

---

## MCP Integration
- **Overview:** The workspace includes a VS Code MCP configuration to surface local tools in agent mode.
- **Config:** See [../.vscode/mcp.json](../.vscode/mcp.json) for server entries.
- **Servers:**
  - Filesystem: `@modelcontextprotocol/server-filesystem` scoped to this repo (src, public, root)
  - Memory: `@modelcontextprotocol/server-memory` for quick scratch/context
  - GitHub: `@modelcontextprotocol/server-github` (requires `GITHUB_TOKEN` in environment)
- **Docs:**
  - TypeScript SDK: https://github.com/modelcontextprotocol/typescript-sdk
  - Python SDK: https://github.com/modelcontextprotocol/python-sdk
  - Getting Started: https://modelcontextprotocol.io/docs/getting-started/intro
  - Build Server: https://modelcontextprotocol.io/docs/develop/build-server
- **VS Code usage:** In Copilot Chat agent mode, tools from configured MCP servers appear automatically. Ensure your environment variables (e.g., `GITHUB_TOKEN`) are set before connecting.
