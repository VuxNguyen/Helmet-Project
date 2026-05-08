import { Skeleton } from "@/components/ui/skeleton"

export default function ProductDetailLoading() {
  return (
    <main className="min-h-screen">
      {/* Product Hero Loading */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-4 md:px-6">
          <div className="h-4 w-24 animate-pulse rounded bg-muted" />
        </div>

        <div className="mx-auto max-w-7xl px-4 pb-8 md:px-6 md:pb-12">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12 xl:gap-16">
            {/* Gallery skeleton */}
            <div className="space-y-4">
              <div className="aspect-square animate-pulse rounded-xl bg-muted" />
              <div className="flex gap-3">
                {Array.from({ length: 4 }, (_, i) => (
                  <div
                    key={i}
                    className="aspect-square w-full max-w-[100px] animate-pulse rounded-lg bg-muted"
                  />
                ))}
              </div>
            </div>

            {/* Info skeleton */}
            <div className="space-y-6">
              <div className="h-3 w-16 animate-pulse rounded bg-muted" />
              <div className="h-8 w-3/4 animate-pulse rounded bg-muted" />
              <div className="h-4 w-full animate-pulse rounded bg-muted" />
              <div className="h-4 w-2/3 animate-pulse rounded bg-muted" />
              <div className="h-6 w-32 animate-pulse rounded bg-muted" />
              <div className="h-10 w-full animate-pulse rounded-lg bg-muted" />
              <div className="h-10 w-full animate-pulse rounded-lg bg-muted" />
              <div className="grid grid-cols-3 gap-3">
                {Array.from({ length: 3 }, (_, i) => (
                  <div key={i} className="h-16 animate-pulse rounded-xl bg-muted" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Description skeleton */}
      <section className="bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
          <div className="space-y-4">
            <div className="flex gap-6">
              <div className="h-8 w-28 animate-pulse rounded bg-muted" />
              <div className="h-8 w-28 animate-pulse rounded bg-muted" />
            </div>
            <div className="h-4 w-full animate-pulse rounded bg-muted" />
            <div className="h-4 w-full animate-pulse rounded bg-muted" />
            <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
          </div>
        </div>
      </section>

      {/* Reviews skeleton */}
      <section>
        <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
          <div className="h-8 w-48 animate-pulse rounded bg-muted" />
          <div className="mt-6 space-y-4">
            {Array.from({ length: 3 }, (_, i) => (
              <div key={i} className="flex gap-3">
                <div className="size-10 animate-pulse rounded-full bg-muted" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-32 animate-pulse rounded bg-muted" />
                  <div className="h-3 w-24 animate-pulse rounded bg-muted" />
                  <div className="h-4 w-full animate-pulse rounded bg-muted" />
                  <div className="h-4 w-2/3 animate-pulse rounded bg-muted" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related products skeleton */}
      <section>
        <div className="mx-auto max-w-7xl px-4 py-12 md:px-6">
          <div className="h-8 w-56 animate-pulse rounded bg-muted" />
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {Array.from({ length: 4 }, (_, i) => (
              <div key={i} className="space-y-3">
                <div className="aspect-square animate-pulse rounded-xl bg-muted" />
                <div className="h-3 w-12 animate-pulse rounded bg-muted" />
                <div className="h-4 w-full animate-pulse rounded bg-muted" />
                <div className="h-5 w-16 animate-pulse rounded bg-muted" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}