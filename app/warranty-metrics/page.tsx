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

const modelData = [
  { model: "Model1", creditsPaid: 152, disallowedAmount: 81 },
  { model: "Model2", creditsPaid: 22, disallowedAmount: 67 },
  { model: "Model3", creditsPaid: 139, disallowedAmount: 65 },
  { model: "Model4", creditsPaid: 474, disallowedAmount: 371 },
  { model: "Model5", creditsPaid: 116, disallowedAmount: 238 },
  { model: "Model6", creditsPaid: 35, disallowedAmount: 11 },
  { model: "Model7", creditsPaid: 2, disallowedAmount: 0 },
  { model: "Model8", creditsPaid: 462, disallowedAmount: 544 },
  { model: "Model9", creditsPaid: 4, disallowedAmount: 2 },
]

const avgTATData = [
  { model: "Model1", avgTAT: 12 },
  { model: "Model2", avgTAT: 8 },
  { model: "Model3", avgTAT: 15 },
  { model: "Model4", avgTAT: 10 },
  { model: "Model5", avgTAT: 14 },
  { model: "Model6", avgTAT: 7 },
  { model: "Model7", avgTAT: 9 },
  { model: "Model8", avgTAT: 11 },
  { model: "Model9", avgTAT: 6 },
]

export default function WarrantyMetrics() {
  const [activeTimeframe, setActiveTimeframe] = useState("1w")
  const [searchQuery, setSearchQuery] = useState("")
  const [activeView, setActiveView] = useState("overview")
  const [selectedShop, setSelectedShop] = useState("all")
  const [showAvgTAT, setShowAvgTAT] = useState(false)
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
            <SelectTrigger className="w-[140px] bg-white/20 dark:bg-gray-800/20 backdrop-blur-xl border border-white/20 dark:border-gray-700/20">
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/20">
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
              className="pl-7 h-8 bg-white/20 dark:bg-gray-800/20 backdrop-blur-xl border border-white/20 dark:border-gray-700/20"
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-5 w-5 hover:bg-white/20 dark:hover:bg-gray-800/20"
                onClick={() => setSearchQuery("")}
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 bg-white/20 dark:bg-gray-800/20 backdrop-blur-xl border border-white/20 dark:border-gray-700/20 rounded-xl">
          <TabsTrigger value="overview" className="data-[state=active]:bg-white/30 dark:data-[state=active]:bg-gray-800/30 rounded-lg">Overview</TabsTrigger>
          <TabsTrigger value="analytics" className="data-[state=active]:bg-white/30 dark:data-[state=active]:bg-gray-800/30 rounded-lg">Analytics</TabsTrigger>
          <TabsTrigger value="reports" className="data-[state=active]:bg-white/30 dark:data-[state=active]:bg-gray-800/30 rounded-lg">Reports</TabsTrigger>
          <TabsTrigger value="updates" className="data-[state=active]:bg-white/30 dark:data-[state=active]:bg-gray-800/30 rounded-lg">Updates</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {/* Summary Cards */}
          <div className="grid grid-cols-4 gap-4">
            {warrantyStats.map((stat, index) => (
              <Card key={index} className="backdrop-blur-lg bg-white/10 dark:bg-gray-800/10 border border-white/20 dark:border-gray-700/20 shadow-lg hover:shadow-xl transition-shadow rounded-xl overflow-hidden">
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
            {/* Credit Paid vs Disallowance Chart */}
            <Card className="bg-white/20 dark:bg-gray-900/20 backdrop-blur-xl border border-white/20 dark:border-gray-700/20 shadow-lg hover:shadow-xl transition-shadow rounded-xl overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-white/10 dark:border-gray-700/10">
                <div>
                  <CardTitle className="text-lg">
                    {showAvgTAT ? "Credit Paid - Avg TAT" : "Credit Paid Vs Disallowance"}
                  </CardTitle>
                  <CardDescription className="text-xs">
                    {showAvgTAT ? "Average turnaround time by model" : "Comparison by model"}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowAvgTAT(!showAvgTAT)}
                    className="gap-1 bg-white/20 dark:bg-gray-800/20 backdrop-blur-xl border-white/20 hover:bg-white/30 dark:hover:bg-gray-800/30 transition-colors"
                  >
                    {showAvgTAT ? "Show Disallowance" : "Show Avg TAT"}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-4 px-4">
                <div className="h-[300px] bg-white/5 dark:bg-gray-900/5 rounded-lg p-2 border border-white/10 dark:border-gray-700/10">
                  <ResponsiveContainer width="100%" height="100%">
                    {!showAvgTAT ? (
                      <BarChart data={modelData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200/20" />
                        <XAxis dataKey="model" fontSize={10} stroke="currentColor" strokeOpacity={0.5} />
                        <YAxis
                          fontSize={10}
                          tickFormatter={(value) => `${value}M`}
                          domain={[0, 600]}
                          ticks={[0, 100, 200, 300, 400, 500, 600]}
                          stroke="currentColor"
                          strokeOpacity={0.5}
                        />
                        <RechartsTooltip
                          content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                              return (
                                <div className="bg-white/90 dark:bg-gray-800/90 p-2 rounded-lg shadow-xl border border-white/20 dark:border-gray-700/20 backdrop-blur-xl">
                                  <p className="text-sm font-medium">{payload[0].payload.model}</p>
                                  {payload.map((entry, index) => (
                                    <p key={index} className="text-xs" style={{ color: entry.color }}>
                                      {entry.name}: {entry.value}M
                                    </p>
                                  ))}
                                </div>
                              )
                            }
                            return null
                          }}
                        />
                        <Bar dataKey="creditsPaid" name="Credits Paid" fill="#1a237e" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="disallowedAmount" name="Disallowed Amount" fill="#03a9f4" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    ) : (
                      <BarChart data={avgTATData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200/20" />
                        <XAxis dataKey="model" fontSize={10} stroke="currentColor" strokeOpacity={0.5} />
                        <YAxis fontSize={10} stroke="currentColor" strokeOpacity={0.5} />
                        <RechartsTooltip
                          content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                              return (
                                <div className="bg-white/90 dark:bg-gray-800/90 p-2 rounded-lg shadow-xl border border-white/20 dark:border-gray-700/20 backdrop-blur-xl">
                                  <p className="text-sm font-medium">{payload[0].payload.model}</p>
                                  <p className="text-xs">Avg TAT: {payload[0].value} days</p>
                                </div>
                              )
                            }
                            return null
                          }}
                        />
                        <Bar dataKey="avgTAT" name="Average TAT" fill="#1a237e" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    )}
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Resolution Time Chart */}
            <Card className="bg-white/20 dark:bg-gray-900/20 backdrop-blur-xl border border-white/20 dark:border-gray-700/20 shadow-lg hover:shadow-xl transition-shadow rounded-xl overflow-hidden">
              <CardHeader className="pb-2 border-b border-white/10 dark:border-gray-700/10">
                <CardTitle className="text-lg">Resolution Time</CardTitle>
                <CardDescription className="text-xs">Average time to resolve claims</CardDescription>
              </CardHeader>
              <CardContent className="pt-4 px-4">
                <div className="h-[300px] bg-white/5 dark:bg-gray-900/5 rounded-lg p-2 border border-white/10 dark:border-gray-700/10">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={resolutionData}>
                      <XAxis dataKey="month" fontSize={10} stroke="currentColor" strokeOpacity={0.5} />
                      <YAxis fontSize={10} stroke="currentColor" strokeOpacity={0.5} />
                      <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200/20" />
                      <RechartsTooltip content={<CustomTooltip />} />
                      <Area type="monotone" dataKey="days" stroke="#FFAD28" fill="#FFAD28/20" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Claims */}
          <Card className="bg-white/20 dark:bg-gray-900/20 backdrop-blur-xl border border-white/20 dark:border-gray-700/20 shadow-lg hover:shadow-xl transition-shadow rounded-xl overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-white/10 dark:border-gray-700/10">
              <div>
                <CardTitle className="text-lg">Recent Claims</CardTitle>
                <CardDescription className="text-xs">Latest warranty claims and their status</CardDescription>
              </div>
              <Button variant="outline" size="sm" className="gap-1 bg-white/20 dark:bg-gray-800/20 backdrop-blur-xl border border-white/20 dark:border-gray-700/20 hover:bg-white/30 dark:hover:bg-gray-800/30 transition-colors">
                <Download className="h-3 w-3" />
                Export
              </Button>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-2">
                {recentClaims.map((claim) => (
                  <div key={claim.id} className="flex items-center justify-between p-3 rounded-lg bg-white/10 dark:bg-gray-800/10 backdrop-blur-xl border border-white/20 dark:border-gray-700/20 hover:bg-white/20 dark:hover:bg-gray-800/20 transition-colors duration-200">
                    <div className="flex items-center space-x-3">
                      <div className="p-1.5 rounded-full bg-[#FF4F59]/10">
                        <FileText className="h-3 w-3 text-[#FF4F59]" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{claim.product}</p>
                        <p className="text-xs text-muted-foreground">{claim.date}</p>
                      </div>
                    </div>
                    <Badge className={`${getStatusColor(claim.status)} border border-white/20 dark:border-gray-700/20`}>
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

        <TabsContent value="settings" className="space-y-4">
          {/* Settings Section */}
          <Card className="bg-white/20 dark:bg-gray-900/20 backdrop-blur-xl border border-white/20 dark:border-gray-700/20 shadow-lg hover:shadow-xl transition-shadow rounded-xl overflow-hidden">
            <CardHeader className="pb-2 border-b border-white/10 dark:border-gray-700/10">
              <CardTitle className="text-lg">Display Settings</CardTitle>
              <CardDescription className="text-xs">Customize how warranty metrics are displayed</CardDescription>
            </CardHeader>
            <CardContent className="pt-4 space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-white/10 dark:bg-gray-800/10 backdrop-blur-xl border border-white/20 dark:border-gray-700/20">
                  <div>
                    <p className="text-sm font-medium">Dark Mode</p>
                    <p className="text-xs text-muted-foreground">Toggle between light and dark theme</p>
                  </div>
                  <Button variant="outline" size="sm" className="gap-1 bg-white/20 dark:bg-gray-800/20 backdrop-blur-xl border border-white/20 dark:border-gray-700/20 hover:bg-white/30 dark:hover:bg-gray-800/30 transition-colors">
                    Toggle Theme
                  </Button>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-white/10 dark:bg-gray-800/10 backdrop-blur-xl border border-white/20 dark:border-gray-700/20">
                  <div>
                    <p className="text-sm font-medium">Chart Type</p>
                    <p className="text-xs text-muted-foreground">Set default chart visualization</p>
                  </div>
                  <Select defaultValue="bar">
                    <SelectTrigger className="w-[140px] bg-white/20 dark:bg-gray-800/20 backdrop-blur-xl border border-white/20 dark:border-gray-700/20">
                      <SelectValue placeholder="Select chart type" />
                    </SelectTrigger>
                    <SelectContent className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/20">
                      <SelectItem value="bar">Bar Chart</SelectItem>
                      <SelectItem value="line">Line Chart</SelectItem>
                      <SelectItem value="area">Area Chart</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/20 dark:bg-gray-900/20 backdrop-blur-xl border border-white/20 dark:border-gray-700/20 shadow-lg hover:shadow-xl transition-shadow rounded-xl overflow-hidden">
            <CardHeader className="pb-2 border-b border-white/10 dark:border-gray-700/10">
              <CardTitle className="text-lg">Notification Preferences</CardTitle>
              <CardDescription className="text-xs">Manage your notification settings</CardDescription>
            </CardHeader>
            <CardContent className="pt-4 space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-white/10 dark:bg-gray-800/10 backdrop-blur-xl border border-white/20 dark:border-gray-700/20">
                  <div>
                    <p className="text-sm font-medium">Email Notifications</p>
                    <p className="text-xs text-muted-foreground">Receive updates via email</p>
                  </div>
                  <Button variant="outline" size="sm" className="gap-1 bg-white/20 dark:bg-gray-800/20 backdrop-blur-xl border border-white/20 dark:border-gray-700/20 hover:bg-white/30 dark:hover:bg-gray-800/30 transition-colors">
                    Configure
                  </Button>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-white/10 dark:bg-gray-800/10 backdrop-blur-xl border border-white/20 dark:border-gray-700/20">
                  <div>
                    <p className="text-sm font-medium">Alert Thresholds</p>
                    <p className="text-xs text-muted-foreground">Set custom alert triggers</p>
                  </div>
                  <Input 
                    type="number" 
                    placeholder="Enter threshold" 
                    className="w-[140px] bg-white/20 dark:bg-gray-800/20 backdrop-blur-xl border border-white/20 dark:border-gray-700/20"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/20 dark:bg-gray-900/20 backdrop-blur-xl border border-white/20 dark:border-gray-700/20 shadow-lg hover:shadow-xl transition-shadow rounded-xl overflow-hidden">
            <CardHeader className="pb-2 border-b border-white/10 dark:border-gray-700/10">
              <CardTitle className="text-lg">Data Export</CardTitle>
              <CardDescription className="text-xs">Configure data export settings</CardDescription>
            </CardHeader>
            <CardContent className="pt-4 space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-white/10 dark:bg-gray-800/10 backdrop-blur-xl border border-white/20 dark:border-gray-700/20">
                  <div>
                    <p className="text-sm font-medium">Export Format</p>
                    <p className="text-xs text-muted-foreground">Choose default export format</p>
                  </div>
                  <Select defaultValue="csv">
                    <SelectTrigger className="w-[140px] bg-white/20 dark:bg-gray-800/20 backdrop-blur-xl border border-white/20 dark:border-gray-700/20">
                      <SelectValue placeholder="Select format" />
                    </SelectTrigger>
                    <SelectContent className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/20">
                      <SelectItem value="csv">CSV</SelectItem>
                      <SelectItem value="excel">Excel</SelectItem>
                      <SelectItem value="pdf">PDF</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-white/10 dark:bg-gray-800/10 backdrop-blur-xl border border-white/20 dark:border-gray-700/20">
                  <div>
                    <p className="text-sm font-medium">Schedule Exports</p>
                    <p className="text-xs text-muted-foreground">Set up automated exports</p>
                  </div>
                  <Button variant="outline" size="sm" className="gap-1 bg-white/20 dark:bg-gray-800/20 backdrop-blur-xl border border-white/20 dark:border-gray-700/20 hover:bg-white/30 dark:hover:bg-gray-800/30 transition-colors">
                    Schedule
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Footer */}
      <footer className="py-6 text-center text-xs text-muted-foreground/60">
        <p>Copyright © 2025 Genpact India. All rights reserved.</p>
      </footer>
    </div>
  )
} 