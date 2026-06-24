import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import CozyButton from './CozyButton'

/**
 * The locked-state card shown on the HomeMap and Secret Scene when
 * not enough sections have been explored yet.
 */
export default function SecretUnlock({ visitedCount, threshold }) {
  const remaining = Math.max(0, threshold - visitedCount)
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto max-w-md rounded-3xl border border-lavender/60 bg-white/70 p-7 text-center shadow-soft"
    >
      <motion.div
        animate={{ rotate: [0, -6, 6, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
        className="text-5xl"
        aria-hidden="true"
      >
        🔒
      </motion.div>
      <h2 className="mt-4 font-serif text-2xl font-semibold text-warm-brown">
        The Secret Scene is still locked
      </h2>
      <p className="mt-2 font-body text-[15px] leading-relaxed text-cocoa/75">
        Explore a few more scenes first. K-dramas do not reveal the ending this early.
      </p>

      <div className="mt-5">
        <div className="mx-auto h-2.5 w-full max-w-xs overflow-hidden rounded-full bg-cream">
          <motion.div
            className="h-full rounded-full bg-rose"
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(100, (visitedCount / threshold) * 100)}%` }}
            transition={{ type: 'spring', stiffness: 120, damping: 18 }}
          />
        </div>
        <p className="mt-2 font-hand text-lg text-rose">
          {remaining > 0
            ? `${remaining} more scene${remaining > 1 ? 's' : ''} to go ♡`
            : 'Ready… refresh to unlock ♡'}
        </p>
      </div>

      <div className="mt-5">
        <Link to="/home">
          <CozyButton variant="soft">Back to the map</CozyButton>
        </Link>
      </div>
    </motion.div>
  )
}
