import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Users, Shield, MapPin } from 'lucide-react'

const COMMUNITY_COLORS = { 1: '#10B981', 2: '#3B82F6', 3: '#F59E0B', 4: '#EF4444', 5: '#14B8A6' }

export default function CaseDetail() {
  const { id } = useParams()
  const [caseData, setCaseData] = useState(null)

  useEffect(() => { fetch(`/api/cases/${encodeURIComponent(id)}`).then(r => r.json()).then(setCaseData) }, [id])

  if (!caseData) return <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" /></div>

  return (
    <div className="space-y-4 animate-fade-in">
      <Link to="/cases" className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-white"><ArrowLeft size={16} /> Back to Cases</Link>

      <div className="bg-navy-800 rounded-xl border border-navy-700 p-5">
        <div className="flex items-start justify-between mb-3">
          <div>
            <p className="text-sm text-emerald-400 font-mono mb-1">{caseData.id}</p>
            <h2 className="text-xl font-bold text-white">{caseData.title}</h2>
          </div>
          <span className={`text-xs font-semibold px-2 py-0.5 rounded ${caseData.status === 'active' ? 'bg-red-500/20 text-red-400' : 'bg-amber-500/20 text-amber-400'}`}>{caseData.status.replace('_', ' ')}</span>
        </div>
        <p className="text-sm text-gray-400 mb-3">{caseData.description}</p>
        <div className="flex flex-wrap gap-4 text-xs text-gray-500">
          <span className="flex items-center gap-1"><MapPin size={12} /> {caseData.city}</span>
          <span>Type: {caseData.type}</span>
          <span>Filed: {new Date(caseData.date).toLocaleDateString()}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-navy-800 rounded-xl border border-navy-700 p-4">
          <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-1.5"><Users size={14} /> Linked Suspects ({caseData.linkedSuspects?.length})</h3>
          <div className="space-y-2">
            {caseData.linkedSuspects?.map(s => (
              <Link key={s.id} to={`/suspects/${s.id}`} className="flex items-center gap-3 p-3 rounded-lg bg-navy-900 hover:bg-navy-700 transition-colors">
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ background: COMMUNITY_COLORS[s.community] }}>
                  {s.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-white">{s.name}</p>
                  <p className="text-xs text-gray-500">{s.id} · {s.city}</p>
                </div>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded ${s.riskScore >= 80 ? 'bg-red-500/20 text-red-400' : s.riskScore >= 60 ? 'bg-amber-500/20 text-amber-400' : 'bg-green-500/20 text-green-400'}`}>{s.riskScore}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-navy-800 rounded-xl border border-navy-700 p-4">
          <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-1.5"><Shield size={14} /> Evidence ({caseData.evidence?.length})</h3>
          <div className="space-y-2">
            {caseData.evidence?.map(e => (
              <div key={e.id} className="p-3 rounded-lg bg-navy-900">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-semibold text-teal-400">{e.type}</span>
                  <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${e.status === 'verified' ? 'bg-green-500/20 text-green-400' : 'bg-amber-500/20 text-amber-400'}`}>{e.status}</span>
                </div>
                <p className="text-sm text-gray-300">{e.description}</p>
                <p className="text-[10px] text-gray-500 mt-1 font-mono truncate">{e.hash}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
