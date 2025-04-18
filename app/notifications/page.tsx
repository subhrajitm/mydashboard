"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, CheckCircle2, AlertCircle, Info, X, Bell } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

const notifications = [
  {
    id: 1,
    title: "New Invoice Received",
    description: "Invoice #INV-2024-001 has been received from Client A",
    date: "2m ago",
    type: "success",
    icon: CheckCircle2,
    read: false,
  },
  {
    id: 2,
    title: "Payment Overdue",
    description: "Payment for Invoice #INV-2024-002 is overdue by 5 days",
    date: "1h ago",
    type: "warning",
    icon: AlertCircle,
    read: false,
  },
  {
    id: 3,
    title: "System Update",
    description: "New features have been added to the dashboard",
    date: "3h ago",
    type: "info",
    icon: Info,
    read: true,
  },
  {
    id: 4,
    title: "New Client Added",
    description: "Client B has been added to your account",
    date: "1d ago",
    type: "success",
    icon: CheckCircle2,
    read: true,
  },
  {
    id: 5,
    title: "Payment Received",
    description: "Payment of $2,500.00 has been received for Invoice #INV-2024-003",
    date: "2d ago",
    type: "success",
    icon: CheckCircle2,
    read: true,
  },
]

const typeColors = {
  success: "bg-green-500/10 text-green-500",
  warning: "bg-yellow-500/10 text-yellow-500",
  info: "bg-blue-500/10 text-blue-500",
}

export default function NotificationsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filter, setFilter] = useState("all")

  const filteredNotifications = notifications.filter((notification) => {
    const matchesSearch = notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notification.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filter === "all" || 
      (filter === "unread" && !notification.read) ||
      (filter === "read" && notification.read)
    return matchesSearch && matchesFilter
  })

  return (
    <div className="space-y-8 p-6">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-[#FF4F59] to-[#FFAD28] bg-clip-text text-transparent">
                Notifications
              </h1>
              <Badge variant="secondary" className="bg-[#FF4F59]/10 text-[#FF4F59]">
                {notifications.filter(n => !n.read).length} Unread
              </Badge>
            </div>
            <p className="text-lg text-muted-foreground">
              Manage your notifications and stay updated with important alerts
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="border-[#FF4F59]/20 hover:border-[#FF4F59]/40">
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Mark All as Read
            </Button>
            <Button variant="outline" className="border-[#FF4F59]/20 hover:border-[#FF4F59]/40">
              <X className="h-4 w-4 mr-2" />
              Clear All
            </Button>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-[#FF4F59]" />
              </div>
              <Input
                placeholder="Search notifications..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-72 pl-10 pr-10 bg-white/50 border-[#FF4F59]/20 focus:border-[#FF4F59]/40 focus:ring-1 focus:ring-[#FF4F59]/20 transition-all duration-200"
              />
              {searchQuery && (
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 hover:bg-[#FF4F59]/10"
                    onClick={() => setSearchQuery("")}
                  >
                    <X className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </div>
              )}
            </div>
            <div className="flex items-center gap-2">
              {["All", "Unread", "Read"].map((category) => (
                <Button
                  key={category}
                  variant={filter === category.toLowerCase() ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter(category.toLowerCase())}
                  className={filter === category.toLowerCase() ? "bg-[#FF4F59] hover:bg-[#FF4F59]/90" : "border-[#FF4F59]/20 hover:border-[#FF4F59]/40"}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="border-[#FF4F59]/20 hover:border-[#FF4F59]/40">
              <Bell className="h-4 w-4 mr-2" />
              Notification Settings
            </Button>
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-2">
        {filteredNotifications.map((notification) => (
          <Card
            key={notification.id}
            className={cn(
              "group hover:scale-[1.01] transition-all duration-200",
              !notification.read && "border-l-2 border-[#FF4F59]"
            )}
          >
            <CardContent className="p-3">
              <div className="flex items-start justify-between gap-3">
                <div className={cn(
                  "h-8 w-8 rounded-full flex items-center justify-center shrink-0",
                  typeColors[notification.type as keyof typeof typeColors]
                )}>
                  <notification.icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-sm font-medium truncate">{notification.title}</h3>
                    <span className="text-xs text-muted-foreground/60 whitespace-nowrap">{notification.date}</span>
                  </div>
                  <p className="text-xs text-muted-foreground/80 truncate">
                    {notification.description}
                  </p>
                </div>
                {!notification.read && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 rounded-full bg-white/10 dark:bg-gray-800/10 hover:bg-white/20 dark:hover:bg-gray-800/20 shrink-0"
                  >
                    <X className="h-3.5 w-3.5" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
} 