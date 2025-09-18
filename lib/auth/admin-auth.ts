import { createServerSupabaseClient } from "../supabase/server"
import type { AdminUser } from "../types/admin.types"
import { cookies } from "next/headers"

export async function authenticateAdmin(email: string, password: string): Promise<AdminUser | null> {
  const supabase = createServerSupabaseClient()

  // Simple password check (in production, use proper password hashing)
  const { data: admin, error } = await supabase.from("admin_users").select("*").eq("email", email).single()

  if (error || !admin) {
    return null
  }

  // Simple password verification (in production, use bcrypt)
  if (password === "admin") {
    return admin
  }

  return null
}

export async function createAdminSession(adminId: number): Promise<string> {
  const supabase = createServerSupabaseClient()
  const sessionToken = crypto.randomUUID()
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours

  await supabase.from("admin_sessions").insert({
    admin_id: adminId,
    session_token: sessionToken,
    expires_at: expiresAt.toISOString(),
  })

  return sessionToken
}

export async function getAdminFromSession(sessionToken: string): Promise<AdminUser | null> {
  const supabase = createServerSupabaseClient()

  const { data: session, error } = await supabase
    .from("admin_sessions")
    .select("*, admin_users(*)")
    .eq("session_token", sessionToken)
    .gt("expires_at", new Date().toISOString())
    .single()

  if (error || !session) {
    return null
  }

  return session.admin_users
}

export async function deleteAdminSession(sessionToken: string): Promise<void> {
  const supabase = createServerSupabaseClient()
  await supabase.from("admin_sessions").delete().eq("session_token", sessionToken)
}

export async function getCurrentAdmin(): Promise<AdminUser | null> {
  const cookieStore = await cookies()
  const sessionToken = cookieStore.get("admin-session")?.value

  if (!sessionToken) {
    return null
  }

  return getAdminFromSession(sessionToken)
}
