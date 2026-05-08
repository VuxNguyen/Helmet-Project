/**
 * Application-wide constants.
 */

export const SITE = {
  name: "Helmet Pro",
  tagline: "Premium Motorcycle Helmets",
  description:
    "Discover our premium collection of motorcycle helmets. Safety meets style.",
  url: "https://helmetpro.com",
  email: "hello@helmetpro.com",
  phone: "+1 (555) 123-4567",
  address: "123 Rider Lane, Austin, TX 78701",
} as const;

export const NAVIGATION = {
  primary: [
    { label: "Shop", href: "/products" },
    { label: "Collections", href: "/collections" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  footer: {
    shop: [
      { label: "All Helmets", href: "/products" },
      { label: "Full Face", href: "/products?category=full-face" },
      { label: "Modular", href: "/products?category=modular" },
      { label: "Open Face", href: "/products?category=open-face" },
      { label: "Accessories", href: "/products?category=accessories" },
    ],
    support: [
      { label: "Contact Us", href: "/contact" },
      { label: "FAQ", href: "/faq" },
      { label: "Shipping & Returns", href: "/shipping" },
      { label: "Size Guide", href: "/size-guide" },
      { label: "Warranty", href: "/warranty" },
    ],
    company: [
      { label: "About Us", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Press", href: "/press" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
  social: [
    { label: "Instagram", href: "#", icon: "instagram" },
    { label: "Facebook", href: "#", icon: "facebook" },
    { label: "Twitter", href: "#", icon: "twitter" },
    { label: "YouTube", href: "#", icon: "youtube" },
  ],
} as const;

export const PAGINATION = {
  defaultPageSize: 12,
  maxVisiblePages: 5,
} as const;

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

export const SECTIONS = {
  spacing: {
    mobile: "py-16",
    desktop: "py-24",
  },
  container: "mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8",
} as const;