"use client"

import { memo } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'

interface ExpenseData {
  name: string
  value: number
  description: string
}

interface ExpensePieChartProps {
  data: ExpenseData[]
  colors: Record<string, string>
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    const percentage = ((data.value / payload[0].payload.total) * 100).toFixed(1)
    return (
      <div className="bg-white/90 dark:bg-gray-800/90 p-3 rounded-lg shadow-xl border border-white/20 dark:border-gray-700/20 backdrop-blur-xl">
        <p className="text-sm font-medium">{data.name}</p>
        <p className="text-xs text-muted-foreground">{data.description}</p>
        <div className="mt-1 flex items-center gap-2">
          <span className="text-sm font-medium">${data.value}</span>
          <span className="text-xs text-muted-foreground">({percentage}%)</span>
        </div>
      </div>
    )
  }
  return null
}

const ExpensePieChart = memo(({ data, colors }: ExpensePieChartProps) => {
  const total = data.reduce((acc, curr) => acc + curr.value, 0)
  const dataWithTotal = data.map(item => ({ ...item, total }))

  return (
    <div className="h-[180px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={dataWithTotal}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry) => (
              <Cell 
                key={`cell-${entry.name}`} 
                fill={colors[entry.name]}
                stroke="none"
              />
            ))}
          </Pie>
          <Tooltip content={CustomTooltip} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
})

ExpensePieChart.displayName = 'ExpensePieChart'

export default ExpensePieChart 