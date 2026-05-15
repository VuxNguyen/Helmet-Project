"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useAuthStore } from "@/stores/auth-store"
import { Save, Camera } from "lucide-react"
import { toast } from "sonner"

export function ProfileContent() {
  const { user, login } = useAuthStore()

  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    dob: "",
  })

  function handleSave(e: React.FormEvent) {
    e.preventDefault()
    if (!form.name || !form.email) {
      toast.error("Vui lòng điền đầy đủ thông tin bắt buộc")
      return
    }
    login({ name: form.name, email: form.email, phone: form.phone, dob: form.dob })
    toast.success("Đã cập nhật hồ sơ")
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Hồ sơ cá nhân</h1>
        <p className="mt-1 text-muted-foreground">
          Quản lý thông tin cá nhân của bạn
        </p>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="flex flex-col items-center gap-4 bg-muted/30 px-6 py-8 sm:flex-row">
            <div className="relative">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                {form.name?.charAt(0)?.toUpperCase() || "U"}
              </div>
              <Button
                variant="outline"
                size="icon"
                className="absolute -bottom-1 -right-1 h-7 w-7 rounded-full"
              >
                <Camera className="h-3.5 w-3.5" />
              </Button>
            </div>
            <div className="text-center sm:text-left">
              <p className="text-lg font-semibold">{form.name || "Người dùng"}</p>
              <p className="text-sm text-muted-foreground">{form.email}</p>
            </div>
          </div>

          <Separator />

          <form onSubmit={handleSave} className="space-y-5 p-6">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Họ và tên *</Label>
                <Input
                  id="name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Số điện thoại</Label>
                <Input
                  id="phone"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dob">Ngày sinh</Label>
                <Input
                  id="dob"
                  type="date"
                  value={form.dob}
                  onChange={(e) => setForm({ ...form, dob: e.target.value })}
                />
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <Label htmlFor="current-pw">Mật khẩu hiện tại</Label>
              <Input id="current-pw" type="password" placeholder="••••••••" />
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="new-pw">Mật khẩu mới</Label>
                <Input id="new-pw" type="password" placeholder="••••••••" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-pw">Xác nhận mật khẩu</Label>
                <Input id="confirm-pw" type="password" placeholder="••••••••" />
              </div>
            </div>

            <div className="flex justify-end">
              <Button type="submit">
                <Save className="mr-2 h-4 w-4" />
                Lưu thay đổi
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
