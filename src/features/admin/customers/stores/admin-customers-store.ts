import { create } from "zustand"
import { getFilteredCustomers } from "../customer-data"
import { fetchAdminCustomers } from "@/features/admin/api/admin-api"
import type { AdminCustomer, CustomerFilters } from "../types"

interface AdminCustomersState {
  items: AdminCustomer[]
  loading: boolean
  setItems: (items: AdminCustomer[]) => void
  fetchItems: () => Promise<void>
  getFiltered: (filters: CustomerFilters) => AdminCustomer[]
}

function mapRawToCustomer(c: {
  id: string; name: string; email: string; phone: string
  status: string; totalOrders: number; totalSpent: number
  city: string; state: string; country: string
  tags: string[]; createdAt: string
}): AdminCustomer {
  return {
    id: c.id,
    name: c.name,
    email: c.email,
    phone: c.phone,
    avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(c.name)}`,
    status: c.status as AdminCustomer["status"],
    totalOrders: c.totalOrders,
    totalSpent: c.totalSpent,
    city: c.city,
    state: c.state,
    tags: c.tags,
    country: c.country,
    averageOrderValue: c.totalOrders > 0 ? c.totalSpent / c.totalOrders : 0,
    lastOrderDate: c.createdAt,
    recentOrders: [],
    createdAt: c.createdAt,
  }
}

export const useAdminCustomersStore = create<AdminCustomersState>()((set, get) => ({
  items: [],
  loading: false,

  setItems: (items) => set({ items }),

  fetchItems: async () => {
    set({ loading: true })
    try {
      const data = await fetchAdminCustomers({ pageSize: "100" })
      set({ items: data.customers.map(mapRawToCustomer), loading: false })
    } catch {
      set({ loading: false })
    }
  },

  getFiltered: (filters) => getFilteredCustomers(get().items, filters),
}))
