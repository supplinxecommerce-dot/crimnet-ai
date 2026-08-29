import express from 'express';
import cors from 'cors';
import { suspects, cases, cdrRecords, transactions, locationCheckins, networkEdges, alerts, evidenceTrail, communities } from './data.js';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/suspects', (req, res) => res.json(suspects));
app.get('/api/suspects/:id', (req, res) => {
  const s = suspects.find(s => s.id === req.params.id);
  if (!s) return res.status(404).json({ error: 'Not found' });
  const connections = networkEdges.filter(e => e.source === s.id || e.target === s.id);
  const activities = cdrRecords.filter(r => r.from === s.id || r.to === s.id).slice(0, 50);
  const txns = transactions.filter(t => t.from === s.id || t.to === s.id);
  const locations = locationCheckins.filter(l => l.suspectId === s.id);
  res.json({ ...s, connections, activities, transactions: txns, locations });
});

app.get('/api/cases', (req, res) => res.json(cases));
app.get('/api/cases/:id', (req, res) => {
  const c = cases.find(c => c.id === req.params.id);
  if (!c) return res.status(404).json({ error: 'Not found' });
  const linkedSuspects = suspects.filter(s => c.suspects.includes(s.id));
  const evidence = evidenceTrail.filter(e => e.case === c.id);
  res.json({ ...c, linkedSuspects, evidence });
});

app.get('/api/cdr', (req, res) => {
  const limit = parseInt(req.query.limit) || 200;
  res.json(cdrRecords.slice(0, limit));
});

app.get('/api/transactions', (req, res) => res.json(transactions));
app.get('/api/locations', (req, res) => res.json(locationCheckins));

app.get('/api/network', (req, res) => {
  const nodes = suspects.map(s => ({
    id: s.id, name: s.name, riskScore: s.riskScore, community: s.community,
    city: s.city, status: s.status, aliases: s.aliases
  }));
  res.json({ nodes, edges: networkEdges, communities });
});

app.get('/api/alerts', (req, res) => res.json(alerts));
app.get('/api/evidence', (req, res) => res.json(evidenceTrail));
app.get('/api/communities', (req, res) => res.json(communities));

app.get('/api/analytics', (req, res) => {
  const callsByHour = Array(24).fill(0);
  const callsByDay = Array(7).fill(0);
  cdrRecords.forEach(r => {
    const d = new Date(r.timestamp);
    callsByHour[d.getHours()]++;
    callsByDay[d.getDay()]++;
  });

  const connectionCount = {};
  networkEdges.forEach(e => {
    connectionCount[e.source] = (connectionCount[e.source] || 0) + 1;
    connectionCount[e.target] = (connectionCount[e.target] || 0) + 1;
  });
  const topConnected = Object.entries(connectionCount)
    .map(([id, count]) => ({ id, name: suspects.find(s => s.id === id)?.name || id, count }))
    .sort((a, b) => b.count - a.count).slice(0, 10);

  const cityDistribution = {};
  suspects.forEach(s => { cityDistribution[s.city] = (cityDistribution[s.city] || 0) + 1; });

  const monthlyActivity = {};
  cdrRecords.forEach(r => {
    const month = r.timestamp.slice(0, 7);
    monthlyActivity[month] = (monthlyActivity[month] || 0) + 1;
  });

  const caseTypeCount = {};
  cases.forEach(c => { caseTypeCount[c.type] = (caseTypeCount[c.type] || 0) + 1; });

  const communitySize = communities.map(c => ({ name: c.name, size: c.members.length, color: c.color }));

  const financialFlows = transactions.map(t => ({
    from: suspects.find(s => s.id === t.from)?.name || t.from,
    to: suspects.find(s => s.id === t.to)?.name || t.to,
    amount: t.amount, type: t.type
  }));

  res.json({ callsByHour, callsByDay, topConnected, cityDistribution, monthlyActivity: Object.entries(monthlyActivity).map(([month, count]) => ({ month, count })).sort((a, b) => a.month.localeCompare(b.month)), caseTypeCount, communitySize, financialFlows });
});

app.get('/api/search', (req, res) => {
  const q = (req.query.q || '').toLowerCase();
  if (!q) return res.json({ suspects: [], cases: [] });
  const matchedSuspects = suspects.filter(s =>
    s.name.toLowerCase().includes(q) || s.aliases.some(a => a.toLowerCase().includes(q)) ||
    s.phone.some(p => p.includes(q)) || s.id.toLowerCase().includes(q)
  ).slice(0, 10);
  const matchedCases = cases.filter(c =>
    c.id.toLowerCase().includes(q) || c.title.toLowerCase().includes(q) || c.type.toLowerCase().includes(q)
  ).slice(0, 5);
  res.json({ suspects: matchedSuspects, cases: matchedCases });
});

app.get('/api/stats', (req, res) => {
  res.json({
    totalSuspects: suspects.length,
    activeCases: cases.filter(c => c.status === 'active').length,
    networkLinks: networkEdges.length,
    alertCount: alerts.filter(a => !a.read).length,
    totalCDR: cdrRecords.length,
    totalTransactions: transactions.length,
  });
});

const PORT = 3001;
app.listen(PORT, () => console.log(`CrimNet API running on http://localhost:${PORT}`));
