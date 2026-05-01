import { openDB } from 'idb'

const DB_NAME = 'LiftDB'
const DB_VERSION = 1

let dbPromise = null

function getDB() {
  if (!dbPromise) {
    dbPromise = openDB(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('sessions')) {
          const store = db.createObjectStore('sessions', { keyPath: 'id' })
          store.createIndex('date', 'date')
          store.createIndex('templateId', 'templateId')
        }
        if (!db.objectStoreNames.contains('settings')) {
          db.createObjectStore('settings', { keyPath: 'key' })
        }
      },
    })
  }
  return dbPromise
}

export async function saveSession(session) {
  const db = await getDB()
  await db.put('sessions', session)
}

export async function getAllSessions() {
  const db = await getDB()
  const sessions = await db.getAll('sessions')
  return sessions.sort((a, b) => new Date(b.date) - new Date(a.date))
}

export async function getSessionById(id) {
  const db = await getDB()
  return db.get('sessions', id)
}

export async function deleteSession(id) {
  const db = await getDB()
  await db.delete('sessions', id)
}

export async function getExerciseHistory(exerciseId) {
  const db = await getDB()
  const sessions = await db.getAll('sessions')
  const results = []
  sessions.forEach((session) => {
    const ex = session.exercises?.find((e) => e.exerciseId === exerciseId)
    if (ex) {
      const completedSets = ex.sets.filter((s) => s.completed)
      if (completedSets.length > 0) {
        const maxWeight = Math.max(...completedSets.map((s) => Number(s.weight) || 0))
        const totalReps = completedSets.reduce((sum, s) => sum + (Number(s.reps) || 0), 0)
        results.push({
          date: session.date,
          sessionId: session.id,
          dayName: session.dayName,
          sets: completedSets,
          maxWeight,
          totalReps,
        })
      }
    }
  })
  return results.sort((a, b) => new Date(a.date) - new Date(b.date))
}

export async function getRecentSessions(limit = 10) {
  const all = await getAllSessions()
  return all.slice(0, limit)
}

export async function getSetting(key) {
  const db = await getDB()
  const item = await db.get('settings', key)
  return item ? item.value : null
}

export async function setSetting(key, value) {
  const db = await getDB()
  await db.put('settings', { key, value })
}

export async function exportToCSV() {
  const sessions = await getAllSessions()
  const rows = [
    'Date,Day,Exercise,Set,Weight (kg),Reps,RPE,Session Notes',
  ]
  sessions.forEach((session) => {
    session.exercises?.forEach((ex) => {
      ex.sets.forEach((set, i) => {
        if (set.completed) {
          const cols = [
            new Date(session.date).toLocaleDateString(),
            `"${session.dayName}"`,
            `"${ex.exerciseName}"`,
            i + 1,
            set.weight || '',
            set.reps || '',
            set.rpe || '',
            `"${(session.notes || '').replace(/"/g, '""')}"`,
          ]
          rows.push(cols.join(','))
        }
      })
    })
  })
  return rows.join('\n')
}

export function calcOneRepMax(weight, reps) {
  if (!weight || !reps || reps <= 0) return 0
  return Math.round(Number(weight) * (1 + Number(reps) / 30))
}
