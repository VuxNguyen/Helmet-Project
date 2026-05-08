# Page Structure

## Overview

This document defines the standard page structure and layout patterns for the helmet e-commerce project. All pages should follow these conventions to ensure consistency and a premium user experience.

---

## Page Layout Hierarchy

```
RootLayout
└── MainLayout (route group)
    ├── Header (sticky, backdrop-blur)
    │   ├── Logo
    │   ├── Navigation (desktop)
    │   ├── Search
    │   ├── Cart Icon (with badge)
    │   ├── Wishlist Icon
    │   └── Mobile Menu Trigger
    │
    ├── Announcement Bar (optional)
    │
    ├── Page Content
    │   ├── Hero / Page Header (if applicable)
    │   ├── Main Section
    │   ├── Secondary Section (if applicable)
    │   └── CTA Section (if applicable)
    │
    ├── Footer
    │   ├── Newsletter Signup
    │   ├── Navigation Links
    │   ├── Social Links
    │   └── Legal / Copyright
    │
    └── Mobile Navigation (drawer)
```

---

## Route Groups

```
src/app/
├── (marketing)/          # Public marketing pages
│   ├── page.tsx          # Homepage
│   ├── about/
│   ├── contact/
│   └── layout.tsx        # Marketing layout (minimal header)
│
├── (shop)/               # Shop pages
│   ├── products/
│   │   ├── page.tsx      # Product listing / category
│   │   └── [slug]/
│   │       └── page.tsx  # Product detail
│   ├── cart/
│   │   └── page.tsx      # Shopping cart
│   ├── checkout/
│   │   └── page.tsx      # Checkout flow
│   └── layout.tsx        # Shop layout (full header+footer)
│
├── (auth)/               # Authentication pages
│   ├── login/
│   ├── register/
│   ├── forgot-password/
│   └── layout.tsx        # Auth layout (centered, minimal)
│
├── (account)/            # User account pages
│   ├── profile/
│   ├── orders/
│   ├── wishlist/
│   ├── addresses/
│   └── layout.tsx        # Account layout (sidebar nav)
│
├── (legal)/              # Legal & informational
│   ├── privacy/
│   ├── terms/
│   └── shipping/
│
├── layout.tsx            # Root layout (html, head, providers)
├── loading.tsx           # Global loading state
├── error.tsx             # Global error boundary
└── not-found.tsx         # 404 page
```

---

## Page Template

```tsx
// Example: Product Listing Page
import { Suspense } from 'react'
import { ProductGrid } from '@/features/products/components/product-grid'
import { ProductFilters } from '@/features/products/components/product-filters'
import { ProductGridSkeleton } from '@/features/products/components/product-grid-skeleton'
import { Breadcrumb } from '@/components/shared/breadcrumb'

interface ProductsPageProps {
  searchParams: Promise<{
    category?: string
    sort?: string
    page?: string
  }>
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams

  return (
    <main className="min-h-screen">
      {/* Page Header */}
      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-7xl px-4 py-8 md:px-6">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Products', href: '/products' },
            ]}
          />
          <h1 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
            All Helmets
          </h1>
          <p className="mt-2 text-muted-foreground">
            Discover our premium collection of motorcycle helmets.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="mx-auto max-w-7xl px-4 py-8 md:px-6">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[280px_1fr]">
          {/* Sidebar Filters */}
          <aside className="hidden lg:block">
            <ProductFilters />
          </aside>

          {/* Product Grid */}
          <div>
            <Suspense fallback={<ProductGridSkeleton />}>
              <ProductGrid
                category={params.category}
                sort={params.sort}
                page={Number(params.page) || 1}
              />
            </Suspense>
          </div>
        </div>
      </section>
    </main>
  )
}
```

---

## Section Patterns

