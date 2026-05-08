'use client'

import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"

interface HeroBadgeProps {
  text: string
}

export function HeroBadge({ text }: HeroBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
      className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-medium text-white backdrop-blur-sm"
    >
      <Sparkles className="h-3.5 w-3.5 text-amber-300" />
      <span>{text}</span>
    </motion.div>
  )
}