import { useCallback, useEffect, useState } from 'react'
import {
  SECTIONS,
  UNLOCK_THRESHOLD,
  getVisited,
  isSecretUnlocked,
  markVisited,
  resetProgress,
} from '../utils/progress'

/**
 * React hook around the localStorage progress utilities.
 * Keeps components in sync when progress changes in this tab or another.
 */
export function useProgress() {
  const [visited, setVisited] = useState(() => getVisited())

  useEffect(() => {
    const sync = () => setVisited(getVisited())
    window.addEventListener('progress-updated', sync)
    window.addEventListener('storage', sync)
    return () => {
      window.removeEventListener('progress-updated', sync)
      window.removeEventListener('storage', sync)
    }
  }, [])

  const visit = useCallback((sectionId) => {
    setVisited(markVisited(sectionId))
  }, [])

  const reset = useCallback(() => {
    resetProgress()
  }, [])

  return {
    visited,
    visitedCount: visited.length,
    total: SECTIONS.length,
    threshold: UNLOCK_THRESHOLD,
    unlocked: isSecretUnlocked(),
    visit,
    reset,
  }
}

/** Convenience hook to mark a section visited on mount. */
export function useVisitSection(sectionId) {
  const { visit } = useProgress()
  useEffect(() => {
    if (sectionId) visit(sectionId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionId])
}
