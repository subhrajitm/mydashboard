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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

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
    value: "40",
    description: "Across all shops",
    icon: ClipboardCheck,
  },
  {
    title: "Approved",
    value: "45",
    description: "Successfully processed",
    icon: CheckCircle,
  },
  {
    title: "Pending",
    value: "19",
    description: "Under review",
    icon: Clock,
  },
  {
    title: "Rejected",
    value: "8",
    description: "Not eligible",
    icon: XCircle,
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

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[#FF4F59] to-[#FFAD28] bg-clip-text text-transparent">
            Warranty Metrics
          </h1>
          <p className="text-lg text-muted-foreground">
            Track and analyze warranty claims across all shops
          </p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm border-white/30"
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6"
              onClick={() => setSearchQuery("")}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      <div className="grid gap-8">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {warrantyStats.map((stat) => (
            <Card key={stat.title} className="bg-white/30 dark:bg-gray-900/30 backdrop-blur-lg border border-white/30 shadow-lg shadow-black/5">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Warranty Claims Chart */}
          <Card className="bg-white/30 dark:bg-gray-900/30 backdrop-blur-lg border border-white/30 shadow-lg shadow-black/5">
            <CardHeader>
              <CardTitle>Warranty Claims</CardTitle>
              <CardDescription>Claims by product category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={warrantyData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <RechartsTooltip content={<CustomTooltip />} />
                    <Bar dataKey="claims" fill="#FF4F59" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Resolution Time Chart */}
          <Card className="bg-white/30 dark:bg-gray-900/30 backdrop-blur-lg border border-white/30 shadow-lg shadow-black/5">
            <CardHeader>
              <CardTitle>Resolution Time</CardTitle>
              <CardDescription>Average time to resolve claims</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={resolutionData}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <RechartsTooltip content={<CustomTooltip />} />
                    <Line type="monotone" dataKey="days" stroke="#FFAD28" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Claims */}
        <Card className="bg-white/30 dark:bg-gray-900/30 backdrop-blur-lg border border-white/30 shadow-lg shadow-black/5">
          <CardHeader>
            <CardTitle>Recent Claims</CardTitle>
            <CardDescription>Latest warranty claims and their status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentClaims.map((claim) => (
                <div key={claim.id} className="flex items-center justify-between p-4 rounded-lg bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm border border-white/20">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 rounded-full bg-[#FF4F59]/10">
                      <FileText className="h-4 w-4 text-[#FF4F59]" />
                    </div>
                    <div>
                      <p className="font-medium">{claim.product}</p>
                      <p className="text-sm text-muted-foreground">{claim.date}</p>
                    </div>
                  </div>
                  <Badge variant={claim.status === 'Resolved' ? 'default' : 'secondary'}>
                    {claim.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 