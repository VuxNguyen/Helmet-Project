import { supabase } from "@/lib/supabase"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get("userId")

  let query = supabase.from("addresses").select("*")

  if (userId) {
    query = query.eq("user_id", userId)
  }

  const { data, error } = await query

  if (error) {
    return Response.json({ error: "Failed to fetch addresses" }, { status: 500 })
  }

  return Response.json({ addresses: data || [] })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { userId, fullName, phone, address, city, state, zipCode, isDefault } = body

    if (!fullName || !address || !city || !state || !zipCode) {
      return Response.json({ error: "Missing required fields" }, { status: 400 })
    }

    // If setting as default, unset other defaults
    if (isDefault) {
      await supabase
        .from("addresses")
        .update({ is_default: false })
        .eq("user_id", userId || "guest")
    }

    const { data: newAddress, error } = await supabase
      .from("addresses")
      .insert({
        user_id: userId || "guest",
        full_name: fullName,
        phone: phone || "",
        address,
        city,
        state,
        zip_code: zipCode,
        is_default: isDefault ?? false,
      })
      .select()
      .single()

    if (error) {
      return Response.json({ error: "Failed to create address" }, { status: 500 })
    }

    return Response.json({ address: newAddress }, { status: 201 })
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 })
  }
}