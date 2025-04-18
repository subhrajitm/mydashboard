"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MessageSquare, X, Minimize2, Maximize2, Send, Bot, User, Loader2, Maximize, Minimize } from "lucide-react"
import { Card } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"

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
        className="fixed bottom-4 right-4 rounded-full w-12 h-12 bg-gradient-to-r from-[#FF4F59] to-[#FFAD28] hover:from-[#FF4F59]/90 hover:to-[#FFAD28]/90 shadow-lg hover:shadow-xl transition-all duration-300"
      >
        <MessageSquare className="h-6 w-6 text-white" />
      </Button>
    )
  }

  return (
    <Card className={`fixed bottom-4 right-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-lg transition-all duration-300 ${
      isMinimized ? "h-16" : "h-[500px]"
    } ${
      isMaximized ? "w-[calc(100%-2rem)]" : "w-96"
    }`}>
      <div className="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-gradient-to-r from-[#FF4F59] to-[#FFAD28]">
            <MessageSquare className="h-5 w-5 text-white" />
          </div>
          <span className="font-medium">Chat Assistant</span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-gray-800"
            onClick={() => setIsMaximized(!isMaximized)}
          >
            {isMaximized ? (
              <Minimize className="h-4 w-4" />
            ) : (
              <Maximize className="h-4 w-4" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-gray-800"
            onClick={() => setIsMinimized(!isMinimized)}
          >
            {isMinimized ? (
              <Maximize2 className="h-4 w-4" />
            ) : (
              <Minimize2 className="h-4 w-4" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-gray-800"
            onClick={() => setIsOpen(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {!isMinimized && (
        <div className="flex flex-col h-[calc(100%-3.5rem)]">
          <div className="flex-1 p-4 overflow-y-auto">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-muted-foreground space-y-4">
                <div className="p-3 rounded-full bg-gray-100 dark:bg-gray-800">
                  <Bot className="h-8 w-8" />
                </div>
                <p className="text-center">How can I help you today?</p>
                <div className="grid grid-cols-1 gap-2 w-full">
                  {QUICK_ACTIONS.map((action) => (
                    <Button
                      key={action.label}
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => handleQuickAction(action.value)}
                    >
                      {action.label}
                    </Button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.sender === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 flex items-start gap-2 ${
                        message.sender === "user"
                          ? "bg-gradient-to-r from-[#FF4F59] to-[#FFAD28] text-white"
                          : "bg-gray-100 dark:bg-gray-800"
                      }`}
                    >
                      {message.sender === "bot" && (
                        <Bot className="h-5 w-5 mt-0.5 flex-shrink-0" />
                      )}
                      {message.sender === "user" && (
                        <User className="h-5 w-5 mt-0.5 flex-shrink-0" />
                      )}
                      <div>
                        <p>{message.text}</p>
                        <p className="text-xs opacity-70 mt-1">
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                      {message.status === "sending" && (
                        <Loader2 className="h-4 w-4 animate-spin ml-2" />
                      )}
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="max-w-[80%] rounded-lg p-3 bg-gray-100 dark:bg-gray-800 flex items-center gap-2">
                      <Bot className="h-5 w-5" />
                      <div className="flex gap-1">
                        <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" />
                        <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:0.2s]" />
                        <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:0.4s]" />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          <div className="p-4 border-t border-gray-200 dark:border-gray-800">
            <div className="flex gap-2">
              <Input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 bg-white/50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-800"
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
                className="bg-gradient-to-r from-[#FF4F59] to-[#FFAD28] hover:from-[#FF4F59]/90 hover:to-[#FFAD28]/90"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </Card>
  )
} 