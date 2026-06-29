import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const messages = [
  'I said do not press.',
  'But since you did...',
  'You are cute.',
  'Still cute.',
  'This is getting suspicious.',
  'Fine. You win.',
  'I miss you.',
]

/**
 * A playful button that cycles through messages on each press.
 * Press count lives in component state only.
 */
export default function DoNotPress() {
  const [count, setCount] = useState(0)

  const current = count === 0 ? null : messages[Math.min(count - 1, messages.length - 1)]
  const done = count >= messages.length

  return (
    <div className="flex flex-col items-center text-center">
      <motion.button
        type="button"
        onClick={() => setCount((c) => Math.min(c + 1, messages.length))}
        whileHover={{ scale: 1.04, y: -1 }}
        whileTap={{ scale: 0.94 }}
        className="rounded-full border border-rose/40 bg-blush px-7 py-3 font-body font-semibold text-warm-brown shadow-soft transition-colors hover:bg-blush/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose/60"
      >
        🚫 Do Not Press
      </motion.button>
      <AnimatePresence mode="wait">
        {current && (
          <motion.p
            key={count}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="mt-3 font-hand text-xl text-rose"
          >
            {current}
            {done && ' ♡'}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}
