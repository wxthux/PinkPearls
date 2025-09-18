import { type NextRequest, NextResponse } from "next/server"
import { getCurrentAdmin } from "@/lib/auth/admin-auth"

export async function GET(request: NextRequest) {
  try {
    const admin = await getCurrentAdmin()

    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    return NextResponse.json({
      admin: {
        id: admin.id,
        email: admin.email,
        username: admin.username,
        avatar: admin.avatar,
      },
    })
  } catch (error) {
    console.error("Auth check error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
