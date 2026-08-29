import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { AlertTriangle, AlertCircle, Info, Bell, ExternalLink } from 'lucide-react'

const SEVERITY_CONFIG = {
  critical: { icon: AlertTriangle, bg: 'bg-red-500/10 border-red-500/30', badge: 'bg-red-500/20 text-red-400', iconColor: 'text-red-400' },
  warning: { icon: AlertCircle, bg: 'bg-amber-500/10 border-amber-500/30', badge: 'bg-amber-500/20 text-amber-400', iconColor: 'text-amber-400' },
  info: { icon: Info, bg: 'bg-blue-500/10 border-blue-500/30', badge: 'bg-blue-500/20 text-blue-400', iconColor: 'text-blue-400' },
}

export default function Alerts() {
  const [alerts, setAlerts] = useState([])
  const [filter, setFilter] = useState('all')

  useEffect(() => { fetch('/api/alerts').then(r => r.json()).then(setAlerts) }, [])

  const filtered = filter === 'all' ? alerts : alerts.filter(a => a.severity === filter)
  const counts = { critical: alerts.filter(a => a.severity === 'critical').length, warning: alerts.filter(a => a.severity === 'warning').length, info: alerts.filter(a => a.severity === 'info').length }

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="flex items-center gap-2">
          <Bell size={20} className="text-emerald-400" />
          <h1 className="text-xl font-bold text-white">AI-Generated Alerts</h1>
          <span className="text-xs bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full font-semibold">{alerts.filter(a => !a.read).length} unread</span>
        </div>
        <div className="flex gap-2">
          {['all', 'critical', 'warning', 'info'].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${filter === f ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-navy-800 text-gray-400 border border-navy-700 hover:text-white'}`}>
              {f === 'all' ? `All (${alerts.length})` : `${f} (${counts[f]})`}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {filtered.map(alert => {
          const config = SEVERITY_CONFIG[alert.severity]
          const Icon = config.icon
          return (
            <div key={alert.id} className={`rounded-xl border p-4 ${config.bg} ${!alert.read ? 'ring-1 ring-inset ring-white/5' : ''}`}>
              <div className="flex items-start gap-3">
                <Icon size={18} className={`${config.iconColor} mt-0.5 shrink-0`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded ${config.badge}`}>{alert.severity}</span>
                    {!alert.read && <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-slow" />}
                    <span className="text-[10px] text-gray-500 ml-auto">{new Date(alert.timestamp).toLocaleString()}</span>
                  </div>
                  <h3 className="text-sm font-semibold text-white mb-1">{alert.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{alert.description}</p>

                  <div className="flex flex-wrap gap-2 mt-3">
                    {alert.suspects.length > 0 && alert.suspects.map(sId => (
                      <Link key={sId} to={`/suspects/${sId}`} className="text-xs bg-navy-800/80 text-emerald-400 px-2 py-1 rounded hover:bg-navy-700 flex items-center gap-1">
                        {sId} <ExternalLink size={10} />
                      </Link>
                    ))}
                    {alert.case && (
                      <Link to={`/cases/${encodeURIComponent(alert.case)}`} className="text-xs bg-navy-800/80 text-teal-400 px-2 py-1 rounded hover:bg-navy-700 flex items-center gap-1">
                        {alert.case} <ExternalLink size={10} />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
