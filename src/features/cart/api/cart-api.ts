import axios from "axios"
import type { CartItem } from "@/stores/cart-store"

export interface CartResponse {
  items: CartItem[]
  total: number
}

export function fetchCart() {
  return axios.get<CartResponse>("/api/cart").then((r) => r.data)
}

export function addCartItem(productId: string, quantity: number, variant?: string) {
  return axios.post<CartResponse>("/api/cart/items", { productId, quantity, variant }).then((r) => r.data)
}

export function updateCartItem(id: string, quantity: number) {
  return axios.patch<CartResponse>(`/api/cart/items/${id}`, { quantity }).then((r) => r.data)
}

export function removeCartItem(id: string) {
  return axios.delete<CartResponse>(`/api/cart/items/${id}`).then((r) => r.data)
}
