"use client"

import {
  Bell,
  CreditCard,
  GraduationCap,
  Home,
  LogOut,
  MessageSquare,
  MoreHorizontal,
  Plus,
  Settings,
  ShoppingBag,
  User,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"

export default function Dashboard() {
  const [activeTimeframe, setActiveTimeframe] = useState("1w")
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false)

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`${isSidebarExpanded ? 'w-64' : 'w-16'} bg-white flex flex-col items-center py-6 space-y-6 border-r fixed h-screen transition-all duration-300`}>
        <div className="mb-6 flex items-center justify-between w-full px-4">
          {isSidebarExpanded && <div className="w-10 h-10 bg-black flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-white"></div>
          </div>}
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-lg ml-auto"
            onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}
          >
            {isSidebarExpanded ? <ChevronLeft className="h-6 w-6 text-gray-600" /> : <ChevronRight className="h-6 w-6 text-gray-600" />}
          </Button>
        </div>

        <nav className="flex flex-col items-center space-y-8 w-full px-4">
          <Button variant="ghost" size="icon" className={`rounded-lg ${isSidebarExpanded ? 'w-full justify-start' : ''}`}>
            <Home className="h-6 w-6 text-gray-600" />
            {isSidebarExpanded && <span className="ml-3">Home</span>}
          </Button>
          <Button variant="ghost" size="icon" className={`rounded-lg ${isSidebarExpanded ? 'w-full justify-start' : ''}`}>
            <MessageSquare className="h-6 w-6 text-gray-600" />
            {isSidebarExpanded && <span className="ml-3">Messages</span>}
          </Button>
          <Button variant="ghost" size="icon" className={`rounded-lg ${isSidebarExpanded ? 'w-full justify-start' : ''}`}>
            <User className="h-6 w-6 text-gray-600" />
            {isSidebarExpanded && <span className="ml-3">Profile</span>}
          </Button>
          <Button variant="ghost" size="icon" className={`rounded-lg ${isSidebarExpanded ? 'w-full justify-start' : ''}`}>
            <CreditCard className="h-6 w-6 text-gray-600" />
            {isSidebarExpanded && <span className="ml-3">Cards</span>}
          </Button>
          <Button variant="ghost" size="icon" className={`rounded-lg ${isSidebarExpanded ? 'w-full justify-start' : ''}`}>
            <Settings className="h-6 w-6 text-gray-600" />
            {isSidebarExpanded && <span className="ml-3">Settings</span>}
          </Button>
          <div className="mt-auto pt-20">
            <Button variant="ghost" size="icon" className={`rounded-lg ${isSidebarExpanded ? 'w-full justify-start' : ''}`}>
              <LogOut className="h-6 w-6 text-gray-600" />
              {isSidebarExpanded && <span className="ml-3">Logout</span>}
            </Button>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className={`flex-1 p-6 ${isSidebarExpanded ? 'ml-64' : 'ml-16'} overflow-y-auto transition-all duration-300`}>
        <div className="w-full bg-white rounded-3xl p-6 shadow-sm">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Input className="w-80 bg-gray-100 border-none rounded-full pl-10" placeholder="Search" />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Bell className="h-5 w-5" />
              </Button>
              <Avatar className="h-10 w-10">
                <AvatarImage src="/placeholder.svg" alt="User" />
                <AvatarFallback>OB</AvatarFallback>
              </Avatar>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-6">
            {/* Credit Card */}
            <div className="col-span-4">
              <Card className="bg-black text-white rounded-3xl overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <div className="uppercase text-xs text-gray-400 font-medium">Current Balance</div>
                    <div className="flex space-x-1">
                      <div className="w-8 h-8 bg-gray-300 rounded-full opacity-70"></div>
                      <div className="w-8 h-8 bg-gray-100 rounded-full"></div>
                    </div>
                  </div>
                  <div className="text-3xl font-bold mb-8">$48,300.00</div>
                  <div className="flex justify-between items-center">
                    <div className="text-sm tracking-widest">•••• •••• •••• •••• 2112</div>
                    <div className="text-right">
                      <div className="uppercase text-xs text-gray-400 font-medium">EXP DATE</div>
                      <div>03/29</div>
                    </div>
                  </div>
                  <div className="mt-6">
                    <div className="uppercase text-xs text-gray-400 font-medium">CARD HOLDER</div>
                    <div>Oliver Bennett</div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Expenses */}
            <div className="col-span-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Your expenses</h2>
                <div className="flex items-center">
                  <span className="text-sm text-gray-600">This month</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 ml-1 text-gray-600"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-4">
                <Card className="rounded-3xl overflow-hidden bg-[#f2f9c8]">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center mb-8">
                      <div className="font-medium">Food & drink</div>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="mt-auto">
                      <div className="w-full h-1 bg-black/10 mb-1">
                        <div className="h-full bg-black w-[18%]"></div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="text-sm">18%</div>
                        <div className="font-medium">$800</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="rounded-3xl overflow-hidden bg-[#ffecc8]">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center mb-8">
                      <div className="font-medium">Travel</div>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="mt-auto">
                      <div className="w-full h-1 bg-black/10 mb-1">
                        <div className="h-full bg-black w-[50%]"></div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="text-sm">50%</div>
                        <div className="font-medium">$1500</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="rounded-3xl overflow-hidden bg-[#e8e4ff]">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center mb-8">
                      <div className="font-medium">Workspace</div>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="mt-auto">
                      <div className="w-full h-1 bg-black/10 mb-1">
                        <div className="h-full bg-black w-[10%]"></div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="text-sm">10%</div>
                        <div className="font-medium">$600</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <div className="border-2 border-dashed border-gray-300 rounded-3xl flex flex-col items-center justify-center">
                  <div className="flex flex-col items-center justify-center text-gray-400">
                    <Plus className="h-6 w-6 mb-1" />
                    <span className="text-sm">Add</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Transactions */}
            <div className="col-span-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Last transactions</h2>
                <div className="flex items-center text-gray-500 text-sm">
                  <span>See all</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 ml-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mr-4">
                      <GraduationCap className="h-6 w-6 text-gray-600" />
                    </div>
                    <div>
                      <div className="font-medium">Education</div>
                      <div className="text-sm text-gray-500">4 hours ago</div>
                    </div>
                  </div>
                  <div className="font-medium text-red-500">-$145.00</div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mr-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-gray-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-medium">Gas station</div>
                      <div className="text-sm text-gray-500">6 hours ago</div>
                    </div>
                  </div>
                  <div className="font-medium text-red-500">-$100.00</div>
                </div>

                <div className="text-sm text-gray-500 py-2 text-center">06 November, 2023</div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mr-4">
                      <ShoppingBag className="h-6 w-6 text-gray-600" />
                    </div>
                    <div>
                      <div className="font-medium">Shopping</div>
                      <div className="text-sm text-gray-500">4.00 p.m.</div>
                    </div>
                  </div>
                  <div className="font-medium text-red-500">-$122.00</div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mr-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-gray-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-medium">Tickets</div>
                      <div className="text-sm text-gray-500">2.00 p.m.</div>
                    </div>
                  </div>
                  <div className="font-medium text-red-500">-$80.00</div>
                </div>
              </div>
            </div>

            {/* Chart */}
            <div className="col-span-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Finances</h2>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-[#d4e157] mr-1"></div>
                    <span className="text-sm text-gray-600">Income</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-[#b39ddb] mr-1"></div>
                    <span className="text-sm text-gray-600">Expenses</span>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-4 h-64">
                <div className="flex justify-between items-center mb-2 text-xs text-gray-500">
                  <div className="flex space-x-4">
                    <div>
                      <div>Income</div>
                      <div className="font-medium text-sm">$270</div>
                    </div>
                    <div>
                      <div>Expenses</div>
                      <div className="font-medium text-sm">$400</div>
                    </div>
                  </div>
                </div>

                <FinanceChart />

                <div className="flex justify-between mt-4">
                  <div className="text-xs text-gray-500">01 Nov</div>
                  <div className="text-xs text-gray-500">02 Nov</div>
                  <div className="text-xs text-gray-500">03 Nov</div>
                  <div className="text-xs text-gray-500">04 Nov</div>
                  <div className="text-xs text-gray-500">05 Nov</div>
                  <div className="text-xs text-gray-500">06 Nov</div>
                </div>

                <div className="flex space-x-2 mt-4">
                  <Button
                    variant={activeTimeframe === "1d" ? "default" : "outline"}
                    className={`rounded-full text-xs px-4 ${activeTimeframe === "1d" ? "" : "bg-transparent text-gray-600 border-gray-300"}`}
                    onClick={() => setActiveTimeframe("1d")}
                  >
                    1d
                  </Button>
                  <Button
                    variant={activeTimeframe === "1w" ? "default" : "outline"}
                    className={`rounded-full text-xs px-4 ${activeTimeframe === "1w" ? "bg-[#f2f9c8] text-black hover:bg-[#e8f0b8]" : "bg-transparent text-gray-600 border-gray-300"}`}
                    onClick={() => setActiveTimeframe("1w")}
                  >
                    1w
                  </Button>
                  <Button
                    variant={activeTimeframe === "1m" ? "default" : "outline"}
                    className={`rounded-full text-xs px-4 ${activeTimeframe === "1m" ? "" : "bg-transparent text-gray-600 border-gray-300"}`}
                    onClick={() => setActiveTimeframe("1m")}
                  >
                    1m
                  </Button>
                  <Button
                    variant={activeTimeframe === "3m" ? "default" : "outline"}
                    className={`rounded-full text-xs px-4 ${activeTimeframe === "3m" ? "" : "bg-transparent text-gray-600 border-gray-300"}`}
                    onClick={() => setActiveTimeframe("3m")}
                  >
                    3m
                  </Button>
                  <Button
                    variant={activeTimeframe === "1y" ? "default" : "outline"}
                    className={`rounded-full text-xs px-4 ${activeTimeframe === "1y" ? "" : "bg-transparent text-gray-600 border-gray-300"}`}
                    onClick={() => setActiveTimeframe("1y")}
                  >
                    1y
                  </Button>
                  <Button
                    variant={activeTimeframe === "all" ? "default" : "outline"}
                    className={`rounded-full text-xs px-4 ${activeTimeframe === "all" ? "" : "bg-transparent text-gray-600 border-gray-300"}`}
                    onClick={() => setActiveTimeframe("all")}
                  >
                    all
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function FinanceChart() {
  return (
    <svg className="w-full h-40" viewBox="0 0 600 200" xmlns="http://www.w3.org/2000/svg">
      {/* Income line (green) */}
      <path
        d="M0,150 C50,140 100,160 150,130 C200,100 250,120 300,110 C350,100 400,80 450,50 C500,20 550,10 600,5"
        fill="none"
        stroke="#d4e157"
        strokeWidth="3"
      />

      {/* Expenses line (purple) */}
      <path
        d="M0,50 C50,70 100,90 150,60 C200,30 250,80 300,100 C350,120 400,140 450,110 C500,80 550,100 600,70"
        fill="none"
        stroke="#b39ddb"
        strokeWidth="3"
      />
    </svg>
  )
}
