"use client"

import { useState, useEffect } from "react"
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
import Image from "next/image"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const navItems = [
  { 
    id: "home", 
    icon: Home, 
    label: "Dashboard", 
    href: "/",
  },
]

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(true)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleKeyDown = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === 'Enter' || e.key === ' ') {
      action()
    }
  }

  return (
    <aside 
      className={cn(
        "h-screen flex flex-col transition-all duration-300 ease-in-out",
        isExpanded ? "w-72" : "w-20",
        "bg-white/20 dark:bg-gray-900/20 backdrop-blur-xl",
        "border-r border-white/10 dark:border-gray-700/5",
        "shadow-[2px_0_8px_-2px_rgba(0,0,0,0.05)] dark:shadow-[2px_0_8px_-2px_rgba(0,0,0,0.2)]",
        "after:absolute after:right-0 after:top-0 after:h-full after:w-[1px] after:bg-gradient-to-b after:from-transparent after:via-white/40 after:to-transparent dark:after:via-gray-400/20",
        "before:absolute before:right-0 before:top-0 before:h-full before:w-[1px] before:bg-gradient-to-b before:from-transparent before:via-[#FF4F59]/15 before:to-transparent",
        "[&:before]:transition-all [&:before]:duration-500 [&:before]:hover:opacity-100 [&:before]:hover:via-[#FF4F59]/30",
        "[&:after]:transition-all [&:after]:duration-500 [&:after]:hover:opacity-100 [&:after]:hover:via-white/60 dark:[&:after]:hover:via-gray-400/40",
        "hover:shadow-[4px_0_12px_-3px_rgba(0,0,0,0.07)] dark:hover:shadow-[4px_0_12px_-3px_rgba(0,0,0,0.25)] transition-shadow duration-300",
        "group"
      )}
      role="navigation"
      aria-label="Main navigation"
    >
      {/* Enhanced glassy gradient background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Base glass effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-white/10 to-transparent dark:from-gray-900/30 dark:via-gray-900/10" />
        
        {/* Animated diagonal patterns */}
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,#FF4F59/3_50%,transparent_52%)] bg-[length:200px_200px] animate-pattern opacity-50" />
        <div className="absolute inset-0 bg-[linear-gradient(-45deg,transparent_48%,#FFAD28/3_50%,transparent_52%)] bg-[length:200px_200px] animate-pattern opacity-50" style={{ animationDelay: '1s' }} />
        
        {/* Subtle noise texture */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc1IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWx0ZXI9InVybCgjYSkiIG9wYWNpdHk9IjAuNCIvPjwvc3ZnPg==')] opacity-5" />
        
        {/* Enhanced glowing highlights */}
        <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-to-br from-[#FF4F59]/5 to-transparent blur-3xl group-hover:from-[#FF4F59]/10 transition-all duration-500" />
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-[#FFAD28]/5 to-transparent blur-3xl group-hover:from-[#FFAD28]/10 transition-all duration-500" />
      </div>

      {/* Sidebar Header */}
      <div className="flex items-center justify-between h-[57px] p-3 border-b border-white/10 dark:border-gray-700/10 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1px] after:bg-gradient-to-r after:from-transparent after:via-white/20 after:to-transparent dark:after:via-gray-400/20">
        <div className="flex items-center gap-3">
          {isExpanded ? (
            <div className="flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-[#FF4F59] to-[#FFAD28] bg-clip-text text-transparent">Warrity</span>
            </div>
          ) : (
            <div className="flex items-center">
              <span className="text-xl font-bold bg-gradient-to-r from-[#FF4F59] to-[#FFAD28] bg-clip-text text-transparent">W</span>
            </div>
          )}
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsExpanded(!isExpanded)}
          onKeyDown={(e) => handleKeyDown(e, () => setIsExpanded(!isExpanded))}
          className="h-7 w-7 hover:bg-[#FF4F59]/10"
          aria-label={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
        >
          {isExpanded ? <ChevronLeft className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />}
        </Button>
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
                      "w-full justify-start gap-3 transition-all duration-200 hover:bg-white/10 dark:hover:bg-gray-800/10",
                      isExpanded ? "px-4" : "px-2"
                    )}
                    role="menuitem"
                    aria-current={pathname === item.href ? "page" : undefined}
                  >
                    <div className="relative">
                      <item.icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    {isExpanded && <span>{item.label}</span>}
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
      <div className="p-4 border-t border-white/10 dark:border-gray-700/10">
        <div className="flex items-center justify-between">
          <Link href="/settings" className="flex items-center gap-2 group">
            <div className="p-2 rounded-lg bg-white/10 dark:bg-gray-800/10 group-hover:bg-[#FF4F59]/10 transition-colors">
              <Settings className="h-5 w-5 group-hover:text-[#FF4F59] transition-colors" />
            </div>
            {isExpanded && (
              <div>
                <p className="text-sm font-medium group-hover:text-[#FF4F59] transition-colors">Settings</p>
                <p className="text-xs text-muted-foreground/80 group-hover:text-[#FF4F59]/80 transition-colors">Manage preferences</p>
              </div>
            )}
          </Link>
          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              onKeyDown={(e) => handleKeyDown(e, () => setTheme(theme === "dark" ? "light" : "dark"))}
              className="hover:bg-[#FF4F59]/10"
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          )}
        </div>
      </div>
    </aside>
  )
} 