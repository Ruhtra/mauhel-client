import { motion } from 'framer-motion'

export function LoadingApp() {
  return (
    <div className="from-primary/20 to-secondary/20 via-background flex h-[100svh] w-[100svw] items-center justify-center bg-gradient-to-br">
      <motion.div
        className="relative h-32 w-32"
        animate={{
          rotate: 360
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'linear'
        }}
      >
        <motion.div
          className="border-primary absolute inset-0 rounded-full border-t-4"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [1, 0.8, 1]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
        <motion.div
          className="border-secondary absolute inset-0 rounded-full border-r-4"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [1, 0.9, 1]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.2
          }}
        />
        <motion.div
          className="border-accent absolute inset-0 rounded-full border-b-4"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [1, 0.7, 1]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.4
          }}
        />
      </motion.div>
      <motion.h2
        className="text-foreground absolute text-2xl font-bold"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        Mauhel
      </motion.h2>
    </div>
  )
}
