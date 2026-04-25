"use client"

import { SideNavBar } from "@/components/SideNavBar"
import { BottomNavBar } from "@/components/BottomNavBar"
import { TopHeader } from "@/components/TopHeader"
import { Sprout, MapPin, TrendingUp, CloudRain, Lightbulb, MessageSquare, ArrowDown, ChevronRight, TrendingDown } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-background pb-24 md:pb-0">
      <SideNavBar />
      
      <div className="flex-1 md:pl-64">
        <TopHeader />
        
        <main className="p-4 md:p-8 max-w-7xl mx-auto space-y-6">
          {/* Welcome Header (Mobile) */}
          <div className="md:hidden flex items-center justify-between bg-surface-container rounded-2xl p-5 shadow-sm border border-outline-variant/30">
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
            <div className="md:col-span-8 bg-surface-container-lowest rounded-3xl p-6 md:p-8 shadow-[0_8px_24px_rgba(139,94,60,0.08)] border-t-4 border-primary relative overflow-hidden group">
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-primary-fixed/20 rounded-full blur-3xl group-hover:bg-primary-fixed/30 transition-all duration-500"></div>
              <div className="relative z-10">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-fixed/40 text-on-primary-fixed-variant text-xs font-bold mb-4">
                  <TrendingUp className="w-3 h-3" /> AI Recommendation
                </span>
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-3xl font-bold text-on-surface mb-2">Wait to Sell</h3>
                    <p className="text-base text-on-surface-variant max-w-lg">
                      Heavy rains in the Kitale region are expected to disrupt transport. Holding your crop for 7-10 days is advised to avoid logistical price cuts.
                    </p>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full border-4 border-primary flex items-center justify-center text-primary font-bold text-lg bg-white shadow-sm">
                      85%
                    </div>
                    <span className="text-[10px] uppercase tracking-wider font-bold text-on-surface-variant mt-2">Confidence</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  <button className="bg-primary text-on-primary px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-primary/90 transition-all shadow-md active:scale-95 text-sm">
                    <MessageSquare className="w-4 h-4" /> Ask about price
                  </button>
                  <button className="bg-white border border-outline text-on-surface px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-stone-50 transition-all active:scale-95 text-sm">
                    <Lightbulb className="w-4 h-4 text-secondary" /> Negotiation tips
                  </button>
                </div>
              </div>
            </div>

            {/* Weather Card */}
            <div className="md:col-span-4 bg-surface-container-lowest rounded-3xl p-6 shadow-sm border border-outline-variant/50 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4 text-secondary">
                  <div className="w-10 h-10 rounded-full bg-secondary-fixed/50 flex items-center justify-center">
                    <CloudRain className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-on-surface">Weather Alert</h3>
                </div>
                <p className="text-sm text-on-surface-variant mb-4 font-medium">
                  Heavy rains expected over next 5 days. High risk of transport disruption.
                </p>
                <div className="bg-secondary-fixed/30 p-4 rounded-2xl border border-secondary/10 flex gap-3">
                  <TrendingDown className="w-5 h-5 text-secondary shrink-0" />
                  <div>
                    <div className="font-bold text-on-surface text-sm">Market Impact</div>
                    <div className="text-xs text-on-surface-variant mt-1">Local prices may drop by 5-8% temporarily.</div>
                  </div>
                </div>
              </div>
              <button className="mt-6 w-full py-3 border border-outline text-on-surface rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-stone-50 transition-colors">
                Check weather impact
              </button>
            </div>

            {/* Current Crop Progress */}
            <div className="md:col-span-6 bg-surface-container-lowest rounded-3xl p-6 shadow-sm border border-outline-variant/50">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Sprout className="w-5 h-5 text-primary" />
                  <h3 className="text-xl font-bold text-on-surface">Maize Progress</h3>
                </div>
                <span className="px-3 py-1 bg-primary-fixed/50 text-on-primary-fixed-variant rounded-full text-xs font-bold italic">Harvesting soon</span>
              </div>
              
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-xs font-bold mb-2 text-on-surface-variant">
                    <span>Maturity Progress</span>
                    <span className="text-primary tracking-tight">20 days to harvest</span>
                  </div>
                  <div className="w-full bg-surface-container rounded-full h-3 overflow-hidden shadow-inner">
                    <div className="bg-primary h-full rounded-full w-[82%] relative">
                      <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-stone-50 dark:bg-stone-900 p-4 rounded-2xl border border-outline-variant/30">
                    <div className="text-[10px] uppercase font-bold text-on-surface-variant mb-1">Expected Yield</div>
                    <div className="text-lg font-bold text-on-surface">45 Bags (90kg)</div>
                  </div>
                  <div className="bg-stone-50 dark:bg-stone-900 p-4 rounded-2xl border border-outline-variant/30">
                    <div className="text-[10px] uppercase font-bold text-on-surface-variant mb-1">Est. Revenue</div>
                    <div className="text-lg font-bold text-primary">KES 144,000</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Market Snapshot */}
            <div className="md:col-span-6 bg-surface-container-lowest rounded-3xl p-6 shadow-sm border border-outline-variant/50">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-on-surface">Kitale Market</h3>
                <Link href="/market" className="text-primary text-sm font-bold flex items-center hover:underline">
                  View Trends <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-primary-fixed/20 rounded-2xl border border-primary/10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-on-primary">
                      <TrendingUp className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-on-surface-variant uppercase">Current Price</div>
                      <div className="text-lg font-bold text-primary">KES 3,200 <span className="text-xs font-normal text-on-surface-variant">/ bag</span></div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">+2.4%</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {['M-Pesa Buy', 'Wholesale', 'Retail'].map((label) => (
                    <div key={label} className="p-3 bg-stone-50 dark:bg-stone-900 rounded-xl text-center border border-outline-variant/20">
                      <div className="text-[9px] uppercase font-bold text-on-surface-variant mb-1">{label}</div>
                      <div className="text-xs font-bold text-on-surface">3.1k - 3.3k</div>
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
