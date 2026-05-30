-- ============================================================
-- Helmet-Project Database Schema v2.0
-- Designed for Supabase (PostgreSQL)
-- ============================================================

-- Drop existing tables (order matters for foreign keys)
DROP TABLE IF EXISTS public.notifications CASCADE;
DROP TABLE IF EXISTS public.store_settings CASCADE;
DROP TABLE IF EXISTS public.coupon_products CASCADE;
DROP TABLE IF EXISTS public.coupons CASCADE;
DROP TABLE IF EXISTS public.order_status_history CASCADE;
DROP TABLE IF EXISTS public.order_items CASCADE;
DROP TABLE IF EXISTS public.orders CASCADE;
DROP TABLE IF EXISTS public.cart_items CASCADE;
DROP TABLE IF EXISTS public.wishlist_items CASCADE;
DROP TABLE IF EXISTS public.reviews CASCADE;
DROP TABLE IF EXISTS public.product_tags CASCADE;
DROP TABLE IF EXISTS public.tags CASCADE;
DROP TABLE IF EXISTS public.product_specifications CASCADE;
DROP TABLE IF EXISTS public.product_variants CASCADE;
DROP TABLE IF EXISTS public.product_images CASCADE;
DROP TABLE IF EXISTS public.products CASCADE;
DROP TABLE IF EXISTS public.categories CASCADE;
DROP TABLE IF EXISTS public.brands CASCADE;
DROP TABLE IF EXISTS public.addresses CASCADE;
DROP TABLE IF EXISTS public.users CASCADE;

