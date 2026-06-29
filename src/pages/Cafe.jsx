import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import PageShell from '../components/PageShell'
import CozyButton from '../components/CozyButton'
import DateIdeaCard from '../components/DateIdeaCard'
import { useVisitSection } from '../hooks/useProgress'
import { dateIdeas, dateCategories } from '../data/dateIdeas'

export default function Cafe() {
  useVisitSection('cafe')
  const [idea, setIdea] = useState(null)
  const [category, setCategory] = useState('Any')

  const orderIdea = () => {
    const pool = category === 'Any' ? dateIdeas : dateIdeas.filter((d) => d.category === category)
    if (pool.length === 0) return
    let next = pool[Math.floor(Math.random() * pool.length)]
    // Avoid repeating the same idea twice in a row when possible.
    if (idea && pool.length > 1) {
      while (next.title === idea.title) {
        next = pool[Math.floor(Math.random() * pool.length)]
      }
    }
    setIdea(next)
  }

  return (
    <PageShell emoji="☕" title="The Café" subtitle="Order today’s little date idea." maxWidth="max-w-2xl">
      <div className="flex flex-col items-center text-center">
        <p className="max-w-md font-body text-[15px] leading-relaxed text-cocoa/75">
          The barista (me) only serves one thing here: soft little plans for us. Pick a mood, then
          tap the button and let the menu decide.
        </p>

        <div className="mt-5 flex flex-wrap justify-center gap-2">
          {['Any', ...dateCategories].map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              className={`rounded-full px-4 py-2 font-body text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-rose/60 ${
                category === c
                  ? 'bg-rose text-white shadow-soft'
                  : 'bg-white/70 text-warm-brown hover:bg-white'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mt-6">
          <CozyButton onClick={orderIdea} className="px-8 py-4 text-lg">
            ☕ Order a date idea
          </CozyButton>
        </div>

        <div className="mt-8 min-h-[280px] w-full">
          <AnimatePresence mode="wait">
            {idea ? (
              <DateIdeaCard key={idea.title} idea={idea} />
            ) : (
              <p key="empty" className="mt-10 font-hand text-xl text-warm-brown/50">
                the menu is warm and waiting…
              </p>
            )}
          </AnimatePresence>
        </div>

        {idea && (
          <button
            type="button"
            onClick={orderIdea}
            className="mt-2 font-hand text-lg text-rose underline-offset-4 hover:underline"
          >
            order another one ♡
          </button>
        )}
      </div>
    </PageShell>
  )
}
