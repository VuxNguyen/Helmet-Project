# Prompting Guide

## Purpose

This guide defines how to effectively prompt the AI to generate code that is consistent with the project's architecture, design system, and coding standards. Following these patterns ensures high-quality, on-brand, and maintainable output.

---

## Project Context Summary

```
Project: Premium motorcycle helmet e-commerce frontend
Tech:   Next.js 14 App Router, TypeScript, Tailwind CSS, shadcn/ui
State:  Zustand
Fetch:  TanStack Query
Forms:  React Hook Form + Zod
Motion: Framer Motion
Style:  Premium, minimal, modern (Apple/Nike/Vercel inspired)
```

---

## Prompt Structure

A good prompt should include:

### 1. Context
- What feature or page you're building
- Where it fits in the app (route, feature module)
- Any relevant existing components or patterns

### 2. Requirements
- Visual requirements (layout, sections, responsive behavior)
- Functional requirements (interactions, data flow, state)
- Performance considerations

### 3. Constraints
- Must use existing design tokens and components
- Must follow mobile-first responsive patterns
- Must handle loading, error, and empty states

### 4. Examples (Optional)
- Reference to an existing page or component as a template
- Specific design inspiration

---

## Prompt Templates

### Page Creation
```
Create a [page name] page at [route].

Context:
- This is a [marketing/shop/auth/account] page
- It follows the layout pattern from [reference page]
- Uses [feature] module components

Requirements:
- [Requirement 1]
- [Requirement 2]
- Responsive: [mobile/tablet/desktop behavior]

Design:
- Section pattern: [hero/featured/cta/grid]
- Include metadata, loading, and error states
- Use design tokens from the design system

Constraints:
- Mobile-first
- Server Component by default
- Suspense boundaries for async data
```

### Component Creation
```
Create a [component name] component in [module/feature].

Props:
- [prop 1]: type, required/optional
- [prop 2]: type, required/optional

Behavior:
- [Interaction 1]
- [Interaction 2]

States:
- Loading: [description]
- Empty: [description]
- Error: [description]
- Edge case: [description]

Styling:
- Use shadcn/ui primitives where applicable
- Follow the design system spacing/typography tokens
- Responsive: [description]

The component should be a [Server/Client] Component.
```

### Feature / Hook Creation
```
Create a [hook name] hook in [feature]/hooks.

Purpose: [description of what the hook does]

API:
- Input: [params with types]
- Output: [return value with types]

Data Flow:
- Uses TanStack Query for [server state]
- Uses Zustand for [client state]
- Handles [loading/error/empty] states

Error Handling:
- [Error scenario 1]: [handling strategy]
- [Error scenario 2]: [handling strategy]
```

---

## Response Quality Checklist

The generated code should be verified against:

- [ ] Follows project architecture (file placement, naming conventions)
- [ ] Uses TypeScript with proper types (no `any`)
- [ ] Uses Tailwind CSS only (no inline styles, no CSS modules)
- [ ] Uses shadcn/ui components where applicable
- [ ] Is mobile-first responsive
- [ ] Handles loading, error, and empty states
- [ ] Uses `next/image` for images with proper attributes
- [ ] Includes proper metadata for pages
- [ ] Respects reduced motion preferences
- [ ] Has accessible markup (semantic HTML, ARIA attributes)
- [ ] Touch targets meet minimum 44x44px
- [ ] Uses design tokens (not hardcoded colors/sizes)
- [ ] Uses proper heading hierarchy
- [ ] Small focused components (<200 lines)
- [ ] Client Components only when needed
- [ ] No console.log or debugging artifacts

---

## Code Style Guidelines for AI Output

### Imports
```tsx
// External packages first
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'

// Internal aliases next (alphabetical)
import { Button } from '@/components/ui/button'
import { useCartStore } from '@/stores/cart-store'
import { cn } from '@/lib/utils'

// Types last
import type { Product } from '@/types/product'
```

