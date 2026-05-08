# Design System

## Overview

This document defines the visual design system for the helmet e-commerce project. All UI should adhere to these tokens, scales, and guidelines.

---

## Color Tokens

### Base Palette
```css
/* Defined in tailwind.config.ts */
```

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| `background` | `#FFFFFF` | `#0A0A0A` | Page backgrounds |
| `foreground` | `#0A0A0A` | `#FAFAFA` | Primary text |
| `card` | `#FAFAFA` | `#141414` | Cards, elevated surfaces |
| `card-foreground` | `#0A0A0A` | `#FAFAFA` | Card text |
| `popover` | `#FAFAFA` | `#141414` | Dropdowns, tooltips |
| `popover-foreground` | `#0A0A0A` | `#FAFAFA` | Popover text |
| `primary` | `#1A1A1A` | `#E8E8E8` | Primary CTAs, links |
| `primary-foreground` | `#FAFAFA` | `#0A0A0A` | Text on primary |
| `secondary` | `#F0F0F0` | `#1F1F1F` | Secondary CTAs |
| `secondary-foreground` | `#1A1A1A` | `#E8E8E8` | Text on secondary |
| `muted` | `#F5F5F5` | `#1A1A1A` | Muted backgrounds |
| `muted-foreground` | `#737373` | `#A3A3A3` | Secondary/muted text |
| `accent` | `#F0F0F0` | `#1F1F1F` | Accent backgrounds |
| `accent-foreground` | `#1A1A1A` | `#E8E8E8` | Text on accent |
| `destructive` | `#DC2626` | `#EF4444` | Errors, delete actions |
| `destructive-foreground` | `#FAFAFA` | `#FAFAFA` | Text on destructive |
| `border` | `#E5E5E5` | `#262626` | Borders, dividers |
| `input` | `#E5E5E5` | `#262626` | Input borders |
| `ring` | `#0A0A0A` | `#FAFAFA` | Focus rings |

### Semantic Color Usage

| Context | Color Token |
|---------|-------------|
| Brand primary | `#1A1A1A` / `#E8E8E8` |
| Brand accent | `#DC2626` (red, for sale tags) |
| Success | `#16A34A` (green) |
| Warning | `#F59E0B` (amber) |
| Error | `#DC2626` (red) |
| Info | `#3B82F6` (blue) |
| Rating stars | `#F59E0B` (amber) |

---

## Typography

### Font Family
```css
font-family: 'Inter', system-ui, -apple-system, sans-serif;
```

### Type Scale

| Level | Size | Line Height | Weight | Tracking |
|-------|------|-------------|--------|----------|
| Display | `text-5xl` (48px) | `leading-none` | Bold | `tracking-tighter` |
| h1 | `text-4xl` (36px) | `leading-tight` | Bold | `tracking-tight` |
| h2 | `text-3xl` (30px) | `leading-tight` | Bold | `tracking-tight` |
| h3 | `text-2xl` (24px) | `leading-snug` | Semibold | `tracking-normal` |
| h4 | `text-xl` (20px) | `leading-snug` | Semibold | `tracking-normal` |
| Body | `text-base` (16px) | `leading-relaxed` | Normal | `tracking-normal` |
| Body-sm | `text-sm` (14px) | `leading-relaxed` | Normal | `tracking-normal` |
| Caption | `text-xs` (12px) | `leading-normal` | Normal | `tracking-normal` |
| Overline | `text-xs` (12px) | `leading-normal` | Semibold | `tracking-wider` |
| Price | `text-lg` (18px) | `leading-none` | Bold | `tracking-tight` |

### Responsive Adjustments

```
Display: sm:text-5xl → md:text-6xl → lg:text-7xl
h1:      sm:text-4xl → md:text-5xl → lg:text-6xl
h2:      sm:text-3xl → md:text-4xl
h3:      sm:text-2xl → md:text-3xl
```

---

## Spacing Scale

Uses Tailwind's default spacing scale (`px` and `rem`).

| Name | Value | Tailwind |
|------|-------|----------|
| Section (mobile) | 64px | `py-16` |
| Section (desktop) | 96px | `py-24` |
| Card padding | 16-24px | `p-4` to `p-6` |
| Grid gap | 16-24px | `gap-4` to `gap-6` |
| Content max-width | 1280px | `max-w-7xl` |
| Content padding | 16-24px | `px-4` to `px-6` |

---

## Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `rounded-sm` | 2px | Badges, tags |
| `rounded-md` | 6px | Buttons, inputs |
| `rounded-lg` | 8px | Cards, modals |
| `rounded-xl` | 12px | Large cards, hero sections |
| `rounded-2xl` | 16px | Special surfaces |
| `rounded-full` | 9999px | Avatars, icon buttons |

---

## Shadows

| Token | Light | Dark |
|-------|-------|------|
| `shadow-sm` | `0 1px 2px rgba(0,0,0,0.05)` | `0 1px 2px rgba(0,0,0,0.3)` |
| `shadow-md` | `0 4px 6px rgba(0,0,0,0.07)` | `0 4px 6px rgba(0,0,0,0.4)` |
| `shadow-lg` | `0 10px 15px rgba(0,0,0,0.1)` | `0 10px 15px rgba(0,0,0,0.5)` |
| `shadow-xl` | `0 20px 25px rgba(0,0,0,0.15)` | `0 20px 25px rgba(0,0,0,0.6)` |

---

## Z-Index Scale

| Layer | Value |
|-------|-------|
| Base | 0 |
| Sticky | 10 |
| Dropdown | 20 |
| Drawer/Sidebar | 30 |
| Modal | 40 |
| Toast | 50 |
| Tooltip | 60 |

---

## Breakpoints

| Breakpoint | Min Width | Device |
|------------|-----------|--------|
| `sm` | 640px | Mobile landscape |
| `md` | 768px | Tablet |
| `lg` | 1024px | Desktop |
| `xl` | 1280px | Wide desktop |
| `2xl` | 1536px | Ultra-wide |

---

## Iconography

- Use `lucide-react` icons
- Scale: `h-4 w-4` (16px) for inline, `h-5 w-5` (20px) for nav, `h-6 w-6` (24px) for hero
- Stroke width: `stroke-[1.5]` default, `stroke-[2]` for emphasis

---

## Motion Tokens

```typescript
export const motionTokens = {
  duration: {
    fast: 150,     // hover states
    normal: 200,   // transitions
    slow: 300,     // page transitions
    slower: 500,   // hero animations
  },
  easing: {
    default: [0.4, 0, 0.2, 1],
    emphasis: [0.2, 0, 0, 1],
    spring: { stiffness: 300, damping: 30 },
  },
}
```

---

## Dark Mode

- Support via `next-themes` or Tailwind `dark:` variant
- All components must support both themes
- Use CSS variables for dynamic theming
- Default to system preference
- Allow manual toggle

---

## Accessibility Standards

- Minimum contrast ratio: 4.5:1 (normal text), 3:1 (large text)
- Focus indicators: `focus-visible:ring-2 focus-visible:ring-ring`
- Touch targets: minimum 44x44px
- Reduced motion: respect `prefers-reduced-motion`
- Screen reader: proper ARIA labels and roles

---

## Grid System

```tsx
// Responsive grid patterns
// Product grid (mobile → tablet → desktop)
grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6

// Feature grid
grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8

// Sidebar layout
grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 lg:gap-8