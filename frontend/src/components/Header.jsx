import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Menu, Globe } from 'lucide-react'

export default function Header({ t, lang, setLang, sidebarOpen, setSidebarOpen }) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState(null)
  const [showResults, setShowResults] = useState(false)
  const navigate = useNavigate()
  const ref = useRef()

  useEffect(() => {
    if (!query.trim()) { setResults(null); return }
    const timer = setTimeout(() => {
      fetch(`/api/search?q=${encodeURIComponent(query)}`).then(r => r.json()).then(setResults)
    }, 300)
    return () => clearTimeout(timer)
  }, [query])

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setShowResults(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <header className="h-14 bg-navy-800 border-b border-navy-700 flex items-center px-4 gap-4 shrink-0">
      <button onClick={() => setSidebarOpen(!sidebarOpen)} className="md:hidden text-gray-400 hover:text-white">
        <Menu size={20} />
      </button>

      <div className="bg-amber-500/10 border border-amber-500/30 rounded px-3 py-1 text-amber-400 text-xs font-semibold whitespace-nowrap">
        {t.demo}
      </div>

      <div className="flex-1 max-w-xl relative" ref={ref}>
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
        <input type="text" placeholder={t.search} value={query}
          onChange={e => { setQuery(e.target.value); setShowResults(true) }}
          onFocus={() => setShowResults(true)}
          className="w-full bg-navy-900 border border-navy-700 rounded-lg pl-10 pr-4 py-2 text-sm text-gray-300 placeholder-gray-500 focus:outline-none focus:border-emerald-500/50"
        />
        {showResults && results && (results.suspects.length > 0 || results.cases.length > 0) && (
          <div className="absolute top-full mt-1 left-0 right-0 bg-navy-800 border border-navy-700 rounded-lg shadow-xl z-50 max-h-80 overflow-y-auto">
            {results.suspects.length > 0 && (
              <div className="p-2">
                <p className="text-xs text-gray-500 px-2 py-1 font-semibold uppercase">Suspects</p>
                {results.suspects.map(s => (
                  <button key={s.id} onClick={() => { navigate(`/suspects/${s.id}`); setShowResults(false); setQuery('') }}
                    className="w-full text-left px-3 py-2 rounded hover:bg-navy-700 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 text-xs font-bold">{s.name.split(' ').map(n=>n[0]).join('').slice(0,2)}</div>
                    <div>
                      <p className="text-sm text-white">{s.name}</p>
                      <p className="text-xs text-gray-500">{s.id} · {s.city}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
            {results.cases.length > 0 && (
              <div className="p-2 border-t border-navy-700">
                <p className="text-xs text-gray-500 px-2 py-1 font-semibold uppercase">Cases</p>
                {results.cases.map(c => (
                  <button key={c.id} onClick={() => { navigate(`/cases/${encodeURIComponent(c.id)}`); setShowResults(false); setQuery('') }}
                    className="w-full text-left px-3 py-2 rounded hover:bg-navy-700">
                    <p className="text-sm text-white">{c.title}</p>
                    <p className="text-xs text-gray-500">{c.id} · {c.type}</p>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <button onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-navy-700 text-gray-300 hover:text-white text-sm transition-colors">
        <Globe size={14} />
        <span>{lang === 'en' ? 'हिंदी' : 'English'}</span>
      </button>
    </header>
  )
}
