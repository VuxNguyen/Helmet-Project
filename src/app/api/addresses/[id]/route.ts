import { getById, update, remove } from "@/lib/json-db"

interface Address {
  id: string
  userId: string
  name: string
  phone: string
  street: string
  apartment?: string
  city: string
  state: string
  zipCode: string
  country: string
  isDefault: boolean
  type: "home" | "office"
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params
    const body = await request.json()
    const existing = getById<Address>("addresses.json", id)

    if (!existing) {
      return Response.json({ error: "Address not found" }, { status: 404 })
    }

    const updated = update<Address>("addresses.json", id, body)
    return Response.json({ address: updated })
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 })
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params
  const deleted = remove<Address>("addresses.json", id)

  if (!deleted) {
    return Response.json({ error: "Address not found" }, { status: 404 })
  }

  return Response.json({ message: "Address deleted successfully" })
}
