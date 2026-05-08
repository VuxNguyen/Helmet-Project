'use client'

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronDown, Ruler, Shield, Wind, Weight, Eye } from "lucide-react"

import { cn } from "@/lib/utils"
import { motionTokens } from "@/lib/motion"
import type { ProductSpecification } from "../types/product-detail"

/* ───────── Types ───────── */

interface ProductDescriptionProps {
  description: string
  specifications: ProductSpecification[]
  className?: string
}

/* ───────── Tab Config ───────── */

const TABS = [
  { id: "description", label: "Description" },
  { id: "specifications", label: "Specifications" },
] as const

type TabId = (typeof TABS)[number]["id"]

/* ───────── Icons map ───────── */

const specIcons: Record<string, React.ReactNode> = {
  "Shell Material": <Shield size={16} />,
  "Weight": <Weight size={16} />,
  "Safety Rating": <Shield size={16} />,
  "Visor Type": <Eye size={16} />,
  "Ventilation": <Wind size={16} />,
}

/* ───────── Component ───────── */

export function ProductDescription({
  description,
  specifications,
  className,
}: ProductDescriptionProps) {
  const [activeTab, setActiveTab] = useState<TabId>("description")

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: motionTokens.duration.slow / 1000, ease: motionTokens.easing.decelerate }}
      className={cn("w-full", className)}
    >
      {/* ── Tabs ── */}
      <div className="border-b border-border" role="tablist" aria-label="Product information">
        <div className="flex gap-0">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeTab === tab.id}
              aria-controls={`panel-${tab.id}`}
              id={`tab-${tab.id}`}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "relative px-6 py-4 text-sm font-medium transition-colors duration-200",
                activeTab === tab.id
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground/80",
              )}
            >
              {tab.label}
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-foreground"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ── Description Panel ── */}
      {activeTab === "description" && (
        <motion.div
          key="description"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: motionTokens.duration.normal / 1000 }}
          role="tabpanel"
          id="panel-description"
          aria-labelledby="tab-description"
          className="py-8"
        >
          <div className="prose prose-sm max-w-none text-muted-foreground dark:prose-invert">
            {description.split("\n\n").map((paragraph, i) => (
              <p key={i} className="mb-4 last:mb-0 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </motion.div>
      )}

      {/* ── Specifications Panel ── */}
      {activeTab === "specifications" && (
        <motion.div
          key="specifications"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: motionTokens.duration.normal / 1000 }}
          role="tabpanel"
          id="panel-specifications"
          aria-labelledby="tab-specifications"
          className="py-8"
        >
          <div className="overflow-hidden rounded-xl border border-border">
            <table className="w-full text-sm">
              <tbody>
                {specifications.map((spec, index) => (
                  <tr
                    key={spec.label}
                    className={cn(
                      "transition-colors hover:bg-muted/50",
                      index % 2 === 0 ? "bg-background" : "bg-muted/30",
                    )}
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <span className="shrink-0 text-muted-foreground">
                          {specIcons[spec.label] ?? <Ruler size={16} />}
                        </span>
                        <span className="font-medium text-foreground">{spec.label}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-right text-muted-foreground">
                      {spec.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}
    </motion.section>
  )
}