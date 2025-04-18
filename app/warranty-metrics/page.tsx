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
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-[#FF4F59] to-[#FFAD28] bg-clip-text text-transparent">
          Warranty Metrics
        </h1>
        <p className="text-lg text-muted-foreground">
          Track and analyze warranty claims and assessments
        </p>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CustomCard
          title="Shop-wise Warranty Status"
          icon={<Building2 className="h-5 w-5" />}
          className="bg-gradient-to-br from-[#FF4F59]/5 to-[#FFAD28]/5 border border-[#FF4F59]/20 shadow-sm hover:border-[#FF4F59]/40 transition-all duration-300 hover:scale-[1.02] hover:shadow-md"
        >
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={prepareShopChartData()}>
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
                <Legend />
                <Bar 
                  dataKey="toBeAssessed" 
                  fill={COLORS.primary} 
                  name="To Be Assessed"
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
                <Bar 
                  dataKey="inProgress" 
                  fill={COLORS.secondary} 
                  name="In Progress"
                  radius={[4, 4, 0, 0]}
                  animationDuration={1500}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CustomCard>

        <CustomCard
          title="Claims Distribution"
          icon={<ClipboardCheck className="h-5 w-5" />}
          className="bg-gradient-to-br from-[#FF4F59]/5 to-[#FFAD28]/5 border border-[#FF4F59]/20 shadow-sm hover:border-[#FF4F59]/40 transition-all duration-300 hover:scale-[1.02] hover:shadow-md"
        >
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={prepareClaimsPieData()}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  animationDuration={1500}
                  animationBegin={0}
                >
                  {prepareClaimsPieData().map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={Object.values(COLORS)[index % 3]}
                      stroke={COLORS.background}
                      strokeWidth={2}
                    />
                  ))}
                </Pie>
                <RechartsTooltip content={<CustomTooltip />} />
                <Legend 
                  verticalAlign="bottom" 
                  height={36}
                  formatter={(value) => (
                    <span className="text-sm" style={{ color: COLORS.text }}>
                      {value}
                    </span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CustomCard>
      </div>

      {/* Monthly Trends */}
      <CustomCard
        title="Monthly Claims Trend"
        icon={<FileText className="h-5 w-5" />}
        className="bg-gradient-to-br from-[#FF4F59]/5 to-[#FFAD28]/5 border border-[#FF4F59]/20 shadow-sm hover:border-[#FF4F59]/40 transition-all duration-300 hover:scale-[1.02] hover:shadow-md"
      >
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={monthlyData}>
              <defs>
                <linearGradient id="colorSuccessful" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={COLORS.primary} stopOpacity={0.8}/>
                  <stop offset="95%" stopColor={COLORS.primary} stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorRejected" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={COLORS.secondary} stopOpacity={0.8}/>
                  <stop offset="95%" stopColor={COLORS.secondary} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={COLORS.grid} />
              <XAxis 
                dataKey="month" 
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
                dataKey="successful" 
                stroke={COLORS.primary}
                fillOpacity={1} 
                fill="url(#colorSuccessful)"
                name="Successful Claims"
                animationDuration={1500}
              />
              <Area 
                type="monotone" 
                dataKey="rejected" 
                stroke={COLORS.secondary}
                fillOpacity={1} 
                fill="url(#colorRejected)"
                name="Rejected Claims"
                animationDuration={1500}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CustomCard>

      {/* Search and Timeframe */}
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="flex gap-4">
          <SearchInput
            placeholder="Search shops..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
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
    </div>
  )
} 