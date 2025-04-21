"use client"

import { memo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpRight, ArrowDownRight } from "lucide-react"

interface Stat {
  title: string
  value: string
  description: string
  icon: React.ElementType
  trend: "up" | "down"
}

interface StatsCardProps {
  stat: Stat
}

const StatsCard = memo(({ stat }: StatsCardProps) => {
  const Icon = stat.icon
  return (
    <Card className="bg-white/20 dark:bg-gray-800/20 backdrop-blur-xl border border-white/20 dark:border-gray-700/20">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground/80">
          {stat.title}
        </CardTitle>
        <div className="h-8 w-8 rounded-full bg-white/10 dark:bg-gray-800/10 flex items-center justify-center">
          <Icon className="h-4 w-4 text-muted-foreground/80" />
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
          {stat.value}
        </div>
        <div className="flex items-center space-x-2 mt-1">
          {stat.trend === "up" ? (
            <ArrowUpRight className="h-4 w-4 text-green-500" />
          ) : (
            <ArrowDownRight className="h-4 w-4 text-red-500" />
          )}
          <p className="text-xs text-muted-foreground/80">
            {stat.description}
          </p>
        </div>
      </CardContent>
    </Card>
  )
})

StatsCard.displayName = 'StatsCard'

export default StatsCard 