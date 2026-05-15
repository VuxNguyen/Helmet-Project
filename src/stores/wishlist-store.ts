import { create } from "zustand"
import { persist } from "zustand/middleware"
import { useAuthStore } from "@/stores/auth-store"
import {
  addWishlistItem as apiAddItem,
  removeWishlistItem as apiRemoveItem,
} from "@/features/wishlist/api/wishlist-api"

export interface WishlistItem {
  id: string
  name: string
  price: number
  image: string
  slug?: string
  wishlistItemId?: string
}

interface WishlistState {
  items: WishlistItem[]
  addItem: (item: WishlistItem) => void
  removeItem: (id: string) => void
  isWishlisted: (id: string) => boolean
  toggleItem: (item: WishlistItem) => void
  clearWishlist: () => void
  setItems: (items: WishlistItem[]) => void
}

function getAuth() {
  return useAuthStore.getState()
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],

      setItems: (items) => set({ items }),

      addItem: (item) => {
        const { isAuthenticated, user } = getAuth()
        if (isAuthenticated) {
          apiAddItem({
            userId: user?.id,
            productId: item.id,
            name: item.name,
            price: item.price,
            image: item.image,
          }).catch(() => {})
        }
        set((state) => {
          if (state.items.some((i) => i.id === item.id)) return state
          return { items: [...state.items, item] }
        })
      },

      removeItem: (id) => {
        const existing = get().items.find((i) => i.id === id)
        if (existing?.wishlistItemId) {
          apiRemoveItem(existing.wishlistItemId).catch(() => {})
        }
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        }))
      },

      isWishlisted: (id) => get().items.some((i) => i.id === id),

      toggleItem: (item: WishlistItem) => {
        const exists = get().items.some((i) => i.id === item.id)
        if (exists) {
          get().removeItem(item.id)
        } else {
          get().addItem(item)
        }
      },

      clearWishlist: () => set({ items: [] }),
    }),
    {
      name: "helmetpro-wishlist",
    },
  ),
)
