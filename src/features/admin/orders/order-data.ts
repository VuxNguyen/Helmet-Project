import type { AdminOrder, OrderFilters } from "./types"

export function getFilteredOrders(
  orders: AdminOrder[],
  filters: OrderFilters,
): AdminOrder[] {
  return orders.filter((order) => {
    if (filters.search) {
      const q = filters.search.toLowerCase()
      const match =
        order.orderNumber.toLowerCase().includes(q) ||
        order.customer.name.toLowerCase().includes(q) ||
        order.customer.email.toLowerCase().includes(q)
      if (!match) return false
    }

    if (filters.status && order.status !== filters.status) {
      return false
    }

    if (filters.dateFrom && new Date(order.createdAt) < new Date(filters.dateFrom)) {
      return false
    }

    if (filters.dateTo && new Date(order.createdAt) > new Date(filters.dateTo)) {
      return false
    }

    return true
  })
}