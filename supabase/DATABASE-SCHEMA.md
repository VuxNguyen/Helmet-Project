# Helmet-Project Database Schema v2.0

## Overview

Comprehensive database design for a motorcycle helmet e-commerce platform built on **Supabase (PostgreSQL)**.

---

## Entity Relationship Diagram (ERD)

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   categories │◄────│   products   │────►│    brands    │
│  (hierarchy) │     │              │     │              │
└──────────────┘     └──────┬───────┘     └──────────────┘
                            │
            ┌───────────────┼───────────────┬──────────────────┐
            │               │               │                  │
     ┌──────▼──────┐ ┌──────▼──────┐ ┌──────▼──────┐  ┌───────▼────────┐
     │product_images│ │product_vars │ │product_specs│  │  product_tags  │
     └─────────────┘ └─────────────┘ └─────────────┘  └───────┬────────┘
                                                               │
                                                         ┌─────▼─────┐
                                                         │   tags    │
                                                         └───────────┘

┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│    users     │────►│   reviews    │────►│   products   │
└──────┬───────┘     └──────────────┘     └──────────────┘
       │
       ├──────────────┬──────────────┬──────────────┐
       │              │              │              │
┌──────▼──────┐ ┌─────▼──────┐ ┌─────▼──────┐ ┌────▼────────┐
│  addresses  │ │ cart_items │ │ wishlist   │ │   orders    │
└─────────────┘ └────────────┘ └────────────┘ └──────┬──────┘
                                                      │
                                               ┌──────▼──────┐
                                               │ order_items │
                                               └─────────────┘
                                               ┌─────────────┐
                                               │order_history│
                                               └─────────────┘

┌──────────────┐     ┌──────────────┐
│   coupons    │────►│coupon_products│
└──────────────┘     └──────┬───────┘
                            │
                       ┌────▼────┐
                       │products │
                       └─────────┘

