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
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Area,
  AreaChart,
  ReferenceLine,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

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

interface ModelData {
  model: string;
  creditsPaid: number;
  disallowedAmount: number;
  efficiency: number;
  trend: "up" | "down";
  category: string;
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

const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: any[] }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload as ModelData;
    return (
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
        <p className="text-sm font-medium">{data.model}</p>
        <p className="text-xs text-gray-500">Credits Paid: {data.creditsPaid}</p>
        <p className="text-xs text-gray-500">Disallowed: {data.disallowedAmount}</p>
        <p className="text-xs text-gray-500">Efficiency: {data.efficiency}%</p>
      </div>
    );
  }
  return null;
};

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
  { 
    model: "Model1", 
    creditsPaid: 152, 
    disallowedAmount: 81,
    efficiency: 65,
    trend: "up",
    category: "Sedan"
  },
  { 
    model: "Model2", 
    creditsPaid: 22, 
    disallowedAmount: 67,
    efficiency: 25,
    trend: "down",
    category: "SUV"
  },
  { 
    model: "Model3", 
    creditsPaid: 139, 
    disallowedAmount: 65,
    efficiency: 68,
    trend: "up",
    category: "Sedan"
  },
  { 
    model: "Model4", 
    creditsPaid: 474, 
    disallowedAmount: 371,
    efficiency: 56,
    trend: "up",
    category: "SUV"
  },
  { 
    model: "Model5", 
    creditsPaid: 116, 
    disallowedAmount: 238,
    efficiency: 33,
    trend: "down",
    category: "Compact"
  },
  { 
    model: "Model6", 
    creditsPaid: 35, 
    disallowedAmount: 11,
    efficiency: 76,
    trend: "up",
    category: "Compact"
  },
  { 
    model: "Model7", 
    creditsPaid: 2, 
    disallowedAmount: 0,
    efficiency: 100,
    trend: "up",
    category: "Luxury"
  },
  { 
    model: "Model8", 
    creditsPaid: 462, 
    disallowedAmount: 544,
    efficiency: 46,
    trend: "down",
    category: "Luxury"
  },
  { 
    model: "Model9", 
    creditsPaid: 4, 
    disallowedAmount: 2,
    efficiency: 67,
    trend: "up",
    category: "Electric"
  },
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

const calculatePercentage = (value: number, total: number): number => {
  if (total === 0) return 0;
  return Math.round((value / total) * 100);
};

