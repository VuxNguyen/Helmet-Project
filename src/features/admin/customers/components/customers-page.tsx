"use client"

import { useState, useMemo, useCallback, useEffect } from "react"
import { CustomersToolbar } from "./customers-toolbar"
import { CustomersTable } from "./customers-table"
import { CustomerDetailsDrawer } from "./customer-details-drawer"
import { useAdminCustomersStore } from "../stores/admin-customers-store"
import type { AdminCustomer, CustomerStatus } from "../types"

export function CustomersPage() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState<CustomerStatus | null>(null)
  const [minSpent, setMinSpent] = useState("")
  const [selectedCustomer, setSelectedCustomer] = useState<AdminCustomer | null>(null)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const getFiltered = useAdminCustomersStore((s) => s.getFiltered)
  const fetchItems = useAdminCustomersStore((s) => s.fetchItems)

  useEffect(() => {
    fetchItems()
  }, [fetchItems])

  const filteredCustomers = useMemo(
    () =>
      getFiltered({
        search,
        status: statusFilter,
        minSpent,
      }),
    [search, statusFilter, minSpent, getFiltered],
  )

  const handleViewDetails = useCallback((customer: AdminCustomer) => {
    setSelectedCustomer(customer)
    setDrawerOpen(true)
  }, [])

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold tracking-tight">Customers</h2>
        <p className="text-sm text-muted-foreground">
          View and manage your customer base.
        </p>
      </div>

      <CustomersToolbar
        search={search}
        onSearchChange={setSearch}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        minSpent={minSpent}
        onMinSpentChange={setMinSpent}
      />

      <CustomersTable
        data={filteredCustomers}
        onViewDetails={handleViewDetails}
      />

      <CustomerDetailsDrawer
        customer={selectedCustomer}
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
      />
    </div>
  )
}
