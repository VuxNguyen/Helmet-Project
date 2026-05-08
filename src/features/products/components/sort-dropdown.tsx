"use client"

import { useFilterStore } from "../stores/filter-store"
import { SORT_OPTIONS, type SortOption } from "../types/product-listing"
import { ArrowUpDown, Check, ChevronDown } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { useTranslations } from "@/hooks/use-translations"

export function SortDropdown() {
  const sort = useFilterStore((s) => s.sort)
  const setSort = useFilterStore((s) => s.setSort)
  const { locale } = useTranslations()

  const currentOption = SORT_OPTIONS.find((opt) => opt.value === sort)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 text-sm font-normal"
        >
          <ArrowUpDown size={14} className="text-muted-foreground" />
          <span className="hidden sm:inline">
            {locale === "vi" ? currentOption?.labelVi : currentOption?.labelEn}
          </span>
          <span className="sm:hidden">Sort</span>
          <ChevronDown size={12} className="text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuRadioGroup
          value={sort}
          onValueChange={(value) => setSort(value as SortOption)}
        >
          {SORT_OPTIONS.map((option) => (
            <DropdownMenuRadioItem
              key={option.value}
              value={option.value}
              className="cursor-pointer"
            >
              <span className="flex-1">
                {locale === "vi" ? option.labelVi : option.labelEn}
              </span>
              {sort === option.value && (
                <Check size={14} className="ml-2 shrink-0" />
              )}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}