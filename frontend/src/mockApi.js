import { suspects, cases, cdrRecords, transactions, locationCheckins, networkEdges, alerts, evidenceTrail, communities } from './data.js'

const routes = {
  '/api/suspects': () => suspects,

  '/api/cases': () => cases,

  '/api/cdr': () => cdrRecords.slice(0, 200),

  '/api/transactions': () => transactions,

  '/api/locations': () => locationCheckins,

  '/api/network': () => {
    const nodes = suspects.map(s => ({
      id: s.id, name: s.name, riskScore: s.riskScore, community: s.community,
      city: s.city, status: s.status, aliases: s.aliases
    }))
    return { nodes, edges: networkEdges, communities }
  },

  '/api/alerts': () => alerts,

  '/api/evidence': () => evidenceTrail,

  '/api/communities': () => communities,

  '/api/analytics': () => {
    const callsByHour = Array(24).fill(0)
    const callsByDay = Array(7).fill(0)
    cdrRecords.forEach(r => {
      const d = new Date(r.timestamp)
      callsByHour[d.getHours()]++
      callsByDay[d.getDay()]++
    })

    const connectionCount = {}
    networkEdges.forEach(e => {
      connectionCount[e.source] = (connectionCount[e.source] || 0) + 1
      connectionCount[e.target] = (connectionCount[e.target] || 0) + 1
    })
    const topConnected = Object.entries(connectionCount)
      .map(([id, count]) => ({ id, name: suspects.find(s => s.id === id)?.name || id, count }))
      .sort((a, b) => b.count - a.count).slice(0, 10)

    const cityDistribution = {}
    suspects.forEach(s => { cityDistribution[s.city] = (cityDistribution[s.city] || 0) + 1 })

    const monthlyActivity = {}
    cdrRecords.forEach(r => {
      const month = r.timestamp.slice(0, 7)
      monthlyActivity[month] = (monthlyActivity[month] || 0) + 1
    })

    const communitySize = communities.map(c => ({ name: c.name, size: c.members.length, color: c.color }))

    const financialFlows = transactions.map(t => ({
      from: suspects.find(s => s.id === t.from)?.name || t.from,
      to: suspects.find(s => s.id === t.to)?.name || t.to,
      amount: t.amount, type: t.type
    }))

    return {
      callsByHour, callsByDay, topConnected, cityDistribution,
      monthlyActivity: Object.entries(monthlyActivity).map(([month, count]) => ({ month, count })).sort((a, b) => a.month.localeCompare(b.month)),
      communitySize, financialFlows
    }
  },

  '/api/stats': () => ({
    totalSuspects: suspects.length,
    activeCases: cases.filter(c => c.status === 'active').length,
    networkLinks: networkEdges.length,
    alertCount: alerts.filter(a => !a.read).length,
    totalCDR: cdrRecords.length,
    totalTransactions: transactions.length,
  }),
}

function handleDynamic(url) {
  const suspectMatch = url.match(/^\/api\/suspects\/(.+)$/)
  if (suspectMatch) {
    const id = decodeURIComponent(suspectMatch[1])
    const s = suspects.find(s => s.id === id)
    if (!s) return { error: 'Not found' }
    const connections = networkEdges.filter(e => e.source === s.id || e.target === s.id)
    const activities = cdrRecords.filter(r => r.from === s.id || r.to === s.id).slice(0, 50)
    const txns = transactions.filter(t => t.from === s.id || t.to === s.id)
    const locations = locationCheckins.filter(l => l.suspectId === s.id)
    return { ...s, connections, activities, transactions: txns, locations }
  }

  const caseMatch = url.match(/^\/api\/cases\/(.+)$/)
  if (caseMatch) {
    const id = decodeURIComponent(caseMatch[1])
    const c = cases.find(c => c.id === id)
    if (!c) return { error: 'Not found' }
    const linkedSuspects = suspects.filter(s => c.suspects.includes(s.id))
    const evidence = evidenceTrail.filter(e => e.case === c.id)
    return { ...c, linkedSuspects, evidence }
  }

  const searchMatch = url.match(/^\/api\/search\?q=(.*)$/)
  if (searchMatch) {
    const q = decodeURIComponent(searchMatch[1]).toLowerCase()
    if (!q) return { suspects: [], cases: [] }
    const matchedSuspects = suspects.filter(s =>
      s.name.toLowerCase().includes(q) || s.aliases.some(a => a.toLowerCase().includes(q)) ||
      s.phone.some(p => p.includes(q)) || s.id.toLowerCase().includes(q)
    ).slice(0, 10)
    const matchedCases = cases.filter(c =>
      c.id.toLowerCase().includes(q) || c.title.toLowerCase().includes(q) || c.type.toLowerCase().includes(q)
    ).slice(0, 5)
    return { suspects: matchedSuspects, cases: matchedCases }
  }

  return null
}

const originalFetch = window.fetch.bind(window)

window.fetch = function (input, init) {
  const url = typeof input === 'string' ? input : input.url
  const pathname = url.startsWith('http') ? new URL(url).pathname + new URL(url).search : url

  if (pathname.startsWith('/api/')) {
    const handler = routes[pathname]
    if (handler) {
      return Promise.resolve(new Response(JSON.stringify(handler()), { status: 200, headers: { 'Content-Type': 'application/json' } }))
    }
    const dynamicResult = handleDynamic(pathname)
    if (dynamicResult) {
      return Promise.resolve(new Response(JSON.stringify(dynamicResult), { status: 200, headers: { 'Content-Type': 'application/json' } }))
    }
  }

  return originalFetch(input, init)
}
