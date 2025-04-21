"use client"

import { memo, useState, useEffect } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface RevenueData {
  name: string
  revenue: number
  previousRevenue: number
  transactions: number
}

interface RevenueChartProps {
  data: RevenueData[]
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl p-4 rounded-lg shadow-lg border border-white/20 dark:border-gray-800/20">
        <p className="font-medium text-gray-900 dark:text-gray-100">{label}</p>
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

const RevenueChart = memo(({ data }: RevenueChartProps) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate chart loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="h-[200px] flex items-center justify-center">
        <div className="animate-pulse flex space-x-4">
          <div className="h-2 bg-gray-200 rounded w-3/4"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[200px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#FF4F59" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#FF4F59" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorPreviousRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#FF4F59" stopOpacity={0.1} />
              <stop offset="95%" stopColor="#FF4F59" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200/20" />
          <XAxis 
            dataKey="name" 
            stroke="currentColor" 
            strokeOpacity={0.5} 
            fontSize={10}
            tickLine={false}
          />
          <YAxis
            stroke="currentColor"
            strokeOpacity={0.5}
            fontSize={10}
            tickLine={false}
            tickFormatter={(value) => `$${value.toLocaleString()}`}
          />
          <Tooltip content={CustomTooltip} />
          <Area
            type="monotone"
            dataKey="previousRevenue"
            stroke="#FF4F59"
            strokeOpacity={0.2}
            strokeWidth={2}
            fill="url(#colorPreviousRevenue)"
          />
          <Area
            type="monotone"
            dataKey="revenue"
            stroke="#FF4F59"
            strokeWidth={2}
            fill="url(#colorRevenue)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
})

RevenueChart.displayName = 'RevenueChart'

export default RevenueChart 