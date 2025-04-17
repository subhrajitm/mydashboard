"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  ClipboardCheck,
  AlertCircle,
  Clock,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"

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

export default function WarrantyMetrics() {
  const [activeTimeframe, setActiveTimeframe] = useState("1w")

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-[#FF4F59] to-[#FFAD28] bg-clip-text text-transparent">
          Warranty Metrics
        </h1>
        <p className="text-lg text-muted-foreground">
          Track and manage warranty claims across all shops
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-[#FF4F59]/5 to-[#FFAD28]/5 border border-[#FF4F59]/20 shadow-sm hover:border-[#FF4F59]/40 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              To Be Assessed
            </CardTitle>
            <ClipboardCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {warrantyData.reduce((acc, curr) => acc + curr.toBeAssessed, 0)}
            </div>
            <div className="flex items-center text-xs text-muted-foreground mt-2">
              <ArrowUpRight className="h-4 w-4 text-[#FF4F59] mr-1" />
              <span>12% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-[#FF4F59]/5 to-[#FFAD28]/5 border border-[#FF4F59]/20 shadow-sm hover:border-[#FF4F59]/40 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              No Opportunity
            </CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {warrantyData.reduce((acc, curr) => acc + curr.noOpportunity, 0)}
            </div>
            <div className="flex items-center text-xs text-muted-foreground mt-2">
              <ArrowDownRight className="h-4 w-4 text-[#FFAD28] mr-1" />
              <span>8% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-[#FF4F59]/5 to-[#FFAD28]/5 border border-[#FF4F59]/20 shadow-sm hover:border-[#FF4F59]/40 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              In Progress
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {warrantyData.reduce((acc, curr) => acc + curr.inProgress, 0)}
            </div>
            <div className="flex items-center text-xs text-muted-foreground mt-2">
              <ArrowUpRight className="h-4 w-4 text-[#FF4F59] mr-1" />
              <span>15% from last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Shop-wise Status */}
      <Card className="border border-[#FF4F59]/20 shadow-sm">
        <CardHeader className="border-b border-[#FF4F59]/20">
          <CardTitle className="flex items-center">
            <ClipboardCheck className="h-5 w-5 mr-2" />
            Shop-wise Warranty Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {warrantyData.map((shop) => (
              <div key={shop.shop} className="space-y-4 p-4 rounded-lg bg-gradient-to-r from-[#FF4F59]/5 to-[#FFAD28]/5 border border-[#FF4F59]/20 hover:border-[#FF4F59]/40 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-medium">{shop.shop}</span>
                  <div className="flex space-x-2">
                    <Badge variant="secondary" className="bg-[#FF4F59]/10 text-[#FF4F59]">
                      {shop.toBeAssessed} To Assess
                    </Badge>
                    <Badge variant="secondary" className="bg-[#FFAD28]/10 text-[#FFAD28]">
                      {shop.inProgress} In Progress
                    </Badge>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Assessment Progress</span>
                    <span>{((shop.toBeAssessed + shop.inProgress) / 5) * 100}%</span>
                  </div>
                  <Progress 
                    value={(shop.toBeAssessed + shop.inProgress) * 20} 
                    className="h-2"
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Timeframe Selector */}
      <div className="flex justify-end">
        <div className="flex space-x-2">
          {["1d", "1w", "1m", "3m", "1y"].map((timeframe) => (
            <Button
              key={timeframe}
              variant={activeTimeframe === timeframe ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveTimeframe(timeframe)}
              className={activeTimeframe === timeframe ? "bg-gradient-to-r from-[#FF4F59] to-[#FFAD28] text-white" : ""}
            >
              {timeframe}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
} 