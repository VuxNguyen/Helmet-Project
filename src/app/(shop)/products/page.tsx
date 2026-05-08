import Link from "next/link"
import { Suspense } from "react"
import type { Metadata } from "next"
import { ProductsListingClient } from "./products-listing-client"

export const metadata: Metadata = {
  title: "Premium Motorcycle Helmets | Helmet Pro",
  description:
    "Browse our premium collection of motorcycle helmets. Filter by category, brand, price, and more to find your perfect helmet.",
  openGraph: {
    title: "Premium Motorcycle Helmets | Helmet Pro",
    description: "Browse our premium collection of motorcycle helmets.",
  },
}

function ProductsListingSkeleton() {
  return (
    <div className="space-y-8">
      {/* Toolbar skeleton */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="h-10 w-full max-w-md animate-pulse rounded-lg bg-muted" />
        <div className="flex items-center gap-3">
          <div className="h-9 w-24 animate-pulse rounded-lg bg-muted" />
          <div className="h-9 w-24 animate-pulse rounded-lg bg-muted lg:hidden" />
        </div>
      </div>

      {/* Grid skeleton */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="overflow-hidden rounded-xl border border-border">
            <div className="aspect-square animate-pulse bg-muted" />
            <div className="space-y-2 p-4 sm:p-5">
              <div className="h-3 w-16 animate-pulse rounded bg-muted" />
              <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
              <div className="h-3 w-24 animate-pulse rounded bg-muted" />
              <div className="h-5 w-20 animate-pulse rounded bg-muted" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default async function ProductsPage() {
  return (
    <main className="min-h-screen">
      {/* Page Header */}
      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 lg:px-8">
          <div className="flex flex-col gap-2">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-foreground transition-colors">
                Home
              </Link>
              <span aria-hidden="true" className="text-muted-foreground/50">/</span>
              <span className="text-foreground font-medium">Products</span>
            </nav>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              All Helmets
            </h1>
            <p className="text-base text-muted-foreground">
              Discover our premium collection of motorcycle helmets. Safety meets style.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="mx-auto max-w-7xl px-4 py-8 md:px-6 lg:px-8">
        <Suspense fallback={<ProductsListingSkeleton />}>
          <ProductsListingClient />
        </Suspense>
      </section>
    </main>
  )
}
