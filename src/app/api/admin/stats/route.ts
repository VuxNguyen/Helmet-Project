import { supabase } from "@/lib/supabase"

export async function GET() {
  // Fetch orders
  const { data: orders } = await supabase
    .from("orders")
    .select("*")

  // Fetch products for low stock
  const { data: products } = await supabase
    .from("products")
    .select("id, name, stock_count")

  // Fetch users for customer count (exclude admin users)
  const { count: totalCustomers } = await supabase
    .from("users")
    .select("*", { count: "exact", head: true })
    .neq("role", "admin")

  const allOrders = orders || []

  const totalRevenue = allOrders
    .filter((o) => o.status !== "cancelled")
    .reduce((sum: number, o: { total: number }) => sum + o.total, 0)

  const totalOrders = allOrders.length

  const deliveredOrders = allOrders.filter((o: { status: string }) => o.status === "delivered").length
  const conversionRate = totalOrders > 0
    ? Math.round((deliveredOrders / totalOrders) * 100 * 10) / 10
    : 0

  const lastMonth = new Date()
  lastMonth.setMonth(lastMonth.getMonth() - 1)
  const thisMonthOrders = allOrders.filter((o: { created_at: string }) => new Date(o.created_at) >= lastMonth)
  const prevMonth = new Date()
  prevMonth.setMonth(prevMonth.getMonth() - 2)
  const prevMonthOrders = allOrders.filter(
    (o: { created_at: string }) => new Date(o.created_at) >= prevMonth && new Date(o.created_at) < lastMonth,
  )

  const currentRevenue = thisMonthOrders.reduce((s: number, o: { total: number }) => s + o.total, 0)
  const previousRevenue = prevMonthOrders.reduce((s: number, o: { total: number }) => s + o.total, 0)
  const revenueChange = previousRevenue > 0
    ? Math.round(((currentRevenue - previousRevenue) / previousRevenue) * 100 * 10) / 10
    : 0

  const ordersChange = thisMonthOrders.length - prevMonthOrders.length
  const customersChange = thisMonthOrders.length > 0 ? 1 : 0

  const rawRecentOrders = allOrders
    .sort((a: { created_at: string }, b: { created_at: string }) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 5)

  // Transform recentOrders: snake_case -> camelCase
  const recentOrders = rawRecentOrders.map((o: Record<string, unknown>) => ({
    id: o.id,
    orderNumber: o.order_number,
    total: o.total,
    status: o.status,
    createdAt: o.created_at,
    customer: {
      name: o.customer_name || "",
      email: o.customer_email || "",
    },
  }))

  const lowStockProducts = (products || [])
    .filter((p: { stock_count: number }) => p.stock_count > 0 && p.stock_count <= 10)
    .slice(0, 5)
    .map((p: { id: string; name: string; stock_count: number }) => ({ id: p.id, name: p.name, stock: p.stock_count }))

  return Response.json({
    totalRevenue,
    totalOrders,
    totalCustomers: totalCustomers || 0,
    conversionRate,
    revenueChange,
    ordersChange,
    customersChange,
    conversionChange: 0,
    recentOrders,
    lowStockProducts,
  })
}