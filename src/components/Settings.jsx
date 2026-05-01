import { useState } from 'react'
import { getAllSessions, exportToCSV } from '../lib/db.js'

export default function Settings() {
  const [exporting, setExporting] = useState(false)
  const [exported, setExported] = useState(false)
  const [sessionCount, setSessionCount] = useState(null)

  async function loadCount() {
    const s = await getAllSessions()
    setSessionCount(s.length)
  }

  useState(() => { loadCount() })

  async function handleExport() {
    setExporting(true)
    try {
      const csv = await exportToCSV()
      const blob = new Blob([csv], { type: 'text/csv' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `lift-sessions-${new Date().toISOString().slice(0, 10)}.csv`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      setExported(true)
      setTimeout(() => setExported(false), 3000)
    } catch (err) {
      alert('Export failed. Try again.')
    } finally {
      setExporting(false)
    }
  }

  return (
    <div className="full-sheet">
      <div className="page-header">
        <h1>Config</h1>
        <div className="subtitle">App settings & data</div>
      </div>

      {/* Athlete Profile */}
      <div className="section-label">Athlete Profile</div>
      <div className="card">
        <ProfileRow label="Age" val="17" />
        <ProfileRow label="Weight" val="72 kg" />
        <ProfileRow label="Height" val="171 cm" />
        <ProfileRow label="Experience" val="Under 6 months" />
        <ProfileRow label="Goal" val="Body Recomp — V-Taper" />
        <ProfileRow label="Daily Calories" val="~2,400 kcal" />
        <ProfileRow label="Protein" val="160g / day" />
      </div>

      {/* Plan Overview */}
      <div className="section-label">Plan Overview</div>
      <div className="card">
        <ProfileRow label="Split" val="PPL 6-day + Home" />
        <ProfileRow label="Priority" val="Chest Width, Lat Width, Side Delts, Abs" />
        <ProfileRow label="Cardio" val="LISS 5–6×/week + HIIT Tuesday" />
        <ProfileRow label="Session Length" val="45–60 min + cardio" />
      </div>

      {/* Supplement Timing Cheat Sheet */}
      <div className="section-label">Supplement Timing</div>
      <div className="card">
        <SupRow time="Morning" supp="Vitamin D3 (3,000 IU) with breakfast" />
        <SupRow time="Pre-workout" supp="Creatine 5g in water or shake" />
        <SupRow time="Post-workout" supp="Whey protein 25–30g if needed" />
        <SupRow time="With dinner" supp="Zinc 30mg · Omega-3 2–3g" />
        <SupRow time="Before bed" supp="Magnesium Glycinate 400mg · Melatonin 0.5–1mg" />
        <SupRow time="Daily" supp="Selenium 55–100mcg with any meal" />
      </div>

      {/* Data */}
      <div className="section-label">Data</div>
      <div className="card">
        <div className="settings-row">
          <div>
            <div className="settings-label">Sessions Logged</div>
            <div className="settings-desc">{sessionCount !== null ? `${sessionCount} sessions stored locally` : 'Loading...'}</div>
          </div>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 22, fontWeight: 700, color: 'var(--accent)' }}>
            {sessionCount ?? '—'}
          </span>
        </div>
        <div className="settings-row">
          <div>
            <div className="settings-label">Storage</div>
            <div className="settings-desc">All data is on your device (IndexedDB). No cloud sync.</div>
          </div>
          <span style={{ fontSize: 18 }}>📱</span>
        </div>
        <div style={{ padding: '12px 0 4px' }}>
          <button
            className="btn btn-ghost"
            onClick={handleExport}
            disabled={exporting}
            style={{ opacity: exporting ? 0.6 : 1 }}
          >
            {exported ? '✓ CSV EXPORTED' : exporting ? 'EXPORTING...' : 'EXPORT TO CSV'}
          </button>
        </div>
      </div>

      {/* PWA install tip */}
      <div className="section-label">Install as App</div>
      <div className="card">
        <div style={{ fontSize: 13, color: 'var(--text-dim)', lineHeight: 1.6 }}>
          <strong style={{ color: 'var(--text)' }}>iOS:</strong> Safari → Share → "Add to Home Screen"
          <br /><br />
          <strong style={{ color: 'var(--text)' }}>Android:</strong> Chrome → menu (⋮) → "Add to Home Screen"
          <br /><br />
          Once installed, the app works <strong style={{ color: 'var(--accent)' }}>completely offline</strong>. No WiFi needed at the gym.
        </div>
      </div>

      {/* Progressive Overload Reminder */}
      <div className="section-label">Progressive Overload Rules</div>
      <div className="card">
        {[
          'Hit the top of your rep range for ALL sets → add weight next session',
          'Add 1–2 kg for isolation exercises, 2.5–5 kg for compounds',
          'If you miss reps: stay at same weight until you hit them all',
          'Log every session — no memory, only data',
          'RPE 7–8 = hard but 2 reps left. Never grind to failure as a beginner',
        ].map((rule, i) => (
          <div key={i} style={{ display: 'flex', gap: 10, padding: '8px 0', borderBottom: i < 4 ? '1px solid var(--border)' : 'none' }}>
            <div style={{ color: 'var(--accent)', fontFamily: 'var(--mono)', fontWeight: 700, fontSize: 12, flexShrink: 0, marginTop: 1 }}>
              0{i + 1}
            </div>
            <div style={{ fontSize: 13, color: 'var(--text-dim)', lineHeight: 1.5 }}>{rule}</div>
          </div>
        ))}
      </div>

      <div style={{ height: 24 }} />
    </div>
  )
}

function ProfileRow({ label, val }) {
  return (
    <div className="settings-row">
      <div className="settings-label">{label}</div>
      <div style={{ fontSize: 13, color: 'var(--accent)', fontFamily: 'var(--mono)', fontWeight: 700 }}>{val}</div>
    </div>
  )
}

function SupRow({ time, supp }) {
  return (
    <div style={{ padding: '9px 0', borderBottom: '1px solid var(--border)', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
      <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--info)', minWidth: 80, flexShrink: 0, paddingTop: 1 }}>
        {time}
      </div>
      <div style={{ fontSize: 13, color: 'var(--text-dim)' }}>{supp}</div>
    </div>
  )
}
