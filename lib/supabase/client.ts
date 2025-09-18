import { createClient } from "@supabase/supabase-js"
import type { Database } from "../types/database.types"

// Create a single supabase client for the browser
let client: ReturnType<typeof createBrowserSupabaseClient> | null = null

export const createBrowserSupabaseClient = () => {
  if (client) return client

  client = createClient<Database>(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

  return client
}
