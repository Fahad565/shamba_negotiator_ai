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
    <div className="flex min-h-screen bg-white transition-colors duration-500 pb-24 md:pb-0 font-sans text-stone-900">
      <SideNavBar />
      
      {/* Main Content Area - responsive padding for floating sidebar */}
      <div className="flex-1 transition-all duration-300 ease-in-out md:pl-28 lg:pl-80">
        <TopHeader />
        
        <main className="p-4 md:p-8 lg:p-12 max-w-7xl mx-auto space-y-10">
          {/* Welcome Header (Mobile) */}
          <div className="md:hidden flex items-center justify-between bg-emerald-50 rounded-[2.5rem] p-8 shadow-sm border border-emerald-100">
            <div>
              <h2 className="text-2xl font-black text-emerald-900">Jambo, Mama</h2>
              <p className="text-xs text-emerald-700/70 flex items-center gap-1 mt-2 font-black uppercase tracking-widest">
                <MapPin className="w-3.5 h-3.5" /> Kitale Hub
              </p>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-emerald-900 text-white flex items-center justify-center font-black text-xl shadow-lg">
              MA
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Recommendation Card - Solid Theme */}
            <div className="md:col-span-8 bg-stone-50 rounded-[3rem] p-10 md:p-14 shadow-sm border border-stone-100 relative overflow-hidden group">
              <div className="absolute right-0 top-0 w-64 h-64 bg-emerald-100/50 rounded-full blur-[100px] -mr-32 -mt-32"></div>
              <div className="relative z-10 font-sans">
                <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-emerald-900 text-white text-[10px] font-black uppercase tracking-[0.2em] mb-10 shadow-lg shadow-emerald-900/20">
                  <TrendingUp className="w-4 h-4" /> Market Intelligence
                </span>
                <div className="flex flex-col lg:flex-row justify-between items-start mb-12 gap-10">
                  <div className="max-w-xl">
                    <h3 className="text-5xl lg:text-6xl font-black text-stone-900 mb-6 tracking-tighter leading-[1.05] font-sans">Wait for <br/> <span className="text-emerald-700">Higher Returns</span></h3>
                    <p className="text-xl text-stone-600 font-bold leading-relaxed">
                      {prices?.supply === 'Low' ? 
                        "With Kitale supply currently marked as 'Low', prices are expected to continue their upward trend. " : 
                        "Market momentum is shifting. "}
                      Regional logistics are constrained. 
                      <span className="text-emerald-900 font-black underline decoration-emerald-200 decoration-4 underline-offset-8"> Waiting 7-10 days</span> is projected to increase revenue by KES 250/bag.
                    </p>
                  </div>
                  <div className="flex flex-col items-center bg-white p-8 rounded-[2.5rem] border border-stone-100 min-w-[160px] shadow-xl shadow-stone-200/50">
                    <div className="w-24 h-24 rounded-full border-[10px] border-emerald-900 flex items-center justify-center text-emerald-900 font-black text-3xl bg-white shadow-inner">
                      85%
                    </div>
                    <span className="text-[10px] uppercase tracking-[0.3em] font-black text-stone-400 mt-6">AI Precision</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-5">
                  <Link href="/chat" className="bg-emerald-900 text-white px-12 py-6 rounded-[1.5rem] font-black flex items-center gap-3 hover:bg-emerald-950 transition-all shadow-[0_20px_40px_rgba(6,78,59,0.2)] active:scale-95 text-lg">
                    <MessageSquare className="w-6 h-6" /> Detailed Analysis
                  </Link>
                  <button className="bg-white text-stone-900 px-12 py-6 rounded-[1.5rem] font-black flex items-center gap-3 hover:bg-stone-50 transition-all active:scale-95 border border-stone-200 shadow-sm">
                    <Lightbulb className="w-6 h-6 text-amber-500" /> Negotiation Tips
                  </button>
                </div>
              </div>
            </div>

            {/* Weather Card - Solid Theme */}
            <div className="md:col-span-4 bg-emerald-900 text-white rounded-[3rem] p-10 shadow-2xl flex flex-col justify-between relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1),transparent)] pointer-events-none"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-5 mb-10">
                  <div className="w-16 h-16 rounded-[1.5rem] bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20">
                    <CloudRain className="w-9 h-9" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black tracking-tight text-white">Weather Hub</h3>
                    <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Regional Alert</span>
                  </div>
                </div>
                <p className="text-lg text-emerald-100 mb-10 font-bold leading-snug">
                  Heavy rain across Kitale Hub. Logistics index dropping rapidly.
                </p>
                <div className="bg-white/10 backdrop-blur-md p-6 rounded-[2rem] border border-white/20 flex gap-4">
                  <TrendingDown className="w-7 h-7 text-emerald-400 shrink-0" />
                  <div>
                    <div className="font-black text-white text-sm uppercase tracking-widest">Impact</div>
                    <div className="text-sm text-emerald-100/70 mt-2 font-bold leading-relaxed">Hub supply contraction imminent. Farm-gate liquidity tightening.</div>
                  </div>
                </div>
              </div>
              <button className="relative z-10 mt-12 w-full py-6 bg-white text-emerald-900 rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:opacity-90 transition-all group shadow-xl">
                Climate Report <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
              </button>
            </div>

            {/* Maturity Progress - Solid Theme */}
            <div className="md:col-span-6 bg-white rounded-[3rem] p-12 shadow-sm border border-stone-100">
              <div className="flex items-center justify-between mb-12">
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center border border-emerald-100">
                    <Sprout className="w-8 h-8 text-emerald-700" />
                  </div>
                  <h3 className="text-3xl font-black text-stone-900 tracking-tighter">My Shamba</h3>
                </div>
                <span className="px-5 py-2.5 bg-emerald-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-emerald-900/10">Maize • Phase 4</span>
              </div>
              
              <div className="space-y-12">
                <div>
                  <div className="flex justify-between text-[11px] font-black mb-5 text-stone-400 uppercase tracking-[0.3em]">
                    <span>Ripening Status</span>
                    <span className="text-emerald-700 font-black">82% COMPLETE</span>
                  </div>
                  <div className="w-full bg-stone-100 rounded-full h-6 overflow-hidden border border-stone-200 p-1">
                    <div className="bg-emerald-900 h-full rounded-full w-[82%] relative shadow-lg">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20"></div>
                    </div>
                  </div>
                  <p className="text-[11px] font-black text-emerald-700 mt-5 flex items-center gap-2 uppercase tracking-widest">
                    <RefreshCcw className="w-4 h-4 animate-spin-slow" /> Active Satellite Sync
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-8">
                  <div className="bg-stone-50 p-8 rounded-[2.5rem] border border-stone-100 shadow-sm transition-transform hover:scale-[1.02] cursor-default">
                    <div className="text-[10px] uppercase font-black text-stone-400 mb-3 tracking-[0.3em]">Yield Estimate</div>
                    <div className="text-4xl font-black text-stone-900">45 <span className="text-lg text-stone-400">Bags</span></div>
                  </div>
                  <div className="bg-stone-50 p-8 rounded-[2.5rem] border border-stone-100 shadow-sm transition-transform hover:scale-[1.02] cursor-default">
                    <div className="text-[10px] uppercase font-black text-stone-400 mb-3 tracking-[0.3em]">Market Value</div>
                    <div className="text-4xl font-black text-emerald-900 font-sans">144k <span className="text-lg text-emerald-600/50">KES</span></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Real-time Prices - Solid Theme */}
            <div className="md:col-span-6 bg-white rounded-[3rem] p-12 shadow-sm border border-stone-100 flex flex-col">
              <div className="flex justify-between items-center mb-12">
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center border border-emerald-100">
                    <TrendingUp className="w-8 h-8 text-emerald-700" />
                  </div>
                  <h3 className="text-3xl font-black text-stone-900 tracking-tighter">Live Market</h3>
                </div>
                <Link href="/market" className="bg-stone-900 text-white w-12 h-12 rounded-2xl flex items-center justify-center hover:bg-emerald-900 transition-all shadow-lg active:scale-90">
                  <ChevronRight className="w-6 h-6" />
                </Link>
              </div>
              
              <div className="flex-1 flex flex-col justify-between">
                <div className="flex items-center justify-between p-10 bg-emerald-50 rounded-[3rem] border border-emerald-100 shadow-inner group cursor-pointer transition-all hover:bg-emerald-100">
                  <div className="flex items-center gap-8">
                    <div className="w-20 h-20 rounded-[2rem] bg-emerald-900 flex items-center justify-center text-white shadow-2xl group-hover:rotate-6 transition-transform">
                      <Sprout className="w-12 h-12" />
                    </div>
                    <div>
                      <div className="text-[11px] font-black text-emerald-700 uppercase tracking-[0.3em] mb-3">{prices?.commodity || "Maize"} • {prices?.market || "Kitale"} Hub</div>
                      <div className="text-5xl font-black text-emerald-900 font-sans tracking-tighter">
                        {loading ? "..." : `3,450`} 
                        <span className="text-xl font-bold text-emerald-700/50 ml-2">KES</span>
                      </div>
                    </div>
                  </div>
                  <div className="hidden lg:block text-right">
                    <div className="px-5 py-2.5 rounded-2xl bg-emerald-900 text-white text-sm font-black mb-4">
                       +2.4%
                    </div>
                    <p className="text-[10px] font-black text-emerald-700/50 uppercase tracking-widest">KAMIS Verified</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-5 mt-10">
                  {[
                    { label: 'Wholesale', value: prices?.wholesale ? `KES ${prices.wholesale}` : "3100" },
                    { label: 'M-Pesa Pay', value: "3150" },
                    { label: 'Market Depth', value: "Deep" }
                  ].map((item) => (
                    <div key={item.label} className="p-6 bg-stone-50 rounded-[2rem] text-center border border-stone-100 hover:border-emerald-200 transition-all cursor-default">
                      <div className="text-[9px] uppercase font-black text-stone-400 mb-3 tracking-[0.2em]">{item.label}</div>
                      <div className="text-sm font-black text-stone-900 tracking-tight">{item.value}</div>
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
