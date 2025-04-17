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
import { useState } from "react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

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

export default function Dashboard() {
  const [activeTimeframe, setActiveTimeframe] = useState("1w")
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false)
  const [activeNavItem, setActiveNavItem] = useState("home")
  const [isDarkMode, setIsDarkMode] = useState(false)

  const navItems = [
    { id: "home", icon: Home, label: "Home" },
    { id: "messages", icon: MessageSquare, label: "Messages", badge: 3 },
    { id: "profile", icon: User, label: "Profile" },
    { id: "cards", icon: CreditCard, label: "Cards" },
    { id: "settings", icon: Settings, label: "Settings" },
  ]

  const themeColors = {
    dark: {
      background: '#181C23',
      sidebar: '#282A27',
      text: '#FFFFFF',
      accent: '#FF4F59',
      secondary: '#FFAD28',
      hover: '#444744',
      card: '#1E2229',
    },
    light: {
      background: '#FFFAF4',
      sidebar: '#FFF2DF',
      text: '#181C23',
      accent: '#FF4F59',
      secondary: '#FFAD28',
      hover: '#444744',
      card: '#FFFFFF',
    }
  }

  const currentTheme = isDarkMode ? themeColors.dark : themeColors.light

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex flex-col space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-[#FF4F59] to-[#FFAD28] bg-clip-text text-transparent">
          Welcome back, Oliver!
        </h1>
        <p className="text-lg" style={{ color: isDarkMode ? '#A1A1AA' : '#6B7280' }}>
          Here's what's happening with your finances today
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {invoiceData.map((shop) => (
          <Card key={shop.shop} className="bg-gradient-to-br from-[#FF4F59]/5 to-[#FFAD28]/5 border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {shop.shop}
              </CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
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

      {/* Warranty Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-0">
          <CardHeader>
            <CardTitle className="flex items-center">
              <ClipboardCheck className="h-5 w-5 mr-2" />
              Warranty Status
            </CardTitle>
          </CardHeader>
          <CardContent>
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

        {/* Credit Metrics */}
        <Card className="border-0">
          <CardHeader>
            <CardTitle className="flex items-center">
              <CreditCard className="h-5 w-5 mr-2" />
              Credit Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {creditMetrics.map((metric) => (
                <div key={metric.model} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{metric.model}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-[#FF4F59]">
                        {metric.creditsPaid}
                      </span>
                      <span className="text-sm text-[#FFAD28]">
                        {metric.disallowedAmount}
                      </span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Progress 
                      value={(metric.creditsPaid / (metric.creditsPaid + metric.disallowedAmount)) * 100} 
                      className="h-2 flex-1 bg-[#FF4F59]/10"
                    />
                    <Progress 
                      value={(metric.disallowedAmount / (metric.creditsPaid + metric.disallowedAmount)) * 100} 
                      className="h-2 flex-1 bg-[#FFAD28]/10"
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="border-0">
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
