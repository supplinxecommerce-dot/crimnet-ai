import { useState, useEffect, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Phone, MapPin, Car, FileText, Banknote } from 'lucide-react'
import cytoscape from 'cytoscape'

const COMMUNITY_COLORS = { 1: '#10B981', 2: '#3B82F6', 3: '#F59E0B', 4: '#EF4444', 5: '#14B8A6' }
const EDGE_COLORS = { phone: '#3B82F6', financial: '#10B981', location: '#F59E0B', case: '#EF4444' }

function RiskGauge({ score }) {
  const angle = (score / 100) * 180
  const color = score >= 80 ? '#EF4444' : score >= 60 ? '#F59E0B' : '#10B981'
  return (
    <div className="relative w-32 h-16 mx-auto mb-2">
      <svg viewBox="0 0 120 60" className="w-full">
        <path d="M 10 55 A 50 50 0 0 1 110 55" fill="none" stroke="#1E293B" strokeWidth="8" strokeLinecap="round" />
        <path d="M 10 55 A 50 50 0 0 1 110 55" fill="none" stroke={color} strokeWidth="8" strokeLinecap="round"
          strokeDasharray={`${(angle / 180) * 157} 157`} />
        <text x="60" y="52" textAnchor="middle" fill={color} fontSize="18" fontWeight="bold">{score}</text>
        <text x="60" y="38" textAnchor="middle" fill="#64748B" fontSize="8">RISK SCORE</text>
      </svg>
    </div>
  )
}

function MiniNetwork({ suspect, connections, allSuspects }) {
  const containerRef = useRef()
  useEffect(() => {
    if (!containerRef.current || !connections?.length) return
    const nodeIds = new Set([suspect.id])
    connections.forEach(c => { nodeIds.add(c.source === suspect.id ? c.target : c.source) })

    const elements = [
      ...Array.from(nodeIds).map(id => {
        const s = id === suspect.id ? suspect : allSuspects?.find(s => s.id === id) || { id, name: id, community: 1, riskScore: 50 }
        return { data: { id, label: (s.name || id).split(' ')[0], community: s.community, riskScore: s.riskScore, isMain: id === suspect.id } }
      }),
      ...connections.map((c, i) => {
        const key = `${c.source}-${c.target}-${c.type}`
        return { data: { id: key + i, source: c.source, target: c.target, color: EDGE_COLORS[c.type] || '#334155' } }
      })
    ]
    const cy = cytoscape({
      container: containerRef.current, elements,
      style: [
        { selector: 'node', style: { 'background-color': el => COMMUNITY_COLORS[el.data('community')] || '#10B981', label: 'data(label)', 'font-size': 9, color: '#94A3B8', 'text-valign': 'bottom', 'text-margin-y': 4, width: el => el.data('isMain') ? 35 : 20, height: el => el.data('isMain') ? 35 : 20, 'border-width': el => el.data('isMain') ? 3 : 1, 'border-color': el => el.data('isMain') ? '#FFFFFF' : '#0F172A' } },
        { selector: 'edge', style: { 'line-color': 'data(color)', width: 2, 'curve-style': 'bezier', opacity: 0.6 } }
      ],
      layout: { name: 'cose', animate: false, nodeRepulsion: 5000 },
      userZoomingEnabled: false, userPanningEnabled: false, autoungrabify: true
    })
    return () => cy.destroy()
  }, [suspect, connections, allSuspects])
  return <div ref={containerRef} className="w-full h-full" />
}

