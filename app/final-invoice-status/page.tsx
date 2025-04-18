"use client"

import { FileText, AlertCircle, CheckCircle2, Clock, TrendingUp, TrendingDown, Download, Filter, Search, Plus, Calendar, SortAsc, X } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
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
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"

const invoiceData = [
  { name: "Due", value: 30, color: "#FF4F59" },
  { name: "Issued", value: 45, color: "#FFAD28" },
  { name: "Upcoming", value: 25, color: "#444744" },
]

const paymentData = [
  { shop: "Shop A", paid: 12, pending: 3 },
  { shop: "Shop B", paid: 8, pending: 5 },
  { shop: "Shop C", paid: 15, pending: 2 },
  { shop: "Shop D", paid: 10, pending: 4 },
]

interface RecentInvoice {
  id: number
  shop: string
  date: string
  status: 'Paid' | 'Pending'
}

const recentInvoices: RecentInvoice[] = [
  { id: 1, shop: "Shop A", date: "2024-03-15", status: "Paid" },
  { id: 2, shop: "Shop B", date: "2024-03-14", status: "Pending" },
  { id: 3, shop: "Shop C", date: "2024-03-13", status: "Paid" },
  { id: 4, shop: "Shop D", date: "2024-03-12", status: "Pending" },
]

interface InvoiceStat {
  title: string
  value: string
  description: string
  icon: React.ElementType
}

const invoiceStats: InvoiceStat[] = [
  {
    title: "Total Engines",
    value: "40",
    description: "Across all shops",
    icon: FileText,
  },
  {
    title: "Due Invoices",
    value: "12",
    description: "Pending payment",
    icon: AlertCircle,
  },
  {
    title: "Issued Invoices",
    value: "25",
    description: "Successfully processed",
    icon: CheckCircle2,
  },
  {
    title: "Upcoming Invoices",
    value: "3",
    description: "Scheduled for next month",
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
  const [activeStatus, setActiveStatus] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[#FF4F59] to-[#FFAD28] bg-clip-text text-transparent">
            Final Invoice Status
          </h1>
          <p className="text-lg text-muted-foreground">
            Track and manage final invoice status across all shops
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
          {invoiceStats.map((stat) => (
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
          {/* Invoice Status Chart */}
          <Card className="bg-white/30 dark:bg-gray-900/30 backdrop-blur-lg border border-white/30 shadow-lg shadow-black/5">
            <CardHeader>
              <CardTitle>Invoice Status</CardTitle>
              <CardDescription>Distribution of invoice statuses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={invoiceData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#FF4F59"
                      label
                    >
                      {invoiceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <RechartsTooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Payment Status Chart */}
          <Card className="bg-white/30 dark:bg-gray-900/30 backdrop-blur-lg border border-white/30 shadow-lg shadow-black/5">
            <CardHeader>
              <CardTitle>Payment Status</CardTitle>
              <CardDescription>Payment status by shop</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={paymentData}>
                    <XAxis dataKey="shop" />
                    <YAxis />
                    <RechartsTooltip content={<CustomTooltip />} />
                    <Bar dataKey="paid" fill="#FF4F59" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="pending" fill="#FFAD28" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Invoices */}
        <Card className="bg-white/30 dark:bg-gray-900/30 backdrop-blur-lg border border-white/30 shadow-lg shadow-black/5">
          <CardHeader>
            <CardTitle>Recent Invoices</CardTitle>
            <CardDescription>Latest invoice activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentInvoices.map((invoice) => (
                <div key={invoice.id} className="flex items-center justify-between p-4 rounded-lg bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm border border-white/20">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 rounded-full bg-[#FF4F59]/10">
                      <FileText className="h-4 w-4 text-[#FF4F59]" />
                    </div>
                    <div>
                      <p className="font-medium">{invoice.shop}</p>
                      <p className="text-sm text-muted-foreground">{invoice.date}</p>
                    </div>
                  </div>
                  <Badge variant={invoice.status === 'Paid' ? 'default' : 'secondary'}>
                    {invoice.status}
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