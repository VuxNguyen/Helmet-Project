import type { Metadata } from "next"
import { WishlistContent } from "./wishlist-content"

export const metadata: Metadata = {
  title: "Danh sách yêu thích",
}

export default function WishlistPage() {
  return <WishlistContent />
}
