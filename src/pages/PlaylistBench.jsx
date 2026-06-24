import { motion } from 'framer-motion'
import PageShell from '../components/PageShell'
import { useVisitSection } from '../hooks/useProgress'
import { playlistScenes } from '../data/playlistScenes'

export default function PlaylistBench() {
  useVisitSection('playlist-bench')

  return (
    <PageShell
      emoji="🎧"
      title="The Playlist Bench"
      subtitle="Songs that feel like a scene."
      maxWidth="max-w-3xl"
    >
      <p className="mx-auto max-w-md text-center font-body text-[15px] leading-relaxed text-cocoa/75">
        Sit with me a while. Each card is a moment that deserves its own soundtrack. Imagine the
        music swelling softly.
      </p>

      <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {playlistScenes.map((scene, i) => (
          <motion.article
            key={scene.title}
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06, type: 'spring', stiffness: 120, damping: 16 }}
            whileHover={{ y: -4 }}
            className="cozy-card flex flex-col p-5"
          >
            <div className="flex items-center justify-between">
              {scene.episode && (
                <span className="rounded-full bg-lavender/60 px-3 py-1 text-xs font-semibold text-warm-brown/80">
                  {scene.episode}
                </span>
              )}
              <span className="text-xl" aria-hidden="true">
                🎵
              </span>
            </div>

            <h3 className="mt-3 font-serif text-xl font-semibold text-warm-brown">{scene.title}</h3>
            <p className="mt-1 font-hand text-lg text-rose">{scene.mood}</p>
            <p className="mt-2 font-body text-sm leading-relaxed text-cocoa/75">
              {scene.description}
            </p>

            {scene.link ? (
              <a
                href={scene.link}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-1 font-body text-sm font-semibold text-coffee underline-offset-4 hover:underline"
              >
                ▶ play the scene
              </a>
            ) : (
              <span className="mt-4 inline-flex items-center gap-1 font-body text-sm font-medium text-warm-brown/40">
                ♪ song coming soon
              </span>
            )}
          </motion.article>
        ))}
      </div>
    </PageShell>
  )
}
