import type { Metadata } from "next"
import { ProfileContent } from "./profile-content"

export const metadata: Metadata = {
  title: "Hồ sơ cá nhân",
}

export default function ProfilePage() {
  return <ProfileContent />
}
