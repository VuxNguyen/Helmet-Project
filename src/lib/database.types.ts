/**
 * TypeScript types for Helmet-Project Database Schema v2.0
 *
 * These types mirror the Supabase PostgreSQL schema.
 * Use these types throughout the application for type-safe database operations.
 */

// ============================================================
// Enums
// ============================================================

export type UserRole = "customer" | "admin" | "superadmin";
export type ProductStatus = "active" | "draft" | "archived";
export type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "shipping"
  | "delivered"
  | "cancelled"
  | "refunded";
export type PaymentMethod = "cod" | "bank_transfer" | "momo" | "card";
export type PaymentStatus = "unpaid" | "paid" | "refunded" | "partial";
export type DiscountType = "percentage" | "fixed";
export type NotificationType = "order" | "stock" | "system" | "promotion" | "review";

// ============================================================
// Core Tables
// ============================================================

/** User account */
export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  phone: string | null;
  avatar: string | null;
  role: UserRole;
  is_active: boolean;
  last_login_at: string | null;
  created_at: string;
  updated_at: string;
}

/** User shipping/billing address */
export interface Address {
  id: string;
  user_id: string;
  full_name: string;
  phone: string | null;
  address: string;
  city: string;
  state: string | null;
  zip_code: string | null;
  country: string;
  is_default: boolean;
  created_at: string;
  updated_at: string;
}

// ============================================================
// Product Catalog
// ============================================================

/** Product category (supports hierarchy via parent_id) */
export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
  parent_id: string | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

