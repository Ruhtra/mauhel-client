import { motion } from 'framer-motion'

export function HomePage() {
  return (
    <div className="from-primary to-secondary flex h-full items-center justify-center bg-gradient-to-r">
      <motion.h1
        className="text-primary-foreground text-4xl font-bold"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Mauhel
      </motion.h1>
    </div>
  )
}
