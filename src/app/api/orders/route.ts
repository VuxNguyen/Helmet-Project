import { getAll } from "@/lib/json-db"

interface Order {
  id: string
  orderNumber: string
  userId: string
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
  const userId = searchParams.get("userId")
  const page = Number.parseInt(searchParams.get("page") || "1")
  const pageSize = Number.parseInt(searchParams.get("pageSize") || "10")

  let orders = getAll<Order>("orders.json")

  if (userId) {
    orders = orders.filter((o) => o.userId === userId)
  }

  orders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  const total = orders.length
  const totalPages = Math.ceil(total / pageSize)
  const paginatedOrders = orders.slice((page - 1) * pageSize, page * pageSize)

  return Response.json({
    orders: paginatedOrders,
    pagination: { page, pageSize, total, totalPages },
  })
}
