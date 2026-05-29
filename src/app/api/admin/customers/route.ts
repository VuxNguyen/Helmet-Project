import { supabase } from "@/lib/supabase"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const search = searchParams.get("search")?.toLowerCase()
  const status = searchParams.get("status")
  const page = Number.parseInt(searchParams.get("page") || "1")
  const pageSize = Number.parseInt(searchParams.get("pageSize") || "10")

  let query = supabase.from("users").select("*", { count: "exact" })

  if (search) {
    query = query.or(`name.ilike.%${search}%,email.ilike.%${search}%`)
  }

  query = query.order("created_at", { ascending: false })

  const from = (page - 1) * pageSize
  const to = from + pageSize - 1
  query = query.range(from, to)

  const { data, error, count } = await query

  if (error) {
    return Response.json({ error: "Failed to fetch customers" }, { status: 500 })
  }

  const total = count || 0
  const totalPages = Math.ceil(total / pageSize)

  return Response.json({
    customers: data || [],
    pagination: { page, pageSize, total, totalPages },
  })
}