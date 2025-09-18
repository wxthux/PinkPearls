export interface AdminUser {
  id: number
  email: string
  username: string
  avatar: string
  created_at: string
  updated_at: string
}

export interface AdminSession {
  id: number
  admin_id: number
  session_token: string
  expires_at: string
  created_at: string
}

export interface ProductActivityLog {
  id: number
  product_id: number
  admin_id: number | null
  action: "created" | "updated" | "deleted"
  changes: Record<string, any>
  created_at: string
}

export interface AdminDashboardStats {
  totalProducts: number
  totalOrders: number
  totalSales: number
  lowStockCount: number
  todayOrders: number
  todaySales: number
  avgOrderValue: number
  topSellingProducts: Array<{
    id: number
    name: string
    total_sold: number
    revenue: number
  }>
  recentActivity: ProductActivityLog[]
  salesGrowth: number
  orderGrowth: number
}
