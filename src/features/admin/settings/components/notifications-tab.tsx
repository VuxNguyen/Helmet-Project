"use client"

import { useState, useCallback } from "react"
import { toast } from "sonner"
import { Loader2, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { FormSection } from "@/components/common/form-section"
import { useAdminSettingsStore } from "../stores/admin-settings-store"
import { useTranslations } from "@/hooks/use-translations"
import type { NotificationFormValues } from "../types"

export function NotificationsTab() {
  const [submitting, setSubmitting] = useState(false)
  const settings = useAdminSettingsStore((s) => s.settings)
  const updateSettings = useAdminSettingsStore((s) => s.updateSettings)
  const { t } = useTranslations()
  const [values, setValues] = useState<NotificationFormValues>({
    orderConfirmed: settings.orderConfirmed,
    orderShipped: settings.orderShipped,
    orderDelivered: settings.orderDelivered,
    lowStock: settings.lowStock,
    newCustomer: settings.newCustomer,
    reviewSubmitted: settings.reviewSubmitted,
    marketingEmails: settings.marketingEmails,
    weeklyReport: settings.weeklyReport,
  })

  const handleToggle = useCallback((key: keyof NotificationFormValues) => {
    setValues((prev) => ({ ...prev, [key]: !prev[key] }))
  }, [])

  const handleSubmit = useCallback(async () => {
    setSubmitting(true)
    await new Promise((r) => setTimeout(r, 800))
    updateSettings(values)
    toast.success(t("admin.settings.notifications.saved"))
    setSubmitting(false)
  }, [values, updateSettings])

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <FormSection
        title={t("admin.settings.notifications.title")}
        description={t("admin.settings.notifications.description")}
      >
        <div className="space-y-6">
          {[
            {
              title: t("admin.settings.notifications.orderUpdates"),
              items: [
                { key: "orderConfirmed" as const, label: t("admin.settings.notifications.orderUpdates"), description: t("admin.settings.notifications.orderUpdatesDesc") },
                { key: "orderShipped" as const, label: t("admin.settings.notifications.orderUpdates"), description: t("admin.settings.notifications.orderUpdatesDesc") },
                { key: "orderDelivered" as const, label: t("admin.settings.notifications.orderUpdates"), description: t("admin.settings.notifications.orderUpdatesDesc") },
              ],
            },
            {
              title: t("admin.settings.notifications.lowStockAlerts"),
              items: [
                { key: "lowStock" as const, label: t("admin.settings.notifications.lowStockAlerts"), description: t("admin.settings.notifications.lowStockAlertsDesc") },
                { key: "newCustomer" as const, label: t("admin.settings.notifications.customerReviews"), description: t("admin.settings.notifications.customerReviewsDesc") },
                { key: "reviewSubmitted" as const, label: t("admin.settings.notifications.customerReviews"), description: t("admin.settings.notifications.customerReviewsDesc") },
              ],
            },
            {
              title: t("admin.settings.notifications.marketingEmails"),
              items: [
                { key: "marketingEmails" as const, label: t("admin.settings.notifications.marketingEmails"), description: t("admin.settings.notifications.marketingEmailsDesc") },
                { key: "weeklyReport" as const, label: t("admin.settings.notifications.marketingEmails"), description: t("admin.settings.notifications.marketingEmailsDesc") },
              ],
            },
          ].map((group) => (
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
          {t("admin.settings.notifications.saveChanges")}
        </Button>
      </div>
    </form>
  )
}
