import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FolderOpen, Users, FileText, MapPin } from 'lucide-react'

const TYPE_COLORS = {
  'Organized Theft': 'bg-amber-500/20 text-amber-400',
  'Financial Fraud': 'bg-green-500/20 text-green-400',
  'Drug Trafficking': 'bg-red-500/20 text-red-400',
  'Cyber Crime': 'bg-purple-500/20 text-purple-400',
  'Identity Theft': 'bg-blue-500/20 text-blue-400',
  'Extortion': 'bg-orange-500/20 text-orange-400',
  'Arms Trafficking': 'bg-rose-500/20 text-rose-400',
}

export default function Cases() {
  const [cases, setCases] = useState([])

  useEffect(() => { fetch('/api/cases').then(r => r.json()).then(setCases) }, [])

  return (
    <div className="space-y-4 animate-fade-in">
      <h1 className="text-xl font-bold text-white">FIR Cases</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {cases.map(c => (
          <Link key={c.id} to={`/cases/${encodeURIComponent(c.id)}`} className="bg-navy-800 rounded-xl border border-navy-700 p-5 hover:border-emerald-500/30 transition-colors group">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-xs text-emerald-400 font-mono mb-1">{c.id}</p>
                <h3 className="text-base font-semibold text-white group-hover:text-emerald-400 transition-colors">{c.title}</h3>
              </div>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded shrink-0 ${c.status === 'active' ? 'bg-red-500/20 text-red-400' : 'bg-amber-500/20 text-amber-400'}`}>{c.status.replace('_', ' ')}</span>
            </div>

            <p className="text-sm text-gray-400 mb-3 line-clamp-2">{c.description}</p>

            <div className="flex flex-wrap gap-3 text-xs text-gray-500">
              <span className={`px-2 py-0.5 rounded ${TYPE_COLORS[c.type] || 'bg-gray-500/20 text-gray-400'}`}>{c.type}</span>
              <span className="flex items-center gap-1"><MapPin size={11} /> {c.city}</span>
              <span className="flex items-center gap-1"><Users size={11} /> {c.suspects.length} suspects</span>
              <span className="flex items-center gap-1"><FileText size={11} /> {c.evidence} evidence</span>
              <span>{new Date(c.date).toLocaleDateString()}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
