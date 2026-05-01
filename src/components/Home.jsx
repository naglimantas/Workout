import { useState } from 'react'
import { WORKOUT_PLAN, getTodayTemplate } from '../data/workoutPlan.js'

export default function Home({ onStartWorkout }) {
  const today = getTodayTemplate()
  const [selectedDay, setSelectedDay] = useState(today.id)

  const selectedTemplate = WORKOUT_PLAN.days.find((d) => d.id === selectedDay) || today

  const totalSets = selectedTemplate.exercises.reduce((sum, ex) => sum + ex.sets, 0)

  return (
    <div className="full-sheet">
      <div className="page-header">
        <h1>LIFT</h1>
        <div className="subtitle">V-Taper Protocol — Body Recomp</div>
      </div>

      {/* Day Selector */}
      <div className="section-label">Select Day</div>
      <div style={{ overflowX: 'auto', paddingBottom: 4 }}>
        <div style={{ display: 'flex', gap: 8, padding: '0 16px 12px', minWidth: 'max-content' }}>
          {WORKOUT_PLAN.days.map((day) => (
            <button
              key={day.id}
              onClick={() => setSelectedDay(day.id)}
              style={{
                background: selectedDay === day.id ? 'var(--accent)' : 'var(--card)',
                color: selectedDay === day.id ? '#000' : 'var(--text)',
                border: `1px solid ${selectedDay === day.id ? 'var(--accent)' : 'var(--border)'}`,
                borderRadius: 6,
                padding: '6px 14px',
                fontSize: 12,
                fontWeight: 700,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                letterSpacing: '0.04em',
              }}
            >
              <div style={{ fontSize: 10, opacity: 0.8, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                {day.dayOfWeek.slice(0, 3)}
              </div>
              {day.name}
            </button>
          ))}
        </div>
      </div>

      {/* Template Overview Card */}
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
          <div>
            <div style={{ fontSize: 18, fontWeight: 800, letterSpacing: '-0.3px' }}>
              Day {selectedTemplate.id} — {selectedTemplate.name}
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>
              {selectedTemplate.subtitle}
            </div>
          </div>
          <span className={`badge ${selectedTemplate.isHome ? 'badge-home' : 'badge-accent'}`}>
            {selectedTemplate.isHome ? 'HOME' : 'GYM'}
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 14 }}>
          <StatBox label="Day" val={selectedTemplate.dayOfWeek.slice(0, 3)} />
          <StatBox label="Exercises" val={selectedTemplate.exercises.length} />
          <StatBox label="Total Sets" val={totalSets} />
        </div>

        <button className="btn btn-accent" onClick={() => onStartWorkout(selectedTemplate)}>
          START WORKOUT
        </button>
      </div>

      {/* Cardio Block */}
      {selectedTemplate.cardio && (
        <div className="cardio-panel">
          <div className="cardio-header">
            <span className="cardio-title">
              {selectedTemplate.cardio.type} Cardio
            </span>
            <span className="badge badge-muted">{selectedTemplate.cardio.timing}</span>
          </div>
          <div className="cardio-stats">
            {selectedTemplate.cardio.tool === 'Incline Treadmill' ? (
              <>
                <CardioStat val={selectedTemplate.cardio.incline} label="Incline" />
                <CardioStat val={selectedTemplate.cardio.speed} label="Speed" />
                <CardioStat val={selectedTemplate.cardio.duration} label="Duration" />
              </>
            ) : (
              <>
                <CardioStat val={selectedTemplate.cardio.tool} label="Tool" />
                <CardioStat val={selectedTemplate.cardio.protocol || '—'} label="Protocol" />
                <CardioStat val={selectedTemplate.cardio.duration} label="Duration" />
              </>
            )}
          </div>
          <div className="cardio-note">{selectedTemplate.cardio.note}</div>
        </div>
      )}

      {/* Exercise Preview */}
      <div className="section-label">Exercise Overview</div>
      <div className="card">
        {selectedTemplate.exercises.map((ex) => (
          <div key={ex.id} className="exercise-row">
            <div style={{ flex: 1 }}>
              <div className="exercise-name">{ex.name}</div>
              <div className="exercise-meta">
                <span className="mono">{ex.sets}×{ex.repsRange}</span>
                {'  ·  '}{ex.restSeconds}s rest{'  ·  '}RPE {ex.targetRPE}
              </div>
            </div>
            <span className="exercise-muscle">{ex.muscleGroup}</span>
          </div>
        ))}
      </div>

      <div style={{ height: 16 }} />
    </div>
  )
}

function StatBox({ label, val }) {
  return (
    <div style={{ textAlign: 'center', background: 'var(--surface)', borderRadius: 6, padding: '10px 4px', border: '1px solid var(--border)' }}>
      <div style={{ fontFamily: 'var(--mono)', fontSize: 20, fontWeight: 700, color: 'var(--accent)' }}>{val}</div>
      <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)', marginTop: 2 }}>{label}</div>
    </div>
  )
}

function CardioStat({ val, label }) {
  return (
    <div className="cardio-stat">
      <div className="val" style={{ fontSize: 14 }}>{val}</div>
      <div className="key">{label}</div>
    </div>
  )
}
