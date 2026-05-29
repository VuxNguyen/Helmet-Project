"use client"

import { useState, useCallback } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { Loader2, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { FormSection } from "@/components/common/form-section"
import { securitySchema } from "../lib/settings-schema"
import { useTranslations } from "@/hooks/use-translations"
import type { SecurityFormValues } from "../types"

export function SecurityTab() {
  const [submitting, setSubmitting] = useState(false)
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)
  const { t } = useTranslations()

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<SecurityFormValues>({
    resolver: zodResolver(securitySchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
      twoFactorEnabled: false,
    },
  })

  const onSubmit = useCallback(async () => {
    setSubmitting(true)
    await new Promise((r) => setTimeout(r, 800))
    toast.success(t("admin.settings.security.passwordUpdated"))
    setSubmitting(false)
  }, [])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <FormSection
        title={t("admin.settings.security.changePassword")}
        description={t("admin.settings.security.changePasswordDesc")}
      >
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="space-y-1.5 sm:col-span-2">
            <label className="text-sm font-medium">
              {t("admin.settings.security.currentPassword")} <span className="ml-0.5 text-destructive">*</span>
            </label>
            <Input
              type="password"
              placeholder={t("admin.settings.security.currentPasswordPlaceholder")}
              {...register("currentPassword")}
              aria-invalid={!!errors.currentPassword}
            />
            {errors.currentPassword && (
              <p className="text-xs text-destructive">
                {errors.currentPassword.message}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium">
              {t("admin.settings.security.newPassword")} <span className="ml-0.5 text-destructive">*</span>
            </label>
            <Input
              type="password"
              placeholder={t("admin.settings.security.newPasswordPlaceholder")}
              {...register("newPassword")}
              aria-invalid={!!errors.newPassword}
            />
            {errors.newPassword && (
              <p className="text-xs text-destructive">
                {errors.newPassword.message}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium">
              {t("admin.settings.security.confirmPassword")} <span className="ml-0.5 text-destructive">*</span>
            </label>
            <Input
              type="password"
              placeholder={t("admin.settings.security.confirmPasswordPlaceholder")}
              {...register("confirmPassword")}
              aria-invalid={!!errors.confirmPassword}
            />
            {errors.confirmPassword && (
              <p className="text-xs text-destructive">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
        </div>
      </FormSection>

      <FormSection
        title={t("admin.settings.security.twoFactor")}
        description={t("admin.settings.security.twoFactorDesc")}
      >
        <label className="flex items-start gap-3 rounded-lg border border-border bg-muted/30 p-3 transition-colors hover:bg-muted/60 cursor-pointer">
          <Checkbox
            checked={twoFactorEnabled}
            onCheckedChange={(v) => setTwoFactorEnabled(!!v)}
            className="mt-0.5"
          />
          <div className="min-w-0">
            <p className="text-sm font-medium">{t("admin.settings.security.enable2fa")}</p>
            <p className="text-xs text-muted-foreground">
              {t("admin.settings.security.twoFactorDesc")}
            </p>
          </div>
        </label>
      </FormSection>

      <div className="flex justify-end">
        <Button type="submit" disabled={submitting || !isDirty} className="gap-2">
          {submitting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          {t("admin.settings.security.updatePassword")}
        </Button>
      </div>
    </form>
  )
}