/** Product brand */
export interface Brand {
  id: string;
  name: string;
  slug: string;
  logo: string | null;
  description: string | null;
  website: string | null;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

/** Product */
export interface Product {
  id: string;
  name: string;
  slug: string;
  sku: string;
  brand_id: string | null;
  category_id: string | null;
  description: string | null;
  short_description: string | null;
  price: number;
  original_price: number | null;
  discount_percent: number | null;
  cost_price: number | null;
  rating: number;
  review_count: number;
  stock_count: number;
  low_stock_threshold: number;
  status: ProductStatus;
  is_featured: boolean;
  weight_grams: number | null;
  width_mm: number | null;
  height_mm: number | null;
  depth_mm: number | null;
  meta_title: string | null;
  meta_description: string | null;
  related_ids: string[];
  created_at: string;
  updated_at: string;
}

/** Product image */
export interface ProductImage {
  id: string;
  product_id: string;
  url: string;
  alt_text: string | null;
  sort_order: number;
  is_primary: boolean;
  created_at: string;
}

/** Product variant (color/size combination) */
export interface ProductVariant {
  id: string;
  product_id: string;
  name: string;
  color: string | null;
  size: string | null;
  sku: string | null;
  price: number | null;
  stock_count: number;
  image: string | null;
  weight_grams: number | null;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

/** Product specification (e.g., weight, shell material, certification) */
export interface ProductSpecification {
  id: string;
  product_id: string;
  group_name: string;
  label: string;
  value: string;
  sort_order: number;
  created_at: string;
}

/** Tag */
export interface Tag {
  id: string;
  name: string;
  slug: string;
  created_at: string;
}

/** Product-Tag association */
export interface ProductTag {
  product_id: string;
  tag_id: string;
  created_at: string;
}

// ============================================================
// Reviews
// ============================================================

/** Product review */
export interface Review {
  id: string;
  product_id: string;
  user_id: string | null;
  author: string;
  rating: number;
  title: string | null;
  content: string | null;
  pros: string | null;
  cons: string | null;
  helpful: number;
  is_verified: boolean;
  is_approved: boolean;
  date: string;
  created_at: string;
  updated_at: string;
}

// ============================================================
// Coupons & Promotions
// ============================================================

/** Discount coupon */
export interface Coupon {
  id: string;
  code: string;
  description: string | null;
  discount_type: DiscountType;
  discount_value: number;
  min_order_amount: number | null;
  max_discount: number | null;
  usage_limit: number | null;
  usage_count: number;
  per_user_limit: number;
  is_active: boolean;
  starts_at: string | null;
  expires_at: string | null;
  created_at: string;
  updated_at: string;
}

/** Coupon-Product association (restrict coupon to specific products) */
export interface CouponProduct {
  coupon_id: string;
  product_id: string;
}

// ============================================================
// Orders
// ============================================================

/** Customer order */
export interface Order {
  id: string;
  order_number: string;
  user_id: string | null;
  coupon_id: string | null;
  customer_name: string;
  customer_email: string;
  customer_phone: string | null;
  status: OrderStatus;
  subtotal: number;
  discount_amount: number;
  shipping_fee: number;
  tax_amount: number;
  total: number;
  payment_method: PaymentMethod | null;
  payment_status: PaymentStatus;
  paid_at: string | null;
  shipping_name: string | null;
  shipping_phone: string | null;
  shipping_address: string | null;
  shipping_city: string | null;
  shipping_state: string | null;
  shipping_zip_code: string | null;
  shipping_country: string;
  tracking_number: string | null;
  shipping_provider: string | null;
  notes: string | null;
  admin_notes: string | null;
  cancelled_at: string | null;
  cancel_reason: string | null;
  delivered_at: string | null;
  created_at: string;
  updated_at: string;
}

/** Individual item within an order */
export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string | null;
  variant_id: string | null;
  product_name: string;
  product_sku: string | null;
  product_image: string | null;
  color: string | null;
  size: string | null;
  quantity: number;
  unit_price: number;
  total_price: number;
  created_at: string;
}

/** Order status change history */
export interface OrderStatusHistory {
  id: string;
  order_id: string;
  status: OrderStatus;
  note: string | null;
  changed_by: string | null;
  created_at: string;
}

// ============================================================
// Shopping Cart & Wishlist
// ============================================================

/** Shopping cart item */
export interface CartItem {
  id: string;
  user_id: string | null;
  session_id: string | null;
  product_id: string;
  variant_id: string | null;
  quantity: number;
  created_at: string;
  updated_at: string;
}

/** Wishlist item */
export interface WishlistItem {
  id: string;
  user_id: string;
  product_id: string;
  created_at: string;
}

// ============================================================
// Settings & Notifications
// ============================================================

/** Store setting (key-value with category) */
export interface StoreSetting {
  id: string;
  key: string;
  value: unknown;
  category: string;
  description: string | null;
  updated_by: string | null;
  created_at: string;
  updated_at: string;
}

/** User notification */
export interface Notification {
  id: string;
  user_id: string | null;
  type: NotificationType;
  title: string;
  message: string;
  data: Record<string, unknown>;
  is_read: boolean;
  created_at: string;
}

// ============================================================
// Joined / Expanded Types (common query results)
// ============================================================

/** Product with joined brand and category info */
export interface ProductWithRelations extends Product {
  brand: Brand | null;
  category: Category | null;
  images: ProductImage[];
  variants: ProductVariant[];
  specifications: ProductSpecification[];
  tags: Tag[];
}

/** Order with joined items */
export interface OrderWithItems extends Order {
  items: OrderItem[];
  status_history: OrderStatusHistory[];
}

/** Cart item with product info */
export interface CartItemWithProduct extends CartItem {
  product: Product | null;
  variant: ProductVariant | null;
}

/** Wishlist item with product info */
export interface WishlistItemWithProduct extends WishlistItem {
  product: Product | null;
}

/** Category with child categories */
export interface CategoryWithChildren extends Category {
  children: Category[];
}

/** Review with user info */
export interface ReviewWithUser extends Review {
  user: User | null;
}

// ============================================================
// Supabase Database Type (for typed Supabase client)
// ============================================================

export interface Database {
  public: {
    Tables: {
      users: { Row: User; Insert: Omit<User, "created_at" | "updated_at">; Update: Partial<Omit<User, "id" | "created_at" | "updated_at">> };
      addresses: { Row: Address; Insert: Omit<Address, "id" | "created_at" | "updated_at">; Update: Partial<Omit<Address, "id" | "created_at" | "updated_at">> };
      categories: { Row: Category; Insert: Omit<Category, "id" | "created_at" | "updated_at">; Update: Partial<Omit<Category, "id" | "created_at" | "updated_at">> };
      brands: { Row: Brand; Insert: Omit<Brand, "id" | "created_at" | "updated_at">; Update: Partial<Omit<Brand, "id" | "created_at" | "updated_at">> };
      products: { Row: Product; Insert: Omit<Product, "id" | "created_at" | "updated_at" | "rating" | "review_count">; Update: Partial<Omit<Product, "id" | "created_at" | "updated_at">> };
      product_images: { Row: ProductImage; Insert: Omit<ProductImage, "id" | "created_at">; Update: Partial<Omit<ProductImage, "id" | "created_at">> };
      product_variants: { Row: ProductVariant; Insert: Omit<ProductVariant, "id" | "created_at" | "updated_at">; Update: Partial<Omit<ProductVariant, "id" | "created_at" | "updated_at">> };
      product_specifications: { Row: ProductSpecification; Insert: Omit<ProductSpecification, "id" | "created_at">; Update: Partial<Omit<ProductSpecification, "id" | "created_at">> };
      tags: { Row: Tag; Insert: Omit<Tag, "id" | "created_at">; Update: Partial<Omit<Tag, "id" | "created_at">> };
      product_tags: { Row: ProductTag; Insert: ProductTag; Update: never };
      reviews: { Row: Review; Insert: Omit<Review, "id" | "created_at" | "updated_at">; Update: Partial<Omit<Review, "id" | "created_at" | "updated_at">> };
      coupons: { Row: Coupon; Insert: Omit<Coupon, "id" | "created_at" | "updated_at" | "usage_count">; Update: Partial<Omit<Coupon, "id" | "created_at" | "updated_at">> };
      coupon_products: { Row: CouponProduct; Insert: CouponProduct; Update: never };
      orders: { Row: Order; Insert: Omit<Order, "id" | "created_at" | "updated_at">; Update: Partial<Omit<Order, "id" | "created_at" | "updated_at">> };
      order_items: { Row: OrderItem; Insert: Omit<OrderItem, "id" | "created_at">; Update: Partial<Omit<OrderItem, "id" | "created_at">> };
      order_status_history: { Row: OrderStatusHistory; Insert: Omit<OrderStatusHistory, "id" | "created_at">; Update: never };
      cart_items: { Row: CartItem; Insert: Omit<CartItem, "id" | "created_at" | "updated_at">; Update: Partial<Omit<CartItem, "id" | "created_at" | "updated_at">> };
      wishlist_items: { Row: WishlistItem; Insert: Omit<WishlistItem, "id" | "created_at">; Update: never };
      store_settings: { Row: StoreSetting; Insert: Omit<StoreSetting, "id" | "created_at" | "updated_at">; Update: Partial<Omit<StoreSetting, "id" | "created_at" | "updated_at">> };
      notifications: { Row: Notification; Insert: Omit<Notification, "id" | "created_at">; Update: Partial<Omit<Notification, "id" | "created_at">> };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      user_role: UserRole;
      product_status: ProductStatus;
      order_status: OrderStatus;
      payment_method: PaymentMethod;
      payment_status: PaymentStatus;
      discount_type: DiscountType;
      notification_type: NotificationType;
    };
  };
}