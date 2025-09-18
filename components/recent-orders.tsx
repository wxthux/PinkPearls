import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface Order {
  id: number
  customer_name: string
  customer_email: string
  total_amount: number
  status: string
  created_at: string
}

interface RecentOrdersProps {
  orders: Order[]
}

export default function RecentOrders({ orders }: RecentOrdersProps) {
  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <div key={order.id} className="flex items-center gap-4">
          <Avatar className="h-9 w-9">
            <AvatarFallback>
              {order.customer_name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">{order.customer_name}</p>
            <p className="text-sm text-muted-foreground">{order.customer_email}</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge
              variant={
                order.status === "Completed" ? "default" : order.status === "Processing" ? "secondary" : "outline"
              }
            >
              {order.status}
            </Badge>
            <div className="font-medium">${order.total_amount.toFixed(2)}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
