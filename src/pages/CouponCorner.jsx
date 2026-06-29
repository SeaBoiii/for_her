import { AnimatePresence, motion } from 'framer-motion'
import PageShell from '../components/PageShell'
import { useProgress, useVisitSection } from '../hooks/useProgress'
import { coupons } from '../data/coupons'

const categoryStyles = {
  Treats: 'bg-blush/70 text-warm-brown',
  Time: 'bg-lavender/70 text-warm-brown',
  Care: 'bg-rose/30 text-warm-brown',
}

export default function CouponCorner() {
  useVisitSection('coupon-corner')
  const { claimedCoupons, claimCoupon } = useProgress()

  return (
    <PageShell
      emoji="🎟"
      title="Coupon Corner"
      subtitle="Tiny rewards, claim whenever you like."
      maxWidth="max-w-2xl"
      petals={7}
    >
      <p className="mx-auto max-w-md text-center font-body text-[15px] leading-relaxed text-cocoa/75">
        These are real, redeemable, and renewable. Claim one and present it to me for immediate
        processing. No expiry. You can un-claim if you change your mind.
      </p>

      <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {coupons.map((coupon, i) => {
          const claimed = claimedCoupons.includes(coupon.title)
          return (
            <motion.div
              key={coupon.title}
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, type: 'spring', stiffness: 120, damping: 16 }}
              className={`relative overflow-hidden rounded-3xl border p-5 shadow-cozy transition-colors ${
                claimed ? 'border-rose/40 bg-cream/90' : 'border-white/70 bg-white/80'
              }`}
            >
              {claimed && (
                <motion.span
                  initial={{ scale: 1.6, opacity: 0, rotate: -18 }}
                  animate={{ scale: 1, opacity: 0.85, rotate: -14 }}
                  className="pointer-events-none absolute right-3 top-6 rounded-md border-4 border-rose px-3 py-1 font-serif text-lg font-bold uppercase tracking-widest text-rose"
                >
                  Claimed
                </motion.span>
              )}
              <div className="flex items-center justify-between">
                <span className="text-3xl" aria-hidden="true">
                  {coupon.emoji}
                </span>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    categoryStyles[coupon.category] || 'bg-cream text-coffee'
                  }`}
                >
                  {coupon.category}
                </span>
              </div>
              <h3 className="mt-3 font-serif text-lg font-semibold text-warm-brown">
                {coupon.title}
              </h3>
              <p className="mt-1 font-body text-sm leading-relaxed text-cocoa/70">
                {coupon.description}
              </p>
              <button
                type="button"
                onClick={() => claimCoupon(coupon.title)}
                className={`mt-4 w-full rounded-full px-4 py-2.5 font-body font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-rose/60 ${
                  claimed
                    ? 'bg-white/70 text-warm-brown/70 hover:bg-white'
                    : 'bg-rose text-white hover:bg-rose/90'
                }`}
              >
                {claimed ? 'Un-claim' : 'Claim this ♡'}
              </button>
            </motion.div>
          )
        })}
      </div>

      <AnimatePresence>
        {claimedCoupons.length > 0 && (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-7 text-center font-hand text-lg text-rose"
          >
            Coupon claimed. Please present this to Aleem for immediate processing.
          </motion.p>
        )}
      </AnimatePresence>
    </PageShell>
  )
}
