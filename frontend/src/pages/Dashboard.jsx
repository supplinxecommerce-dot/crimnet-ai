import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Users, FolderOpen, Network, Bell, TrendingUp, ArrowRight } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import cytoscape from 'cytoscape'

const COMMUNITY_COLORS = { 1: '#10B981', 2: '#3B82F6', 3: '#F59E0B', 4: '#EF4444', 5: '#14B8A6' }

function StatCard({ icon: Icon, label, value, color, sub }) {
  return (
    <div className="bg-navy-800 rounded-xl border border-navy-700 p-5 glow-green animate-fade-in">
      <div className="flex items-center justify-between mb-3">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color}`}><Icon size={20} /></div>
        <TrendingUp size={14} className="text-emerald-400" />
      </div>
      <p className="text-2xl font-bold text-white">{value}</p>
      <p className="text-sm text-gray-400 mt-1">{label}</p>
      {sub && <p className="text-xs text-emerald-400 mt-1">{sub}</p>}
    </div>
  )
}

function MiniGraph({ networkData }) {
  const containerRef = useRef()
  useEffect(() => {
    if (!networkData || !containerRef.current) return
    const elements = [
      ...networkData.nodes.map(n => ({ data: { id: n.id, label: n.name.split(' ')[0], community: n.community, riskScore: n.riskScore } })),
      ...networkData.edges.filter(e => e.type === 'phone').reduce((acc, e) => {
        const key = `${e.source}-${e.target}`
        if (!acc.find(a => a.data.id === key)) acc.push({ data: { id: key, source: e.source, target: e.target, color: '#10B981' } })
        return acc
      }, [])
    ]
    const cy = cytoscape({
      container: containerRef.current, elements,
      style: [
        { selector: 'node', style: { 'background-color': (el) => COMMUNITY_COLORS[el.data('community')] || '#10B981', label: 'data(label)', 'font-size': 8, color: '#94A3B8', 'text-valign': 'bottom', 'text-margin-y': 4, width: (el) => 15 + (el.data('riskScore') || 50) / 10, height: (el) => 15 + (el.data('riskScore') || 50) / 10, 'border-width': 1, 'border-color': '#1E293B' } },
        { selector: 'edge', style: { 'line-color': '#334155', width: 1, 'curve-style': 'bezier', opacity: 0.5 } }
      ],
      layout: { name: 'cose', animate: false, nodeRepulsion: 8000, idealEdgeLength: 80 },
      userZoomingEnabled: false, userPanningEnabled: false, autoungrabify: true
    })
    return () => cy.destroy()
  }, [networkData])
  return <div ref={containerRef} className="w-full h-full" />
}

export default function Dashboard({ t }) {
  const [stats, setStats] = useState(null)
  const [alerts, setAlerts] = useState([])
  const [networkData, setNetworkData] = useState(null)
  const [caseData, setCaseData] = useState([])

  useEffect(() => {
    fetch('/api/stats').then(r => r.json()).then(setStats)
    fetch('/api/alerts').then(r => r.json()).then(d => setAlerts(d.slice(0, 6)))
    fetch('/api/network').then(r => r.json()).then(setNetworkData)
    fetch('/api/cases').then(r => r.json()).then(d => {
      const types = {}
      d.forEach(c => { types[c.type] = (types[c.type] || 0) + 1 })
      setCaseData(Object.entries(types).map(([name, count]) => ({ name: name.length > 15 ? name.slice(0, 15) + '…' : name, count, fullName: name })))
    })
  }, [])

  if (!stats) return <div className="flex items-center justify-center h-full"><div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" /></div>

  const colors = ['#10B981', '#3B82F6', '#F59E0B', '#EF4444', '#14B8A6', '#8B5CF6', '#6366F1', '#EC4899']

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Users} label={t.suspects} value={stats.totalSuspects} color="bg-emerald-500/20 text-emerald-400" sub={`${stats.totalCDR}+ CDR records`} />
        <StatCard icon={FolderOpen} label={t.cases} value={stats.activeCases} color="bg-blue-500/20 text-blue-400" sub="Active investigations" />
        <StatCard icon={Network} label="Network Links" value={stats.networkLinks} color="bg-amber-500/20 text-amber-400" sub="Connections mapped" />
        <StatCard icon={Bell} label={t.alerts} value={stats.alertCount} color="bg-red-500/20 text-red-400" sub="Unread alerts" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-navy-800 rounded-xl border border-navy-700 p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-white">Criminal Network Overview</h2>
            <Link to="/network" className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1">Full View <ArrowRight size={12} /></Link>
          </div>
          <div className="h-72 rounded-lg overflow-hidden bg-navy-900/50">
            <MiniGraph networkData={networkData} />
          </div>
          <div className="flex flex-wrap gap-3 mt-3">
            {networkData?.communities?.map(c => (
              <div key={c.id} className="flex items-center gap-1.5 text-xs text-gray-400">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: c.color }} />
                {c.name}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-navy-800 rounded-xl border border-navy-700 p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-white">Recent {t.alerts}</h2>
            <Link to="/alerts" className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1">View All <ArrowRight size={12} /></Link>
          </div>
          <div className="space-y-2 max-h-80 overflow-y-auto">
            {alerts.map(a => (
              <div key={a.id} className={`p-3 rounded-lg border ${a.severity === 'critical' ? 'border-red-500/30 bg-red-500/5' : a.severity === 'warning' ? 'border-amber-500/30 bg-amber-500/5' : 'border-emerald-500/30 bg-emerald-500/5'}`}>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded ${a.severity === 'critical' ? 'bg-red-500/20 text-red-400' : a.severity === 'warning' ? 'bg-amber-500/20 text-amber-400' : 'bg-emerald-500/20 text-emerald-400'}`}>{a.severity}</span>
                  <span className="text-[10px] text-gray-500">{new Date(a.timestamp).toLocaleDateString()}</span>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">{a.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-navy-800 rounded-xl border border-navy-700 p-4">
          <h2 className="text-sm font-semibold text-white mb-3">Case Type Breakdown</h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={caseData} layout="vertical" margin={{ left: 10, right: 20 }}>
              <XAxis type="number" tick={{ fill: '#64748B', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="name" tick={{ fill: '#94A3B8', fontSize: 11 }} axisLine={false} tickLine={false} width={110} />
              <Tooltip contentStyle={{ background: '#1E293B', border: '1px solid #334155', borderRadius: 8, fontSize: 12, color: '#E2E8F0' }} />
              <Bar dataKey="count" radius={[0, 6, 6, 0]} barSize={20}>
                {caseData.map((_, i) => <Cell key={i} fill={colors[i % colors.length]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-navy-800 rounded-xl border border-navy-700 p-4">
          <h2 className="text-sm font-semibold text-white mb-3">Activity Timeline</h2>
          <div className="space-y-3 max-h-56 overflow-y-auto">
            {[
              { time: '2 hrs ago', text: 'Call pattern analysis completed for Mumbai syndicate', type: 'info' },
              { time: '4 hrs ago', text: 'New financial link discovered: S005 → S015 (₹8.9L)', type: 'warning' },
              { time: '6 hrs ago', text: 'Suspect S028 added to Pune-Mumbai drug corridor case', type: 'critical' },
              { time: '12 hrs ago', text: 'CDR batch processing: 1,847 new records analyzed', type: 'info' },
              { time: '1 day ago', text: 'Community detection algorithm updated — 5 clusters identified', type: 'info' },
              { time: '1 day ago', text: 'Vehicle MH-01-AB-1234 spotted crossing state border', type: 'warning' },
              { time: '2 days ago', text: 'Evidence hash verified on blockchain for FIR/2024/MH/001', type: 'info' },
            ].map((item, i) => (
              <div key={i} className="flex gap-3 items-start">
                <div className="flex flex-col items-center mt-1">
                  <div className={`w-2.5 h-2.5 rounded-full ${item.type === 'critical' ? 'bg-red-400' : item.type === 'warning' ? 'bg-amber-400' : 'bg-emerald-400'}`} />
                  {i < 6 && <div className="w-px h-6 bg-navy-700 mt-1" />}
                </div>
                <div>
                  <p className="text-xs text-gray-300">{item.text}</p>
                  <p className="text-[10px] text-gray-500 mt-0.5">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
