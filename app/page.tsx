"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Calendar, Filter, TrendingUp, Users, DollarSign, CreditCard, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

const stats = [
  {
    title: "Total Revenue",
    value: "$45,231.89",
    description: "+20.1% from last month",
    icon: TrendingUp,
    trend: "up",
  },
  {
    title: "Active Users",
    value: "2,350",
    description: "+180.1% from last month",
    icon: Users,
    trend: "up",
  },
  {
    title: "Total Expenses",
    value: "$12,234.00",
    description: "+19% from last month",
    icon: DollarSign,
    trend: "up",
  },
  {
    title: "Pending Invoices",
    value: "12",
    description: "+2 from last month",
    icon: CreditCard,
    trend: "down",
  },
]

const revenueData = [
  { name: "Jan", revenue: 4000 },
  { name: "Feb", revenue: 3000 },
  { name: "Mar", revenue: 5000 },
  { name: "Apr", revenue: 2780 },
  { name: "May", revenue: 1890 },
  { name: "Jun", revenue: 2390 },
]

const expenseData = [
  { name: "Operations", value: 400 },
  { name: "Marketing", value: 300 },
  { name: "Development", value: 300 },
  { name: "HR", value: 200 },
]

const COLORS = ["#FF4F59", "#FFAD28", "#4F46E5", "#10B981"]

const transactions = [
  {
    id: 1,
    description: "Payment from Client A",
    date: "2024-03-15",
    amount: "$2,500.00",
    status: "Completed",
    icon: DollarSign,
  },
  {
    id: 2,
    description: "Office Supplies",
    date: "2024-03-14",
    amount: "$150.00",
    status: "Pending",
    icon: CreditCard,
  },
  {
    id: 3,
    description: "Software Subscription",
    date: "2024-03-13",
    amount: "$99.00",
    status: "Completed",
    icon: CreditCard,
  },
]

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl p-4 rounded-lg shadow-lg border border-white/20 dark:border-gray-800/20">
        <p className="font-medium text-gray-900 dark:text-gray-100">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    )
  }
  return null
}

export default function DashboardPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header Section */}
      <div className="relative rounded-2xl overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 -z-10">
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#FF4F59]/5 via-[#FFAD28]/5 to-transparent" />
          
          {/* Animated diagonal patterns */}
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,#FF4F59/5_50%,transparent_52%)] bg-[length:200px_200px] animate-pattern" />
          <div className="absolute inset-0 bg-[linear-gradient(-45deg,transparent_48%,#FFAD28/5_50%,transparent_52%)] bg-[length:200px_200px] animate-pattern" style={{ animationDelay: '1s' }} />
          
          {/* Subtle noise texture */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc1IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWx0ZXI9InVybCgjYSkiIG9wYWNpdHk9IjAuNCIvPjwvc3ZnPg==')] opacity-10" />
        </div>

        <div className="flex flex-col space-y-4 p-6 bg-white/20 dark:bg-gray-800/20 backdrop-blur-xl border border-white/20 dark:border-gray-700/20">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-[#FF4F59] via-[#FFAD28] to-[#4F46E5] bg-clip-text text-transparent">
                Dashboard Overview
              </h1>
              <p className="text-sm text-muted-foreground/80 max-w-2xl">
                Welcome back! Here's what's happening with your financial metrics today. Stay on top of your business performance with real-time insights.
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" className="bg-white/10 dark:bg-gray-800/10 border-white/10 dark:border-gray-700/10 rounded-2xl">
                <Calendar className="h-4 w-4 mr-2" />
                Last 30 Days
              </Button>
              <Button variant="outline" size="sm" className="bg-white/10 dark:bg-gray-800/10 border-white/10 dark:border-gray-700/10 rounded-2xl">
                <Filter className="h-4 w-4 mr-2" />
                Filter View
              </Button>
            </div>
          </div>
          
          {/* Quick Stats Summary */}
          <div className="flex items-center space-x-6 pt-4 border-t border-white/10 dark:border-gray-700/10">
            <div className="flex items-center space-x-2">
              <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
              <span className="text-xs text-muted-foreground/80">Revenue Up 20.1%</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
              <span className="text-xs text-muted-foreground/80">2,350 Active Users</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="h-1.5 w-1.5 rounded-full bg-yellow-500" />
              <span className="text-xs text-muted-foreground/80">12 Pending Invoices</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="bg-white/20 dark:bg-gray-800/20 backdrop-blur-xl border border-white/20 dark:border-gray-700/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground/80">
                {stat.title}
              </CardTitle>
              <div className="h-8 w-8 rounded-full bg-white/10 dark:bg-gray-800/10 flex items-center justify-center">
                <stat.icon className="h-4 w-4 text-muted-foreground/80" />
              </div>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="flex items-center space-x-2 mt-1">
                {stat.trend === "up" ? (
                  <ArrowUpRight className="h-4 w-4 text-green-500" />
                ) : (
                  <ArrowDownRight className="h-4 w-4 text-red-500" />
                )}
                <p className="text-xs text-muted-foreground/80">
                  {stat.description}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-white/20 dark:bg-gray-800/20 backdrop-blur-xl border border-white/20 dark:border-gray-700/20">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Revenue Overview</CardTitle>
            <CardDescription className="text-xs">Track your revenue growth and trends</CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#FF4F59" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#FF4F59" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" stroke="#888888" fontSize={10} />
                  <YAxis stroke="#888888" fontSize={10} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#FF4F59"
                    fillOpacity={1}
                    fill="url(#colorRevenue)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/20 dark:bg-gray-800/20 backdrop-blur-xl border border-white/20 dark:border-gray-700/20">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Expense Breakdown</CardTitle>
            <CardDescription className="text-xs">Analyze your expense categories</CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={expenseData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={70}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {expenseData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card className="bg-white/20 dark:bg-gray-800/20 backdrop-blur-xl border border-white/20 dark:border-gray-700/20">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg">Recent Transactions</CardTitle>
          <CardDescription className="text-xs">Your latest financial activities</CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-4">
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-4 rounded-lg bg-white/10 dark:bg-gray-800/10 backdrop-blur-sm hover:bg-white/20 dark:hover:bg-gray-800/20 transition-colors duration-200"
              >
                <div className="flex items-center space-x-4">
                  <div className="h-10 w-10 rounded-full bg-white/10 dark:bg-gray-800/10 flex items-center justify-center">
                    <transaction.icon className="h-5 w-5 text-muted-foreground/80" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{transaction.description}</p>
                    <p className="text-xs text-muted-foreground/80">{transaction.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{transaction.amount}</p>
                  <Badge
                    variant={transaction.status === "Completed" ? "default" : "secondary"}
                    className="mt-1 text-xs"
                  >
                    {transaction.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* Footer */}
      <footer className="py-6 text-center text-xs text-muted-foreground/60">
        <p>Copyright © 2025 Genpact India. All rights reserved.</p>
      </footer>
    </div>
  )
}