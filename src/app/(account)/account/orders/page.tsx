import type { Metadata } from "next"
import { OrdersContent } from "./orders-content"

export const metadata: Metadata = {
  title: "Lịch sử đơn hàng",
}

export default function OrdersPage() {
  return <OrdersContent />
}
