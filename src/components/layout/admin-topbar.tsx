"use client"

import { useAdminStore } from "@/stores/admin-store"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  Menu,
  Search,
  Bell,
  ChevronDown,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface AdminTopbarProps {
  title?: string
}

export function AdminTopbar({ title }: AdminTopbarProps) {
  const { openMobileSidebar } = useAdminStore()

  return (
    <header className="sticky top-0 z-20 flex h-14 items-center gap-4 border-b border-border bg-background/80 px-4 backdrop-blur-md sm:px-6">
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden"
        onClick={openMobileSidebar}
        aria-label="Open menu"
      >
        <Menu className="h-4 w-4" />
      </Button>

      <div className="flex items-center gap-2 min-w-0">
        <h1 className="text-sm font-semibold tracking-tight truncate">
          {title || "Dashboard"}
        </h1>
      </div>

      <div className="flex items-center gap-2 ml-auto">
        <div className="relative hidden sm:block">
          <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search..."
            className={cn(
              "h-8 w-40 rounded-lg border border-input bg-background pl-8 pr-3 text-xs",
              "placeholder:text-muted-foreground",
              "focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring",
              "transition-colors",
            )}
          />
        </div>

        <Button variant="ghost" size="icon" className="relative" aria-label="Notifications">
          <Bell className="h-4 w-4" />
          <span className="absolute right-1.5 top-1.5 flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-destructive opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-destructive" />
          </span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="default" className="gap-2 px-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                A
              </div>
              <span className="hidden text-sm font-medium sm:inline">Admin</span>
              <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem>
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
