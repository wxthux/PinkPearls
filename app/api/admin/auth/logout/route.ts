import { type NextRequest, NextResponse } from "next/server"
import { deleteAdminSession } from "@/lib/auth/admin-auth"
import { cookies } from "next/headers"

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const sessionToken = cookieStore.get("admin-session")?.value

    if (sessionToken) {
      await deleteAdminSession(sessionToken)
    }

    cookieStore.delete("admin-session")

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Logout error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
