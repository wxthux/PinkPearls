import { createServerSupabaseClient } from "../supabase/server"
import type { Database } from "../types/database.types"

export type Product = Database["public"]["Tables"]["products"]["Row"]
export type Category = Database["public"]["Tables"]["categories"]["Row"]

export async function getProducts(search?: string, categoryId?: number) {
  const supabase = createServerSupabaseClient()

  let query = supabase.from("products").select("*, categories(name)")

  if (search) {
    query = query.ilike("name", `%${search}%`)
  }

  if (categoryId) {
    query = query.eq("category_id", categoryId)
  }

  const { data, error } = await query

  if (error) {
    console.error("Error fetching products:", error)
    return []
  }

  return data
}

export async function getProductById(id: number) {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase.from("products").select("*, categories(name)").eq("id", id).single()

  if (error) {
    console.error("Error fetching product:", error)
    return null
  }

  return data
}

export async function getCategories() {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase.from("categories").select("*")

  if (error) {
    console.error("Error fetching categories:", error)
    return []
  }

  return data
}
