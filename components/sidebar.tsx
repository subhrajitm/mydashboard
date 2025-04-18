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
  CreditCard,
  MessageSquare,
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
    id: "messages", 
    icon: MessageSquare, 
    label: "Messages", 
    href: "/messages",
    badge: 3,
  },
  { 
    id: "cards", 
    icon: CreditCard, 
    label: "Cards", 
    href: "/cards",
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
        "fixed left-0 top-0 h-screen flex flex-col transition-all duration-300 ease-in-out z-50",
        isExpanded ? "w-72" : "w-20",
        "bg-background border-r"
      )}
      role="navigation"
      aria-label="Main navigation"
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between p-4 border-b">
        {isExpanded ? (
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#FF4F59] to-[#FFAD28] flex items-center justify-center rounded-xl">
              <Building2 className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-xl font-bold bg-gradient-to-r from-[#FF4F59] to-[#FFAD28] bg-clip-text text-transparent">
              Dashboard
            </h2>
          </div>
        ) : (
          <div className="w-10 h-10 bg-gradient-to-br from-[#FF4F59] to-[#FFAD28] flex items-center justify-center rounded-xl">
            <Building2 className="h-5 w-5 text-white" />
          </div>
        )}
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
      {isExpanded && (
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search..."
              className="pl-9 bg-background"
            />
          </div>
        </div>
      )}

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
                      "w-full justify-start gap-3",
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
      <div className="p-4 border-t">
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