import { useState, useEffect } from 'react'
import { getAllSessions, deleteSession } from '../lib/db.js'

function formatDuration(secs) {
  const m = Math.floor(secs / 60)
  const s = secs % 60
  return `${m}m ${s}s`
}

function formatDate(iso) {
  const d = new Date(iso)
  const now = new Date()
  const diff = now - d
  const days = Math.floor(diff / 86400000)
  if (days === 0) return 'Today'
  if (days === 1) return 'Yesterday'
  if (days < 7) return `${days} days ago`
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

export default function History() {
  const [sessions, setSessions] = useState([])
  const [loading, setLoading] = useState(true)
  const [expanded, setExpanded] = useState(null)

  async function load() {
    const s = await getAllSessions()
    setSessions(s)
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  async function handleDelete(id, e) {
    e.stopPropagation()
    if (!confirm('Delete this session?')) return
    await deleteSession(id)
    setSessions((prev) => prev.filter((s) => s.id !== id))
  }

  if (loading) return <LoadingState />

  if (sessions.length === 0) {
    return (
      <div className="full-sheet">
        <div className="page-header"><h1>Session Log</h1></div>
        <div className="empty-state">
          <div className="icon">📋</div>
          <h3>No sessions yet</h3>
          <p>Start your first workout from the Home tab. Every rep gets logged here.</p>
        </div>
      </div>
    )
  }

  const totalSets = sessions.reduce(
    (sum, s) => sum + (s.exercises?.reduce((x, e) => x + e.sets.filter((set) => set.completed).length, 0) || 0),
    0
  )

  return (
    <div className="full-sheet">
      <div className="page-header">
        <h1>Session Log</h1>
        <div className="subtitle">{sessions.length} sessions · {totalSets} total sets</div>
      </div>

      {sessions.map((session) => {
        const completedSets = session.exercises?.reduce(
          (sum, e) => sum + e.sets.filter((s) => s.completed).length,
          0
        ) || 0
        const isExpanded = expanded === session.id

        return (
          <div key={session.id}>
            <div
              className="session-item"
              onClick={() => setExpanded(isExpanded ? null : session.id)}
              role="button"
              tabIndex={0}
            >
              <div className="session-date">{formatDate(session.date)} · {new Date(session.date).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}</div>
              <div className="session-day-name">{session.dayName}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div className="session-stats">
                  <div className="session-stat">Sets: <span>{completedSets}</span></div>
                  {session.duration > 0 && (
                    <div className="session-stat">Time: <span>{formatDuration(session.duration)}</span></div>
                  )}
                </div>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={(e) => handleDelete(session.id, e)}
                  style={{ padding: '4px 10px', fontSize: 11 }}
                >
                  DEL
                </button>
              </div>

              {isExpanded && (
                <div style={{ marginTop: 14, borderTop: '1px solid var(--border)', paddingTop: 12 }}>
                  {session.exercises?.map((ex) => {
                    const done = ex.sets.filter((s) => s.completed)
                    if (done.length === 0) return null
                    return (
                      <div key={ex.exerciseId} style={{ marginBottom: 10 }}>
                        <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>
                          {ex.exerciseName}
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                          {done.map((s, i) => (
                            <div
                              key={i}
                              style={{
                                background: 'var(--surface)',
                                border: '1px solid var(--border)',
                                borderRadius: 4,
                                padding: '4px 8px',
                                fontSize: 12,
                                fontFamily: 'var(--mono)',
                                color: 'var(--text)',
                              }}
                            >
                              {s.weight ? `${s.weight}kg` : '—'} × {s.reps || '—'}
                              {s.rpe ? ` @${s.rpe}` : ''}
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  })}
                  {session.notes && (
                    <div style={{ marginTop: 8, padding: '8px 10px', background: 'var(--surface)', borderRadius: 5, border: '1px solid var(--border)', fontSize: 13, color: 'var(--text-dim)' }}>
                      "{session.notes}"
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )
      })}
      <div style={{ height: 16 }} />
    </div>
  )
}

function LoadingState() {
  return (
    <div className="full-sheet">
      <div className="page-header"><h1>Session Log</h1></div>
      <div className="empty-state">
        <div className="icon" style={{ fontSize: 24 }}>⏳</div>
        <p>Loading sessions...</p>
      </div>
    </div>
  )
}
