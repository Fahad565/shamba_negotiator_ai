"use client"

import { Bell, User, Brain } from "lucide-react"

export function TopHeader() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl flex justify-between items-center px-6 py-4 w-full border-b border-stone-100 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="md:hidden w-10 h-10 rounded-xl bg-emerald-900 flex items-center justify-center shadow-lg">
          <Brain className="w-6 h-6 text-white fill-current" />
        </div>
        <h1 className="text-xl font-black tracking-tighter text-emerald-900">Shamba Negotiator</h1>
      </div>
      
      <div className="flex items-center gap-4">
        <button className="p-2.5 rounded-xl text-stone-400 hover:text-emerald-900 hover:bg-stone-50 transition-all active:scale-95">
          <Bell className="w-5.5 h-5.5" />
        </button>
        <button className="w-10 h-10 rounded-xl bg-stone-900 text-white flex items-center justify-center hover:opacity-90 transition-all font-bold shadow-lg">
          <User className="w-5 h-5" />
        </button>
      </div>
    </header>
  )
}
