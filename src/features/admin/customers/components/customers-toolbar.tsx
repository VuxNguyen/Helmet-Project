"use client"

import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useTranslations } from "@/hooks/use-translations"
import { CUSTOMER_STATUS_OPTIONS, type CustomerStatus } from "../types"

interface CustomersToolbarProps {
  search: string
  onSearchChange: (value: string) => void
  statusFilter: CustomerStatus | null
  onStatusChange: (value: CustomerStatus | null) => void
  minSpent: string
  onMinSpentChange: (value: string) => void
}

export function CustomersToolbar({
  search,
  onSearchChange,
  statusFilter,
  onStatusChange,
  minSpent,
  onMinSpentChange,
}: CustomersToolbarProps) {
  const { t } = useTranslations()
  const hasActiveFilters = statusFilter || minSpent

  const handleClear = () => {
    onStatusChange(null)
    onMinSpentChange("")
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 items-center gap-3">
          <div className="relative flex-1 sm:max-w-xs">
            <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder={t("admin.customers.searchPlaceholder")}
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              className="h-8 w-full pl-8 text-xs"
            />
            {search && (
              <button
                onClick={() => onSearchChange("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          <div className="hidden items-center gap-2 sm:flex">
            <Select
              value={statusFilter ?? "all"}
              onValueChange={(v) => onStatusChange(v === "all" ? null : v as CustomerStatus)}
            >
              <SelectTrigger className="h-8 w-[130px] text-xs">
                <SelectValue placeholder={t("admin.customers.allStatus")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t("admin.customers.allStatus")}</SelectItem>
                {CUSTOMER_STATUS_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="relative w-[130px]">
              <Input
                placeholder="Min spent"
                type="number"
                min={0}
                value={minSpent}
                onChange={(e) => onMinSpentChange(e.target.value)}
                className="h-8 pl-7 text-xs"
              />
              <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-muted-foreground pointer-events-none">
                $
              </span>
            </div>

            {hasActiveFilters && (
              <button
                onClick={handleClear}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                {t("admin.customers.clearFilters")}
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 sm:hidden">
        <Select
          value={statusFilter ?? "all"}
          onValueChange={(v) => onStatusChange(v === "all" ? null : v as CustomerStatus)}
        >
          <SelectTrigger className="h-8 w-[130px] text-xs">
            <SelectValue placeholder={t("admin.customers.allStatus")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t("admin.customers.allStatus")}</SelectItem>
            {CUSTOMER_STATUS_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {hasActiveFilters && (
          <button
            onClick={handleClear}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            {t("admin.customers.clearFilters")}
          </button>
        )}
      </div>
    </div>
  )
}
