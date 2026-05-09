import { cn } from "@/lib/utils"
import { type ProductStatus } from "../types"

const statusStyles: Record<ProductStatus, string> = {
  active: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  draft: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  archived: "bg-muted text-muted-foreground border-border",
}

const statusLabels: Record<ProductStatus, string> = {
  active: "Active",
  draft: "Draft",
  archived: "Archived",
}

interface ProductStatusBadgeProps {
  status: ProductStatus
}

export function ProductStatusBadge({ status }: ProductStatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex h-5 items-center rounded-full border px-2 text-xs font-medium",
        statusStyles[status],
      )}
    >
      <span
        className={cn(
          "mr-1.5 h-1.5 w-1.5 rounded-full",
          status === "active" && "bg-emerald-500",
          status === "draft" && "bg-amber-500",
          status === "archived" && "bg-muted-foreground",
        )}
      />
      {statusLabels[status]}
    </span>
  )
}
