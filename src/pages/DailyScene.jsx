import { motion } from 'framer-motion'
import PageShell from '../components/PageShell'
import { useVisitSection } from '../hooks/useProgress'
import { getDailyScene } from '../data/dailyScenes'

const moodEmoji = {
  gentle: '☁️',
  cute: '🎀',
  calm: '🍃',
  cozy: '☕',
  encouraging: '💪',
  comforting: '🤍',
  playful: '✨',
  tender: '🌧',
  warm: '🌤',
  romantic: '💗',
  dreamy: '🌙',
}

export default function DailyScene() {
  useVisitSection('daily-scene')
  const scene = getDailyScene()
  const today = new Date().toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })

  return (
    <PageShell
      emoji="🌤"
      title="Daily Scene"
      subtitle="One soft message, just for today."
      maxWidth="max-w-2xl"
      petals={8}
    >
      <p className="mx-auto max-w-md text-center font-body text-[15px] leading-relaxed text-cocoa/75">
        This little episode changes every day. Come back tomorrow for the next one.
      </p>

      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: 'spring', stiffness: 120, damping: 16 }}
        className="cozy-card mx-auto mt-7 max-w-md overflow-hidden p-7 text-center"
      >
        <p className="font-hand text-base text-warm-brown/60">{today}</p>
        <div className="mt-3 text-5xl" aria-hidden="true">
          {moodEmoji[scene.mood] || '🌸'}
        </div>
        <h2 className="mt-3 font-serif text-2xl font-semibold text-warm-brown">{scene.title}</h2>
        <span className="mt-3 inline-block rounded-full bg-blush/60 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-warm-brown/80">
          mood: {scene.mood}
        </span>
        <p className="mt-5 font-body text-[17px] leading-relaxed text-cocoa/85">{scene.message}</p>
        <p className="mt-6 font-hand text-lg text-rose">see you tomorrow ♡</p>
      </motion.div>
    </PageShell>
  )
}
