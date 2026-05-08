'use client'
 
import { useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, ShieldCheck } from "lucide-react"
import { HeroBadge } from "./hero-badge"
import { HeroTrustBar } from "./hero-trust-bar"
import { motionTokens } from "@/lib/motion"
import { useTranslations } from "@/hooks/use-translations"

export function HeroSection() {
  const { t } = useTranslations()
  const sectionRef = useRef<HTMLDivElement>(null)
  const [imageStatus, setImageStatus] = useState<"loading" | "loaded" | "error">("loading")

  const fadeUp = (delay: number = 0) => ({
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: motionTokens.duration.slower / 1000,
      ease: motionTokens.easing.emphasis,
      delay,
    },
  })

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[90vh] overflow-hidden bg-black sm:min-h-screen"
    >
      {/* ═══ Background Image — static GPU-composited layer ═══ */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-[-5%] scale-[1.05] will-change-transform">
          <Image
            src="/hero-bg.jpg"
            alt="Premium motorcycle helmet"
            fill
            className={`object-cover object-center transition-opacity duration-700 ${
              imageStatus === "loaded" ? "opacity-100" : "opacity-0"
            }`}
            priority
            sizes="100vw"
            onLoad={() => setImageStatus("loaded")}
            onError={() => setImageStatus("error")}
          />
        </div>

        {/* Fallback background (only shown when image fails) */}
        {imageStatus === "error" && (
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-black to-zinc-800" />
        )}
      </div>

      {/* ═══ Gradient overlays (kept outside parallax — stays fixed for smoothness) ═══ */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-black/80 via-black/50 to-black/30" />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-black/40 via-transparent to-black/40" />

      {/* ═══ Subtle ambient glow ═══ */}
      <div className="pointer-events-none absolute left-1/2 top-1/3 z-[1] h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/5 blur-[120px]" />

      {/* ═══ Content ═══ */}
      <div className="relative z-10 mx-auto flex min-h-[90vh] max-w-7xl flex-col justify-center px-4 pb-16 pt-28 sm:px-6 sm:pb-20 lg:px-8 sm:min-h-screen">
        <div className="max-w-3xl">
          {/* Badge */}
          <HeroBadge text={t("hero.badge")} />

          {/* Heading */}
          <motion.h1
            {...fadeUp(0.2)}
            className="mt-6 text-5xl font-bold leading-none tracking-tighter text-white sm:text-6xl md:text-7xl lg:text-8xl"
          >
            {t("hero.headingLine1")}
            <br />
            <span className="bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent">
              {t("hero.headingLine2")}
            </span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            {...fadeUp(0.3)}
            className="mt-4 max-w-xl text-base leading-relaxed text-white/60 sm:mt-6 sm:text-lg"
          >
            {t("hero.subtext")}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            {...fadeUp(0.4)}
            className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center"
          >
            <Link
              href="/products"
              className="group inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-white px-8 text-sm font-semibold text-black transition-all duration-200 hover:bg-white/90 hover:shadow-lg active:scale-[0.97]"
            >
              {t("hero.shopCollection")}
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/collections"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/5 px-8 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/10 hover:border-white/30 active:scale-[0.97]"
            >
              {t("hero.exploreCollections")}
            </Link>
          </motion.div>

          {/* Safety certification badge */}
          <motion.div
            {...fadeUp(0.45)}
            className="mt-6 flex items-center gap-2 text-xs text-white/40"
          >
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>{t("hero.safetyCert")}</span>
          </motion.div>

          {/* Trust Indicators */}
          <HeroTrustBar />
        </div>
      </div>

      {/* ═══ Scroll indicator ═══ */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 sm:block"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs tracking-widest text-white/30 uppercase">
            {t("hero.scroll")}
          </span>
          <div className="h-8 w-[1px] bg-gradient-to-b from-white/30 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  )
}