export const WORKOUT_PLAN = {
  days: [
    {
      id: 1,
      name: 'Push A',
      subtitle: 'Chest Width & Shoulder Focus',
      dayOfWeek: 'Monday',
      isHome: false,
      cardio: {
        type: 'LISS',
        tool: 'Incline Treadmill',
        incline: '8–10%',
        speed: '5.5 km/h',
        duration: '20 min',
        timing: 'After lifting',
        note: 'Target HR 120–135 bpm. Brisk walk — this is fat loss, not a casual stroll.',
      },
      exercises: [
        {
          id: 'incline-db-press',
          name: 'Incline Dumbbell Press',
          sets: 4,
          repsRange: '8–12',
          restSeconds: 90,
          targetRPE: '7–8',
          muscleGroup: 'Chest',
          cues:
            '45° incline. Elbows at 45° from torso — not flared. Slow 2-sec descent. Squeeze chest at top. Drive DBs together slightly at peak.',
        },
        {
          id: 'pec-deck',
          name: 'Pec Deck',
          sets: 3,
          repsRange: '12–15',
          restSeconds: 60,
          targetRPE: '7',
          muscleGroup: 'Chest',
          cues:
            'Full stretch at bottom — feel the outer pec open. Squeeze hard at peak contraction. No locking out joints. Control the negative.',
        },
        {
          id: 'chest-press-machine',
          name: 'Chest Press Machine',
          sets: 3,
          repsRange: '10–12',
          restSeconds: 60,
          targetRPE: '7',
          muscleGroup: 'Chest',
          cues:
            'Wide grip setting to emphasise chest width. Push through heel of palms. Stop just before lockout to keep tension on pec.',
        },
        {
          id: 'seated-db-shoulder-press',
          name: 'Seated DB Shoulder Press',
          sets: 3,
          repsRange: '10–12',
          restSeconds: 90,
          targetRPE: '7',
          muscleGroup: 'Shoulders',
          cues:
            'Back vertical. Press DBs in a slight arc inward. Stop just below lockout. 2-sec negative. No momentum.',
        },
        {
          id: 'cable-lateral-raises',
          name: 'Cable Lateral Raises',
          sets: 4,
          repsRange: '15–20',
          restSeconds: 60,
          targetRPE: '7',
          muscleGroup: 'Side Delts',
          cues:
            'Slight forward lean. Lead with elbow, not hand. Stop at shoulder height — no higher. Tiny "thumb down" tilt at peak. Slow return.',
        },
        {
          id: 'overhead-cable-ext',
          name: 'Overhead Cable Extensions',
          sets: 3,
          repsRange: '12–15',
          restSeconds: 60,
          targetRPE: '7',
          muscleGroup: 'Triceps',
          cues:
            'Rope or single bar. Face away from stack. Elbows fixed beside head. Full extension — feel long head stretch.',
        },
      ],
    },
    {
      id: 2,
      name: 'Home',
      subtitle: 'Pull + Arms + Core (Post Programming Class)',
      dayOfWeek: 'Tuesday',
      isHome: true,
      cardio: {
        type: 'HIIT',
        tool: 'Jump Rope',
        protocol: '30s on / 30s off × 20 rounds',
        duration: '20 min',
        timing: 'After home workout',
        note: 'High knees or double-unders for the on phase. Walk in place for rest. Moderate intensity — energy may be low after class.',
      },
      exercises: [
        {
          id: 'pull-ups',
          name: 'Pull-ups',
          sets: 4,
          repsRange: 'AMRAP',
          restSeconds: 90,
          targetRPE: '7–8',
          muscleGroup: 'Lats',
          cues:
            'Full dead hang at bottom. Chin clears bar at top. No kipping. Wide grip for lat width. Brace core throughout.',
        },
        {
          id: 'band-pull-aparts',
          name: 'Band Pull-Aparts',
          sets: 3,
          repsRange: '20–25',
          restSeconds: 45,
          targetRPE: '6',
          muscleGroup: 'Rear Delts',
          cues:
            'Arms straight at chest height. Pull band apart to T-shape. Squeeze rear delts hard at full stretch. Slow and controlled.',
        },
        {
          id: 'db-hammer-curls-home',
          name: 'DB Hammer Curls',
          sets: 3,
          repsRange: '12–15',
          restSeconds: 60,
          targetRPE: '7',
          muscleGroup: 'Biceps',
          cues:
            'Neutral (thumbs up) grip. Curl one arm at a time. Slow 3-sec negative. No shoulder swing. Squeeze brachialis at peak.',
        },
        {
          id: 'ab-rollout',
          name: 'Ab Rollout',
          sets: 3,
          repsRange: '8–12',
          restSeconds: 60,
          targetRPE: '7–8',
          muscleGroup: 'Abs',
          cues:
            'Posterior pelvic tilt before you start. Brace hard. Roll out to where lower back stays flat — stop there. Pull back with abs, not arms.',
        },
        {
          id: 'dead-hang',
          name: 'Dead Hang',
          sets: 3,
          repsRange: '30–45 sec',
          restSeconds: 60,
          targetRPE: '6',
          muscleGroup: 'Forearms',
          cues:
            'Full relaxed dead hang. Depress scapulae slightly. Breathe deeply. Builds grip, decompresses spine, stretches lats.',
        },
      ],
    },
    {
      id: 3,
      name: 'Pull A',
      subtitle: 'Lat Width Focus',
      dayOfWeek: 'Wednesday',
      isHome: false,
      cardio: {
        type: 'LISS',
        tool: 'Incline Treadmill',
        incline: '10–12%',
        speed: '5.0 km/h',
        duration: '20 min',
        timing: 'After lifting',
        note: 'Steeper incline than Monday — harder glute and calf engagement. HR 125–140 bpm.',
      },
      exercises: [
        {
          id: 'wide-pulldowns',
          name: 'Wide-Grip Pulldowns',
          sets: 4,
          repsRange: '10–12',
          restSeconds: 90,
          targetRPE: '7–8',
          muscleGroup: 'Lats',
          cues:
            'Overhand grip well outside shoulder-width. Slight lean back (15°). Drive elbows down and back toward hips. Bar to upper chest. Full stretch at top — feel lats lengthen.',
        },
        {
          id: 'narrow-pulldowns',
          name: 'Narrow-Grip Pulldowns',
          sets: 3,
          repsRange: '10–12',
          restSeconds: 75,
          targetRPE: '7',
          muscleGroup: 'Lats',
          cues:
            'Neutral grip attachment. More upright torso. Drive elbows to hips — imagine squeezing a pencil in each armpit. Squeeze mid-lat at bottom.',
        },
        {
          id: 'seated-cable-row',
          name: 'Seated Cable Row',
          sets: 3,
          repsRange: '10–12',
          restSeconds: 75,
          targetRPE: '7',
          muscleGroup: 'Lats',
          cues:
            'Sit tall, slight lean forward to start. Drive elbows back — pull handle to lower ribs. Pause 1 sec. Control on the way out. Minimal torso sway.',
        },
        {
          id: 'pec-deck-rear-delt',
          name: 'Pec Deck Rear Delt Fly',
          sets: 3,
          repsRange: '15–20',
          restSeconds: 60,
          targetRPE: '6–7',
          muscleGroup: 'Rear Delts',
          cues:
            'Sit facing the pad. Adjust seat so handles are at shoulder height. Arms parallel to floor. Elbows slightly bent. Pull handles apart — squeeze rear delts at full extension.',
        },
        {
          id: 'preacher-curls',
          name: 'Preacher Curls',
          sets: 3,
          repsRange: '10–12',
          restSeconds: 60,
          targetRPE: '7–8',
          muscleGroup: 'Biceps',
          cues:
            'Full extension at bottom (do not lock). Supinate wrist as you curl up. Squeeze peak hard. 3-sec negative. Develops bicep peak.',
        },
        {
          id: 'hanging-leg-raises',
          name: 'Hanging Leg Raises',
          sets: 3,
          repsRange: '10–15',
          restSeconds: 60,
          targetRPE: '7',
          muscleGroup: 'Abs',
          cues:
            'No swing. Posterior pelvic tilt at bottom. Raise legs to parallel or beyond. Control the descent — don\'t drop.',
        },
      ],
    },
    {
      id: 4,
      name: 'Legs + Abs',
      subtitle: 'Lower Body & Core',
      dayOfWeek: 'Thursday',
      isHome: false,
      cardio: {
        type: 'LISS',
        tool: 'Incline Treadmill',
        incline: '5–6%',
        speed: '4.5 km/h',
        duration: '15 min',
        timing: 'After lifting (optional — legs are taxed)',
        note: 'Very easy walk to flush legs and get blood moving. Skip if you are genuinely wrecked. Never miss for soreness alone.',
      },
      exercises: [
        {
          id: 'bulgarian-split-squat',
          name: 'Bulgarian Split Squats',
          sets: 4,
          repsRange: '10–12 each leg',
          restSeconds: 120,
          targetRPE: '7–8',
          muscleGroup: 'Quads/Glutes',
          cues:
            'Rear foot elevated on bench. Front foot far enough forward so shin stays vertical. Torso upright. Drive through front heel. Knee tracks toes. This will humble you — start light.',
        },
        {
          id: 'leg-extensions',
          name: 'Leg Extensions',
          sets: 3,
          repsRange: '12–15',
          restSeconds: 75,
          targetRPE: '7',
          muscleGroup: 'Quads',
          cues:
            'Seat adjusted so knee joint aligns with machine pivot. 3-sec eccentric. Pause and squeeze at peak. Keep healthy ROM — no forced terminal extension.',
        },
        {
          id: 'leg-curls',
          name: 'Leg Curls',
          sets: 3,
          repsRange: '12–15',
          restSeconds: 75,
          targetRPE: '7',
          muscleGroup: 'Hamstrings',
          cues:
            'Hips pressed flat into pad. Curl heel toward glute. Squeeze peak. 3-sec eccentric back down. Full hamstring stretch at extension.',
        },
        {
          id: 'calf-raises-leg-press',
          name: 'Calf Raises (Leg Press)',
          sets: 3,
          repsRange: '20–25',
          restSeconds: 60,
          targetRPE: '7',
          muscleGroup: 'Calves',
          cues:
            'Balls of feet on platform edge. Full plantar flexion at top. Full dorsiflexion stretch at bottom — hold 1 sec. Slow and deliberate.',
        },
        {
          id: 'machine-ab-crunches',
          name: 'Machine Ab Crunches',
          sets: 3,
          repsRange: '15–20',
          restSeconds: 60,
          targetRPE: '7',
          muscleGroup: 'Abs',
          cues:
            'Round your spine — don\'t just pull arms. Exhale fully as you crunch. Slow eccentric back. Feel the abs, not hip flexors.',
        },
        {
          id: 'hanging-leg-raises-thu',
          name: 'Hanging Leg Raises',
          sets: 3,
          repsRange: '10–15',
          restSeconds: 60,
          targetRPE: '7',
          muscleGroup: 'Abs',
          cues:
            'Control every rep. Posterior pelvic tilt. No kipping. Core stays braced throughout.',
        },
      ],
    },
    {
      id: 5,
      name: 'Push B',
      subtitle: 'Side Delt Priority',
      dayOfWeek: 'Friday',
      isHome: false,
      cardio: {
        type: 'LISS',
        tool: 'Incline Treadmill',
        incline: '10–12%',
        speed: '5.5 km/h',
        duration: '25 min',
        timing: 'After lifting',
        note: 'Main fat-loss cardio session of the week. Push the incline. HR 130–145 bpm. This one matters — don\'t skip it.',
      },
      exercises: [
        {
          id: 'cable-lateral-raises-b',
          name: 'Cable Lateral Raises',
          sets: 4,
          repsRange: '15–20',
          restSeconds: 60,
          targetRPE: '7',
          muscleGroup: 'Side Delts',
          cues:
            'Unilateral. Cable at lowest setting. Slight forward lean. Lead with elbow. Stop at shoulder height. Slow negative. Best exercise for side delt width.',
        },
        {
          id: 'db-lateral-raises',
          name: 'DB Lateral Raises',
          sets: 3,
          repsRange: '15–20',
          restSeconds: 60,
          targetRPE: '7–8',
          muscleGroup: 'Side Delts',
          cues:
            'Slight elbow bend. Slight forward torso lean. Raise to shoulder height only. Tiny thumb-down tilt at peak to keep tension on side delt, not front delt.',
        },
        {
          id: 'seated-db-press-b',
          name: 'Seated DB Shoulder Press',
          sets: 3,
          repsRange: '10–12',
          restSeconds: 90,
          targetRPE: '7',
          muscleGroup: 'Shoulders',
          cues:
            'Consolidate side delt pump into compound strength. Press with control — this is after lateral raises so weight will feel harder.',
        },
        {
          id: 'incline-db-press-b',
          name: 'Incline Dumbbell Press',
          sets: 3,
          repsRange: '10–12',
          restSeconds: 90,
          targetRPE: '7',
          muscleGroup: 'Chest',
          cues:
            '45° incline. Full chest stretch. More explosive push than Monday session. This is secondary volume day for chest.',
        },
        {
          id: 'pec-deck-b',
          name: 'Pec Deck',
          sets: 3,
          repsRange: '12–15',
          restSeconds: 60,
          targetRPE: '7',
          muscleGroup: 'Chest',
          cues:
            'Focus on outer pec squeeze. Width emphasis. Slow eccentric for maximum chest fiber recruitment.',
        },
        {
          id: 'tricep-pushdowns',
          name: 'Tricep Pushdowns',
          sets: 3,
          repsRange: '12–15',
          restSeconds: 60,
          targetRPE: '7',
          muscleGroup: 'Triceps',
          cues:
            'Rope or straight bar. Elbows locked at sides. Full extension. Squeeze lateral head at bottom. Adds arm thickness visible from front.',
        },
      ],
    },
    {
      id: 6,
      name: 'Pull B',
      subtitle: 'Rear Delt & Bicep Peak',
      dayOfWeek: 'Saturday',
      isHome: false,
      cardio: {
        type: 'LISS',
        tool: 'Incline Treadmill',
        incline: '8–10%',
        speed: '5.5 km/h',
        duration: '20 min',
        timing: 'After lifting',
        note: 'Moderate LISS. Active recovery after a full week. HR 120–135 bpm.',
      },
      exercises: [
        {
          id: 'wide-pulldowns-b',
          name: 'Wide-Grip Pulldowns',
          sets: 4,
          repsRange: '10–12',
          restSeconds: 90,
          targetRPE: '7–8',
          muscleGroup: 'Lats',
          cues:
            'Same cues as Wednesday. Focus on the mind-muscle connection today — you should know the movement well by Saturday.',
        },
        {
          id: 'pec-deck-rear-delt-b',
          name: 'Pec Deck Rear Delt Fly',
          sets: 4,
          repsRange: '15–20',
          restSeconds: 60,
          targetRPE: '6–7',
          muscleGroup: 'Rear Delts',
          cues:
            'Main rear delt day. 4 sets. Squeeze each rep at full extension. Rear delts are tiny — light weight, high reps, perfect form.',
        },
        {
          id: 'seated-cable-row-b',
          name: 'Seated Cable Row',
          sets: 3,
          repsRange: '10–12',
          restSeconds: 75,
          targetRPE: '7',
          muscleGroup: 'Lats',
          cues:
            'Wide neutral grip or narrow — alternate from Wednesday. Drive elbows back. Pause and hold 1 sec at contraction.',
        },
        {
          id: 'preacher-curls-b',
          name: 'Preacher Curls',
          sets: 3,
          repsRange: '10–12',
          restSeconds: 60,
          targetRPE: '7–8',
          muscleGroup: 'Biceps',
          cues:
            'Peak contraction day for biceps. Supinate hard at top. Hold 1 sec. Feel the peak. This builds the bicep "mountain".',
        },
        {
          id: 'hammer-curls',
          name: 'Hammer Curls',
          sets: 3,
          repsRange: '12–15',
          restSeconds: 60,
          targetRPE: '7',
          muscleGroup: 'Biceps',
          cues:
            'Neutral grip. Alternating. Targets brachialis (outer arm thickness). Slow eccentric. No momentum.',
        },
        {
          id: 'lower-back-ext',
          name: 'Lower Back Extensions',
          sets: 3,
          repsRange: '15',
          restSeconds: 60,
          targetRPE: '6',
          muscleGroup: 'Lower Back',
          cues:
            'Controlled movement. Stop at neutral — do not hyperextend. Hands at chest or behind head. Erector spinae strengthen to protect the spine.',
        },
      ],
    },
    {
      id: 7,
      name: 'Legs (Light)',
      subtitle: 'Active Recovery Lower Body',
      dayOfWeek: 'Sunday',
      isHome: false,
      cardio: {
        type: 'LISS',
        tool: 'Incline Treadmill',
        incline: '10–12%',
        speed: '5.0 km/h',
        duration: '25 min',
        timing: 'After lifting',
        note: 'End-of-week calorie burn. Legs session is lighter so you can push this incline walk. A good habit to close out the training week.',
      },
      exercises: [
        {
          id: 'leg-extensions-b',
          name: 'Leg Extensions',
          sets: 4,
          repsRange: '12–15',
          restSeconds: 60,
          targetRPE: '6–7',
          muscleGroup: 'Quads',
          cues:
            'Lighter than Thursday. Focus on the mind-muscle. Slow 3-sec eccentric. Quad sweep development. Keep tension the whole set.',
        },
        {
          id: 'leg-curls-b',
          name: 'Leg Curls',
          sets: 4,
          repsRange: '12–15',
          restSeconds: 60,
          targetRPE: '6–7',
          muscleGroup: 'Hamstrings',
          cues:
            'Lighter than Thursday. Emphasise the stretch at the bottom. Slow and deliberate. Hamstrings need both peak contraction and full stretch to grow.',
        },
        {
          id: 'bulgarian-split-squat-b',
          name: 'Bulgarian Split Squats',
          sets: 3,
          repsRange: '10 each leg',
          restSeconds: 90,
          targetRPE: '6',
          muscleGroup: 'Quads/Glutes',
          cues:
            'Noticeably lighter than Thursday. Perfect form practice. Use this session to improve depth and balance.',
        },
        {
          id: 'calf-raises-b',
          name: 'Calf Raises (Leg Press)',
          sets: 4,
          repsRange: '20–25',
          restSeconds: 45,
          targetRPE: '6–7',
          muscleGroup: 'Calves',
          cues:
            'Full ROM. 2-sec pause at bottom stretch. Calves are slow-twitch — high reps, strict form, always.',
        },
        {
          id: 'hanging-leg-raises-sun',
          name: 'Hanging Leg Raises',
          sets: 3,
          repsRange: '10–15',
          restSeconds: 60,
          targetRPE: '6–7',
          muscleGroup: 'Abs',
          cues:
            'Closing abs work for the week. Controlled. No kipping. Posterior pelvic tilt maintained throughout.',
        },
      ],
    },
  ],
}

export const WORKOUT_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

export function getTodayTemplate() {
  const today = new Date().getDay()
  const dayIndex = today === 0 ? 6 : today - 1
  return WORKOUT_PLAN.days[dayIndex] || WORKOUT_PLAN.days[0]
}

export function getTemplateByDayId(dayId) {
  return WORKOUT_PLAN.days.find((d) => d.id === dayId) || WORKOUT_PLAN.days[0]
}