┌──────────────┐     ┌──────────────┐
│notifications │     │store_settings│
└──────────────┘     └──────────────┘
```

---

## Tables (20 Total)

### 1. `users` — User accounts
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | TEXT | PK | User identifier |
| name | TEXT | NOT NULL | Display name |
| email | TEXT | UNIQUE, NOT NULL | Login email |
| password | TEXT | NOT NULL | Hashed password |
| phone | TEXT | | Phone number |
| avatar | TEXT | | Profile image URL |
| role | TEXT | CHECK (customer/admin/superadmin) | User role |
| is_active | BOOLEAN | DEFAULT true | Account status |
| last_login_at | TIMESTAMPTZ | | Last login timestamp |
| created_at | TIMESTAMPTZ | DEFAULT now() | Creation date |
| updated_at | TIMESTAMPTZ | DEFAULT now() | Last update |

### 2. `addresses` — User shipping/billing addresses
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | TEXT | PK, DEFAULT uuid | Address ID |
| user_id | TEXT | FK → users, NOT NULL | Owner |
| full_name | TEXT | NOT NULL | Recipient name |
| phone | TEXT | | Recipient phone |
| address | TEXT | NOT NULL | Street address |
| city | TEXT | NOT NULL | City |
| state | TEXT | | State/Province |
| zip_code | TEXT | | Postal code |
| country | TEXT | DEFAULT 'VN' | Country code |
| is_active | BOOLEAN | DEFAULT false | Default address flag |

### 3. `categories` — Product categories (hierarchical)
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | TEXT | PK, DEFAULT uuid | Category ID |
| name | TEXT | NOT NULL | Display name |
| slug | TEXT | UNIQUE, NOT NULL | URL slug |
| description | TEXT | | Category description |
| image | TEXT | | Category image |
| parent_id | TEXT | FK → categories | Parent category (for nesting) |
| sort_order | INTEGER | DEFAULT 0 | Display order |
| is_active | BOOLEAN | DEFAULT true | Visibility |

**Seed data:** Full Face, Modular, Open Face, 3/4 Helmet, Accessories, Parts

### 4. `brands` — Product brands
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | TEXT | PK, DEFAULT uuid | Brand ID |
| name | TEXT | NOT NULL | Display name |
| slug | TEXT | UNIQUE, NOT NULL | URL slug |
| logo | TEXT | | Brand logo URL |
| description | TEXT | | Brand description |
| website | TEXT | | Official website |
| is_active | BOOLEAN | DEFAULT true | Visibility |
| sort_order | INTEGER | DEFAULT 0 | Display order |

**Seed data:** Arai, Shoei, AGV, Scorpion, HJC, Bell, LS2, KYT

### 5. `products` — Product catalog
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | TEXT | PK, DEFAULT uuid | Product ID |
| name | TEXT | NOT NULL | Product name |
| slug | TEXT | UNIQUE, NOT NULL | URL slug |
| sku | TEXT | UNIQUE, NOT NULL | Stock keeping unit |
| brand_id | TEXT | FK → brands | Brand reference |
| category_id | TEXT | FK → categories | Category reference |
| description | TEXT | | Full description |
| short_description | TEXT | | Brief description |
| price | DECIMAL(12,2) | NOT NULL, ≥ 0 | Selling price |
| original_price | DECIMAL(12,2) | ≥ 0 | Original/compare price |
| discount_percent | INTEGER | 0-100 | Discount percentage |
| cost_price | DECIMAL(12,2) | ≥ 0 | Wholesale cost |
| rating | DECIMAL(2,1) | 0-5 | Average rating (auto-calculated) |
| review_count | INTEGER | ≥ 0 | Number of reviews (auto-calculated) |
| stock_count | INTEGER | ≥ 0 | Total stock quantity |
| low_stock_threshold | INTEGER | DEFAULT 5 | Low stock alert level |
| status | TEXT | CHECK (active/draft/archived) | Product status |
| is_featured | BOOLEAN | DEFAULT false | Featured product flag |
| weight_grams | INTEGER | | Product weight |
| width_mm, height_mm, depth_mm | INTEGER | | Dimensions |
| meta_title | TEXT | | SEO title |
| meta_description | TEXT | | SEO description |
| related_ids | TEXT[] | | Related product IDs |

### 6. `product_images` — Product images
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | TEXT | PK, DEFAULT uuid | Image ID |
| product_id | TEXT | FK → products, NOT NULL | Parent product |
| url | TEXT | NOT NULL | Image URL |
| alt_text | TEXT | | Alt text for SEO |
| sort_order | INTEGER | DEFAULT 0 | Display order |
| is_primary | BOOLEAN | DEFAULT false | Primary image flag |

### 7. `product_variants` — Color/size variants
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | TEXT | PK, DEFAULT uuid | Variant ID |
| product_id | TEXT | FK → products, NOT NULL | Parent product |
| name | TEXT | NOT NULL | Variant display name (e.g., "Red - L") |
| color | TEXT | | Color option |
| size | TEXT | | Size option |
| sku | TEXT | UNIQUE | Variant-specific SKU |
| price | DECIMAL(12,2) | ≥ 0 | Variant-specific price |
| stock_count | INTEGER | ≥ 0 | Variant stock |
| image | TEXT | | Variant image |
| weight_grams | INTEGER | | Variant weight |
| is_active | BOOLEAN | DEFAULT true | Visibility |
| UNIQUE | (product_id, color, size) | | Prevent duplicate variants |

### 8. `product_specifications` — Technical specifications
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | TEXT | PK, DEFAULT uuid | Spec ID |
| product_id | TEXT | FK → products, NOT NULL | Parent product |
| group_name | TEXT | DEFAULT 'General' | Group (e.g., "Safety", "Comfort") |
| label | TEXT | NOT NULL | Spec label (e.g., "Shell Material") |
| value | TEXT | NOT NULL | Spec value (e.g., "Fiberglass") |
| sort_order | INTEGER | DEFAULT 0 | Display order |

### 9. `tags` — Product tags
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | TEXT | PK, DEFAULT uuid | Tag ID |
| name | TEXT | UNIQUE, NOT NULL | Tag name |
| slug | TEXT | UNIQUE, NOT NULL | URL slug |

### 10. `product_tags` — Product-Tag junction
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| product_id | TEXT | FK → products, PK | Product |
| tag_id | TEXT | FK → tags, PK | Tag |

### 11. `reviews` — Product reviews
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | TEXT | PK, DEFAULT uuid | Review ID |
| product_id | TEXT | FK → products, NOT NULL | Reviewed product |
| user_id | TEXT | FK → users | Reviewer (nullable for guest reviews) |
| author | TEXT | NOT NULL | Author display name |
| rating | INTEGER | 1-5 | Star rating |
| title | TEXT | | Review title |
| content | TEXT | | Review body |
| pros | TEXT | | Pros list |
| cons | TEXT | | Cons list |
| helpful | INTEGER | DEFAULT 0 | Helpful votes count |
| is_verified | BOOLEAN | DEFAULT false | Verified purchase |
| is_approved | BOOLEAN | DEFAULT false | Admin-approved |

> **Note:** `rating` and `review_count` on the `products` table are auto-calculated via a trigger whenever reviews are inserted, updated, or deleted.

### 12. `coupons` — Discount coupons
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | TEXT | PK, DEFAULT uuid | Coupon ID |
| code | TEXT | UNIQUE, NOT NULL | Coupon code (e.g., "SAVE10") |
| description | TEXT | | Description |
| discount_type | TEXT | CHECK (percentage/fixed) | Discount type |
| discount_value | DECIMAL(12,2) | > 0 | Discount amount |
| min_order_amount | DECIMAL(12,2) | DEFAULT 0 | Minimum order total |
| max_discount | DECIMAL(12,2) | | Max discount cap (for %) |
| usage_limit | INTEGER | | Total usage limit |
| usage_count | INTEGER | DEFAULT 0 | Current usage count |
| per_user_limit | INTEGER | DEFAULT 1 | Max uses per user |
| is_active | BOOLEAN | DEFAULT true | Active status |
| starts_at | TIMESTAMPTZ | | Valid from |
| expires_at | TIMESTAMPTZ | | Valid until |

### 13. `coupon_products` — Coupon-Product restriction
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| coupon_id | TEXT | FK → coupons, PK | Coupon |
| product_id | TEXT | FK → products, PK | Restricted product |

### 14. `orders` — Customer orders
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | TEXT | PK, DEFAULT uuid | Order ID |
| order_number | TEXT | UNIQUE, NOT NULL | Auto-generated (ORD-YYYYMMDD-XXXXX) |
| user_id | TEXT | FK → users | Customer |
| coupon_id | TEXT | FK → coupons | Applied coupon |
| customer_name | TEXT | NOT NULL | Customer name |
| customer_email | TEXT | NOT NULL | Customer email |
| customer_phone | TEXT | | Customer phone |
| status | TEXT | CHECK (7 statuses) | Order status |
| subtotal | DECIMAL(12,2) | ≥ 0 | Sum of item prices |
| discount_amount | DECIMAL(12,2) | ≥ 0 | Coupon discount |
| shipping_fee | DECIMAL(12,2) | ≥ 0 | Shipping cost |
| tax_amount | DECIMAL(12,2) | ≥ 0 | Tax amount |
| total | DECIMAL(12,2) | ≥ 0 | Final total |
| payment_method | TEXT | CHECK (cod/bank_transfer/momo/card) | Payment method |
| payment_status | TEXT | CHECK (unpaid/paid/refunded/partial) | Payment status |
| paid_at | TIMESTAMPTZ | | Payment timestamp |
| shipping_* | TEXT | | Shipping address fields |
| tracking_number | TEXT | | Shipping tracking |
| shipping_provider | TEXT | | Shipping carrier |
| notes | TEXT | | Customer notes |
| admin_notes | TEXT | | Internal notes |
| cancelled_at | TIMESTAMPTZ | | Cancellation timestamp |
| cancel_reason | TEXT | | Cancellation reason |
| delivered_at | TIMESTAMPTZ | | Delivery timestamp |

**Order Status Flow:** `pending` → `confirmed` → `processing` → `shipping` → `delivered`

### 15. `order_items` — Individual order line items
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | TEXT | PK, DEFAULT uuid | Item ID |
| order_id | TEXT | FK → orders, NOT NULL | Parent order |
| product_id | TEXT | FK → products | Product reference |
| variant_id | TEXT | FK → product_variants | Variant reference |
| product_name | TEXT | NOT NULL | Product name (snapshot) |
| product_sku | TEXT | | SKU (snapshot) |
| product_image | TEXT | | Image URL (snapshot) |
| color, size | TEXT | | Variant options (snapshot) |
| quantity | INTEGER | > 0 | Quantity ordered |
| unit_price | DECIMAL(12,2) | ≥ 0 | Price per unit |
| total_price | DECIMAL(12,2) | ≥ 0 | quantity × unit_price |

### 16. `order_status_history` — Status change audit trail
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | TEXT | PK, DEFAULT uuid | History ID |
| order_id | TEXT | FK → orders, NOT NULL | Order |
| status | TEXT | NOT NULL | New status |
| note | TEXT | | Change note |
| changed_by | TEXT | FK → users | Admin who changed it |
| created_at | TIMESTAMPTZ | | When changed |

### 17. `cart_items` — Shopping cart
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | TEXT | PK, DEFAULT uuid | Cart item ID |
| user_id | TEXT | FK → users | Logged-in user |
| session_id | TEXT | | Guest session ID |
| product_id | TEXT | FK → products, NOT NULL | Product |
| variant_id | TEXT | FK → product_variants | Selected variant |
| quantity | INTEGER | ≥ 1 | Quantity |

### 18. `wishlist_items` — User wishlists
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | TEXT | PK, DEFAULT uuid | Wishlist item ID |
| user_id | TEXT | FK → users, NOT NULL | Owner |
| product_id | TEXT | FK → products, NOT NULL | Product |
| UNIQUE | (user_id, product_id) | | One wishlist entry per product |

### 19. `store_settings` — Key-value store settings
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | TEXT | PK, DEFAULT uuid | Setting ID |
| key | TEXT | UNIQUE, NOT NULL | Setting key |
| value | JSONB | NOT NULL | Setting value (JSON) |
| category | TEXT | DEFAULT 'general' | Grouping (general/payment/shipping/inventory) |
| description | TEXT | | Human-readable description |
| updated_by | TEXT | FK → users | Last editor |

**Default settings:** store_name, store_email, store_phone, currency, tax_rate, shipping fees, etc.

### 20. `notifications` — User notifications
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | TEXT | PK, DEFAULT uuid | Notification ID |
| user_id | TEXT | FK → users | Recipient (null = global) |
| type | TEXT | CHECK (order/stock/system/promotion/review) | Notification type |
| title | TEXT | NOT NULL | Title |
| message | TEXT | NOT NULL | Body |
| data | JSONB | DEFAULT '{}' | Related data |
| is_read | BOOLEAN | DEFAULT false | Read status |

---

## Key Improvements Over v1

| Feature | v1 (Old) | v2 (New) |
|---------|----------|----------|
| Categories | Text field on product | Dedicated table with hierarchy |
| Brands | Text field on product | Dedicated table with metadata |
| Order items | JSONB in orders table | Normalized order_items table |
| Product variants | JSONB arrays | product_variants table |
| Product images | JSONB array | product_images table |
| Specifications | JSONB array | product_specifications table |
| Order tracking | Basic status | 7 statuses + history table |
| Payments | Single field | payment_method + payment_status |
| Coupons | None | Full coupon system with restrictions |
| Settings | None | Key-value store_settings table |
| Notifications | None | notifications table |
| Reviews | Basic | pros/cons, approval, user link |
| SEO | None | meta_title, meta_description |
| Audit trail | None | updated_at triggers, order history |
| Rating calc | Manual | Auto-trigger on review changes |
| Order numbers | Manual | Auto-generated sequence trigger |

---

## Triggers & Automation

| Trigger | Table | Event | Purpose |
|---------|-------|-------|---------|
| `trg_*_updated_at` | 11 tables | BEFORE UPDATE | Auto-set `updated_at` timestamp |
| `trg_review_rating_update` | reviews | AFTER INSERT/UPDATE/DELETE | Auto-recalculate product rating & review_count |
| `trg_order_number` | orders | BEFORE INSERT | Auto-generate order number (ORD-YYYYMMDD-XXXXX) |

---

## How to Apply

1. Open **Supabase Dashboard** → SQL Editor
2. Run `supabase/schema.sql` (this drops old tables and creates new ones)
3. Verify tables in Table Editor
4. Update application code to use new schema

> **Warning:** This migration drops all existing tables. Export your data first if needed.