import { Skeleton } from "@/components/ui/skeleton";

export default function CartPageLoading() {
  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:py-12">
        {/* Page Header Skeleton */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="h-4 w-32 animate-pulse rounded bg-muted" />
            <div className="mt-2 h-8 w-48 animate-pulse rounded bg-muted sm:h-9" />
            <div className="mt-1 h-4 w-36 animate-pulse rounded bg-muted" />
          </div>
          <div className="mt-4 flex items-center gap-3 sm:mt-0">
            <div className="h-9 w-28 animate-pulse rounded-lg bg-muted" />
            <div className="h-9 w-40 animate-pulse rounded-lg bg-muted" />
          </div>
        </div>

        {/* Separator */}
        <div className="my-6 h-px w-full animate-pulse bg-muted" />

        {/* Cart Content Skeleton */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_380px]">
          {/* Cart Items */}
          <div className="space-y-4">
            <div className="mb-4 h-4 w-32 animate-pulse rounded bg-muted" />

            {Array.from({ length: 3 }, (_, i) => (
              <div
                key={i}
                className="flex gap-4 border-b border-border pb-4 sm:gap-5"
              >
                <div className="h-24 w-24 flex-shrink-0 animate-pulse rounded-lg bg-muted sm:h-28 sm:w-28" />
                <div className="flex flex-1 flex-col justify-between gap-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 space-y-2">
                      <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
                      <div className="h-3 w-20 animate-pulse rounded bg-muted" />
                    </div>
                    <div className="h-8 w-8 animate-pulse rounded bg-muted" />
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <div className="h-8 w-28 animate-pulse rounded-lg bg-muted" />
                    <div className="space-y-1">
                      <div className="h-5 w-20 animate-pulse rounded bg-muted" />
                      <div className="h-3 w-14 animate-pulse rounded bg-muted" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary Skeleton */}
          <div className="rounded-xl border border-border bg-card p-5 sm:p-6">
            <div className="h-5 w-32 animate-pulse rounded bg-muted" />
            <div className="mt-4 h-16 animate-pulse rounded-lg bg-muted" />
            <div className="mt-5 space-y-3">
              {Array.from({ length: 4 }, (_, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="h-4 w-24 animate-pulse rounded bg-muted" />
                  <div className="h-4 w-16 animate-pulse rounded bg-muted" />
                </div>
              ))}
              <div className="my-2 h-px w-full animate-pulse bg-muted" />
              <div className="flex items-center justify-between">
                <div className="h-5 w-16 animate-pulse rounded bg-muted" />
                <div className="h-6 w-24 animate-pulse rounded bg-muted" />
              </div>
            </div>
            <div className="mt-6 h-11 w-full animate-pulse rounded-lg bg-muted" />
          </div>
        </div>
      </div>
    </main>
  );
}