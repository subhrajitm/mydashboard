"use client"

import {
  Bell,
  CreditCard,
  GraduationCap,
  Home,
  LogOut,
  MessageSquare,
  MoreHorizontal,
  Plus,
  Settings,
  ShoppingBag,
  User,
  ChevronLeft,
  ChevronRight,
  Sun,
  Moon,
  Building2,
  ClipboardCheck,
  AlertCircle,
  Clock,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  Search,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState, useMemo, useEffect } from "react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
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
  AreaChart,
  Area,
} from "recharts"

// Add these interfaces at the top of the file after imports
interface InvoiceData {
  shop: string;
  engines: number;
  due: number;
  issued: number;
  upcoming: number;
}

interface WarrantyData {
  shop: string;
  toBeAssessed: number;
  noOpportunity: number;
  inProgress: number;
}

interface CreditMetric {
  model: string;
  creditsPaid: number;
  disallowedAmount: number;
}

// Update the data declarations with types
const invoiceData: InvoiceData[] = [
  { shop: "Shop1", engines: 12, due: 10, issued: 1, upcoming: 1 },
  { shop: "Shop2", engines: 7, due: 5, issued: 1, upcoming: 1 },
  { shop: "Shop3", engines: 4, due: 1, issued: 3, upcoming: 0 }
]

const warrantyData: WarrantyData[] = [
  { shop: "Shop1", toBeAssessed: 1, noOpportunity: 0, inProgress: 0 },
  { shop: "Shop2", toBeAssessed: 1, noOpportunity: 0, inProgress: 0 },
  { shop: "Shop3", toBeAssessed: 3, noOpportunity: 0, inProgress: 0 }
]

const creditMetrics: CreditMetric[] = [
  { model: "Model1", creditsPaid: 152, disallowedAmount: 81 },
  { model: "Model2", creditsPaid: 22, disallowedAmount: 67 },
  { model: "Model3", creditsPaid: 135, disallowedAmount: 55 },
  { model: "Model4", creditsPaid: 474, disallowedAmount: 371 },
  { model: "Model5", creditsPaid: 235, disallowedAmount: 0 },
  { model: "Model6", creditsPaid: 115, disallowedAmount: 36 },
  { model: "Model7", creditsPaid: 11, disallowedAmount: 2 },
  { model: "Model8", creditsPaid: 425, disallowedAmount: 542 },
  { model: "Model9", creditsPaid: 4, disallowedAmount: 5 }
]

// Add percentage calculations
const getTotalEngines = () => invoiceData.reduce((acc, curr) => acc + curr.engines, 0);
const getPercentage = (value: number) => ((value / getTotalEngines()) * 100).toFixed(1);

// Add chart data preparation functions
const prepareShopChartData = () => {
  return invoiceData.map(shop => ({
    name: shop.shop,
    engines: shop.engines,
    due: shop.due,
    issued: shop.issued,
  }))
}

const prepareWarrantyChartData = () => {
  return warrantyData.map(shop => ({
    name: shop.shop,
    toBeAssessed: shop.toBeAssessed,
    inProgress: shop.inProgress,
  }))
}

