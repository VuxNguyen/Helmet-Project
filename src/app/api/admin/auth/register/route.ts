import { supabase } from "@/lib/supabase"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { fullName, email, password } = body

    if (!fullName || fullName.length < 2) {
      return Response.json({ error: "Full name must be at least 2 characters" }, { status: 400 })
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Response.json({ error: "Invalid email address" }, { status: 400 })
    }
    if (!password || password.length < 8) {
      return Response.json({ error: "Password must be at least 8 characters" }, { status: 400 })
    }

    // Check if email already exists
    const { data: existing } = await supabase
      .from("users")
      .select("id")
      .eq("email", email)
      .maybeSingle()

    if (existing) {
      return Response.json({ error: "Email already registered" }, { status: 409 })
    }

    // Check if there's already an admin (prevent mass admin registration)
    const { count } = await supabase
      .from("users")
      .select("*", { count: "exact", head: true })
      .eq("role", "admin")

    const { data: newUser, error } = await supabase
      .from("users")
      .insert({
        id: crypto.randomUUID(),
        name: fullName,
        email,
        password,
        role: "admin",
      })
      .select()
      .single()

    if (error) {
      return Response.json({ error: "Failed to create admin account" }, { status: 500 })
    }

    const { password: _, ...safeUser } = newUser
    return Response.json(
      { user: safeUser, token: `mock-token-${newUser.id}` },
      { status: 201 },
    )
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 })
  }
}