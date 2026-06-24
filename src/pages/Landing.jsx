import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import CozyButton from '../components/CozyButton'
import FloatingPetals from '../components/FloatingPetals'
import Footer from '../components/Footer'
import PageTransition from '../components/PageTransition'

export default function Landing() {
  const navigate = useNavigate()

  return (
    <div className="warm-bg relative flex min-h-screen flex-col overflow-hidden">
      <FloatingPetals count={16} />

      <PageTransition className="relative z-10 flex flex-1 flex-col items-center justify-center px-5 text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="font-hand text-lg uppercase tracking-[0.35em] text-rose"
        >
          a tiny episode
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, scale: 0.92, y: 18 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.35, type: 'spring', stiffness: 90, damping: 14 }}
          className="mt-3 max-w-3xl font-serif text-4xl font-bold leading-tight text-warm-brown sm:text-6xl"
        >
          A Scene Made for Her
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mt-4 h-px w-40 origin-center bg-gradient-to-r from-transparent via-rose to-transparent"
        />

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85 }}
          className="mt-5 max-w-md font-body text-base leading-relaxed text-cocoa/75 sm:text-lg"
        >
          A tiny K-drama corner of the internet, made to make her smile.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05 }}
          className="mt-9"
        >
          <CozyButton
            onClick={() => navigate('/home')}
            className="px-8 py-4 text-lg"
          >
            🎬 Start the episode
          </CozyButton>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="mt-6 font-hand text-base text-warm-brown/50"
        >
          (best enjoyed with warm light and soft volume)
        </motion.p>
      </PageTransition>

      <div className="relative z-10 pb-6">
        <Footer />
      </div>
    </div>
  )
}
