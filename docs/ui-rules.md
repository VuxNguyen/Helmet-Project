# UI Rules

## Design Philosophy

This project follows a **premium**, **minimal**, and **modern** UI philosophy inspired by Apple, Nike, Vercel, and modern Shopify stores. Every interface should feel polished, intentional, and high-end.

---

## Core Principles

### 1. Premium Feel
- Use generous whitespace — never crowd elements
- Subtle shadows and depth (prefer `shadow-sm`, `shadow-md`)
- Smooth transitions on interactive elements
- High-quality imagery with proper aspect ratios
- Consistent border radius usage (`rounded-lg`, `rounded-xl`)

### 2. Minimal & Clean
- Remove unnecessary clutter
- One primary action per view
- Clear visual hierarchy
- Limited color palette (see design-system.md)
- Content-forward layouts

### 3. Modern & Polished
- Use backdrop blur for overlays and navbars (`backdrop-blur-md`)
- Subtle gradient accents where appropriate
- Responsive typography scale
- Edge-to-edge imagery on hero sections
- Micro-interactions on buttons, cards, and links

### 4. Consistent Spacing
- Use Tailwind's spacing scale exclusively
- Maintain consistent padding within component types
- Section spacing: `py-16` to `py-24` (mobile), `py-24` to `py-32` (desktop)
- Card padding: `p-4` to `p-6`

---

## Component-Level Rules

### Typography
- Headings: `font-bold` or `font-semibold`, tracking (`tracking-tight`)
- Body: `text-base` or `text-sm`, `leading-relaxed`
- Use `text-muted-foreground` for secondary text
- Avoid font weights below 400 for readability

### Buttons
- Primary: filled, prominent, hover scale effect
- Secondary: outlined or ghost
- Disabled: reduced opacity (`opacity-50`), no pointer events
- Icon buttons: `p-2`, `rounded-full`, hover bg change

### Cards
- Subtle border (`border border-border`)
- Hover shadow elevation
- Clean padding
- Optional image with `aspect-[4/3]` or `aspect-square`

### Forms
- Labels above inputs
- Clean input styling with focus ring
- Error messages below inputs in `text-destructive`
- Submit buttons full-width on mobile

### Navigation
- Sticky with backdrop blur
- Clear active state indicators
- Mobile: slide-in drawer or bottom sheet

### Images
- Use `next/image` always
- Provide `width`, `height`, `alt` attributes
- Use `priority` for above-the-fold images
- Use `fill` with proper `sizes` for dynamic containers

---

## Color Usage

| Element | Token |
|---------|-------|
| Background | `bg-background` |
| Surface | `bg-card` |
| Primary text | `text-foreground` |
| Secondary text | `text-muted-foreground` |
| Primary action | `bg-primary text-primary-foreground` |
| Destructive | `bg-destructive text-destructive-foreground` |
| Borders | `border-border` |
| Input focus | `ring-ring` |

---

## Typography Scale

```typescript
// Tailwind defaults + custom tokens
h1: text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight
h2: text-3xl md:text-4xl font-bold tracking-tight
h3: text-2xl md:text-3xl font-semibold
h4: text-xl md:text-2xl font-semibold
body: text-base leading-relaxed
body-sm: text-sm leading-relaxed
caption: text-xs text-muted-foreground
```

---

## Responsive Behavior

- **Mobile-first** approach always
- Touch targets minimum 44x44px
- Single column on mobile, multi-column on desktop
- Reduce motion when `prefers-reduced-motion`
- Test breakpoints: 640, 768, 1024, 1280, 1536

---

## Accessibility

- Semantic HTML elements
- Proper heading hierarchy (h1 -> h2 -> h3)
- Alt text on all images
- Focus visible indicators
- ARIA labels where necessary
- Color contrast ratio >= 4.5:1
- Keyboard navigable
- Screen reader friendly

---

## What to Avoid

- ❌ Oversaturated colors
- ❌ Cluttered layouts
- ❌ Inconsistent spacing
- ❌ Missing hover/focus states
- ❌ Overly complex animations
- ❌ Inline styles
- ❌ CSS modules or styled-components
- ❌ Redundant or bloated UI

---

## Final Checklist Before Merging

- [ ] No inline styles
- [ ] All interactive elements have hover/focus states
- [ ] Responsive at mobile, tablet, desktop
- [ ] Proper spacing and alignment
- [ ] Uses design tokens (not hardcoded colors)
- [ ] Images have proper dimensions and alt text
- [ ] Animations respect reduced motion
- [ ] Touch targets are accessible
- [ ] No console errors or warnings