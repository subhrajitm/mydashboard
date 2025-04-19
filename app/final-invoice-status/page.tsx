"use client"

import React, { useState, useMemo, useCallback } from "react"
import { FileText, AlertCircle, CheckCircle2, Clock, TrendingUp, TrendingDown, Download, Filter, Search, Plus, Calendar, SortAsc, X, ChevronRight, ChevronLeft, ArrowUpDown, Eye, Check, ChevronsUpDown, DollarSign } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { format } from "date-fns"

interface InvoiceStatus {
  invoiceNumber: string
  status: 'pending' | 'paid' | 'overdue' | 'cancelled'
  amount: number
  date: string
}

interface TableHeaderProps {
  label: string
  sortKey?: string
  sortable?: boolean
}

const TableHeader = ({ label, sortKey, sortable = true }: TableHeaderProps) => (
  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
    <div className="flex items-center space-x-1">
      <span>{label}</span>
      {sortable && <ArrowUpDown className="h-4 w-4" />}
    </div>
  </th>
)

const StatusBadge = ({ status }: { status: InvoiceStatus['status'] }) => {
  const statusConfig = {
    pending: { color: 'bg-yellow-500/10 text-yellow-500', icon: Clock },
    paid: { color: 'bg-green-500/10 text-green-500', icon: CheckCircle2 },
    overdue: { color: 'bg-red-500/10 text-red-500', icon: AlertCircle },
    cancelled: { color: 'bg-gray-500/10 text-gray-500', icon: X }
  }

  const config = statusConfig[status]
  const Icon = config.icon

  return (
    <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
      <Icon className="w-3 h-3 mr-1" />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </div>
  )
}

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

// Sample data based on the images
const invoiceDataTable = [
  { shop: "Shop1", engines: 12, due: 10, issued: 1, upcoming: 1 },
  { shop: "Shop2", engines: 7, due: 5, issued: 1, upcoming: 1 },
  { shop: "Shop3", engines: 4, due: 1, issued: 3, upcoming: 0 },
]

const warrantyClaimData = [
  { shop: "Shop1", toBeAssessed: 1, noOpportunity: 0, inProgress: 0 },
  { shop: "Shop2", toBeAssessed: 1, noOpportunity: 0, inProgress: 0 },
  { shop: "Shop3", toBeAssessed: 3, noOpportunity: 0, inProgress: 0 },
]

const opportunityData = [
  { shop: "Shop2", customer: "WRNTYCUST743", model: "Model4", esn: "1123", partKeyword: "SEAL", partNumber: "JUY1284" },
  { shop: "Shop2", customer: "WRNTYCUST743", model: "Model4", esn: "1123", partKeyword: "BUSHING", partNumber: "HUG5678" },
  { shop: "Shop2", customer: "WRNTYCUST743", model: "Model4", esn: "1123", partKeyword: "VALVE", partNumber: "VKS896" },
  { shop: "Shop2", customer: "WRNTYCUST743", model: "Model4", esn: "1123", partKeyword: "BLADE", partNumber: "QKR776" },
]

const recommendationsData = [
  { shop: "Shop2", customer: "WRNTYCUST743", model: "Model4", esn: "001123", businessPlan: "BP001" },
  { shop: "Shop2", customer: "WRNTYCUST743", model: "Model4", esn: "001123", businessPlan: "BP001" },
  { shop: "Shop2", customer: "WRNTYCUST743", model: "Model4", esn: "001123", businessPlan: "BP001" },
  { shop: "Shop2", customer: "WRNTYCUST743", model: "Model4", esn: "001123", businessPlan: "BP001" },
]

interface InvoiceTableData {
  shop: string
  engines: number
  due: number
  issued: number
  upcoming: number
}

interface WarrantyTableData {
  shop: string
  toBeAssessed: number
  noOpportunity: number
  inProgress: number
}

interface OpportunityTableData {
  shop: string
  customer: string
  model: string
  esn: string
  partKeyword: string
  partNumber: string
}

interface RecommendationsTableData {
  shop: string
  customer: string
  model: string
  esn: string
  businessPlan: string
}

interface PriorityTableData {
  priority: string
  esn: string
  businessPlan: string
  affectedParts: {
    keyword: string
    partNo: string
    criteria1: string
    criteria2: string
    criteria3: string
    criteria4: string
  }[]
  applicableDisc: string
  estWarrantyAmount: string
}

