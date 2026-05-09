"use client"

import { useState, useMemo, useCallback } from "react"
import { CustomersToolbar } from "./customers-toolbar"
import { CustomersTable } from "./customers-table"
import { CustomerDetailsDrawer } from "./customer-details-drawer"
import { adminCustomers, getFilteredCustomers } from "../customer-data"
import type { AdminCustomer, CustomerStatus } from "../types"

export function CustomersPage() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState<CustomerStatus | null>(null)
  const [minSpent, setMinSpent] = useState("")
  const [selectedCustomer, setSelectedCustomer] = useState<AdminCustomer | null>(null)
  const [drawerOpen, setDrawerOpen] = useState(false)

  const filteredCustomers = useMemo(
    () =>
      getFilteredCustomers(adminCustomers, {
        search,
        status: statusFilter,
        minSpent,
      }),
    [search, statusFilter, minSpent],
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