export default function SuspectDetail() {
  const { id } = useParams()
  const [suspect, setSuspect] = useState(null)
  const [allSuspects, setAllSuspects] = useState([])

  useEffect(() => {
    fetch(`/api/suspects/${id}`).then(r => r.json()).then(setSuspect)
    fetch('/api/suspects').then(r => r.json()).then(setAllSuspects)
  }, [id])

  if (!suspect) return <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" /></div>

  return (
    <div className="space-y-4 animate-fade-in">
      <Link to="/suspects" className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-white"><ArrowLeft size={16} /> Back to Suspects</Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="bg-navy-800 rounded-xl border border-navy-700 p-5">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-bold" style={{ background: COMMUNITY_COLORS[suspect.community] }}>
              {suspect.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">{suspect.name}</h2>
              <p className="text-sm text-gray-400">{suspect.id} · Age {suspect.age} · {suspect.gender === 'M' ? 'Male' : 'Female'}</p>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded mt-1 inline-block ${suspect.status === 'wanted' ? 'bg-red-500/20 text-red-400' : suspect.status === 'arrested' ? 'bg-amber-500/20 text-amber-400' : 'bg-green-500/20 text-green-400'}`}>{suspect.status?.replace('_', ' ')}</span>
            </div>
          </div>

          <RiskGauge score={suspect.riskScore} />

          <div className="space-y-3 mt-4">
            {suspect.aliases.length > 0 && (
              <div>
                <p className="text-xs text-gray-500 mb-1 font-semibold">Aliases</p>
                <div className="flex flex-wrap gap-1">{suspect.aliases.map(a => <span key={a} className="text-xs bg-navy-700 rounded px-2 py-0.5 text-gray-300">{a}</span>)}</div>
              </div>
            )}
            <div>
              <p className="text-xs text-gray-500 mb-1 font-semibold flex items-center gap-1"><Phone size={10} /> Phone Numbers</p>
              {suspect.phone.map(p => <p key={p} className="text-sm text-emerald-400">{p}</p>)}
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1 font-semibold flex items-center gap-1"><MapPin size={10} /> Addresses</p>
              {suspect.addresses.map(a => <p key={a} className="text-sm text-gray-300">{a}</p>)}
            </div>
            {suspect.vehicles.length > 0 && (
              <div>
                <p className="text-xs text-gray-500 mb-1 font-semibold flex items-center gap-1"><Car size={10} /> Vehicles</p>
                {suspect.vehicles.map(v => <p key={v} className="text-sm text-gray-300">{v}</p>)}
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="bg-navy-800 rounded-xl border border-navy-700 p-4">
            <h3 className="text-sm font-semibold text-white mb-3">Connection Network</h3>
            <div className="h-56 rounded-lg overflow-hidden bg-navy-900/50">
              <MiniNetwork suspect={suspect} connections={suspect.connections} allSuspects={allSuspects} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-navy-800 rounded-xl border border-navy-700 p-4">
              <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-1.5"><FileText size={14} /> Linked Cases ({suspect.linkedCases.length})</h3>
              <div className="space-y-2">
                {suspect.linkedCases.map(caseId => (
                  <Link key={caseId} to={`/cases/${encodeURIComponent(caseId)}`} className="block p-2 rounded-lg bg-navy-900 hover:bg-navy-700 transition-colors">
                    <p className="text-sm text-emerald-400">{caseId}</p>
                  </Link>
                ))}
              </div>
            </div>

            <div className="bg-navy-800 rounded-xl border border-navy-700 p-4">
              <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-1.5"><Banknote size={14} /> Financial Activity</h3>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {suspect.transactions?.length > 0 ? suspect.transactions.map(t => (
                  <div key={t.id} className="p-2 rounded-lg bg-navy-900">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-400">{t.from === suspect.id ? 'Sent' : 'Received'}</span>
                      <span className={`text-sm font-semibold ${t.from === suspect.id ? 'text-red-400' : 'text-green-400'}`}>₹{(t.amount / 100000).toFixed(1)}L</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{t.description}</p>
                  </div>
                )) : <p className="text-sm text-gray-500">No financial records</p>}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-navy-800 rounded-xl border border-navy-700 p-4">
        <h3 className="text-sm font-semibold text-white mb-3">Activity Timeline</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="border-b border-navy-700">
              <th className="text-left px-3 py-2 text-xs font-semibold text-gray-500">Date</th>
              <th className="text-left px-3 py-2 text-xs font-semibold text-gray-500">Type</th>
              <th className="text-left px-3 py-2 text-xs font-semibold text-gray-500">With</th>
              <th className="text-left px-3 py-2 text-xs font-semibold text-gray-500">Duration/Details</th>
              <th className="text-left px-3 py-2 text-xs font-semibold text-gray-500">Tower</th>
            </tr></thead>
            <tbody>
              {suspect.activities?.slice(0, 20).map(a => (
                <tr key={a.id} className="border-b border-navy-700/50">
                  <td className="px-3 py-2 text-xs text-gray-400">{new Date(a.timestamp).toLocaleDateString()} {new Date(a.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                  <td className="px-3 py-2"><span className={`text-xs px-1.5 py-0.5 rounded ${a.type === 'voice' ? 'bg-blue-500/20 text-blue-400' : 'bg-green-500/20 text-green-400'}`}>{a.type}</span></td>
                  <td className="px-3 py-2 text-xs text-emerald-400">{a.from === suspect.id ? a.to : a.from}</td>
                  <td className="px-3 py-2 text-xs text-gray-400">{a.type === 'voice' ? `${Math.floor(a.duration / 60)}m ${a.duration % 60}s` : 'SMS'}</td>
                  <td className="px-3 py-2 text-xs text-gray-500">{a.tower}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
