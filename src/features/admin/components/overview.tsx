import { DollarSign, ShoppingCart, Users, TrendingUp } from "lucide-react"
import { StatsCard } from "./stats-card"
import { RecentOrders } from "./recent-orders"
import { LowStockProducts } from "./low-stock-products"

const stats = [
  {
    title: "Total Revenue",
    value: "$45,231",
    change: "+20.1%",
    trend: "up" as const,
    icon: DollarSign,
  },
  {
    title: "Orders",
    value: "1,234",
    change: "+12.5%",
    trend: "up" as const,
    icon: ShoppingCart,
  },
  {
    title: "Customers",
    value: "5,678",
    change: "+8.2%",
    trend: "up" as const,
    icon: Users,
  },
  {
    title: "Conversion Rate",
    value: "3.24%",
    change: "-0.5%",
    trend: "down" as const,
    icon: TrendingUp,
  },
]

export function AdminOverview() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-lg font-semibold tracking-tight">Overview</h2>
        <p className="text-sm text-muted-foreground">
          Your store performance at a glance.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatsCard key={stat.title} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <RecentOrders />
        </div>
        <LowStockProducts />
      </div>
    </div>
  )
}
