import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useAuthStore } from "@/stores/auth-store";
import {
  addCartItem as apiAddItem,
  updateCartItem as apiUpdateItem,
  removeCartItem as apiRemoveItem,
} from "@/features/cart/api/cart-api";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  slug?: string;
  quantity: number;
  variant?: string;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  setItems: (items: CartItem[]) => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  getItemCount: () => number;
  getTotal: () => number;
}

function isAuthenticated() {
  return useAuthStore.getState().isAuthenticated;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      setItems: (items) => set({ items }),

      addItem: (item) => {
        if (isAuthenticated()) {
          apiAddItem(item.id, 1, item.variant).catch(() => {});
        }
        set((state) => {
          const existing = state.items.find((i) => i.id === item.id);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i,
              ),
            };
          }
          return { items: [...state.items, { ...item, quantity: 1 }] };
        });
      },

      removeItem: (id) => {
        if (isAuthenticated()) {
          apiRemoveItem(id).catch(() => {});
        }
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        }));
      },

      updateQuantity: (id, quantity) => {
        if (isAuthenticated() && quantity > 0) {
          apiUpdateItem(id, quantity).catch(() => {});
        }
        set((state) => ({
          items:
            quantity <= 0
              ? state.items.filter((i) => i.id !== id)
              : state.items.map((i) =>
                  i.id === id ? { ...i, quantity } : i,
                ),
        }));
      },

      clearCart: () => {
        if (isAuthenticated()) {
          get().items.forEach((item) => {
            apiRemoveItem(item.id).catch(() => {});
          });
        }
        set({ items: [] });
      },

      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      getItemCount: () =>
        get().items.reduce((total, item) => total + item.quantity, 0),

      getTotal: () =>
        get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0,
        ),
    }),
    {
      name: "helmetpro-cart",
      partialize: (state) => ({ items: state.items }),
    },
  ),
);
