# News Carousel - Implementation Guide

## Overview

A sticky, auto-rotating news carousel component positioned above the main navbar. It displays current news updates, announcements, and product updates with category badges, automatic rotation, and user interaction controls.

## Features

✅ **Sticky Positioning** - Stays above navbar during scrolling
✅ **Auto-Rotation** - Automatically cycles through news every 5 seconds
✅ **Category Badges** - Color-coded badges for news, updates, and announcements
✅ **Navigation Controls** - Previous/Next buttons and dot indicators
✅ **Responsive Design** - Works perfectly on mobile, tablet, and desktop
✅ **User Interactions** - Pause on hover, manual navigation, close button
✅ **Accessibility** - Proper ARIA labels and keyboard navigation

## File Structure

```
src/
├── components/
│   └── NewsCarousel.tsx          # Main carousel component
├── config/
│   └── newsConfig.ts              # News data configuration
└── App.tsx                        # Already updated with import & render
```

## Usage

### Basic Setup

The component is already integrated into your app. It will automatically display above the navbar on all pages.

### Customizing News Items

Edit `src/config/newsConfig.ts` to add your own news items:

```typescript
export const newsItems: NewsItem[] = [
  {
    id: 1,
    title: "Your News Title",
    description: "Brief description of your news",
    date: "Dec 23, 2025",
    category: "news",        // "news" | "update" | "announcement"
    link: "/your-page",      // Optional: link on click
  },
  // Add more items...
];
```

### News Item Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | number | ✓ | Unique identifier |
| `title` | string | ✓ | News headline (keep short, ~50 chars) |
| `description` | string | ✓ | Brief description (keep short, ~80 chars) |
| `date` | string | ✓ | Publication date |
| `category` | "news" \| "update" \| "announcement" | ✓ | Type of news |
| `link` | string | ✗ | URL to navigate on click |

### Category Types & Colors

| Category | Badge Color | Use Case |
|----------|------------|----------|
| `announcement` | Gold/Orange | New features, major updates |
| `update` | Cyan | Performance improvements, fixes |
| `news` | Emerald/Green | Partnerships, milestones |

## Styling & Customization

### Changing Colors

Edit `NewsCarousel.tsx` in the `getCategoryColor()` function:

```typescript
const getCategoryColor = (category: string) => {
  switch (category) {
    case "announcement":
      return "bg-accent/20 text-accent";        // Change these classes
    case "update":
      return "bg-cyan-500/20 text-cyan-400";    // Change these classes
    case "news":
      return "bg-emerald-500/20 text-emerald-400"; // Change these classes
  }
};
```

### Changing Auto-Rotation Interval

In `NewsCarousel.tsx`, find this line:

```typescript
const interval = setInterval(() => {
  setCurrentIndex((prev) => (prev + 1) % newsItems.length);
}, 5000);  // ← Change 5000 to your desired milliseconds
```

- `5000` = 5 seconds
- `3000` = 3 seconds
- `8000` = 8 seconds

## Component Behavior

### Auto-Rotation
- Carousel auto-rotates every 5 seconds
- Pauses when user hovers over any interactive element
- Resumes when cursor leaves

### Navigation
- **Arrow Buttons**: Click to manually advance carousel
- **Dot Indicators**: Click any dot to jump to that news item
- **Close Button (X)**: Hides the carousel for the session

### Responsive Behavior

| Breakpoint | Changes |
|-----------|---------|
| Mobile (<768px) | Hides dot indicators, compact layout |
| Tablet (768px-1024px) | Full layout with visible dots |
| Desktop (>1024px) | Full features, all controls visible |

## Styling Classes Used

These are the Tailwind and custom classes applied:

- `.sticky top-0 z-40` - Sticky positioning above navbar
- `.glass` - Optional glassmorphic effect
- `.text-gradient` - Gradient text for badges
- `.pulse-glow` - Optional pulsing glow animation

## Integration with Other Pages

The carousel appears on ALL pages automatically. If you want to disable it on a specific page:

```tsx
// In that page component, you can add a context provider or conditional logic
// But it's recommended to keep it visible for consistent UX
```

## Performance Considerations

- ✅ Lightweight: ~2KB minified
- ✅ No external dependencies beyond existing packages
- ✅ Efficient re-renders with proper state management
- ✅ Interval cleanup to prevent memory leaks

## Accessibility Features

- ✓ ARIA labels on all buttons
- ✓ Keyboard navigation support
- ✓ Proper heading hierarchy
- ✓ Color contrast compliance
- ✓ Touch-friendly on mobile

## Examples

### Adding a News Item for a New Product Launch

```typescript
{
  id: 5,
  title: "Enterprise Suite 2.0 Launch",
  description: "Next-generation AI platform now available",
  date: "Dec 24, 2025",
  category: "announcement",
  link: "/solutions",
}
```

### Adding a Bug Fix Update

```typescript
{
  id: 6,
  title: "Critical Security Patch",
  description: "Fixed authentication vulnerability - upgrade recommended",
  date: "Dec 24, 2025",
  category: "update",
  link: "/about",
}
```

### Adding a Partnership Announcement

```typescript
{
  id: 7,
  title: "Partnership: SGC TECH AI + Adobe",
  description: "Integrating Creative Suite with AI automation",
  date: "Dec 22, 2025",
  category: "news",
  link: "/solutions",
}
```

## Troubleshooting

### Carousel Not Showing?
1. Check that `NewsCarousel` is imported in `App.tsx`
2. Verify component is rendered: `<NewsCarousel />`
3. Ensure `newsConfig.ts` has items in the array

### Styling Issues?
1. Verify Tailwind CSS is configured correctly
2. Check that custom utility classes are defined in `index.css`
3. Ensure no CSS conflicts with existing styles

### Close Button Hides Carousel Permanently?
- This is session-based (refreshing the page resets it)
- To make it permanent, you'd need localStorage integration

## Future Enhancement Ideas

- [ ] Add localStorage to persist "close" state
- [ ] Connect to CMS/API for dynamic news
- [ ] Add transition animations
- [ ] Email notification on new news items
- [ ] Analytics tracking for clicks
- [ ] News archive/history page

## Questions?

Refer to the main project documentation or contact the development team.
