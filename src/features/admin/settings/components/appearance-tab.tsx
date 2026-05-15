"use client"

import { useState, useCallback } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { Loader2, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { FormSection } from "@/components/common/form-section"
import { appearanceSchema } from "../lib/settings-schema"
import { useAdminSettingsStore } from "../stores/admin-settings-store"
import { THEME_OPTIONS, SIDEBAR_OPTIONS, type AppearanceFormValues } from "../types"

const APPEARANCE_OPTIONS = [
  {
    key: "reducedMotion" as const,
    label: "Reduced Motion",
    description: "Minimize animations across the dashboard.",
  },
  {
    key: "compactMode" as const,
    label: "Compact Mode",
    description: "Use tighter spacing for dense information display.",
  },
]

export function AppearanceTab() {
  const [submitting, setSubmitting] = useState(false)
  const settings = useAdminSettingsStore((s) => s.settings)
  const updateSettings = useAdminSettingsStore((s) => s.updateSettings)

  const {
    handleSubmit,
    watch,
    setValue,
    formState: { isDirty },
  } = useForm<AppearanceFormValues>({
    resolver: zodResolver(appearanceSchema),
    defaultValues: {
      theme: settings.themeMode,
      sidebarBehavior: settings.sidebarBehavior,
      reducedMotion: settings.reducedMotion,
      compactMode: settings.compactMode,
    },
  })

  const onSubmit = useCallback(
    async (data: AppearanceFormValues) => {
      setSubmitting(true)
      await new Promise((r) => setTimeout(r, 800))
      updateSettings({
        themeMode: data.theme,
        sidebarBehavior: data.sidebarBehavior,
        reducedMotion: data.reducedMotion,
        compactMode: data.compactMode,
      })
      toast.success("Appearance settings updated.")
      setSubmitting(false)
    },
    [updateSettings],
  )

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <FormSection
        title="Theme"
        description="Customize the dashboard appearance."
      >
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Theme Mode</label>
            <Select
              value={watch("theme")}
              onValueChange={(v) => setValue("theme", v as "dark" | "light" | "system")}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {THEME_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium">Sidebar Behavior</label>
            <Select
              value={watch("sidebarBehavior")}
              onValueChange={(v) => setValue("sidebarBehavior", v as "expanded" | "collapsed")}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {SIDEBAR_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </FormSection>

      <FormSection
        title="Display Options"
        description="Fine-tune the dashboard experience."
      >
        <div className="space-y-3">
          {APPEARANCE_OPTIONS.map((opt) => (
            <label
              key={opt.key}
              className="flex items-start gap-3 rounded-lg border border-border bg-muted/30 p-3 transition-colors hover:bg-muted/60 cursor-pointer"
            >
              <Checkbox
                checked={watch(opt.key)}
                onCheckedChange={(v) => setValue(opt.key, !!v)}
                className="mt-0.5"
              />
              <div className="min-w-0">
                <p className="text-sm font-medium">{opt.label}</p>
                <p className="text-xs text-muted-foreground">
                  {opt.description}
                </p>
              </div>
            </label>
          ))}
        </div>
      </FormSection>

      <div className="flex justify-end">
        <Button type="submit" disabled={submitting || !isDirty} className="gap-2">
          {submitting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          Save Changes
        </Button>
      </div>
    </form>
  )
}
