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
    { role: "ai", content: `Sasa Mama! I can see you are near ${city || "Detecting..."}. Just checked the hubs for you. Maize prices are looking interesting today.`, time: "10:41 AM" },
  ])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  const suggestions = [
    "Bora niuze leo ama ningoje?",
    "Predict bei ya mahindi Dec",
    "Climate impact kwa harvest ?",
    "Advice ya ku-store maize"
  ]

  useEffect(() => {
    const saved = localStorage.getItem("shamba_chat_history")
    if (saved) {
      try {
        setMessages(JSON.parse(saved))
      } catch (e) {
        console.error("Failed to parse history", e)
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("shamba_chat_history", JSON.stringify(messages))
  }, [messages])

  const handleSend = async (customInput?: string) => {
    const textToSend = customInput || input
    if (!textToSend.trim() || loading) return
    
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    const userMsg: Message = { role: "user", content: textToSend, time: now }
    
    setMessages(prev => [...prev, userMsg])
    if (!customInput) setInput("")
    setLoading(true)
    
    try {
      let context = ""
      if (latitude && longitude) {
        const weather = await getWeatherData(latitude, longitude)
        context = `Farmer is in ${city}. Weather info: ${weather.forecast}. Market insight: ${getWeatherInsight(weather)}`
      }

      const response = await chatWithNegotiator([...messages, userMsg], textToSend, context)
      
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
    <div className="flex min-h-screen bg-white font-sans text-stone-900">
      <SideNavBar />
      
      <div className="flex-1 flex flex-col transition-all duration-300 md:pl-28 lg:pl-80">
        <TopHeader />
        
        {/* Context Bar - Sticky and correctly aligned */}
        <div className="sticky top-[72px] z-30 px-6 py-4 bg-white border-b border-stone-100 flex gap-4 overflow-x-auto hide-scrollbar shadow-sm">
          <div className="flex items-center gap-2 px-4 py-2 bg-stone-50 rounded-xl border border-stone-100 shrink-0">
            <Sprout className="w-4 h-4 text-emerald-700" />
            <span className="text-[10px] text-stone-400 font-black uppercase tracking-widest">Crop</span>
            <span className="text-sm font-black text-stone-900">Maize</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-stone-50 rounded-xl border border-stone-100 shrink-0">
            <MapPin className="w-4 h-4 text-emerald-700" />
            <span className="text-[10px] text-stone-400 font-black uppercase tracking-widest">Location</span>
            <span className="text-sm font-black text-stone-900">Kitale Hub</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-xl border border-emerald-100 shrink-0">
            <TrendingUp className="w-4 h-4 text-emerald-900" />
            <span className="text-[10px] text-emerald-700 font-black uppercase tracking-widest">Trend</span>
            <span className="text-sm font-black text-emerald-900">Upwards</span>
          </div>
        </div>

        {/* Chat Area */}
        <main 
          ref={scrollRef}
          className="flex-1 overflow-y-auto px-4 py-10 md:px-12 lg:px-20 flex flex-col gap-8 pb-48 scroll-smooth bg-stone-50/30"
        >
          <div className="flex justify-center my-6">
            <span className="px-6 py-2 bg-white rounded-full text-[10px] text-stone-400 font-black uppercase tracking-[0.2em] shadow-sm border border-stone-100">Today • {city || "Kenya"}</span>
          </div>

          {messages.map((msg, i) => (
            <div 
              key={i} 
              className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"} w-full animate-in fade-in slide-in-from-bottom-4 duration-500`}
            >
              <div className={`flex items-end gap-4 max-w-[90%] md:max-w-[75%] ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                {msg.role === "ai" && (
                  <div className="w-12 h-12 rounded-[1.25rem] bg-emerald-900 flex items-center justify-center shrink-0 shadow-xl mb-1">
                    <Brain className="w-6 h-6 text-white fill-current" />
                  </div>
                )}
                <div className={`px-6 py-5 rounded-[2rem] shadow-sm border ${
                  msg.role === "user" 
                    ? "bg-emerald-900 text-white rounded-tr-md border-emerald-800" 
                    : "bg-white text-stone-900 rounded-tl-md border-stone-100"
                }`}>
                  <p className="text-base font-bold leading-relaxed">{msg.content}</p>
                </div>
              </div>
              <span className={`text-[10px] font-black text-stone-300 mt-2 ${msg.role === "user" ? "mr-4" : "ml-[72px]"}`}>
                {msg.time}
              </span>
            </div>
          ))}

          {/* Suggestion Chips */}
          {!loading && messages.length < 10 && (
            <div className="flex flex-wrap gap-2 mt-4 animate-in fade-in slide-in-from-bottom-2 duration-700">
              {suggestions.map((s, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(s)}
                  className="px-4 py-2 bg-white border border-stone-200 rounded-xl text-xs font-bold text-stone-600 hover:border-emerald-600 hover:text-emerald-700 transition-all shadow-sm active:scale-95"
                >
                  {s}
                </button>
              ))}
            </div>
          )}
        </main>

        {/* Input Area */}
        <div className="fixed bottom-0 left-0 transition-all duration-300 md:left-28 lg:left-80 right-0 bg-white border-t border-stone-100 p-4 z-40 pb-28 md:pb-6 shadow-[0_-8px_30px_rgba(0,0,0,0.04)]">
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
              onClick={() => handleSend()}
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
