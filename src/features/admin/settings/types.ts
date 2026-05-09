export type ThemeMode = "dark" | "light" | "system"

export type SidebarBehavior = "expanded" | "collapsed"

export interface ProfileFormValues {
  name: string
  email: string
  phone: string
  bio: string
}

export interface StoreFormValues {
  storeName: string
  storeEmail: string
  currency: string
  language: string
  timezone: string
  description: string
}

export interface NotificationFormValues {
  orderConfirmed: boolean
  orderShipped: boolean
  orderDelivered: boolean
  lowStock: boolean
  newCustomer: boolean
  reviewSubmitted: boolean
  marketingEmails: boolean
  weeklyReport: boolean
}

export interface AppearanceFormValues {
  theme: ThemeMode
  sidebarBehavior: SidebarBehavior
  reducedMotion: boolean
  compactMode: boolean
}

export interface SecurityFormValues {
  currentPassword: string
  newPassword: string
  confirmPassword: string
  twoFactorEnabled: boolean
}

export const CURRENCY_OPTIONS = [
  { value: "USD", label: "USD ($)" },
  { value: "EUR", label: "EUR (€)" },
  { value: "GBP", label: "GBP (£)" },
  { value: "VND", label: "VND (₫)" },
  { value: "JPY", label: "JPY (¥)" },
]

export const LANGUAGE_OPTIONS = [
  { value: "en", label: "English" },
  { value: "vi", label: "Vietnamese" },
  { value: "fr", label: "French" },
  { value: "de", label: "German" },
]

export const TIMEZONE_OPTIONS = [
  { value: "America/New_York", label: "Eastern (UTC-5)" },
  { value: "America/Chicago", label: "Central (UTC-6)" },
  { value: "America/Denver", label: "Mountain (UTC-7)" },
  { value: "America/Los_Angeles", label: "Pacific (UTC-8)" },
  { value: "Europe/London", label: "London (UTC+0)" },
  { value: "Europe/Paris", label: "Paris (UTC+1)" },
  { value: "Asia/Ho_Chi_Minh", label: "HCMC (UTC+7)" },
  { value: "Asia/Tokyo", label: "Tokyo (UTC+9)" },
]

export const THEME_OPTIONS = [
  { value: "dark", label: "Dark" },
  { value: "light", label: "Light" },
  { value: "system", label: "System" },
]

export const SIDEBAR_OPTIONS = [
  { value: "expanded", label: "Expanded" },
  { value: "collapsed", label: "Collapsed" },
]
