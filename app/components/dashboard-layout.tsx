"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Home,
  ClipboardCheck,
  FileText,
  Settings,
  ChevronLeft,
  ChevronRight,
  Bell,
  Search,
  Sun,
  Moon,
  User,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const navItems = [
  { 
    id: "home", 
    icon: Home, 
    label: "Dashboard", 
    href: "/",
  },
  { 
    id: "warranty", 
    icon: ClipboardCheck, 
    label: "Warranty Metrics", 
    href: "/warranty-metrics",
  },
  { 
    id: "invoice", 
    icon: FileText, 
    label: "Final Invoice Status", 
    href: "/final-invoice-status",
  },
  { 
    id: "settings", 
    icon: Settings, 
    label: "Settings", 
    href: "/settings",
  },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const pathname = usePathname()

  const themeColors = {
    dark: {
      background: '#181C23',
      sidebar: '#282A27',
      text: '#FFFFFF',
      accent: '#FF4F59',
      secondary: '#FFAD28',
      hover: '#444744',
      card: '#1E2229',
    },
    light: {
      background: '#FFFAF4',
      sidebar: '#FFF2DF',
      text: '#181C23',
      accent: '#FF4F59',
      secondary: '#FFAD28',
      hover: '#444744',
      card: '#FFFFFF',
    }
  }

  const currentTheme = isDarkMode ? themeColors.dark : themeColors.light

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: currentTheme.background }}>
      {/* Sidebar */}
      <aside 
        className={cn(
          "w-72 flex flex-col items-center py-8 space-y-8 border-r fixed h-screen transition-all duration-300 shadow-xl",
          !isSidebarExpanded && "w-20",
          isDarkMode ? "bg-[#282A27] border-[#444744]" : "bg-[#FFF2DF] border-[#E5E7EB]"
        )}
      >
        {/* Logo/Header */}
        <div className="flex flex-col items-center space-y-4 w-full px-6">
          {isSidebarExpanded && (
            <div className="flex items-center space-x-3 w-full">
              <div className="w-12 h-12 bg-gradient-to-br from-[#FF4F59] to-[#FFAD28] flex items-center justify-center rounded-xl shadow-lg">
                <div className="w-7 h-7 border-2 border-white rounded-lg"></div>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-[#FF4F59] to-[#FFAD28] bg-clip-text text-transparent">
                FinDash
              </h1>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full w-10 h-10 hover:bg-[#444744]/10 transition-colors duration-200"
            onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}
          >
            {isSidebarExpanded ? (
              <ChevronLeft className="h-5 w-5" style={{ color: currentTheme.text }} />
            ) : (
              <ChevronRight className="h-5 w-5" style={{ color: currentTheme.text }} />
            )}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col items-center space-y-2 w-full px-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.id}
                href={item.href}
                className={cn(
                  "flex items-center w-full py-3 px-4 rounded-xl transition-all duration-200 group",
                  isActive 
                    ? "bg-gradient-to-r from-[#FF4F59]/10 to-[#FFAD28]/10" 
                    : "hover:bg-[#444744]/10"
                )}
              >
                <div 
                  className={cn(
                    "p-2 rounded-lg transition-all duration-200",
                    isActive 
                      ? "bg-gradient-to-br from-[#FF4F59] to-[#FFAD28]" 
                      : "bg-[#444744]/20 group-hover:bg-[#444744]/30"
                  )}
                >
                  <item.icon 
                    className={cn(
                      "h-5 w-5",
                      isActive ? "text-white" : "text-gray-600"
                    )} 
                  />
                </div>
                {isSidebarExpanded && (
                  <span 
                    className={cn(
                      "ml-3 font-medium transition-all duration-200",
                      isActive ? "text-gray-900" : "text-gray-600"
                    )}
                  >
                    {item.label}
                  </span>
                )}
              </Link>
            )
          })}
        </nav>

        {/* Theme Toggle and User Profile */}
        <div className="mt-auto pt-20 w-full px-4">
          <div className="border-t my-6" style={{ borderColor: isDarkMode ? '#444744' : '#E5E7EB' }}></div>
          
          {/* Theme Toggle */}
          <div className="flex items-center justify-between mb-6">
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-xl hover:bg-[#444744]/10 transition-colors duration-200"
              onClick={() => setIsDarkMode(!isDarkMode)}
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5" style={{ color: currentTheme.text }} />
              ) : (
                <Moon className="h-5 w-5" style={{ color: currentTheme.text }} />
              )}
            </Button>

            {/* User Profile */}
            {isSidebarExpanded && (
              <div className="flex items-center space-x-3">
                <Avatar className="h-8 w-8 border-2" style={{ borderColor: currentTheme.accent }}>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback className="bg-gradient-to-br from-[#FF4F59] to-[#FFAD28] text-white">OB</AvatarFallback>
                </Avatar>
                <div>
                  <div className="text-sm font-medium" style={{ color: currentTheme.text }}>Oliver Bennett</div>
                  <div className="text-xs" style={{ color: isDarkMode ? '#A1A1AA' : '#6B7280' }}>Premium Member</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main 
        className={cn(
          "flex-1 transition-all duration-300",
          isSidebarExpanded ? "ml-72" : "ml-20"
        )}
      >
        {/* Top Navigation */}
        <div className="sticky top-0 z-10 w-full p-4 border-b" style={{ 
          backgroundColor: currentTheme.card,
          borderColor: isDarkMode ? '#444744' : '#E5E7EB'
        }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Input 
                  className="w-80 border-none rounded-xl pl-12 h-12 transition-all duration-300 focus:ring-2 focus:ring-[#FF4F59]/20" 
                  placeholder="Search..."
                  style={{ 
                    backgroundColor: isDarkMode ? '#282A27' : '#FFF2DF',
                    color: currentTheme.text
                  }}
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5" style={{ color: isDarkMode ? '#A1A1AA' : '#6B7280' }} />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" style={{ color: currentTheme.text }} />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center">3</Badge>
              </Button>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  )
} 