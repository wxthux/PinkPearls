import { getDashboardStats, getRecentOrders, getSalesAnalytics } from "@/lib/db/analytics"
import DashboardStats from "@/components/dashboard-stats"
import SalesChart from "@/components/sales-chart"
import RecentOrders from "@/components/recent-orders"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Zap, Shield, Clock, Award } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default async function Home() {
  const stats = await getDashboardStats()
  const salesAnalytics = await getSalesAnalytics()
  const recentOrders = await getRecentOrders()

  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Same-day printing and 24-hour turnaround for rush orders",
    },
    {
      icon: Shield,
      title: "Quality Guaranteed",
      description: "100% satisfaction guarantee with premium materials and inks",
    },
    {
      icon: Clock,
      title: "Always On Time",
      description: "99.8% on-time delivery rate with real-time order tracking",
    },
    {
      icon: Award,
      title: "Award Winning",
      description: "Industry-recognized excellence in custom apparel manufacturing",
    },
  ]

  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-rose-500/20 to-background overflow-hidden">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge className="bg-red-300/10 text-red-300 border-red-300/20">
                <Zap className="w-4 h-4 mr-2" />
                Premium Custom Apparel
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                Welcome to <span className="text-red-300">Pink Pearls</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-[600px]">
                Transform your ideas into premium custom apparel. From t-shirts to hoodies, we deliver exceptional
                quality with lightning-fast turnaround times.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/products">
                  <Button size="lg" className="bg-red-300 hover:bg-rose-400">
                    Browse Products <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/discover">
                  <Button size="lg" variant="outline">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/hero.jpg"
                alt="Custom T-Shirts"
                width={800}
                height={500}
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center space-y-4">
                <div className="mx-auto w-12 h-12 bg-red-300/10 rounded-lg flex items-center justify-center">
                  <feature.icon className="w-6 h-6 text-red-300" />
                </div>
                <h3 className="text-lg font-semibold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard Section */}
      <section className="py-20">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Real-Time Analytics Dashboard</h2>
            <p className="text-xl text-muted-foreground max-w-[600px] mx-auto">
              Monitor your business performance with live data and insights
            </p>
          </div>

          <DashboardStats stats={stats} />

          <div className="grid gap-8 mt-12 lg:grid-cols-2">
            <Card className="p-6">
              <CardHeader className="px-0 pt-0">
                <CardTitle className="text-xl">Sales Analytics</CardTitle>
                <CardDescription>Track your revenue growth over time</CardDescription>
              </CardHeader>
              <CardContent className="px-0 pb-0">
                <SalesChart data={salesAnalytics} />
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardHeader className="px-0 pt-0">
                <CardTitle className="text-xl">Recent Orders</CardTitle>
                <CardDescription>Latest customer orders and their status</CardDescription>
              </CardHeader>
              <CardContent className="px-0 pb-0">
                <RecentOrders orders={recentOrders} />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Popular Products Section */}
      <section className="py-20 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Popular Sales</h2>
            <p className="text-xl text-muted-foreground max-w-[600px] mx-auto">
              Discover our best-selling custom apparel items
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="overflow-hidden">
              <div className="relative h-80">
                <Image src="/hero2.jpg" alt="Custom T-Shirts" fill className="object-cover" />
              </div>
              <CardHeader>
                <CardTitle>Nike Pro Shorts</CardTitle>
                <CardDescription>Compression training shorts</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-red-300">Only for $24.99</p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <div className="relative h-80">
                <Image src="/hero3.jpg" alt="Custom Hoodies" fill className="object-cover" />
              </div>
              <CardHeader>
                <CardTitle>Adidas Sport Tights</CardTitle>
                <CardDescription>Supportive training tights</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-red-300">Only for $49.99</p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <div className="relative h-80">
                <Image src="/hero4.jpg" alt="Custom Caps" fill className="object-cover" />
              </div>
              <CardHeader>
                <CardTitle>Nike Dri-FIT Tank</CardTitle>
                <CardDescription>Lightweight workout tank</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-red-300">Only for $19.99</p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-8">
            <Link href="/products">
              <Button size="lg" className="bg-red-300 hover:bg-rose-400">
                View All Products <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">Ready to Get Started?</h2>
            <p className="text-xl text-muted-foreground max-w-[600px] mx-auto">
              Join thousands of satisfied customers who trust Pink Pearls for their custom apparel needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products">
                <Button size="lg" className="bg-red-300 hover:bg-rose-400">
                  Start Your Order <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/support">
                <Button size="lg" variant="outline">
                  Get Support
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
