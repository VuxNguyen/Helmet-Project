"use client"

import { useRef, useEffect } from "react"
import { useFilterStore } from "../stores/filter-store"
import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useTranslations } from "@/hooks/use-translations"

export function SearchBar() {
  const { t } = useTranslations()
  const search = useFilterStore((s) => s.search)
  const setSearch = useFilterStore((s) => s.setSearch)
  const inputRef = useRef<HTMLInputElement>(null)

  // Handle keyboard shortcut: Ctrl+K or Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        inputRef.current?.focus()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  return (
    <div className="relative w-full max-w-md">
      <Search
        size={16}
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
      />
      <Input
        ref={inputRef}
        type="search"
        placeholder={t("products.searchPlaceholder")}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="h-10 rounded-lg border-border bg-muted/50 pl-9 pr-16 text-sm placeholder:text-muted-foreground/60 focus-visible:bg-background"
      />
      {search && (
        <button
          onClick={() => setSearch("")}
          className="absolute right-9 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          aria-label={t("products_ext.clearSearch")}
        >
          <X size={14} />
        </button>
      )}
      <kbd className="pointer-events-none absolute right-2.5 top-1/2 hidden -translate-y-1/2 items-center gap-0.5 rounded border border-border bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground/60 sm:flex">
        <span className="text-[9px]">⌘</span>K
      </kbd>
    </div>
  )
}