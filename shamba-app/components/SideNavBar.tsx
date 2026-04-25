"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, MessageSquare, TrendingUp, HelpCircle, User, Sprout, MapPin, History } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { icon: LayoutDashboard, label: "Home", href: "/dashboard" },
  { icon: MessageSquare, label: "Negotiate", href: "/chat" },
  { icon: TrendingUp, label: "Market Trends", href: "/market" },
  { icon: Sprout, label: "My Shamba", href: "/dashboard" },
  { icon: History, label: "History", href: "/history" },
]

export function SideNavBar() {
  const pathname = usePathname()

  return (
    <aside className="hidden md:flex flex-col fixed left-0 top-0 h-full z-40 bg-surface-container-highest w-72 border-r border-outline-variant/30 shadow-2xl transition-all duration-500 overflow-hidden">
      <div className="p-6 border-b border-stone-200 dark:border-stone-800">
        <h1 className="font-bold text-emerald-900 dark:text-emerald-400 text-xl font-headline-md mb-8">Shamba Negotiator</h1>
        
        <div className="flex items-center gap-3 mb-4 p-3 bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 shadow-sm">
          <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center text-primary-fixed-variant font-bold shrink-0">MA</div>
          <div>
            <div className="text-sm font-semibold text-on-surface">Mama Akinyi</div>
            <div className="text-xs text-on-surface-variant flex items-center gap-1">
              <MapPin className="w-3 h-3" /> Kitale Maize Hub
            </div>
          </div>
        </div>
      </div>

      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
                isActive
                  ? "bg-emerald-100/50 dark:bg-emerald-900/40 text-emerald-900 dark:text-emerald-100 font-bold border-r-4 border-emerald-700"
                  : "text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-900"
              )}
            >
              <item.icon className={cn("w-5 h-5", isActive && "fill-current")} />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>

      <div className="p-6 border-t border-stone-200 dark:border-stone-800">
        <button className="w-full py-3 bg-primary text-on-primary rounded-xl font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
          <HelpCircle className="w-5 h-5" />
          Get Help
        </button>
      </div>
    </aside>
  )
}
