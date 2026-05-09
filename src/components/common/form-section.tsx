interface FormSectionProps {
  title: string
  description?: string
  children: React.ReactNode
}

export function FormSection({ title, description, children }: FormSectionProps) {
  return (
    <div className="rounded-xl border border-border bg-card">
      <div className="border-b border-border px-5 py-4 sm:px-6">
        <h3 className="text-sm font-semibold">{title}</h3>
        {description && (
          <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
        )}
      </div>
      <div className="px-5 py-5 sm:px-6">{children}</div>
    </div>
  )
}
