import axios from "axios"

export interface WishlistItemRaw {
  id: string
  userId: string
  productId: string
  name: string
  price: number
  image: string
  inStock: boolean
  addedAt: string
}

export interface WishlistResponse {
  items: WishlistItemRaw[]
}

export function fetchWishlist(userId: string) {
  return axios.get<WishlistResponse>(`/api/wishlist?userId=${userId}`).then((r) => r.data)
}

export function addWishlistItem(data: {
  userId?: string
  productId: string
  name: string
  price: number
  image: string
}) {
  return axios.post<{ item: WishlistItemRaw }>("/api/wishlist/items", data).then((r) => r.data)
}

export function removeWishlistItem(id: string) {
  return axios.delete(`/api/wishlist/items/${id}`).then((r) => r.data)
}
