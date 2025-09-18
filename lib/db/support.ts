import { createServerSupabaseClient } from "../supabase/server"
import type { Database } from "../types/database.types"

export type SupportQuestion = Database["public"]["Tables"]["support_questions"]["Row"]

export async function getSupportQuestions() {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase.from("support_questions").select("*")

  if (error) {
    console.error("Error fetching support questions:", error)
    return []
  }

  return data
}
