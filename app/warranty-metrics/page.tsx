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
} from "lucide-react"
import {
  BarChart,
  Bar,
  LineChart,
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

interface WarrantyData {
  shop: string;
  toBeAssessed: number;
  noOpportunity: number;
  inProgress: number;
}

const warrantyData: WarrantyData[] = [
  { shop: "Shop1", toBeAssessed: 1, noOpportunity: 0, inProgress: 0 },
  { shop: "Shop2", toBeAssessed: 1, noOpportunity: 0, inProgress: 0 },
  { shop: "Shop3", toBeAssessed: 3, noOpportunity: 0, inProgress: 0 }
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

const warrantyStats = [
  {
    title: "Total Claims",
    value: "5",
    change: "+2",
    trend: "up",
    icon: ClipboardCheck,
  },
  {
    title: "To Be Assessed",
    value: "5",
    change: "+1",
    trend: "up",
    icon: AlertCircle,
  },
  {
    title: "In Progress",
    value: "0",
    change: "0",
    trend: "neutral",
    icon: Clock,
  },
  {
    title: "No Opportunity",
    value: "0",
    change: "0",
    trend: "neutral",
    icon: AlertCircle,
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

const CustomTooltip = ({ active, payload, label }: any) => {
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

export default function WarrantyMetrics() {
  const [activeTimeframe, setActiveTimeframe] = useState("1w")
  const [searchQuery, setSearchQuery] = useState("")
  const [activeView, setActiveView] = useState("overview")

  const prepareShopChartData = () => {
    return warrantyData.map(shop => ({
      name: shop.shop,
      toBeAssessed: shop.toBeAssessed,
      noOpportunity: shop.noOpportunity,
      inProgress: shop.inProgress,
    }))
  }

  const prepareClaimsPieData = () => {
    return [
      { name: 'Approved', value: claimsDistribution.approved },
      { name: 'Pending', value: claimsDistribution.pending },
      { name: 'Rejected', value: claimsDistribution.rejected },
    ]
  }

  return (
    <div className="space-y-8 p-6">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-[#FF4F59] to-[#FFAD28] bg-clip-text text-transparent">
                Warranty Metrics
              </h1>
              <Badge variant="secondary" className="bg-[#FF4F59]/10 text-[#FF4F59]">
                Live
              </Badge>
            </div>
            <p className="text-lg text-muted-foreground">
              Track and manage warranty claims across all shops
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="border-[#FF4F59]/20 hover:border-[#FF4F59]/40">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" className="border-[#FF4F59]/20 hover:border-[#FF4F59]/40">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" className="border-[#FF4F59]/20 hover:border-[#FF4F59]/40">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search shops..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 bg-white/50 border-[#FF4F59]/20 focus:border-[#FF4F59]/40"
              />
            </div>
            <div className="flex items-center gap-2">
              {["overview", "detailed", "analytics"].map((view) => (
                <Button
                  key={view}
                  variant={activeView === view ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveView(view)}
                  className={activeView === view ? "bg-[#FF4F59] hover:bg-[#FF4F59]/90" : "border-[#FF4F59]/20 hover:border-[#FF4F59]/40"}
                >
                  {view.charAt(0).toUpperCase() + view.slice(1)}
                </Button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            {["1d", "1w", "1m", "3m", "1y"].map((timeframe) => (
              <Button
                key={timeframe}
                variant={activeTimeframe === timeframe ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveTimeframe(timeframe)}
                className={activeTimeframe === timeframe ? "bg-[#FF4F59] hover:bg-[#FF4F59]/90" : "border-[#FF4F59]/20 hover:border-[#FF4F59]/40"}
              >
                {timeframe}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {warrantyStats.map((stat) => (
          <Card key={stat.title} className="bg-gradient-to-br from-[#FF4F59]/5 to-[#FFAD28]/5 border border-[#FF4F59]/20 shadow-sm hover:border-[#FF4F59]/40 transition-all duration-300 hover:scale-[1.02] hover:shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${
                stat.trend === "up" ? "bg-green-100 text-green-600" :
                stat.trend === "down" ? "bg-red-100 text-red-600" :
                "bg-gray-100 text-gray-600"
              }`}>
                <stat.icon className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center text-xs text-muted-foreground mt-2">
                {stat.trend === "up" ? (
                  <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                ) : stat.trend === "down" ? (
                  <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
                ) : null}
                {stat.change} from last month
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Warranty Status Chart */}
      <Card className="bg-gradient-to-br from-[#FF4F59]/5 to-[#FFAD28]/5 border border-[#FF4F59]/20 shadow-sm hover:border-[#FF4F59]/40 transition-all duration-300 hover:scale-[1.02] hover:shadow-md">
        <CardHeader className="border-b border-[#FF4F59]/20">
          <CardTitle className="flex items-center">
            <ClipboardCheck className="h-5 w-5 mr-2" />
            Warranty Status by Shop
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={warrantyData}>
              <CartesianGrid strokeDasharray="3 3" stroke={COLORS.grid} />
              <XAxis 
                dataKey="shop" 
                tick={{ fill: COLORS.text }}
                axisLine={{ stroke: COLORS.text }}
              />
              <YAxis 
                tick={{ fill: COLORS.text }}
                axisLine={{ stroke: COLORS.text }}
              />
              <RechartsTooltip content={<CustomTooltip />} />
              <Legend 
                verticalAlign="top" 
                height={36}
                formatter={(value) => (
                  <span className="text-sm" style={{ color: COLORS.text }}>
                    {value}
                  </span>
                )}
              />
              <Bar 
                dataKey="toBeAssessed" 
                fill={COLORS.primary} 
                name="To Be Assessed"
                radius={[4, 4, 0, 0]}
                animationDuration={1500}
              />
              <Bar 
                dataKey="inProgress" 
                fill={COLORS.secondary} 
                name="In Progress"
                radius={[4, 4, 0, 0]}
                animationDuration={1500}
              />
              <Bar 
                dataKey="noOpportunity" 
                fill={COLORS.tertiary} 
                name="No Opportunity"
                radius={[4, 4, 0, 0]}
                animationDuration={1500}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Detailed Status */}
      <Card className="bg-gradient-to-br from-[#FF4F59]/5 to-[#FFAD28]/5 border border-[#FF4F59]/20 shadow-sm hover:border-[#FF4F59]/40 transition-all duration-300 hover:scale-[1.02] hover:shadow-md">
        <CardHeader className="border-b border-[#FF4F59]/20">
          <CardTitle className="flex items-center">
            <ClipboardCheck className="h-5 w-5 mr-2" />
            Detailed Status
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-6">
            {warrantyData.map((shop) => (
              <div key={shop.shop} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{shop.shop}</span>
                  <div className="flex space-x-2">
                    <Badge variant="secondary" className="bg-[#FF4F59]/10 text-[#FF4F59]">
                      {shop.toBeAssessed} To Assess
                    </Badge>
                    <Badge variant="secondary" className="bg-[#FFAD28]/10 text-[#FFAD28]">
                      {shop.inProgress} In Progress
                    </Badge>
                    <Badge variant="secondary" className="bg-[#444744]/10 text-[#444744]">
                      {shop.noOpportunity} No Opportunity
                    </Badge>
                  </div>
                </div>
                <Progress 
                  value={(shop.toBeAssessed + shop.inProgress + shop.noOpportunity) * 20} 
                  className="h-2"
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 