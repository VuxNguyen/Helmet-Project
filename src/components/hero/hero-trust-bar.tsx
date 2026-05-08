'use client'

import { motion } from "framer-motion"
import { Truck, Shield, RefreshCw, Headphones } from "lucide-react"
import { fadeInUp, staggerContainer } from "@/lib/motion"
import { useTranslations } from "@/hooks/use-translations"

export function HeroTrustBar() {
  const { t } = useTranslations()

  const trustItems = [
    {
      icon: Truck,
      label: t("trust.freeShipping"),
      description: t("trust.freeShippingDesc"),
    },
    {
      icon: Shield,
      label: t("trust.secureCheckout"),
      description: t("trust.secureCheckoutDesc"),
    },
    {
      icon: RefreshCw,
      label: t("trust.returns"),
      description: t("trust.returnsDesc"),
    },
    {
      icon: Headphones,
      label: t("trust.support247"),
      description: t("trust.support247Desc"),
    },
  ]

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="mt-12 grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-4 lg:mt-16"
    >
      {trustItems.map((item) => (
        <motion.div
          key={item.label}
          variants={fadeInUp}
          className="flex items-start gap-3"
        >
          <item.icon className="mt-0.5 h-5 w-5 shrink-0 text-white/60" />
          <div>
            <p className="text-sm font-medium text-white">{item.label}</p>
            <p className="text-xs text-white/50">{item.description}</p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}