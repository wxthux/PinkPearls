import { type NextRequest, NextResponse } from "next/server"
import { getCurrentAdmin } from "@/lib/auth/admin-auth"
import { createServerSupabaseClient } from "@/lib/supabase/server"

export async function PUT(request: NextRequest) {
  try {
    const admin = await getCurrentAdmin()
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { username, avatar } = await request.json()
    const supabase = createServerSupabaseClient()

    const { data: updatedAdmin, error } = await supabase
      .from("admin_users")
      .update({
        username,
        avatar,
        updated_at: new Date().toISOString(),
      })
      .eq("id", admin.id)
      .select()
      .single()

    if (error) {
      console.error("Error updating admin profile:", error)
      return NextResponse.json({ error: "Failed to update profile" }, { status: 500 })
    }

    return NextResponse.json(updatedAdmin)
  } catch (error) {
    console.error("Profile update error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
