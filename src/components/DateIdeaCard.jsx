import { motion } from 'framer-motion'

const categoryStyles = {
  'K-Drama Moment': 'bg-lavender/70 text-warm-brown',
  Cozy: 'bg-blush/70 text-warm-brown',
  'Stay-Home Date': 'bg-rose/30 text-warm-brown',
  Foodie: 'bg-coffee/15 text-coffee',
  'Rainy Day': 'bg-lavender/50 text-warm-brown',
  'Low Budget': 'bg-cream text-coffee',
  'Princess Treatment': 'bg-rose/40 text-warm-brown',
  'Chaotic Cute': 'bg-blush/60 text-warm-brown',
}

/**
 * Polaroid-style card for a randomly drawn date idea.
 */
export default function DateIdeaCard({ idea }) {
  if (!idea) return null
  return (
    <motion.div
      key={idea.title}
      initial={{ opacity: 0, y: 24, rotate: -2 }}
      animate={{ opacity: 1, y: 0, rotate: -1.5 }}
      transition={{ type: 'spring', stiffness: 130, damping: 14 }}
      className="mx-auto max-w-sm rounded-[1.4rem] bg-white p-4 pb-7 shadow-polaroid"
    >
      <div className="flex min-h-[120px] flex-col items-center justify-center rounded-xl bg-gradient-to-br from-blush/60 via-cream to-lavender/50 p-6 text-center">
        <span className="text-4xl" aria-hidden="true">
          ☕
        </span>
        <span
          className={`mt-3 rounded-full px-3 py-1 text-xs font-semibold ${
            categoryStyles[idea.category] || 'bg-cream text-coffee'
          }`}
        >
          {idea.category}
        </span>
      </div>
      <h3 className="mt-4 px-1 text-center font-serif text-xl font-semibold text-warm-brown">
        {idea.title}
      </h3>
      <p className="mt-2 px-1 text-center font-body text-sm leading-relaxed text-cocoa/75">
        {idea.text}
      </p>
      <p className="mt-3 text-center font-hand text-lg text-rose">today’s little plan ♡</p>
    </motion.div>
  )
}
