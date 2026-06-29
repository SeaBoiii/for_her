import { useCallback, useEffect, useState } from 'react'
import {
  ARCHIVE,
  SECTIONS,
  UNLOCK_THRESHOLD,
  getArchiveUnlocks,
  getArcadePlayed,
  getClaimedCoupons,
  getOpenedLetters,
  getVisitDays,
  getVisited,
  isSecretUnlocked,
  markArcadePlayed,
  markLetterOpened,
  markVisited,
  resetProgress,
  toggleCouponClaimed,
} from '../utils/progress'

/**
 * React hook around the localStorage progress utilities.
 * Keeps components in sync when progress changes in this tab or another.
 */
export function useProgress() {
  const [snapshot, setSnapshot] = useState(read)

  useEffect(() => {
    const sync = () => setSnapshot(read())
    window.addEventListener('progress-updated', sync)
    window.addEventListener('storage', sync)
    return () => {
      window.removeEventListener('progress-updated', sync)
      window.removeEventListener('storage', sync)
    }
  }, [])

  const visit = useCallback((sectionId) => {
    markVisited(sectionId)
  }, [])

  const openLetter = useCallback((title) => {
    markLetterOpened(title)
  }, [])

  const claimCoupon = useCallback((title) => {
    toggleCouponClaimed(title)
  }, [])

  const playArcade = useCallback(() => {
    markArcadePlayed()
  }, [])

  const reset = useCallback(() => {
    resetProgress()
  }, [])

  return {
    ...snapshot,
    total: SECTIONS.length,
    threshold: UNLOCK_THRESHOLD,
    archiveTargets: ARCHIVE,
    visit,
    openLetter,
    claimCoupon,
    playArcade,
    reset,
  }
}

function read() {
  const visited = getVisited()
  const openedLetters = getOpenedLetters()
  const claimedCoupons = getClaimedCoupons()
  const visitDays = getVisitDays()
  return {
    visited,
    visitedCount: visited.length,
    openedLetters,
    openedLettersCount: openedLetters.length,
    claimedCoupons,
    claimedCouponsCount: claimedCoupons.length,
    arcadePlayed: getArcadePlayed(),
    visitDays,
    visitDaysCount: visitDays.length,
    unlocked: isSecretUnlocked(),
    archiveUnlocks: getArchiveUnlocks(),
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
