import { supabase } from "@/lib/supabase"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return Response.json({ error: "Email and password are required" }, { status: 400 })
    }

    const { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single()

    if (error || !user || user.password !== password) {
      return Response.json({ error: "Invalid credentials" }, { status: 401 })
    }

    const { password: _, ...safeUser } = user
    return Response.json({
      user: safeUser,
      token: `mock-token-${user.id}`,
    })
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 })
  }
}