import axios from "axios"

/* ───── Stats ───── */

export interface AdminStats {
  totalRevenue: number
  totalOrders: number
  totalCustomers: number
  conversionRate: number
  revenueChange: number
  ordersChange: number
  customersChange: number
  conversionChange: number
  recentOrders: { id: string; orderNumber: string; total: number; status: string; createdAt: string; customer: { name: string; email: string } }[]
  lowStockProducts: { id: string; name: string; stock: number }[]
}

export function fetchAdminStats() {
  return axios.get<AdminStats>("/api/admin/stats").then((r) => r.data)
}

/* ───── Products ───── */

export interface AdminProductRaw {
  id: string
  name: string
  sku: string
  brand: string
  category: string
  price: number
  originalPrice?: number
  stock: number
  status: "active" | "draft" | "archived"
  rating: number
  reviewCount: number
  createdAt: string
  image: string
  description?: string
}

export interface AdminProductsResponse {
  products: AdminProductRaw[]
  pagination: { page: number; pageSize: number; total: number; totalPages: number }
}

export function fetchAdminProducts(params?: Record<string, string>) {
  return axios.get<AdminProductsResponse>("/api/admin/products", { params }).then((r) => r.data)
}

export function createAdminProduct(data: Record<string, unknown>) {
  return axios.post<{ product: AdminProductRaw }>("/api/admin/products", data).then((r) => r.data)
}

export function updateAdminProduct(id: string, data: Record<string, unknown>) {
  return axios.put<{ product: AdminProductRaw }>(`/api/admin/products/${id}`, data).then((r) => r.data)
}

export function deleteAdminProduct(id: string) {
  return axios.delete(`/api/admin/products/${id}`).then((r) => r.data)
}

/* ───── Orders ───── */

export interface AdminOrderRaw {
  id: string
  orderNumber: string
  customer: { name: string; email: string }
  items: { id: string; name: string; sku: string; quantity: number; price: number; image: string }[]
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

export interface AdminOrdersResponse {
  orders: AdminOrderRaw[]
  pagination: { page: number; pageSize: number; total: number; totalPages: number }
}

export function fetchAdminOrders(params?: Record<string, string>) {
  return axios.get<AdminOrdersResponse>("/api/admin/orders", { params }).then((r) => r.data)
}

export function updateOrderStatus(id: string, status: string) {
  return axios.patch(`/api/admin/orders/${id}/status`, { status }).then((r) => r.data)
}

/* ───── Customers ───── */

export interface AdminCustomerRaw {
  id: string
  name: string
  email: string
  phone: string
  status: "active" | "inactive" | "blocked"
  totalOrders: number
  totalSpent: number
  city: string
  state: string
  country: string
  tags: string[]
  createdAt: string
}

export interface AdminCustomersResponse {
  customers: AdminCustomerRaw[]
  pagination: { page: number; pageSize: number; total: number; totalPages: number }
}

export function fetchAdminCustomers(params?: Record<string, string>) {
  return axios.get<AdminCustomersResponse>("/api/admin/customers", { params }).then((r) => r.data)
}

export function fetchAdminCustomerById(id: string) {
  return axios.get<{ customer: AdminCustomerRaw }>(`/api/admin/customers/${id}`).then((r) => r.data)
}
