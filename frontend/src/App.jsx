import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import NetworkGraph from './pages/NetworkGraph'
import Suspects from './pages/Suspects'
import SuspectDetail from './pages/SuspectDetail'
import Cases from './pages/Cases'
import CaseDetail from './pages/CaseDetail'
import Analytics from './pages/Analytics'
import Alerts from './pages/Alerts'
import EvidenceTrail from './pages/EvidenceTrail'
import HowItWorks from './pages/HowItWorks'

const labels = {
  en: { dashboard: 'Dashboard', network: 'Network Graph', suspects: 'Suspects', cases: 'Cases', analytics: 'Analytics', alerts: 'Alerts', evidence: 'Evidence Trail', howItWorks: 'How It Works', search: 'Search suspects, cases, phone numbers...', demo: 'DEMO MODE — All data is fictional' },
  hi: { dashboard: 'डैशबोर्ड', network: 'नेटवर्क ग्राफ', suspects: 'संदिग्ध', cases: 'मामले', analytics: 'विश्लेषण', alerts: 'अलर्ट', evidence: 'साक्ष्य ट्रेल', howItWorks: 'कैसे काम करता है', search: 'संदिग्ध, मामले, फ़ोन नंबर खोजें...', demo: 'डेमो मोड — सभी डेटा काल्पनिक है' }
}

export default function App() {
  const [lang, setLang] = useState('en')
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const t = labels[lang]

  return (
    <div className="flex h-screen overflow-hidden bg-navy-900">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} t={t} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header t={t} lang={lang} setLang={setLang} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Routes>
            <Route path="/" element={<Dashboard t={t} />} />
            <Route path="/network" element={<NetworkGraph />} />
            <Route path="/suspects" element={<Suspects />} />
            <Route path="/suspects/:id" element={<SuspectDetail />} />
            <Route path="/cases" element={<Cases />} />
            <Route path="/cases/:id" element={<CaseDetail />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/evidence" element={<EvidenceTrail />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}
