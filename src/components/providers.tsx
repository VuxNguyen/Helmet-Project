"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useState } from "react"
import { useCartSync } from "@/features/cart/hooks/use-cart-sync"
import { useWishlistSync } from "@/features/wishlist/hooks/use-wishlist-sync"
import { useAddressesSync } from "@/features/addresses/hooks/use-addresses-sync"

function CartSync() {
  useCartSync()
  return null
}

function WishlistSync() {
  useWishlistSync()
  return null
}

function AddressesSync() {
  useAddressesSync()
  return null
}

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: { staleTime: 60 * 1000 },
        },
      }),
  )

  return (
    <QueryClientProvider client={queryClient}>
      <CartSync />
      <WishlistSync />
      <AddressesSync />
      {children}
    </QueryClientProvider>
  )
}
