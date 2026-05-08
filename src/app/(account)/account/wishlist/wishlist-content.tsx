"use client"

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useWishlistStore } from "@/stores/wishlist-store"
import { Heart, ShoppingBag, Trash2 } from "lucide-react"
import { useCartStore } from "@/stores/cart-store"
import { toast } from "sonner"

export function WishlistContent() {
  const { items, removeItem } = useWishlistStore()
  const addToCart = useCartStore((s) => s.addItem)

  function handleAddToCart(item: { id: string; name: string; price: number; image: string }) {
    addToCart({ id: item.id, name: item.name, price: item.price, image: item.image })
    toast.success("Đã thêm vào giỏ hàng")
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Danh sách yêu thích</h1>
        <p className="mt-1 text-muted-foreground">
          {items.length > 0
            ? `Bạn có ${items.length} sản phẩm yêu thích`
            : "Bạn chưa có sản phẩm yêu thích nào"}
        </p>
      </div>

      {items.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center gap-4 py-16">
            <Heart className="h-12 w-12 text-muted-foreground/30" />
            <div className="text-center">
              <p className="text-sm font-medium">Danh sách yêu thích trống</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Thêm sản phẩm vào yêu thích để theo dõi chúng
              </p>
            </div>
            <Button asChild>
              <Link href="/products">Khám phá sản phẩm</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <Card key={item.id} className="group overflow-hidden">
              <div className="relative aspect-square bg-muted">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-2 h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
                  onClick={() => {
                    removeItem(item.id)
                    toast.success("Đã xóa khỏi yêu thích")
                  }}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
              <CardContent className="space-y-3 p-3">
                <div>
                  <Link
                    href={`/products/${item.id}`}
                    className="text-sm font-medium hover:underline"
                  >
                    {item.name}
                  </Link>
                  <p className="mt-1 text-sm font-bold">${item.price.toFixed(2)}</p>
                </div>
                <Button
                  size="sm"
                  className="w-full"
                  onClick={() => handleAddToCart(item)}
                >
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  Thêm vào giỏ
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
