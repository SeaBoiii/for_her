import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import PageShell from '../components/PageShell'
import SecretUnlock from '../components/SecretUnlock'
import CozyButton from '../components/CozyButton'
import { useProgress } from '../hooks/useProgress'

const rewards = [
  { emoji: '🍰', label: 'One dessert date' },
  { emoji: '☕', label: 'One coffee on me' },
  { emoji: '🎬', label: 'One movie night' },
  { emoji: '🌙', label: 'One long walk' },
  { emoji: '🗣️', label: 'One yap session with full attention' },
  { emoji: '📍', label: 'One “send me your location, I’ll get you food” card' },
]

const finalText = [
  'I just hope this made you smile.',
  'That was the whole point.',
  'Some people deserve more than a normal text message.',
  'Some people deserve a little world built just for them.',
  'So this is mine.',
  'A small corner of the internet,',
  'made quietly,',
  'for you.',
]

export default function SecretScene() {
  const { unlocked, visitedCount, threshold } = useProgress()
  const [claimed, setClaimed] = useState(null)

  if (!unlocked) {
    return (
      <div className="warm-bg relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4">
        <SecretUnlock visitedCount={visitedCount} threshold={threshold} />
      </div>
    )
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#2a1a3a] via-[#3a223f] to-[#431407]">
      {/* Soft night stars */}
      <NightSky />

      <PageTransitionNight>
        <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-2xl flex-col px-4 pb-12 pt-6">
            <Link
              to="/home"
              className="inline-flex w-fit items-center gap-1.5 rounded-full bg-white/15 px-4 py-2 font-body text-sm font-semibold text-cream backdrop-blur-sm transition-colors hover:bg-white/25"
            >
              <span aria-hidden="true">←</span> Back to the map
            </Link>

            <div className="mt-10 text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="text-5xl"
                aria-hidden="true"
              >
                🌙
              </motion.div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-4 font-hand text-xl text-rose"
              >
                final scene
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                className="mt-1 font-serif text-3xl font-semibold text-cream sm:text-4xl"
              >
                No Big Speech
              </motion.h1>
            </div>

            <div className="mx-auto mt-9 max-w-md space-y-3 text-center">
              {finalText.map((line, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + i * 0.5 }}
                  className="font-body text-[17px] leading-relaxed text-cream/90"
                >
                  {line}
                </motion.p>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + finalText.length * 0.5 + 0.3 }}
              className="mt-12"
            >
              <h2 className="text-center font-serif text-2xl font-semibold text-cream">
                Claim your reward
              </h2>
              <p className="mt-1 text-center font-hand text-lg text-rose">
                pick one (or, you know, all of them)
              </p>

              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {rewards.map((reward) => (
                  <motion.button
                    key={reward.label}
                    type="button"
                    onClick={() => setClaimed(reward)}
                    whileHover={{ scale: 1.03, y: -3 }}
                    whileTap={{ scale: 0.97 }}
                    className={`flex items-center gap-3 rounded-2xl border px-4 py-4 text-left font-body font-semibold backdrop-blur-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-rose/70 ${
                      claimed?.label === reward.label
                        ? 'border-rose bg-rose/30 text-cream'
                        : 'border-white/20 bg-white/10 text-cream/90 hover:bg-white/20'
                    }`}
                  >
                    <span className="text-2xl" aria-hidden="true">
                      {reward.emoji}
                    </span>
                    <span className="text-sm">{reward.label}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>

            <AnimatePresence>
              {claimed && (
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="mx-auto mt-7 max-w-md rounded-3xl border border-rose/40 bg-cream/95 p-6 text-center shadow-cozy"
                >
                  <div className="text-4xl" aria-hidden="true">
                    🎟️
                  </div>
                  <p className="mt-2 font-serif text-xl font-semibold text-warm-brown">
                    {claimed.emoji} {claimed.label}
                  </p>
                  <p className="mt-3 font-body text-[15px] leading-relaxed text-cocoa/80">
                    Reward claimed. Please present this to Aleem for immediate processing.
                  </p>
                  <div className="mt-4">
                    <CozyButton variant="blush" onClick={() => setClaimed(null)}>
                      pick a different one ♡
                    </CozyButton>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <p className="mt-14 text-center font-hand text-lg text-cream/50">made by Aleem, softly.</p>
        </div>
      </PageTransitionNight>
    </div>
  )
}

function PageTransitionNight({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {children}
    </motion.div>
  )
}

function NightSky() {
  const stars = Array.from({ length: 40 }).map((_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 70,
    size: 1 + Math.random() * 2.5,
    delay: Math.random() * 3,
  }))
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {stars.map((s) => (
        <motion.span
          key={s.id}
          className="absolute rounded-full bg-cream"
          style={{ left: `${s.left}%`, top: `${s.top}%`, width: s.size, height: s.size }}
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{ duration: 2.5 + Math.random() * 2, repeat: Infinity, delay: s.delay }}
        />
      ))}
    </div>
  )
}
