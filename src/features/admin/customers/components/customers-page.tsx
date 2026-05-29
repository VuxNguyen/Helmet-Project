"use client"

import { useState, useMemo, useCallback, useEffect } from "react"
import { CustomersToolbar } from "./customers-toolbar"
import { CustomersTable } from "./customers-table"
import { CustomerDetailsDrawer } from "./customer-details-drawer"
import { useAdminCustomersStore } from "../stores/admin-customers-store"
import { getFilteredCustomers } from "../customer-data"
import { useTranslations } from "@/hooks/use-translations"
import type { AdminCustomer, CustomerStatus } from "../types"

export function CustomersPage() {
  const { t } = useTranslations()
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState<CustomerStatus | null>(null)
  const [minSpent, setMinSpent] = useState("")
  const [selectedCustomer, setSelectedCustomer] = useState<AdminCustomer | null>(null)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const items = useAdminCustomersStore((s) => s.items)
  const fetchItems = useAdminCustomersStore((s) => s.fetchItems)

  useEffect(() => {
    fetchItems()
  }, [fetchItems])

  const filteredCustomers = useMemo(
    () =>
      getFilteredCustomers(items, {
        search,
        status: statusFilter,
        minSpent,
      }),
    [search, statusFilter, minSpent, items],
  )

  const handleViewDetails = useCallback((customer: AdminCustomer) => {
    setSelectedCustomer(customer)
    setDrawerOpen(true)
  }, [])

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold tracking-tight">{t("admin.customers.title")}</h2>
        <p className="text-sm text-muted-foreground">
          {t("admin.customers.description")}
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