-- ============================================================
-- 1. USERS
-- ============================================================
CREATE TABLE public.users (
  id            TEXT PRIMARY KEY,
  name          TEXT NOT NULL,
  email         TEXT UNIQUE NOT NULL,
  password      TEXT NOT NULL,
  phone         TEXT,
  avatar        TEXT,
  role          TEXT NOT NULL DEFAULT 'customer' CHECK (role IN ('customer', 'admin', 'superadmin')),
  is_active     BOOLEAN NOT NULL DEFAULT true,
  last_login_at TIMESTAMPTZ,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- 2. ADDRESSES
-- ============================================================
CREATE TABLE public.addresses (
  id          TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  user_id     TEXT NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  full_name   TEXT NOT NULL,
  phone       TEXT,
  address     TEXT NOT NULL,
  city        TEXT NOT NULL,
  state       TEXT,
  zip_code    TEXT,
  country     TEXT DEFAULT 'VN',
  is_default  BOOLEAN NOT NULL DEFAULT false,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- 3. CATEGORIES (hierarchical with parent_id)
-- ============================================================
CREATE TABLE public.categories (
  id          TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name        TEXT NOT NULL,
  slug        TEXT UNIQUE NOT NULL,
  description TEXT,
  image       TEXT,
  parent_id   TEXT REFERENCES public.categories(id) ON DELETE SET NULL,
  sort_order  INTEGER NOT NULL DEFAULT 0,
  is_active   BOOLEAN NOT NULL DEFAULT true,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- 4. BRANDS
-- ============================================================
CREATE TABLE public.brands (
  id          TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name        TEXT NOT NULL,
  slug        TEXT UNIQUE NOT NULL,
  logo        TEXT,
  description TEXT,
  website     TEXT,
  is_active   BOOLEAN NOT NULL DEFAULT true,
  sort_order  INTEGER NOT NULL DEFAULT 0,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- 5. PRODUCTS
-- ============================================================
CREATE TABLE public.products (
  id                TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name              TEXT NOT NULL,
  slug              TEXT UNIQUE NOT NULL,
  sku               TEXT UNIQUE NOT NULL,
  brand_id          TEXT REFERENCES public.brands(id) ON DELETE SET NULL,
  category_id       TEXT REFERENCES public.categories(id) ON DELETE SET NULL,
  description       TEXT,
  short_description TEXT,
  price             DECIMAL(12,2) NOT NULL CHECK (price >= 0),
  original_price    DECIMAL(12,2) CHECK (original_price >= 0),
  discount_percent  INTEGER CHECK (discount_percent >= 0 AND discount_percent <= 100),
  cost_price        DECIMAL(12,2) CHECK (cost_price >= 0),
  rating            DECIMAL(2,1) DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
  review_count      INTEGER DEFAULT 0 CHECK (review_count >= 0),
  stock_count       INTEGER DEFAULT 0 CHECK (stock_count >= 0),
  low_stock_threshold INTEGER DEFAULT 5,
  status            TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('active', 'draft', 'archived')),
  is_featured       BOOLEAN NOT NULL DEFAULT false,
  weight_grams      INTEGER,
  width_mm          INTEGER,
  height_mm         INTEGER,
  depth_mm          INTEGER,
  meta_title        TEXT,
  meta_description  TEXT,
  related_ids       TEXT[] DEFAULT '{}',
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- 6. PRODUCT IMAGES
-- ============================================================
CREATE TABLE public.product_images (
  id          TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  product_id  TEXT NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  url         TEXT NOT NULL,
  alt_text    TEXT,
  sort_order  INTEGER NOT NULL DEFAULT 0,
  is_primary  BOOLEAN NOT NULL DEFAULT false,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- 7. PRODUCT VARIANTS (color/size combinations)
-- ============================================================
CREATE TABLE public.product_variants (
  id            TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  product_id    TEXT NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  name          TEXT NOT NULL,
  color         TEXT,
  size          TEXT,
  sku           TEXT UNIQUE,
  price         DECIMAL(12,2) CHECK (price >= 0),
  stock_count   INTEGER NOT NULL DEFAULT 0 CHECK (stock_count >= 0),
  image         TEXT,
  weight_grams  INTEGER,
  is_active     BOOLEAN NOT NULL DEFAULT true,
  sort_order    INTEGER NOT NULL DEFAULT 0,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(product_id, color, size)
);

-- ============================================================
-- 8. PRODUCT SPECIFICATIONS
-- ============================================================
CREATE TABLE public.product_specifications (
  id          TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  product_id  TEXT NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  group_name  TEXT NOT NULL DEFAULT 'General',
  label       TEXT NOT NULL,
  value       TEXT NOT NULL,
  sort_order  INTEGER NOT NULL DEFAULT 0,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- 9. TAGS
-- ============================================================
CREATE TABLE public.tags (
  id          TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name        TEXT UNIQUE NOT NULL,
  slug        TEXT UNIQUE NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- 10. PRODUCT TAGS (many-to-many)
-- ============================================================
CREATE TABLE public.product_tags (
  product_id  TEXT NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  tag_id      TEXT NOT NULL REFERENCES public.tags(id) ON DELETE CASCADE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (product_id, tag_id)
);

-- ============================================================
-- 11. REVIEWS
-- ============================================================
CREATE TABLE public.reviews (
  id          TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  product_id  TEXT NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  user_id     TEXT REFERENCES public.users(id) ON DELETE SET NULL,
  author      TEXT NOT NULL,
  rating      INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title       TEXT,
  content     TEXT,
  pros        TEXT,
  cons        TEXT,
  helpful     INTEGER NOT NULL DEFAULT 0,
  is_verified BOOLEAN NOT NULL DEFAULT false,
  is_approved BOOLEAN NOT NULL DEFAULT false,
  date        DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- 12. COUPONS
-- ============================================================
CREATE TABLE public.coupons (
  id                TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  code              TEXT UNIQUE NOT NULL,
  description       TEXT,
  discount_type     TEXT NOT NULL CHECK (discount_type IN ('percentage', 'fixed')),
  discount_value    DECIMAL(12,2) NOT NULL CHECK (discount_value > 0),
  min_order_amount  DECIMAL(12,2) DEFAULT 0,
  max_discount      DECIMAL(12,2),
  usage_limit       INTEGER,
  usage_count       INTEGER NOT NULL DEFAULT 0,
  per_user_limit    INTEGER DEFAULT 1,
  is_active         BOOLEAN NOT NULL DEFAULT true,
  starts_at         TIMESTAMPTZ,
  expires_at        TIMESTAMPTZ,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- 13. COUPON PRODUCTS (restrict coupons to specific products)
-- ============================================================
CREATE TABLE public.coupon_products (
  coupon_id   TEXT NOT NULL REFERENCES public.coupons(id) ON DELETE CASCADE,
  product_id  TEXT NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  PRIMARY KEY (coupon_id, product_id)
);

-- ============================================================
-- 14. ORDERS
-- ============================================================
CREATE TABLE public.orders (
  id                TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  order_number      TEXT UNIQUE NOT NULL,
  user_id           TEXT REFERENCES public.users(id) ON DELETE SET NULL,
  coupon_id         TEXT REFERENCES public.coupons(id) ON DELETE SET NULL,
  customer_name     TEXT NOT NULL,
  customer_email    TEXT NOT NULL,
  customer_phone    TEXT,
  status            TEXT NOT NULL DEFAULT 'pending' CHECK (status IN (
    'pending', 'confirmed', 'processing', 'shipping', 'delivered', 'cancelled', 'refunded'
  )),
  subtotal          DECIMAL(12,2) NOT NULL CHECK (subtotal >= 0),
  discount_amount   DECIMAL(12,2) NOT NULL DEFAULT 0 CHECK (discount_amount >= 0),
  shipping_fee      DECIMAL(12,2) NOT NULL DEFAULT 0 CHECK (shipping_fee >= 0),
  tax_amount        DECIMAL(12,2) NOT NULL DEFAULT 0 CHECK (tax_amount >= 0),
  total             DECIMAL(12,2) NOT NULL CHECK (total >= 0),
  payment_method    TEXT CHECK (payment_method IN ('cod', 'bank_transfer', 'momo', 'card')),
  payment_status    TEXT NOT NULL DEFAULT 'unpaid' CHECK (payment_status IN ('unpaid', 'paid', 'refunded', 'partial')),
  paid_at           TIMESTAMPTZ,
  shipping_name     TEXT,
  shipping_phone    TEXT,
  shipping_address  TEXT,
  shipping_city     TEXT,
  shipping_state    TEXT,
  shipping_zip_code TEXT,
  shipping_country  TEXT DEFAULT 'VN',
  tracking_number   TEXT,
  shipping_provider TEXT,
  notes             TEXT,
  admin_notes       TEXT,
  cancelled_at      TIMESTAMPTZ,
  cancel_reason     TEXT,
  delivered_at      TIMESTAMPTZ,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- 15. ORDER ITEMS (normalized from JSONB)
-- ============================================================
CREATE TABLE public.order_items (
  id              TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  order_id        TEXT NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id      TEXT REFERENCES public.products(id) ON DELETE SET NULL,
  variant_id      TEXT REFERENCES public.product_variants(id) ON DELETE SET NULL,
  product_name    TEXT NOT NULL,
  product_sku     TEXT,
  product_image   TEXT,
  color           TEXT,
  size            TEXT,
  quantity        INTEGER NOT NULL CHECK (quantity > 0),
  unit_price      DECIMAL(12,2) NOT NULL CHECK (unit_price >= 0),
  total_price     DECIMAL(12,2) NOT NULL CHECK (total_price >= 0),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- 16. ORDER STATUS HISTORY
-- ============================================================
CREATE TABLE public.order_status_history (
  id          TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  order_id    TEXT NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  status      TEXT NOT NULL,
  note        TEXT,
  changed_by  TEXT REFERENCES public.users(id) ON DELETE SET NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- 17. CART ITEMS
-- ============================================================
CREATE TABLE public.cart_items (
  id          TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  user_id     TEXT REFERENCES public.users(id) ON DELETE CASCADE,
  session_id  TEXT,
  product_id  TEXT NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  variant_id  TEXT REFERENCES public.product_variants(id) ON DELETE SET NULL,
  quantity    INTEGER NOT NULL DEFAULT 1 CHECK (quantity > 0),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, product_id, variant_id),
  UNIQUE(session_id, product_id, variant_id)
);

-- ============================================================
-- 18. WISHLIST ITEMS
-- ============================================================
CREATE TABLE public.wishlist_items (
  id          TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  user_id     TEXT NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  product_id  TEXT NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, product_id)
);

-- ============================================================
-- 19. STORE SETTINGS
-- ============================================================
CREATE TABLE public.store_settings (
  id              TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  key             TEXT UNIQUE NOT NULL,
  value           JSONB NOT NULL,
  category        TEXT NOT NULL DEFAULT 'general',
  description     TEXT,
  updated_by      TEXT REFERENCES public.users(id) ON DELETE SET NULL,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- 20. NOTIFICATIONS
-- ============================================================
CREATE TABLE public.notifications (
  id          TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  user_id     TEXT REFERENCES public.users(id) ON DELETE CASCADE,
  type        TEXT NOT NULL CHECK (type IN ('order', 'stock', 'system', 'promotion', 'review')),
  title       TEXT NOT NULL,
  message     TEXT NOT NULL,
  data        JSONB DEFAULT '{}',
  is_read     BOOLEAN NOT NULL DEFAULT false,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- INDEXES
-- ============================================================

-- Users
CREATE INDEX idx_users_email ON public.users(email);
CREATE INDEX idx_users_role ON public.users(role);

-- Addresses
CREATE INDEX idx_addresses_user ON public.addresses(user_id);

-- Categories
CREATE INDEX idx_categories_slug ON public.categories(slug);
CREATE INDEX idx_categories_parent ON public.categories(parent_id);

-- Brands
CREATE INDEX idx_brands_slug ON public.brands(slug);

-- Products
CREATE INDEX idx_products_slug ON public.products(slug);
CREATE INDEX idx_products_sku ON public.products(sku);
CREATE INDEX idx_products_brand ON public.products(brand_id);
CREATE INDEX idx_products_category ON public.products(category_id);
CREATE INDEX idx_products_status ON public.products(status);
CREATE INDEX idx_products_featured ON public.products(is_featured);
CREATE INDEX idx_products_price ON public.products(price);
CREATE INDEX idx_products_created ON public.products(created_at DESC);

-- Product Images
CREATE INDEX idx_product_images_product ON public.product_images(product_id);

-- Product Variants
CREATE INDEX idx_product_variants_product ON public.product_variants(product_id);
CREATE INDEX idx_product_variants_sku ON public.product_variants(sku);

-- Product Specifications
CREATE INDEX idx_product_specs_product ON public.product_specifications(product_id);

-- Product Tags
CREATE INDEX idx_product_tags_tag ON public.product_tags(tag_id);

-- Reviews
CREATE INDEX idx_reviews_product ON public.reviews(product_id);
CREATE INDEX idx_reviews_user ON public.reviews(user_id);
CREATE INDEX idx_reviews_rating ON public.reviews(rating);

-- Coupons
CREATE INDEX idx_coupons_code ON public.coupons(code);

-- Orders
CREATE INDEX idx_orders_user ON public.orders(user_id);
CREATE INDEX idx_orders_status ON public.orders(status);
CREATE INDEX idx_orders_payment_status ON public.orders(payment_status);
CREATE INDEX idx_orders_created ON public.orders(created_at DESC);
CREATE INDEX idx_orders_order_number ON public.orders(order_number);

-- Order Items
CREATE INDEX idx_order_items_order ON public.order_items(order_id);
CREATE INDEX idx_order_items_product ON public.order_items(product_id);

-- Order Status History
CREATE INDEX idx_order_history_order ON public.order_status_history(order_id);

-- Cart Items
CREATE INDEX idx_cart_user ON public.cart_items(user_id);
CREATE INDEX idx_cart_session ON public.cart_items(session_id);

-- Wishlist
CREATE INDEX idx_wishlist_user ON public.wishlist_items(user_id);

-- Notifications
CREATE INDEX idx_notifications_user ON public.notifications(user_id);
CREATE INDEX idx_notifications_unread ON public.notifications(user_id, is_read) WHERE is_read = false;

-- Store Settings
CREATE INDEX idx_store_settings_key ON public.store_settings(key);
CREATE INDEX idx_store_settings_category ON public.store_settings(category);

-- ============================================================
-- ENABLE ROW LEVEL SECURITY
-- ============================================================
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_specifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coupons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coupon_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_status_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wishlist_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.store_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- HELPER FUNCTIONS
-- ============================================================

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at trigger to relevant tables
CREATE TRIGGER trg_users_updated_at BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_addresses_updated_at BEFORE UPDATE ON public.addresses FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_categories_updated_at BEFORE UPDATE ON public.categories FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_brands_updated_at BEFORE UPDATE ON public.brands FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_products_updated_at BEFORE UPDATE ON public.products FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_product_variants_updated_at BEFORE UPDATE ON public.product_variants FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_reviews_updated_at BEFORE UPDATE ON public.reviews FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_coupons_updated_at BEFORE UPDATE ON public.coupons FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_orders_updated_at BEFORE UPDATE ON public.orders FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_cart_items_updated_at BEFORE UPDATE ON public.cart_items FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_store_settings_updated_at BEFORE UPDATE ON public.store_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Auto-update product rating when reviews change
CREATE OR REPLACE FUNCTION update_product_rating()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.products
  SET
    rating = COALESCE((
      SELECT ROUND(AVG(rating)::numeric, 1)
      FROM public.reviews
      WHERE product_id = COALESCE(NEW.product_id, OLD.product_id)
        AND is_approved = true
    ), 0),
    review_count = (
      SELECT COUNT(*)
      FROM public.reviews
      WHERE product_id = COALESCE(NEW.product_id, OLD.product_id)
        AND is_approved = true
    )
  WHERE id = COALESCE(NEW.product_id, OLD.product_id);
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_review_rating_update
  AFTER INSERT OR UPDATE OR DELETE ON public.reviews
  FOR EACH ROW EXECUTE FUNCTION update_product_rating();

-- Auto-generate order number
CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.order_number IS NULL OR NEW.order_number = '' THEN
    NEW.order_number := 'ORD-' || to_char(now(), 'YYYYMMDD') || '-' || lpad(nextval('order_number_seq')::text, 5, '0');
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create sequence for order numbers
CREATE SEQUENCE IF NOT EXISTS order_number_seq START 1;

CREATE TRIGGER trg_order_number
  BEFORE INSERT ON public.orders
  FOR EACH ROW EXECUTE FUNCTION generate_order_number();

-- ============================================================
-- RLS POLICIES
-- ============================================================

-- Public read access for catalog tables
CREATE POLICY "Public can read categories" ON public.categories FOR SELECT USING (is_active = true);
CREATE POLICY "Public can read brands" ON public.brands FOR SELECT USING (is_active = true);
CREATE POLICY "Public can read products" ON public.products FOR SELECT USING (status = 'active');
CREATE POLICY "Public can read product_images" ON public.product_images FOR SELECT USING (true);
CREATE POLICY "Public can read product_variants" ON public.product_variants FOR SELECT USING (is_active = true);
CREATE POLICY "Public can read product_specs" ON public.product_specifications FOR SELECT USING (true);
CREATE POLICY "Public can read tags" ON public.tags FOR SELECT USING (true);
CREATE POLICY "Public can read product_tags" ON public.product_tags FOR SELECT USING (true);
CREATE POLICY "Public can read approved reviews" ON public.reviews FOR SELECT USING (is_approved = true);

-- Users policies
CREATE POLICY "Anon can select users" ON public.users FOR SELECT TO anon USING (true);
CREATE POLICY "Anon can insert users" ON public.users FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Anon can update users" ON public.users FOR UPDATE TO anon USING (true) WITH CHECK (true);

-- Orders policies
CREATE POLICY "Anon can select orders" ON public.orders FOR SELECT TO anon USING (true);
CREATE POLICY "Anon can insert orders" ON public.orders FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Anon can update orders" ON public.orders FOR UPDATE TO anon USING (true) WITH CHECK (true);

-- Order items policies
CREATE POLICY "Anon can select order_items" ON public.order_items FOR SELECT TO anon USING (true);
CREATE POLICY "Anon can insert order_items" ON public.order_items FOR INSERT TO anon WITH CHECK (true);

-- Order status history
CREATE POLICY "Anon can read order history" ON public.order_status_history FOR SELECT TO anon USING (true);
CREATE POLICY "Anon can insert order history" ON public.order_status_history FOR INSERT TO anon WITH CHECK (true);

-- Reviews policies
CREATE POLICY "Anon can insert reviews" ON public.reviews FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Anon can update reviews" ON public.reviews FOR UPDATE TO anon USING (true) WITH CHECK (true);

-- Cart policies
CREATE POLICY "Anon can manage cart" ON public.cart_items FOR ALL TO anon USING (true) WITH CHECK (true);

-- Wishlist policies
CREATE POLICY "Anon can manage wishlist" ON public.wishlist_items FOR ALL TO anon USING (true) WITH CHECK (true);

-- Address policies
CREATE POLICY "Anon can manage addresses" ON public.addresses FOR ALL TO anon USING (true) WITH CHECK (true);

-- Notifications policies
CREATE POLICY "Anon can read notifications" ON public.notifications FOR SELECT TO anon USING (true);
CREATE POLICY "Anon can update notifications" ON public.notifications FOR UPDATE TO anon USING (true) WITH CHECK (true);

-- Store settings (admin only via service role)
CREATE POLICY "Anon can read settings" ON public.store_settings FOR SELECT TO anon USING (true);

-- Coupons (public read, admin manage)
CREATE POLICY "Public can read active coupons" ON public.coupons FOR SELECT USING (is_active = true);
CREATE POLICY "Anon can manage coupons" ON public.coupons FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Anon can manage coupon_products" ON public.coupon_products FOR ALL TO anon USING (true) WITH CHECK (true);

-- Categories (admin manage)
CREATE POLICY "Anon can manage categories" ON public.categories FOR ALL TO anon USING (true) WITH CHECK (true);

-- Brands (admin manage)
CREATE POLICY "Anon can manage brands" ON public.brands FOR ALL TO anon USING (true) WITH CHECK (true);

-- Products (admin manage)
CREATE POLICY "Anon can manage products" ON public.products FOR ALL TO anon USING (true) WITH CHECK (true);

-- Product images (admin manage)
CREATE POLICY "Anon can manage product_images" ON public.product_images FOR ALL TO anon USING (true) WITH CHECK (true);

-- Product variants (admin manage)
CREATE POLICY "Anon can manage product_variants" ON public.product_variants FOR ALL TO anon USING (true) WITH CHECK (true);

-- Product specifications (admin manage)
CREATE POLICY "Anon can manage product_specs" ON public.product_specifications FOR ALL TO anon USING (true) WITH CHECK (true);

-- Tags (admin manage)
CREATE POLICY "Anon can manage tags" ON public.tags FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Anon can manage product_tags" ON public.product_tags FOR ALL TO anon USING (true) WITH CHECK (true);

-- ============================================================
-- SEED DATA: Default Categories
-- ============================================================
INSERT INTO public.categories (id, name, slug, sort_order) VALUES
  ('cat-fullface', 'Full Face', 'full-face', 1),
  ('cat-modular', 'Modular', 'modular', 2),
  ('cat-openface', 'Open Face', 'open-face', 3),
  ('cat-34', '3/4 Helmet', '3-4-helmet', 4),
  ('cat-accessories', 'Accessories', 'accessories', 5),
  ('cat-parts', 'Parts', 'parts', 6);

-- ============================================================
-- SEED DATA: Default Brands
-- ============================================================
INSERT INTO public.brands (id, name, slug, sort_order) VALUES
  ('brand-arai', 'Arai', 'arai', 1),
  ('brand-shoei', 'Shoei', 'shoei', 2),
  ('brand-agv', 'AGV', 'agv', 3),
  ('brand-scorpion', 'Scorpion', 'scorpion', 4),
  ('brand-hjc', 'HJC', 'hjc', 5),
  ('brand-bell', 'Bell', 'bell', 6),
  ('brand-ls2', 'LS2', 'ls2', 7),
  ('brand-kyt', 'KYT', 'kyt', 8);

-- ============================================================
-- SEED DATA: Default Store Settings
-- ============================================================
INSERT INTO public.store_settings (key, value, category, description) VALUES
  ('store_name', '"Helmet Store"', 'general', 'Store display name'),
  ('store_email', '"contact@helmetstore.com"', 'general', 'Store contact email'),
  ('store_phone', '"+84 123 456 789"', 'general', 'Store phone number'),
  ('store_address', '"123 Main Street, Ho Chi Minh City"', 'general', 'Store physical address'),
  ('currency', '"USD"', 'payment', 'Default currency'),
  ('tax_rate', '0.1', 'payment', 'Default tax rate (10%)'),
  ('free_shipping_threshold', '100.00', 'shipping', 'Minimum order for free shipping'),
  ('default_shipping_fee', '5.00', 'shipping', 'Default shipping fee'),
  ('low_stock_threshold', '5', 'inventory', 'Default low stock alert threshold');