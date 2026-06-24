import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import PageShell from '../components/PageShell'
import MoodCard from '../components/MoodCard'
import RainBackground from '../components/RainBackground'
import { useVisitSection } from '../hooks/useProgress'
import { moodMessages, moodOrder } from '../data/moodMessages'

export default function RainyWindow() {
  useVisitSection('rainy-window')
  const [activeMood, setActiveMood] = useState(null)

  return (
    <PageShell
      emoji="🌧"
      title="The Rainy Window"
      subtitle="For the days that feel a little heavier."
      maxWidth="max-w-2xl"
      petals={4}
      extraBackground={<RainBackground count={55} />}
    >
      <div className="flex flex-col items-center">
        <p className="max-w-md text-center font-body text-[15px] leading-relaxed text-cocoa/75">
          Pull up a chair by the window. Tell me how today feels, and I’ll leave a little note for
          you.
        </p>

        <div className="mt-7 grid w-full grid-cols-2 gap-3 sm:grid-cols-3">
          {moodOrder.map((key) => {
            const mood = moodMessages[key]
            const isActive = activeMood === key
            return (
              <motion.button
                key={key}
                type="button"
                onClick={() => setActiveMood(key)}
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                className={`rounded-2xl border px-3 py-3 font-body text-sm font-semibold shadow-soft transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-rose/60 ${
                  isActive
                    ? 'border-rose bg-rose text-white'
                    : 'border-white/70 bg-white/75 text-warm-brown hover:bg-white'
                }`}
              >
                <span className="mr-1" aria-hidden="true">
                  {mood.emoji}
                </span>
                {mood.label}
              </motion.button>
            )
          })}
        </div>

        <div className="mt-8 min-h-[180px] w-full">
          <AnimatePresence mode="wait">
            {activeMood ? (
              <MoodCard key={activeMood} mood={moodMessages[activeMood]} />
            ) : (
              <p key="empty" className="mt-8 text-center font-hand text-xl text-warm-brown/50">
                the rain is gentle today… pick a feeling ♡
              </p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </PageShell>
  )
}
