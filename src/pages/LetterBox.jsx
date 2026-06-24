import PageShell from '../components/PageShell'
import LetterEnvelope from '../components/LetterEnvelope'
import { useVisitSection } from '../hooks/useProgress'
import { letters } from '../data/letters'

export default function LetterBox() {
  useVisitSection('letter-box')

  return (
    <PageShell
      emoji="💌"
      title="The Letter Box"
      subtitle="Tiny notes, because one message was not enough."
      maxWidth="max-w-2xl"
    >
      <p className="mx-auto max-w-md text-center font-body text-[15px] leading-relaxed text-cocoa/75">
        Open these whenever the moment fits. No rush. They’ll wait for you, patiently, like good
        notes do.
      </p>

      <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {letters.map((letter, i) => (
          <LetterEnvelope key={letter.title} letter={letter} index={i} />
        ))}
      </div>
    </PageShell>
  )
}
