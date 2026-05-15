import { getAll } from "@/lib/json-db"

interface Customer {
  id: string
  name: string
  email: string
  phone: string
  status: "active" | "inactive" | "blocked"
  totalOrders: number
  totalSpent: number
  city: string
  state: string
  country: string
  tags: string[]
  createdAt: string
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const search = searchParams.get("search")?.toLowerCase()
  const status = searchParams.get("status")
  const page = Number.parseInt(searchParams.get("page") || "1")
  const pageSize = Number.parseInt(searchParams.get("pageSize") || "10")

  let customers = getAll<Customer>("customers.json")

  if (search) {
    customers = customers.filter(
      (c) =>
        c.name.toLowerCase().includes(search) ||
        c.email.toLowerCase().includes(search) ||
        c.phone.includes(search) ||
        c.city.toLowerCase().includes(search),
    )
  }
  if (status) {
    customers = customers.filter((c) => c.status === status)
  }

  customers.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  const total = customers.length
  const totalPages = Math.ceil(total / pageSize)
  const paginated = customers.slice((page - 1) * pageSize, page * pageSize)

  return Response.json({
    customers: paginated,
    pagination: { page, pageSize, total, totalPages },
  })
}
