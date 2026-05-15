"use client"

import { useState, useCallback } from "react"
import { useForm, FormProvider } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
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
import { Separator } from "@/components/ui/separator"
import { FormSection } from "./form-section"
import { FormField } from "./form-field"
import { ImageUpload, type ImageFile } from "./image-upload"
import {
  productFormSchema,
  type ProductFormValues,
} from "../lib/product-form-schema"
import { CATEGORY_OPTIONS, BRAND_OPTIONS, type AdminProduct, type ProductStatus } from "../types"
import { useAdminProductsStore } from "../stores/admin-products-store"

interface ProductFormProps {
  onSuccess?: () => void
  product?: AdminProduct
}

export function ProductForm({ onSuccess, product }: ProductFormProps) {
  const isEditing = !!product
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [images, setImages] = useState<ImageFile[]>([])
  const [imagesError, setImagesError] = useState("")
  const addProduct = useAdminProductsStore((s) => s.addProduct)
  const updateProduct = useAdminProductsStore((s) => s.updateProduct)

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: product?.name ?? "",
      brand: product?.brand ?? "",
      category: product?.category ?? "",
      sku: product?.sku ?? "",
      price: product?.price ?? 0,
      comparePrice: product?.originalPrice ?? undefined,
      stock: product?.stock ?? 0,
      status: product?.status === "archived" ? "draft" : (product?.status ?? "draft"),
      description: product?.description ?? product?.name ?? "",
    },
    mode: "onBlur",
    reValidateMode: "onChange",
  })

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = form

  const handleImagesChange = useCallback(
    (files: ImageFile[]) => {
      setImages(files)
      if (files.length > 0) setImagesError("")
    },
    [],
  )

  async function onSubmit(data: ProductFormValues) {
    if (!isEditing && images.length === 0) {
      setImagesError("At least one product image is required")
      return
    }
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const base = {
      name: data.name,
      sku: data.sku,
      brand: data.brand,
      category: data.category,
      price: data.price,
      originalPrice: data.comparePrice,
      stock: data.stock,
      status: data.status as ProductStatus,
      image: images[0]?.preview ?? product?.image ?? "/placeholder-helmet.svg",
      description: data.description,
    }

    if (isEditing && product) {
      updateProduct(product.id, base)
    } else {
      addProduct(base)
    }

    setIsSubmitting(false)
    onSuccess?.()
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <FormSection
          title="Media"
          description="Upload product images. The first image will be used as the cover."
        >
          <ImageUpload
            value={images}
            onChange={handleImagesChange}
            error={imagesError}
            existingImages={isEditing && product?.image ? [product.image] : undefined}
          />
        </FormSection>

        <FormSection
          title="Basic Information"
          description="Product name, brand, category and SKU."
        >
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <FormField
              label="Product Name"
              error={errors.name?.message}
              required
              className="sm:col-span-2"
            >
              <Input
                placeholder="e.g. Arai RX-7X Evo"
                {...register("name")}
                aria-invalid={!!errors.name}
              />
            </FormField>

            <FormField
              label="Brand"
              error={errors.brand?.message}
              required
            >
              <Select
                value={watch("brand")}
                onValueChange={(v) =>
                  setValue("brand", v, { shouldValidate: true })
                }
              >
                <SelectTrigger aria-invalid={!!errors.brand}>
                  <SelectValue placeholder="Select brand" />
                </SelectTrigger>
                <SelectContent>
                  {BRAND_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.label}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormField>

            <FormField
              label="Category"
              error={errors.category?.message}
              required
            >
              <Select
                value={watch("category")}
                onValueChange={(v) =>
                  setValue("category", v, { shouldValidate: true })
                }
              >
                <SelectTrigger aria-invalid={!!errors.category}>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORY_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormField>

            <FormField
              label="SKU"
              error={errors.sku?.message}
              required
              className="sm:col-span-2"
            >
              <Input
                placeholder="e.g. HELM-0001"
                {...register("sku")}
                aria-invalid={!!errors.sku}
              />
            </FormField>
          </div>
        </FormSection>

        <FormSection
          title="Pricing"
          description="Set the product price and optional compare-at price."
        >
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <FormField
              label="Price"
              error={errors.price?.message}
              required
            >
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                  $
                </span>
                <Input
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  className="pl-7"
                  {...register("price", { valueAsNumber: true })}
                  aria-invalid={!!errors.price}
                />
              </div>
            </FormField>

            <FormField label="Compare at Price">
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                  $
                </span>
                <Input
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  className="pl-7"
                  {...register("comparePrice", { valueAsNumber: true })}
                />
              </div>
            </FormField>
          </div>
        </FormSection>

        <FormSection
          title="Inventory"
          description="Stock quantity and product status."
        >
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <FormField
              label="Stock Quantity"
              error={errors.stock?.message}
              required
            >
              <Input
                type="number"
                min="0"
                placeholder="0"
                {...register("stock", { valueAsNumber: true })}
                aria-invalid={!!errors.stock}
              />
            </FormField>

            <FormField
              label="Status"
              error={errors.status?.message}
              required
            >
              <Select
                value={watch("status")}
                onValueChange={(v) =>
                  setValue("status", v as "active" | "draft", {
                    shouldValidate: true,
                  })
                }
              >
                <SelectTrigger aria-invalid={!!errors.status}>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                </SelectContent>
              </Select>
            </FormField>
          </div>
        </FormSection>

        <FormSection
          title="Description"
          description="Detailed product description for customers."
        >
          <FormField
            label="Description"
            error={errors.description?.message}
            required
          >
            <Textarea
              rows={6}
              placeholder="Describe the product in detail..."
              {...register("description")}
              aria-invalid={!!errors.description}
            />
          </FormField>
        </FormSection>

        <Separator />

        <div className="flex items-center justify-end gap-3">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="gap-2"
          >
            {isSubmitting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : isEditing ? (
              "Save Changes"
            ) : (
              "Publish Product"
            )}
          </Button>
        </div>
      </form>
    </FormProvider>
  )
}