const priorityData: PriorityTableData[] = [
  {
    priority: "1",
    esn: "ESN11",
    businessPlan: "CS12345",
    affectedParts: [
      { keyword: "PK1", partNo: "PN1", criteria1: "NR", criteria2: "NR", criteria3: "<=3", criteria4: "100%" },
      { keyword: "PK2", partNo: "PN2", criteria1: "NR", criteria2: "NR", criteria3: "<=2", criteria4: "NR" },
    ],
    applicableDisc: "40%",
    estWarrantyAmount: "$1,432,463",
  },
  {
    priority: "2",
    esn: "ESN11",
    businessPlan: "D678",
    affectedParts: [
      { keyword: "PK3", partNo: "PN3", criteria1: "72-0657", criteria2: "NR", criteria3: "NR", criteria4: "NR" },
      { keyword: "PK4", partNo: "PN4", criteria1: "72-0657", criteria2: "NR", criteria3: "NR", criteria4: "NR" },
    ],
    applicableDisc: "25%",
    estWarrantyAmount: "$25,625",
  },
]

interface TableColumn {
  key: string
  label: string
  sortable: boolean
}

interface TableWrapperProps<T> {
  data: T[]
  columns: TableColumn[]
  renderCell: (row: T, column: string) => React.ReactNode
}

