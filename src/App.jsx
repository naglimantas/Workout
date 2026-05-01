import { useState } from 'react'
import Home from './components/Home.jsx'
import WorkoutSession from './components/WorkoutSession.jsx'
import History from './components/History.jsx'
import Analytics from './components/Analytics.jsx'
import Settings from './components/Settings.jsx'

const TABS = [
  { id: 'home', label: 'HOME', icon: '⚡' },
  { id: 'history', label: 'LOG', icon: '📋' },
  { id: 'analytics', label: 'STATS', icon: '📈' },
  { id: 'settings', label: 'CONFIG', icon: '⚙' },
]

export default function App() {
  const [activeTab, setActiveTab] = useState('home')
  const [activeSession, setActiveSession] = useState(null)

  function startWorkout(template) {
    setActiveSession(template)
  }

  function endWorkout() {
    setActiveSession(null)
    setActiveTab('home')
  }

  if (activeSession) {
    return <WorkoutSession template={activeSession} onEnd={endWorkout} />
  }

  return (
    <div className="app">
      <div className="tab-content">
        {activeTab === 'home' && <Home onStartWorkout={startWorkout} />}
        {activeTab === 'history' && <History />}
        {activeTab === 'analytics' && <Analytics />}
        {activeTab === 'settings' && <Settings />}
      </div>

      <nav className="bottom-nav" role="navigation" aria-label="Main navigation">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            className={`nav-btn${activeTab === tab.id ? ' active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
            aria-current={activeTab === tab.id ? 'page' : undefined}
          >
            <span className="nav-icon">{tab.icon}</span>
            <span className="nav-label">{tab.label}</span>
          </button>
        ))}
      </nav>
    </div>
  )
}
