"use client"

import { useState, useCallback } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { Loader2, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { FormSection } from "@/components/common/form-section"
import { profileSchema } from "../lib/settings-schema"
import { useAdminSettingsStore } from "../stores/admin-settings-store"
import type { ProfileFormValues } from "../types"

export function ProfileTab() {
  const [submitting, setSubmitting] = useState(false)
  const settings = useAdminSettingsStore((s) => s.settings)
  const updateSettings = useAdminSettingsStore((s) => s.updateSettings)

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: settings.name,
      email: settings.email,
      phone: settings.phone,
      bio: settings.bio,
    },
  })

  const onSubmit = useCallback(
    async (data: ProfileFormValues) => {
      setSubmitting(true)
      await new Promise((r) => setTimeout(r, 800))
      updateSettings(data)
      toast.success("Profile updated successfully.")
      setSubmitting(false)
    },
    [updateSettings],
  )

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <FormSection title="Profile" description="Your personal information.">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="space-y-1.5 sm:col-span-2">
            <label className="text-sm font-medium">Avatar</label>
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted text-lg font-semibold text-muted-foreground">
                A
              </div>
              <Button type="button" variant="outline" size="sm">
                Change Photo
              </Button>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium">
              Name <span className="ml-0.5 text-destructive">*</span>
            </label>
            <Input
              placeholder="Your name"
              {...register("name")}
              aria-invalid={!!errors.name}
            />
            {errors.name && (
              <p className="text-xs text-destructive">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium">
              Email <span className="ml-0.5 text-destructive">*</span>
            </label>
            <Input
              placeholder="your@email.com"
              {...register("email")}
              aria-invalid={!!errors.email}
            />
            {errors.email && (
              <p className="text-xs text-destructive">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium">
              Phone <span className="ml-0.5 text-destructive">*</span>
            </label>
            <Input
              placeholder="+1 (555) 000-0000"
              {...register("phone")}
              aria-invalid={!!errors.phone}
            />
            {errors.phone && (
              <p className="text-xs text-destructive">{errors.phone.message}</p>
            )}
          </div>

          <div className="space-y-1.5 sm:col-span-2">
            <label className="text-sm font-medium">Bio</label>
            <Textarea
              rows={3}
              placeholder="Tell us about yourself..."
              {...register("bio")}
              aria-invalid={!!errors.bio}
            />
            {errors.bio && (
              <p className="text-xs text-destructive">{errors.bio.message}</p>
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
