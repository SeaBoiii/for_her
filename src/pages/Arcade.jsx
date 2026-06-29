import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import PageShell from '../components/PageShell'
import CozyButton from '../components/CozyButton'
import { useVisitSection } from '../hooks/useProgress'
import { markArcadePlayed } from '../utils/progress'
import { compliments } from '../data/compliments'
const ITEM_EMOJIS = ['💖', '🌸', '⭐', '☕', '☂️']
const ITEM_SIZE = 34 // px
const BASKET_WIDTH = 74 // px
const BASKET_HEIGHT = 46 // px
const SPAWN_INTERVAL = 850 // ms

export default function Arcade() {
  useVisitSection('arcade')

  const areaRef = useRef(null)
  const sizeRef = useRef({ w: 0, h: 0 })
  const basketXRef = useRef(0)
  const itemsRef = useRef([])
  const rafRef = useRef(0)
  const lastTimeRef = useRef(0)
  const spawnAccRef = useRef(0)
  const idRef = useRef(0)
  const runningRef = useRef(false)

  const [playing, setPlaying] = useState(false)
  const [score, setScore] = useState(0)
  const [items, setItems] = useState([])
  const [basketX, setBasketX] = useState(0)
  const [compliment, setCompliment] = useState(null)

  const measure = useCallback(() => {
    const el = areaRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    sizeRef.current = { w: rect.width, h: rect.height }
    // Keep basket inside bounds after resize.
    const maxX = Math.max(0, rect.width - BASKET_WIDTH)
    basketXRef.current = Math.min(basketXRef.current, maxX)
    setBasketX(basketXRef.current)
  }, [])

  useEffect(() => {
    measure()
    // Centre the basket initially.
    const { w } = sizeRef.current
    basketXRef.current = Math.max(0, w / 2 - BASKET_WIDTH / 2)
    setBasketX(basketXRef.current)
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [measure])

  const moveBasket = useCallback((clientX) => {
    const el = areaRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const maxX = Math.max(0, rect.width - BASKET_WIDTH)
    let x = clientX - rect.left - BASKET_WIDTH / 2
    x = Math.max(0, Math.min(maxX, x))
    basketXRef.current = x
    setBasketX(x)
  }, [])

  // Keyboard controls
  useEffect(() => {
    const onKey = (e) => {
      if (!runningRef.current) return
      const step = 28
      const maxX = Math.max(0, sizeRef.current.w - BASKET_WIDTH)
      if (e.key === 'ArrowLeft') {
        basketXRef.current = Math.max(0, basketXRef.current - step)
        setBasketX(basketXRef.current)
        e.preventDefault()
      } else if (e.key === 'ArrowRight') {
        basketXRef.current = Math.min(maxX, basketXRef.current + step)
        setBasketX(basketXRef.current)
        e.preventDefault()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const tick = useCallback((time) => {
    if (!runningRef.current) return
    const last = lastTimeRef.current || time
    const dt = Math.min(48, time - last) // cap delta to avoid jumps
    lastTimeRef.current = time

    const { w, h } = sizeRef.current
    spawnAccRef.current += dt

    if (spawnAccRef.current >= SPAWN_INTERVAL) {
      spawnAccRef.current = 0
      const maxX = Math.max(0, w - ITEM_SIZE)
      itemsRef.current.push({
        id: idRef.current++,
        emoji: ITEM_EMOJIS[Math.floor(Math.random() * ITEM_EMOJIS.length)],
        x: Math.random() * maxX,
        y: -ITEM_SIZE,
        speed: 0.12 + Math.random() * 0.12, // px per ms
      })
    }

    const basketTop = h - BASKET_HEIGHT - 6
    const bx = basketXRef.current
    let caught = 0
    const survivors = []

    for (const it of itemsRef.current) {
      const ny = it.y + it.speed * dt
      const centerX = it.x + ITEM_SIZE / 2
      const overlapX = centerX >= bx - 6 && centerX <= bx + BASKET_WIDTH + 6
      const reached = ny + ITEM_SIZE >= basketTop && ny + ITEM_SIZE <= basketTop + BASKET_HEIGHT + 12

      if (overlapX && reached) {
        caught += 1
        continue // catch -> remove
      }
      if (ny > h + ITEM_SIZE) {
        continue // missed -> remove
      }
      survivors.push({ ...it, y: ny })
    }

    itemsRef.current = survivors
    setItems(survivors)

    if (caught > 0) {
      setScore((s) => s + caught)
      setCompliment(compliments[Math.floor(Math.random() * compliments.length)])
    }

    rafRef.current = requestAnimationFrame(tick)
  }, [])

  const start = useCallback(() => {
    measure()
    itemsRef.current = []
    setItems([])
    setScore(0)
    setCompliment(null)
    spawnAccRef.current = SPAWN_INTERVAL // spawn one quickly
    lastTimeRef.current = 0
    runningRef.current = true
    setPlaying(true)
    markArcadePlayed()
    cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(tick)
  }, [measure, tick])

  const reset = useCallback(() => {
    runningRef.current = false
    setPlaying(false)
    cancelAnimationFrame(rafRef.current)
    itemsRef.current = []
    setItems([])
    setScore(0)
    setCompliment(null)
  }, [])

  useEffect(() => () => cancelAnimationFrame(rafRef.current), [])

  return (
    <PageShell
      emoji="🎮"
      title="The Arcade Corner"
      subtitle="Catch the K-Drama Moments"
      maxWidth="max-w-2xl"
      petals={5}
    >
      <p className="mx-auto max-w-md text-center font-body text-[15px] leading-relaxed text-cocoa/75">
        Move the little basket to catch the falling moments. Use the arrow keys, or just drag with
        your finger. Every catch earns you a compliment, because you deserve them.
      </p>

      <div className="mt-5 flex items-center justify-center gap-3">
        <div className="rounded-full bg-white/80 px-5 py-2 font-body font-semibold text-warm-brown shadow-soft">
          Score: <span className="text-rose">{score}</span>
        </div>
      </div>

      <div
        ref={areaRef}
        onPointerDown={(e) => {
          if (playing) moveBasket(e.clientX)
        }}
        onPointerMove={(e) => {
          if (playing && e.buttons > 0) moveBasket(e.clientX)
        }}
        className="relative mx-auto mt-5 h-[60vh] max-h-[460px] w-full select-none overflow-hidden rounded-3xl border border-white/70 bg-gradient-to-b from-lavender/40 via-cream to-blush/40 shadow-cozy"
        style={{ touchAction: 'none' }}
      >
        {/* Falling items */}
        {items.map((it) => (
          <div
            key={it.id}
            className="pointer-events-none absolute flex items-center justify-center"
            style={{
              left: it.x,
              top: it.y,
              width: ITEM_SIZE,
              height: ITEM_SIZE,
              fontSize: ITEM_SIZE - 6,
              lineHeight: `${ITEM_SIZE}px`,
            }}
            aria-hidden="true"
          >
            {it.emoji}
          </div>
        ))}

        {/* Basket */}
        <div
          className="pointer-events-none absolute flex items-end justify-center rounded-b-2xl rounded-t-md bg-rose/90 shadow-cozy"
          style={{
            left: basketX,
            bottom: 6,
            width: BASKET_WIDTH,
            height: BASKET_HEIGHT,
          }}
          aria-hidden="true"
        >
          <span style={{ fontSize: 26, marginBottom: 4 }}>🧺</span>
        </div>

        {/* Idle / start overlay */}
        <AnimatePresence>
          {!playing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center bg-cream/40 backdrop-blur-[2px]"
            >
              <p className="font-hand text-2xl text-warm-brown">ready when you are ♡</p>
              <p className="mt-1 font-body text-sm text-cocoa/70">catch 💖 🌸 ⭐ ☕ ☂️</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-5 flex items-center justify-center gap-3">
        {!playing ? (
          <CozyButton onClick={start}>▶ Start</CozyButton>
        ) : (
          <CozyButton onClick={reset} variant="soft">
            ⟳ Reset
          </CozyButton>
        )}
      </div>

      <div className="mt-5 min-h-[64px]">
        <AnimatePresence mode="wait">
          {compliment && (
            <motion.div
              key={compliment}
              initial={{ opacity: 0, y: 12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8 }}
              className="mx-auto max-w-sm rounded-2xl border border-rose/30 bg-white/80 px-5 py-3 text-center shadow-soft"
            >
              <p className="font-hand text-lg text-rose">latest unlock</p>
              <p className="font-body text-sm font-semibold text-warm-brown">{compliment}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageShell>
  )
}
