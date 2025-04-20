"use client"

import { useState, useEffect, Suspense, lazy } from "react"
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
import { Skeleton } from "@/components/ui/skeleton"

// Lazy load icons
const HomeIcon = lazy(() => import('lucide-react').then(mod => ({ default: mod.Home })))
const ClipboardCheckIcon = lazy(() => import('lucide-react').then(mod => ({ default: mod.ClipboardCheck })))
const FileTextIcon = lazy(() => import('lucide-react').then(mod => ({ default: mod.FileText })))
const SettingsIcon = lazy(() => import('lucide-react').then(mod => ({ default: mod.Settings })))
const ChevronLeftIcon = lazy(() => import('lucide-react').then(mod => ({ default: mod.ChevronLeft })))
const ChevronRightIcon = lazy(() => import('lucide-react').then(mod => ({ default: mod.ChevronRight })))
const BellIcon = lazy(() => import('lucide-react').then(mod => ({ default: mod.Bell })))
const SearchIcon = lazy(() => import('lucide-react').then(mod => ({ default: mod.Search })))
const SunIcon = lazy(() => import('lucide-react').then(mod => ({ default: mod.Sun })))
const MoonIcon = lazy(() => import('lucide-react').then(mod => ({ default: mod.Moon })))

// Lazy load navigation items
const NavItem = lazy(() => import('./nav-item'))

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
    showBadgeInCompact: true,
  },
]

// Loading component for icons
const IconLoader = () => (
  <Skeleton className="h-5 w-5 rounded" />
)

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
        "bg-white/20 dark:bg-gray-900/20 backdrop-blur-xl"
      )}
      role="navigation"
      aria-label="Main navigation"
    >
      {/* Enhanced glassy gradient background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Base glass effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent dark:from-gray-900/20" />
        
        {/* Animated diagonal patterns */}
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,#FF4F59/5_50%,transparent_52%)] bg-[length:200px_200px] animate-pattern" />
        <div className="absolute inset-0 bg-[linear-gradient(-45deg,transparent_48%,#FFAD28/5_50%,transparent_52%)] bg-[length:200px_200px] animate-pattern" style={{ animationDelay: '1s' }} />
        
        {/* Subtle noise texture */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc1IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWx0ZXI9InVybCgjYSkiIG9wYWNpdHk9IjAuNCIvPjwvc3ZnPg==')] opacity-10" />
        
        {/* Enhanced glowing highlights */}
        <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-to-br from-[#FF4F59]/10 to-transparent blur-3xl" />
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-[#FFAD28]/10 to-transparent blur-3xl" />
      </div>

      {/* Sidebar Header */}
      <div className="flex items-center justify-between p-3 border-b border-white/10 dark:border-gray-700/10">
        <div className="flex items-center gap-3">
          {isExpanded ? (
            <>
              <Link href="/" className="relative h-[50px] w-32">
                <Image
                  src="/genpact-logo.svg"
                  alt="Genpact Logo"
                  fill
                  className="object-contain dark:filter-none filter invert"
                  priority
                />
              </Link>
              <div className="flex items-center">
                <span className="text-base font-bold bg-gradient-to-r from-[#FF4F59] to-[#FFAD28] bg-clip-text text-transparent">WCA</span>
              </div>
            </>
          ) : (
            <Link href="/" className="flex items-center justify-center w-[50px] h-[50px]">
              <span className="text-lg font-bold bg-gradient-to-r from-[#FF4F59] to-[#FFAD28] bg-clip-text text-transparent">WCA</span>
            </Link>
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

      {/* Search Bar */}
      {isExpanded && (
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground/80" />
            <Input
              placeholder="Search..."
              className="pl-9 bg-white/20 dark:bg-gray-800/20 backdrop-blur-xl"
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
                  <Suspense fallback={<IconLoader />}>
                    <NavItem
                      item={item}
                      isExpanded={isExpanded}
                      pathname={pathname}
                    />
                  </Suspense>
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