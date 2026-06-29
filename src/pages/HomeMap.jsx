import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import LocationCard from '../components/LocationCard'
import FloatingPetals from '../components/FloatingPetals'
import Footer from '../components/Footer'
import PageTransition from '../components/PageTransition'
import DoNotPress from '../components/DoNotPress'
import { useProgress } from '../hooks/useProgress'

const locations = [
  {
    id: 'cafe',
    to: '/cafe',
    emoji: '☕',
    title: 'The Café',
    description: 'For warm words and tiny date ideas.',
  },
  {
    id: 'rainy-window',
    to: '/rainy-window',
    emoji: '🌧',
    title: 'The Rainy Window',
    description: 'For comfort when the day feels heavy.',
  },
  {
    id: 'letter-box',
    to: '/letter-box',
    emoji: '💌',
    title: 'The Letter Box',
    description: 'For messages from Aleem.',
  },
  {
    id: 'playlist-bench',
    to: '/playlist-bench',
    emoji: '🎧',
    title: 'The Playlist Bench',
    description: 'For songs that feel like a scene.',
  },
  {
    id: 'arcade',
    to: '/arcade',
    emoji: '🎮',
    title: 'The Arcade Corner',
    description: 'For a tiny cute game.',
  },
  {
    id: 'daily-scene',
    to: '/daily-scene',
    emoji: '🌤',
    title: 'Daily Scene',
    description: 'A small message that changes every day.',
  },
  {
    id: 'coupon-corner',
    to: '/coupon-corner',
    emoji: '🎟',
    title: 'Coupon Corner',
    description: 'Tiny rewards she can claim.',
  },
  {
    id: 'kdrama-quiz',
    to: '/kdrama-quiz',
    emoji: '🎬',
    title: 'K-Drama Quiz',
    description: 'Find out what kind of scene today feels like.',
  },
  {
    id: 'secret-archive',
    to: '/secret-archive',
    emoji: '🗝',
    title: 'Secret Archive',
    description: 'Unlocked memories, hidden notes, and bonus scenes.',
  },
]

export default function HomeMap() {
  const { visited, visitedCount, threshold, unlocked } = useProgress()

  return (
    <div className="warm-bg relative min-h-screen overflow-hidden">
      <FloatingPetals count={12} />

      <PageTransition className="relative z-10 mx-auto flex min-h-screen w-full max-w-4xl flex-col px-4 pb-10 pt-6 sm:px-6">
        <header className="text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-hand text-lg text-rose"
          >
            tonight’s episode menu
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="mt-1 font-serif text-3xl font-semibold text-warm-brown sm:text-4xl"
          >
            Where would you like to go?
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="mt-2 font-body text-sm text-cocoa/70"
          >
            You’ve explored {visitedCount} of {threshold} scenes needed to unlock the ending.
          </motion.p>
        </header>

        <main className="mt-8 grid grid-cols-1 content-start gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {locations.map((loc, i) => (
            <LocationCard
              key={loc.id}
              to={loc.to}
              emoji={loc.emoji}
              title={loc.title}
              description={loc.description}
              visited={visited.includes(loc.id)}
              index={i}
            />
          ))}

          {/* Secret scene card */}
          <SecretMapCard unlocked={unlocked} index={locations.length} />
        </main>

        <div className="mt-8 text-center">
          <Link
            to="/"
            className="font-hand text-base text-warm-brown/50 underline-offset-4 hover:underline"
          >
            ← back to the title card
          </Link>
        </div>

        <div className="mt-10 flex justify-center">
          <DoNotPress />
        </div>

        <Footer />
      </PageTransition>
    </div>
  )
}

function SecretMapCard({ unlocked, index }) {
  if (unlocked) {
    return (
      <LocationCard
        to="/secret-scene"
        emoji="🌙"
        title="The Secret Scene"
        description="Unlocked. The ending is ready for you."
        index={index}
      />
    )
  }
  return (
    <LocationCard
      emoji="🌙"
      title="The Secret Scene"
      description="Locked until you explore enough."
      locked
      index={index}
    />
  )
}
