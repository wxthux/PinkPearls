import { type NextRequest, NextResponse } from "next/server"
import { authenticateAdmin, createAdminSession } from "@/lib/auth/admin-auth"
import { cookies } from "next/headers"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    const admin = await authenticateAdmin(email, password)

    if (!admin) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    const sessionToken = await createAdminSession(admin.id)

    const cookieStore = await cookies()
    cookieStore.set("admin-session", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60, // 24 hours
    })

    return NextResponse.json({ success: true, admin: { id: admin.id, email: admin.email, username: admin.username } })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
