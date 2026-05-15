import { getById, update, remove } from "@/lib/json-db"

interface ProductRecord {
  id: string
  [key: string]: unknown
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params
    const body = await request.json()
    const existing = getById<ProductRecord>("products.json", id)

    if (!existing) {
      return Response.json({ error: "Product not found" }, { status: 404 })
    }

    const updated = update<ProductRecord>("products.json", id, body)
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
  const deleted = remove<ProductRecord>("products.json", id)

  if (!deleted) {
    return Response.json({ error: "Product not found" }, { status: 404 })
  }

  return Response.json({ message: "Product deleted successfully" })
}
