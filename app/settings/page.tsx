"use client"

import { Settings, Bell, User, Lock, CreditCard, HelpCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

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
  return (
    <div className="space-y-8 p-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[#FF4F59] to-[#FFAD28] bg-clip-text text-transparent">
            Settings
          </h1>
          <p className="text-lg text-muted-foreground">
            Manage your account settings and preferences
          </p>
        </div>
        <Button variant="outline" className="border-[#FF4F59]/20 hover:border-[#FF4F59]/40">
          <HelpCircle className="h-4 w-4 mr-2" />
          Help Center
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {settingsSections.map((section) => (
          <Card 
            key={section.title} 
            className="bg-gradient-to-br from-[#FF4F59]/5 to-[#FFAD28]/5 border border-[#FF4F59]/20 shadow-sm hover:border-[#FF4F59]/40 transition-all duration-300 hover:scale-[1.02] hover:shadow-md"
          >
            <CardHeader className="border-b border-[#FF4F59]/20">
              <CardTitle className="flex items-center">
                <section.icon className="h-5 w-5 mr-2" />
                {section.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                {section.items.map((item) => (
                  <div 
                    key={item.title} 
                    className="flex items-center justify-between p-4 rounded-lg bg-white/50 border border-[#FF4F59]/10 hover:border-[#FF4F59]/20 transition-all duration-300"
                  >
                    <div className="space-y-1">
                      <h3 className="font-medium">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                    <Button 
                      variant="ghost" 
                      className="text-[#FF4F59] hover:text-[#FF4F59] hover:bg-[#FF4F59]/10"
                    >
                      {item.action}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* System Preferences */}
      <Card className="bg-gradient-to-br from-[#FF4F59]/5 to-[#FFAD28]/5 border border-[#FF4F59]/20 shadow-sm hover:border-[#FF4F59]/40 transition-all duration-300 hover:scale-[1.02] hover:shadow-md">
        <CardHeader className="border-b border-[#FF4F59]/20">
          <CardTitle className="flex items-center">
            <Settings className="h-5 w-5 mr-2" />
            System Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 rounded-lg bg-white/50 border border-[#FF4F59]/10">
              <div className="space-y-1">
                <h3 className="font-medium">Dark Mode</h3>
                <p className="text-sm text-muted-foreground">Enable dark mode for better visibility</p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between p-4 rounded-lg bg-white/50 border border-[#FF4F59]/10">
              <div className="space-y-1">
                <h3 className="font-medium">Auto-save Changes</h3>
                <p className="text-sm text-muted-foreground">Automatically save your changes</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between p-4 rounded-lg bg-white/50 border border-[#FF4F59]/10">
              <div className="space-y-1">
                <h3 className="font-medium">Email Notifications</h3>
                <p className="text-sm text-muted-foreground">Receive email notifications</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 