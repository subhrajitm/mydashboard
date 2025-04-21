"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Calendar, Filter, TrendingUp, Users, DollarSign, CreditCard, ArrowUpRight, ArrowDownRight, Clock, Activity } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Suspense, lazy, useMemo } from "react"
import StatsCard from "@/components/stats/StatsCard"
import type { LucideIcon } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

// Lazy load chart components
const RevenueChart = lazy(() => import("@/components/charts/RevenueChart"))
const ExpensePieChart = lazy(() => import("@/components/charts/ExpensePieChart"))

interface Stat {
  title: string
  value: string
  description: string
  icon: LucideIcon
  trend: "up" | "down"
}

const stats: Stat[] = [
  {
    title: "Total Revenue",
    value: "$45,231.89",
    description: "+20.1% from last month",
    icon: DollarSign,
    trend: "up" as const
  },
  {
    title: "Subscriptions",
    value: "+2350",
    description: "+180.1% from last month",
    icon: Users,
    trend: "up" as const
  },
  {
    title: "Sales",
    value: "+12,234",
    description: "+19% from last month",
    icon: CreditCard,
    trend: "up" as const
  },
  {
    title: "Active Now",
    value: "+573",
    description: "+201 since last hour",
    icon: Activity,
    trend: "down" as const
  }
]

const revenueData = [
  { name: "Jan", revenue: 4000, previousRevenue: 3200, transactions: 156 },
  { name: "Feb", revenue: 3000, previousRevenue: 2800, transactions: 142 },
  { name: "Mar", revenue: 5000, previousRevenue: 4100, transactions: 189 },
  { name: "Apr", revenue: 2780, previousRevenue: 2400, transactions: 134 },
  { name: "May", revenue: 1890, previousRevenue: 2100, transactions: 116 },
  { name: "Jun", revenue: 2390, previousRevenue: 2000, transactions: 125 },
]

const expenseData = [
  { name: "Operations", value: 400, description: "Day-to-day operational costs" },
  { name: "Marketing", value: 300, description: "Advertising and promotions" },
  { name: "Development", value: 300, description: "Product development" },
  { name: "HR", value: 200, description: "Human resources and training" },
]

const COLORS: { [key: string]: string } = {
  Operations: "#0088FE",
  Marketing: "#00C49F",
  Development: "#FFBB28",
  HR: "#FF8042",
}

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
          <StatsCard key={stat.title} stat={stat} />
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-white/20 dark:bg-gray-800/20 backdrop-blur-xl border border-white/20 dark:border-gray-700/20">
          <CardHeader className="pb-2 border-b border-white/10 dark:border-gray-700/10">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base">Revenue Overview</CardTitle>
                <CardDescription className="text-xs">Track your revenue growth and trends</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 text-xs">
                  <div className="flex items-center gap-1">
                    <div className="h-2 w-2 rounded-full bg-[#FF4F59]" />
                    <span className="text-muted-foreground">Current</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="h-2 w-2 rounded-full bg-[#FF4F59]/20" />
                    <span className="text-muted-foreground">Previous</span>
                  </div>
                </div>
                <Select defaultValue="6m">
                  <SelectTrigger className="w-[100px] h-7 text-xs">
                    <SelectValue placeholder="Select range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1m">1 Month</SelectItem>
                    <SelectItem value="3m">3 Months</SelectItem>
                    <SelectItem value="6m">6 Months</SelectItem>
                    <SelectItem value="1y">1 Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-2">
            <Suspense fallback={<Skeleton className="h-[300px] w-full" />}>
              <RevenueChart data={revenueData} />
            </Suspense>
          </CardContent>
        </Card>

        <Card className="bg-white/20 dark:bg-gray-800/20 backdrop-blur-xl border border-white/20 dark:border-gray-700/20">
          <CardHeader className="pb-2 border-b border-white/10 dark:border-gray-700/10">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base">Expense Breakdown</CardTitle>
                <CardDescription className="text-xs">Analyze your expense categories</CardDescription>
              </div>
              <div className="text-xl font-bold bg-gradient-to-r from-[#FF4F59] to-[#FFAD28] bg-clip-text text-transparent">
                $1,200
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="grid grid-cols-2 gap-3">
              <Suspense fallback={<Skeleton className="h-[200px] w-full" />}>
                <ExpensePieChart data={expenseData} colors={COLORS} />
              </Suspense>
              <div className="space-y-3">
                {expenseData.map((item) => {
                  const percentage = ((item.value / expenseData.reduce((acc, curr) => acc + curr.value, 0)) * 100).toFixed(1)
                  return (
                    <div key={item.name} className="space-y-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div 
                            className="h-3 w-3 rounded-full" 
                            style={{ backgroundColor: COLORS[item.name] }}
                          />
                          <span className="text-sm font-medium">{item.name}</span>
                        </div>
                        <span className="text-sm font-medium">${item.value}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 rounded-full bg-white/10 dark:bg-gray-800/10">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${percentage}%`,
                              backgroundColor: COLORS[item.name]
                            }}
                          />
                        </div>
                        <span className="text-xs text-muted-foreground">{percentage}%</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card className="bg-white/20 dark:bg-gray-800/20 backdrop-blur-xl border border-white/20 dark:border-gray-700/20">
        <CardHeader className="pb-4 border-b border-white/10 dark:border-gray-700/10">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">Recent Transactions</CardTitle>
              <CardDescription className="text-xs">Your latest financial activities</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search transactions..."
                  className="pl-8 h-8 w-[200px] bg-white/10 dark:bg-gray-800/10 border-white/10 dark:border-gray-700/10"
                />
              </div>
              <Button variant="outline" size="sm" className="h-8 bg-white/10 dark:bg-gray-800/10 border-white/10 dark:border-gray-700/10">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="space-y-3">
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="group flex items-center justify-between p-4 rounded-lg bg-white/10 dark:bg-gray-800/10 backdrop-blur-sm hover:bg-white/20 dark:hover:bg-gray-800/20 transition-all duration-200 cursor-pointer"
              >
                <div className="flex items-center space-x-4">
                  <div className="h-10 w-10 rounded-full bg-white/10 dark:bg-gray-800/10 flex items-center justify-center group-hover:bg-white/20 dark:group-hover:bg-gray-800/20 transition-colors">
                    <transaction.icon className="h-5 w-5 text-muted-foreground/80 group-hover:text-[#FF4F59] transition-colors" />
                  </div>
                  <div>
                    <p className="text-sm font-medium group-hover:text-[#FF4F59] transition-colors">{transaction.description}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-xs text-muted-foreground/80">{transaction.date}</p>
                      <span className="text-xs text-muted-foreground/80">•</span>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3 text-muted-foreground/80" />
                        <span className="text-xs text-muted-foreground/80">2h ago</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm font-medium group-hover:text-[#FF4F59] transition-colors">{transaction.amount}</p>
                    <Badge
                      variant={transaction.status === "Completed" ? "default" : "secondary"}
                      className={`mt-1 text-xs ${
                        transaction.status === "Completed" 
                          ? "bg-green-500/10 text-green-500 border-green-500/20" 
                          : "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                      }`}
                    >
                      {transaction.status}
                    </Badge>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/20 dark:hover:bg-gray-800/20"
                  >
                    <ArrowUpRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground/60">
            <p>Showing {transactions.length} of {transactions.length} transactions</p>
            <Button
              variant="ghost"
              size="sm"
              className="text-xs h-7 px-2 hover:bg-white/10 dark:hover:bg-gray-800/10"
            >
              View All
            </Button>
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