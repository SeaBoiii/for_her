import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import PageShell from '../components/PageShell'
import CozyButton from '../components/CozyButton'
import DateIdeaCard from '../components/DateIdeaCard'
import { useVisitSection } from '../hooks/useProgress'
import { dateIdeas } from '../data/dateIdeas'

export default function Cafe() {
  useVisitSection('cafe')
  const [idea, setIdea] = useState(null)

  const orderIdea = () => {
    let next = dateIdeas[Math.floor(Math.random() * dateIdeas.length)]
    // Avoid repeating the same idea twice in a row when possible.
    if (idea && dateIdeas.length > 1) {
      while (next.title === idea.title) {
        next = dateIdeas[Math.floor(Math.random() * dateIdeas.length)]
      }
    }
    setIdea(next)
  }

  return (
    <PageShell emoji="☕" title="The Café" subtitle="Order today’s little date idea." maxWidth="max-w-2xl">
      <div className="flex flex-col items-center text-center">
        <p className="max-w-md font-body text-[15px] leading-relaxed text-cocoa/75">
          The barista (me) only serves one thing here: soft little plans for us. Tap the button and
          let the menu decide.
        </p>

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
