import { getAll, create } from "@/lib/json-db"

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

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get("userId")

  let addresses = getAll<Address>("addresses.json")
  if (userId) {
    addresses = addresses.filter((a) => a.userId === userId)
  }

  return Response.json({ addresses })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { userId, name, phone, street, city, state, zipCode, country, isDefault, type } = body

    if (!name || !street || !city || !state || !zipCode) {
      return Response.json({ error: "Missing required fields" }, { status: 400 })
    }

    const newAddress: Address = {
      id: `addr-${Date.now()}`,
      userId: userId || "guest",
      name,
      phone: phone || "",
      street,
      apartment: body.apartment,
      city,
      state,
      zipCode,
      country: country || "US",
      isDefault: isDefault ?? false,
      type: type || "home",
    }

    if (newAddress.isDefault) {
      const addresses = getAll<Address>("addresses.json")
      addresses.forEach((a) => {
        if (a.userId === newAddress.userId) {
          import("@/lib/json-db").then(({ update }) => update<Address>("addresses.json", a.id, { isDefault: false }))
        }
      })
    }

    create("addresses.json", newAddress)
    return Response.json({ address: newAddress }, { status: 201 })
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 })
  }
}
