"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Bell, User, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function Header() {
  return (
    <div className="relative">
      {/* Enhanced glassy gradient background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Base glass effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-white/10 to-transparent dark:from-gray-900/30 dark:via-gray-900/10" />
        
        {/* Animated diagonal patterns */}
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,#FF4F59/3_50%,transparent_52%)] bg-[length:200px_200px] animate-pattern opacity-50" />
        <div className="absolute inset-0 bg-[linear-gradient(-45deg,transparent_48%,#FFAD28/3_50%,transparent_52%)] bg-[length:200px_200px] animate-pattern opacity-50" style={{ animationDelay: '1s' }} />
        
        {/* Subtle noise texture */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc1IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWx0ZXI9InVybCgjYSkiIG9wYWNpdHk9IjAuNCIvPjwvc3ZnPg==')] opacity-5" />
      </div>

      <div className="flex items-center justify-between h-[57px] px-6 border-b border-white/10 dark:border-gray-700/10 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1px] after:bg-gradient-to-r after:from-transparent after:via-white/20 after:to-transparent dark:after:via-gray-400/20">
        {/* Search Bar */}
        <div className="flex-1 max-w-md">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-[#FF4F59]/10 via-[#FFAD28]/10 to-transparent rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground/80 transition-all duration-200 group-hover:text-[#FF4F59] group-hover:scale-110" />
            <Input
              placeholder="Search anything..."
              className="pl-7 pr-4 h-9 bg-white/20 dark:bg-gray-800/20 backdrop-blur-xl border-white/10 dark:border-gray-700/10 focus:border-[#FF4F59]/50 focus:ring-[#FF4F59]/20 transition-all duration-200 rounded-lg group-hover:bg-white/30 dark:group-hover:bg-gray-800/30"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-muted-foreground/60 hidden group-hover:block transition-all duration-200">
              ⌘K
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          <Link href="/notifications">
            <Button
              variant="ghost"
              size="icon"
              className="relative h-9 w-9 hover:bg-white/10 dark:hover:bg-gray-800/10 transition-colors"
            >
              <Bell className="h-4 w-4" />
              <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-[10px] bg-[#FF4F59] border-2 border-white dark:border-gray-900">
                3
              </Badge>
            </Button>
          </Link>
          
          <div className="h-6 w-px bg-white/10 dark:bg-gray-700/10" />
          
          <Button
            variant="ghost"
            className="h-9 px-3 hover:bg-white/10 dark:hover:bg-gray-800/10 transition-colors gap-2"
          >
            <div className="h-6 w-6 rounded-full bg-gradient-to-br from-[#FF4F59] to-[#FFAD28] flex items-center justify-center text-white text-xs font-medium">
              SM
            </div>
            <span className="text-sm font-medium">Subhrajit</span>
            <ChevronDown className="h-4 w-4 text-muted-foreground/80" />
          </Button>
        </div>
      </div>
    </div>
  )
} 