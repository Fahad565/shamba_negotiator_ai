"use client"

import { useState, useRef, useEffect } from "react"
import { useLocation } from "@/hooks/useLocation"
import { getWeatherData, getWeatherInsight } from "@/lib/weather"
import { chatWithNegotiator } from "@/lib/gemini"
import { SideNavBar } from "@/components/SideNavBar"
import { BottomNavBar } from "@/components/BottomNavBar"
import { TopHeader } from "@/components/TopHeader"
import { Mic, Send, Paperclip, PlusCircle, Brain, Sprout, MapPin, TrendingUp, Loader2 } from "lucide-react"

interface Message {
  role: "user" | "ai"
  content: string
  time: string
}

export default function ChatPage() {
  const { city, latitude, longitude } = useLocation()
  const [messages, setMessages] = useState<Message[]>([
    { role: "ai", content: `Sasa Mama! I can see you are near ${city}. Just checked the hubs for you. Maize prices are looking interesting today.`, time: "10:41 AM" },
    { role: "user", content: "Bro, bei ya mahindi leo iko aje?", time: "10:42 AM" },
    { role: "ai", content: "Maize prices in Kitale are at KES 3,200 per bag today. There's a slight increase from yesterday.", time: "10:43 AM" },
  ])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = async () => {
    if (!input.trim() || loading) return
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    const userMsg: Message = { role: "user", content: input, time: now }
    setMessages(prev => [...prev, userMsg])
    setInput("")
    setLoading(true)
    
    try {
      let context = ""
      if (latitude && longitude) {
        const weather = await getWeatherData(latitude, longitude)
        context = `Farmer is in ${city}. Weather info: ${weather.forecast}. Market insight: ${getWeatherInsight(weather)}`
      }

      const response = await chatWithNegotiator([...messages, userMsg], input, context)
      
      setMessages(prev => [...prev, { 
        role: "ai", 
        content: response, 
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
      }])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen bg-white dark:bg-stone-900">
      <SideNavBar />
      
      <div className="flex-1 flex flex-col transition-all duration-300 md:pl-28 lg:pl-80">
        <TopHeader />
        
        {/* Context Bar - Sticky and correctly aligned */}
        <div className="sticky top-[64px] z-30 px-4 py-3 bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 flex gap-3 overflow-x-auto hide-scrollbar shadow-sm">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-50 dark:bg-stone-800 rounded-lg border border-stone-200 dark:border-stone-700 shrink-0">
            <Sprout className="w-4 h-4 text-emerald-600" />
            <span className="text-xs text-stone-500 font-bold">Crop:</span>
            <span className="text-sm font-black text-stone-900 dark:text-stone-100">Maize</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-50 dark:bg-stone-800 rounded-lg border border-stone-200 dark:border-stone-700 shrink-0">
            <MapPin className="w-4 h-4 text-emerald-600" />
            <span className="text-xs text-stone-500 font-bold">Location:</span>
            <span className="text-sm font-black text-stone-900 dark:text-stone-100">Kitale</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 dark:bg-emerald-900/30 rounded-lg border border-emerald-100 dark:border-emerald-800 shrink-0">
            <TrendingUp className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
            <span className="text-xs text-stone-500 font-bold">Trend:</span>
            <span className="text-sm font-black text-emerald-700 dark:text-emerald-400">Upwards</span>
          </div>
        </div>

        {/* Chat Area */}
        <main 
          ref={scrollRef}
          className="flex-1 overflow-y-auto px-4 py-8 md:px-8 lg:px-12 flex flex-col gap-6 pb-40 scroll-smooth bg-stone-50/50 dark:bg-stone-950/20"
        >
          <div className="flex justify-center my-4">
            <span className="px-4 py-1.5 bg-stone-200 dark:bg-stone-800 rounded-full text-[10px] text-stone-600 dark:text-stone-400 font-black uppercase tracking-widest shadow-sm border border-stone-300 dark:border-stone-700">Today</span>
          </div>

          {messages.map((msg, i) => (
            <div 
              key={i} 
              className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"} w-full animate-in fade-in slide-in-from-bottom-2 duration-300`}
            >
              <div className={`flex items-end gap-3 max-w-[85%] md:max-w-[70%] ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                {msg.role === "ai" && (
                  <div className="w-9 h-9 rounded-xl bg-emerald-900 flex items-center justify-center shrink-0 shadow-lg mb-1">
                    <Brain className="w-5 h-5 text-white fill-current" />
                  </div>
                )}
                <div className={`px-5 py-4 rounded-3xl shadow-sm border ${
                  msg.role === "user" 
                    ? "bg-emerald-900 text-white rounded-tr-sm border-emerald-800" 
                    : "bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 rounded-tl-sm border-stone-200 dark:border-stone-800"
                }`}>
                  <p className="text-sm md:text-base font-medium leading-relaxed">{msg.content}</p>
                </div>
              </div>
              <span className={`text-[10px] font-bold text-stone-400 dark:text-stone-600 mt-2 ${msg.role === "user" ? "mr-2" : "ml-12"}`}>
                {msg.time}
              </span>
            </div>
          ))}
        </main>

        {/* Input Area */}
        <div className="fixed bottom-0 left-0 transition-all duration-300 md:left-28 lg:left-80 right-0 bg-white dark:bg-stone-900 border-t border-stone-200 dark:border-stone-800 p-4 z-40 pb-28 md:pb-6 shadow-[0_-8px_30px_rgba(0,0,0,0.04)]">
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
              disabled={loading}
              className="h-[48px] w-[48px] shrink-0 bg-primary text-on-primary rounded-full flex items-center justify-center hover:bg-primary/90 active:scale-95 transition-all shadow-md group disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : input ? (
                <Send className="w-5 h-5" />
              ) : (
                <Mic className="w-5 h-5 group-hover:scale-110 transition-transform" />
              )}
            </button>
          </div>
        </div>

        <BottomNavBar />
      </div>
    </div>
  )
}
