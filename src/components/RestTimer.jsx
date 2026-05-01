import { useState, useEffect, useRef, useCallback } from 'react'

export default function RestTimer({ seconds, exerciseName, onDone, onSkip }) {
  const [remaining, setRemaining] = useState(seconds)
  const intervalRef = useRef(null)
  const audioCtxRef = useRef(null)

  const playBeep = useCallback((freq = 880, duration = 120) => {
    try {
      if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') {
        audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)()
      }
      const ctx = audioCtxRef.current
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.frequency.setValueAtTime(freq, ctx.currentTime)
      gain.gain.setValueAtTime(0.3, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration / 1000)
      osc.start(ctx.currentTime)
      osc.stop(ctx.currentTime + duration / 1000)
    } catch (_) {}
  }, [])

  const vibrate = useCallback((pattern) => {
    if (navigator.vibrate) navigator.vibrate(pattern)
  }, [])

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current)
          playBeep(1047, 200)
          playBeep(1175, 200)
          vibrate([100, 50, 100, 50, 200])
          setTimeout(onDone, 300)
          return 0
        }
        if (prev === 4) {
          playBeep(660, 80)
          vibrate([40])
        }
        if (prev === 3 || prev === 2) {
          playBeep(660, 80)
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(intervalRef.current)
  }, [onDone, playBeep, vibrate])

  const mins = Math.floor(remaining / 60)
  const secs = remaining % 60
  const display = `${mins}:${String(secs).padStart(2, '0')}`
  const pct = ((seconds - remaining) / seconds) * 100
  const urgent = remaining <= 10

  return (
    <div className="rest-timer-overlay" role="dialog" aria-modal="true" aria-label="Rest timer">
      <div className="rest-timer-card">
        <div className="timer-label">REST</div>
        <div className={`timer-display${urgent ? ' urgent' : ''}`}>{display}</div>
        <div className="timer-exercise">{exerciseName}</div>

        <div className="progress-bar" style={{ width: '100%', marginBottom: 20 }}>
          <div className="progress-fill" style={{ width: `${pct}%` }} />
        </div>

        <div className="timer-actions">
          <button className="btn btn-ghost btn-sm" style={{ flex: 1 }} onClick={onSkip}>
            SKIP
          </button>
          <button className="btn btn-accent btn-sm" style={{ flex: 1 }} onClick={onDone}>
            DONE
          </button>
        </div>
      </div>
    </div>
  )
}
