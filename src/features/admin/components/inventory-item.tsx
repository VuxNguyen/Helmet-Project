"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface InventoryItemProps {
  name: string
  sku: string
  stock: number
  threshold: number
  image?: string
}

const stockLevel = (stock: number, threshold: number) => {
  if (stock === 0) return "out" as const
  if (stock <= Math.max(1, threshold * 0.25)) return "critical" as const
  if (stock <= threshold * 0.5) return "low" as const
  return "warning" as const
}

const levelConfig = {
  out: {
    label: "Out of Stock",
    bar: "bg-destructive",
    dot: "bg-destructive",
    text: "text-destructive",
    bg: "bg-destructive/10",
  },
  critical: {
    label: "Critical",
    bar: "bg-destructive",
    dot: "bg-destructive",
    text: "text-destructive",
    bg: "bg-destructive/10",
  },
  low: {
    label: "Low Stock",
    bar: "bg-amber-500",
    dot: "bg-amber-500",
    text: "text-amber-500",
    bg: "bg-amber-500/10",
  },
  warning: {
    label: "Warning",
    bar: "bg-amber-500/60",
    dot: "bg-amber-500/60",
    text: "text-amber-500/60",
    bg: "bg-amber-500/10",
  },
}

export function InventoryItem({ name, sku, stock, threshold }: InventoryItemProps) {
  const level = stockLevel(stock, threshold)
  const config = levelConfig[level]
  const barWidth = Math.min(100, (stock / threshold) * 100)

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-3 px-6 py-3 transition-colors hover:bg-muted/50"
    >
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted text-xs font-semibold text-muted-foreground">
        {name.charAt(0)}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium truncate">{name}</p>
          <span className={cn("h-1.5 w-1.5 shrink-0 rounded-full", config.dot)} />
        </div>
        <p className="text-xs text-muted-foreground">SKU: {sku}</p>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <div className="flex flex-col items-end gap-1">
          <span className={cn("text-sm font-semibold tabular-nums", config.text)}>
            {stock}
          </span>
          <div className="h-1 w-16 rounded-full bg-muted">
            <div
              className={cn("h-full rounded-full transition-all", config.bar)}
              style={{ width: `${barWidth}%` }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  )
}
