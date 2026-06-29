const STORAGE_KEY = 'scene-made-for-her-progress'
const LETTERS_KEY = 'scene-made-for-her-opened-letters'
const COUPONS_KEY = 'scene-made-for-her-claimed-coupons'
const ARCADE_KEY = 'scene-made-for-her-arcade-played'
const VISIT_DAYS_KEY = 'scene-made-for-her-visit-days'

// The main explorable sections (the secret scene / archive are not counted here).
export const SECTIONS = [
  'cafe',
  'rainy-window',
  'letter-box',
  'playlist-bench',
  'arcade',
  'daily-scene',
  'coupon-corner',
  'kdrama-quiz',
]

export const UNLOCK_THRESHOLD = 4

// Secret Archive unlock thresholds.
export const ARCHIVE = {
  sections: 4,
  letters: 5,
  coupons: 1,
  arcade: 1,
  visitDays: 3,
}

function safeParse(raw) {
  try {
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function getList(key) {
  if (typeof window === 'undefined') return []
  const raw = window.localStorage.getItem(key)
  if (!raw) return []
  return safeParse(raw)
}

function setList(key, list) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(key, JSON.stringify(list))
  // Let same-tab listeners know progress changed (storage event only fires cross-tab).
  window.dispatchEvent(new Event('progress-updated'))
}

function todayKey() {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

/* ---------- Visited sections ---------- */

/** Get all visited section ids from localStorage. */
export function getVisited() {
  // Only keep ids we recognise so stale data cannot break the unlock logic.
  return getList(STORAGE_KEY).filter((id) => SECTIONS.includes(id))
}

/** Mark a section as visited. Returns the updated visited list. */
export function markVisited(sectionId) {
  if (typeof window === 'undefined') return []
  recordVisitDay()
  if (!SECTIONS.includes(sectionId)) return getVisited()
  const visited = getVisited()
  if (!visited.includes(sectionId)) {
    visited.push(sectionId)
    setList(STORAGE_KEY, visited)
  }
  return visited
}

/** Number of unique main sections visited. */
export function getVisitedCount() {
  return getVisited().length
}

/** Whether the secret final scene is unlocked. */
export function isSecretUnlocked() {
  return getVisitedCount() >= UNLOCK_THRESHOLD
}

/* ---------- Opened letters ---------- */

export function getOpenedLetters() {
  return getList(LETTERS_KEY)
}

export function markLetterOpened(title) {
  if (typeof window === 'undefined') return []
  const opened = getOpenedLetters()
  if (!opened.includes(title)) {
    opened.push(title)
    setList(LETTERS_KEY, opened)
  }
  return opened
}

export function getOpenedLettersCount() {
  return getOpenedLetters().length
}

/* ---------- Claimed coupons ---------- */

export function getClaimedCoupons() {
  return getList(COUPONS_KEY)
}

export function toggleCouponClaimed(title) {
  if (typeof window === 'undefined') return []
  const claimed = getClaimedCoupons()
  const next = claimed.includes(title)
    ? claimed.filter((t) => t !== title)
    : [...claimed, title]
  setList(COUPONS_KEY, next)
  return next
}

export function getClaimedCouponsCount() {
  return getClaimedCoupons().length
}

/* ---------- Arcade played ---------- */

export function getArcadePlayed() {
  if (typeof window === 'undefined') return false
  return window.localStorage.getItem(ARCADE_KEY) === 'true'
}

export function markArcadePlayed() {
  if (typeof window === 'undefined') return
  if (!getArcadePlayed()) {
    window.localStorage.setItem(ARCADE_KEY, 'true')
    window.dispatchEvent(new Event('progress-updated'))
  }
}

/* ---------- Unique visit days ---------- */

export function getVisitDays() {
  return getList(VISIT_DAYS_KEY)
}

export function recordVisitDay() {
  const today = todayKey()
  const days = getVisitDays()
  if (!days.includes(today)) {
    days.push(today)
    setList(VISIT_DAYS_KEY, days)
  }
  return days
}

export function getVisitDaysCount() {
  return getVisitDays().length
}

/* ---------- Secret Archive unlocks ---------- */

export function getArchiveUnlocks() {
  return {
    sections: getVisitedCount() >= ARCHIVE.sections,
    letters: getOpenedLettersCount() >= ARCHIVE.letters,
    coupons: getClaimedCouponsCount() >= ARCHIVE.coupons,
    arcade: getArcadePlayed(),
    visitDays: getVisitDaysCount() >= ARCHIVE.visitDays,
  }
}

/** Clear all stored progress (handy for testing). */
export function resetProgress() {
  if (typeof window === 'undefined') return
  ;[STORAGE_KEY, LETTERS_KEY, COUPONS_KEY, ARCADE_KEY, VISIT_DAYS_KEY].forEach((k) =>
    window.localStorage.removeItem(k),
  )
  window.dispatchEvent(new Event('progress-updated'))
}