const TableWrapper = <T extends object>({ data, columns, renderCell }: TableWrapperProps<T>) => {
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(5)
  const [globalFilter, setGlobalFilter] = useState("")

  // Memoize the filtered data
  const filteredData = useMemo(() => {
    if (!globalFilter) return data

    return data.filter(row => {
      return Object.values(row).some(value => {
        if (value === null || value === undefined) return false
        return String(value).toLowerCase().includes(globalFilter.toLowerCase())
      })
    })
  }, [data, globalFilter])

  // Memoize the sorted data
  const sortedData = useMemo(() => {
    if (!sortConfig) return filteredData

    return [...filteredData].sort((a, b) => {
      const aValue = a[sortConfig.key as keyof T]
      const bValue = b[sortConfig.key as keyof T]

      if (aValue === bValue) return 0
      if (aValue === null || aValue === undefined) return 1
      if (bValue === null || bValue === undefined) return -1

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortConfig.direction === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue)
      }

      return sortConfig.direction === 'asc'
        ? (aValue as number) - (bValue as number)
        : (bValue as number) - (aValue as number)
    })
  }, [filteredData, sortConfig])

  // Calculate pagination
  const totalPages = Math.ceil(sortedData.length / itemsPerPage)
  const paginatedData = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  // Handle filter change
  const handleFilterChange = (value: string) => {
    setGlobalFilter(value)
    setCurrentPage(1) // Reset to first page when filter changes
  }

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  // Memoize the sort handler
  const handleSort = useCallback((key: string) => {
    setSortConfig((current) => {
      if (!current || current.key !== key) {
        return { key, direction: 'asc' }
      }
      if (current.direction === 'asc') {
        return { key, direction: 'desc' }
      }
      return null
    })
  }, [])

  // Memoize the table header
  const TableHeader = useCallback(({ column }: { column: TableColumn }) => (
    <th
      className="px-6 py-4 font-medium text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors cursor-pointer border-b border-gray-200 dark:border-gray-700"
      onClick={() => column.sortable && handleSort(column.key)}
    >
      <div className="flex items-center gap-2">
        <span className="font-semibold">{column.label}</span>
        {column.sortable && (
          <ChevronsUpDown className="h-4 w-4 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors" />
        )}
      </div>
    </th>
  ), [handleSort])

  // Memoize the table row
  const TableRow = useCallback(({ row, index }: { row: T; index: number }) => (
    <tr
      key={index}
      className="hover:bg-white/5 dark:hover:bg-gray-800/5 transition-colors"
    >
      {columns.map((column) => (
        <td key={column.key} className="px-6 py-4 text-gray-700 dark:text-gray-300">
          {renderCell(row, column.key)}
        </td>
      ))}
    </tr>
  ), [columns, renderCell])

  return (
    <div className="space-y-4">
      {/* Global Filter */}
      <div className="flex items-center gap-4 px-6 py-4 rounded-lg border border-white/10 dark:border-gray-700/20 shadow-sm bg-white/5 dark:bg-gray-800/5">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search in all columns..."
            className="pl-10"
            value={globalFilter}
            onChange={(e) => handleFilterChange(e.target.value)}
          />
          </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {filteredData.length} results
          </div>
      </div>

      <div className="overflow-x-auto rounded-lg border border-white/10 dark:border-gray-700/20 shadow-sm">
        <table className="w-full text-sm text-left">
          <thead className="text-xs uppercase bg-white/5 dark:bg-gray-800/5">
            <tr className="border-b border-white/10 dark:border-gray-700/20">
              {columns.map((column) => (
                <TableHeader key={column.key} column={column} />
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10 dark:divide-gray-700/20">
            {paginatedData.map((row, index) => (
              <TableRow key={index} row={row} index={index} />
            ))}
          </tbody>
        </table>
          </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-6 py-4 rounded-lg border border-white/10 dark:border-gray-700/20 shadow-sm bg-white/5 dark:bg-gray-800/5">
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, sortedData.length)} of {sortedData.length} entries
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="border-white/10 dark:border-gray-700/20 hover:bg-white/5 dark:hover:bg-gray-800/5"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "outline"}
              size="sm"
              onClick={() => handlePageChange(page)}
              className={currentPage === page ? "bg-[#FF4F59] hover:bg-[#FF4F59]/90" : "border-white/10 dark:border-gray-700/20 hover:bg-white/5 dark:hover:bg-gray-800/5"}
            >
              {page}
            </Button>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="border-white/10 dark:border-gray-700/20 hover:bg-white/5 dark:hover:bg-gray-800/5"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default function FinalInvoiceStatus() {
  const [activeTab, setActiveTab] = useState("invoice")
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedShop, setSelectedShop] = useState("all")

  // Summary statistics
  const summaryStats = [
    {
      title: "Total Warranty Claims",
      value: "24",
      change: "+12%",
      trend: "up",
      icon: FileText,
      color: "text-blue-500"
    },
    {
      title: "Active Opportunities",
      value: "8",
      change: "+5%",
      trend: "up",
      icon: TrendingUp,
      color: "text-green-500"
    },
    {
      title: "Pending Assessments",
      value: "5",
      change: "-2%",
      trend: "down",
      icon: Clock,
      color: "text-yellow-500"
    },
    {
      title: "Total Amount",
      value: "$1,458,088",
      change: "+8%",
      trend: "up",
      icon: DollarSign,
      color: "text-purple-500"
    }
  ]

  // Chart data
  const chartData = [
    { name: "Jan", claims: 4, opportunities: 2 },
    { name: "Feb", claims: 6, opportunities: 3 },
    { name: "Mar", claims: 8, opportunities: 5 },
    { name: "Apr", claims: 5, opportunities: 4 },
    { name: "May", claims: 7, opportunities: 6 },
    { name: "Jun", claims: 9, opportunities: 8 }
  ]

  const steps = [
    { id: 'invoice', label: 'Invoice Status', description: 'View and manage invoice statuses' },
    { id: 'warranty', label: 'Warranty Claims', description: 'Review warranty claims' },
    { id: 'opportunity', label: 'Opportunities', description: 'Analyze warranty opportunities' },
    { id: 'recommendations', label: 'Recommendations', description: 'Review recommendations' },
    { id: 'priority', label: 'Priority', description: 'Set priority levels' }
  ]

  // Memoize the table rendering function
  const renderActiveTable = useCallback(() => {
    switch (activeTab) {
      case 'invoice':
        return (
          <TableWrapper
            data={invoiceDataTable}
            columns={[
              { key: 'shop', label: 'Shop', sortable: true },
              { key: 'engines', label: '# of Engines', sortable: true },
              { key: 'due', label: 'Due', sortable: true },
              { key: 'issued', label: 'Issued', sortable: true },
              { key: 'upcoming', label: 'Upcoming', sortable: true },
              { key: 'actions', label: 'Actions', sortable: false }
            ]}
            renderCell={(row: InvoiceTableData, column) => {
              switch (column) {
                case 'shop':
                  return row.shop
                case 'engines':
                  return row.engines
                case 'due':
                  return <Badge variant="destructive">{row.due}</Badge>
                case 'issued':
                  return <Badge variant="default">{row.issued}</Badge>
                case 'upcoming':
                  return <Badge variant="secondary">{row.upcoming}</Badge>
                case 'actions':
                  return (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedShop(row.shop)
                        setActiveTab('warranty')
                      }}
                    >
                      <ChevronRight className="h-4 w-4 mr-2" />
                      Proceed
                    </Button>
                  )
                default:
                  return null
              }
            }}
          />
        )

      case 'warranty':
        return (
          <TableWrapper
            data={warrantyClaimData}
            columns={[
              { key: 'shop', label: 'Shop', sortable: true },
              { key: 'toBeAssessed', label: 'To be assessed', sortable: true },
              { key: 'noOpportunity', label: 'No Opportunity', sortable: true },
              { key: 'inProgress', label: 'In Progress', sortable: true },
              { key: 'actions', label: 'Actions', sortable: false }
            ]}
            renderCell={(row: WarrantyTableData, column) => {
              switch (column) {
                case 'shop':
                  return row.shop
                case 'toBeAssessed':
                  return <Badge variant="secondary">{row.toBeAssessed}</Badge>
                case 'noOpportunity':
                  return row.noOpportunity
                case 'inProgress':
                  return row.inProgress
                case 'actions':
                  return (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setActiveTab('opportunity')}
                    >
                      <ChevronRight className="h-4 w-4 mr-2" />
                      Proceed
                    </Button>
                  )
                default:
                  return null
              }
            }}
          />
        )

      case 'opportunity':
        return (
          <TableWrapper
            data={opportunityData}
            columns={[
              { key: 'shop', label: 'Shop', sortable: true },
              { key: 'customer', label: 'Customer', sortable: true },
              { key: 'model', label: 'Model', sortable: true },
              { key: 'esn', label: 'ESN', sortable: true },
              { key: 'partKeyword', label: 'Part Keyword', sortable: true },
              { key: 'partNumber', label: 'Part Number', sortable: true },
              { key: 'actions', label: 'Actions', sortable: false }
            ]}
            renderCell={(row: OpportunityTableData, column) => {
              switch (column) {
                case 'shop':
                  return row.shop
                case 'customer':
                  return row.customer
                case 'model':
                  return row.model
                case 'esn':
                  return row.esn
                case 'partKeyword':
                  return <Badge variant="outline">{row.partKeyword}</Badge>
                case 'partNumber':
                  return row.partNumber
                case 'actions':
                  return (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setActiveTab('recommendations')}
                      className="bg-[#FF4F59] text-white hover:bg-[#FF4F59]/90"
                    >
                      Analyze for Warranty Oppty
                    </Button>
                  )
                default:
                  return null
              }
            }}
          />
        )

      case 'recommendations':
        return (
          <TableWrapper
            data={recommendationsData}
            columns={[
              { key: 'shop', label: 'Shop', sortable: true },
              { key: 'customer', label: 'Customer', sortable: true },
              { key: 'model', label: 'Model', sortable: true },
              { key: 'esn', label: 'ESN', sortable: true },
              { key: 'businessPlan', label: 'Business Plan', sortable: true },
              { key: 'actions', label: 'Actions', sortable: false }
            ]}
            renderCell={(row: RecommendationsTableData, column) => {
              switch (column) {
                case 'shop':
                  return row.shop
                case 'customer':
                  return row.customer
                case 'model':
                  return row.model
                case 'esn':
                  return row.esn
                case 'businessPlan':
                  return <Badge variant="outline">{row.businessPlan}</Badge>
                case 'actions':
                  return (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setActiveTab('priority')}
                    >
                      <ChevronRight className="h-4 w-4 mr-2" />
                      Proceed
                    </Button>
                  )
                default:
                  return null
              }
            }}
          />
        )

      case 'priority':
        return (
          <TableWrapper
            data={priorityData}
            columns={[
              { key: 'priority', label: 'Priority', sortable: true },
              { key: 'esn', label: 'ESN', sortable: true },
              { key: 'businessPlan', label: 'Business Plan', sortable: true },
              { key: 'affectedParts', label: 'Affected Parts', sortable: false },
              { key: 'applicableDisc', label: 'Applicable Disc%', sortable: true },
              { key: 'estWarrantyAmount', label: 'Est Warranty Amount', sortable: true },
              { key: 'actions', label: 'Actions', sortable: false }
            ]}
            renderCell={(row: PriorityTableData, column) => {
              switch (column) {
                case 'priority':
                  return <Badge variant="default">{row.priority}</Badge>
                case 'esn':
                  return row.esn
                case 'businessPlan':
                  return row.businessPlan
                case 'affectedParts':
                  return (
                    <div className="space-y-2">
                      {row.affectedParts.map((part, index) => (
                        <div key={index} className="grid grid-cols-5 gap-2 text-xs bg-white/5 dark:bg-gray-800/5 p-2 rounded">
                          <span className="font-medium">{part.keyword}</span>
                          <span>{part.partNo}</span>
                          <span className={part.criteria1 === "72-0657" ? "text-green-500" : ""}>
                            {part.criteria1}
                          </span>
                          <span>{part.criteria2}</span>
                          <span className={part.criteria3 === "<=3" ? "text-green-500" : ""}>
                            {part.criteria3}
                          </span>
                        </div>
                      ))}
                    </div>
                  )
                case 'applicableDisc':
                  return <Badge variant="outline">{row.applicableDisc}</Badge>
                case 'estWarrantyAmount':
                  return <Badge variant="default">{row.estWarrantyAmount}</Badge>
                case 'actions':
                  return (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setActiveTab('recommendations')}
                    >
                      <ChevronRight className="h-4 w-4 mr-2" />
                      Proceed
                    </Button>
                  )
                default:
                  return null
              }
            }}
          />
        )
    }
  }, [activeTab])

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#FF4F59] to-[#FFAD28] bg-clip-text text-transparent">
            Final Invoice Status
          </h1>
          <p className="text-sm text-muted-foreground">
            Track and manage your invoice status and warranty claims
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-4">
        {summaryStats.map((stat, index) => (
          <Card key={index} className="backdrop-blur-lg bg-white/10 dark:bg-gray-800/10 border border-white/20 dark:border-gray-700/20 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400">{stat.title}</p>
                  <div className="flex items-baseline gap-2">
                    <h3 className="text-lg font-bold">{stat.value}</h3>
                    <span className={`text-xs font-medium ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                      {stat.change}
                    </span>
                  </div>
                </div>
                <div className={`p-2 rounded-full bg-white/10 dark:bg-gray-800/10 ${stat.color}`}>
                  <stat.icon className="h-4 w-4" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Steps Navigation */}
      <div className="relative">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const isActive = step.id === activeTab
            const isCompleted = steps.findIndex(s => s.id === activeTab) > index
            const isUpcoming = steps.findIndex(s => s.id === activeTab) < index

            return (
              <div key={step.id} className="relative flex-1">
                {/* Step connector line */}
                {index < steps.length - 1 && (
                  <div className="absolute left-[calc(50%+1.5rem)] top-4 w-[calc(100%-3rem)] h-0.5">
                    <div className={`
                      h-full transition-all duration-300
                      ${isCompleted ? 'bg-[#FF4F59]' : 'bg-gray-200 dark:bg-gray-800'}
                    `} />
                  </div>
                )}

                {/* Step content */}
                <div className="flex flex-col items-center">
                  <div
                    className={`
                      flex h-8 w-8 items-center justify-center rounded-full border-2
                      transition-all duration-300
                      ${isActive 
                        ? 'border-[#FF4F59] bg-[#FF4F59] text-white shadow-lg shadow-[#FF4F59]/20' 
                        : isCompleted 
                          ? 'border-[#FF4F59] bg-[#FF4F59] text-white' 
                          : 'border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-400'
                      }
                    `}
                  >
                    {isCompleted ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <span className="text-sm font-medium">{index + 1}</span>
                    )}
                  </div>
                  <div className="mt-2 text-center">
                    <button
                      onClick={() => setActiveTab(step.id)}
                      className={`
                        transition-colors duration-300
                        ${isActive 
                          ? 'text-[#FF4F59] font-medium' 
                          : isCompleted 
                            ? 'text-[#FF4F59]' 
                            : 'text-gray-500 dark:text-gray-400'
                        }
                      `}
                    >
                      <h3 className="text-sm font-medium">{step.label}</h3>
                      <p className="text-xs mt-0.5">{step.description}</p>
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Active Table Content */}
      <div className="mt-8">
        {renderActiveTable()}
      </div>

      {/* Footer */}
      <footer className="py-6 text-center text-xs text-muted-foreground/60">
        <p>Copyright © 2025 Genpact India. All rights reserved.</p>
      </footer>
    </div>
  )
} 