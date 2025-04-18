"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MessageSquare, X, Minimize2, Maximize2, Send, Bot, User, Loader2, Maximize, Minimize, ChevronDown } from "lucide-react"
import { Card } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Message {
  id: string
  text: string
  sender: "user" | "bot"
  timestamp: Date
  status?: "sending" | "sent" | "error"
}

const QUICK_ACTIONS = [
  { label: "View Warranty Claims", value: "Show me my warranty claims" },
  { label: "Check Invoice Status", value: "What's the status of my invoices?" },
  { label: "Get Help", value: "I need help with the dashboard" },
]

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [isMaximized, setIsMaximized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Load messages from localStorage on mount
  useEffect(() => {
    const savedMessages = localStorage.getItem("chatbot_messages")
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages).map((msg: any) => ({
        ...msg,
        timestamp: new Date(msg.timestamp)
      })))
    }
  }, [])

  // Save messages to localStorage
  useEffect(() => {
    localStorage.setItem("chatbot_messages", JSON.stringify(messages))
  }, [messages])

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Update unread count when messages change
  useEffect(() => {
    if (isMinimized && messages.length > 0) {
      const lastMessage = messages[messages.length - 1]
      if (lastMessage.sender === "bot") {
        setUnreadCount(prev => prev + 1)
      }
    }
  }, [messages, isMinimized])

  // Reset unread count when chat is opened
  useEffect(() => {
    if (!isMinimized) {
      setUnreadCount(0)
    }
  }, [isMinimized])

  const handleSendMessage = async () => {
    if (!input.trim()) return

    const newMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
      timestamp: new Date(),
      status: "sending"
    }

    setMessages(prev => [...prev, newMessage])
    setInput("")

    try {
      // Simulate API call
      setIsTyping(true)
      await new Promise(resolve => setTimeout(resolve, 1000))

      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm analyzing your request. Here's what I found...",
        sender: "bot",
        timestamp: new Date(),
        status: "sent"
      }

      setMessages(prev => [...prev, botResponse])
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsTyping(false)
    }
  }

  const handleQuickAction = (action: string) => {
    setInput(action)
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 rounded-full w-12 h-12 bg-gradient-to-r from-[#FF4F59] to-[#FFAD28] hover:from-[#FF4F59]/90 hover:to-[#FFAD28]/90 shadow-lg hover:shadow-xl transition-all duration-300 animate-float"
      >
        <MessageSquare className="h-6 w-6 text-white" />
      </Button>
    )
  }

  return (
    <Card className={`fixed bottom-4 right-4 bg-gray-900/80 dark:bg-gray-950/80 hover:bg-gray-900/95 hover:dark:bg-gray-950/95 backdrop-blur-sm shadow-lg transition-all duration-300 ${
      isMinimized ? "h-[88px]" : "h-[calc(100vh-2rem)]"
    } ${
      isMaximized ? "w-[calc(100%-2rem)]" : "w-96"
    }`}>
      {!isMinimized ? (
        <>
          <div className="flex items-center justify-between p-2 border-b border-gray-800">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-gradient-to-r from-[#FF4F59] to-[#FFAD28]">
                <MessageSquare className="h-4 w-4 text-white" />
              </div>
              <span className="font-medium text-white">Chat Assistant</span>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                className="h-7 w-7 p-0 hover:bg-gray-800 text-white transition-transform hover:scale-110"
                onClick={() => setIsMaximized(!isMaximized)}
              >
                {isMaximized ? (
                  <Minimize className="h-3.5 w-3.5" />
                ) : (
                  <Maximize className="h-3.5 w-3.5" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-7 w-7 p-0 hover:bg-gray-800 text-white transition-transform hover:scale-110"
                onClick={() => setIsMinimized(!isMinimized)}
              >
                {isMinimized ? (
                  <Maximize2 className="h-3.5 w-3.5" />
                ) : (
                  <Minimize2 className="h-3.5 w-3.5" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-7 w-7 p-0 hover:bg-gray-800 text-white transition-transform hover:scale-110"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
          <div className="flex flex-col h-[calc(100%-2.5rem)]">
            <div className="flex-1 p-2 overflow-y-auto">
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-400 space-y-3">
                  <div className="p-2 rounded-full bg-gray-800">
                    <Bot className="h-6 w-6" />
                  </div>
                  <p className="text-center">How can I help you today?</p>
                  <div className="grid grid-cols-1 gap-1.5 w-full">
                    {QUICK_ACTIONS.map((action) => (
                      <Button
                        key={action.label}
                        variant="outline"
                        className="w-full justify-start text-white border-gray-700 hover:bg-gray-800 transition-transform hover:scale-[1.02]"
                        onClick={() => handleQuickAction(action.value)}
                      >
                        {action.label}
                      </Button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.sender === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-2 flex items-start gap-2 transition-transform hover:scale-[1.02] ${
                          message.sender === "user"
                            ? "bg-gradient-to-r from-[#FF4F59] to-[#FFAD28] text-white"
                            : "bg-gray-800 text-white"
                        }`}
                      >
                        {message.sender === "bot" && (
                          <Bot className="h-4 w-4 mt-0.5 flex-shrink-0" />
                        )}
                        {message.sender === "user" && (
                          <User className="h-4 w-4 mt-0.5 flex-shrink-0" />
                        )}
                        <div>
                          <p className="text-sm">{message.text}</p>
                          <p className="text-[10px] opacity-70 mt-0.5">
                            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                        {message.status === "sending" && (
                          <Loader2 className="h-3 w-3 animate-spin ml-1" />
                        )}
                      </div>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="max-w-[80%] rounded-lg p-2 bg-gray-800 text-white flex items-center gap-2">
                        <Bot className="h-4 w-4" />
                        <div className="flex gap-1">
                          <div className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" />
                          <div className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce [animation-delay:0.2s]" />
                          <div className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce [animation-delay:0.4s]" />
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>

            <div className="p-2 border-t border-gray-800">
              <div className="flex gap-1.5">
                <Input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 h-8 text-sm bg-gray-800 text-white border-gray-700 placeholder:text-gray-400 transition-transform hover:scale-[1.02] focus:scale-[1.02]"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault()
                      handleSendMessage()
                    }
                  }}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!input.trim() || isTyping}
                  className="h-8 w-8 p-0 bg-gradient-to-r from-[#FF4F59] to-[#FFAD28] hover:from-[#FF4F59]/90 hover:to-[#FFAD28]/90 transition-transform hover:scale-110"
                >
                  <Send className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between px-3 h-10">
            <div className="flex items-center gap-2">
              <div className="relative">
                <div className="p-1 rounded-lg bg-gradient-to-r from-[#FF4F59] to-[#FFAD28]">
                  <MessageSquare className="h-3.5 w-3.5 text-white" />
                </div>
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#FF4F59] text-white text-[10px] rounded-full h-3.5 w-3.5 flex items-center justify-center animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="flex items-center gap-1.5 cursor-pointer group">
                    <span className="text-xs font-medium text-white group-hover:text-[#FF4F59] transition-colors">Chat</span>
                    <ChevronDown className="h-2.5 w-2.5 text-gray-400 group-hover:text-[#FF4F59] transition-colors" />
                    {messages.length > 0 && (
                      <div className="flex items-center gap-1.5">
                        <div className={`p-0.5 rounded-full ${
                          messages[messages.length - 1].sender === "user" 
                            ? "bg-gradient-to-r from-[#FF4F59] to-[#FFAD28]" 
                            : "bg-gray-800"
                        }`}>
                          {messages[messages.length - 1].sender === "user" ? (
                            <User className="h-2.5 w-2.5 text-white" />
                          ) : (
                            <Bot className="h-2.5 w-2.5 text-white" />
                          )}
                        </div>
                        <span className="text-[10px] text-gray-400 group-hover:text-gray-300 transition-colors truncate max-w-[120px]">
                          {messages[messages.length - 1].text}
                        </span>
                        <span className="text-[9px] text-gray-500">
                          {messages[messages.length - 1].timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    )}
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-80 bg-gray-900 border-gray-800" align="start">
                  <div className="p-2 border-b border-gray-800">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-white">Recent Messages</span>
                      <span className="text-xs text-gray-400">{messages.length} total</span>
                    </div>
                  </div>
                  <div className="max-h-60 overflow-y-auto p-2 space-y-2">
                    {messages.length > 0 ? (
                      messages.slice(-5).reverse().map((message) => (
                        <DropdownMenuItem
                          key={message.id}
                          className="flex items-start gap-2 p-2 rounded-lg hover:bg-gray-800 cursor-pointer"
                          onClick={() => setIsMinimized(false)}
                        >
                          <div className={`p-1 rounded-full ${
                            message.sender === "user" 
                              ? "bg-gradient-to-r from-[#FF4F59] to-[#FFAD28]" 
                              : "bg-gray-800"
                          }`}>
                            {message.sender === "user" ? (
                              <User className="h-3 w-3 text-white" />
                            ) : (
                              <Bot className="h-3 w-3 text-white" />
                            )}
                          </div>
                          <div className="flex-1">
                            <p className="text-xs text-white">{message.text}</p>
                            <p className="text-[10px] text-gray-400 mt-0.5">
                              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                          </div>
                        </DropdownMenuItem>
                      ))
                    ) : (
                      <div className="text-center py-4">
                        <p className="text-sm text-gray-400">No messages yet</p>
                      </div>
                    )}
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="flex items-center gap-0.5">
              <Button
                variant="ghost"
                size="sm"
                className="h-5 w-5 p-0 hover:bg-gray-800 text-gray-400 hover:text-white transition-colors"
                onClick={() => setIsMaximized(!isMaximized)}
              >
                {isMaximized ? (
                  <Minimize className="h-2.5 w-2.5" />
                ) : (
                  <Maximize className="h-2.5 w-2.5" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-5 w-5 p-0 hover:bg-gray-800 text-gray-400 hover:text-white transition-colors"
                onClick={() => setIsMinimized(false)}
              >
                <Maximize2 className="h-2.5 w-2.5" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-5 w-5 p-0 hover:bg-red-500/20 text-red-400 hover:text-red-400 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-2.5 w-2.5" />
              </Button>
            </div>
          </div>
          <div className="px-3 h-10 flex items-center mt-1">
            <div className="flex gap-1.5 w-full">
              <Input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 h-6 text-[10px] bg-gray-800 text-white border-gray-700 placeholder:text-gray-400 focus:border-gray-600 focus:ring-0"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    handleSendMessage()
                  }
                }}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!input.trim() || isTyping}
                className="h-6 w-6 p-0 bg-gradient-to-r from-[#FF4F59] to-[#FFAD28] hover:from-[#FF4F59]/90 hover:to-[#FFAD28]/90"
              >
                <Send className="h-2.5 w-2.5" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </Card>
  )
} 