import { Database, FileSearch, GitBranch, Brain, Bell } from 'lucide-react'

const steps = [
  { icon: Database, title: 'Collect', titleHi: 'एकत्र करें', description: 'Ingest data from multiple sources — CDR records, bank transactions, FIR databases, vehicle registrations, and location data from cell towers.', color: '#10B981' },
  { icon: FileSearch, title: 'Read', titleHi: 'पढ़ें', description: 'Parse and normalize heterogeneous data formats. Extract entities (people, phones, locations, vehicles) and standardize identifiers across sources.', color: '#14B8A6' },
  { icon: GitBranch, title: 'Connect', titleHi: 'जोड़ें', description: 'Build a multi-relational graph linking suspects through phone calls, financial transfers, shared locations, co-accused in FIRs, and vehicle registrations.', color: '#F59E0B' },
  { icon: Brain, title: 'Analyze', titleHi: 'विश्लेषण', description: 'Apply graph algorithms — community detection (Louvain), centrality analysis (betweenness, PageRank), anomaly detection on temporal call/transaction patterns.', color: '#EF4444' },
  { icon: Bell, title: 'Alert', titleHi: 'अलर्ट', description: 'Generate real-time alerts for unusual patterns — call spikes, new financial links, cross-state connections, encrypted communication shifts, and structured deposits.', color: '#3B82F6' },
]

export default function HowItWorks() {
  return (
    <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">How CrimNet AI Works</h1>
        <p className="text-gray-400">Our 5-step AI pipeline transforms raw law enforcement data into actionable criminal network intelligence.</p>
      </div>

      <div className="relative">
        {steps.map((step, i) => (
          <div key={i} className="flex gap-6 mb-8 last:mb-0">
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center border-2 shrink-0" style={{ borderColor: step.color, background: `${step.color}15` }}>
                <step.icon size={24} style={{ color: step.color }} />
              </div>
              {i < steps.length - 1 && (
                <div className="w-0.5 flex-1 mt-2" style={{ background: `linear-gradient(to bottom, ${step.color}40, ${steps[i + 1].color}40)` }} />
              )}
            </div>
            <div className="pb-4">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full" style={{ background: `${step.color}20`, color: step.color }}>Step {i + 1}</span>
                <h3 className="text-lg font-bold text-white">{step.title}</h3>
                <span className="text-sm text-gray-500">({step.titleHi})</span>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">{step.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-navy-800 rounded-xl border border-navy-700 p-5 mt-8">
        <h3 className="text-sm font-semibold text-white mb-3">Technology Stack</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: 'Graph Engine', value: 'Cytoscape.js', color: '#10B981' },
            { label: 'Community Detection', value: 'Louvain Algorithm', color: '#14B8A6' },
            { label: 'Evidence Integrity', value: 'SHA-256 Hashing', color: '#34D399' },
            { label: 'Data Pipeline', value: 'Real-time Streaming', color: '#F59E0B' },
          ].map(t => (
            <div key={t.label} className="bg-navy-900 rounded-lg p-3 text-center">
              <p className="text-xs text-gray-500 mb-1">{t.label}</p>
              <p className="text-sm font-semibold" style={{ color: t.color }}>{t.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-xl border border-emerald-500/20 p-5 text-center">
        <p className="text-sm text-gray-300">Built for <span className="text-emerald-400 font-semibold">Smart India Hackathon 2026</span></p>
        <p className="text-xs text-gray-500 mt-1">Theme: Blockchain & Cybersecurity — AI-Powered Criminal Network Analysis</p>
      </div>
    </div>
  )
}
