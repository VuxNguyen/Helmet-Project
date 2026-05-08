'use client'

import { motion } from "framer-motion"
import { brands, type Brand } from "@/data/brands"
import { motionTokens } from "@/lib/motion"
import { useTranslations } from "@/hooks/use-translations"

interface BrandLogoProps {
  brand: Brand
  index: number
}

function BrandLogo({ brand, index }: BrandLogoProps) {
  const fadeUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-30px" },
    transition: {
      duration: motionTokens.duration.slow / 1000,
      ease: motionTokens.easing.decelerate,
      delay: index * 0.06,
    },
  }

  return (
    <motion.div {...fadeUp}>
      <div className="group relative flex h-28 items-center justify-center rounded-xl border border-border bg-card px-8 transition-all duration-300 hover:border-foreground/15 hover:bg-muted/60 hover:shadow-sm md:h-32">
        {/* Subtle shimmer on hover */}
        <div className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-foreground/[0.02] to-transparent" />
        </div>

        {/* Brand name as monochrome SVG text logo */}
        <span className="relative select-none text-2xl font-bold tracking-tight text-muted-foreground transition-all duration-300 group-hover:text-foreground md:text-3xl">
          {brand.name}
        </span>
      </div>
    </motion.div>
  )
}

export function BrandsShowcase() {
  const { t } = useTranslations()

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{
            duration: motionTokens.duration.slow / 1000,
            ease: motionTokens.easing.decelerate,
          }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="inline-block text-xs font-semibold tracking-widest text-muted-foreground uppercase">
            {t("brands.sectionLabel")}
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t("brands.sectionTitle")}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground sm:text-lg">
            {t("brands.sectionDesc")}
          </p>
        </motion.div>

        {/* Brand logos grid */}
        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
          {brands.map((brand, index) => (
            <BrandLogo key={brand.id} brand={brand} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}