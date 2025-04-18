"use client"

import { FileText, AlertCircle, CheckCircle2, Clock, TrendingUp, TrendingDown, Download, Filter, Search, Plus, Calendar, SortAsc, X } from "lucide-react"
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
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"

const invoiceData = [
  { shop: "Shop1", engines: 12, due: 10, issued: 1, upcoming: 1 },
  { shop: "Shop2", engines: 7, due: 5, issued: 1, upcoming: 1 },
  { shop: "Shop3", engines: 4, due: 1, issued: 3, upcoming: 0 }
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

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {invoiceStats.map((stat) => (
          <Card key={stat.title} className="bg-white/30 dark:bg-gray-900/30 backdrop-blur-lg border-white/30 shadow-lg shadow-black/5">
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

      <div className="grid gap-8 md:grid-cols-2">
        <Card className="bg-white/30 dark:bg-gray-900/30 backdrop-blur-lg border-white/30 shadow-lg shadow-black/5">
          <CardHeader>
            <CardTitle>Invoice Status by Shop</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={invoiceData}>
                  <XAxis dataKey="shop" />
                  <YAxis />
                  <RechartsTooltip content={<CustomTooltip />} />
                  <Bar dataKey="due" fill="#FF4F59" />
                  <Bar dataKey="issued" fill="#FFAD28" />
                  <Bar dataKey="upcoming" fill="#444744" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/30 dark:bg-gray-900/30 backdrop-blur-lg border-white/30 shadow-lg shadow-black/5">
          <CardHeader>
            <CardTitle>Detailed Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {invoiceData.map((shop) => (
                <div key={shop.shop} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{shop.shop}</h3>
                    <div className="flex gap-2">
                      <Badge variant="destructive">{shop.due} Due</Badge>
                      <Badge variant="outline">{shop.issued} Issued</Badge>
                      <Badge variant="secondary">{shop.upcoming} Upcoming</Badge>
                    </div>
                  </div>
                  <Progress value={(shop.due / (shop.due + shop.issued + shop.upcoming)) * 100} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 