"use client"

import { useState, useEffect } from "react"
import { SideNavBar } from "@/components/SideNavBar"
import { BottomNavBar } from "@/components/BottomNavBar"
import { TopHeader } from "@/components/TopHeader"
import { Sprout, MapPin, TrendingUp, CloudRain, Lightbulb, MessageSquare, ArrowDown, ChevronRight, TrendingDown, RefreshCcw } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const [prices, setPrices] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPrices() {
      try {
        const res = await fetch('/api/kamis-prices?market=Kitale&crop=Maize')
        const data = await res.json()
        if (data.success && data.data.length > 0) {
          setPrices(data.data[0])
        }
      } catch (err) {
        console.error("Failed to fetch market prices", err)
      } finally {
        setLoading(false)
      }
    }
    fetchPrices()
  }, [])

  return (
    <div className="flex min-h-screen bg-white dark:bg-stone-900 transition-colors duration-500 pb-24 md:pb-0">
      <SideNavBar />
      
      {/* Main Content Area - responsive padding for floating sidebar */}
      <div className="flex-1 transition-all duration-300 ease-in-out md:pl-28 lg:pl-80">
        <TopHeader />
        
        <main className="p-4 md:p-8 lg:p-12 max-w-7xl mx-auto space-y-8">
          {/* Welcome Header (Mobile) */}
          <div className="md:hidden flex items-center justify-between bg-white dark:bg-stone-900 rounded-[2rem] p-6 shadow-sm border border-stone-200 dark:border-stone-800">
            <div>
              <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100">Jambo, Mama Akinyi</h2>
              <p className="text-sm text-stone-500 flex items-center gap-1 mt-1">
                <MapPin className="w-3 h-3" /> Kitale
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-emerald-900 text-white flex items-center justify-center font-bold text-lg shadow-inner">
              MA
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Recommendation Card - Solid Theme */}
            <div className="md:col-span-8 bg-white dark:bg-stone-900 rounded-[2.5rem] p-8 md:p-12 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-stone-200 dark:border-stone-800 relative overflow-hidden group">
              <div className="absolute left-0 top-0 w-2 h-full bg-emerald-900"></div>
              <div className="relative z-10">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-900/30 text-emerald-900 dark:text-emerald-400 text-[10px] font-black uppercase tracking-widest mb-8">
                  <TrendingUp className="w-3.5 h-3.5" /> Market Intelligence
                </span>
                <div className="flex flex-col lg:flex-row justify-between items-start mb-10 gap-8">
                  <div className="max-w-xl">
                    <h3 className="text-4xl lg:text-5xl font-black text-stone-900 dark:text-stone-100 mb-4 tracking-tight leading-tight">Hold for Higher Returns</h3>
                    <p className="text-lg text-stone-600 dark:text-stone-400 font-medium leading-relaxed">
                      {prices?.supply === 'Low' ? 
                        "With Kitale supply currently marked as 'Low', prices are expected to continue their upward trend. " : 
                        "Market momentum is shifting. "}
                      Regional logistics will be constrained by rains in the North Rift starting Tuesday. 
                      <span className="text-emerald-900 dark:text-emerald-400 font-black decoration-emerald-200 decoration-wavy"> Waiting 7-10 days</span> is projected to increase your per-bag revenue by KES 200-250.
                    </p>
                  </div>
                  <div className="flex flex-col items-center bg-stone-50 dark:bg-stone-800/50 p-6 rounded-[2rem] border border-stone-100 dark:border-stone-700 min-w-[140px]">
                    <div className="w-20 h-20 rounded-full border-[8px] border-emerald-900 flex items-center justify-center text-emerald-900 dark:text-emerald-400 font-black text-2xl bg-white dark:bg-stone-900 shadow-xl">
                      85%
                    </div>
                    <span className="text-[10px] uppercase tracking-widest font-black text-stone-400 dark:text-stone-500 mt-4">AI Score</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-4">
                  <Link href="/chat" className="bg-emerald-900 text-white px-10 py-5 rounded-2xl font-bold flex items-center gap-2 hover:bg-emerald-950 transition-all shadow-xl shadow-emerald-900/10 active:scale-95 text-base">
                    <MessageSquare className="w-5 h-5" /> Detailed Analysis
                  </Link>
                  <button className="bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 px-10 py-5 rounded-2xl font-bold flex items-center gap-2 hover:bg-stone-100 dark:hover:bg-stone-700 transition-all active:scale-95 border border-stone-200 dark:border-stone-700">
                    <Lightbulb className="w-5 h-5 text-amber-500" /> Negotiation Tips
                  </button>
                </div>
              </div>
            </div>

            {/* Weather Card - Solid Theme */}
            <div className="md:col-span-4 bg-white dark:bg-stone-900 rounded-[2.5rem] p-8 shadow-sm border border-stone-200 dark:border-stone-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center text-amber-600">
                    <CloudRain className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-stone-900 dark:text-stone-100">Regional Weather</h3>
                    <span className="text-[10px] font-black text-amber-600 uppercase tracking-widest">Precipitation Spike</span>
                  </div>
                </div>
                <p className="text-base text-stone-600 dark:text-stone-400 mb-8 font-bold leading-snug">
                  Heavy rain across Kitale & Bungoma expected. Logistics index dropping.
                </p>
                <div className="bg-stone-50 dark:bg-stone-800/50 p-6 rounded-[2rem] border border-stone-100 dark:border-stone-700 flex gap-4">
                  <TrendingDown className="w-6 h-6 text-amber-600 shrink-0" />
                  <div>
                    <div className="font-black text-stone-900 dark:text-stone-100 text-sm uppercase tracking-tight">Market Impact</div>
                    <div className="text-sm text-stone-500 mt-2 font-semibold">Hub supply contraction imminent. Farm-gate liquidity may tighten.</div>
                  </div>
                </div>
              </div>
              <button className="mt-10 w-full py-5 bg-stone-50 dark:bg-stone-800 text-stone-700 dark:text-stone-300 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-stone-100 dark:hover:bg-stone-700 transition-all group">
                Weather Insights <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
              </button>
            </div>

            {/* Maturity Progress - Solid Theme */}
            <div className="md:col-span-6 bg-white dark:bg-stone-900 rounded-[2.5rem] p-10 shadow-sm border border-stone-200 dark:border-stone-800">
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center">
                    <Sprout className="w-7 h-7 text-emerald-700 dark:text-emerald-500" />
                  </div>
                  <h3 className="text-2xl font-black text-stone-900 dark:text-stone-100 tracking-tight">Farm Maturity</h3>
                </div>
                <span className="px-4 py-2 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-900 dark:text-emerald-100 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-sm">Maize • Phase 4</span>
              </div>
              
              <div className="space-y-10">
                <div>
                  <div className="flex justify-between text-[10px] font-black mb-4 text-stone-400 dark:text-stone-500 uppercase tracking-[0.2em]">
                    <span>Ripening Status</span>
                    <span className="text-emerald-700">82% Complete</span>
                  </div>
                  <div className="w-full bg-stone-100 dark:bg-stone-800 rounded-full h-5 overflow-hidden border border-stone-200 dark:border-stone-700">
                    <div className="bg-emerald-900 dark:bg-emerald-700 h-full rounded-full w-[82%] relative">
                      <div className="absolute inset-0 bg-white/10"></div>
                    </div>
                  </div>
                  <p className="text-[10px] font-black text-emerald-700 dark:text-emerald-500 mt-4 flex items-center gap-2 uppercase tracking-wide">
                    <RefreshCcw className="w-3.5 h-3.5" /> Syncing with satellite data
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-stone-50 dark:bg-stone-800/30 p-6 rounded-[2rem] border border-stone-100 dark:border-stone-700 shadow-sm">
                    <div className="text-[10px] uppercase font-black text-stone-400 mb-2 tracking-widest">Est. Harvest</div>
                    <div className="text-3xl font-black text-stone-900 dark:text-stone-100">45 Bags</div>
                  </div>
                  <div className="bg-stone-50 dark:bg-stone-800/30 p-6 rounded-[2rem] border border-stone-100 dark:border-stone-700 shadow-sm">
                    <div className="text-[10px] uppercase font-black text-stone-400 mb-2 tracking-widest">Valuation</div>
                    <div className="text-3xl font-black text-emerald-900 dark:text-emerald-500">KES 144k</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Real-time Prices - Solid Theme */}
            <div className="md:col-span-6 bg-white dark:bg-stone-900 rounded-[2.5rem] p-10 shadow-sm border border-stone-200 dark:border-stone-800">
              <div className="flex justify-between items-center mb-10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center">
                    <TrendingUp className="w-7 h-7 text-emerald-700 dark:text-emerald-500" />
                  </div>
                  <h3 className="text-2xl font-black text-stone-900 dark:text-stone-100 tracking-tight">Active Hub Prices</h3>
                </div>
                <Link href="/market" className="text-emerald-900 dark:text-emerald-400 text-[10px] font-black uppercase tracking-widest flex items-center gap-2 group decoration-2 underline-offset-4 hover:underline">
                  Live Exchange <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
              
              <div className="space-y-8">
                <div className="flex items-center justify-between p-8 bg-stone-900 text-white rounded-[2.5rem] border border-stone-800 shadow-xl transition-all">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-[1.5rem] bg-emerald-900 flex items-center justify-center text-white shadow-lg overflow-hidden">
                      <Sprout className="w-10 h-10" />
                    </div>
                    <div>
                      <div className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-2">{prices?.commodity || "Maize"} • {prices?.market || "Kitale"}</div>
                      <div className="text-4xl font-black text-white">
                        {loading ? "..." : `KES ${prices?.retail || "3,200"}`} 
                        <span className="text-sm font-medium text-stone-500 ml-2">/ bag</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center gap-1 px-4 py-2 rounded-xl bg-white/10 text-emerald-400 text-sm font-black">
                       +2.4%
                    </span>
                    <p className="text-[10px] font-bold text-stone-500 mt-3 uppercase tracking-tighter">Verified by KAMIS</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  {[
                    { label: 'Wholesale', value: prices?.wholesale ? `KES ${prices.wholesale}` : "3100" },
                    { label: 'M-Pesa Buy', value: "3150" },
                    { label: 'Supply', value: prices?.supply || "Low" }
                  ].map((item) => (
                    <div key={item.label} className="p-5 bg-stone-50 dark:bg-stone-800/40 rounded-2xl text-center border border-stone-100 dark:border-stone-700 transition-all">
                      <div className="text-[9px] uppercase font-black text-stone-400 mb-3 tracking-widest">{item.label}</div>
                      <div className="text-sm font-black text-stone-900 dark:text-stone-100">{item.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>

        <BottomNavBar />
      </div>
    </div>
  )
}