export default function WarrantyMetrics() {
  const [activeTimeframe, setActiveTimeframe] = useState("1w")
  const [searchQuery, setSearchQuery] = useState("")
  const [activeView, setActiveView] = useState("overview")
  const [selectedShop, setSelectedShop] = useState("all")
  const [showAvgTAT, setShowAvgTAT] = useState(false)
  const [chartType, setChartType] = useState("bar")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("creditsPaid")

  const filteredModelData = selectedCategory === "all" 
    ? modelData 
    : modelData.filter(item => item.category === selectedCategory)

  const sortedModelData = [...filteredModelData].sort((a, b) => {
    if (sortBy === "creditsPaid") {
      return b.creditsPaid - a.creditsPaid;
    } else if (sortBy === "disallowedAmount") {
      return b.disallowedAmount - a.disallowedAmount;
    } else if (sortBy === "efficiency") {
      return b.efficiency - a.efficiency;
    }
    return 0;
  })

  const totalCreditsPaid = modelData.reduce((acc, curr) => {
    const value = typeof curr.creditsPaid === 'number' ? curr.creditsPaid : 0;
    return acc + value;
  }, 0);
  
  const totalDisallowed = modelData.reduce((acc, curr) => {
    const value = typeof curr.disallowedAmount === 'number' ? curr.disallowedAmount : 0;
    return acc + value;
  }, 0);
  
  const averageEfficiency = Math.round(
    modelData.reduce((acc, curr) => {
      const value = typeof curr.efficiency === 'number' ? curr.efficiency : 0;
      return acc + value;
    }, 0) / modelData.length
  );

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {warrantyStats.map((stat, index) => (
              <Card key={index} className="backdrop-blur-lg bg-white/10 dark:bg-gray-800/10 border border-white/20 dark:border-gray-700/20 shadow-lg hover:shadow-xl transition-shadow rounded-xl overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-muted-foreground">{stat.title}</p>
                      <div className="flex items-baseline gap-2">
                        <h3 className="text-2xl font-bold">{stat.value}</h3>
                        <span className={`text-xs font-medium ${stat.trendDirection === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                          {stat.trend}
                        </span>
                      </div>
                    </div>
                    <div className={`p-3 rounded-full ${stat.bgColor} ${stat.color}`}>
                      <stat.icon className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="mt-4">
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
              <CardHeader className="pb-4 border-b border-white/10 dark:border-gray-700/10">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">
                      Credit Paid Vs Disallowance
                    </CardTitle>
                    <CardDescription className="text-xs">
                      Compare credits paid against disallowed amounts by model
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-3">
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger className="w-[130px] h-8 bg-white/20 dark:bg-gray-800/20 backdrop-blur-xl border border-white/20 dark:border-gray-700/20">
                        <SelectValue placeholder="All Categories" />
                      </SelectTrigger>
                      <SelectContent className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/20">
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="Sedan">Sedan</SelectItem>
                        <SelectItem value="SUV">SUV</SelectItem>
                        <SelectItem value="Compact">Compact</SelectItem>
                        <SelectItem value="Luxury">Luxury</SelectItem>
                        <SelectItem value="Electric">Electric</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-[130px] h-8 bg-white/20 dark:bg-gray-800/20 backdrop-blur-xl border border-white/20 dark:border-gray-700/20">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/20">
                        <SelectItem value="creditsPaid">Credits Paid</SelectItem>
                        <SelectItem value="disallowedAmount">Disallowed</SelectItem>
                        <SelectItem value="efficiency">Efficiency</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-4">
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Total Credits Paid</p>
                    <p className="text-2xl font-bold bg-gradient-to-r from-[#1a237e] to-[#0d47a1] bg-clip-text text-transparent">
                      ${totalCreditsPaid}M
                    </p>
                    <div className="flex items-center gap-1 text-green-500">
                      <ArrowUpRight className="h-3 w-3" />
                      <span className="text-xs">+8.5% from previous</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Total Disallowed</p>
                    <p className="text-2xl font-bold bg-gradient-to-r from-[#03a9f4] to-[#00bcd4] bg-clip-text text-transparent">
                      ${totalDisallowed}M
                    </p>
                    <p className="text-xs text-muted-foreground">Across all models</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Average Efficiency</p>
                    <p className="text-2xl font-bold">
                      {averageEfficiency}%
                    </p>
                    <p className="text-xs text-muted-foreground">Claims processed</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={sortedModelData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200/20" />
                <XAxis 
                        dataKey="model" 
                        fontSize={10} 
                        stroke="currentColor" 
                        strokeOpacity={0.5}
                        tickLine={false}
                />
                <YAxis 
                        fontSize={10}
                        tickFormatter={(value) => `${value}M`}
                        domain={[0, 600]}
                        ticks={[0, 100, 200, 300, 400, 500, 600]}
                        stroke="currentColor"
                        strokeOpacity={0.5}
                        tickLine={false}
                />
                <RechartsTooltip content={<CustomTooltip />} />
                      <Bar 
                        dataKey="creditsPaid" 
                        name="Credits Paid" 
                        fill="#1a237e" 
                  radius={[4, 4, 0, 0]}
                />
                <Bar 
                        dataKey="disallowedAmount" 
                        name="Disallowed Amount" 
                        fill="#03a9f4" 
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
              </CardContent>
            </Card>

            {/* Resolution Time Chart */}
            <Card className="bg-white/20 dark:bg-gray-900/20 backdrop-blur-xl border border-white/20 dark:border-gray-700/20 shadow-lg hover:shadow-xl transition-shadow rounded-xl overflow-hidden">
              <CardHeader className="pb-4 border-b border-white/10 dark:border-gray-700/10">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">Resolution Time</CardTitle>
                    <CardDescription className="text-xs">Average time to resolve claims</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 bg-white/20 dark:bg-gray-800/20 backdrop-blur-xl border border-white/20 dark:border-gray-700/20"
                      onClick={() => setShowAvgTAT(!showAvgTAT)}
                    >
                      {showAvgTAT ? "Hide Average" : "Show Average"}
                    </Button>
          </div>
      </div>
              </CardHeader>
              <CardContent className="pt-4">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={resolutionData}>
              <defs>
                        <linearGradient id="colorDays" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#FFAD28" stopOpacity={0.2}/>
                          <stop offset="95%" stopColor="#FFAD28" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="month" 
                        fontSize={10} 
                        stroke="currentColor" 
                        strokeOpacity={0.5}
                        tickLine={false}
                        axisLine={false}
              />
              <YAxis 
                        fontSize={10}
                        stroke="currentColor"
                        strokeOpacity={0.5}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `${value} days`}
                      />
                      <CartesianGrid 
                        strokeDasharray="3 3" 
                        className="stroke-gray-200/20" 
                        vertical={false}
                      />
                      <RechartsTooltip 
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            return (
                              <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-white/20 dark:border-gray-700/20">
                                <p className="text-sm font-medium">{payload[0].payload.month}</p>
                                <p className="text-xs text-muted-foreground">
                                  Average Resolution Time: {payload[0].value} days
                                </p>
                              </div>
                            );
                          }
                          return null;
                        }}
              />
              <Area 
                type="monotone" 
                        dataKey="days"
                        stroke="#FFAD28"
                        fill="url(#colorDays)"
                        strokeWidth={2}
                        dot={{
                          fill: "#FFAD28",
                          strokeWidth: 2,
                          r: 4,
                        }}
                        activeDot={{
                          fill: "#FFAD28",
                          strokeWidth: 2,
                          r: 6,
                        }}
                      />
                      {showAvgTAT && (
                        <ReferenceLine
                          y={resolutionData.reduce((acc, curr) => acc + curr.days, 0) / resolutionData.length}
                          stroke="#FF4F59"
                          strokeDasharray="3 3"
                          label={{
                            value: "Average",
                            position: "right",
                            fill: "#FF4F59",
                            fontSize: 10,
                          }}
                        />
                      )}
            </AreaChart>
          </ResponsiveContainer>
        </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Claims Table */}
          <Card className="bg-white/20 dark:bg-gray-900/20 backdrop-blur-xl border border-white/20 dark:border-gray-700/20 shadow-lg hover:shadow-xl transition-shadow rounded-xl overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-white/10 dark:border-gray-700/10">
              <div>
                <CardTitle className="text-lg">Recent Claims</CardTitle>
                <CardDescription className="text-xs">Latest warranty claims and their status</CardDescription>
        </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1 bg-white/20 dark:bg-gray-800/20 backdrop-blur-xl border border-white/20 dark:border-gray-700/20 hover:bg-white/30 dark:hover:bg-gray-800/30 transition-colors"
                >
                  <Filter className="h-3 w-3" />
                  Filter
                </Button>
                <Button
                  variant="outline"
              size="sm"
                  className="gap-1 bg-white/20 dark:bg-gray-800/20 backdrop-blur-xl border border-white/20 dark:border-gray-700/20 hover:bg-white/30 dark:hover:bg-gray-800/30 transition-colors"
                >
                  <Download className="h-3 w-3" />
                  Export
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-3">
                {recentClaims.map((claim) => (
                  <div
                    key={claim.id}
                    className="group flex items-center justify-between p-4 rounded-lg bg-white/10 dark:bg-gray-800/10 backdrop-blur-xl border border-white/20 dark:border-gray-700/20 hover:bg-white/20 dark:hover:bg-gray-800/20 transition-all duration-200 cursor-pointer"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="p-2 rounded-full bg-[#FF4F59]/10 group-hover:bg-[#FF4F59]/20 transition-colors">
                        <FileText className="h-4 w-4 text-[#FF4F59]" />
                      </div>
                      <div>
                        <p className="text-sm font-medium group-hover:text-[#FF4F59] transition-colors">
                          {claim.product}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <p className="text-xs text-muted-foreground">{claim.date}</p>
                          <span className="text-xs text-muted-foreground">•</span>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">2h ago</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge 
                        className={`${getStatusColor(claim.status)} border border-white/20 dark:border-gray-700/20 group-hover:scale-105 transition-transform`}
                      >
                        {claim.status}
                      </Badge>
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
              <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                <p>Showing {recentClaims.length} of {recentClaims.length} claims</p>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 px-2 text-xs"
                    disabled
                  >
                    Previous
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 px-2 text-xs"
                    disabled
                  >
                    Next
                  </Button>
                </div>
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