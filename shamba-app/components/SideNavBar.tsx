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
        "hidden md:flex flex-col fixed left-4 top-4 bottom-4 z-40 bg-white dark:bg-stone-900 border border-stone-100 dark:border-stone-800 rounded-[2rem] shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all duration-300 ease-in-out",
        isCollapsed ? "w-20" : "w-72"
      )}
    >
      <div className="p-6 relative">
        <div className="flex items-center justify-between mb-8">
          {!isCollapsed && (
            <h1 className="font-black text-emerald-900 dark:text-emerald-400 text-xl tracking-tight">Shamba AI</h1>
          )}
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={cn(
              "p-2 rounded-xl bg-stone-50 dark:bg-stone-800 text-stone-400 hover:text-emerald-900 dark:hover:text-emerald-400 transition-all",
              isCollapsed && "mx-auto"
            )}
          >
            {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </button>
        </div>

        {!isCollapsed && (
          <div className="flex items-center gap-3 p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl border border-emerald-100 dark:border-emerald-800 transition-opacity duration-300">
            <div className="w-10 h-10 rounded-xl bg-emerald-900 text-white flex items-center justify-center font-bold shrink-0 shadow-lg">MA</div>
            <div className="overflow-hidden">
              <div className="text-sm font-black text-emerald-900 dark:text-emerald-100 truncate">Mama Akinyi</div>
              <div className="text-[10px] text-emerald-700/70 flex items-center gap-1 uppercase font-black tracking-widest">
                <MapPin className="w-2.5 h-2.5" /> Kitale Hub
              </div>
            </div>
          </div>
        )}
      </div>

      <nav className="flex-1 py-4 px-4 space-y-2 overflow-y-auto overflow-x-hidden">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.key}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-4 rounded-2xl transition-all duration-200 group relative",
                isActive
                  ? "bg-emerald-900 text-white font-black shadow-xl shadow-emerald-900/10"
                  : "text-stone-500 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-800"
              )}
            >
              <item.icon className={cn("w-6 h-6 shrink-0 transition-transform group-hover:scale-110", isActive && "fill-current")} />
              {!isCollapsed && <span className="text-sm font-bold tracking-tight">{item.label}</span>}
              {isCollapsed && (
                <div className="absolute left-full ml-4 px-3 py-2 bg-stone-900 text-white text-[10px] rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity font-black uppercase tracking-widest z-[100] shadow-xl">
                  {item.label}
                </div>
              )}
            </Link>
          )
        })}
      </nav>

      <div className="p-6">
        <button className={cn(
          "w-full bg-stone-900 dark:bg-stone-800 text-white rounded-2xl font-black transition-all shadow-lg active:scale-[0.98] flex items-center justify-center gap-2",
          isCollapsed ? "py-4" : "py-5"
        )}>
          <HelpCircle className="w-5 h-5" />
          {!isCollapsed && <span className="text-xs uppercase tracking-widest">Support Hub</span>}
        </button>
      </div>
    </aside>
  )
}
