"use client"

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ProductForm } from "./product-form"
import { useTranslations } from "@/hooks/use-translations"

interface AddProductSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AddProductSheet({ open, onOpenChange }: AddProductSheetProps) {
  const { t } = useTranslations()
  const handleSuccess = () => {
    onOpenChange(false)
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-xl lg:max-w-2xl p-0 gap-0"
      >
        <SheetHeader className="border-b border-border px-6 py-4">
          <SheetTitle>{t("admin.products.addProduct")}</SheetTitle>
          <SheetDescription>
            {t("admin.products.addDescription")}
          </SheetDescription>
        </SheetHeader>

        <ScrollArea className="flex-1 px-6 py-5">
          <ProductForm onSuccess={handleSuccess} />
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
