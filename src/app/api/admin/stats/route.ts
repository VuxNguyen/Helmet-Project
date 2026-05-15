import { getAll } from "@/lib/json-db"

interface Order {
  id: string
  total: number
  status: string
  createdAt: string
  customer: { name: string; email: string }
}

interface Product {
  id: string
  stockCount: number
  name: string
}

interface Customer {
  id: string
  totalOrders: number
  totalSpent: number
}

export async function GET() {
  const orders = getAll<Order>("orders.json")
  const products = getAll<Product>("products.json")
  const customers = getAll<Customer>("customers.json")

  const totalRevenue = orders
    .filter((o) => o.status !== "cancelled")
    .reduce((sum, o) => sum + o.total, 0)

  const totalOrders = orders.length
  const totalCustomers = customers.length

  const deliveredOrders = orders.filter((o) => o.status === "delivered").length
  const conversionRate = totalOrders > 0
    ? Math.round((deliveredOrders / totalOrders) * 100 * 10) / 10
    : 0

  const lastMonth = new Date()
  lastMonth.setMonth(lastMonth.getMonth() - 1)
  const thisMonthOrders = orders.filter((o) => new Date(o.createdAt) >= lastMonth)
  const prevMonth = new Date()
  prevMonth.setMonth(prevMonth.getMonth() - 2)
  const prevMonthOrders = orders.filter(
    (o) => new Date(o.createdAt) >= prevMonth && new Date(o.createdAt) < lastMonth,
  )

  const currentRevenue = thisMonthOrders.reduce((s, o) => s + o.total, 0)
  const previousRevenue = prevMonthOrders.reduce((s, o) => s + o.total, 0)
  const revenueChange = previousRevenue > 0
    ? Math.round(((currentRevenue - previousRevenue) / previousRevenue) * 100 * 10) / 10
    : 0

  const ordersChange = thisMonthOrders.length - prevMonthOrders.length
  const customersChange = thisMonthOrders.length > 0 ? 1 : 0

  const recentOrders = orders
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5)

  const lowStockProducts = products
    .filter((p) => p.stockCount > 0 && p.stockCount <= 10)
    .slice(0, 5)

  return Response.json({
    totalRevenue,
    totalOrders,
    totalCustomers,
    conversionRate,
    revenueChange,
    ordersChange,
    customersChange,
    conversionChange: 0,
    recentOrders,
    lowStockProducts: lowStockProducts.map((p) => ({ id: p.id, name: p.name, stock: p.stockCount })),
  })
}
