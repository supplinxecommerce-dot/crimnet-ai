import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Search, Filter, MapPin, Phone } from 'lucide-react'

function RiskBadge({ score }) {
  const level = score >= 80 ? 'high' : score >= 60 ? 'medium' : 'low'
  const colors = { high: 'bg-red-500/20 text-red-400', medium: 'bg-amber-500/20 text-amber-400', low: 'bg-green-500/20 text-green-400' }
  return <span className={`text-xs font-semibold px-2 py-0.5 rounded ${colors[level]}`}>{score} — {level}</span>
}

function StatusBadge({ status }) {
  const colors = { wanted: 'bg-red-500/20 text-red-400', arrested: 'bg-amber-500/20 text-amber-400', under_surveillance: 'bg-blue-500/20 text-blue-400', released: 'bg-green-500/20 text-green-400' }
  return <span className={`text-xs font-semibold px-2 py-0.5 rounded ${colors[status] || 'bg-gray-500/20 text-gray-400'}`}>{status?.replace('_', ' ')}</span>
}

const COMMUNITY_COLORS = { 1: '#10B981', 2: '#3B82F6', 3: '#F59E0B', 4: '#EF4444', 5: '#14B8A6' }

export default function Suspects() {
  const [suspects, setSuspects] = useState([])
  const [search, setSearch] = useState('')
  const [riskFilter, setRiskFilter] = useState('all')
  const [cityFilter, setCityFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => { fetch('/api/suspects').then(r => r.json()).then(setSuspects) }, [])

  const cities = [...new Set(suspects.map(s => s.city))]
  const statuses = [...new Set(suspects.map(s => s.status))]

  const filtered = suspects.filter(s => {
    if (search && !s.name.toLowerCase().includes(search.toLowerCase()) && !s.aliases.some(a => a.toLowerCase().includes(search.toLowerCase())) && !s.id.toLowerCase().includes(search.toLowerCase())) return false
    if (riskFilter === 'high' && s.riskScore < 80) return false
    if (riskFilter === 'medium' && (s.riskScore < 60 || s.riskScore >= 80)) return false
    if (riskFilter === 'low' && s.riskScore >= 60) return false
    if (cityFilter !== 'all' && s.city !== cityFilter) return false
    if (statusFilter !== 'all' && s.status !== statusFilter) return false
    return true
  })

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <h1 className="text-xl font-bold text-white">Suspects Database</h1>
        <div className="flex gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input type="text" placeholder="Search by name, alias, ID..." value={search} onChange={e => setSearch(e.target.value)}
              className="w-full bg-navy-800 border border-navy-700 rounded-lg pl-10 pr-4 py-2 text-sm text-gray-300 placeholder-gray-500 focus:outline-none focus:border-emerald-500/50" />
          </div>
          <button onClick={() => setShowFilters(!showFilters)} className="px-3 py-2 bg-navy-800 border border-navy-700 rounded-lg text-gray-400 hover:text-white flex items-center gap-1.5 text-sm">
            <Filter size={14} /> Filters
          </button>
        </div>
      </div>

      {showFilters && (
        <div className="flex flex-wrap gap-3 p-3 bg-navy-800 rounded-lg border border-navy-700">
          <select value={riskFilter} onChange={e => setRiskFilter(e.target.value)} className="bg-navy-900 border border-navy-700 rounded-lg px-3 py-1.5 text-sm text-gray-300">
            <option value="all">All Risk Levels</option>
            <option value="high">High Risk (80+)</option>
            <option value="medium">Medium Risk (60-79)</option>
            <option value="low">Low Risk (&lt;60)</option>
          </select>
          <select value={cityFilter} onChange={e => setCityFilter(e.target.value)} className="bg-navy-900 border border-navy-700 rounded-lg px-3 py-1.5 text-sm text-gray-300">
            <option value="all">All Cities</option>
            {cities.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="bg-navy-900 border border-navy-700 rounded-lg px-3 py-1.5 text-sm text-gray-300">
            <option value="all">All Statuses</option>
            {statuses.map(s => <option key={s} value={s}>{s.replace('_', ' ')}</option>)}
          </select>
        </div>
      )}

      <div className="bg-navy-800 rounded-xl border border-navy-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-navy-700">
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Suspect</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase hidden md:table-cell">Aliases</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Risk</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase hidden lg:table-cell">Cases</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase hidden md:table-cell">Location</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(s => (
                <tr key={s.id} className="border-b border-navy-700/50 hover:bg-navy-700/30 transition-colors cursor-pointer" onClick={() => {}}>
                  <td className="px-4 py-3">
                    <Link to={`/suspects/${s.id}`} className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0" style={{ background: COMMUNITY_COLORS[s.community] }}>
                        {s.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">{s.name}</p>
                        <p className="text-xs text-gray-500">{s.id} · Age {s.age}</p>
                      </div>
                    </Link>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <div className="flex flex-wrap gap-1">{s.aliases.map(a => <span key={a} className="text-xs bg-navy-700 rounded px-1.5 py-0.5 text-gray-400">{a}</span>)}</div>
                  </td>
                  <td className="px-4 py-3"><RiskBadge score={s.riskScore} /></td>
                  <td className="px-4 py-3 hidden lg:table-cell"><span className="text-sm text-gray-400">{s.linkedCases.length}</span></td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <div className="flex items-center gap-1 text-sm text-gray-400"><MapPin size={12} /> {s.city}</div>
                  </td>
                  <td className="px-4 py-3"><StatusBadge status={s.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 border-t border-navy-700 text-xs text-gray-500">
          Showing {filtered.length} of {suspects.length} suspects
        </div>
      </div>
    </div>
  )
}
