import { useState, useEffect } from 'react'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts'
import { getAllSessions, getExerciseHistory, calcOneRepMax } from '../lib/db.js'
import { WORKOUT_PLAN } from '../data/workoutPlan.js'

const ALL_EXERCISES = WORKOUT_PLAN.days.flatMap((d) => d.exercises)

const CHART_COLORS = {
  weight: '#a3e635',
  reps: '#38bdf8',
  orm: '#f59e0b',
}

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 6, padding: '8px 12px', fontSize: 12 }}>
      <div style={{ color: 'var(--text-muted)', marginBottom: 4 }}>{label}</div>
      {payload.map((p) => (
        <div key={p.dataKey} style={{ color: p.color, fontFamily: 'var(--mono)', fontWeight: 700 }}>
          {p.name}: {p.value}
        </div>
      ))}
    </div>
  )
}

export default function Analytics() {
  const [sessions, setSessions] = useState([])
  const [selectedExId, setSelectedExId] = useState(ALL_EXERCISES[0]?.id || '')
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAllSessions().then((s) => {
      setSessions(s)
      setLoading(false)
    })
  }, [])

  useEffect(() => {
    if (!selectedExId) return
    getExerciseHistory(selectedExId).then((h) => setHistory(h))
  }, [selectedExId, sessions])

  if (loading) {
    return (
      <div className="full-sheet">
        <div className="page-header"><h1>Analytics</h1></div>
        <div className="empty-state"><div className="icon">⏳</div><p>Loading...</p></div>
      </div>
    )
  }

  if (sessions.length === 0) {
    return (
      <div className="full-sheet">
        <div className="page-header"><h1>Analytics</h1></div>
        <div className="empty-state">
          <div className="icon">📈</div>
          <h3>No data yet</h3>
          <p>Complete a few sessions to see your progress charts and PR tracker here.</p>
        </div>
      </div>
    )
  }

  // Build chart data from history
  const chartData = history.map((h) => {
    const maxWeight = h.maxWeight
    const totalReps = h.totalReps
    const orm = calcOneRepMax(maxWeight, h.sets[0]?.reps || 1)
    return {
      date: new Date(h.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }),
      'Max kg': maxWeight || 0,
      'Total reps': totalReps || 0,
      '1RM est.': orm || 0,
    }
  })

  // All-time PRs
  const pr = history.reduce(
    (best, h) => ({
      weight: Math.max(best.weight, h.maxWeight),
      reps: Math.max(best.reps, h.totalReps),
      orm: Math.max(best.orm, calcOneRepMax(h.maxWeight, h.sets[0]?.reps || 1)),
    }),
    { weight: 0, reps: 0, orm: 0 }
  )

  // Weekly summary
  const weekSessions = sessions.filter((s) => {
    const diff = Date.now() - new Date(s.date).getTime()
    return diff < 7 * 24 * 60 * 60 * 1000
  })
  const weekSets = weekSessions.reduce(
    (sum, s) => sum + (s.exercises?.reduce((x, e) => x + e.sets.filter((st) => st.completed).length, 0) || 0),
    0
  )

  const selectedEx = ALL_EXERCISES.find((e) => e.id === selectedExId)

  return (
    <div className="full-sheet">
      <div className="page-header">
        <h1>Analytics</h1>
        <div className="subtitle">{sessions.length} sessions logged</div>
      </div>

      {/* Weekly summary */}
      <div className="section-label">This Week</div>
      <div className="card" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
        <MiniStat label="Sessions" val={weekSessions.length} />
        <MiniStat label="Sets" val={weekSets} />
        <MiniStat label="All-time" val={sessions.length} unit="sess." />
      </div>

      {/* Exercise selector */}
      <div className="section-label">Exercise Progress</div>
      <div style={{ padding: '0 16px 12px' }}>
        <select
          className="select-field"
          value={selectedExId}
          onChange={(e) => setSelectedExId(e.target.value)}
        >
          {WORKOUT_PLAN.days.map((day) => (
            <optgroup key={day.id} label={`Day ${day.id} — ${day.name}`}>
              {day.exercises.map((ex) => (
                <option key={ex.id} value={ex.id}>{ex.name}</option>
              ))}
            </optgroup>
          ))}
        </select>
      </div>

      {history.length === 0 ? (
        <div className="empty-state" style={{ paddingTop: 24 }}>
          <div className="icon" style={{ fontSize: 28 }}>🎯</div>
          <h3 style={{ fontSize: 14 }}>No data for this exercise</h3>
          <p>Log a set with weight and reps to see charts.</p>
        </div>
      ) : (
        <>
          {/* PR Cards */}
          <div className="card" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, margin: '0 16px 12px' }}>
            <PRCard label="Best Weight" val={pr.weight} unit="kg" />
            <PRCard label="Est. 1RM" val={pr.orm} unit="kg" />
            <PRCard label="Most Reps" val={pr.reps} unit="" />
          </div>

          {/* Weight chart */}
          {chartData.length > 1 && (
            <div className="chart-container">
              <h3>Weight Over Time</h3>
              <ResponsiveContainer width="100%" height={180}>
                <LineChart data={chartData} margin={{ top: 4, right: 8, left: -20, bottom: 4 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
                  <XAxis dataKey="date" tick={{ fill: '#6b7280', fontSize: 10 }} />
                  <YAxis tick={{ fill: '#6b7280', fontSize: 10 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="Max kg"
                    stroke={CHART_COLORS.weight}
                    strokeWidth={2}
                    dot={{ fill: CHART_COLORS.weight, r: 3 }}
                    activeDot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* 1RM chart */}
          {chartData.length > 1 && (
            <div className="chart-container">
              <h3>Estimated 1RM</h3>
              <ResponsiveContainer width="100%" height={180}>
                <LineChart data={chartData} margin={{ top: 4, right: 8, left: -20, bottom: 4 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
                  <XAxis dataKey="date" tick={{ fill: '#6b7280', fontSize: 10 }} />
                  <YAxis tick={{ fill: '#6b7280', fontSize: 10 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="1RM est."
                    stroke={CHART_COLORS.orm}
                    strokeWidth={2}
                    dot={{ fill: CHART_COLORS.orm, r: 3 }}
                    activeDot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Recent sessions for this exercise */}
          <div className="section-label">Recent — {selectedEx?.name}</div>
          {history.slice(-5).reverse().map((h, i) => (
            <div key={i} className="card" style={{ margin: '0 16px 8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                  {new Date(h.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                </div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 13, color: 'var(--accent)', fontWeight: 700 }}>
                  {h.maxWeight ? `${h.maxWeight} kg` : '—'} peak
                </div>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {h.sets.map((s, si) => (
                  <div
                    key={si}
                    style={{
                      background: 'var(--surface)',
                      border: '1px solid var(--border)',
                      borderRadius: 4,
                      padding: '3px 8px',
                      fontSize: 12,
                      fontFamily: 'var(--mono)',
                    }}
                  >
                    {s.weight ? `${s.weight}kg` : '—'} × {s.reps || '—'}
                    {s.rpe ? ` @${s.rpe}` : ''}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </>
      )}
      <div style={{ height: 16 }} />
    </div>
  )
}

function MiniStat({ label, val, unit }) {
  return (
    <div style={{ textAlign: 'center', background: 'var(--surface)', borderRadius: 6, padding: '10px 4px', border: '1px solid var(--border)' }}>
      <div style={{ fontFamily: 'var(--mono)', fontSize: 22, fontWeight: 700, color: 'var(--accent)' }}>{val}</div>
      {unit && <div style={{ fontSize: 9, color: 'var(--text-muted)', fontWeight: 600 }}>{unit}</div>}
      <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-muted)', marginTop: 2 }}>{label}</div>
    </div>
  )
}

function PRCard({ label, val, unit }) {
  return (
    <div style={{ textAlign: 'center', background: 'rgba(163,230,53,0.06)', borderRadius: 6, padding: '10px 4px', border: '1px solid rgba(163,230,53,0.2)' }}>
      <div style={{ fontFamily: 'var(--mono)', fontSize: 20, fontWeight: 700, color: 'var(--accent)' }}>
        {val}{unit}
      </div>
      <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--accent)', opacity: 0.7, marginTop: 2 }}>{label}</div>
    </div>
  )
}
