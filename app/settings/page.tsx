"use client"

import { Settings, Bell, User, Lock, CreditCard, HelpCircle, Save, Search, History, Database, RotateCcw, X, ChevronRight, Shield, Mail, Smartphone, Globe, Palette, BellRing, Zap } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

const settingsSections = [
  {
    title: "Account Settings",
    icon: User,
    items: [
      {
        title: "Profile Information",
        description: "Update your personal information and contact details",
        action: "Edit",
      },
      {
        title: "Password",
        description: "Change your account password",
        action: "Change",
      },
      {
        title: "Two-Factor Authentication",
        description: "Add an extra layer of security to your account",
        action: "Enable",
      },
    ],
  },
  {
    title: "Notification Preferences",
    icon: Bell,
    items: [
      {
        title: "Email Notifications",
        description: "Receive updates via email",
        action: "Configure",
      },
      {
        title: "Push Notifications",
        description: "Get instant alerts on your devices",
        action: "Manage",
      },
      {
        title: "SMS Alerts",
        description: "Receive important updates via SMS",
        action: "Set Up",
      },
    ],
  },
  {
    title: "Billing & Subscription",
    icon: CreditCard,
    items: [
      {
        title: "Payment Methods",
        description: "Manage your payment information",
        action: "Update",
      },
      {
        title: "Billing History",
        description: "View your past invoices and payments",
        action: "View",
      },
      {
        title: "Subscription Plan",
        description: "Change your current subscription",
        action: "Change",
      },
    ],
  },
  {
    title: "Privacy & Security",
    icon: Lock,
    items: [
      {
        title: "Data Privacy",
        description: "Manage your data sharing preferences",
        action: "Configure",
      },
      {
        title: "Security Settings",
        description: "Control your account security options",
        action: "Manage",
      },
      {
        title: "Activity Log",
        description: "View your account activity history",
        action: "View",
      },
    ],
  },
]

// Custom Switch Component
const CustomSwitch = ({ checked, onCheckedChange }: { checked: boolean; onCheckedChange: (checked: boolean) => void }) => {
  return (
    <button
      onClick={() => onCheckedChange(!checked)}
      className={`
        relative inline-flex h-5 w-9 items-center rounded-full transition-colors duration-200
        ${checked ? 'bg-[#FF4F59]/20' : 'bg-white/20 dark:bg-gray-800/20'}
        focus:outline-none focus:ring-2 focus:ring-[#FF4F59]/20
      `}
    >
      <span
        className={`
          inline-block h-4 w-4 transform rounded-full bg-white shadow-lg transition-transform duration-200
          ${checked ? 'translate-x-4' : 'translate-x-0.5'}
          ${checked ? 'bg-[#FF4F59]' : 'bg-white/80 dark:bg-gray-700/80'}
        `}
      />
    </button>
  )
}

