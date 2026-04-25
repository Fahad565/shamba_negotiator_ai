"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, MessageSquare, TrendingUp, HelpCircle, User, Sprout, MapPin, History, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { icon: LayoutDashboard, label: "Home", href: "/dashboard", key: "home" },
  { icon: MessageSquare, label: "Negotiate", href: "/chat", key: "chat" },
  { icon: TrendingUp, label: "Market Trends", href: "/market", key: "market" },
  { icon: Sprout, label: "My Shamba", href: "/shamba", key: "shamba" },
  { icon: History, label: "History", href: "/history", key: "history" },
]

export function SideNavBar() {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <aside 
      className={cn(
        "hidden md:flex flex-col fixed left-0 top-0 h-full z-40 bg-white dark:bg-stone-950 border-r border-stone-200 dark:border-stone-800 shadow-sm transition-all duration-300 ease-in-out",
        isCollapsed ? "w-20" : "w-72"
      )}
    >
      <div className="p-6 border-b border-stone-100 dark:border-stone-800 relative">
        {!isCollapsed && (
          <h1 className="font-bold text-emerald-900 dark:text-emerald-400 text-xl tracking-tight mb-8">Shamba Negotiator</h1>
        )}
        
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 rounded-full bg-emerald-900 text-white flex items-center justify-center shadow-md z-50 hover:bg-emerald-800 transition-colors"
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>

        {!isCollapsed && (
          <div className="flex items-center gap-3 mb-4 p-4 bg-stone-50 dark:bg-stone-900 rounded-2xl border border-stone-100 dark:border-stone-800 transition-opacity duration-300">
            <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center text-emerald-900 dark:text-emerald-100 font-bold shrink-0">MA</div>
            <div className="overflow-hidden">
              <div className="text-sm font-bold text-stone-900 dark:text-stone-100 truncate">Mama Akinyi</div>
              <div className="text-[10px] text-stone-500 flex items-center gap-1 uppercase font-bold tracking-wider">
                <MapPin className="w-2 h-2" /> Kitale Hub
              </div>
            </div>
          </div>
        )}
      </div>

      <nav className="flex-1 py-6 px-3 space-y-2 overflow-y-auto overflow-x-hidden">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.key}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 group",
                isActive
                  ? "bg-emerald-900 text-white font-bold shadow-lg shadow-emerald-900/20"
                  : "text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-900"
              )}
            >
              <item.icon className={cn("w-5 h-5 shrink-0", isActive && "fill-emerald-200/20")} />
              {!isCollapsed && <span className="text-sm whitespace-nowrap">{item.label}</span>}
              {isCollapsed && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-stone-900 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity font-bold uppercase tracking-widest z-[100]">
                  {item.label}
                </div>
              )}
            </Link>
          )
        })}
      </nav>

      {!isCollapsed && (
        <div className="p-6 border-t border-stone-100 dark:border-stone-800">
          <button className="w-full py-4 bg-stone-900 dark:bg-emerald-900 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-lg active:scale-[0.98]">
            <HelpCircle className="w-5 h-5" />
            Support Hub
          </button>
        </div>
      )}
    </aside>
  )
}
