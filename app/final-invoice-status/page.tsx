"use client"

import { FileText, AlertCircle, CheckCircle2, Clock, TrendingUp, TrendingDown } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

const invoiceData = [
  { shop: "Shop1", engines: 12, due: 10, issued: 1, upcoming: 1 },
  { shop: "Shop2", engines: 7, due: 5, issued: 1, upcoming: 1 },
  { shop: "Shop3", engines: 4, due: 1, issued: 3, upcoming: 0 }
]

const invoiceStats = [
  {
    title: "Total Engines",
    value: "23",
    change: "+3",
    trend: "up",
    icon: FileText,
  },
  {
    title: "Due Invoices",
    value: "16",
    change: "+2",
    trend: "up",
    icon: AlertCircle,
  },
  {
    title: "Issued Invoices",
    value: "5",
    change: "+1",
    trend: "up",
    icon: CheckCircle2,
  },
  {
    title: "Upcoming Invoices",
    value: "2",
    change: "0",
    trend: "neutral",
    icon: Clock,
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

export default function FinalInvoiceStatusPage() {
  return (
    <div className="space-y-8 p-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[#FF4F59] to-[#FFAD28] bg-clip-text text-transparent">
            Final Invoice Status
          </h1>
          <p className="text-lg text-muted-foreground">
            Track and manage final invoices across all shops
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {invoiceStats.map((stat) => (
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

      {/* Invoice Status Chart */}
      <Card className="bg-gradient-to-br from-[#FF4F59]/5 to-[#FFAD28]/5 border border-[#FF4F59]/20 shadow-sm hover:border-[#FF4F59]/40 transition-all duration-300 hover:scale-[1.02] hover:shadow-md">
        <CardHeader className="border-b border-[#FF4F59]/20">
          <CardTitle className="flex items-center">
            <FileText className="h-5 w-5 mr-2" />
            Invoice Status by Shop
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={invoiceData}>
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

      {/* Detailed Status */}
      <Card className="bg-gradient-to-br from-[#FF4F59]/5 to-[#FFAD28]/5 border border-[#FF4F59]/20 shadow-sm hover:border-[#FF4F59]/40 transition-all duration-300 hover:scale-[1.02] hover:shadow-md">
        <CardHeader className="border-b border-[#FF4F59]/20">
          <CardTitle className="flex items-center">
            <FileText className="h-5 w-5 mr-2" />
            Detailed Status
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-6">
            {invoiceData.map((shop) => (
              <div key={shop.shop} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{shop.shop}</span>
                  <div className="flex space-x-2">
                    <Badge variant="secondary" className="bg-[#FF4F59]/10 text-[#FF4F59]">
                      {shop.due} Due
                    </Badge>
                    <Badge variant="secondary" className="bg-[#FFAD28]/10 text-[#FFAD28]">
                      {shop.issued} Issued
                    </Badge>
                    <Badge variant="secondary" className="bg-[#444744]/10 text-[#444744]">
                      {shop.upcoming} Upcoming
                    </Badge>
                  </div>
                </div>
                <Progress 
                  value={(shop.due + shop.issued + shop.upcoming) * 10} 
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