export default function SettingsPage() {
  const [activeCategory, setActiveCategory] = useState("Account Settings")
  const [searchQuery, setSearchQuery] = useState("")
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(true)
  const [smsAlerts, setSmsAlerts] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [autoSave, setAutoSave] = useState(true)
  const [twoFactorAuth, setTwoFactorAuth] = useState(false)

  return (
    <div className="max-w-7xl mx-auto space-y-4">
      {/* Header Section */}
      <div className="relative rounded-xl overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 -z-10">
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#FF4F59]/5 via-[#FFAD28]/5 to-transparent" />
          
          {/* Animated diagonal patterns */}
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,#FF4F59/5_50%,transparent_52%)] bg-[length:200px_200px] animate-pattern" />
          <div className="absolute inset-0 bg-[linear-gradient(-45deg,transparent_48%,#FFAD28/5_50%,transparent_52%)] bg-[length:200px_200px] animate-pattern" style={{ animationDelay: '1s' }} />
          
          {/* Subtle noise texture */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc1IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWx0ZXI9InVybCgjYSkiIG9wYWNpdHk9IjAuNCIvPjwvc3ZnPg==')] opacity-10" />
        </div>

        <div className="flex flex-col space-y-2 p-4 bg-white/20 dark:bg-gray-800/20 backdrop-blur-xl border border-white/20 dark:border-gray-700/20">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-[#FF4F59] to-[#FFAD28] bg-clip-text text-transparent">
                  Settings
                </h1>
                <Badge variant="secondary" className="bg-[#FF4F59]/10 text-[#FF4F59] text-xs">
                  Admin
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                Manage your account settings and preferences
              </p>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="outline" size="sm" className="h-7 bg-white/10 dark:bg-gray-800/10 border-white/10 dark:border-gray-700/10 rounded-xl">
                <HelpCircle className="h-3.5 w-3.5 mr-1" />
                Help
              </Button>
              <Button variant="outline" size="sm" className="h-7 bg-white/10 dark:bg-gray-800/10 border-white/10 dark:border-gray-700/10 rounded-xl">
                <Save className="h-3.5 w-3.5 mr-1" />
                Save
              </Button>
              <Button variant="outline" size="sm" className="h-7 bg-white/10 dark:bg-gray-800/10 border-white/10 dark:border-gray-700/10 rounded-xl">
                <History className="h-3.5 w-3.5 mr-1" />
                History
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-12 gap-4">
        {/* Sidebar Navigation */}
        <div className="col-span-3">
          <div className="sticky top-4 space-y-0.5">
            {settingsSections.map((section) => (
              <button
                key={section.title}
                onClick={() => setActiveCategory(section.title)}
                className={`
                  w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 text-sm
                  ${activeCategory === section.title 
                    ? 'bg-[#FF4F59]/10 text-[#FF4F59]' 
                    : 'hover:bg-white/10 dark:hover:bg-gray-800/10 text-muted-foreground'
                  }
                `}
              >
                <section.icon className="h-4 w-4" />
                <span className="font-medium">{section.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Settings Content */}
        <div className="col-span-9 space-y-4">
          {/* Search Bar */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
              <Search className="h-3.5 w-3.5 text-muted-foreground transition-colors group-hover:text-[#FF4F59]" />
            </div>
            <Input
              placeholder="Search settings..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-8 pl-7 pr-7 bg-white/20 dark:bg-gray-800/20 border-white/10 dark:border-gray-700/10 focus:border-[#FF4F59]/20 focus:ring-1 focus:ring-[#FF4F59]/20 transition-all duration-200 text-sm"
            />
            {searchQuery && (
              <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 hover:bg-[#FF4F59]/10"
                  onClick={() => setSearchQuery("")}
                >
                  <X className="h-3.5 w-3.5" />
                </Button>
              </div>
            )}
          </div>

          {/* Active Section Content */}
          {settingsSections.map((section) => (
            <div
              key={section.title}
              className={cn(
                "settings-section",
                activeCategory === section.title && "active"
              )}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <section.icon className="h-4 w-4 settings-icon" />
                  <h2 className="text-lg font-semibold">{section.title}</h2>
                </div>
                <Button variant="outline" size="sm" className="h-7 settings-save-button">
                  <Save className="h-3.5 w-3.5 mr-1" />
                  Save Changes
                </Button>
              </div>

              <div className="grid gap-3">
                {section.items.map((item) => (
                  <Card
                    key={item.title}
                    className="bg-white/20 dark:bg-gray-800/20 backdrop-blur-xl border border-white/20 dark:border-gray-700/20 hover:bg-white/30 dark:hover:bg-gray-800/30 transition-all duration-200"
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-sm">{item.title}</CardTitle>
                          <CardDescription className="text-xs">{item.description}</CardDescription>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-7 bg-white/10 dark:bg-gray-800/10 border-white/10 dark:border-gray-700/10"
                        >
                          {item.action}
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      {item.title === "Email Notifications" && (
                        <div className="flex items-center justify-between">
                          <span className="text-xs">Enable email notifications</span>
                          <CustomSwitch
                            checked={emailNotifications}
                            onCheckedChange={setEmailNotifications}
                          />
                        </div>
                      )}
                      {item.title === "Push Notifications" && (
                        <div className="flex items-center justify-between">
                          <span className="text-xs">Enable push notifications</span>
                          <CustomSwitch
                            checked={pushNotifications}
                            onCheckedChange={setPushNotifications}
                          />
                        </div>
                      )}
                      {item.title === "SMS Alerts" && (
                        <div className="flex items-center justify-between">
                          <span className="text-xs">Enable SMS alerts</span>
                          <CustomSwitch
                            checked={smsAlerts}
                            onCheckedChange={setSmsAlerts}
                          />
                        </div>
                      )}
                      {item.title === "Two-Factor Authentication" && (
                        <div className="flex items-center justify-between">
                          <span className="text-xs">Enable two-factor authentication</span>
                          <CustomSwitch
                            checked={twoFactorAuth}
                            onCheckedChange={setTwoFactorAuth}
                          />
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Footer */}
      <footer className="py-6 text-center text-xs text-muted-foreground/60">
        <p>Copyright © 2025 Genpact India. All rights reserved.</p>
      </footer>
    </div>
  )
} 