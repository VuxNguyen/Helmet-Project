import { supabase } from "@/lib/supabase"

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params
    const body = await request.json()

    const { data: existing } = await supabase
      .from("products")
      .select("id")
      .eq("id", id)
      .maybeSingle()

    if (!existing) {
      return Response.json({ error: "Product not found" }, { status: 404 })
    }

    const updateData: Record<string, unknown> = {}
    if (body.name !== undefined) updateData.name = body.name
    if (body.price !== undefined) updateData.price = body.price
    if (body.brand !== undefined) updateData.brand = body.brand
    if (body.description !== undefined) updateData.description = body.description
    if (body.stock !== undefined) updateData.stock_count = body.stock
    if (body.category !== undefined) updateData.category_slug = body.category
    if (body.image !== undefined) updateData.image = body.image
    if (body.inStock !== undefined) updateData.in_stock = body.inStock
    if (body.featured !== undefined) updateData.featured = body.featured

    const { data: updated, error } = await supabase
      .from("products")
      .update(updateData)
      .eq("id", id)
      .select()
      .single()

    if (error) {
      return Response.json({ error: "Failed to update product" }, { status: 500 })
    }

    return Response.json({ product: updated })
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 })
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params

  const { error } = await supabase
    .from("products")
    .delete()
    .eq("id", id)

  if (error) {
    return Response.json({ error: "Product not found" }, { status: 404 })
  }

  return Response.json({ message: "Product deleted successfully" })
}