import { cn } from "@/lib/utils"

function Textarea({
  className,
  ref,
  ...props
}: React.ComponentProps<"textarea">) {
  return (
    <textarea
      ref={ref}
      className={cn(
        "flex min-h-[60px] w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:border-ring disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-[3px] aria-invalid:ring-destructive/20 resize-y md:text-sm dark:bg-input/30",
        className,
      )}
      {...props}
    />
  )
}

export { Textarea }
