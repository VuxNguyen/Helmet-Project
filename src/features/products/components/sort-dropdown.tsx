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

const SORT_LABEL_KEYS: Record<string, string> = {
  featured: "products_ext.sortOptions.featured",
  newest: "products_ext.sortOptions.newest",
  "price-asc": "products_ext.sortOptions.priceAsc",
  "price-desc": "products_ext.sortOptions.priceDesc",
  "name-asc": "products_ext.sortOptions.nameAsc",
  "name-desc": "products_ext.sortOptions.nameDesc",
  rating: "products_ext.sortOptions.topRated",
}

export function SortDropdown() {
  const { t } = useTranslations()
  const sort = useFilterStore((s) => s.sort)
  const setSort = useFilterStore((s) => s.setSort)

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
            {currentOption ? t(SORT_LABEL_KEYS[currentOption.value]) : ""}
          </span>
          <span className="sm:hidden">{t("products.sort")}</span>
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
                {t(SORT_LABEL_KEYS[option.value])}
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