import { supabase } from "@/lib/supabase"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return Response.json({ error: "Vui lòng nhập email và mật khẩu" }, { status: 400 })
    }

    const { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email.trim().toLowerCase())
      .maybeSingle()

    if (error) {
      return Response.json({ error: "Lỗi hệ thống, vui lòng thử lại sau" }, { status: 500 })
    }

    // Email không tồn tại
    if (!user) {
      return Response.json({ error: "Email không tồn tại trên hệ thống" }, { status: 401 })
    }

    // Sai mật khẩu
    if (user.password !== password) {
      return Response.json({ error: "Mật khẩu không đúng" }, { status: 401 })
    }

    // Không có quyền admin
    if (user.role !== "admin") {
      return Response.json({ error: "Email không có quyền truy cập trang quản trị" }, { status: 403 })
    }

    const { password: _, ...safeUser } = user
    return Response.json({
      user: safeUser,
      token: `mock-token-${user.id}`,
    })
  } catch {
    return Response.json({ error: "Dữ liệu không hợp lệ" }, { status: 400 })
  }
}