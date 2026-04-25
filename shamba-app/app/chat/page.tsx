"use client"

import { useState, useRef, useEffect } from "react"
import { SideNavBar } from "@/components/SideNavBar"
import { BottomNavBar } from "@/components/BottomNavBar"
import { TopHeader } from "@/components/TopHeader"
import { Mic, Send, Paperclip, PlusCircle, Brain, Sprout, MapPin, TrendingUp } from "lucide-react"

interface Message {
  role: "user" | "ai"
  content: string
  time: string
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "user", content: "Bro, bei ya mahindi leo iko aje?", time: "10:42 AM" },
    { role: "ai", content: "Sasa Mama Akinyi! Maize prices in Kitale are at KES 3,200 per bag today. There's a slight increase from yesterday.", time: "10:43 AM" },
  ])
  const [input, setInput] = useState("")
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = () => {
    if (!input.trim()) return
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    setMessages([...messages, { role: "user", content: input, time: now }])
    setInput("")
    
    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: "ai", 
        content: "Noma sana! I'm checking the latest predictive trends for you...", 
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
      }])
    }, 1000)
  }

  return (
    <div className="flex min-h-screen bg-background">
      <SideNavBar />
      
      <div className="flex-1 flex flex-col md:pl-64">
        <TopHeader />
        
        {/* Context Bar */}
        <div className="px-4 py-3 bg-surface-container-lowest border-b border-outline-variant flex gap-3 overflow-x-auto hide-scrollbar z-30 shadow-sm md:ml-[17rem]">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-surface-container-low rounded-lg border border-outline-variant/50 shrink-0">
            <Sprout className="w-4 h-4 text-tertiary" />
            <span className="text-xs text-on-surface-variant">Crop:</span>
            <span className="text-sm font-semibold text-on-surface">Maize</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-surface-container-low rounded-lg border border-outline-variant/50 shrink-0">
            <MapPin className="w-4 h-4 text-tertiary" />
            <span className="text-xs text-on-surface-variant">Location:</span>
            <span className="text-sm font-semibold text-on-surface">Kitale</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-primary-fixed/30 rounded-lg border border-primary/20 shrink-0">
            <TrendingUp className="w-4 h-4 text-primary" />
            <span className="text-xs text-on-surface-variant">Trend:</span>
            <span className="text-sm font-semibold text-primary">Upwards</span>
          </div>
        </div>

        {/* Chat Area */}
        <main 
          ref={scrollRef}
          className="flex-1 overflow-y-auto px-4 py-6 flex flex-col gap-4 pb-32 md:pb-24 scroll-smooth md:ml-[17rem]"
        >
          <div className="flex justify-center my-2">
            <span className="px-3 py-1 bg-surface-container rounded-full text-[10px] text-on-surface-variant font-medium shadow-sm">Today</span>
          </div>

          {messages.map((msg, i) => (
            <div 
              key={i} 
              className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"} w-full max-w-2xl self-${msg.role === "user" ? "end" : "start"}`}
            >
              <div className={`flex items-end gap-2 max-w-[85%] ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                {msg.role === "ai" && (
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0 shadow-sm mb-1">
                    <Brain className="w-5 h-5 text-on-primary fill-current" />
                  </div>
                )}
                <div className={`px-4 py-3 rounded-2xl shadow-sm border ${
                  msg.role === "user" 
                    ? "bg-surface-container-lowest text-on-surface rounded-tr-sm border-outline-variant/20" 
                    : "bg-primary-fixed text-on-primary-fixed-variant rounded-tl-sm border-primary/10"
                }`}>
                  <p className="text-sm md:text-base leading-relaxed">{msg.content}</p>
                </div>
              </div>
              <span className={`text-[10px] text-on-surface-variant/70 mt-1 ${msg.role === "user" ? "mr-1" : "ml-10"}`}>
                {msg.time}
              </span>
            </div>
          ))}
        </main>

        {/* Input Area */}
        <div className="fixed bottom-0 left-0 md:left-64 right-0 bg-surface-container-lowest border-t border-outline-variant p-3 md:p-4 z-40 pb-24 md:pb-4 shadow-[0_-8px_24px_rgba(139,94,60,0.03)]">
          <div className="max-w-3xl mx-auto flex items-end gap-2 relative">
            <div className="flex-1 relative rounded-2xl border border-tertiary bg-surface-container-lowest focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all shadow-sm flex items-center overflow-hidden">
              <button className="p-3 text-on-surface-variant hover:text-primary transition-colors">
                <PlusCircle className="w-5 h-5" />
              </button>
              <textarea 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())}
                className="flex-1 w-full border-none bg-transparent py-3 px-2 text-sm md:text-base text-on-surface placeholder:text-on-surface-variant/60 focus:ring-0 resize-none max-h-32" 
                placeholder="Uliza bei au upate ushauri..." 
                rows={1}
              />
              <button className="p-3 text-tertiary hover:text-primary transition-colors">
                <Paperclip className="w-5 h-5" />
              </button>
            </div>
            <button 
              onClick={handleSend}
              className="h-[48px] w-[48px] shrink-0 bg-primary text-on-primary rounded-full flex items-center justify-center hover:bg-primary/90 active:scale-95 transition-all shadow-md group"
            >
              {input ? <Send className="w-5 h-5" /> : <Mic className="w-5 h-5 group-hover:scale-110 transition-transform" />}
            </button>
          </div>
        </div>

        <BottomNavBar />
      </div>
    </div>
  )
}
