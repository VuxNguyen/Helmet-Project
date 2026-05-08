# Responsive Rules

## Philosophy

Build **mobile-first** with progressive enhancement. Every layout starts at the smallest screen size and scales up. The mobile experience is not an afterthought — it's the foundation.

---

## Breakpoints

| Breakpoint | Min Width | Target Device | Usage |
|------------|-----------|---------------|-------|
| (base) | 0px | Small phones | Default mobile styles |
| `sm` | 640px | Large phones | Landscape phones |
| `md` | 768px | Tablets | Portrait tablets |
| `lg` | 1024px | Desktop | Laptops, desktops |
| `xl` | 1280px | Wide desktop | Large screens |
| `2xl` | 1536px | Ultra-wide | 27"+ monitors |

**Always use min-width (mobile-first) breakpoints.** Never use `max-width` unless there's a specific reason to override at a smaller size.

```tsx
// ✅ Mobile-first (preferred)
className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"

// ❌ Desktop-first (avoid)
className="hidden lg:block"
```

---

## Layout Patterns

### Single → Multi Column
```tsx
// Product grid
<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
  {products.map(product => (
    <ProductCard key={product.id} product={product} />
  ))}
</div>
```

### Sidebar Layout
```tsx
// Sidebar hidden on mobile, visible on desktop
<div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
  <aside className="hidden lg:block">
    <Filters />
  </aside>
  <main>
    <ProductGrid />
  </main>
</div>
```

### Stack on Mobile, Row on Desktop
```tsx
// Hero section CTA buttons
<div className="flex flex-col gap-4 sm:flex-row sm:items-center">
  <Button size="lg">Primary Action</Button>
  <Button variant="outline" size="lg">Secondary Action</Button>
</div>
```

---

## Typography Responsiveness

```tsx
// Headings scale with viewport
<h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
  Page Title
</h1>

// Body text
<p className="text-sm sm:text-base md:text-lg">
  Content that scales modestly with screen size.
</p>
```

**Typography scale map:**

| Element | Mobile | Tablet | Desktop |
|---------|--------|--------|---------|
| Display | text-4xl | text-5xl | text-6xl |
| h1 | text-3xl | text-4xl | text-5xl |
| h2 | text-2xl | text-3xl | text-4xl |
| h3 | text-xl | text-2xl | text-3xl |
| h4 | text-lg | text-xl | text-2xl |
| Body | text-sm | text-base | text-base |
| Caption | text-xs | text-xs | text-sm |

---

## Spacing Responsiveness

```tsx
// Section padding
<section className="py-12 sm:py-16 md:py-20 lg:py-24">
  ...
</section>

// Container padding
<div className="px-4 sm:px-6 lg:px-8">
  ...
</div>

// Gap between elements
<div className="space-y-6 sm:space-y-8 lg:space-y-12">
  ...
</div>

// Card padding
<div className="p-4 sm:p-5 md:p-6">
  ...
</div>
```

---

## Navigation Responsiveness

### Desktop (>1024px)
- Full horizontal navigation with all links visible
- Search bar visible in header
- Cart and wishlist icons with labels
- Dropdown menus for categories

### Tablet (768-1024px)
- Compact navigation with reduced link text
- Search icon (opens overlay on click)
- Cart and wishlist icons without labels
- Hamburger menu for overflow links

### Mobile (<768px)
- Hamburger menu opens full-screen drawer
- Slide-in navigation from left
- Search accessible via icon
- Bottom navigation bar (optional) for key actions
- Full-width buttons and inputs

```tsx
// Responsive navigation pattern
<nav className="hidden lg:flex items-center gap-6">
  {/* Desktop navigation */}
  <NavLinks />
  <SearchBar />
  <CartIcon />
</nav>

{/* Mobile navigation trigger */}
<Sheet>
  <SheetTrigger asChild>
    <Button variant="ghost" size="icon" className="lg:hidden">
      <Menu className="h-5 w-5" />
    </Button>
  </SheetTrigger>
  <SheetContent side="left" className="w-[300px] sm:w-[400px]">
    <MobileNav />
  </SheetContent>
</Sheet>
```

---

## Images & Media

