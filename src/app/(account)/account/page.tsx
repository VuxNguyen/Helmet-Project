import type { Metadata } from "next"
import { OverviewContent } from "./overview-content"

export const metadata: Metadata = {
  title: "Tổng quan tài khoản",
}

export default function AccountOverviewPage() {
  return <OverviewContent />
}
