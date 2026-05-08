'use client'

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Star,
  ThumbsUp,
  ChevronDown,
  BadgeCheck,
  MessageSquare,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { motionTokens } from "@/lib/motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { ProductReview } from "../types/product-detail"

/* ───────── Types ───────── */

interface ProductReviewsProps {
  reviews: ProductReview[]
  rating: number
  reviewCount: number
  className?: string
}

/* ───────── Helpers ───────── */

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

function StarDisplay({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          size={size}
          className={cn(
            "stroke-none",
            i < rating ? "fill-amber-400 text-amber-400" : "fill-muted-foreground/20 text-muted-foreground/20",
          )}
        />
      ))}
    </div>
  )
}

/* ───────── Sub-Components ───────── */

function RatingBar({
  label,
  percentage,
  count,
}: {
  label: string
  percentage: number
  count: number
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-8 text-right text-sm text-muted-foreground">{label}</span>
      <div className="relative h-2 flex-1 overflow-hidden rounded-full bg-muted">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${percentage}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: motionTokens.easing.decelerate }}
          className="absolute inset-y-0 left-0 rounded-full bg-amber-400"
        />
      </div>
      <span className="w-6 text-right text-xs text-muted-foreground">{count}</span>
    </div>
  )
}

/* ───────── Main Component ───────── */

export function ProductReviews({
  reviews,
  rating,
  reviewCount,
  className,
}: ProductReviewsProps) {
  const [sortBy, setSortBy] = useState<"newest" | "highest" | "lowest">("newest")
  const [showAll, setShowAll] = useState(false)
  const displayedReviews = showAll ? reviews : reviews.slice(0, 3)

  // Rating distribution
  const distribution = [5, 4, 3, 2, 1].map((star) => {
    const count = reviews.filter((r) => Math.floor(r.rating) === star).length
    return { star, count, percentage: (count / reviews.length) * 100 }
  })

  // Sort reviews
  const sortedReviews = [...displayedReviews].sort((a, b) => {
    if (sortBy === "newest") return new Date(b.date).getTime() - new Date(a.date).getTime()
    if (sortBy === "highest") return b.rating - a.rating
    return a.rating - b.rating
  })

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: motionTokens.duration.slow / 1000, ease: motionTokens.easing.decelerate }}
      className={cn("w-full", className)}
    >
      {/* ── Header ── */}
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">Customer Reviews</h2>
            <Badge variant="secondary" className="rounded-md">
              {reviewCount}
            </Badge>
          </div>
          <div className="mt-2 flex items-center gap-3">
            <StarDisplay rating={Math.round(rating)} size={18} />
            <span className="text-lg font-semibold text-foreground">{rating}</span>
            <span className="text-sm text-muted-foreground">out of 5</span>
          </div>
        </div>

        <Button className="gap-2 shrink-0">
          <MessageSquare size={16} />
          Write a Review
        </Button>
      </div>

      {/* ── Rating Distribution ── */}
      <div className="mt-8 grid gap-1.5">
        {distribution.map(({ star, count, percentage }) => (
          <RatingBar
            key={star}
            label={`${star}`}
            percentage={percentage}
            count={count}
          />
        ))}
      </div>

      {/* ── Sort ── */}
      <div className="mt-8 flex items-center justify-between border-b border-border pb-4">
        <p className="text-sm text-muted-foreground">
          Showing {sortedReviews.length} of {reviews.length} reviews
        </p>
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            aria-label="Sort reviews"
            className="appearance-none rounded-lg border border-border bg-background px-3 py-1.5 pr-8 text-sm text-foreground outline-none transition-colors focus:border-foreground focus:ring-1 focus:ring-foreground"
          >
            <option value="newest">Most Recent</option>
            <option value="highest">Highest Rated</option>
            <option value="lowest">Lowest Rated</option>
          </select>
          <ChevronDown
            size={14}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
        </div>
      </div>

      {/* ── Review List ── */}
      <div className="divide-y divide-border">
        {sortedReviews.map((review, index) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: motionTokens.duration.normal / 1000,
              delay: index * 0.05,
              ease: motionTokens.easing.decelerate,
            }}
            className="py-6 first:pt-4 last:pb-0"
          >
            {/* Reviewer info */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-full bg-muted text-sm font-semibold text-foreground">
                  {review.author.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-foreground">
                      {review.author}
                    </span>
                    {review.verified && (
                      <Badge
                        variant="secondary"
                        className="gap-1 rounded-full px-2 py-0 text-xs font-normal"
                      >
                      <BadgeCheck size={12} className="text-green-600" />
                        Verified
                      </Badge>
                    )}
                  </div>
                  <div className="mt-0.5 flex items-center gap-2">
                    <StarDisplay rating={review.rating} size={12} />
                    <span className="text-xs text-muted-foreground">
                      {formatDate(review.date)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Review content */}
            <div className="mt-3">
              <h4 className="text-sm font-semibold text-foreground">{review.title}</h4>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                {review.content}
              </p>
            </div>

            {/* Helpful button */}
            <button
              type="button"
              className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              <ThumbsUp size={13} />
              Helpful ({review.helpful})
            </button>
          </motion.div>
        ))}
      </div>

      {/* ── Show more / Show less ── */}
      {reviews.length > 3 && (
        <div className="mt-6 text-center">
          <Button
            variant="outline"
            onClick={() => setShowAll(!showAll)}
            className="gap-2"
          >
            {showAll ? "Show Less" : `View All ${reviews.length} Reviews`}
            <ChevronDown
              size={14}
              className={cn(
                "transition-transform duration-200",
                showAll && "rotate-180",
              )}
            />
          </Button>
        </div>
      )}
    </motion.section>
  )
}