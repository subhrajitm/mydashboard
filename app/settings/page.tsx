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

export default function SettingsPage() {
  const [activeCategory, setActiveCategory] = useState("General")
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="space-y-4 p-4">
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-[#FF4F59] to-[#FFAD28] bg-clip-text text-transparent">
                Settings
              </h1>
              <Badge variant="secondary" className="bg-[#FF4F59]/10 text-[#FF4F59]">
                Admin
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              Manage your account settings and preferences
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="border-[#FF4F59]/20 hover:border-[#FF4F59]/40">
              <HelpCircle className="h-4 w-4 mr-1" />
              Help
            </Button>
            <Button variant="outline" size="sm" className="border-[#FF4F59]/20 hover:border-[#FF4F59]/40">
              <Save className="h-4 w-4 mr-1" />
              Save
            </Button>
            <Button variant="outline" size="sm" className="border-[#FF4F59]/20 hover:border-[#FF4F59]/40">
              <History className="h-4 w-4 mr-1" />
              History
            </Button>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
                <Search className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-[#FF4F59]" />
              </div>
              <Input
                placeholder="Search settings..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 h-9 pl-8 pr-8 bg-white/50 border-[#FF4F59]/20 focus:border-[#FF4F59]/40 focus:ring-1 focus:ring-[#FF4F59]/20 transition-all duration-200"
              />
              {searchQuery && (
                <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 w-7 p-0 hover:bg-[#FF4F59]/10"
                    onClick={() => setSearchQuery("")}
                  >
                    <X className="h-3 w-3 text-muted-foreground" />
                  </Button>
                </div>
              )}
            </div>
            <div className="flex items-center gap-1">
              {["General", "Account", "Notifications", "Security", "Billing", "API"].map((category) => (
                <Button
                  key={category}
                  variant={activeCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveCategory(category)}
                  className={activeCategory === category ? "bg-[#FF4F59] hover:bg-[#FF4F59]/90" : "border-[#FF4F59]/20 hover:border-[#FF4F59]/40"}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="outline" size="sm" className="border-[#FF4F59]/20 hover:border-[#FF4F59]/40">
              <Database className="h-4 w-4 mr-1" />
              Backup
            </Button>
            <Button variant="outline" size="sm" className="border-[#FF4F59]/20 hover:border-[#FF4F59]/40">
              <RotateCcw className="h-4 w-4 mr-1" />
              Restore
            </Button>
          </div>
        </div>
      </div>

      <div className="grid gap-4">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <Card className="bg-white/30 dark:bg-gray-900/30 backdrop-blur-lg border border-white/30 shadow-lg shadow-black/5">
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-muted-foreground">Profile</p>
                  <p className="text-xl font-bold mt-0.5">85%</p>
                </div>
                <div className="p-2 rounded-full bg-[#FF4F59]/10">
                  <User className="h-4 w-4 text-[#FF4F59]" />
                </div>
              </div>
              <Progress value={85} className="mt-2 h-1" />
            </CardContent>
          </Card>
          <Card className="bg-white/30 dark:bg-gray-900/30 backdrop-blur-lg border border-white/30 shadow-lg shadow-black/5">
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-muted-foreground">Security</p>
                  <p className="text-xl font-bold mt-0.5">92%</p>
                </div>
                <div className="p-2 rounded-full bg-[#FF4F59]/10">
                  <Shield className="h-4 w-4 text-[#FF4F59]" />
                </div>
              </div>
              <Progress value={92} className="mt-2 h-1" />
            </CardContent>
          </Card>
          <Card className="bg-white/30 dark:bg-gray-900/30 backdrop-blur-lg border border-white/30 shadow-lg shadow-black/5">
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-muted-foreground">Notifications</p>
                  <p className="text-xl font-bold mt-0.5">3 Active</p>
                </div>
                <div className="p-2 rounded-full bg-[#FF4F59]/10">
                  <BellRing className="h-4 w-4 text-[#FF4F59]" />
                </div>
              </div>
              <Progress value={60} className="mt-2 h-1" />
            </CardContent>
          </Card>
          <Card className="bg-white/30 dark:bg-gray-900/30 backdrop-blur-lg border border-white/30 shadow-lg shadow-black/5">
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-muted-foreground">System</p>
                  <p className="text-xl font-bold mt-0.5">All Good</p>
                </div>
                <div className="p-2 rounded-full bg-[#FF4F59]/10">
                  <Zap className="h-4 w-4 text-[#FF4F59]" />
                </div>
              </div>
              <Progress value={100} className="mt-2 h-1" />
            </CardContent>
          </Card>
        </div>

        {/* Main Settings Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Account Settings */}
          <div className="lg:col-span-2 space-y-4">
            <Card className="bg-white/30 dark:bg-gray-900/30 backdrop-blur-lg border border-white/30 shadow-lg shadow-black/5">
              <CardHeader className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="p-1.5 rounded-lg bg-[#FF4F59]/10">
                      <User className="h-4 w-4 text-[#FF4F59]" />
                    </div>
                    <div>
                      <CardTitle className="text-base">Account Settings</CardTitle>
                      <CardDescription className="text-xs">Manage your account preferences</CardDescription>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="border-[#FF4F59]/20 hover:border-[#FF4F59]/40">
                    Edit
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 rounded-lg bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm border border-white/20">
                    <div className="flex items-center space-x-2">
                      <div className="p-1.5 rounded-full bg-[#FF4F59]/10">
                        <Mail className="h-3.5 w-3.5 text-[#FF4F59]" />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium">Email Address</h3>
                        <p className="text-xs text-muted-foreground">john.doe@example.com</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="text-muted-foreground h-7 w-7 p-0">
                      <ChevronRight className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm border border-white/20">
                    <div className="flex items-center space-x-2">
                      <div className="p-1.5 rounded-full bg-[#FF4F59]/10">
                        <Smartphone className="h-3.5 w-3.5 text-[#FF4F59]" />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium">Phone Number</h3>
                        <p className="text-xs text-muted-foreground">+1 (555) 123-4567</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="text-muted-foreground h-7 w-7 p-0">
                      <ChevronRight className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm border border-white/20">
                    <div className="flex items-center space-x-2">
                      <div className="p-1.5 rounded-full bg-[#FF4F59]/10">
                        <Globe className="h-3.5 w-3.5 text-[#FF4F59]" />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium">Language & Region</h3>
                        <p className="text-xs text-muted-foreground">English (US)</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="text-muted-foreground h-7 w-7 p-0">
                      <ChevronRight className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/30 dark:bg-gray-900/30 backdrop-blur-lg border border-white/30 shadow-lg shadow-black/5">
              <CardHeader className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="p-1.5 rounded-lg bg-[#FF4F59]/10">
                      <Bell className="h-4 w-4 text-[#FF4F59]" />
                    </div>
                    <div>
                      <CardTitle className="text-base">Notification Preferences</CardTitle>
                      <CardDescription className="text-xs">Manage your notification settings</CardDescription>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 rounded-lg bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm border border-white/20">
                    <div>
                      <h3 className="text-sm font-medium">Email Notifications</h3>
                      <p className="text-xs text-muted-foreground">Receive updates via email</p>
                    </div>
                    <Switch className="h-4 w-7" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm border border-white/20">
                    <div>
                      <h3 className="text-sm font-medium">Push Notifications</h3>
                      <p className="text-xs text-muted-foreground">Get instant alerts on your devices</p>
                    </div>
                    <Switch className="h-4 w-7" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm border border-white/20">
                    <div>
                      <h3 className="text-sm font-medium">SMS Alerts</h3>
                      <p className="text-xs text-muted-foreground">Receive important updates via SMS</p>
                    </div>
                    <Switch className="h-4 w-7" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* System Settings */}
          <div className="space-y-4">
            <Card className="bg-white/30 dark:bg-gray-900/30 backdrop-blur-lg border border-white/30 shadow-lg shadow-black/5">
              <CardHeader className="p-4">
                <div className="flex items-center space-x-2">
                  <div className="p-1.5 rounded-lg bg-[#FF4F59]/10">
                    <Settings className="h-4 w-4 text-[#FF4F59]" />
                  </div>
                  <div>
                    <CardTitle className="text-base">System Preferences</CardTitle>
                    <CardDescription className="text-xs">Customize your experience</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 rounded-lg bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm border border-white/20">
                    <div>
                      <h3 className="text-sm font-medium">Dark Mode</h3>
                      <p className="text-xs text-muted-foreground">Enable dark mode for better visibility</p>
                    </div>
                    <Switch className="h-4 w-7" />
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm border border-white/20">
                    <div>
                      <h3 className="text-sm font-medium">Auto-save Changes</h3>
                      <p className="text-xs text-muted-foreground">Automatically save your changes</p>
                    </div>
                    <Switch className="h-4 w-7" defaultChecked />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/30 dark:bg-gray-900/30 backdrop-blur-lg border border-white/30 shadow-lg shadow-black/5">
              <CardHeader className="p-4">
                <div className="flex items-center space-x-2">
                  <div className="p-1.5 rounded-lg bg-[#FF4F59]/10">
                    <Lock className="h-4 w-4 text-[#FF4F59]" />
                  </div>
                  <div>
                    <CardTitle className="text-base">Security</CardTitle>
                    <CardDescription className="text-xs">Manage your security settings</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 rounded-lg bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm border border-white/20">
                    <div>
                      <h3 className="text-sm font-medium">Two-Factor Authentication</h3>
                      <p className="text-xs text-muted-foreground">Add an extra layer of security</p>
                    </div>
                    <Switch className="h-4 w-7" />
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm border border-white/20">
                    <div>
                      <h3 className="text-sm font-medium">Password</h3>
                      <p className="text-xs text-muted-foreground">Last changed 30 days ago</p>
                    </div>
                    <Button variant="outline" size="sm" className="border-[#FF4F59]/20 hover:border-[#FF4F59]/40">
                      Change
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
} 