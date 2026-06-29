import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { markLetterOpened } from '../utils/progress'

/**
 * A tappable envelope that opens to reveal a handwritten note.
 */
export default function LetterEnvelope({ letter, index = 0 }) {
  const [open, setOpen] = useState(false)

  const toggle = () => {
    setOpen((v) => {
      if (!v) markLetterOpened(letter.title)
      return !v
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, type: 'spring', stiffness: 120, damping: 16 }}
      className="cozy-card overflow-hidden p-5"
    >
      <button
        type="button"
        onClick={toggle}
        aria-expanded={open}
        className="flex w-full items-center gap-3 text-left focus:outline-none"
      >
        <motion.span
          animate={{ rotate: open ? [0, -8, 0] : 0, y: open ? -2 : 0 }}
          className="text-3xl"
          aria-hidden="true"
        >
          {open ? '💌' : '✉️'}
        </motion.span>
        <span className="flex-1">
          <span className="block font-serif text-lg font-semibold text-warm-brown">
            {letter.title}
          </span>
          <span className="block font-hand text-base text-rose">
            {open ? 'tap to fold it back' : 'tap to open'}
          </span>
        </span>
        <span className="text-xl" aria-hidden="true">
          {letter.emoji}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="note"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <motion.p
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.12 }}
              className="mt-4 rounded-2xl bg-cream/80 p-4 font-body text-[15px] leading-relaxed text-cocoa/85"
            >
              {letter.text}
              <span className="mt-3 block text-right font-hand text-lg text-warm-brown/80">
                — Aleem
              </span>
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
