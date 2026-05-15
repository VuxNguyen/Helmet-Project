"use client"

import { useEffect, useRef } from "react"
import { useAuthStore } from "@/stores/auth-store"
import { useWishlistStore } from "@/stores/wishlist-store"
import { fetchWishlist } from "@/features/wishlist/api/wishlist-api"

export function useWishlistSync() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  const user = useAuthStore((s) => s.user)
  const setItems = useWishlistStore((s) => s.setItems)
  const prevAuthRef = useRef(isAuthenticated)

  useEffect(() => {
    const becameAuthenticated = isAuthenticated && !prevAuthRef.current

    if (becameAuthenticated && user?.id) {
      fetchWishlist(user.id)
        .then((data) => {
          setItems(
            data.items.map((i) => ({
              id: i.productId,
              name: i.name,
              price: i.price,
              image: i.image,
              wishlistItemId: i.id,
            })),
          )
        })
        .catch(() => {})
    }

    prevAuthRef.current = isAuthenticated
  }, [isAuthenticated, user?.id, setItems])
}
