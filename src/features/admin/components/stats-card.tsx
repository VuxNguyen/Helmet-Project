import { type LucideIcon, TrendingUp, TrendingDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface StatsCardProps {
  title: string
  value: string
  change: string
  trend: "up" | "down"
  icon: LucideIcon
}

export function StatsCard({ title, value, change, trend, icon: Icon }: StatsCardProps) {
  const isUp = trend === "up"

  return (
    <div className="rounded-xl border border-border bg-card p-6 transition-colors hover:bg-muted/50">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-muted-foreground">{title}</span>
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted">
          <Icon className="h-4 w-4 text-muted-foreground" />
        </div>
      </div>
      <div className="mt-3">
        <span className="text-2xl font-bold tracking-tight">{value}</span>
        <div className="mt-1 flex items-center gap-1">
          {isUp ? (
            <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
          ) : (
            <TrendingDown className="h-3.5 w-3.5 text-destructive" />
          )}
          <span
            className={cn(
              "text-xs font-medium",
              isUp ? "text-emerald-500" : "text-destructive",
            )}
          >
            {change}
          </span>
          <span className="text-xs text-muted-foreground">vs last month</span>
        </div>
      </div>
    </div>
  )
}