### Hero Section
```tsx
<section className="relative overflow-hidden bg-background">
  <div className="mx-auto max-w-7xl px-4 py-24 md:px-6 md:py-32 lg:py-40">
    <div className="max-w-2xl">
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
        Ride Safe, Ride Stylish
      </h1>
      <p className="mt-6 text-lg text-muted-foreground">
        Premium motorcycle helmets designed for safety and style.
      </p>
      <div className="mt-8 flex flex-col gap-4 sm:flex-row">
        <Button size="lg">Shop Collection</Button>
        <Button variant="outline" size="lg">Learn More</Button>
      </div>
    </div>
  </div>
  {/* Background image or pattern */}
  <div className="absolute inset-0 -z-10">
    <Image src="/hero-bg.jpg" alt="" fill className="object-cover" priority />
  </div>
</section>
```

### Featured Section
```tsx
<section className="bg-muted/50 py-16 md:py-24">
  <div className="mx-auto max-w-7xl px-4 md:px-6">
    <div className="mx-auto max-w-2xl text-center">
      <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
        Featured Helmets
      </h2>
      <p className="mt-4 text-muted-foreground">
        Our top picks for the season.
      </p>
    </div>
    <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {/* Product cards */}
    </div>
    <div className="mt-12 text-center">
      <Button variant="outline">View All</Button>
    </div>
  </div>
</section>
```

### CTA Section
```tsx
<section className="bg-primary py-16 md:py-24">
  <div className="mx-auto max-w-4xl px-4 text-center md:px-6">
    <h2 className="text-3xl font-bold tracking-tight text-primary-foreground md:text-4xl">
      Ready to Upgrade Your Ride?
    </h2>
    <p className="mt-4 text-lg text-primary-foreground/80">
      Join thousands of satisfied riders.
    </p>
    <div className="mt-8">
      <Button variant="secondary" size="lg">
        Shop Now
      </Button>
    </div>
  </div>
</section>
```

---

## Metadata Pattern

```tsx
// Generate metadata for each page
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Premium Motorcycle Helmets | Helmet Pro',
  description: 'Discover our premium collection of motorcycle helmets. Safety meets style.',
  openGraph: {
    title: 'Premium Motorcycle Helmets | Helmet Pro',
    description: 'Discover our premium collection of motorcycle helmets.',
    images: ['/og-image.jpg'],
  },
}
```

For dynamic pages:
```tsx
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProduct(params.slug)

  return {
    title: `${product.name} | Helmet Pro`,
    description: product.description,
    openGraph: {
      images: [product.images[0]],
    },
  }
}
```

---

## Loading States

```tsx
// loading.tsx — per route segment
export default function ProductsLoading() {
  return (
    <main className="min-h-screen">
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-8 md:px-6">
          <div className="h-4 w-32 animate-pulse rounded bg-muted" />
          <div className="mt-4 h-10 w-64 animate-pulse rounded bg-muted" />
          <div className="mt-2 h-5 w-96 animate-pulse rounded bg-muted" />
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-8 md:px-6">
        <ProductGridSkeleton />
      </section>
    </main>
  )
}
```

---

## Error States

```tsx
// error.tsx — per route segment
'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function ProductsError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main className="flex min-h-[50vh] items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Something went wrong</h2>
        <p className="mt-2 text-muted-foreground">
          We couldn't load the products. Please try again.
        </p>
        <Button onClick={reset} className="mt-6">
          Try Again
        </Button>
      </div>
    </main>
  )
}
```

---

## Not Found State

```tsx
// not-found.tsx
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <main className="flex min-h-[60vh] items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold tracking-tight">404</h1>
        <h2 className="mt-4 text-2xl font-semibold">Page Not Found</h2>
        <p className="mt-2 text-muted-foreground">
          The page you're looking for doesn't exist.
        </p>
        <Button asChild className="mt-8">
          <Link href="/">Go Home</Link>
        </Button>
      </div>
    </main>
  )
}
```

---

## SEO & Performance Rules

- Each page must have unique `metadata` or `generateMetadata`
- Use `Suspense` boundaries for async content
- Implement proper heading hierarchy (single `h1`, sequential `h2`+)
- Use `next/image` with `priority` for above-the-fold images
- Keep initial bundle size small — defer non-critical components
- Use streaming SSR for data-heavy pages