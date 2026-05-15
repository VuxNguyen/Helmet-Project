import axios from "axios"

export interface OrderItem {
  id: string
  name: string
  sku: string
  quantity: number
  price: number
  image: string
}

export interface Order {
  id: string
  orderNumber: string
  userId: string
  customer: { name: string; email: string }
  items: OrderItem[]
  total: number
  subtotal: number
  shipping: number
  tax: number
  status: string
  shippingAddress: Record<string, string>
  paymentMethod: string
  notes?: string
  createdAt: string
  updatedAt: string
}

export interface OrdersResponse {
  orders: Order[]
  pagination: { page: number; pageSize: number; total: number; totalPages: number }
}

export function fetchOrders(userId: string) {
  return axios.get<OrdersResponse>(`/api/orders?userId=${userId}`).then((r) => r.data)
}
