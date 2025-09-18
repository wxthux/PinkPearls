import AdminLayout from "@/components/admin/admin-layout"
import { getAdminDashboardStats } from "@/lib/db/admin-analytics"
import { getSalesAnalytics } from "@/lib/db/analytics"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import SalesChart from "@/components/sales-chart"
import { DollarSign, Package, ShoppingCart, AlertTriangle, TrendingUp, TrendingDown, Activity } from "lucide-react"

export default async function AdminDashboardPage() {
  const stats = await getAdminDashboardStats()
  const salesAnalytics = await getSalesAnalytics()

  const statCards = [
    {
      title: "Total Products",
      value: stats.totalProducts,
      icon: Package,
      description: "Products in inventory",
    },
    {
      title: "Total Orders",
      value: stats.totalOrders,
      icon: ShoppingCart,
      description: "Orders processed",
    },
    {
      title: "Total Sales",
      value: `$${stats.totalSales.toFixed(2)}`,
      icon: DollarSign,
      description: "Revenue generated",
    },
    {
      title: "Low Stock",
      value: stats.lowStockCount,
      icon: AlertTriangle,
      description: "Products with low stock",
      variant: stats.lowStockCount > 0 ? "destructive" : "default",
    },
    {
      title: "Today's Orders",
      value: stats.todayOrders,
      icon: ShoppingCart,
      description: "Orders today",
      growth: stats.orderGrowth,
    },
    {
      title: "Today's Sales",
      value: `$${stats.todaySales.toFixed(2)}`,
      icon: DollarSign,
      description: "Revenue today",
      growth: stats.salesGrowth,
    },
    {
      title: "Avg Order Value",
      value: `$${stats.avgOrderValue.toFixed(2)}`,
      icon: TrendingUp,
      description: "Average per order",
    },
    {
      title: "Active Products",
      value: stats.totalProducts - stats.lowStockCount,
      icon: Activity,
      description: "Products in stock",
    },
  ]

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's what's happening with your store.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {statCards.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon
                  className={`h-4 w-4 ${stat.variant === "destructive" ? "text-destructive" : "text-muted-foreground"}`}
                />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center space-x-2">
                  <p className="text-xs text-muted-foreground">{stat.description}</p>
                  {stat.growth !== undefined && (
                    <Badge variant={stat.growth >= 0 ? "default" : "destructive"} className="text-xs">
                      {stat.growth >= 0 ? (
                        <TrendingUp className="w-3 h-3 mr-1" />
                      ) : (
                        <TrendingDown className="w-3 h-3 mr-1" />
                      )}
                      {Math.abs(stat.growth).toFixed(1)}%
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Sales Chart */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Sales Analytics</CardTitle>
              <CardDescription>Track your revenue growth over the last 30 days</CardDescription>
            </CardHeader>
            <CardContent>
              <SalesChart data={salesAnalytics} />
            </CardContent>
          </Card>

          {/* Top Selling Products */}
          <Card>
            <CardHeader>
              <CardTitle>Top Selling Products</CardTitle>
              <CardDescription>Best performing products by quantity sold</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stats.topSellingProducts.map((product, index) => (
                  <div key={product.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-red-300/10 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-red-300">#{index + 1}</span>
                      </div>
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-muted-foreground">{product.total_sold} sold</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${product.revenue.toFixed(2)}</p>
                      <p className="text-sm text-muted-foreground">revenue</p>
                    </div>
                  </div>
                ))}
                {stats.topSellingProducts.length === 0 && (
                  <p className="text-center text-muted-foreground py-4">No sales data available</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest product changes and updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stats.recentActivity.map((activity, index) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div
                      className={`w-2 h-2 rounded-full mt-2 ${
                        activity.action === "created"
                          ? "bg-green-500"
                          : activity.action === "updated"
                            ? "bg-blue-500"
                            : "bg-red-500"
                      }`}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm">
                        Product <span className="font-medium">#{activity.product_id}</span> was{" "}
                        <span className="font-medium">{activity.action}</span>
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(activity.created_at).toLocaleDateString()} at{" "}
                        {new Date(activity.created_at).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
                {stats.recentActivity.length === 0 && (
                  <p className="text-center text-muted-foreground py-4">No recent activity</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  )
}
