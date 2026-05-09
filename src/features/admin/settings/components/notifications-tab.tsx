"use client"

import { useState, useCallback } from "react"
import { toast } from "sonner"
import { Loader2, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { FormSection } from "@/components/common/form-section"
import type { NotificationFormValues } from "../types"

const NOTIFICATION_GROUPS = [
  {
    title: "Order Notifications",
    items: [
      {
        key: "orderConfirmed" as const,
        label: "Order Confirmed",
        description: "When a customer confirms an order.",
      },
      {
        key: "orderShipped" as const,
        label: "Order Shipped",
        description: "When an order is marked as shipped.",
      },
      {
        key: "orderDelivered" as const,
        label: "Order Delivered",
        description: "When an order is marked as delivered.",
      },
    ],
  },
  {
    title: "Store Notifications",
    items: [
      {
        key: "lowStock" as const,
        label: "Low Stock Alerts",
        description: "When a product runs low on stock.",
      },
      {
        key: "newCustomer" as const,
        label: "New Customer",
        description: "When a new customer registers.",
      },
      {
        key: "reviewSubmitted" as const,
        label: "Review Submitted",
        description: "When a product review is submitted.",
      },
    ],
  },
  {
    title: "Email Digest",
    items: [
      {
        key: "marketingEmails" as const,
        label: "Marketing Emails",
        description: "Receive marketing and promotional emails.",
      },
      {
        key: "weeklyReport" as const,
        label: "Weekly Report",
        description: "Weekly store performance summary.",
      },
    ],
  },
]

export function NotificationsTab() {
  const [submitting, setSubmitting] = useState(false)
  const [values, setValues] = useState<NotificationFormValues>({
    orderConfirmed: true,
    orderShipped: true,
    orderDelivered: true,
    lowStock: true,
    newCustomer: false,
    reviewSubmitted: true,
    marketingEmails: false,
    weeklyReport: true,
  })

  const handleToggle = useCallback((key: keyof NotificationFormValues) => {
    setValues((prev) => ({ ...prev, [key]: !prev[key] }))
  }, [])

  const handleSubmit = useCallback(async () => {
    setSubmitting(true)
    await new Promise((r) => setTimeout(r, 800))
    toast.success("Notification preferences updated.")
    setSubmitting(false)
  }, [])

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <FormSection
        title="Notification Preferences"
        description="Choose which notifications you receive."
      >
        <div className="space-y-6">
          {NOTIFICATION_GROUPS.map((group) => (
            <div key={group.title}>
              <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {group.title}
              </h4>
              <div className="space-y-3">
                {group.items.map((item) => (
                  <label
                    key={item.key}
                    className="flex items-start gap-3 rounded-lg border border-border bg-muted/30 p-3 transition-colors hover:bg-muted/60 cursor-pointer"
                  >
                    <Checkbox
                      checked={values[item.key]}
                      onCheckedChange={() => handleToggle(item.key)}
                      className="mt-0.5"
                    />
                    <div className="min-w-0">
                      <p className="text-sm font-medium">{item.label}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      </FormSection>

      <div className="flex justify-end">
        <Button type="submit" disabled={submitting} className="gap-2">
          {submitting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          Save Preferences
        </Button>
      </div>
    </form>
  )
}
