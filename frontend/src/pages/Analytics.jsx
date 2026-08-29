import { useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie, LineChart, Line, CartesianGrid } from 'recharts'

const COLORS = ['#10B981', '#3B82F6', '#F59E0B', '#EF4444', '#14B8A6', '#EC4899', '#6366F1', '#8B5CF6', '#F97316', '#A855F7']

function ChartCard({ title, children }) {
  return (
    <div className="bg-navy-800 rounded-xl border border-navy-700 p-4">
      <h3 className="text-sm font-semibold text-white mb-4">{title}</h3>
      {children}
    </div>
  )
}

export default function Analytics() {
  const [data, setData] = useState(null)

  useEffect(() => { fetch('/api/analytics').then(r => r.json()).then(setData) }, [])

  if (!data) return <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" /></div>

  const heatmapData = []
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  for (let h = 0; h < 24; h++) {
    for (let d = 0; d < 7; d++) {
      const count = data.callsByHour[h] * (data.callsByDay[d] || 1) / 1000
      heatmapData.push({ hour: h, day: d, count: Math.round(count) })
    }
  }

  const cityData = Object.entries(data.cityDistribution).map(([city, count]) => ({ name: city, value: count }))

  const tooltipStyle = { background: '#1E293B', border: '1px solid #334155', borderRadius: 8, fontSize: 12, color: '#E2E8F0' }

  return (
    <div className="space-y-4 animate-fade-in">
      <h1 className="text-xl font-bold text-white">Analytics & Insights</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard title="Top 10 Most Connected Suspects">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={data.topConnected} layout="vertical" margin={{ left: 20, right: 20 }}>
              <XAxis type="number" tick={{ fill: '#64748B', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="name" tick={{ fill: '#94A3B8', fontSize: 10 }} axisLine={false} tickLine={false} width={120} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="count" radius={[0, 6, 6, 0]} barSize={16}>
                {data.topConnected.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Monthly Communication Activity">
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={data.monthlyActivity} margin={{ left: 10, right: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
              <XAxis dataKey="month" tick={{ fill: '#64748B', fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#64748B', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Line type="monotone" dataKey="count" stroke="#10B981" strokeWidth={2} dot={{ r: 3, fill: '#10B981' }} activeDot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Community / Gang Size Comparison">
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={data.communitySize} dataKey="size" nameKey="name" cx="50%" cy="50%" outerRadius={100} innerRadius={50} paddingAngle={3} label={({ name, size }) => `${name} (${size})`} labelLine={{ stroke: '#475569' }}>
                {data.communitySize.map((c, i) => <Cell key={i} fill={c.color} />)}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Geographic Distribution">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={cityData} margin={{ left: 10, right: 10 }}>
              <XAxis dataKey="name" tick={{ fill: '#94A3B8', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#64748B', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="value" radius={[6, 6, 0, 0]} barSize={40}>
                {cityData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Call Frequency Heatmap (Hour x Day)">
          <div className="overflow-x-auto">
            <div className="min-w-[500px]">
              <div className="flex items-end gap-0.5 mb-1 ml-10">
                {Array.from({ length: 24 }, (_, h) => (
                  <div key={h} className="flex-1 text-center text-[9px] text-gray-500">{h}</div>
                ))}
              </div>
              {days.map((day, d) => (
                <div key={d} className="flex items-center gap-0.5 mb-0.5">
                  <div className="w-10 text-[10px] text-gray-500 text-right pr-1">{day}</div>
                  {Array.from({ length: 24 }, (_, h) => {
                    const cell = heatmapData.find(c => c.hour === h && c.day === d)
                    const intensity = cell ? Math.min(cell.count / 20, 1) : 0
                    return (
                      <div key={h} className="flex-1 aspect-square rounded-[2px]" style={{ background: `rgba(16, 185, 129, ${0.1 + intensity * 0.8})` }}
                        title={`${day} ${h}:00 — ${cell?.count || 0} calls`} />
                    )
                  })}
                </div>
              ))}
              <div className="flex items-center justify-end gap-1 mt-2 text-[9px] text-gray-500">
                <span>Less</span>
                {[0.1, 0.3, 0.5, 0.7, 0.9].map(o => <div key={o} className="w-3 h-3 rounded-[2px]" style={{ background: `rgba(16, 185, 129, ${o})` }} />)}
                <span>More</span>
              </div>
            </div>
          </div>
        </ChartCard>

        <ChartCard title="Financial Flows Between Suspects">
          <div className="space-y-2 max-h-72 overflow-y-auto">
            {data.financialFlows.sort((a, b) => b.amount - a.amount).map((f, i) => (
              <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-navy-900">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 text-xs">
                    <span className="text-gray-300 truncate">{f.from}</span>
                    <span className="text-gray-600">→</span>
                    <span className="text-gray-300 truncate">{f.to}</span>
                  </div>
                </div>
                <span className={`text-sm font-semibold shrink-0 ${f.type === 'hawala' ? 'text-red-400' : f.type === 'bank' ? 'text-green-400' : 'text-emerald-400'}`}>
                  ₹{(f.amount / 100000).toFixed(1)}L
                </span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded shrink-0 ${f.type === 'hawala' ? 'bg-red-500/20 text-red-400' : f.type === 'bank' ? 'bg-green-500/20 text-green-400' : f.type === 'upi' ? 'bg-blue-500/20 text-blue-400' : 'bg-amber-500/20 text-amber-400'}`}>{f.type}</span>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>
    </div>
  )
}
