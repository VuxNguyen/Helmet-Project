import type { OrderStatus } from "../orders/types"

export type CustomerStatus = "active" | "inactive" | "blocked"

export interface CustomerOrder {
  id: string
  orderNumber: string
  total: number
  status: OrderStatus
  createdAt: string
  items: number
}

export interface AdminCustomer {
  id: string
  name: string
  email: string
  phone: string
  avatar?: string
  status: CustomerStatus
  totalOrders: number
  totalSpent: number
  averageOrderValue: number
  lastOrderDate: string
  createdAt: string
  city: string
  state: string
  country: string
  tags: string[]
  recentOrders: CustomerOrder[]
}

export type CustomerStatusFilter = CustomerStatus | null

export interface CustomerFilters {
  search: string
  status: CustomerStatusFilter
  minSpent: string
}

export const CUSTOMER_STATUS_CONFIG: Record<CustomerStatus, { label: string; color: string }> = {
  active: { label: "Active", color: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" },
  inactive: { label: "Inactive", color: "bg-muted text-muted-foreground border-border" },
  blocked: { label: "Blocked", color: "bg-destructive/10 text-destructive border-destructive/20" },
}

export const CUSTOMER_STATUS_OPTIONS = Object.entries(CUSTOMER_STATUS_CONFIG).map(
  ([value, config]) => ({
    value: value as CustomerStatus,
    label: config.label,
  }),
)
