import { type LucideIcon } from "lucide-react"
import {
  Shield,
  Wind,
  Sun,
  Baby,
  Wrench,
} from "lucide-react"

export interface Category {
  id: string
  name: string
  slug: string
  description: string
  icon: LucideIcon
  gradient: string
  count: number
}

export const categories: Category[] = [
  {
    id: "fullface",
    name: "Fullface Helmets",
    slug: "/products?category=fullface",
    description: "Maximum protection for aggressive riding",
    icon: Shield,
    gradient: "from-zinc-900 to-zinc-700",
    count: 24,
  },
  {
    id: "three-quarter",
    name: "3/4 Helmets",
    slug: "/products?category=three-quarter",
    description: "Open face freedom with reliable coverage",
    icon: Wind,
    gradient: "from-neutral-800 to-neutral-600",
    count: 18,
  },
  {
    id: "half",
    name: "Half Helmets",
    slug: "/products?category=half",
    description: "Minimalist style for cruising",
    icon: Sun,
    gradient: "from-stone-900 to-stone-700",
    count: 12,
  },
  {
    id: "kids",
    name: "Kids Helmets",
    slug: "/products?category=kids",
    description: "Safe & comfortable fit for young riders",
    icon: Baby,
    gradient: "from-zinc-800 to-zinc-600",
    count: 15,
  },
  {
    id: "accessories",
    name: "Accessories",
    slug: "/products?category=accessories",
    description: "Visors, padding, bags & more",
    icon: Wrench,
    gradient: "from-neutral-900 to-neutral-700",
    count: 32,
  },
]