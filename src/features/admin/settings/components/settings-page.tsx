"use client"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { ProfileTab } from "./profile-tab"
import { StoreTab } from "./store-tab"
import { NotificationsTab } from "./notifications-tab"
import { AppearanceTab } from "./appearance-tab"
import { SecurityTab } from "./security-tab"

const tabs = [
  { value: "profile", label: "Profile" },
  { value: "store", label: "Store" },
  { value: "notifications", label: "Notifications" },
  { value: "appearance", label: "Appearance" },
  { value: "security", label: "Security" },
] as const

export function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold tracking-tight">Settings</h2>
        <p className="text-sm text-muted-foreground">
          Manage your account and store preferences.
        </p>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList variant="line" className="w-full h-auto gap-0 border-b border-border rounded-none bg-transparent p-0 overflow-x-auto">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="rounded-none border-b-2 border-transparent data-active:border-foreground data-active:bg-transparent px-4 py-2.5 text-sm font-medium text-muted-foreground data-active:text-foreground transition-colors"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <div className="mt-6">
          <TabsContent value="profile">
            <ProfileTab />
          </TabsContent>
          <TabsContent value="store">
            <StoreTab />
          </TabsContent>
          <TabsContent value="notifications">
            <NotificationsTab />
          </TabsContent>
          <TabsContent value="appearance">
            <AppearanceTab />
          </TabsContent>
          <TabsContent value="security">
            <SecurityTab />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}