```tsx
// Responsive images
<Image
  src={product.image}
  alt={product.name}
  fill
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
  className="object-cover"
/>
```

- Hero images: `sizes="100vw"`
- Product cards: `sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"`
- Sidebar images: `sizes="280px"`

---

## Touch Targets

Minimum touch target size: **44x44px** (Apple HIG) or **48x48px** (Material Design).

```tsx
// ✅ Good — meets minimum size
<Button className="h-11 min-w-[44px] px-4">
  Tap Me
</Button>

// ❌ Bad — too small
<button className="p-1 text-sm">
  X
</button>
```

### Touch Target Guidelines
| Element | Minimum Size | Spacing |
|---------|-------------|---------|
| Buttons | 44x44px | 8px apart |
| Icon buttons | 44x44px | 8px apart |
| Links in text | 44px line height | — |
| Form inputs | 44px height | 16px apart |
| Bottom nav items | 48x48px | Full width |

---

## Mobile-Specific Considerations

### 1. Full-Width Elements
- Buttons should be `w-full` on mobile
- Cards should span full width
- Form inputs should be full width
- Avoid side-by-side layouts on small screens

### 2. Readable Text
- Minimum font size: 14px (never smaller)
- Line height: 1.5 for body text
- Adequate contrast even in bright sunlight
- No horizontal scrolling

### 3. Easy Navigation
- Hamburger menu or bottom navigation
- Back button always accessible
- Breadcrumb trail for deep pages
- Sticky header with search access

### 4. Simplified UI
- Reduce visual complexity
- Single column layout
- Larger form controls
- Reduced number of options

### 5. Performance
- Optimize images for mobile data
- Lazy load below-the-fold content
- Minimize JavaScript bundle
- Use proper caching strategies

---

## Tablet-Specific Considerations

### 1. Split Layouts
- 2-column product grids
- Sidebar can be collapsible
- Content can be side-by-side with padding

### 2. Multi-Column Forms
- 2-column form layouts
- Inline label + input combinations
- Split CTA buttons

### 3. Hybrid Navigation
- Show primary nav links
- Hide secondary items behind hamburger
- Use horizontal scrolling for categories

---

## Testing Checklist

| Feature | Mobile | Tablet | Desktop |
|---------|--------|--------|---------|
| No horizontal scroll | ✅ | ✅ | ✅ |
| Touch targets ≥44px | ✅ | ✅ | N/A |
| Readable font sizes | ✅ | ✅ | ✅ |
| Navigation works | ✅ | ✅ | ✅ |
| Forms usable | ✅ | ✅ | ✅ |
| Images scale properly | ✅ | ✅ | ✅ |
| Buttons full-width | ✅ | Optional | ❌ |
| Grid adjusts columns | ✅ | ✅ | ✅ |
| Content not cut off | ✅ | ✅ | ✅ |
| No overlapping elements | ✅ | ✅ | ✅ |

---

## Common Responsive Patterns

### Conditional Rendering
```tsx
// Show different content based on screen
<div>
  {/* Mobile only */}
  <MobileProductCard product={product} className="sm:hidden" />
  
  {/* Desktop only */}
  <DesktopProductCard product={product} className="hidden sm:block" />
</div>
```

### Responsive Modals
```tsx
<Dialog>
  <DialogContent className="sm:max-w-lg">
    {/* Dialog content */}
  </DialogContent>
</Sheet>
```
- Mobile: bottom sheet or full-screen modal
- Tablet: centered modal with overlay
- Desktop: centered dialog with max-width

### Responsive Tables
```tsx
// Mobile: card layout
// Desktop: traditional table
<div className="block lg:hidden">
  {/* Card list for mobile */}
</div>
<table className="hidden lg:table">
  {/* Table for desktop */}
</table>
```

---

## What to Avoid

- ❌ Fixed widths (use `max-w-*` instead)
- ❌ Horizontal scroll caused by overflow
- ❌ Touch targets smaller than 44px
- ❌ Hover-only interactions on mobile
- ❌ Font sizes below 14px
- ❌ desktop-first media queries (`max-width`)
- ❌ Breaking layout at arbitrary breakpoints
- ❌ Hiding content behind hover on touch devices