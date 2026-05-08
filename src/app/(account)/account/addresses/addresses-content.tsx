"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  MapPin,
  Plus,
  Pencil,
  Trash2,
  Check,
  X,
} from "lucide-react"
import { toast } from "sonner"

interface Address {
  id: string
  type: "home" | "office"
  name: string
  phone: string
  street: string
  ward: string
  district: string
  city: string
  isDefault: boolean
}

const initialAddresses: Address[] = [
  {
    id: "1",
    type: "home",
    name: "Nguyễn Văn A",
    phone: "0901 234 567",
    street: "123 Nguyễn Huệ",
    ward: "Phường Bến Nghé",
    district: "Quận 1",
    city: "TP. Hồ Chí Minh",
    isDefault: true,
  },
  {
    id: "2",
    type: "office",
    name: "Nguyễn Văn A",
    phone: "0909 888 777",
    street: "456 Lê Lợi",
    ward: "Phường 3",
    district: "Quận 3",
    city: "TP. Hồ Chí Minh",
    isDefault: false,
  },
]

export function AddressesContent() {
  const [addresses, setAddresses] = useState<Address[]>(initialAddresses)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({
    type: "home" as "home" | "office",
    name: "",
    phone: "",
    street: "",
    ward: "",
    district: "",
    city: "",
  })

  function resetForm() {
    setForm({ type: "home", name: "", phone: "", street: "", ward: "", district: "", city: "" })
    setEditingId(null)
    setShowForm(false)
  }

  function handleSave() {
    if (!form.name || !form.phone || !form.street || !form.city) {
      toast.error("Vui lòng điền đầy đủ thông tin bắt buộc")
      return
    }

    if (editingId) {
      setAddresses((prev) =>
        prev.map((a) => (a.id === editingId ? { ...a, ...form } : a)),
      )
      toast.success("Đã cập nhật địa chỉ")
    } else {
      const newAddress: Address = {
        id: String(Date.now()),
        ...form,
        isDefault: addresses.length === 0,
      }
      setAddresses((prev) => [...prev, newAddress])
      toast.success("Đã thêm địa chỉ mới")
    }
    resetForm()
  }

  function handleEdit(address: Address) {
    setForm({
      type: address.type,
      name: address.name,
      phone: address.phone,
      street: address.street,
      ward: address.ward,
      district: address.district,
      city: address.city,
    })
    setEditingId(address.id)
    setShowForm(true)
  }

  function handleDelete(id: string) {
    setAddresses((prev) => prev.filter((a) => a.id !== id))
    toast.success("Đã xóa địa chỉ")
  }

  function handleSetDefault(id: string) {
    setAddresses((prev) =>
      prev.map((a) => ({ ...a, isDefault: a.id === id })),
    )
    toast.success("Đã đặt làm địa chỉ mặc định")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Địa chỉ của tôi</h1>
          <p className="mt-1 text-muted-foreground">
            Quản lý địa chỉ giao hàng của bạn
          </p>
        </div>
        {!showForm && (
          <Button onClick={() => setShowForm(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Thêm địa chỉ
          </Button>
        )}
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold">
              {editingId ? "Sửa địa chỉ" : "Thêm địa chỉ mới"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Họ và tên *</Label>
                <Input
                  id="name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Số điện thoại *</Label>
                <Input
                  id="phone"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="street">Địa chỉ *</Label>
                <Input
                  id="street"
                  value={form.street}
                  onChange={(e) => setForm({ ...form, street: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ward">Phường/Xã</Label>
                <Input
                  id="ward"
                  value={form.ward}
                  onChange={(e) => setForm({ ...form, ward: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="district">Quận/Huyện</Label>
                <Input
                  id="district"
                  value={form.district}
                  onChange={(e) => setForm({ ...form, district: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">Thành phố *</Label>
                <Input
                  id="city"
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Loại địa chỉ</Label>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant={form.type === "home" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setForm({ ...form, type: "home" })}
                  >
                    Nhà riêng
                  </Button>
                  <Button
                    type="button"
                    variant={form.type === "office" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setForm({ ...form, type: "office" })}
                  >
                    Văn phòng
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 pt-2">
              <Button onClick={handleSave}>
                <Check className="mr-2 h-4 w-4" />
                Lưu
              </Button>
              <Button variant="outline" onClick={resetForm}>
                <X className="mr-2 h-4 w-4" />
                Hủy
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {addresses.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center gap-4 py-16">
            <MapPin className="h-12 w-12 text-muted-foreground/30" />
            <div className="text-center">
              <p className="text-sm font-medium">Chưa có địa chỉ nào</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Thêm địa chỉ giao hàng để mua sắm thuận tiện hơn
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {addresses.map((address) => (
            <Card key={address.id}>
              <CardContent className="flex items-start justify-between p-4">
                <div className="flex gap-3">
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{address.name}</span>
                      <Badge variant="secondary" className="text-[10px]">
                        {address.type === "home" ? "Nhà riêng" : "Văn phòng"}
                      </Badge>
                      {address.isDefault && (
                        <Badge variant="default" className="text-[10px]">
                          Mặc định
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">{address.phone}</p>
                    <p className="text-xs text-muted-foreground">
                      {address.street}, {address.ward}, {address.district}, {address.city}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {!address.isDefault && (
                    <Button
                      variant="ghost"
                      size="icon-xs"
                      onClick={() => handleSetDefault(address.id)}
                      title="Đặt làm mặc định"
                    >
                      <Check className="h-3.5 w-3.5" />
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="icon-xs"
                    onClick={() => handleEdit(address)}
                    title="Sửa"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon-xs"
                    onClick={() => handleDelete(address.id)}
                    title="Xóa"
                  >
                    <Trash2 className="h-3.5 w-3.5 text-destructive" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
