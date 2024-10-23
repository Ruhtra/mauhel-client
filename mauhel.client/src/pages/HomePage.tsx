import { motion } from "framer-motion";

export function HomePage() {
  return (
    <div className="flex items-center justify-center h-full bg-gradient-to-r from-primary to-secondary">
      <motion.h1
        className="text-4xl font-bold text-primary-foreground"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Mauhel
      </motion.h1>
    </div>
  );
}
