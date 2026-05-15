import { getAll, update } from "@/lib/json-db"

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

export async function PATCH(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params
  const addresses = getAll<Address>("addresses.json")
  const target = addresses.find((a) => a.id === id)

  if (!target) {
    return Response.json({ error: "Address not found" }, { status: 404 })
  }

  addresses.forEach((a) => {
    if (a.userId === target.userId) {
      update<Address>("addresses.json", a.id, { isDefault: a.id === id })
    }
  })

  return Response.json({ message: "Default address updated" })
}
