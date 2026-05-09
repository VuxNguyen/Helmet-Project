export interface OrderItem {
  id: string
  name: string
  sku: string
  quantity: number
  price: number
  image: string
}

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled"

export interface AdminOrder {
  id: string
  orderNumber: string
  customer: {
    name: string
    email: string
    avatar?: string
  }
  items: OrderItem[]
  total: number
  subtotal: number
  shipping: number
  tax: number
  status: OrderStatus
  shippingAddress: {
    line1: string
    line2?: string
    city: string
    state: string
    zip: string
    country: string
  }
  paymentMethod: string
  notes?: string
  createdAt: string
  updatedAt: string
}

export type OrderStatusFilter = OrderStatus | null

export interface OrderFilters {
  search: string
  status: OrderStatusFilter
  dateFrom: string
  dateTo: string
}

export const STATUS_CONFIG: Record<OrderStatus, { label: string; color: string }> = {
  pending: { label: "Pending", color: "bg-amber-500/10 text-amber-500 border-amber-500/20" },
  confirmed: { label: "Confirmed", color: "bg-blue-500/10 text-blue-500 border-blue-500/20" },
  processing: { label: "Processing", color: "bg-violet-500/10 text-violet-500 border-violet-500/20" },
  shipped: { label: "Shipped", color: "bg-sky-500/10 text-sky-500 border-sky-500/20" },
  delivered: { label: "Delivered", color: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" },
  cancelled: { label: "Cancelled", color: "bg-destructive/10 text-destructive border-destructive/20" },
}

export const STATUS_OPTIONS = Object.entries(STATUS_CONFIG).map(([value, config]) => ({
  value: value as OrderStatus,
  label: config.label,
}))

export const STATUS_TRANSITIONS: Record<OrderStatus, OrderStatus[]> = {
  pending: ["confirmed", "cancelled"],
  confirmed: ["processing", "cancelled"],
  processing: ["shipped", "cancelled"],
  shipped: ["delivered", "cancelled"],
  delivered: [],
  cancelled: [],
}
