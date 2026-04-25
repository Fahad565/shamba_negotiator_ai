"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, MessageSquare, TrendingUp, Sprout } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { icon: LayoutDashboard, label: "Home", href: "/dashboard" },
  { icon: MessageSquare, label: "Negotiate", href: "/chat" },
  { icon: TrendingUp, label: "Market", href: "/market" },
]

export function BottomNavBar() {
  const pathname = usePathname()

  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 bg-white/95 dark:bg-stone-900/95 backdrop-blur-lg border-t border-stone-100 dark:border-stone-800 rounded-t-2xl shadow-[0_-4px_12px_rgba(139,94,60,0.06)] px-4 pb-6 pt-3 flex justify-around items-center">
      {navItems.map((item) => {
        const isActive = pathname === item.href
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-200",
              isActive
                ? "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-900 dark:text-emerald-100"
                : "text-stone-500 dark:text-stone-400"
            )}
          >
            <item.icon className={cn("w-6 h-6", isActive && "fill-current")} />
            <span className="text-[10px] mt-1 font-medium">{item.label}</span>
          </Link>
        )
      })}
    </nav>
  )
}
