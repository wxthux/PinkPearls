import { createServerSupabaseClient } from "../supabase/server"
import type { AdminDashboardStats } from "../types/admin.types"

export async function getAdminDashboardStats(): Promise<AdminDashboardStats> {
  const supabase = createServerSupabaseClient()

  // Get basic stats
  const { count: totalProducts } = await supabase.from("products").select("*", { count: "exact", head: true })

  const { count: totalOrders } = await supabase.from("orders").select("*", { count: "exact", head: true })

  const { data: salesData } = await supabase.from("orders").select("total_amount")
  const totalSales = salesData?.reduce((sum, order) => sum + order.total_amount, 0) || 0

  const { data: lowStockProducts } = await supabase.from("products").select("*").lt("stock_count", 10)

  // Get today's stats
  const today = new Date().toISOString().split("T")[0]
  const { count: todayOrders } = await supabase
    .from("orders")
    .select("*", { count: "exact", head: true })
    .gte("created_at", `${today}T00:00:00.000Z`)

  const { data: todaySalesData } = await supabase
    .from("orders")
    .select("total_amount")
    .gte("created_at", `${today}T00:00:00.000Z`)

  const todaySales = todaySalesData?.reduce((sum, order) => sum + order.total_amount, 0) || 0

  // Calculate average order value
  const avgOrderValue = totalOrders ? totalSales / (totalOrders || 1) : 0

  // Get top selling products
  const { data: topSellingData } = await supabase.from("order_items").select(`
      product_id,
      quantity,
      price,
      products(name)
    `)

  const productSales =
    topSellingData?.reduce(
      (acc, item) => {
        const productId = item.product_id
        if (!acc[productId]) {
          acc[productId] = {
            id: productId,
            name: item.products?.name || "Unknown",
            total_sold: 0,
            revenue: 0,
          }
        }
        acc[productId].total_sold += item.quantity
        acc[productId].revenue += item.quantity * item.price
        return acc
      },
      {} as Record<number, any>,
    ) || {}

  const topSellingProducts = Object.values(productSales)
    .sort((a: any, b: any) => b.total_sold - a.total_sold)
    .slice(0, 5)

  // Get recent activity
  const { data: recentActivity } = await supabase
    .from("product_activity_log")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(10)

  // Calculate growth (simplified - comparing with yesterday)
  const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split("T")[0]
  const { count: yesterdayOrders } = await supabase
    .from("orders")
    .select("*", { count: "exact", head: true })
    .gte("created_at", `${yesterday}T00:00:00.000Z`)
    .lt("created_at", `${today}T00:00:00.000Z`)

  const { data: yesterdaySalesData } = await supabase
    .from("orders")
    .select("total_amount")
    .gte("created_at", `${yesterday}T00:00:00.000Z`)
    .lt("created_at", `${today}T00:00:00.000Z`)

  const yesterdaySales = yesterdaySalesData?.reduce((sum, order) => sum + order.total_amount, 0) || 0

  const salesGrowth = yesterdaySales ? ((todaySales - yesterdaySales) / yesterdaySales) * 100 : 0
  const orderGrowth = yesterdayOrders
    ? (((todayOrders || 0) - (yesterdayOrders || 0)) / (yesterdayOrders || 1)) * 100
    : 0

  return {
    totalProducts: totalProducts || 0,
    totalOrders: totalOrders || 0,
    totalSales,
    lowStockCount: lowStockProducts?.length || 0,
    todayOrders: todayOrders || 0,
    todaySales,
    avgOrderValue,
    topSellingProducts,
    recentActivity: recentActivity || [],
    salesGrowth,
    orderGrowth,
  }
}

export async function logProductActivity(
  productId: number,
  adminId: number,
  action: "created" | "updated" | "deleted",
  changes: Record<string, any> = {},
): Promise<void> {
  const supabase = createServerSupabaseClient()

  await supabase.from("product_activity_log").insert({
    product_id: productId,
    admin_id: adminId,
    action,
    changes,
  })
}
