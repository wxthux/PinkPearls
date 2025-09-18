"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import type { SalesAnalytics } from "@/lib/db/analytics"

interface SalesChartProps {
  data: SalesAnalytics[]
}

export default function SalesChart({ data }: SalesChartProps) {
  // Format data for the chart
  const chartData = data
    .map((item) => ({
      date: new Date(item.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      sales: item.total_sales,
    }))
    .reverse()

  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={chartData}>
        <XAxis dataKey="date" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <div className="rounded-lg border bg-background p-2 shadow-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">Date</span>
                      <span className="font-bold text-muted-foreground">{payload[0].payload.date}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">Sales</span>
                      <span className="font-bold text-red-300">${payload[0].value}</span>
                    </div>
                  </div>
                </div>
              )
            }
            return null
          }}
        />
        <Line
          type="monotone"
          dataKey="sales"
          stroke="#f43f5e"
          strokeWidth={2}
          activeDot={{
            r: 6,
            style: { fill: "#f43f5e", opacity: 0.8 },
          }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
