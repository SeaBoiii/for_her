import { motion } from 'framer-motion'
import PageShell from '../components/PageShell'
import DoNotPress from '../components/DoNotPress'
import { useProgress, useVisitSection } from '../hooks/useProgress'

const notes = [
  {
    key: 'sections',
    emoji: '🗺',
    title: 'Secret Note 1',
    hint: 'Unlocks after visiting 4 sections',
    text: 'You actually explored the whole little world. I half expected you to peek at one room and leave. You stayed. That says something soft about you, and I noticed.',
  },
  {
    key: 'letters',
    emoji: '💌',
    title: 'Secret Note 2',
    hint: 'Unlocks after opening 5 letters',
    text: 'Five letters in. I wrote those imagining your exact face reading them. The slow blink, the tiny smile you do when you pretend you’re not flattered. Caught you. Cute.',
  },
  {
    key: 'coupons',
    emoji: '🎟',
    title: 'Secret Note 3',
    hint: 'Unlocks after claiming a coupon',
    text: 'You claimed a coupon, which means you’re willing to be spoiled. Good. That was the point. I like having reasons to do nice things for you, so keep claiming.',
  },
  {
    key: 'arcade',
    emoji: '🎮',
    title: 'Secret Note 4',
    hint: 'Unlocks after playing the arcade',
    text: 'You played the silly game. Win or lose, you’re still the high score around here. I would catch a hundred falling moments just to hand you the compliments after.',
  },
  {
    key: 'visitDays',
    emoji: '📅',
    title: 'Secret Note 5',
    hint: 'Unlocks after visiting on 3 different days',
    text: 'You came back. More than once. On separate days. That’s the whole reason I built this, so you’d have a small place to return to whenever you needed it. Thank you for staying.',
  },
]

export default function SecretArchive() {
  useVisitSection('secret-archive') // not a counted section; just records a visit day
  const { archiveUnlocks, archiveTargets, visitedCount, openedLettersCount, claimedCouponsCount, visitDaysCount } =
    useProgress()

  const unlockedCount = Object.values(archiveUnlocks).filter(Boolean).length

  const progress = {
    sections: `${Math.min(visitedCount, archiveTargets.sections)}/${archiveTargets.sections} sections`,
    letters: `${Math.min(openedLettersCount, archiveTargets.letters)}/${archiveTargets.letters} letters`,
    coupons: `${Math.min(claimedCouponsCount, archiveTargets.coupons)}/${archiveTargets.coupons} coupon`,
    arcade: archiveUnlocks.arcade ? 'played' : 'not yet',
    visitDays: `${Math.min(visitDaysCount, archiveTargets.visitDays)}/${archiveTargets.visitDays} days`,
  }

  return (
    <PageShell
      emoji="🗝"
      title="Secret Archive"
      subtitle="Bonus scenes, unlocked by spending time here."
      maxWidth="max-w-2xl"
      petals={6}
    >
      <p className="mx-auto max-w-md text-center font-body text-[15px] leading-relaxed text-cocoa/75">
        You’ve unlocked {unlockedCount} of {notes.length} hidden notes. Keep exploring, opening
        letters, claiming coupons, and coming back to reveal the rest.
      </p>

      <div className="mt-7 grid grid-cols-1 gap-4">
        {notes.map((note, i) => {
          const open = archiveUnlocks[note.key]
          return (
            <motion.div
              key={note.key}
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06, type: 'spring', stiffness: 120, damping: 16 }}
              className={`rounded-3xl border p-5 shadow-cozy transition-colors ${
                open ? 'border-white/70 bg-white/85' : 'border-warm-brown/10 bg-white/45'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-3xl" aria-hidden="true">
                  {open ? note.emoji : '🔒'}
                </span>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    open ? 'bg-blush/70 text-warm-brown/80' : 'bg-lavender/60 text-warm-brown/70'
                  }`}
                >
                  {open ? 'Unlocked ♡' : progress[note.key]}
                </span>
              </div>
              <h3 className="mt-3 font-serif text-lg font-semibold text-warm-brown">{note.title}</h3>
              {open ? (
                <p className="mt-2 font-body text-[15px] leading-relaxed text-cocoa/85">
                  {note.text}
                  <span className="mt-2 block text-right font-hand text-base text-warm-brown/70">
                    — Aleem
                  </span>
                </p>
              ) : (
                <p className="mt-2 font-hand text-lg text-warm-brown/50">{note.hint}…</p>
              )}
            </motion.div>
          )
        })}
      </div>

      <div className="mt-10 flex justify-center">
        <DoNotPress />
      </div>
    </PageShell>
  )
}
