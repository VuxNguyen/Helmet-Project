"use client"

import { useFilterStore } from "../stores/filter-store"
import { FilterSidebar } from "./filter-sidebar"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { SlidersHorizontal, X } from "lucide-react"

export function MobileFilterDrawer() {
  const isFilterDrawerOpen = useFilterStore((s) => s.isFilterDrawerOpen)
  const openFilterDrawer = useFilterStore((s) => s.openFilterDrawer)
  const closeFilterDrawer = useFilterStore((s) => s.closeFilterDrawer)
  const activeFilterCount = useFilterStore((s) => s.activeFilterCount)

  return (
    <Sheet open={isFilterDrawerOpen} onOpenChange={(open) => (open ? openFilterDrawer() : closeFilterDrawer())}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 lg:hidden"
          onClick={openFilterDrawer}
        >
          <SlidersHorizontal size={14} />
          Filters
          {activeFilterCount > 0 && (
            <span className="flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
              {activeFilterCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-full max-w-sm overflow-y-auto p-0">
        <SheetHeader className="sticky top-0 z-10 border-b border-border bg-background px-4 py-4">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-sm font-semibold uppercase tracking-wider">
              Filters
            </SheetTitle>
            <button
              onClick={closeFilterDrawer}
              className="flex size-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <X size={16} />
            </button>
          </div>
        </SheetHeader>
        <div className="px-4 py-6">
          <FilterSidebar />
        </div>
      </SheetContent>
    </Sheet>
  )
}