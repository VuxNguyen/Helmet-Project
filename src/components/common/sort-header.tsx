"use client"

import { ChevronDown, ChevronUp, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Column } from "@tanstack/react-table"

interface SortHeaderProps<TData extends object> {
  column: Column<TData, unknown>
  children: React.ReactNode
  className?: string
}

export function SortHeader<TData extends object>({
  column,
  children,
  className,
}: SortHeaderProps<TData>) {
  const sorted = column.getIsSorted()

  return (
    <button
      onClick={() => column.toggleSorting(sorted === "asc")}
      className={cn(
        "flex items-center gap-1 text-xs font-medium uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors",
        className,
      )}
    >
      {children}
      {sorted === "asc" ? (
        <ChevronUp className="h-3 w-3" />
      ) : sorted === "desc" ? (
        <ChevronDown className="h-3 w-3" />
      ) : (
        <ChevronsUpDown className="h-3 w-3 opacity-50" />
      )}
    </button>
  )
}
