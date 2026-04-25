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
    <div className="flex min-h-screen bg-surface-container-low transition-colors duration-500 pb-24 md:pb-0">
      <SideNavBar />
      
      <div className="flex-1 md:pl-64">
        <TopHeader />
        
        <main className="p-4 md:p-8 max-w-7xl mx-auto space-y-6">
          {/* Welcome Header (Mobile) */}
          <div className="md:hidden flex items-center justify-between bg-surface-container rounded-3xl p-6 shadow-sm border border-outline-variant/30">
            <div>
              <h2 className="text-xl font-bold text-on-surface">Jambo, Mama Akinyi</h2>
              <p className="text-sm text-on-surface-variant flex items-center gap-1 mt-1">
                <MapPin className="w-3 h-3" /> Kitale
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-primary-fixed flex items-center justify-center text-on-primary-fixed font-bold text-lg shadow-inner">
              MA
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Recommendation Card */}
            <div className="md:col-span-8 bg-surface-container-lowest rounded-[2rem] p-6 md:p-10 shadow-[0_12px_40px_rgba(1,45,29,0.06)] border-t-8 border-primary relative overflow-hidden group">
              <div className="absolute -right-20 -top-20 w-64 h-64 bg-primary-fixed/30 rounded-full blur-[80px] group-hover:blur-[60px] transition-all duration-700"></div>
              <div className="relative z-10">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-fixed/40 text-on-primary-fixed-variant text-xs font-black uppercase tracking-wider mb-6">
                  <TrendingUp className="w-3.5 h-3.5" /> AI Recommendation
                </span>
                <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-6">
                  <div className="max-w-xl">
                    <h3 className="text-4xl font-black text-on-surface mb-3 tracking-tight">Wait to Sell</h3>
                    <p className="text-lg text-on-surface-variant font-medium leading-relaxed">
                      {prices?.supply === 'Low' ? 
                        "Since supply in Kitale is currently 'Low', prices are expected to climb further. " : 
                        "Current market trends show a seasonal uptick. "}
                      Heavy rains in the North Rift are expected to disrupt transport next week. 
                      <span className="text-primary font-bold"> Holding for 7-10 days</span> could net you an extra KES 200 per bag.
                    </p>
                  </div>
                  <div className="flex flex-col items-center bg-primary/5 p-4 rounded-3xl border border-primary/10">
                    <div className="w-20 h-20 rounded-full border-[6px] border-primary flex items-center justify-center text-primary font-black text-2xl bg-white shadow-xl">
                      85%
                    </div>
                    <span className="text-[10px] uppercase tracking-widest font-black text-primary mt-3">Confidence Score</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-4">
                  <Link href="/chat" className="bg-primary text-on-primary px-8 py-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/20 active:scale-95">
                    <MessageSquare className="w-5 h-5" /> Ask about prices
                  </Link>
                  <button className="bg-white border-2 border-outline-variant/50 text-on-surface px-8 py-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-stone-50 hover:border-outline transition-all active:scale-95 shadow-sm">
                    <Lightbulb className="w-5 h-5 text-secondary" /> Negotiation tips
                  </button>
                </div>
              </div>
            </div>

            {/* Weather Card */}
            <div className="md:col-span-4 bg-surface-container-lowest rounded-[2rem] p-8 shadow-sm border border-outline-variant/30 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-secondary-fixed/40 flex items-center justify-center text-secondary">
                    <CloudRain className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-on-surface">Weather Alert</h3>
                    <span className="text-xs font-bold text-secondary uppercase animate-pulse">Critical</span>
                  </div>
                </div>
                <p className="text-base text-on-surface-variant mb-6 font-semibold leading-snug">
                  Heavy rains expected over Kitale/North Rift next 5 days. Roads likely to be impassable.
                </p>
                <div className="bg-secondary-fixed/20 p-5 rounded-2xl border border-secondary/10 flex gap-4">
                  <TrendingDown className="w-6 h-6 text-secondary shrink-0" />
                  <div>
                    <div className="font-black text-on-surface text-sm uppercase tracking-tight">Market Impact</div>
                    <div className="text-sm text-on-surface-variant mt-1 font-medium">Regional supply will stall. Prices might spike at hubs but dip at farm-gate.</div>
                  </div>
                </div>
              </div>
              <button className="mt-8 w-full py-4 border-2 border-outline-variant/50 text-on-surface rounded-2xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-stone-50 hover:border-outline transition-all group">
                Full Climate Insight <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
              </button>
            </div>

            {/* Current Crop Progress */}
            <div className="md:col-span-6 bg-surface-container-lowest rounded-[2rem] p-8 shadow-md border border-outline-variant/30 group">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary-fixed/30 flex items-center justify-center">
                    <Sprout className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-2xl font-black text-on-surface tracking-tight">Maize Maturity</h3>
                </div>
                <span className="px-4 py-1.5 bg-emerald-100 text-emerald-900 rounded-full text-xs font-black uppercase tracking-tighter shadow-sm border border-emerald-200">Harvest Ready</span>
              </div>
              
              <div className="space-y-8">
                <div>
                  <div className="flex justify-between text-xs font-black mb-3 text-on-surface-variant uppercase tracking-widest">
                    <span>Ripening Phase</span>
                    <span className="text-primary">82% Complete</span>
                  </div>
                  <div className="w-full bg-surface-container rounded-full h-4 overflow-hidden border border-outline-variant/20 shadow-inner">
                    <div className="bg-primary h-full rounded-full w-[82%] relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer scale-x-150"></div>
                    </div>
                  </div>
                  <p className="text-xs font-bold text-primary mt-3 flex items-center gap-1.5">
                    <RefreshCcw className="w-3 h-3" /> Updated 2 hours ago
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-stone-50 dark:bg-stone-900/50 p-5 rounded-3xl border border-outline-variant/30 shadow-sm group-hover:border-primary/20 transition-colors">
                    <div className="text-[10px] uppercase font-black text-on-surface-variant mb-2 tracking-widest">Est. Production</div>
                    <div className="text-2xl font-black text-on-surface">45 Bags</div>
                  </div>
                  <div className="bg-stone-50 dark:bg-stone-900/50 p-5 rounded-3xl border border-outline-variant/30 shadow-sm group-hover:border-primary/20 transition-colors">
                    <div className="text-[10px] uppercase font-black text-on-surface-variant mb-2 tracking-widest">Target Profit</div>
                    <div className="text-2xl font-black text-primary">KES 144k</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Market Snapshot - REAL DATA INTEGRATED */}
            <div className="md:col-span-6 bg-surface-container-lowest rounded-[2rem] p-8 shadow-md border border-outline-variant/30">
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary-fixed/30 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-2xl font-black text-on-surface tracking-tight">Real-time Prices</h3>
                </div>
                <Link href="/market" className="text-primary text-sm font-black flex items-center gap-1 group">
                  More Trends <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between p-6 bg-stone-50 dark:bg-stone-950/40 rounded-[2.5rem] border border-outline-variant/40 hover:border-primary/30 transition-all shadow-inner">
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center text-on-primary shadow-lg shadow-primary/20">
                      <Sprout className="w-8 h-8" />
                    </div>
                    <div>
                      <div className="text-xs font-black text-on-surface-variant uppercase tracking-widest mb-1">{prices?.commodity || "Maize"} • {prices?.market || "Kitale"}</div>
                      <div className="text-3xl font-black text-on-surface">
                        {loading ? "..." : `KES ${prices?.retail || "3,200"}`} 
                        <span className="text-xs font-medium text-on-surface-variant ml-1">/ bag</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black shadow-sm">
                       +2.4%
                    </span>
                    <p className="text-[10px] font-bold text-on-surface-variant mt-2">Source: KAMIS</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: 'Wholesale', value: prices?.wholesale ? `KES ${prices.wholesale}` : "3.1k" },
                    { label: 'Farm-Gate', value: "2.9k" },
                    { label: 'Supply', value: prices?.supply || "Low" }
                  ].map((item) => (
                    <div key={item.label} className="p-4 bg-stone-50 dark:bg-stone-950/20 rounded-2xl text-center border border-outline-variant/20 hover:scale-105 transition-transform duration-300">
                      <div className="text-[9px] uppercase font-black text-on-surface-variant mb-2 tracking-tighter">{item.label}</div>
                      <div className="text-sm font-black text-on-surface">{item.value}</div>
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
