import { cn } from "@/lib/utils"

interface AdminContentProps {
  children: React.ReactNode
  className?: string
}

export function AdminContent({ children, className }: AdminContentProps) {
  return (
    <main className={cn("flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 [scrollbar-gutter:stable]", className)}>
      {children}
    </main>
  )
}