const prepareCreditChartData = () => {
  return creditMetrics.map(metric => ({
    name: metric.model,
    creditsPaid: metric.creditsPaid,
    disallowedAmount: metric.disallowedAmount,
  }))
}

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

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Memoize data preparation functions
  const shopChartData = useMemo(() => prepareShopChartData(), [])
  const warrantyChartData = useMemo(() => prepareWarrantyChartData(), [])
  const creditChartData = useMemo(() => prepareCreditChartData(), [])

  // Memoize total engines calculation
  const totalEngines = useMemo(() => getTotalEngines(), [])

  // Simulate data loading
  useEffect(() => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }, [])

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Card className="p-6">
          <div className="flex flex-col items-center space-y-4">
            <AlertCircle className="h-12 w-12 text-[#FF4F59]" />
            <h2 className="text-2xl font-bold">Error Loading Dashboard</h2>
            <p className="text-muted-foreground">{error}</p>
            <Button onClick={() => setError(null)}>Try Again</Button>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex-1">
      <div className="p-8 space-y-8">
        {isLoading ? (
          <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF4F59]"></div>
          </div>
        ) : (
          <>
            {/* Welcome Section */}
            <div className="flex flex-col space-y-4">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-[#FF4F59] to-[#FFAD28] bg-clip-text text-transparent">
                Welcome back, Oliver!
              </h1>
              <p className="text-lg text-muted-foreground">
                Here's what's happening with your finances today
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {invoiceData.map((shop) => (
                <Card key={shop.shop} className="bg-gradient-to-br from-[#FF4F59]/5 to-[#FFAD28]/5 border border-[#FF4F59]/20 shadow-sm hover:border-[#FF4F59]/40 transition-all duration-300 hover:scale-[1.02] hover:shadow-md">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 border-b border-[#FF4F59]/20">
                    <CardTitle className="text-sm font-medium">
                      {shop.shop}
                    </CardTitle>
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="text-2xl font-bold">{shop.engines}</div>
                    <div className="flex items-center text-xs text-muted-foreground mt-2">
                      <div className="flex-1">
                        <div className="flex items-center">
                          <div className="w-2 h-2 rounded-full bg-[#FF4F59] mr-2" />
                          <span>Due: {shop.due}</span>
                        </div>
                        <div className="flex items-center mt-1">
                          <div className="w-2 h-2 rounded-full bg-[#FFAD28] mr-2" />
                          <span>Issued: {shop.issued}</span>
                        </div>
                      </div>
                      <Badge variant="outline" className="ml-2">
                        {getPercentage(shop.engines)}%
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-gradient-to-br from-[#FF4F59]/5 to-[#FFAD28]/5 border border-[#FF4F59]/20 shadow-sm hover:border-[#FF4F59]/40 transition-all duration-300 hover:scale-[1.02] hover:shadow-md">
                <CardHeader className="border-b border-[#FF4F59]/20">
                  <CardTitle className="flex items-center">
                    <Building2 className="h-5 w-5 mr-2" />
                    Shop Performance
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={shopChartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke={COLORS.grid} />
                      <XAxis 
                        dataKey="name" 
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
                        dataKey="engines" 
                        fill={COLORS.primary} 
                        name="Total Engines"
                        radius={[4, 4, 0, 0]}
                        animationDuration={1500}
                      />
                      <Bar 
                        dataKey="due" 
                        fill={COLORS.secondary} 
                        name="Due"
                        radius={[4, 4, 0, 0]}
                        animationDuration={1500}
                      />
                      <Bar 
                        dataKey="issued" 
                        fill={COLORS.tertiary} 
                        name="Issued"
                        radius={[4, 4, 0, 0]}
                        animationDuration={1500}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-[#FF4F59]/5 to-[#FFAD28]/5 border border-[#FF4F59]/20 shadow-sm hover:border-[#FF4F59]/40 transition-all duration-300 hover:scale-[1.02] hover:shadow-md">
                <CardHeader className="border-b border-[#FF4F59]/20">
                  <CardTitle className="flex items-center">
                    <ClipboardCheck className="h-5 w-5 mr-2" />
                    Warranty Progress
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={warrantyChartData}>
                      <defs>
                        <linearGradient id="colorToBeAssessed" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={COLORS.primary} stopOpacity={0.8}/>
                          <stop offset="95%" stopColor={COLORS.primary} stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorInProgress" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={COLORS.secondary} stopOpacity={0.8}/>
                          <stop offset="95%" stopColor={COLORS.secondary} stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke={COLORS.grid} />
                      <XAxis 
                        dataKey="name" 
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
                      <Area 
                        type="monotone" 
                        dataKey="toBeAssessed" 
                        stroke={COLORS.primary}
                        fillOpacity={1} 
                        fill="url(#colorToBeAssessed)"
                        name="To Be Assessed"
                        animationDuration={1500}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="inProgress" 
                        stroke={COLORS.secondary}
                        fillOpacity={1} 
                        fill="url(#colorInProgress)"
                        name="In Progress"
                        animationDuration={1500}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Credit Metrics */}
            <Card className="bg-gradient-to-br from-[#FF4F59]/5 to-[#FFAD28]/5 border border-[#FF4F59]/20 shadow-sm hover:border-[#FF4F59]/40 transition-all duration-300 hover:scale-[1.02] hover:shadow-md">
              <CardHeader className="border-b border-[#FF4F59]/20">
                <CardTitle className="flex items-center">
                  <CreditCard className="h-5 w-5 mr-2" />
                  Credit Metrics Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={creditChartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={COLORS.grid} />
                    <XAxis 
                      dataKey="name" 
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
                      dataKey="creditsPaid" 
                      fill={COLORS.primary} 
                      name="Credits Paid"
                      radius={[4, 4, 0, 0]}
                      animationDuration={1500}
                    />
                    <Bar 
                      dataKey="disallowedAmount" 
                      fill={COLORS.secondary} 
                      name="Disallowed Amount"
                      radius={[4, 4, 0, 0]}
                      animationDuration={1500}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Warranty Status */}
            <Card className="bg-gradient-to-br from-[#FF4F59]/5 to-[#FFAD28]/5 border border-[#FF4F59]/20 shadow-sm hover:border-[#FF4F59]/40 transition-all duration-300 hover:scale-[1.02] hover:shadow-md">
              <CardHeader className="border-b border-[#FF4F59]/20">
                <CardTitle className="flex items-center">
                  <ClipboardCheck className="h-5 w-5 mr-2" />
                  Warranty Status
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
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
                        </div>
                      </div>
                      <Progress 
                        value={(shop.toBeAssessed + shop.inProgress) * 10} 
                        className="h-2"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="bg-gradient-to-br from-[#FF4F59]/5 to-[#FFAD28]/5 border border-[#FF4F59]/20 shadow-sm hover:border-[#FF4F59]/40 transition-all duration-300 hover:scale-[1.02] hover:shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {creditMetrics.slice(0, 5).map((metric) => (
                    <div key={metric.model} className="flex items-center justify-between p-4 rounded-lg hover:bg-[#444744]/5 transition-colors duration-200">
                      <div className="flex items-center space-x-4">
                        <div className="p-2 rounded-lg bg-[#FF4F59]/10">
                          <CreditCard className="h-5 w-5 text-[#FF4F59]" />
                        </div>
                        <div>
                          <div className="font-medium">{metric.model}</div>
                          <div className="text-sm text-muted-foreground">
                            Credits processed
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className="font-medium text-[#FF4F59]">
                            {metric.creditsPaid}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Credits Paid
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium text-[#FFAD28]">
                            {metric.disallowedAmount}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Disallowed
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  )
}

// Update the CreditMetricsChart props interface
interface CreditMetricsChartProps {
  data: CreditMetric[];
  theme: {
    text: string;
  };
}

function CreditMetricsChart({ data, theme }: CreditMetricsChartProps) {
  const maxValue = Math.max(...data.flatMap(d => [d.creditsPaid, d.disallowedAmount]));
  const height = 300;
  const barWidth = 30;
  const gap = 20;
  const scale = height / maxValue;

  return (
    <svg className="w-full h-full" viewBox={`0 0 ${data.length * (barWidth * 2 + gap)} ${height + 50}`}>
      {data.map((item, i) => (
        <g key={item.model} transform={`translate(${i * (barWidth * 2 + gap)}, 0)`}>
          {/* Credits Paid Bar */}
          <rect
            x={0}
            y={height - item.creditsPaid * scale}
            width={barWidth}
            height={item.creditsPaid * scale}
            fill="#FF4F59"
            rx={4}
          />
          {/* Disallowed Amount Bar */}
          <rect
            x={barWidth + 5}
            y={height - item.disallowedAmount * scale}
            width={barWidth}
            height={item.disallowedAmount * scale}
            fill="#FFAD28"
            rx={4}
          />
          {/* Model Label */}
          <text
            x={barWidth}
            y={height + 20}
            textAnchor="middle"
            className="text-xs"
            fill={theme.text}
          >
            {item.model}
          </text>
          {/* Values */}
          <text
            x={barWidth / 2}
            y={height - item.creditsPaid * scale - 5}
            textAnchor="middle"
            className="text-xs"
            fill="#FF4F59"
          >
            {item.creditsPaid}M
          </text>
          <text
            x={barWidth * 1.5 + 5}
            y={height - item.disallowedAmount * scale - 5}
            textAnchor="middle"
            className="text-xs"
            fill="#FFAD28"
          >
            {item.disallowedAmount}M
          </text>
        </g>
      ))}
    </svg>
  )
}
