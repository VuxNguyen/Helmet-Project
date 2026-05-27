# Hướng dẫn Test API Helmet-Project trên Postman

## Mục lục
1. [Giới thiệu](#1-giới-thiệu)
2. [Cách chạy dự án](#2-cách-chạy-dự-án)
3. [Cài đặt Postman](#3-cài-đặt-postman)
4. [Import Postman Collection](#4-import-postman-collection)
5. [Danh sách tất cả API Endpoints](#5-danh-sách-tất-cả-api-endpoints)
6. [Hướng dẫn chi tiết từng API](#6-hướng-dẫn-chi-tiết-từng-api)
7. [Workflow test hoàn chỉnh](#7-workflow-test-hoàn-chỉnh)
8. [Xử lý lỗi thường gặp](#8-xử-lý-lỗi-thường-gặp)
9. [Mẹo Postman nâng cao](#9-mẹo-postman-nâng-cao)

---

## 1. Giới thiệu

Dự án **Helmet-Project** là một website bán mũ bảo hiểm (motorcycle helmet shop) sử dụng:
- **Next.js 16** với **App Router**
- **Next.js API Route Handlers** (API endpoints tại `src/app/api/`)
- **JSON Database** (lưu dữ liệu tạm thời qua `src/lib/json-db.ts`)
- **NextAuth** cho authentication
- **Zustand** cho state management

### Kiến trúc API

```
Browser
    │
    ├── Next.js Pages (UI)
    │       └── Gọi API qua axios/fetch
    │
    ├── Next.js API Routes (src/app/api/)
    │       ├── /auth/*         → Xác thực người dùng
    │       ├── /products/*     → Sản phẩm
    │       ├── /cart/*         → Giỏ hàng
    │       ├── /orders/*       → Đơn hàng
    │       ├── /checkout       → Thanh toán
    │       ├── /wishlist/*     → Yêu thích
    │       ├── /addresses/*    → Địa chỉ
    │       ├── /admin/*        → Quản trị
    │       └── /shipping-methods, /states → Dữ liệu phụ
    │
    └── JSON Files (data/*.json) ← Nguồn dữ liệu
```

> **Lưu ý quan trọng:** Dự án này dùng JSON file làm database tạm, KHÔNG phải database thật (PostgreSQL, MySQL...). Dữ liệu sẽ bị reset khi server restart hoặc khi deploy.

---

## 2. Cách chạy dự án

### Yêu cầu
- **Node.js** >= 18
- **npm** hoặc **yarn**

### Các bước

```bash
# 1. Di chuyển vào thư mục dự án
cd "Helmet-Project"

# 2. Cài đặt dependencies
npm install

# 3. Chạy development server
npm run dev
```

Server sẽ chạy tại: **http://localhost:3000**

> **Luôn đảm bảo server đang chạy trước khi test API trên Postman!**

---

## 3. Cài đặt Postman

### Tải và cài đặt Postman

1. Truy cập https://www.postman.com/downloads/
2. Tải bản phù hợp với hệ điều hành (Windows/macOS/Linux)
3. Cài đặt và đăng ký tài khoản (miễn phí)

### Giao diện Postman cơ bản

```
┌─────────────────────────────────────────────────┐
│  Menu Bar                                       │
├─────────────────────────────────────────────────┤
│  📁 Collections  │  🔍 APIs  │  📊 Workspaces   │
├─────────────────────────────────────────────────┤
│  New / Import                                    │
│                                                 │
│  📁 My Collections                              │
│     ├── 📁 Helmet-Project API  ← Collection     │
│     │   ├── 🏷️ Auth                            │
│     │   ├── 🏷️ Products                        │
│     │   └── ...                                 │
└─────────────────────────────────────────────────┘
```

---

## 4. Import Postman Collection

File **Helmet-Project.postman_collection.json** đã được tạo sẵn trong thư mục dự án.

### Cách import:

**Cách 1: Kéo thả file**
1. Mở Postman
2. Kéo file `.json` vào cửa sổ Postman
3. Click "Import"

**Cách 2: Import từ menu**
1. Postman → File → Import
2. Chọn file `Helmet-Project.postman_collection.json`
3. Click "Open" → "Import"

### Cấu trúc Collection sau khi import:

```
📁 Helmet-Project API
│
├── 📋 Variables (tự động)
│   ├── base_url = http://localhost:3000
│   └── auth_token = (để trống, sẽ được set tự động)
│
├── 🏷️ Auth
│   ├── 📝 Register (POST)
│   ├── 📝 Login (POST)
│   └── 📝 Logout (POST)
│
├── 🏷️ Products
│   ├── 📥 Get All Products (GET)
│   ├── 📥 Get Featured Products (GET)
│   └── 📥 Get Product By Slug (GET)
│
├── 🏷️ Cart
│   ├── 📥 Get Cart (GET)
│   └── 📝 Add to Cart (POST)
│
├── 🏷️ Orders
│   ├── 📥 Get Orders (GET)
│   └── 📥 Get Order By ID (GET)
│
├── 🏷️ Checkout
│   └── 📝 Create Order (POST)
│
├── 🏷️ Wishlist
│   ├── 📥 Get Wishlist (GET)
│   └── 📝 Add to Wishlist (POST)
│
├── 🏷️ Addresses
│   ├── 📥 Get Addresses (GET)
│   └── 📝 Create Address (POST)
│
├── 🏷️ Admin
│   ├── 📥 Dashboard Stats (GET)
│   ├── 📥 Get Customers (GET)
│   ├── 📥 Get All Orders (GET)
│   └── 📥 Get All Products (GET)
│
├── 🏷️ Other
│   ├── 📥 Get Shipping Methods (GET)
│   └── 📥 Get States/Provinces (GET)
│
└── 🔄 Workflow
    └── 🔄 Complete Purchase Flow (tự động)
```

### Cập nhật Variables

Sau khi import, kiểm tra Collection Variables:

| Variable | Initial Value | Current Value |
|----------|--------------|---------------|
| `base_url` | `http://localhost:3000` | `http://localhost:3000` |
| `auth_token` | *(trống)* | *(tự động set khi login)* |

---

## 5. Danh sách tất cả API Endpoints

| # | Method | Endpoint | Auth? | Mô tả |
|---|--------|----------|-------|-------|
| 1 | POST | `/api/auth/register` | ❌ | Đăng ký tài khoản mới |
| 2 | POST | `/api/auth/login` | ❌ | Đăng nhập |
| 3 | POST | `/api/auth/logout` | ❌ | Đăng xuất |
| 4 | GET | `/api/products` | ❌ | Lấy danh sách sản phẩm (có filter) |
| 5 | GET | `/api/products/featured` | ❌ | Sản phẩm nổi bật |
| 6 | GET | `/api/products/[slug]` | ❌ | Chi tiết sản phẩm theo slug |
| 7 | GET | `/api/cart` | ❌ | Lấy giỏ hàng hiện tại |
| 8 | POST | `/api/cart/items` | ❌ | Thêm sản phẩm vào giỏ |
| 9 | GET | `/api/orders` | ❌ | Lấy danh sách đơn hàng |
| 10 | GET | `/api/orders/[id]` | ❌ | Chi tiết đơn hàng theo ID |
| 11 | POST | `/api/checkout` | ❌ | Tạo đơn hàng mới (checkout) |
| 12 | GET | `/api/wishlist` | ❌ | Lấy danh sách yêu thích |
| 13 | POST | `/api/wishlist/items` | ❌ | Thêm vào yêu thích |
| 14 | GET | `/api/addresses` | ❌ | Lấy danh sách địa chỉ |
| 15 | POST | `/api/addresses` | ❌ | Thêm địa chỉ mới |
| 16 | GET | `/api/admin/stats` | ❌ | Thống kê dashboard |
| 17 | GET | `/api/admin/customers` | ❌ | Danh sách khách hàng |
| 18 | GET | `/api/admin/orders` | ❌ | Danh sách đơn hàng (admin) |
| 19 | GET | `/api/admin/products` | ❌ | Danh sách sản phẩm (admin) |
| 20 | GET | `/api/shipping-methods` | ❌ | Phương thức vận chuyển |
| 21 | GET | `/api/states` | ❌ | Danh sách tỉnh/thành |

---

## 6. Hướng dẫn chi tiết từng API

### 6.1 POST /api/auth/register — Đăng ký

**Mục đích:** Tạo tài khoản người dùng mới

**Method:** `POST`
**URL:** `{{base_url}}/api/auth/register`
**Auth required:** ❌ Không

**Headers:**
```
Content-Type: application/json
```

**Body (raw JSON):**
```json
{
  "fullName": "Nguyễn Văn A",
  "email": "nguyenvana@email.com",
  "password": "password123"
}
```

**Success Response (201 Created):**
```json
{
  "user": {
    "id": "user-1745049600000",
    "name": "Nguyễn Văn A",
    "email": "nguyenvana@email.com",
    "createdAt": "2026-01-01T00:00:00.000Z"
  },
  "token": "mock-token-user-1745049600000"
}
```

**Error Responses:**
- `400`: Thiếu field / Email không hợp lệ / Password < 8 ký tự
- `409`: Email đã tồn tại

```json
// 400 - Invalid email
{ "error": "Invalid email address" }

// 400 - Password too short
{ "error": "Password must be at least 8 characters" }

// 409 - Email exists
{ "error": "Email already registered" }
```

---

### 6.2 POST /api/auth/login — Đăng nhập

**Mục đích:** Đăng nhập vào tài khoản, nhận token

**Method:** `POST`
**URL:** `{{base_url}}/api/auth/login`
**Auth required:** ❌ Không

**Headers:**
```
Content-Type: application/json
```

**Body (raw JSON):**
```json
{
  "email": "nguyenvana@email.com",
  "password": "password123"
}
```

**Success Response (200 OK):**
```json
{
  "user": {
    "id": "user-1745049600000",
    "name": "Nguyễn Văn A",
    "email": "nguyenvana@email.com",
    "createdAt": "2026-01-01T00:00:00.000Z"
  },
  "token": "mock-token-user-1745049600000"
}
```

**Error Responses:**
```json
// 400 - Missing fields
{ "error": "Email and password are required" }

// 401 - Wrong credentials
{ "error": "Invalid credentials" }
```

> **Mẹo:** Trong Postman, bạn có thể dùng **Tests tab** để tự động lưu token:
```javascript
// Trong tab Tests của request Login
if (pm.response.code === 200) {
    const jsonData = pm.response.json();
    pm.collectionVariables.set('auth_token', jsonData.token);
    console.log('Token saved:', jsonData.token);
}
```

---

### 6.3 POST /api/auth/logout — Đăng xuất

**Mục đích:** Đăng xuất khỏi tài khoản

**Method:** `POST`
**URL:** `{{base_url}}/api/auth/logout`
**Auth required:** ❌ Không

**Headers:** Không cần

**Body:** Không cần

**Response (200 OK):**
```json
{
  "message": "Logged out successfully"
}
```

---

### 6.4 GET /api/products — Lấy sản phẩm (quan trọng nhất)

**Mục đích:** Lấy danh sách sản phẩm với nhiều tùy chọn filter, sort, phân trang

**Method:** `GET`
**URL:** `{{base_url}}/api/products`
**Auth required:** ❌ Không

**Query Parameters (tất cả đều optional):**

| Parameter | Type | Ví dụ | Mô tả |
|-----------|------|-------|-------|
| `search` | string | `?search=fullface` | Tìm kiếm theo tên/thương hiệu/mô tả |
| `category` | string | `?category=fullface` | Lọc theo danh mục (slug) |
| `brand` | string | `?brand=hjc` | Lọc theo thương hiệu |
| `minPrice` | number | `?minPrice=100` | Giá tối thiểu |
| `maxPrice` | number | `?maxPrice=500` | Giá tối đa |
| `minRating` | number | `?minRating=4` | Rating tối thiểu (1-5) |
| `inStock` | boolean | `?inStock=true` | Chỉ lấy sản phẩm còn hàng |
| `sortBy` | string | `?sortBy=price-asc` | Sắp xếp (xem bảng dưới) |
| `page` | number | `?page=1` | Trang hiện tại |
| `pageSize` | number | `?pageSize=12` | Số sản phẩm mỗi trang |

**Các giá trị sortBy:**

| Giá trị | Mô tả |
|---------|-------|
| `popularity` (mặc định) | Theo độ phổ biến (rating * reviewCount) |
| `name-asc` | Tên A-Z |
| `name-desc` | Tên Z-A |
| `price-asc` | Giá tăng dần |
| `price-desc` | Giá giảm dần |

**Ví dụ các request mẫu:**

```bash
# 1. Lấy tất cả sản phẩm (mặc định)
GET {{base_url}}/api/products

# 2. Tìm kiếm sản phẩm
GET {{base_url}}/api/products?search=fullface

# 3. Lọc theo danh mục và giá
GET {{base_url}}/api/products?category=fullface&minPrice=100&maxPrice=500

# 4. Lọc theo thương hiệu, rating >= 4, còn hàng
GET {{base_url}}/api/products?brand=hjc&minRating=4&inStock=true

# 5. Sắp xếp theo giá tăng dần
GET {{base_url}}/api/products?sortBy=price-asc

# 6. Phân trang
GET {{base_url}}/api/products?page=1&pageSize=6

# 7. Kết hợp nhiều điều kiện
GET {{base_url}}/api/products?search=sport&minPrice=200&maxPrice=800&sortBy=price-asc&page=1&pageSize=10
```

**Success Response (200 OK):**
```json
{
  "products": [
    {
      "id": "prod-1",
      "name": "HJC RPHA 71",
      "brand": "HJC",
      "slug": "hjc-rpha-71",
      "description": "Fullface helmet...",
      "image": "/images/hjc-rpha-71.jpg",
      "price": 499.99,
      "originalPrice": 599.99,
      "discount": 17,
      "rating": 4.8,
      "reviewCount": 124,
      "category": "fullface",
      "categorySlug": "fullface",
      "inStock": true,
      "colors": ["#000000", "#FFFFFF", "#FF0000"],
      "sizes": ["S", "M", "L", "XL", "XXL"]
    }
  ],
  "pagination": {
    "page": 1,
    "pageSize": 12,
    "total": 50,
    "totalPages": 5
  },
  "availableBrands": ["AGV", "HJC", "LS2", "SHOEI"],
  "availableCategories": ["fullface", "half", "modular", "offroad"]
}
```

---

### 6.5 GET /api/products/featured — Sản phẩm nổi bật

**Mục đích:** Lấy danh sách sản phẩm nổi bật (featured)

**Method:** `GET`
**URL:** `{{base_url}}/api/products/featured`
**Auth required:** ❌ Không

**Response (200 OK):**
```json
{
  "products": [
    {
      "id": "prod-1",
      "name": "HJC RPHA 71",
      "brand": "HJC",
      "slug": "hjc-rpha-71",
      "price": 499.99,
      "rating": 4.8,
      "featured": true,
      "...": "..."
    }
  ]
}
```

---

### 6.6 GET /api/products/[slug] — Chi tiết sản phẩm

**Mục đích:** Lấy thông tin chi tiết của một sản phẩm theo slug

**Method:** `GET`
**URL:** `{{base_url}}/api/products/hjc-rpha-71`
**Auth required:** ❌ Không

**Ví dụ slug:** `hjc-rpha-71`, `shoei-x15`, `agv-k3-sv`...

> Bạn có thể lấy slug từ response của `GET /api/products`

**Response (200 OK):**
```json
{
  "id": "prod-1",
  "name": "HJC RPHA 71",
  "brand": "HJC",
  "slug": "hjc-rpha-71",
  "price": 499.99,
  "images": ["/images/hjc-rpha-71.jpg"],
  "colors": [{"name": "Black", "hex": "#000000"}],
  "sizes": [{"label": "M", "inStock": true}, {"label": "L", "inStock": true}],
  "...": "..."
}
```

**Error Response (404):**
```json
{ "error": "Product not found" }
```

---

### 6.7 GET /api/cart — Lấy giỏ hàng

**Mục đích:** Xem các sản phẩm trong giỏ hàng hiện tại

**Method:** `GET`
**URL:** `{{base_url}}/api/cart`
**Auth required:** ❌ Không

**Response (200 OK):**
```json
{
  "items": [
    {
      "id": "prod-1",
      "name": "HJC RPHA 71",
      "price": 499.99,
      "image": "/placeholder-helmet.svg",
      "quantity": 2,
      "variant": "M"
    }
  ],
  "total": 999.98
}
```

---

### 6.8 POST /api/cart/items — Thêm vào giỏ hàng

**Mục đích:** Thêm sản phẩm vào giỏ hàng

**Method:** `POST`
**URL:** `{{base_url}}/api/cart/items`
**Auth required:** ❌ Không

**Headers:**
```
Content-Type: application/json
```

**Body (raw JSON):**
```json
{
  "productId": "prod-1",
  "name": "HJC RPHA 71",
  "price": 499.99,
  "image": "/images/hjc-rpha-71.jpg",
  "quantity": 2,
  "variant": "M"
}
```

**Response (200 OK):**
```json
{
  "items": [
    {
      "id": "prod-1",
      "name": "HJC RPHA 71",
      "price": 499.99,
      "image": "/images/hjc-rpha-71.jpg",
      "quantity": 2,
      "variant": "M"
    }
  ],
  "total": 999.98
}
```

---

### 6.9 GET /api/orders — Lấy đơn hàng

**Mục đích:** Lấy danh sách đơn hàng, có thể lọc theo userId

**Method:** `GET`
**URL:** `{{base_url}}/api/orders`
**Auth required:** ❌ Không

**Query Parameters:**
| Parameter | Type | Mô tả |
|-----------|------|-------|
| `userId` | string | Lọc đơn hàng theo user ID |
| `page` | number | Trang hiện tại (mặc định: 1) |
| `pageSize` | number | Số đơn mỗi trang (mặc định: 10) |

**Response (200 OK):**
```json
{
  "orders": [
    {
      "id": "order-1745049600000",
      "orderNumber": "ORD-2026-001",
      "userId": "guest",
      "customer": {
        "name": "Nguyễn Văn A",
        "email": "nguyenvana@email.com"
      },
      "total": 1012.97,
      "status": "pending",
      "createdAt": "2026-01-01T00:00:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "pageSize": 10,
    "total": 1,
    "totalPages": 1
  }
}
```

---

### 6.10 POST /api/checkout — Thanh toán / Tạo đơn hàng

**Mục đích:** Tạo đơn hàng mới từ giỏ hàng

**Method:** `POST`
**URL:** `{{base_url}}/api/checkout`
**Auth required:** ❌ Không

**Headers:**
```
Content-Type: application/json
```

**Body (raw JSON):**
```json
{
  "shipping": {
    "firstName": "Nguyễn",
    "lastName": "Văn A",
    "email": "nguyenvana@email.com",
    "phone": "0901234567",
    "address": "123 Đường Lê Lợi",
    "city": "Hồ Chí Minh",
    "state": "Hồ Chí Minh",
    "zipCode": "70000",
    "country": "VN"
  },
  "shippingMethod": "express",
  "paymentMethod": "credit-card",
  "items": [
    {
      "productId": "prod-1",
      "name": "HJC RPHA 71",
      "price": 499.99,
      "quantity": 2
    },
    {
      "productId": "prod-2",
      "name": "AGV K3 SV",
      "price": 299.99,
      "quantity": 1
    }
  ]
}
```

**Shipping Methods:**
| Method | Phí | Mô tả |
|--------|-----|-------|
| `standard` | $0.00 | Giao hàng tiêu chuẩn (5-7 ngày) |
| `express` | $12.99 | Giao hàng nhanh (2-3 ngày) |
| `next-day` | $24.99 | Giao hàng trong ngày |

**Success Response (201 Created):**
```json
{
  "orderId": "order-1745049600000",
  "orderNumber": "ORD-2026-001",
  "status": "pending",
  "total": 1048.95,
  "createdAt": "2026-01-01T00:00:00.000Z"
}
```

**Error Response (400):**
```json
{ "error": "Missing required fields" }
```

---

### 6.11 GET /api/wishlist — Lấy wishlist

**Mục đích:** Xem danh sách sản phẩm yêu thích

**Method:** `GET`
**URL:** `{{base_url}}/api/wishlist`
**Auth required:** ❌ Không

**Response (200 OK):**
```json
{
  "items": [
    {
      "id": "prod-1",
      "name": "HJC RPHA 71",
      "price": 499.99,
      "image": "/images/hjc-rpha-71.jpg"
    }
  ]
}
```

---

### 6.12 POST /api/wishlist/items — Thêm vào wishlist

**Mục đích:** Thêm sản phẩm vào danh sách yêu thích

**Method:** `POST`
**URL:** `{{base_url}}/api/wishlist/items`
**Auth required:** ❌ Không

**Headers:**
```
Content-Type: application/json
```

**Body (raw JSON):**
```json
{
  "productId": "prod-1",
  "name": "HJC RPHA 71",
  "price": 499.99,
  "image": "/images/hjc-rpha-71.jpg"
}
```

**Response (201 Created):**
```json
{
  "items": [
    {
      "id": "prod-1",
      "name": "HJC RPHA 71",
      "price": 499.99,
      "image": "/images/hjc-rpha-71.jpg"
    }
  ]
}
```

---

### 6.13 GET /api/addresses — Lấy địa chỉ

**Mục đích:** Xem danh sách địa chỉ đã lưu

**Method:** `GET`
**URL:** `{{base_url}}/api/addresses`
**Auth required:** ❌ Không

**Response (200 OK):**
```json
[
  {
    "id": "addr-1",
    "fullName": "Nguyễn Văn A",
    "phone": "0901234567",
    "address": "123 Đường Lê Lợi",
    "city": "Hồ Chí Minh",
    "state": "Hồ Chí Minh",
    "zipCode": "70000",
    "isDefault": true
  }
]
```

---

### 6.14 POST /api/addresses — Thêm địa chỉ

**Mục đích:** Thêm địa chỉ mới

**Method:** `POST`
**URL:** `{{base_url}}/api/addresses`
**Auth required:** ❌ Không

**Headers:**
```
Content-Type: application/json
```

**Body (raw JSON):**
```json
{
  "fullName": "Nguyễn Văn A",
  "phone": "0901234567",
  "address": "123 Đường Lê Lợi",
  "city": "Hồ Chí Minh",
  "state": "Hồ Chí Minh",
  "zipCode": "70000",
  "isDefault": true
}
```

**Response (201 Created):**
```json
{
  "id": "addr-1745049600000",
  "fullName": "Nguyễn Văn A",
  "phone": "0901234567",
  "address": "123 Đường Lê Lợi",
  "city": "Hồ Chí Minh",
  "state": "Hồ Chí Minh",
  "zipCode": "70000",
  "isDefault": true
}
```

---

### 6.15 GET /api/admin/stats — Thống kê Dashboard

**Mục đích:** Xem thống kê tổng quan cho admin

**Method:** `GET`
**URL:** `{{base_url}}/api/admin/stats`
**Auth required:** ❌ Không

**Response (200 OK):**
```json
{
  "totalRevenue": 50000,
  "totalOrders": 150,
  "totalCustomers": 85,
  "conversionRate": 65.3,
  "revenueChange": 12.5,
  "ordersChange": 8,
  "customersChange": 3,
  "conversionChange": 0,
  "recentOrders": [
    {
      "id": "order-1",
      "total": 499.99,
      "status": "pending",
      "customer": { "name": "Nguyễn Văn A", "email": "nguyenvana@email.com" }
    }
  ],
  "lowStockProducts": [
    { "id": "prod-1", "name": "HJC RPHA 71", "stock": 3 }
  ]
}
```

---

### 6.16 GET /api/admin/customers — Danh sách khách hàng (Admin)

**Mục đích:** Xem danh sách khách hàng (dành cho admin)

**Method:** `GET`
**URL:** `{{base_url}}/api/admin/customers`
**Auth required:** ❌ Không

---

### 6.17 GET /api/admin/orders — Danh sách đơn hàng (Admin)

**Mục đích:** Xem tất cả đơn hàng (dành cho admin)

**Method:** `GET`
**URL:** `{{base_url}}/api/admin/orders`
**Auth required:** ❌ Không

---

### 6.18 GET /api/admin/products — Danh sách sản phẩm (Admin)

**Mục đích:** Xem tất cả sản phẩm (dành cho admin)

**Method:** `GET`
**URL:** `{{base_url}}/api/admin/products`
**Auth required:** ❌ Không

---

### 6.19 GET /api/shipping-methods — Phương thức vận chuyển

**Mục đích:** Lấy danh sách phương thức vận chuyển và phí

**Method:** `GET`
**URL:** `{{base_url}}/api/shipping-methods`
**Auth required:** ❌ Không

**Response (200 OK):**
```json
[
  { "id": "standard", "name": "Standard Shipping", "price": 0, "estimatedDays": "5-7 days" },
  { "id": "express", "name": "Express Shipping", "price": 12.99, "estimatedDays": "2-3 days" },
  { "id": "next-day", "name": "Next Day Delivery", "price": 24.99, "estimatedDays": "1 day" }
]
```

---

### 6.20 GET /api/states — Danh sách tỉnh/thành

**Mục đích:** Lấy danh sách tỉnh/thành Việt Nam

**Method:** `GET`
**URL:** `{{base_url}}/api/states`
**Auth required:** ❌ Không

**Response (200 OK):**
```json
[
  { "id": "hanoi", "name": "Hà Nội" },
  { "id": "hochiminh", "name": "Hồ Chí Minh" },
  { "id": "danang", "name": "Đà Nẵng" }
]
```

---

## 7. Workflow test hoàn chỉnh

### Workflow 1: Khám phá sản phẩm (cho người dùng mới)

```
Bước 1: GET  /api/products?page=1&pageSize=6
         → Xem danh sách sản phẩm

Bước 2: GET  /api/products/featured
         → Xem sản phẩm nổi bật

Bước 3: GET  /api/products?search=fullface&minRating=4&sortBy=price-asc
         → Tìm fullface giá rẻ, rating cao

Bước 4: GET  /api/products/hjc-rpha-71
         → Xem chi tiết 1 sản phẩm
```

### Workflow 2: Mua hàng hoàn chỉnh (Complete Purchase Flow)

```
Bước 1: POST /api/auth/register
         Body: { fullName, email, password }
         → Tạo tài khoản
         → Lưu token từ response

Bước 2: POST /api/cart/items
         Body: { productId: "prod-1", quantity: 2, variant: "M" }
         → Thêm sản phẩm vào giỏ hàng

Bước 3: POST /api/cart/items
         Body: { productId: "prod-2", quantity: 1, variant: "L" }
         → Thêm sản phẩm thứ 2

Bước 4: GET  /api/cart
         → Kiểm tra giỏ hàng, xem tổng tiền

Bước 5: POST /api/checkout
         Body: {
           shipping: { firstName, lastName, email, phone, address, city... },
           shippingMethod: "express",
           paymentMethod: "credit-card",
           items: [ { productId, name, price, quantity }... ]
         }
         → Tạo đơn hàng
         → Lưu orderId từ response

Bước 6: GET  /api/orders
         → Kiểm tra danh sách đơn hàng

Bước 7: GET  /api/orders/{orderId}
         → Xem chi tiết đơn hàng vừa tạo
```

### Workflow 3: Admin Dashboard

```
Bước 1: GET  /api/admin/stats
         → Xem thống kê tổng quan

Bước 2: GET  /api/admin/orders
         → Xem tất cả đơn hàng

Bước 3: GET  /api/admin/customers
         → Xem danh sách khách hàng

Bước 4: GET  /api/admin/products
         → Xem tất cả sản phẩm
```

### Workflow 4: Test với Postman Runner (dữ liệu hàng loạt)

1. Tạo file CSV:

```csv
fullName,email,password
Nguyễn Văn A,nguyenvana@email.com,password123
Trần Thị B,tranthib@email.com,password456
Lê Văn C,levanc@email.com,password789
```

2. Vào Postman → **Runner** (Collection Runner)

3. Chọn Collection **Helmet-Project API**

4. Chọn request **Register (POST)**

5. Upload file CSV ở mục **Data**

6. Click **Run**

---

## 8. Xử lý lỗi thường gặp

### Lỗi 1: "Could not get any response"

```
Error: Could not get any response
```

**Nguyên nhân:** Server chưa chạy hoặc sai URL

**Fix:**
- Chạy `npm run dev` trong terminal
- Kiểm tra `base_url` trong Collection Variables: `http://localhost:3000`
- Kiểm tra Postman có đúng tab hay không (đôi khi bị nhầm method)

### Lỗi 2: 404 Not Found

```json
{
  "error": "Product not found"
}
```

**Nguyên nhân:** Slug không đúng

**Fix:**
- Lấy slug từ response của `GET /api/products` trước
- Dùng slug chính xác (ví dụ: `hjc-rpha-71`)

### Lỗi 3: 400 Bad Request

```json
{
  "error": "Invalid request body"
}
```

**Nguyên nhân:** JSON body không đúng format

**Fix:**
- Kiểm tra JSON có đúng cú pháp không (thiếu dấu phẩy, dư dấu phẩy cuối)
- Kiểm tra có thiếu field bắt buộc không
- Dùng https://jsonlint.com/ để validate JSON

### Lỗi 4: 409 Conflict

```json
{
  "error": "Email already registered"
}
```

**Nguyên nhân:** Email đã được đăng ký trước đó

**Fix:**
- Dùng email khác
- Xóa file `data/users.json` để reset (nếu muốn test lại từ đầu)

### Lỗi 5: Dữ liệu bị reset

**Nguyên nhân:** Dự án dùng JSON file làm database tạm. Khi restart server, dữ liệu có thể bị mất.

**Fix:**
- Chạy lại các request để tạo dữ liệu mới
- Hoặc dùng mock data từ file `data/sample-products.ts`

---

## 9. Mẹo Postman nâng cao

### 9.1 Sử dụng Dynamic Variables

Postman có sẵn các biến động:

| Biến | Mô tả | Ví dụ dùng |
|------|-------|-----------|
| `{{$timestamp}}` | Unix timestamp hiện tại | Dùng tạo email unique |
| `{{$randomEmail}}` | Email ngẫu nhiên | Test register |
| `{{$randomFullName}}` | Tên ngẫu nhiên | Test checkout |
| `{{$randomInt}}` | Số ngẫu nhiên | Test phone number |
| `{{$guid}}` | UUID ngẫu nhiên | Test IDs |

**Ví dụ body với dynamic variables:**

```json
{
  "fullName": "{{$randomFullName}}",
  "email": "user_{{guid}}@test.com",
  "password": "password123"
}
```

### 9.2 Sử dụng Tests Tab để tự động hóa

```javascript
// === Tests cho Login ===
// Tự động lưu token vào Collection Variables
if (pm.response.code === 200) {
    const jsonData = pm.response.json();
    pm.collectionVariables.set('auth_token', jsonData.token);
    console.log('✅ Token saved:', jsonData.token);
}

// === Tests cho Checkout ===
// Tự động lưu orderId
if (pm.response.code === 201) {
    const jsonData = pm.response.json();
    pm.collectionVariables.set('order_id', jsonData.orderId);
    pm.collectionVariables.set('order_number', jsonData.orderNumber);
    console.log('✅ Order created:', jsonData.orderNumber);
}

// === Tests cho bất kỳ API nào ===
// Kiểm tra response code
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

// Kiểm tra response có dữ liệu
pm.test("Response has data", function () {
    const jsonData = pm.response.json();
    pm.expect(jsonData).to.not.be.empty;
});
```

### 9.3 Sử dụng Pre-request Script

Chạy trước khi request được gửi:

```javascript
// Trước khi gửi request Checkout, kiểm tra đã có token chưa
const token = pm.collectionVariables.get('auth_token');
if (!token) {
    console.warn('⚠️  No auth token found. Please login first.');
    // Hoặc tự động login
    pm.sendRequest({
        url: pm.collectionVariables.get('base_url') + '/api/auth/login',
        method: 'POST',
        header: { 'Content-Type': 'application/json' },
        body: {
            mode: 'raw',
            raw: JSON.stringify({
                email: 'nguyenvana@email.com',
                password: 'password123'
            })
        }
    }, function (err, res) {
        if (res.code === 200) {
            const data = res.json();
            pm.collectionVariables.set('auth_token', data.token);
        }
    });
}
```

### 9.4 Tạo Environment riêng

Tạo 2 environments để dễ dàng chuyển đổi:

**Local Development:**
```
base_url = http://localhost:3000
```

**Production (sau này deploy):**
```
base_url = https://your-domain.com
```

### 9.5 Sử dụng Postman Console

Khi debug, bật **Postman Console** (View → Show Postman Console) để xem:
- Request headers gửi đi
- Response headers nhận về
- Network logs chi tiết

---

## Tổng kết

Bạn đã có đầy đủ:

✅ **21 API endpoints** được liệt kê và hướng dẫn chi tiết
✅ **4 workflow test** hoàn chỉnh (khám phá, mua hàng, admin, runner)
✅ **Postman Collection** ready-to-import với tất cả requests
✅ **Hướng dẫn xử lý lỗi** thường gặp
✅ **Mẹo nâng cao** (dynamic vars, test scripts, environments)

### Next Steps

Sau khi thành thạo test API trên Postman, bạn có thể:
1. 🚀 Học cách **viết test tự động** với **Newman** (Postman CLI)
2. 📚 Tìm hiểu **CI/CD tích hợp Postman tests**
3. 🎯 Phát triển thêm API endpoints mới
4. 🔐 Thêm **JWT authentication** thật (thay vì mock token)

---

*Happy Testing! 🚀*