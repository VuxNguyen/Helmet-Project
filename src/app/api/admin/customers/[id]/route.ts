import { getById } from "@/lib/json-db"

interface Customer {
  id: string
  name: string
  email: string
  phone: string
  status: "active" | "inactive" | "blocked"
  totalOrders: number
  totalSpent: number
  averageOrderValue: number
  lastOrderDate: string
  createdAt: string
  city: string
  state: string
  country: string
  tags: string[]
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params
  const customer = getById<Customer>("customers.json", id)

  if (!customer) {
    return Response.json({ error: "Customer not found" }, { status: 404 })
  }

  return Response.json({ customer })
}
