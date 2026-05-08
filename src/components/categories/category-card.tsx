'use client'

import { motion } from "framer-motion"
import Link from "next/link"
import { type Category } from "@/data/categories"
import { cn } from "@/lib/utils"
import { motionTokens } from "@/lib/motion"
import { useTranslations } from "@/hooks/use-translations"

/**
 * Maps category.id → dictionary path for the name.
 */
const CATEGORY_NAME_KEYS: Record<string, string> = {
  fullface: "categories.fullface.name",
  "three-quarter": "categories.threeQuarter.name",
  half: "categories.half.name",
  kids: "categories.kids.name",
  accessories: "categories.accessoriesCat.name",
}

const CATEGORY_DESC_KEYS: Record<string, string> = {
  fullface: "categories.fullface.desc",
  "three-quarter": "categories.threeQuarter.desc",
  half: "categories.half.desc",
  kids: "categories.kids.desc",
  accessories: "categories.accessoriesCat.desc",
}

interface CategoryCardProps {
  category: Category
  index: number
}

export function CategoryCard({ category, index }: CategoryCardProps) {
  const { t } = useTranslations()
  const Icon = category.icon

  const localizedName = CATEGORY_NAME_KEYS[category.id]
    ? t(CATEGORY_NAME_KEYS[category.id])
    : category.name

  const localizedDesc = CATEGORY_DESC_KEYS[category.id]
    ? t(CATEGORY_DESC_KEYS[category.id])
    : category.description

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: motionTokens.duration.slow / 1000,
        ease: motionTokens.easing.decelerate,
        delay: index * 0.1,
      }}
    >
      <Link
        href={category.slug}
        className="group relative block overflow-hidden rounded-xl border border-border bg-card transition-shadow duration-200 hover:shadow-lg"
      >
        {/* Gradient background layer */}
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-br opacity-5 transition-opacity duration-300 group-hover:opacity-20",
            category.gradient,
          )}
        />

        {/* Content */}
        <div className="relative flex items-start gap-5 p-5 sm:p-6">
          {/* Icon container */}
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-border bg-muted/50 transition-colors duration-200 group-hover:border-foreground/20 group-hover:bg-muted">
            <Icon className="h-6 w-6 text-foreground transition-transform duration-200 group-hover:scale-110" />
          </div>

          {/* Text */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-base font-semibold tracking-tight text-foreground sm:text-lg">
                {localizedName}
              </h3>
              <span className="shrink-0 text-sm text-muted-foreground">
                {category.count}
              </span>
            </div>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground line-clamp-2">
              {localizedDesc}
            </p>
          </div>

          {/* Arrow indicator */}
          <div className="absolute right-5 top-1/2 -translate-y-1/2 opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-1 sm:right-6">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              className="text-foreground"
            >
              <path
                d="M4.16667 10H15.8333M15.8333 10L11.6667 5.83334M15.8333 10L11.6667 14.1667"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}