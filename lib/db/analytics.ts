import { createServerSupabaseClient } from "../supabase/server"
import type { Database } from "../types/database.types"

export type SalesAnalytics = Database["public"]["Tables"]["sales_analytics"]["Row"]

export async function getSalesAnalytics() {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase
    .from("sales_analytics")
    .select("*")
    .order("date", { ascending: false })
    .limit(30)

  if (error) {
    console.error("Error fetching sales analytics:", error)
    return []
  }

  return data
}

export async function getRecentOrders() {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase
    .from("orders")
    .select("*, order_items(*, products(name))")
    .order("created_at", { ascending: false })
    .limit(5)

  if (error) {
    console.error("Error fetching recent orders:", error)
    return []
  }

  return data
}

export async function getDashboardStats() {
  const supabase = createServerSupabaseClient()

  // Get total products
  const { count: totalProducts, error: productsError } = await supabase
    .from("products")
    .select("*", { count: "exact", head: true })

  // Get total orders
  const { count: totalOrders, error: ordersError } = await supabase
    .from("orders")
    .select("*", { count: "exact", head: true })

  // Get low stock products
  const { data: lowStockProducts, error: lowStockError } = await supabase
    .from("products")
    .select("*")
    .lt("stock_count", 10)

  // Get total sales
  const { data: salesData, error: salesError } = await supabase.from("orders").select("total_amount")

  const totalSales = salesData?.reduce((sum, order) => sum + order.total_amount, 0) || 0

  if (productsError || ordersError || lowStockError || salesError) {
    console.error("Error fetching dashboard stats")
    return {
      totalProducts: 0,
      totalOrders: 0,
      lowStockCount: 0,
      totalSales: 0,
    }
  }

  return {
    totalProducts: totalProducts || 0,
    totalOrders: totalOrders || 0,
    lowStockCount: lowStockProducts?.length || 0,
    totalSales,
  }
}
