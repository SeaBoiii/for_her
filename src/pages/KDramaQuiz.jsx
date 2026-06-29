import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import PageShell from '../components/PageShell'
import CozyButton from '../components/CozyButton'
import { useVisitSection } from '../hooks/useProgress'
import { quizQuestions, tallyResult } from '../data/kdramaQuiz'

export default function KDramaQuiz() {
  useVisitSection('kdrama-quiz')
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState([])

  const result = answers.length === quizQuestions.length ? tallyResult(answers) : null
  const question = quizQuestions[step]

  const choose = (tag) => {
    const next = [...answers, tag]
    setAnswers(next)
    setStep((s) => s + 1)
  }

  const restart = () => {
    setAnswers([])
    setStep(0)
  }

  return (
    <PageShell
      emoji="🎬"
      title="K-Drama Quiz"
      subtitle="What kind of scene does today feel like?"
      maxWidth="max-w-xl"
      petals={6}
    >
      <AnimatePresence mode="wait">
        {result ? (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            className="cozy-card mx-auto max-w-md p-7 text-center"
          >
            <p className="font-hand text-lg text-rose">today’s episode is…</p>
            <div className="mt-2 text-5xl" aria-hidden="true">
              {result.emoji}
            </div>
            <h2 className="mt-2 font-serif text-2xl font-semibold text-warm-brown">
              {result.title}
            </h2>
            <p className="mt-3 font-body text-[15px] leading-relaxed text-cocoa/80">
              {result.description}
            </p>
            <p className="mt-5 font-body text-sm font-semibold text-warm-brown/70">
              Next scene to visit:
            </p>
            <Link to={result.to} className="mt-2 inline-block">
              <CozyButton variant="blush">Go to {result.next} →</CozyButton>
            </Link>
            <div className="mt-4">
              <button
                type="button"
                onClick={restart}
                className="font-hand text-lg text-warm-brown/60 underline-offset-4 hover:underline"
              >
                play again ♡
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            className="mx-auto max-w-md"
          >
            <p className="text-center font-hand text-lg text-rose">
              question {step + 1} of {quizQuestions.length}
            </p>
            <h2 className="mt-1 text-center font-serif text-2xl font-semibold text-warm-brown">
              {question.q}
            </h2>
            <div className="mt-6 grid grid-cols-1 gap-3">
              {question.options.map((opt) => (
                <motion.button
                  key={opt.label}
                  type="button"
                  onClick={() => choose(opt.tag)}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="rounded-2xl border border-white/70 bg-white/80 px-5 py-4 text-center font-body font-semibold text-warm-brown shadow-soft transition-colors hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-rose/60"
                >
                  {opt.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageShell>
  )
}
