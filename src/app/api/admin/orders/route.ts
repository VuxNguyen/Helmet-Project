import { getAll } from "@/lib/json-db"

interface Order {
  id: string
  orderNumber: string
  customer: { name: string; email: string }
  items: { id: string; name: string; sku: string; quantity: number; price: number; image: string }[]
  total: number
  subtotal: number
  shipping: number
  tax: number
  status: string
  shippingAddress: Record<string, string>
  paymentMethod: string
  notes?: string
  createdAt: string
  updatedAt: string
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const search = searchParams.get("search")?.toLowerCase()
  const status = searchParams.get("status")
  const page = Number.parseInt(searchParams.get("page") || "1")
  const pageSize = Number.parseInt(searchParams.get("pageSize") || "10")

  let orders = getAll<Order>("orders.json")

  if (search) {
    orders = orders.filter(
      (o) =>
        o.orderNumber.toLowerCase().includes(search) ||
        o.customer.name.toLowerCase().includes(search) ||
        o.customer.email.toLowerCase().includes(search),
    )
  }
  if (status) {
    orders = orders.filter((o) => o.status === status)
  }

  orders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  const total = orders.length
  const totalPages = Math.ceil(total / pageSize)
  const paginated = orders.slice((page - 1) * pageSize, page * pageSize)

  return Response.json({
    orders: paginated,
    pagination: { page, pageSize, total, totalPages },
  })
}
