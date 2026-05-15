/**
 * Wishlist store — Zustand
 * Manages wishlist state.
 */

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
  slug?: string;
}

interface WishlistState {
  items: WishlistItem[];
  addItem: (item: WishlistItem) => void;
  removeItem: (id: string) => void;
  isWishlisted: (id: string) => boolean;
  toggleItem: (item: WishlistItem) => void;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) =>
        set((state) => {
          if (state.items.some((i) => i.id === item.id)) return state;
          return { items: [...state.items, item] };
        }),

      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        })),

      isWishlisted: (id) => get().items.some((i) => i.id === id),

      toggleItem: (item: WishlistItem) => {
        const exists = get().items.some((i) => i.id === item.id);
        if (exists) {
          set((state) => ({
            items: state.items.filter((i) => i.id !== item.id),
          }));
        } else {
          set((state) => ({ items: [...state.items, item] }));
        }
      },

      clearWishlist: () => set({ items: [] }),
    }),
    {
      name: "helmetpro-wishlist",
    },
  ),
);