import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Shield, CheckCircle, Clock, Link as LinkIcon } from 'lucide-react'

export default function EvidenceTrail() {
  const [evidence, setEvidence] = useState([])

  useEffect(() => { fetch('/api/evidence').then(r => r.json()).then(setEvidence) }, [])

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-center gap-2">
        <Shield size={20} className="text-emerald-400" />
        <h1 className="text-xl font-bold text-white">Evidence Trail — Blockchain Verified</h1>
      </div>

      <div className="bg-navy-800 rounded-xl border border-navy-700 p-4 mb-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="flex items-center">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-xs font-bold ${i <= evidence.filter(e => e.status === 'verified').length ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-navy-700 text-gray-500 border border-navy-600'}`}>#{i}</div>
                {i < 5 && <div className={`w-6 h-0.5 ${i < evidence.filter(e => e.status === 'verified').length ? 'bg-green-500/30' : 'bg-navy-700'}`} />}
              </div>
            ))}
          </div>
          <div className="ml-auto text-right">
            <p className="text-sm text-white font-semibold">{evidence.filter(e => e.status === 'verified').length}/{evidence.length} Verified</p>
            <p className="text-xs text-gray-500">On-chain evidence blocks</p>
          </div>
        </div>
      </div>

      <div className="bg-navy-800 rounded-xl border border-navy-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-navy-700">
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">ID</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Type</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Description</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase hidden lg:table-cell">Hash</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Case</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase hidden md:table-cell">Timestamp</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase hidden lg:table-cell">Added By</th>
              </tr>
            </thead>
            <tbody>
              {evidence.map(e => (
                <tr key={e.id} className="border-b border-navy-700/50 hover:bg-navy-700/30">
                  <td className="px-4 py-3 text-xs text-emerald-400 font-mono">{e.id}</td>
                  <td className="px-4 py-3">
                    <span className="text-xs bg-teal-500/20 text-teal-400 px-2 py-0.5 rounded">{e.type}</span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-300 max-w-xs truncate">{e.description}</td>
                  <td className="px-4 py-3 hidden lg:table-cell">
                    <span className="text-[10px] text-gray-500 font-mono">{e.hash.slice(0, 16)}...{e.hash.slice(-8)}</span>
                  </td>
                  <td className="px-4 py-3">
                    <Link to={`/cases/${encodeURIComponent(e.case)}`} className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1">
                      {e.case} <LinkIcon size={10} />
                    </Link>
                  </td>
                  <td className="px-4 py-3">
                    {e.status === 'verified' ? (
                      <span className="flex items-center gap-1 text-xs text-green-400"><CheckCircle size={14} /> Blockchain Verified</span>
                    ) : (
                      <span className="flex items-center gap-1 text-xs text-amber-400"><Clock size={14} /> Pending</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-500 hidden md:table-cell">{new Date(e.timestamp).toLocaleString()}</td>
                  <td className="px-4 py-3 text-xs text-gray-400 hidden lg:table-cell">{e.addedBy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
