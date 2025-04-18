"use client"

import { Bell, CheckCircle2, AlertCircle, Clock, Filter, Search, Trash2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const notifications = [
  {
    id: 1,
    title: "New Warranty Claim",
    description: "Shop1 has submitted a new warranty claim for review",
    time: "2 minutes ago",
    status: "unread",
    type: "warranty",
  },
  {
    id: 2,
    title: "Invoice Approved",
    description: "Final invoice for Engine #12345 has been approved",
    time: "1 hour ago",
    status: "read",
    type: "invoice",
  },
  {
    id: 3,
    title: "System Update",
    description: "New features have been added to the dashboard",
    time: "3 hours ago",
    status: "read",
    type: "system",
  },
  {
    id: 4,
    title: "Payment Received",
    description: "Payment for Invoice #67890 has been received",
    time: "5 hours ago",
    status: "read",
    type: "payment",
  },
  {
    id: 5,
    title: "Maintenance Alert",
    description: "Scheduled maintenance for Shop2's equipment",
    time: "1 day ago",
    status: "read",
    type: "maintenance",
  },
]

const NotificationIcon = ({ type }: { type: string }) => {
  switch (type) {
    case "warranty":
      return <AlertCircle className="h-5 w-5 text-[#FF4F59]" />
    case "invoice":
      return <CheckCircle2 className="h-5 w-5 text-[#FFAD28]" />
    case "system":
      return <Bell className="h-5 w-5 text-[#444744]" />
    case "payment":
      return <CheckCircle2 className="h-5 w-5 text-green-500" />
    case "maintenance":
      return <Clock className="h-5 w-5 text-blue-500" />
    default:
      return <Bell className="h-5 w-5 text-[#444744]" />
  }
}

export default function NotificationsPage() {
  return (
    <div className="space-y-8 p-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[#FF4F59] to-[#FFAD28] bg-clip-text text-transparent">
            Notifications
          </h1>
          <p className="text-lg text-muted-foreground">
            Stay updated with the latest activities and alerts
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="border-[#FF4F59]/20 hover:border-[#FF4F59]/40">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" className="border-[#FF4F59]/20 hover:border-[#FF4F59]/40">
            <Trash2 className="h-4 w-4 mr-2" />
            Clear All
          </Button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search notifications..."
          className="pl-10 bg-white/50 border-[#FF4F59]/20 focus:border-[#FF4F59]/40"
        />
      </div>

      {/* Tabs */}
      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="bg-white/50 border border-[#FF4F59]/20">
          <TabsTrigger value="all" className="data-[state=active]:bg-[#FF4F59] data-[state=active]:text-white">
            All
          </TabsTrigger>
          <TabsTrigger value="unread" className="data-[state=active]:bg-[#FF4F59] data-[state=active]:text-white">
            Unread
          </TabsTrigger>
          <TabsTrigger value="warranty" className="data-[state=active]:bg-[#FF4F59] data-[state=active]:text-white">
            Warranty
          </TabsTrigger>
          <TabsTrigger value="invoice" className="data-[state=active]:bg-[#FF4F59] data-[state=active]:text-white">
            Invoice
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          {notifications.map((notification) => (
            <Card 
              key={notification.id} 
              className={`bg-gradient-to-br from-[#FF4F59]/5 to-[#FFAD28]/5 border border-[#FF4F59]/20 shadow-sm hover:border-[#FF4F59]/40 transition-all duration-300 hover:scale-[1.02] hover:shadow-md ${
                notification.status === "unread" ? "bg-[#FF4F59]/5" : ""
              }`}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-white/50 border border-[#FF4F59]/10">
                    <NotificationIcon type={notification.type} />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">{notification.title}</h3>
                      <span className="text-sm text-muted-foreground">{notification.time}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{notification.description}</p>
                  </div>
                  {notification.status === "unread" && (
                    <Badge variant="secondary" className="bg-[#FF4F59]/10 text-[#FF4F59]">
                      New
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="unread" className="space-y-6">
          {notifications
            .filter(notification => notification.status === "unread")
            .map((notification) => (
              <Card 
                key={notification.id} 
                className="bg-gradient-to-br from-[#FF4F59]/5 to-[#FFAD28]/5 border border-[#FF4F59]/20 shadow-sm hover:border-[#FF4F59]/40 transition-all duration-300 hover:scale-[1.02] hover:shadow-md"
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-white/50 border border-[#FF4F59]/10">
                      <NotificationIcon type={notification.type} />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{notification.title}</h3>
                        <span className="text-sm text-muted-foreground">{notification.time}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{notification.description}</p>
                    </div>
                    <Badge variant="secondary" className="bg-[#FF4F59]/10 text-[#FF4F59]">
                      New
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
        </TabsContent>

        <TabsContent value="warranty" className="space-y-6">
          {notifications
            .filter(notification => notification.type === "warranty")
            .map((notification) => (
              <Card 
                key={notification.id} 
                className="bg-gradient-to-br from-[#FF4F59]/5 to-[#FFAD28]/5 border border-[#FF4F59]/20 shadow-sm hover:border-[#FF4F59]/40 transition-all duration-300 hover:scale-[1.02] hover:shadow-md"
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-white/50 border border-[#FF4F59]/10">
                      <NotificationIcon type={notification.type} />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{notification.title}</h3>
                        <span className="text-sm text-muted-foreground">{notification.time}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{notification.description}</p>
                    </div>
                    {notification.status === "unread" && (
                      <Badge variant="secondary" className="bg-[#FF4F59]/10 text-[#FF4F59]">
                        New
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
        </TabsContent>

        <TabsContent value="invoice" className="space-y-6">
          {notifications
            .filter(notification => notification.type === "invoice")
            .map((notification) => (
              <Card 
                key={notification.id} 
                className="bg-gradient-to-br from-[#FF4F59]/5 to-[#FFAD28]/5 border border-[#FF4F59]/20 shadow-sm hover:border-[#FF4F59]/40 transition-all duration-300 hover:scale-[1.02] hover:shadow-md"
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-white/50 border border-[#FF4F59]/10">
                      <NotificationIcon type={notification.type} />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{notification.title}</h3>
                        <span className="text-sm text-muted-foreground">{notification.time}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{notification.description}</p>
                    </div>
                    {notification.status === "unread" && (
                      <Badge variant="secondary" className="bg-[#FF4F59]/10 text-[#FF4F59]">
                        New
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
        </TabsContent>
      </Tabs>
    </div>
  )
} 