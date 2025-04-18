"use client"

import { useState } from "react"
import { CustomCard } from "../components/ui/custom-card"
import { CustomButton } from "../components/ui/custom-button"
import { SearchInput } from "../components/ui/custom-input"
import { Badge } from "@/components/ui/badge"
import {
  FileText,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  Filter,
  Building2,
  ClipboardCheck,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  RefreshCw,
  X,
  CheckCircle,
  XCircle,
  BarChart3,
  LineChart,
  PieChart as PieChartIcon,
  Calendar,
  ChevronDown,
} from "lucide-react"
import {
  BarChart,
  Bar,
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface WarrantyData {
  shop: string
  approved: number
  pending: number
  rejected: number
}

interface WarrantyStat {
  title: string
  value: string
  description: string
  icon: React.ElementType
  trend: string
  trendDirection: string
  color: string
  bgColor: string
}

const warrantyData: WarrantyData[] = [
  { shop: "Shop A", approved: 12, pending: 5, rejected: 3 },
  { shop: "Shop B", approved: 8, pending: 7, rejected: 2 },
  { shop: "Shop C", approved: 15, pending: 3, rejected: 1 },
  { shop: "Shop D", approved: 10, pending: 4, rejected: 2 },
]

const claimsDistribution = {
  approved: 150,
  pending: 45,
  rejected: 25
}

const monthlyData = [
  { month: "Jan", successful: 25, rejected: 5 },
  { month: "Feb", successful: 30, rejected: 8 },
  { month: "Mar", successful: 35, rejected: 10 },
  { month: "Apr", successful: 40, rejected: 12 },
  { month: "May", successful: 45, rejected: 15 },
  { month: "Jun", successful: 50, rejected: 20 },
]

const warrantyStats: WarrantyStat[] = [
  {
    title: "Total Claims",
    value: "220",
    description: "Across all shops",
    icon: ClipboardCheck,
    trend: "+12%",
    trendDirection: "up",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10"
  },
  {
    title: "Approved",
    value: "150",
    description: "Successfully processed",
    icon: CheckCircle,
    trend: "+8%",
    trendDirection: "up",
    color: "text-green-500",
    bgColor: "bg-green-500/10"
  },
  {
    title: "Pending",
    value: "45",
    description: "Under review",
    icon: Clock,
    trend: "-3%",
    trendDirection: "down",
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10"
  },
  {
    title: "Rejected",
    value: "25",
    description: "Not eligible",
    icon: XCircle,
    trend: "+2%",
    trendDirection: "up",
    color: "text-red-500",
    bgColor: "bg-red-500/10"
  },
]

const COLORS = {
  primary: '#FF4F59',
  secondary: '#FFAD28',
  tertiary: '#444744',
  background: '#FFFAF4',
  text: '#181C23',
  grid: '#FF4F59/10',
}

const CustomTooltip = ({ active, payload, label, type = 'default' }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-lg border border-[#FF4F59]/20">
        <p className="font-medium text-[#181C23]">{label}</p>
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

const resolutionData = [
  { month: "Jan", days: 5 },
  { month: "Feb", days: 4 },
  { month: "Mar", days: 6 },
  { month: "Apr", days: 3 },
  { month: "May", days: 4 },
  { month: "Jun", days: 5 },
]

const recentClaims = [
  { id: 1, product: "Product A", date: "2024-03-15", status: "Resolved" },
  { id: 2, product: "Product B", date: "2024-03-14", status: "Pending" },
  { id: 3, product: "Product C", date: "2024-03-13", status: "Resolved" },
  { id: 4, product: "Product D", date: "2024-03-12", status: "Pending" },
]

export default function WarrantyMetrics() {
  const [activeTimeframe, setActiveTimeframe] = useState("1w")
  const [searchQuery, setSearchQuery] = useState("")
  const [activeView, setActiveView] = useState("overview")
  const [selectedShop, setSelectedShop] = useState("all")
  const [chartType, setChartType] = useState("bar")

  const prepareShopChartData = () => {
    return warrantyData.map(shop => ({
      name: shop.shop,
      approved: shop.approved,
      pending: shop.pending,
      rejected: shop.rejected,
    }))
  }

  const prepareClaimsPieData = () => {
    return [
      { name: 'Approved', value: claimsDistribution.approved },
      { name: 'Pending', value: claimsDistribution.pending },
      { name: 'Rejected', value: claimsDistribution.rejected },
    ]
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Resolved':
        return 'bg-green-500/10 text-green-500'
      case 'Pending':
        return 'bg-yellow-500/10 text-yellow-500'
      case 'Rejected':
        return 'bg-red-500/10 text-red-500'
      default:
        return 'bg-gray-500/10 text-gray-500'
    }
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#FF4F59] to-[#FFAD28] bg-clip-text text-transparent">
            Warranty Metrics
          </h1>
          <p className="text-sm text-muted-foreground">
            Track and analyze warranty claims and performance metrics
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={activeTimeframe} onValueChange={setActiveTimeframe}>
            <SelectTrigger className="w-[140px] bg-white/20 dark:bg-gray-800/20 backdrop-blur-xl border-white/20">
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-white/20">
              <SelectItem value="1w">Last 7 days</SelectItem>
              <SelectItem value="1m">Last 30 days</SelectItem>
              <SelectItem value="3m">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-muted-foreground" />
            <Input
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-7 h-8 bg-white/20 dark:bg-gray-800/20 backdrop-blur-xl border-white/20"
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-5 w-5"
                onClick={() => setSearchQuery("")}
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 bg-white/20 dark:bg-gray-800/20 backdrop-blur-xl border-white/20">
          <TabsTrigger value="overview" className="data-[state=active]:bg-white/30 dark:data-[state=active]:bg-gray-800/30">Overview</TabsTrigger>
          <TabsTrigger value="analytics" className="data-[state=active]:bg-white/30 dark:data-[state=active]:bg-gray-800/30">Analytics</TabsTrigger>
          <TabsTrigger value="reports" className="data-[state=active]:bg-white/30 dark:data-[state=active]:bg-gray-800/30">Reports</TabsTrigger>
          <TabsTrigger value="settings" className="data-[state=active]:bg-white/30 dark:data-[state=active]:bg-gray-800/30">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {/* Summary Cards */}
          <div className="grid grid-cols-4 gap-4">
            {warrantyStats.map((stat, index) => (
              <Card key={index} className="backdrop-blur-lg bg-white/10 dark:bg-gray-800/10 border border-white/20 dark:border-gray-700/20 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-gray-500 dark:text-gray-400">{stat.title}</p>
                      <div className="flex items-baseline gap-2">
                        <h3 className="text-lg font-bold">{stat.value}</h3>
                        <span className={`text-xs font-medium ${stat.trendDirection === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                          {stat.trend}
                        </span>
                      </div>
                    </div>
                    <div className={`p-2 rounded-full ${stat.bgColor} ${stat.color}`}>
                      <stat.icon className="h-4 w-4" />
                    </div>
                  </div>
                  <div className="mt-2">
                    <p className="text-xs text-muted-foreground">{stat.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Warranty Claims Chart */}
            <Card className="bg-white/20 dark:bg-gray-900/20 backdrop-blur-xl border-white/20 shadow-lg shadow-black/5">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                  <CardTitle className="text-lg">Warranty Claims</CardTitle>
                  <CardDescription className="text-xs">Claims by product category</CardDescription>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-1 bg-white/20 dark:bg-gray-800/20 backdrop-blur-xl border-white/20">
                      {chartType === 'bar' ? <BarChart3 className="h-3 w-3" /> : <LineChart className="h-3 w-3" />}
                      <ChevronDown className="h-3 w-3" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-white/20">
                    <DropdownMenuItem onClick={() => setChartType('bar')}>
                      <BarChart3 className="h-3 w-3 mr-2" />
                      Bar Chart
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setChartType('line')}>
                      <LineChart className="h-3 w-3 mr-2" />
                      Line Chart
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    {chartType === 'bar' ? (
                      <BarChart data={warrantyData}>
                        <XAxis dataKey="shop" fontSize={10} />
                        <YAxis fontSize={10} />
                        <RechartsTooltip content={<CustomTooltip />} />
                        <Bar dataKey="approved" fill="#4CAF50" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="pending" fill="#FFC107" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="rejected" fill="#F44336" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    ) : (
                      <RechartsLineChart data={warrantyData}>
                        <XAxis dataKey="shop" fontSize={10} />
                        <YAxis fontSize={10} />
                        <RechartsTooltip content={<CustomTooltip />} />
                        <Line type="monotone" dataKey="approved" stroke="#4CAF50" strokeWidth={2} />
                        <Line type="monotone" dataKey="pending" stroke="#FFC107" strokeWidth={2} />
                        <Line type="monotone" dataKey="rejected" stroke="#F44336" strokeWidth={2} />
                      </RechartsLineChart>
                    )}
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Resolution Time Chart */}
            <Card className="bg-white/20 dark:bg-gray-900/20 backdrop-blur-xl border-white/20 shadow-lg shadow-black/5">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Resolution Time</CardTitle>
                <CardDescription className="text-xs">Average time to resolve claims</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={resolutionData}>
                      <XAxis dataKey="month" fontSize={10} />
                      <YAxis fontSize={10} />
                      <RechartsTooltip content={<CustomTooltip />} />
                      <Area type="monotone" dataKey="days" stroke="#FFAD28" fill="#FFAD28/20" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Claims */}
          <Card className="bg-white/20 dark:bg-gray-900/20 backdrop-blur-xl border-white/20 shadow-lg shadow-black/5">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle className="text-lg">Recent Claims</CardTitle>
                <CardDescription className="text-xs">Latest warranty claims and their status</CardDescription>
              </div>
              <Button variant="outline" size="sm" className="gap-1 bg-white/20 dark:bg-gray-800/20 backdrop-blur-xl border-white/20">
                <Download className="h-3 w-3" />
                Export
              </Button>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2">
                {recentClaims.map((claim) => (
                  <div key={claim.id} className="flex items-center justify-between p-3 rounded-lg bg-white/10 dark:bg-gray-800/10 backdrop-blur-xl border border-white/20 hover:bg-white/20 dark:hover:bg-gray-800/20 transition-colors duration-200">
                    <div className="flex items-center space-x-3">
                      <div className="p-1.5 rounded-full bg-[#FF4F59]/10">
                        <FileText className="h-3 w-3 text-[#FF4F59]" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{claim.product}</p>
                        <p className="text-xs text-muted-foreground">{claim.date}</p>
                      </div>
                    </div>
                    <Badge className={getStatusColor(claim.status)}>
                      {claim.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-8">
          {/* Analytics content will be added here */}
        </TabsContent>

        <TabsContent value="reports" className="space-y-8">
          {/* Reports content will be added here */}
        </TabsContent>

        <TabsContent value="settings" className="space-y-8">
          {/* Settings content will be added here */}
        </TabsContent>
      </Tabs>

      {/* Footer */}
      <footer className="py-6 text-center text-xs text-muted-foreground/60">
        <p>Copyright © 2025 Genpact India. All rights reserved.</p>
      </footer>
    </div>
  )
} 