import { create } from "zustand"
import { getFilteredOrders } from "../order-data"
import {
  fetchAdminOrders,
  updateOrderStatus as apiUpdateStatus,
} from "@/features/admin/api/admin-api"
import type { AdminOrder, OrderFilters, OrderStatus } from "../types"

interface AdminOrdersState {
  items: AdminOrder[]
  loading: boolean
  setItems: (items: AdminOrder[]) => void
  fetchItems: () => Promise<void>
  updateOrderStatus: (orderId: string, newStatus: OrderStatus) => void
  getFiltered: (filters: OrderFilters) => AdminOrder[]
}

function mapRawToOrder(o: {
  id: string; orderNumber: string; customer: { name: string; email: string }
  items: { id: string; name: string; sku: string; quantity: number; price: number; image: string }[]
  total: number; subtotal: number; shipping: number; tax: number; status: string
  shippingAddress: Record<string, string>; paymentMethod: string; notes?: string
  createdAt: string; updatedAt: string
}): AdminOrder {
  return {
    id: o.id,
    orderNumber: o.orderNumber,
    customer: o.customer,
    items: o.items,
    total: o.total,
    subtotal: o.subtotal,
    shipping: o.shipping,
    tax: o.tax,
    status: o.status as OrderStatus,
    shippingAddress: o.shippingAddress as AdminOrder["shippingAddress"],
    paymentMethod: o.paymentMethod,
    notes: o.notes,
    createdAt: o.createdAt,
    updatedAt: o.updatedAt,
  }
}

export const useAdminOrdersStore = create<AdminOrdersState>()((set, get) => ({
  items: [],
  loading: false,

  setItems: (items) => set({ items }),

  fetchItems: async () => {
    set({ loading: true })
    try {
      const data = await fetchAdminOrders({ pageSize: "100" })
      set({ items: data.orders.map(mapRawToOrder), loading: false })
    } catch {
      set({ loading: false })
    }
  },

  updateOrderStatus: (orderId, newStatus) => {
    apiUpdateStatus(orderId, newStatus).catch(() => {})
    set((state) => ({
      items: state.items.map((o) =>
        o.id === orderId
          ? { ...o, status: newStatus, updatedAt: new Date().toISOString() }
          : o,
      ),
    }))
  },

  getFiltered: (filters) => getFilteredOrders(get().items, filters),
}))
