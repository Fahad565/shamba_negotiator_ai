"use client"

import { SideNavBar } from "@/components/SideNavBar"
import { BottomNavBar } from "@/components/BottomNavBar"
import { TopHeader } from "@/components/TopHeader"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts"
import { Sprout, MapPin, TrendingDown, Megaphone, Brain, MessageSquare, CloudRain, AlertTriangle } from "lucide-react"

const priceData = [
  { month: "Sep", historical: 2800, predicted: null },
  { month: "Oct", historical: 3100, predicted: null },
  { month: "Nov", historical: 3450, predicted: 3450 },
  { month: "Dec", historical: null, predicted: 2900 },
  { month: "Jan", historical: null, predicted: 2700 },
]

export default function PredictionPage() {
  return (
    <div className="flex min-h-screen bg-stone-50 dark:bg-stone-950 pb-24 md:pb-0">
      <SideNavBar />
      
      <div className="flex-1 transition-all duration-300 md:pl-20 lg:pl-72">
        <TopHeader />
        
        <main className="p-4 md:p-8 max-w-5xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold text-on-background font-headline-lg">Maize Price Outlook</h1>
            <p className="text-sm text-on-surface-variant flex items-center gap-2 font-medium">
              <MapPin className="w-4 h-4 text-primary" />
              Kitale Region • Forecast based on current El Niño trends
            </p>
          </div>

          {/* Hero Prediction Card */}
          <div className="bg-surface-container-low rounded-3xl p-6 md:p-8 border border-outline-variant/60 shadow-[0_8px_24px_rgba(139,94,60,0.06)] relative overflow-hidden group">
            <div className="absolute -right-10 -top-10 w-48 h-48 bg-primary-fixed/30 rounded-full blur-3xl opacity-60"></div>
            <div className="relative z-10 flex flex-col gap-6">
              <div className="inline-flex items-center gap-2 bg-secondary text-on-secondary px-4 py-2 rounded-full text-xs font-bold w-fit shadow-sm">
                <Megaphone className="w-4 h-4 shrink-0" /> Strong Recommendation
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-on-background leading-tight max-w-xl">
                Sell 60% this week, store the rest.
              </h2>
              <p className="text-base text-on-surface-variant max-w-2xl leading-relaxed">
                Prices are currently at a 3-month peak. With the main harvest influx expected in early December and projected heavy rains hindering transport, market velocity will likely slow down, driving retail prices lower.
              </p>
            </div>
          </div>

          {/* Chart & Stats Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white dark:bg-stone-900 rounded-3xl p-6 border border-outline-variant/50 shadow-sm flex flex-col gap-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <h3 className="font-bold text-on-background flex items-center gap-2">
                  Price Trend <span className="text-xs font-normal text-on-surface-variant">(KES / 90kg bag)</span>
                </h3>
                <div className="flex gap-4 text-xs font-bold">
                  <div className="flex items-center gap-2 text-on-surface-variant">
                    <div className="w-3 h-3 bg-primary rounded-full"></div> Historical
                  </div>
                  <div className="flex items-center gap-2 text-primary">
                    <div className="w-3 h-1 border-t-2 border-dashed border-primary"></div> Predicted
                  </div>
                </div>
              </div>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={priceData}>
                    <defs>
                      <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#012d1d" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#012d1d" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                    <XAxis 
                      dataKey="month" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 12, fontWeight: 500 }}
                      dy={10}
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 12, fontWeight: 500 }}
                      dx={-10}
                    />
                    <Tooltip 
                      contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="historical" 
                      stroke="#012d1d" 
                      strokeWidth={3}
                      fillOpacity={1} 
                      fill="url(#colorPrice)" 
                      connectNulls
                    />
                    <Line 
                      type="monotone" 
                      dataKey="predicted" 
                      stroke="#012d1d" 
                      strokeWidth={3} 
                      strokeDasharray="5 5" 
                      dot={{ r: 4, fill: '#fff', stroke: '#012d1d', strokeWidth: 2 }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-surface-container-low p-4 rounded-2xl border border-outline-variant/30 text-center">
                  <div className="text-[10px] uppercase font-bold text-on-surface-variant mb-1">Current Peak</div>
                  <div className="text-xl font-bold text-primary">KES 3,450</div>
                </div>
                <div className="bg-secondary-fixed/30 p-4 rounded-2xl border border-secondary/10 text-center">
                  <div className="text-[10px] uppercase font-bold text-secondary mb-1">Projected Low</div>
                  <div className="text-xl font-bold text-secondary flex items-center justify-center gap-1">
                    <TrendingDown className="w-5 h-5" /> KES 2,700
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              {/* Climate Factor Card */}
              <div className="bg-surface-container-high rounded-3xl p-6 border border-outline-variant/30 flex flex-col gap-4 flex-1">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center shrink-0">
                    <CloudRain className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-bold text-on-background">Climate Impact</h3>
                </div>
                <div className="space-y-3">
                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    Higher-than-average seasonal rainfall is predicted. This usually slows down transport from North Rift regions, creating a 2-week supply window before the market is flooded.
                  </p>
                  <div className="flex items-center gap-2 p-3 bg-white/50 rounded-xl border border-outline-variant/20">
                    <AlertTriangle className="w-4 h-4 text-secondary" />
                    <span className="text-xs font-bold text-on-surface">Storage risk: High humidity</span>
                  </div>
                </div>
              </div>

              {/* Generate Script Button */}
              <button className="bg-primary hover:bg-primary-container text-on-primary rounded-3xl p-8 shadow-xl transition-all active:scale-95 flex flex-col items-center justify-center gap-4 group border border-primary-container shadow-primary/10">
                <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Brain className="w-8 h-8 text-primary-fixed fill-current" />
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold">Negotiation Script</div>
                  <p className="text-xs text-primary-fixed opacity-80 mt-1">Get AI tips to bargain with brokers today</p>
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
