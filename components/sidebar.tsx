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
  Building2,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useTheme } from "next-themes"

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
    id: "notifications", 
    icon: Bell, 
    label: "Notifications", 
    href: "/notifications",
    badge: 5,
  },
  { 
    id: "settings", 
    icon: Settings, 
    label: "Settings", 
    href: "/settings",
  },
]

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(true)
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()

  const handleKeyDown = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === 'Enter' || e.key === ' ') {
      action()
    }
  }

  return (
    <aside 
      className={cn(
        "fixed left-0 top-0 h-screen flex flex-col transition-all duration-300 ease-in-out z-50 w-72",
        "bg-white/30 dark:bg-gray-900/30 backdrop-blur-lg border-r border-white/30"
      )}
      role="navigation"
      aria-label="Main navigation"
    >
      {/* Enhanced glassy gradient background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Base glass effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent dark:from-gray-900/30" />
        
        {/* Animated diagonal patterns */}
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,#FF4F59/8_50%,transparent_52%)] bg-[length:200px_200px] animate-pattern" />
        <div className="absolute inset-0 bg-[linear-gradient(-45deg,transparent_48%,#FFAD28/8_50%,transparent_52%)] bg-[length:200px_200px] animate-pattern" style={{ animationDelay: '1s' }} />
        
        {/* Subtle noise texture */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc1IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWx0ZXI9InVybCgjYSkiIG9wYWNpdHk9IjAuNCIvPjwvc3ZnPg==')] opacity-20" />
        
        {/* Enhanced glowing highlights */}
        <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-to-br from-[#FF4F59]/15 to-transparent blur-3xl" />
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-[#FFAD28]/15 to-transparent blur-3xl" />
        
        {/* Reflective edges */}
        <div className="absolute inset-0 border border-white/30 rounded-r-3xl" />
      </div>

      {/* Sidebar Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/30">
        <div className="flex items-center space-x-3">
          <div className="relative h-8 w-8">
            <div className="absolute inset-0 bg-gradient-to-r from-[#FF4F59] to-[#FFAD28] rounded-lg" />
            <div className="absolute inset-[1px] bg-white dark:bg-gray-900 rounded-lg flex items-center justify-center">
              <span className="text-xl font-bold bg-gradient-to-r from-[#FF4F59] to-[#FFAD28] bg-clip-text text-transparent">
                FD
              </span>
            </div>
          </div>
          <h2 className="text-xl font-bold bg-gradient-to-r from-[#FF4F59] to-[#FFAD28] bg-clip-text text-transparent">
            Dashboard
          </h2>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsExpanded(!isExpanded)}
          onKeyDown={(e) => handleKeyDown(e, () => setIsExpanded(!isExpanded))}
          className="hover:bg-[#FF4F59]/10"
          aria-label={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
        >
          {isExpanded ? <ChevronLeft /> : <ChevronRight />}
        </Button>
      </div>

      {/* Search Bar */}
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search..."
            className="pl-9 bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm border-white/30"
          />
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <TooltipProvider key={item.id}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href={item.href}>
                  <Button
                    variant={pathname === item.href ? "secondary" : "ghost"}
                    className={cn(
                      "w-full justify-start gap-3 transition-all duration-200 hover:bg-white/20 dark:hover:bg-gray-800/20",
                      isExpanded ? "px-4" : "px-2"
                    )}
                    role="menuitem"
                    aria-current={pathname === item.href ? "page" : undefined}
                  >
                    <item.icon className="h-5 w-5" aria-hidden="true" />
                    {isExpanded && <span>{item.label}</span>}
                    {item.badge && (
                      <Badge variant="secondary" className="ml-auto">
                        {item.badge}
                      </Badge>
                    )}
                  </Button>
                </Link>
              </TooltipTrigger>
              {!isExpanded && (
                <TooltipContent side="right">
                  <p>{item.label}</p>
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
        ))}
      </nav>

      {/* Sidebar Footer */}
      <div className="p-4 border-t border-white/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="User avatar" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            {isExpanded && (
              <div>
                <p className="text-sm font-medium">Oliver</p>
                <p className="text-xs text-muted-foreground">Admin</p>
              </div>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            onKeyDown={(e) => handleKeyDown(e, () => setTheme(theme === "dark" ? "light" : "dark"))}
            className="hover:bg-[#FF4F59]/10"
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === "dark" ? <Sun /> : <Moon />}
          </Button>
        </div>
      </div>
    </aside>
  )
} 