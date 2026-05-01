import { useState, useCallback, useRef } from 'react'
import RestTimer from './RestTimer.jsx'
import { saveSession } from '../lib/db.js'

function generateId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

function initLogs(exercises) {
  return exercises.map((ex) => ({
    exerciseId: ex.id,
    exerciseName: ex.name,
    sets: Array.from({ length: ex.sets }, () => ({
      weight: '',
      reps: '',
      rpe: '',
      completed: false,
    })),
  }))
}

export default function WorkoutSession({ template, onEnd }) {
  const [logs, setLogs] = useState(() => initLogs(template.exercises))
  const [currentExIdx, setCurrentExIdx] = useState(0)
  const [expandedEx, setExpandedEx] = useState(0)
  const [timer, setTimer] = useState(null)
  const [notes, setNotes] = useState('')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const startTime = useRef(Date.now())

  const currentTemplate = template.exercises[currentExIdx]
  const currentLog = logs[currentExIdx]

  const completedSets = logs.reduce(
    (sum, l) => sum + l.sets.filter((s) => s.completed).length,
    0
  )
  const totalSets = logs.reduce((sum, l) => sum + l.sets.length, 0)
  const progress = totalSets > 0 ? (completedSets / totalSets) * 100 : 0

  const updateSet = useCallback((exIdx, setIdx, field, value) => {
    setLogs((prev) => {
      const next = prev.map((l, i) => {
        if (i !== exIdx) return l
        return {
          ...l,
          sets: l.sets.map((s, si) => (si === setIdx ? { ...s, [field]: value } : s)),
        }
      })
      return next
    })
  }, [])

  const completeSet = useCallback(
    (exIdx, setIdx) => {
      setLogs((prev) => {
        const next = prev.map((l, i) => {
          if (i !== exIdx) return l
          return {
            ...l,
            sets: l.sets.map((s, si) => (si === setIdx ? { ...s, completed: true } : s)),
          }
        })
        return next
      })
      if (navigator.vibrate) navigator.vibrate([30, 10, 30])
      const ex = template.exercises[exIdx]
      setTimer({ seconds: ex.restSeconds, exerciseName: ex.name })
    },
    [template.exercises]
  )

  const handleSave = async () => {
    setSaving(true)
    const duration = Math.floor((Date.now() - startTime.current) / 1000)
    const session = {
      id: generateId(),
      date: new Date().toISOString(),
      templateId: template.id,
      dayName: `Day ${template.id} — ${template.name}`,
      duration,
      notes,
      exercises: logs,
    }
    try {
      await saveSession(session)
      setSaved(true)
      if (navigator.vibrate) navigator.vibrate([50, 30, 50, 30, 100])
      setTimeout(onEnd, 1600)
    } catch (err) {
      console.error('Save failed', err)
      setSaving(false)
    }
  }

  if (saved) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: 16, padding: 32 }}>
        <div style={{ fontSize: 48 }}>✅</div>
        <div style={{ fontSize: 22, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '-0.5px', textAlign: 'center' }}>Session Saved</div>
        <div style={{ color: 'var(--text-muted)', fontSize: 14, textAlign: 'center' }}>
          {completedSets} sets logged. Check your history.
        </div>
      </div>
    )
  }

  return (
    <div className="full-sheet">
      {/* Timer overlay */}
      {timer && (
        <RestTimer
          key={timer.seconds + timer.exerciseName}
          seconds={timer.seconds}
          exerciseName={timer.exerciseName}
          onDone={() => setTimer(null)}
          onSkip={() => setTimer(null)}
        />
      )}

      {/* Header */}
      <div className="session-header">
        <button
          className="btn btn-ghost btn-sm"
          style={{ width: 'auto', padding: '6px 10px', flexShrink: 0 }}
          onClick={() => { if (confirm('End workout without saving?')) onEnd() }}
        >
          ✕
        </button>
        <div style={{ flex: 1 }}>
          <div className="session-header" style={{ padding: 0, border: 'none', background: 'none', position: 'static', display: 'block' }}>
            <div style={{ fontSize: 15, fontWeight: 800, letterSpacing: '-0.3px' }}>
              Day {template.id} — {template.name}
            </div>
            <div className="session-subtitle">{template.subtitle}</div>
          </div>
        </div>
        <div style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--accent)', fontWeight: 700, flexShrink: 0 }}>
          {completedSets}/{totalSets}
        </div>
      </div>

      {/* Progress bar */}
      <div className="progress-bar" style={{ margin: '0 0 0 0', borderRadius: 0, height: 3 }}>
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>

      {/* Exercise list */}
      {template.exercises.map((ex, exIdx) => {
        const log = logs[exIdx]
        const isExpanded = expandedEx === exIdx
        const exCompleted = log.sets.every((s) => s.completed)
        const exSetsCompleted = log.sets.filter((s) => s.completed).length

        return (
          <div key={ex.id} style={{ margin: '12px 16px 0' }}>
            {/* Exercise header */}
            <button
              onClick={() => {
                setExpandedEx(isExpanded ? -1 : exIdx)
                setCurrentExIdx(exIdx)
              }}
              style={{
                width: '100%',
                background: exCompleted ? 'rgba(139,0,0,0.10)' : 'var(--card)',
                border: `1px solid ${exCompleted ? 'var(--accent)' : isExpanded ? 'var(--accent-dim)' : 'var(--border)'}`,
                borderRadius: isExpanded ? '8px 8px 0 0' : 8,
                padding: '12px 14px',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'border-color 0.15s, background 0.15s',
              }}
            >
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 14,
                  background: exCompleted ? 'var(--accent)' : 'var(--surface)',
                  border: `2px solid ${exCompleted ? 'var(--accent)' : 'var(--border)'}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 12,
                  fontWeight: 900,
                  color: exCompleted ? '#fff' : 'var(--text-muted)',
                  flexShrink: 0,
                  fontFamily: 'var(--mono)',
                }}
              >
                {exCompleted ? '✓' : exIdx + 1}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: exCompleted ? 'var(--accent)' : 'var(--text)' }}>
                  {ex.name}
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 1 }}>
                  <span className="mono">{ex.sets}×{ex.repsRange}</span>
                  {'  ·  '}RPE {ex.targetRPE}
                  {'  ·  '}
                  <span style={{ color: exSetsCompleted > 0 ? 'var(--accent)' : 'inherit' }}>
                    {exSetsCompleted}/{ex.sets} done
                  </span>
                </div>
              </div>
              <span style={{ color: 'var(--text-muted)', fontSize: 12, flexShrink: 0 }}>
                {isExpanded ? '▲' : '▼'}
              </span>
            </button>

            {/* Expanded set logging */}
            {isExpanded && (
              <div
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderTop: 'none',
                  borderRadius: '0 0 8px 8px',
                  padding: 14,
                }}
              >
                {/* Execution cues */}
                <div className="cues-panel">
                  <div className="cues-label">Execution Cues</div>
                  <div className="cues-text">{ex.cues}</div>
                </div>

                {/* Last performance if available */}
                <div style={{ marginBottom: 12 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 6 }}>
                    Sets  ·  {ex.restSeconds}s REST between sets
                  </div>

                  {log.sets.map((set, setIdx) => (
                    <SetRow
                      key={setIdx}
                      setIdx={setIdx}
                      set={set}
                      completed={set.completed}
                      onChange={(field, val) => updateSet(exIdx, setIdx, field, val)}
                      onComplete={() => completeSet(exIdx, setIdx)}
                    />
                  ))}
                </div>

                {/* Next exercise button */}
                {exIdx < template.exercises.length - 1 && (
                  <button
                    className="btn btn-ghost"
                    style={{ marginTop: 4 }}
                    onClick={() => {
                      setExpandedEx(exIdx + 1)
                      setCurrentExIdx(exIdx + 1)
                    }}
                  >
                    NEXT: {template.exercises[exIdx + 1].name} →
                  </button>
                )}
              </div>
            )}
          </div>
        )
      })}

      {/* Notes */}
      <div style={{ margin: '16px 16px 0' }}>
        <div className="card-label">Session Notes</div>
        <textarea
          className="notes-field"
          placeholder="Form notes, how you felt, PRs hit..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>

      {/* Save button */}
      <div style={{ padding: '16px 16px 24px' }}>
        <button
          className="btn btn-accent"
          onClick={handleSave}
          disabled={saving}
          style={{ opacity: saving ? 0.6 : 1 }}
        >
          {saving ? 'SAVING...' : `FINISH & SAVE (${completedSets}/${totalSets} SETS)`}
        </button>
      </div>
    </div>
  )
}

function SetRow({ setIdx, set, completed, onChange, onComplete }) {
  return (
    <div className={`set-row${completed ? ' completed' : ''}`}>
      <div className="set-header">
        <span className={`set-number${completed ? ' completed' : ''}`}>
          SET {setIdx + 1} {completed && '✓'}
        </span>
        {!completed && (
          <button
            className="check-btn"
            onClick={onComplete}
            disabled={!set.weight && !set.reps}
            style={{ opacity: !set.weight && !set.reps ? 0.4 : 1 }}
            aria-label="Mark set complete"
          >
            ✓
          </button>
        )}
      </div>
      <div className="input-row">
        <div className="input-group">
          <label>Weight (kg)</label>
          <input
            type="number"
            className="input-field"
            placeholder="0"
            value={set.weight}
            onChange={(e) => onChange('weight', e.target.value)}
            disabled={completed}
            inputMode="decimal"
            min="0"
            step="0.5"
          />
        </div>
        <div className="input-group">
          <label>Reps</label>
          <input
            type="number"
            className="input-field"
            placeholder="0"
            value={set.reps}
            onChange={(e) => onChange('reps', e.target.value)}
            disabled={completed}
            inputMode="numeric"
            min="0"
          />
        </div>
        <div className="input-group">
          <label>RPE</label>
          <input
            type="number"
            className="input-field"
            placeholder="7"
            value={set.rpe}
            onChange={(e) => onChange('rpe', e.target.value)}
            disabled={completed}
            inputMode="numeric"
            min="1"
            max="10"
          />
        </div>
      </div>
    </div>
  )
}
