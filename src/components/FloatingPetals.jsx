import { useMemo } from 'react'

/**
 * Soft CSS-driven floating petals. Purely decorative.
 * `count` controls density; petals loop forever via CSS animation.
 */
export default function FloatingPetals({ count = 14 }) {
  const petals = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => {
        const size = 8 + Math.random() * 14
        return {
          id: i,
          left: Math.random() * 100,
          size,
          duration: 9 + Math.random() * 12,
          delay: -Math.random() * 18,
          sway: Math.random() > 0.5 ? 1 : -1,
        }
      }),
    [count],
  )

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {petals.map((p) => (
        <span
          key={p.id}
          className="petal"
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  )
}
