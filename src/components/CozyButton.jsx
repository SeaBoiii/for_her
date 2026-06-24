import { motion } from 'framer-motion'

const variants = {
  primary:
    'bg-rose text-white shadow-cozy hover:bg-rose/90 border border-rose/40',
  soft: 'bg-white/80 text-warm-brown border border-rose/30 shadow-soft hover:bg-white',
  blush: 'bg-blush text-warm-brown border border-rose/30 shadow-soft hover:bg-blush/80',
  ghost: 'bg-transparent text-warm-brown border border-warm-brown/20 hover:bg-white/50',
}

export default function CozyButton({
  children,
  variant = 'primary',
  className = '',
  type = 'button',
  ...props
}) {
  return (
    <motion.button
      type={type}
      whileHover={{ scale: 1.04, y: -1 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 400, damping: 18 }}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-body font-semibold tracking-wide transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-rose/60 focus-visible:ring-offset-2 focus-visible:ring-offset-cream ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  )
}
