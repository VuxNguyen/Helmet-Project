import { getAll, getById, create } from "@/lib/json-db"

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

    const users = getAll<User>("users.json")
    const existing = users.find((u) => u.email === email)
    if (existing) {
      return Response.json({ error: "Email already registered" }, { status: 409 })
    }

    const newUser: User = {
      id: `user-${Date.now()}`,
      name: fullName,
      email,
      password,
      createdAt: new Date().toISOString(),
    }
    create("users.json", newUser)

    const { password: _, ...safeUser } = newUser
    return Response.json(
      { user: safeUser, token: `mock-token-${newUser.id}` },
      { status: 201 },
    )
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 })
  }
}
