import { motion } from 'framer-motion'

/**
 * A soft card that reveals a comfort message on the Rainy Window page.
 */
export default function MoodCard({ mood }) {
  if (!mood) return null
  return (
    <motion.div
      key={mood.text}
      initial={{ opacity: 0, y: 18, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: 'spring', stiffness: 140, damping: 16 }}
      className="cozy-card relative mx-auto max-w-md p-6 text-center"
    >
      <div className="mb-3 text-4xl" aria-hidden="true">
        {mood.emoji}
      </div>
      <p className="font-hand text-xl text-rose">{mood.label}</p>
      <p className="mt-2 font-body text-[15px] leading-relaxed text-cocoa/85">{mood.text}</p>
    </motion.div>
  )
}
