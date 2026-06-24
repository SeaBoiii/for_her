import { useMemo } from 'react'

/**
 * Gentle CSS rain. Used as a background layer on the Rainy Window page.
 */
export default function RainBackground({ count = 60 }) {
  const drops = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        duration: 0.6 + Math.random() * 0.9,
        delay: -Math.random() * 2,
        height: 40 + Math.random() * 50,
        opacity: 0.25 + Math.random() * 0.45,
      })),
    [count],
  )

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      {drops.map((d) => (
        <span
          key={d.id}
          className="rain-drop"
          style={{
            left: `${d.left}%`,
            height: `${d.height}px`,
            opacity: d.opacity,
            animationDuration: `${d.duration}s`,
            animationDelay: `${d.delay}s`,
          }}
        />
      ))}
    </div>
  )
}
