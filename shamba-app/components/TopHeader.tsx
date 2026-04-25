"use client"

import { Bell, User, Brain } from "lucide-react"

export function TopHeader() {
  return (
    <header className="sticky top-0 z-50 bg-stone-50/90 dark:bg-stone-950/90 backdrop-blur-md flex justify-between items-center px-4 py-3 w-full border-b border-stone-200 dark:border-stone-800 shadow-sm md:pl-[17rem]">
      <div className="flex items-center gap-2">
        <Brain className="w-6 h-6 text-primary fill-current" />
        <h1 className="text-lg font-bold tracking-tight text-emerald-900 dark:text-emerald-400">Shamba Negotiator</h1>
      </div>
      
      <div className="flex items-center gap-2">
        <button className="p-2 rounded-full text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-900 transition-all active:scale-95">
          <Bell className="w-5 h-5" />
        </button>
        <button className="p-2 rounded-full text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-900 transition-all active:scale-95">
          <User className="w-5 h-5" />
        </button>
      </div>
    </header>
  )
}
