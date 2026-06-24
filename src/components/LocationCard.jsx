import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

/**
 * A cozy episode-menu card used on the HomeMap.
 */
export default function LocationCard({
  to,
  emoji,
  title,
  description,
  visited = false,
  locked = false,
  index = 0,
}) {
  const content = (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, type: 'spring', stiffness: 120, damping: 16 }}
      whileHover={locked ? {} : { scale: 1.03, y: -4 }}
      whileTap={locked ? {} : { scale: 0.98 }}
      className={`group relative flex h-full flex-col rounded-3xl border p-5 text-left shadow-cozy transition-colors ${
        locked
          ? 'border-warm-brown/10 bg-white/50'
          : 'border-white/70 bg-white/75 hover:bg-white'
      }`}
    >
      <div className="mb-2 flex items-center justify-between">
        <span className="text-3xl drop-shadow-sm" aria-hidden="true">
          {emoji}
        </span>
        {locked ? (
          <span className="rounded-full bg-lavender/60 px-3 py-1 text-xs font-semibold text-warm-brown/70">
            Locked
          </span>
        ) : visited ? (
          <span className="rounded-full bg-blush/70 px-3 py-1 text-xs font-semibold text-warm-brown/80">
            Visited ♡
          </span>
        ) : (
          <span className="rounded-full bg-cream px-3 py-1 text-xs font-semibold text-coffee/70">
            New
          </span>
        )}
      </div>
      <h3 className="font-serif text-xl font-semibold text-warm-brown">{title}</h3>
      <p className="mt-1 font-body text-sm leading-relaxed text-cocoa/70">{description}</p>
      <span className="mt-4 inline-flex items-center gap-1 font-hand text-lg text-rose">
        {locked ? 'Not yet…' : 'Enter the scene'}
        {!locked && (
          <span className="transition-transform group-hover:translate-x-1">→</span>
        )}
      </span>
    </motion.div>
  )

  if (locked) {
    return <div className="h-full cursor-not-allowed">{content}</div>
  }

  return (
    <Link to={to} className="h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-rose/60 focus-visible:ring-offset-2 focus-visible:ring-offset-cream rounded-3xl">
      {content}
    </Link>
  )
}
