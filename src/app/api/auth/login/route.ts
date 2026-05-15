import { getAll } from "@/lib/json-db"

interface User {
  id: string
  name: string
  email: string
  password: string
  phone?: string
  dob?: string
  createdAt: string
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return Response.json({ error: "Email and password are required" }, { status: 400 })
    }

    const users = getAll<User>("users.json")
    const user = users.find((u) => u.email === email && u.password === password)

    if (!user) {
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
