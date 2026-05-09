import { Badge } from "@/components/ui/badge"
import { STATUS_CONFIG, type OrderStatus } from "../types"

interface OrderStatusBadgeProps {
  status: OrderStatus
}

export function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
  const config = STATUS_CONFIG[status]

  return (
    <Badge variant="outline" className={config.color}>
      {config.label}
    </Badge>
  )
}