### Naming
```tsx
// Files
ProductCard.tsx         // ✅
product-card.tsx        // ❌

// Hooks
useProductList          // ✅
use_product_list        // ❌

// Functions
handleAddToCart         // ✅
handle_add_to_cart      // ❌
```

### Component Structure
```tsx
// 1. Imports
// 2. Types/Interfaces
// 3. Component function
// 4. Sub-components (if compound)
// 5. Exports
```

### TypeScript
- Prefer `interface` over `type` for objects
- Use `type` for unions and primitives
- Avoid `any` — use `unknown` if type is truly dynamic
- Use `as const` for literal types
- Use `satisfies` for type validation on complex objects

### Error Handling
```tsx
// Always handle error states from data fetching
if (isLoading) return <Skeleton />
if (error) return <ErrorState onRetry={refetch} />
if (!data) return <NotFoundState />
```

---

## Common Patterns Reference

### Loading States
```tsx
// Skeleton component
<div className="animate-pulse space-y-4">
  <div className="h-48 bg-muted rounded-lg" />
  <div className="h-4 bg-muted rounded w-3/4" />
</div>

// Spinner for inline loading
<Loader2 className="h-5 w-5 animate-spin" />
```

### Empty States
```tsx
<div className="flex flex-col items-center justify-center py-16 text-center">
  <ShoppingBag className="h-12 w-12 text-muted-foreground" />
  <h3 className="mt-4 text-lg font-semibold">Your cart is empty</h3>
  <p className="mt-2 text-sm text-muted-foreground">
    Looks like you haven't added anything yet.
  </p>
  <Button className="mt-6" asChild>
    <Link href="/products">Start Shopping</Link>
  </Button>
</div>
```

### Error States
```tsx
<div className="flex flex-col items-center justify-center py-16 text-center">
  <AlertCircle className="h-12 w-12 text-destructive" />
  <h3 className="mt-4 text-lg font-semibold">Something went wrong</h3>
  <p className="mt-2 text-sm text-muted-foreground">
    {message || 'Please try again.'}
  </p>
  <Button variant="outline" className="mt-6" onClick={onRetry}>
    Try Again
  </Button>
</div>
```

---

## What to Avoid in Prompts

- ❌ Vague requirements without context
- ❌ Requesting features outside project scope
- ❌ Asking for inline styles or CSS modules
- ❌ Requesting Redux or other excluded libraries
- ❌ Skipping error/loading/empty states
- ❌ Requesting non-accessible UI
- ❌ Desktop-first designs without mobile consideration
- ❌ Requesting components >300 lines without strong justification

---

## Example: Good Prompt

```
Create a ProductDetailPage at /products/[slug].

Context:
- This is a shop page in the (shop) route group
- Product data comes from API via TanStack Query
- Uses ProductCard, Button, Badge shadcn components

Requirements:
- Hero section with product images (gallery with thumbnails)
- Product info section: name, price, rating, description
- Size selector with radio buttons
- Color selector with swatches
- Add to cart button with quantity selector
- Related products section at bottom
- Breadcrumb navigation
- Responsive: single column on mobile, two columns on desktop

States:
- Loading: skeleton with image placeholder and text lines
- Error: error message with retry button
- Not found: 404-style message with go back link
- Edge case: out of stock product shows disabled CTA with "Out of Stock" message

Design:
- Premium feel with generous whitespace
- Sticky add-to-cart section on mobile
- Smooth image gallery transitions with Framer Motion
- Follow design system tokens for all styling
</write_to_file>
<task_progress>
- [x] Create docs/ directory
- [x] Create docs/ui-rules.md
- [x] Create docs/frontend-architecture.md
- [x] Create docs/component-patterns.md
- [x] Create docs/design-system.md
- [x] Create docs/animation-guidelines.md
- [x] Create docs/page-structure.md
- [x] Create docs/responsive-rules.md
- [x] Create docs/prompting-guide.md
</task_progress>
</write_to_file>