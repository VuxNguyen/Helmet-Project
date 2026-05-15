import { create } from "zustand"
import { adminOrders, getFilteredOrders } from "../order-data"
import type { AdminOrder, OrderFilters, OrderStatus } from "../types"

interface AdminOrdersState {
  items: AdminOrder[]
  updateOrderStatus: (orderId: string, newStatus: OrderStatus) => void
  getFiltered: (filters: OrderFilters) => AdminOrder[]
}

export const useAdminOrdersStore = create<AdminOrdersState>()((set, get) => ({
  items: adminOrders,

  updateOrderStatus: (orderId, newStatus) =>
    set((state) => ({
      items: state.items.map((o) =>
        o.id === orderId
          ? { ...o, status: newStatus, updatedAt: new Date().toISOString() }
          : o,
      ),
    })),

  getFiltered: (filters) => getFilteredOrders(get().items, filters),
}))
