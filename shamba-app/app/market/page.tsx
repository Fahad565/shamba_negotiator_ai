"use client"

import { SideNavBar } from "@/components/SideNavBar"
import { BottomNavBar } from "@/components/BottomNavBar"
import { TopHeader } from "@/components/TopHeader"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts"
import { Sprout, MapPin, TrendingDown, TrendingUp, Megaphone, Brain, MessageSquare, CloudRain, AlertTriangle } from "lucide-react"

const priceData = [
  { month: "Sep", historical: 2800, predicted: null },
  { month: "Oct", historical: 3100, predicted: null },
  { month: "Nov", historical: 3450, predicted: 3450 },
  { month: "Dec", historical: null, predicted: 2900 },
  { month: "Jan", historical: null, predicted: 2700 },
]

export default function PredictionPage() {
  return (
    <div className="flex min-h-screen bg-white pb-24 md:pb-0 font-sans">
      <SideNavBar />
      
      <div className="flex-1 transition-all duration-300 md:pl-28 lg:pl-80">
        <TopHeader />
        
        <main className="p-4 md:p-8 max-w-5xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-black text-stone-900 font-headline-lg">Price Prognosis</h1>
            <p className="text-sm text-stone-500 flex items-center gap-2 font-bold uppercase tracking-wider">
              <MapPin className="w-4 h-4 text-emerald-600" />
              Kitale Hub • Harvesting Season Forecast
            </p>
          </div>

          {/* Hero Prediction Card */}
          <div className="bg-stone-50 rounded-[2.5rem] p-8 md:p-12 border border-stone-100 shadow-sm relative overflow-hidden group">
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-emerald-50 rounded-full blur-3xl opacity-60"></div>
            <div className="relative z-10 flex flex-col gap-8">
              <div className="inline-flex items-center gap-2 bg-emerald-900 text-white px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest w-fit shadow-lg shadow-emerald-900/10">
                <Megaphone className="w-3.5 h-3.5 shrink-0" /> Market Intelligence
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-stone-900 leading-tight max-w-2xl tracking-tighter">
                Sell 60% this week, <span className="text-emerald-700">store the rest.</span>
              </h2>
              <p className="text-lg text-stone-600 max-w-2xl leading-relaxed font-medium">
                Prices have reached a seasonal peak. With the North Rift harvest influx starting next week and projected logistics delays due to rains, spot prices will likely correct downwards by 15-20%.
              </p>
            </div>
          </div>

          {/* Chart & Stats Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white rounded-[2.5rem] p-10 border border-stone-200 shadow-sm flex flex-col gap-10">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <h3 className="text-xl font-black text-stone-900 flex items-center gap-3">
                  <TrendingUp className="w-6 h-6 text-emerald-900" />
                  Price Trajectory <span className="text-[10px] uppercase font-black text-stone-400 tracking-widest">(KES / 90kg)</span>
                </h3>
              </div>

              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={priceData}>
                    <defs>
                      <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#064e3b" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#064e3b" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 900, fill: '#78716c' }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 900, fill: '#78716c' }} dx={-10} />
                    <Tooltip contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', fontWeight: 900 }} />
                    <Area type="monotone" dataKey="historical" stroke="#064e3b" strokeWidth={4} fillOpacity={1} fill="url(#colorPrice)" connectNulls />
                    <Line type="monotone" dataKey="predicted" stroke="#064e3b" strokeWidth={4} strokeDasharray="8 8" dot={{ r: 6, fill: '#fff', stroke: '#064e3b', strokeWidth: 3 }} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="bg-stone-50 p-6 rounded-[2rem] border border-stone-100 text-center">
                  <div className="text-[10px] uppercase font-black text-stone-400 mb-2 tracking-widest">Current Cap</div>
                  <div className="text-2xl font-black text-emerald-900">KES 3,450</div>
                </div>
                <div className="bg-amber-50 p-6 rounded-[2rem] border border-amber-100 text-center">
                  <div className="text-[10px] uppercase font-black text-amber-700 mb-2 tracking-widest">Expected Dip</div>
                  <div className="text-2xl font-black text-amber-700 flex items-center justify-center gap-2">
                    <TrendingDown className="w-6 h-6" /> KES 2,700
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              {/* Climate Factor Card */}
              <div className="bg-stone-900 text-white rounded-[2.5rem] p-8 border border-stone-800 flex flex-col gap-6 flex-1 shadow-2xl">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-900 flex items-center justify-center shrink-0">
                    <CloudRain className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="font-black text-lg tracking-tight">Environmental Hub</h3>
                    <span className="text-[9px] uppercase font-black text-emerald-400 tracking-[0.2em]">Regional Alert</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <p className="text-sm text-stone-400 leading-relaxed font-bold">
                    Heavier rains in the Hub zones will restrict moisture control. Farmers with poor storage logic should prioritize immediate sales.
                  </p>
                  <div className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/10">
                    <AlertTriangle className="w-5 h-5 text-amber-500" />
                    <span className="text-xs font-black uppercase tracking-wide">Storage Risk: Critical</span>
                  </div>
                </div>
              </div>

              {/* Generate Script Button */}
              <button className="bg-emerald-900 hover:bg-emerald-950 text-white rounded-[2.5rem] p-10 shadow-2xl transition-all active:scale-95 flex flex-col items-center justify-center gap-6 group border border-emerald-800">
                <div className="w-16 h-16 rounded-3xl bg-white/10 flex items-center justify-center group-hover:rotate-12 transition-transform duration-500">
                  <Brain className="w-10 h-10 text-white fill-current" />
                </div>
                <div className="text-center">
                  <div className="text-2xl font-black tracking-tighter">Bargaining Script</div>
                  <p className="text-[10px] text-emerald-400 font-black uppercase tracking-widest mt-2 opacity-80">AI-Powered Negotiation Gear</p>
                </div>
              </button>
            </div>
          </div>
        </main>

        <BottomNavBar />
      </div>
    </div>
  )
}
