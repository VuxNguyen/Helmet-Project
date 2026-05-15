import { create } from "zustand"
import { persist } from "zustand/middleware"

type ThemeMode = "dark" | "light" | "system"
type SidebarBehavior = "expanded" | "collapsed"

export interface AdminSettings {
  // Profile
  name: string
  email: string
  phone: string
  bio: string

  // Store
  storeName: string
  storeEmail: string
  description: string
  currency: string
  language: string
  timezone: string

  // Notifications
  orderConfirmed: boolean
  orderShipped: boolean
  orderDelivered: boolean
  lowStock: boolean
  newCustomer: boolean
  reviewSubmitted: boolean
  weeklyReport: boolean
  monthlyDigest: boolean
  marketingEmails: boolean

  // Appearance
  themeMode: ThemeMode
  sidebarBehavior: SidebarBehavior
  reducedMotion: boolean
  compactMode: boolean
}

interface AdminSettingsState {
  settings: AdminSettings
  updateSettings: (data: Partial<AdminSettings>) => void
  resetSettings: () => void
}

const defaultSettings: AdminSettings = {
  name: "Admin",
  email: "admin@helmetpro.com",
  phone: "",
  bio: "",
  storeName: "Helmet Pro",
  storeEmail: "store@helmetpro.com",
  description: "Premium motorcycle helmets and gear.",
  currency: "USD",
  language: "en",
  timezone: "America/New_York",
  orderConfirmed: true,
  orderShipped: true,
  orderDelivered: true,
  lowStock: true,
  newCustomer: false,
  reviewSubmitted: false,
  weeklyReport: true,
  monthlyDigest: false,
  marketingEmails: false,
  themeMode: "dark",
  sidebarBehavior: "expanded",
  reducedMotion: false,
  compactMode: false,
}

export const useAdminSettingsStore = create<AdminSettingsState>()(
  persist(
    (set) => ({
      settings: defaultSettings,

      updateSettings: (data) =>
        set((state) => ({
          settings: { ...state.settings, ...data },
        })),

      resetSettings: () => set({ settings: defaultSettings }),
    }),
    {
      name: "helmetpro-admin-settings",
    },
  ),
)
