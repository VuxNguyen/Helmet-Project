"use client"

import { useState, useCallback } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { Loader2, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { FormSection } from "@/components/common/form-section"
import { storeSchema } from "../lib/settings-schema"
import { useAdminSettingsStore } from "../stores/admin-settings-store"
import {
  CURRENCY_OPTIONS,
  LANGUAGE_OPTIONS,
  TIMEZONE_OPTIONS,
  type StoreFormValues,
} from "../types"

export function StoreTab() {
  const [submitting, setSubmitting] = useState(false)
  const settings = useAdminSettingsStore((s) => s.settings)
  const updateSettings = useAdminSettingsStore((s) => s.updateSettings)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isDirty },
  } = useForm<StoreFormValues>({
    resolver: zodResolver(storeSchema),
    defaultValues: {
      storeName: settings.storeName,
      storeEmail: settings.storeEmail,
      currency: settings.currency,
      language: settings.language,
      timezone: settings.timezone,
      description: settings.description,
    },
  })

  const onSubmit = useCallback(
    async (data: StoreFormValues) => {
      setSubmitting(true)
      await new Promise((r) => setTimeout(r, 800))
      updateSettings(data)
      toast.success("Store settings updated successfully.")
      setSubmitting(false)
    },
    [updateSettings],
  )

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <FormSection
        title="Store Details"
        description="Your store name and public information."
      >
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label className="text-sm font-medium">
              Store Name <span className="ml-0.5 text-destructive">*</span>
            </label>
            <Input
              placeholder="My Store"
              {...register("storeName")}
              aria-invalid={!!errors.storeName}
            />
            {errors.storeName && (
              <p className="text-xs text-destructive">
                {errors.storeName.message}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium">
              Store Email <span className="ml-0.5 text-destructive">*</span>
            </label>
            <Input
              placeholder="store@example.com"
              {...register("storeEmail")}
              aria-invalid={!!errors.storeEmail}
            />
            {errors.storeEmail && (
              <p className="text-xs text-destructive">
                {errors.storeEmail.message}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium">
              Currency <span className="ml-0.5 text-destructive">*</span>
            </label>
            <Select
              value={watch("currency")}
              onValueChange={(v) => setValue("currency", v, { shouldValidate: true })}
            >
              <SelectTrigger aria-invalid={!!errors.currency}>
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                {CURRENCY_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.currency && (
              <p className="text-xs text-destructive">
                {errors.currency.message}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium">
              Language <span className="ml-0.5 text-destructive">*</span>
            </label>
            <Select
              value={watch("language")}
              onValueChange={(v) => setValue("language", v, { shouldValidate: true })}
            >
              <SelectTrigger aria-invalid={!!errors.language}>
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                {LANGUAGE_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.language && (
              <p className="text-xs text-destructive">
                {errors.language.message}
              </p>
            )}
          </div>

          <div className="space-y-1.5 sm:col-span-2">
            <label className="text-sm font-medium">
              Timezone <span className="ml-0.5 text-destructive">*</span>
            </label>
            <Select
              value={watch("timezone")}
              onValueChange={(v) => setValue("timezone", v, { shouldValidate: true })}
            >
              <SelectTrigger aria-invalid={!!errors.timezone}>
                <SelectValue placeholder="Select timezone" />
              </SelectTrigger>
              <SelectContent>
                {TIMEZONE_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.timezone && (
              <p className="text-xs text-destructive">
                {errors.timezone.message}
              </p>
            )}
          </div>

          <div className="space-y-1.5 sm:col-span-2">
            <label className="text-sm font-medium">Store Description</label>
            <Textarea
              rows={3}
              placeholder="Describe your store..."
              {...register("description")}
              aria-invalid={!!errors.description}
            />
            {errors.description && (
              <p className="text-xs text-destructive">
                {errors.description.message}
              </p>
            )}
          </div>
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
