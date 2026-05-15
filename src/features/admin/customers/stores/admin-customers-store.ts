import { create } from "zustand"
import { adminCustomers, getFilteredCustomers } from "../customer-data"
import type { AdminCustomer, CustomerFilters } from "../types"

interface AdminCustomersState {
  items: AdminCustomer[]
  getFiltered: (filters: CustomerFilters) => AdminCustomer[]
}

export const useAdminCustomersStore = create<AdminCustomersState>()((set, get) => ({
  items: adminCustomers,

  getFiltered: (filters) => getFilteredCustomers(get().items, filters),
}))
