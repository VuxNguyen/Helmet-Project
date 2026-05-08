'use client'

import { useState, useCallback } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react"

import { cn } from "@/lib/utils"
import { motionTokens } from "@/lib/motion"

/* ───────── Types ───────── */

interface ProductGalleryProps {
  images: string[]
  productName: string
  discount?: number
  className?: string
}

/* ───────── Component ───────── */

export function ProductGallery({
  images,
  productName,
  discount,
  className,
}: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 })
  const [loaded, setLoaded] = useState<Set<number>>(new Set([0]))

  const currentImage = images[activeIndex] ?? images[0]

  const handlePrev = useCallback(() => {
    setIsZoomed(false)
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }, [images.length])

  const handleNext = useCallback(() => {
    setIsZoomed(false)
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }, [images.length])

  const handleThumbnailClick = useCallback((index: number) => {
    setIsZoomed(false)
    setActiveIndex(index)
  }, [])

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isZoomed) return
      const rect = e.currentTarget.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100
      setZoomPosition({ x, y })
    },
    [isZoomed],
  )

  const handleImageLoad = useCallback((index: number) => {
    setLoaded((prev) => new Set(prev).add(index))
  }, [])

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {/* ── Main Image ── */}
      <div className="relative overflow-hidden rounded-xl border border-border bg-card">
        <div
          className="relative aspect-square cursor-crosshair"
          onMouseEnter={() => setIsZoomed(true)}
          onMouseLeave={() => setIsZoomed(false)}
          onMouseMove={handleMouseMove}
        >
          {/* Skeleton */}
          {!loaded.has(activeIndex) && (
            <div className="absolute inset-0 animate-pulse bg-muted" />
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: motionTokens.duration.normal / 1000 }}
              className="absolute inset-0"
            >
              <Image
                src={currentImage}
                alt={`${productName} - Image ${activeIndex + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                priority={activeIndex === 0}
                className={cn(
                  "object-cover transition-opacity duration-300",
                  loaded.has(activeIndex) ? "opacity-100" : "opacity-0",
                  isZoomed && "scale-150",
                )}
                style={
                  isZoomed
                    ? { transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%` }
                    : undefined
                }
                onLoad={() => handleImageLoad(activeIndex)}
              />
            </motion.div>
          </AnimatePresence>

          {/* Discount badge */}
          {discount && discount > 0 && (
            <div className="absolute left-4 top-4 z-10 rounded-lg bg-destructive px-3 py-1 text-sm font-bold text-destructive-foreground shadow-lg">
              -{discount}%
            </div>
          )}

          {/* Zoom indicator */}
          {!isZoomed && (
            <div className="absolute bottom-4 right-4 z-10 flex size-9 items-center justify-center rounded-full bg-background/60 text-muted-foreground backdrop-blur-sm transition-opacity hover:opacity-80">
              <ZoomIn size={16} />
            </div>
          )}

          {/* Nav arrows */}
          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous image"
                className="absolute left-3 top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-background/60 text-foreground opacity-0 backdrop-blur-sm transition-all duration-200 hover:bg-background/80 group-hover:opacity-100 md:opacity-0 md:hover:opacity-100"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next image"
                className="absolute right-3 top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-background/60 text-foreground opacity-0 backdrop-blur-sm transition-all duration-200 hover:bg-background/80 group-hover:opacity-100 md:opacity-0 md:hover:opacity-100"
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}

          {/* Dots indicator (mobile) */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-1.5 md:hidden">
              {images.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleThumbnailClick(i)}
                  aria-label={`View image ${i + 1}`}
                  className={cn(
                    "size-2 rounded-full transition-all duration-200",
                    i === activeIndex
                      ? "w-6 bg-foreground"
                      : "bg-foreground/30 hover:bg-foreground/50",
                  )}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Thumbnails ── */}
      {images.length > 1 && (
        <div className="hidden gap-3 md:flex">
          {images.map((image, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleThumbnailClick(index)}
              aria-label={`View image ${index + 1}`}
              className={cn(
                "relative aspect-square w-full max-w-[100px] overflow-hidden rounded-lg border-2 transition-all duration-200",
                index === activeIndex
                  ? "border-foreground ring-1 ring-foreground"
                  : "border-border hover:border-foreground/40",
              )}
            >
              {!loaded.has(index) && (
                <div className="absolute inset-0 animate-pulse bg-muted" />
              )}
              <Image
                src={image}
                alt={`${productName} thumbnail ${index + 1}`}
                fill
                sizes="100px"
                className={cn(
                  "object-cover transition-opacity duration-300",
                  loaded.has(index) ? "opacity-100" : "opacity-0",
                )}
                onLoad={() => handleImageLoad(index)}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}