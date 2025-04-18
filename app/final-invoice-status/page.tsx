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
} from "lucide-react"

interface InvoiceData {
  id: string;
  customer: string;
  amount: number;
  status: "pending" | "approved" | "rejected";
  date: string;
  shop: string;
}

const invoiceData: InvoiceData[] = [
  { id: "INV-001", customer: "John Doe", amount: 1250.00, status: "pending", date: "2024-03-15", shop: "Shop1" },
  { id: "INV-002", customer: "Jane Smith", amount: 850.50, status: "approved", date: "2024-03-14", shop: "Shop2" },
  { id: "INV-003", customer: "Bob Johnson", amount: 2100.75, status: "rejected", date: "2024-03-13", shop: "Shop3" },
  { id: "INV-004", customer: "Alice Brown", amount: 950.25, status: "approved", date: "2024-03-12", shop: "Shop1" },
  { id: "INV-005", customer: "Charlie Wilson", amount: 1750.00, status: "pending", date: "2024-03-11", shop: "Shop2" },
]

export default function FinalInvoiceStatus() {
  const [activeTimeframe, setActiveTimeframe] = useState("1w")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredInvoices = invoiceData.filter(invoice => 
    invoice.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    invoice.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    invoice.shop.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const stats = {
    total: invoiceData.length,
    approved: invoiceData.filter(i => i.status === "approved").length,
    pending: invoiceData.filter(i => i.status === "pending").length,
    rejected: invoiceData.filter(i => i.status === "rejected").length,
    totalAmount: invoiceData.reduce((acc, curr) => acc + curr.amount, 0)
  }

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-[#FF4F59] to-[#FFAD28] bg-clip-text text-transparent">
          Final Invoice Status
        </h1>
        <p className="text-lg text-muted-foreground">
          Track and manage final invoice approvals
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <CustomCard
          title="Total Invoices"
          icon={<FileText className="h-4 w-4" />}
        >
          <div className="text-2xl font-bold">{stats.total}</div>
          <div className="flex items-center text-xs text-muted-foreground mt-2">
            <ArrowUpRight className="h-4 w-4 text-[#FF4F59] mr-1" />
            <span>5% from last month</span>
          </div>
        </CustomCard>

        <CustomCard
          title="Approved"
          icon={<CheckCircle2 className="h-4 w-4" />}
        >
          <div className="text-2xl font-bold">{stats.approved}</div>
          <div className="flex items-center text-xs text-muted-foreground mt-2">
            <ArrowUpRight className="h-4 w-4 text-[#FF4F59] mr-1" />
            <span>8% from last month</span>
          </div>
        </CustomCard>

        <CustomCard
          title="Pending"
          icon={<Clock className="h-4 w-4" />}
        >
          <div className="text-2xl font-bold">{stats.pending}</div>
          <div className="flex items-center text-xs text-muted-foreground mt-2">
            <ArrowDownRight className="h-4 w-4 text-[#FFAD28] mr-1" />
            <span>3% from last month</span>
          </div>
        </CustomCard>

        <CustomCard
          title="Total Amount"
          icon={<FileText className="h-4 w-4" />}
        >
          <div className="text-2xl font-bold">${stats.totalAmount.toLocaleString()}</div>
          <div className="flex items-center text-xs text-muted-foreground mt-2">
            <ArrowUpRight className="h-4 w-4 text-[#FF4F59] mr-1" />
            <span>12% from last month</span>
          </div>
        </CustomCard>
      </div>

      {/* Search and Timeframe */}
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="flex gap-4">
          <SearchInput
            placeholder="Search invoices..."
            value={searchQuery}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
            className="w-full md:w-96"
          />
          <div className="flex items-center gap-2">
            <CustomButton variant="ghost" size="sm" icon={<Download className="h-4 w-4" />}>
              Export
            </CustomButton>
            <CustomButton variant="ghost" size="sm" icon={<Filter className="h-4 w-4" />}>
              Filter
            </CustomButton>
          </div>
        </div>
        <div className="flex space-x-2">
          {["1d", "1w", "1m", "3m", "1y"].map((timeframe) => (
            <CustomButton
              key={timeframe}
              variant={activeTimeframe === timeframe ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveTimeframe(timeframe)}
            >
              {timeframe}
            </CustomButton>
          ))}
        </div>
      </div>

      {/* Invoice List */}
      <CustomCard
        title="Recent Invoices"
        icon={<FileText className="h-5 w-5" />}
      >
        <div className="space-y-4">
          {filteredInvoices.map((invoice) => (
            <div 
              key={invoice.id} 
              className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-[#FF4F59]/5 to-[#FFAD28]/5 border border-[#FF4F59]/20 hover:border-[#FF4F59]/40 transition-all duration-300"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#FF4F59]/10 to-[#FFAD28]/10 flex items-center justify-center">
                  <FileText className="h-6 w-6 text-[#FF4F59]" />
                </div>
                <div>
                  <div className="font-medium">{invoice.id}</div>
                  <div className="text-sm text-muted-foreground">{invoice.customer}</div>
                </div>
              </div>
              <div className="flex items-center space-x-8">
                <div className="text-right">
                  <div className="font-medium">${invoice.amount.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">{invoice.shop}</div>
                </div>
                <Badge 
                  variant="secondary" 
                  className={
                    invoice.status === "approved" ? "bg-green-500/10 text-green-500" :
                    invoice.status === "pending" ? "bg-yellow-500/10 text-yellow-500" :
                    "bg-red-500/10 text-red-500"
                  }
                >
                  {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                </Badge>
                <CustomButton
                  variant="ghost"
                  size="sm"
                  icon={<Download className="h-4 w-4" />}
                >
                  Download
                </CustomButton>
              </div>
            </div>
          ))}
        </div>
      </CustomCard>
    </div>
  )
} 