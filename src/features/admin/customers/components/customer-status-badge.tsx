import { Badge } from "@/components/ui/badge"
import { CUSTOMER_STATUS_CONFIG, type CustomerStatus } from "../types"

interface CustomerStatusBadgeProps {
  status: CustomerStatus
}

export function CustomerStatusBadge({ status }: CustomerStatusBadgeProps) {
  const config = CUSTOMER_STATUS_CONFIG[status]

  return (
    <Badge variant="outline" className={config.color}>
      <span className={`mr-1.5 h-1.5 w-1.5 rounded-full ${getDotColor(status)}`} />
      {config.label}
    </Badge>
  )
}

function getDotColor(status: CustomerStatus): string {
  switch (status) {
    case "active":
      return "bg-emerald-500"
    case "inactive":
      return "bg-muted-foreground"
    case "blocked":
      return "bg-destructive"
  }
}
