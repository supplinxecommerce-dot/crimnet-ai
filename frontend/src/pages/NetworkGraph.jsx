import { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import cytoscape from 'cytoscape'
import { ZoomIn, ZoomOut, Maximize, Filter, Star, X, Phone, Banknote, MapPin, FileText } from 'lucide-react'

const COMMUNITY_COLORS = { 1: '#10B981', 2: '#3B82F6', 3: '#F59E0B', 4: '#EF4444', 5: '#14B8A6' }
const EDGE_COLORS = { phone: '#3B82F6', financial: '#10B981', location: '#F59E0B', case: '#EF4444' }
const EDGE_ICONS = { phone: Phone, financial: Banknote, location: MapPin, case: FileText }

const LAYOUTS = {
  cose: { name: 'cose', animate: true, animationDuration: 600, nodeRepulsion: (node) => 12000, idealEdgeLength: (edge) => 120, nodeOverlap: 20 },
  circle: { name: 'circle', animate: true, animationDuration: 600 },
  concentric: { name: 'concentric', animate: true, animationDuration: 600, concentric: n => n.data('riskScore') || 50, levelWidth: () => 2 },
}

export default function NetworkGraph() {
  const containerRef = useRef()
  const cyRef = useRef()
  const navigate = useNavigate()
  const [networkData, setNetworkData] = useState(null)
  const [selected, setSelected] = useState(null)
  const [selectedEdge, setSelectedEdge] = useState(null)
  const [layout, setLayout] = useState('cose')
  const [filters, setFilters] = useState({ phone: true, financial: true, location: true, case: true })
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => { fetch('/api/network').then(r => r.json()).then(setNetworkData) }, [])

  const buildGraph = useCallback(() => {
    if (!networkData || !containerRef.current) return
    if (cyRef.current) cyRef.current.destroy()

    const dedupedEdges = []
    const edgeKeys = new Set()
    networkData.edges.forEach(e => {
      if (!filters[e.type]) return
      const key = `${e.source}-${e.target}-${e.type}`
      if (!edgeKeys.has(key)) { edgeKeys.add(key); dedupedEdges.push(e) }
    })

    const connectedNodes = new Set()
    dedupedEdges.forEach(e => { connectedNodes.add(e.source); connectedNodes.add(e.target) })

    const elements = [
      ...networkData.nodes.filter(n => connectedNodes.has(n.id)).map(n => ({
        data: { id: n.id, label: n.name.split(' ').slice(0, 2).join(' '), community: n.community, riskScore: n.riskScore, fullName: n.name, city: n.city, status: n.status, aliases: n.aliases }
      })),
      ...dedupedEdges.map((e, i) => ({
        data: { id: `e${i}`, source: e.source, target: e.target, edgeType: e.type, label: e.label, weight: e.weight, color: EDGE_COLORS[e.type] }
      }))
    ]

    const cy = cytoscape({
      container: containerRef.current, elements,
      style: [
        { selector: 'node', style: {
          'background-color': el => COMMUNITY_COLORS[el.data('community')] || '#10B981',
          label: 'data(label)', 'font-size': 10, color: '#CBD5E1', 'text-valign': 'bottom', 'text-margin-y': 6,
          width: el => 20 + (el.data('riskScore') || 50) / 5, height: el => 20 + (el.data('riskScore') || 50) / 5,
          'border-width': 2, 'border-color': '#0F172A', 'text-outline-width': 2, 'text-outline-color': '#0F172A',
          'transition-property': 'border-color border-width', 'transition-duration': '0.2s'
        }},
        { selector: 'node:selected', style: { 'border-color': '#FFFFFF', 'border-width': 3 } },
        { selector: 'node.highlighted', style: { 'border-color': '#FFD700', 'border-width': 4, 'z-index': 10 } },
        { selector: 'node.dimmed', style: { opacity: 0.2 } },
        { selector: 'edge', style: {
          'line-color': 'data(color)', width: 2, 'curve-style': 'bezier', opacity: 0.6,
          'target-arrow-shape': 'none',
          'transition-property': 'opacity width', 'transition-duration': '0.2s'
        }},
        { selector: 'edge:selected', style: { opacity: 1, width: 4 } },
        { selector: 'edge.dimmed', style: { opacity: 0.08 } },
      ],
      layout: LAYOUTS[layout],
      minZoom: 0.3, maxZoom: 3,
    })

    cy.on('tap', 'node', evt => {
      const node = evt.target
      setSelectedEdge(null)
      setSelected({
        id: node.data('id'), name: node.data('fullName'), community: node.data('community'),
        riskScore: node.data('riskScore'), city: node.data('city'), status: node.data('status'),
        aliases: node.data('aliases'),
        connections: node.connectedEdges().map(e => ({
          type: e.data('edgeType'), label: e.data('label'),
          other: e.source().data('id') === node.data('id') ? e.target().data('fullName') : e.source().data('fullName'),
          otherId: e.source().data('id') === node.data('id') ? e.target().data('id') : e.source().data('id')
        }))
      })
      cy.elements().removeClass('dimmed')
      const neighborhood = node.closedNeighborhood()
      cy.elements().not(neighborhood).addClass('dimmed')
    })

    cy.on('tap', 'edge', evt => {
      const edge = evt.target
      setSelected(null)
      setSelectedEdge({
        type: edge.data('edgeType'), label: edge.data('label'), weight: edge.data('weight'),
        source: edge.source().data('fullName'), sourceId: edge.source().data('id'),
        target: edge.target().data('fullName'), targetId: edge.target().data('id')
      })
    })

    cy.on('tap', evt => { if (evt.target === cy) { setSelected(null); setSelectedEdge(null); cy.elements().removeClass('dimmed highlighted') } })
    cyRef.current = cy
  }, [networkData, filters, layout])

  useEffect(() => { buildGraph() }, [buildGraph])

  const highlightKeyPlayers = () => {
    if (!cyRef.current) return
    const cy = cyRef.current
    cy.elements().removeClass('highlighted dimmed')
    const bc = cy.elements().betweennessCentrality()
    const sorted = cy.nodes().sort((a, b) => bc.betweenness(b) - bc.betweenness(a))
    sorted.slice(0, 5).forEach(n => n.addClass('highlighted'))
  }

  const handleSearch = (q) => {
    setSearchQuery(q)
    if (!cyRef.current || !q.trim()) { cyRef.current?.elements().removeClass('dimmed highlighted'); return }
    const cy = cyRef.current
    cy.elements().removeClass('highlighted dimmed')
    const matches = cy.nodes().filter(n => n.data('fullName')?.toLowerCase().includes(q.toLowerCase()) || n.data('id')?.toLowerCase().includes(q.toLowerCase()))
    if (matches.length > 0) {
      cy.elements().addClass('dimmed')
      matches.forEach(n => { n.removeClass('dimmed').addClass('highlighted'); n.connectedEdges().removeClass('dimmed'); n.neighborhood().nodes().removeClass('dimmed') })
      cy.animate({ fit: { eles: matches, padding: 80 }, duration: 500 })
    }
  }

  if (!networkData) return <div className="flex items-center justify-center h-full"><div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" /></div>

  return (
    <div className="animate-fade-in -m-4 md:-m-6 flex" style={{ height: 'calc(100vh - 7.5rem)' }}>
      <div className="flex-1 relative bg-navy-900" style={{ minHeight: 0 }}>
        <div ref={containerRef} style={{ position: 'absolute', inset: 0 }} />

        <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
          <input type="text" placeholder="Search suspects..." value={searchQuery} onChange={e => handleSearch(e.target.value)}
            className="bg-navy-800/90 backdrop-blur border border-navy-700 rounded-lg px-3 py-2 text-sm text-gray-300 placeholder-gray-500 w-48 focus:outline-none focus:border-emerald-500/50" />
        </div>

        <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
          <button onClick={() => cyRef.current?.zoom(cyRef.current.zoom() * 1.3)} className="w-9 h-9 bg-navy-800/90 backdrop-blur border border-navy-700 rounded-lg flex items-center justify-center text-gray-400 hover:text-white"><ZoomIn size={16} /></button>
          <button onClick={() => cyRef.current?.zoom(cyRef.current.zoom() / 1.3)} className="w-9 h-9 bg-navy-800/90 backdrop-blur border border-navy-700 rounded-lg flex items-center justify-center text-gray-400 hover:text-white"><ZoomOut size={16} /></button>
          <button onClick={() => cyRef.current?.fit(undefined, 50)} className="w-9 h-9 bg-navy-800/90 backdrop-blur border border-navy-700 rounded-lg flex items-center justify-center text-gray-400 hover:text-white"><Maximize size={16} /></button>
          <button onClick={() => setShowFilters(!showFilters)} className="w-9 h-9 bg-navy-800/90 backdrop-blur border border-navy-700 rounded-lg flex items-center justify-center text-gray-400 hover:text-white"><Filter size={16} /></button>
          <button onClick={highlightKeyPlayers} className="w-9 h-9 bg-navy-800/90 backdrop-blur border border-navy-700 rounded-lg flex items-center justify-center text-amber-400 hover:text-amber-300" title="Highlight Key Players"><Star size={16} /></button>
        </div>

        {showFilters && (
          <div className="absolute top-4 right-16 bg-navy-800/95 backdrop-blur border border-navy-700 rounded-lg p-3 z-10 w-52">
            <p className="text-xs font-semibold text-gray-400 mb-2 uppercase">Connection Types</p>
            {Object.entries(EDGE_COLORS).map(([type, color]) => {
              const Icon = EDGE_ICONS[type]
              return (
                <label key={type} className="flex items-center gap-2 py-1.5 cursor-pointer">
                  <input type="checkbox" checked={filters[type]} onChange={() => setFilters(f => ({ ...f, [type]: !f[type] }))} className="accent-emerald-500" />
                  <Icon size={14} style={{ color }} />
                  <span className="text-sm text-gray-300 capitalize">{type}</span>
                </label>
              )
            })}
            <hr className="border-navy-700 my-2" />
            <p className="text-xs font-semibold text-gray-400 mb-2 uppercase">Layout</p>
            {Object.keys(LAYOUTS).map(l => (
              <button key={l} onClick={() => setLayout(l)} className={`block w-full text-left px-2 py-1.5 rounded text-sm ${layout === l ? 'bg-emerald-500/20 text-emerald-400' : 'text-gray-400 hover:text-white'}`}>{l === 'cose' ? 'Force-Directed' : l === 'circle' ? 'Circular' : 'Hierarchical'}</button>
            ))}
          </div>
        )}

        <div className="absolute bottom-4 left-4 flex flex-wrap gap-3 z-10 bg-navy-800/80 backdrop-blur rounded-lg px-3 py-2 border border-navy-700">
          {networkData.communities.map(c => (
            <div key={c.id} className="flex items-center gap-1.5 text-xs text-gray-400">
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: c.color }} />
              {c.name}
            </div>
          ))}
          <div className="w-px h-4 bg-navy-700" />
          {Object.entries(EDGE_COLORS).map(([type, color]) => (
            <div key={type} className="flex items-center gap-1.5 text-xs text-gray-400">
              <div className="w-4 h-0.5" style={{ background: color }} />
              {type}
            </div>
          ))}
        </div>
      </div>

      {(selected || selectedEdge) && (
        <div className="w-80 bg-navy-800 border-l border-navy-700 p-4 overflow-y-auto shrink-0 animate-fade-in">
          <button onClick={() => { setSelected(null); setSelectedEdge(null); cyRef.current?.elements().removeClass('dimmed highlighted') }} className="absolute top-2 right-2 text-gray-500 hover:text-white"><X size={16} /></button>

          {selected && (
            <>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold" style={{ background: COMMUNITY_COLORS[selected.community] }}>
                  {selected.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </div>
                <div>
                  <h3 className="text-white font-semibold">{selected.name}</h3>
                  <p className="text-xs text-gray-400">{selected.id} · {selected.city}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 mb-4">
                <div className="bg-navy-900 rounded-lg p-2 text-center">
                  <p className="text-lg font-bold text-emerald-400">{selected.riskScore}</p>
                  <p className="text-[10px] text-gray-500">Risk Score</p>
                </div>
                <div className="bg-navy-900 rounded-lg p-2 text-center">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded ${selected.status === 'wanted' ? 'bg-red-500/20 text-red-400' : selected.status === 'arrested' ? 'bg-amber-500/20 text-amber-400' : 'bg-green-500/20 text-green-400'}`}>{selected.status}</span>
                  <p className="text-[10px] text-gray-500 mt-1">Status</p>
                </div>
              </div>

              {selected.aliases?.length > 0 && (
                <div className="mb-4">
                  <p className="text-xs text-gray-500 mb-1 font-semibold">Aliases</p>
                  <div className="flex flex-wrap gap-1">{selected.aliases.map(a => <span key={a} className="text-xs bg-navy-700 rounded px-2 py-0.5 text-gray-300">{a}</span>)}</div>
                </div>
              )}

              <div className="mb-4">
                <p className="text-xs text-gray-500 mb-2 font-semibold">Connections ({selected.connections.length})</p>
                <div className="space-y-1.5 max-h-48 overflow-y-auto">
                  {selected.connections.map((c, i) => {
                    const Icon = EDGE_ICONS[c.type]
                    return (
                      <div key={i} className="flex items-center gap-2 p-2 rounded bg-navy-900 text-xs">
                        <Icon size={12} style={{ color: EDGE_COLORS[c.type] }} />
                        <span className="text-gray-300 truncate flex-1">{c.other}</span>
                        <span className="text-gray-500">{c.label}</span>
                      </div>
                    )
                  })}
                </div>
              </div>

              <button onClick={() => navigate(`/suspects/${selected.id}`)} className="w-full py-2 bg-emerald-500/20 text-emerald-400 rounded-lg text-sm font-semibold hover:bg-emerald-500/30 transition-colors">View Full Profile</button>
            </>
          )}

          {selectedEdge && (
            <>
              <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                {(() => { const Icon = EDGE_ICONS[selectedEdge.type]; return <Icon size={16} style={{ color: EDGE_COLORS[selectedEdge.type] }} /> })()}
                Connection Details
              </h3>
              <div className="space-y-3">
                <div className="bg-navy-900 rounded-lg p-3">
                  <p className="text-xs text-gray-500 mb-1">From</p>
                  <p className="text-sm text-white">{selectedEdge.source}</p>
                </div>
                <div className="bg-navy-900 rounded-lg p-3">
                  <p className="text-xs text-gray-500 mb-1">To</p>
                  <p className="text-sm text-white">{selectedEdge.target}</p>
                </div>
                <div className="bg-navy-900 rounded-lg p-3">
                  <p className="text-xs text-gray-500 mb-1">Type</p>
                  <p className="text-sm capitalize" style={{ color: EDGE_COLORS[selectedEdge.type] }}>{selectedEdge.type}</p>
                </div>
                <div className="bg-navy-900 rounded-lg p-3">
                  <p className="text-xs text-gray-500 mb-1">Details</p>
                  <p className="text-sm text-white">{selectedEdge.label}</p>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}
