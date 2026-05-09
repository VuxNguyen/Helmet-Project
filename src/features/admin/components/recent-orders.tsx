import { Badge } from "@/components/ui/badge"

const orders = [
  {
    id: "ORD-001",
    customer: "Alice Johnson",
    product: "Full Face Helmet Pro",
    status: "completed" as const,
    total: "$350.00",
    date: "2 min ago",
  },
  {
    id: "ORD-002",
    customer: "Bob Smith",
    product: "Modular Adventure",
    status: "processing" as const,
    total: "$520.00",
    date: "15 min ago",
  },
  {
    id: "ORD-003",
    customer: "Carol Davis",
    product: "Open Face Classic",
    status: "pending" as const,
    total: "$180.00",
    date: "1 hour ago",
  },
  {
    id: "ORD-004",
    customer: "David Wilson",
    product: "Dual Sport Elite",
    status: "completed" as const,
    total: "$420.00",
    date: "3 hours ago",
  },
  {
    id: "ORD-005",
    customer: "Eve Martinez",
    product: "Full Face Helmet Pro",
    status: "cancelled" as const,
    total: "$350.00",
    date: "5 hours ago",
  },
]

const statusStyles = {
  completed: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  processing: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  pending: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  cancelled: "bg-destructive/10 text-destructive border-destructive/20",
}

export function RecentOrders() {
  return (
    <div className="rounded-xl border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border px-6 py-4">
        <div>
          <h3 className="text-sm font-semibold">Recent Orders</h3>
          <p className="text-xs text-muted-foreground">Latest orders from your store.</p>
        </div>
        <Badge variant="outline" className="text-xs">
          View all
        </Badge>
      </div>
      <div className="divide-y divide-border">
        {orders.map((order) => (
          <div
            key={order.id}
            className="flex items-center justify-between px-6 py-3.5 transition-colors hover:bg-muted/50"
          >
            <div className="flex items-center gap-4 min-w-0">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium text-muted-foreground">
                {order.customer.charAt(0)}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium truncate">{order.customer}</p>
                <p className="text-xs text-muted-foreground truncate">
                  {order.product} &middot; {order.id}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 shrink-0">
              <Badge variant="outline" className={statusStyles[order.status]}>
                {order.status}
              </Badge>
              <span className="text-sm font-semibold tabular-nums">{order.total}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
