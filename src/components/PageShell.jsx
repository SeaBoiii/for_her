import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageTransition from './PageTransition'
import FloatingPetals from './FloatingPetals'
import Footer from './Footer'

/**
 * Consistent layout for every inner page: warm background, floating petals,
 * a back button to the map, a small title, and a cozy footer.
 */
export default function PageShell({
  title,
  subtitle,
  emoji,
  children,
  petals = 10,
  showBack = true,
  maxWidth = 'max-w-3xl',
  extraBackground = null,
}) {
  return (
    <div className="warm-bg relative min-h-screen overflow-hidden">
      <FloatingPetals count={petals} />
      {extraBackground}

      <PageTransition className="relative z-10 mx-auto flex min-h-screen w-full flex-col px-4 pb-10 pt-5 sm:px-6">
        <header className={`mx-auto w-full ${maxWidth}`}>
          {showBack && (
            <Link
              to="/home"
              className="inline-flex items-center gap-1.5 rounded-full bg-white/70 px-4 py-2 font-body text-sm font-semibold text-warm-brown shadow-soft transition-colors hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-rose/60"
            >
              <span aria-hidden="true">←</span> Back to the map
            </Link>
          )}

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="mt-6 text-center"
          >
            {emoji && (
              <div className="text-4xl sm:text-5xl" aria-hidden="true">
                {emoji}
              </div>
            )}
            <h1 className="mt-2 font-serif text-3xl font-semibold text-warm-brown sm:text-4xl">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-2 font-hand text-xl text-rose sm:text-2xl">{subtitle}</p>
            )}
          </motion.div>
        </header>

        <main className={`mx-auto mt-8 w-full flex-1 ${maxWidth}`}>{children}</main>

        <Footer />
      </PageTransition>
    </div>
  )
}
