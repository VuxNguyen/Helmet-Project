'use client'

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { categories } from "@/data/categories"
import { CategoryCard } from "./category-card"
import { motionTokens } from "@/lib/motion"
import { useTranslations } from "@/hooks/use-translations"

export function CategoriesSection() {
  const { t } = useTranslations()

  const fadeUp = (delay: number = 0) => ({
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-50px" },
    transition: {
      duration: motionTokens.duration.slow / 1000,
      ease: motionTokens.easing.decelerate,
      delay,
    },
  })

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div {...fadeUp(0)} className="mx-auto max-w-2xl text-center">
          <span className="inline-block text-xs font-semibold tracking-widest text-muted-foreground uppercase">
            {t("categories.sectionLabel")}
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t("categories.sectionTitle")}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground sm:text-lg">
            {t("categories.sectionDesc")}
          </p>
        </motion.div>

        {/* Category grid */}
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 sm:gap-5">
          {categories.map((category, index) => (
            <CategoryCard key={category.id} category={category} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div {...fadeUp(0.3)} className="mt-12 text-center">
          <Link
            href="/products"
            className="group inline-flex h-11 items-center gap-2 rounded-lg border border-border bg-card px-6 text-sm font-medium text-foreground transition-all duration-200 hover:border-foreground/20 hover:bg-muted active:scale-[0.97]"
          >
            {t("categories.viewAll")}
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}