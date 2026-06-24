const STORAGE_KEY = 'scene-made-for-her-progress'

// The five main explorable sections (the secret scene is not counted).
export const SECTIONS = ['cafe', 'rainy-window', 'letter-box', 'playlist-bench', 'arcade']

export const UNLOCK_THRESHOLD = 4

function safeParse(raw) {
  try {
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

/** Get all visited section ids from localStorage. */
export function getVisited() {
  if (typeof window === 'undefined') return []
  const raw = window.localStorage.getItem(STORAGE_KEY)
  if (!raw) return []
  // Only keep ids we recognise so stale data cannot break the unlock logic.
  return safeParse(raw).filter((id) => SECTIONS.includes(id))
}

/** Mark a section as visited. Returns the updated visited list. */
export function markVisited(sectionId) {
  if (typeof window === 'undefined') return []
  if (!SECTIONS.includes(sectionId)) return getVisited()
  const visited = getVisited()
  if (!visited.includes(sectionId)) {
    visited.push(sectionId)
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(visited))
    // Let same-tab listeners know progress changed (storage event only fires cross-tab).
    window.dispatchEvent(new Event('progress-updated'))
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

/** Clear all stored progress (handy for testing). */
export function resetProgress() {
  if (typeof window === 'undefined') return
  window.localStorage.removeItem(STORAGE_KEY)
  window.dispatchEvent(new Event('progress-updated'))
}
