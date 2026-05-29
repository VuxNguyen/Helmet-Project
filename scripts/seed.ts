/**
 * Seed script to migrate JSON data into Supabase.
 * Run with: npx tsx scripts/seed.ts
 */
import { createClient } from "@supabase/supabase-js"
import fs from "fs"
import path from "path"

// Read .env.local manually
const envPath = path.join(process.cwd(), ".env.local")
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf-8")
  envContent.split("\n").forEach((line) => {
    const [key, ...rest] = line.split("=")
    if (key && rest.length > 0) {
      const value = rest.join("=").trim()
      // Remove quotes if present
      const cleanValue = value.replace(/^["']|["']$/g, "")
      process.env[key.trim()] = cleanValue
    }
  })
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("❌ Missing Supabase environment variables. Check .env.local file.")
  console.error("   Required: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_KEY")
  process.exit(1)
}

// Use service_role key to bypass RLS during seeding
const supabase = createClient(supabaseUrl, supabaseServiceKey)

const DB_DIR = path.join(process.cwd(), "src/data/db")

function readJson(filename: string) {
  const fp = path.join(DB_DIR, filename)
  if (!fs.existsSync(fp)) return []
  return JSON.parse(fs.readFileSync(fp, "utf-8"))
}

async function seed() {
  console.log("🚀 Starting seed...")
  console.log(`   Supabase URL: ${supabaseUrl}`)

  // 1. Seed users
  console.log("\n📦 Seeding users...")
  const users = readJson("users.json")
  for (const user of users) {
    const { data: existing } = await supabase
      .from("users")
      .select("id")
      .eq("email", user.email)
      .maybeSingle()

    if (existing) {
      console.log(`  ⏭️  User ${user.email} already exists, skipping`)
      continue
    }

    const { error } = await supabase.from("users").insert({
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      phone: user.phone || null,
      role: "customer",
    })

    if (error) {
      console.error(`  ❌ Failed to insert user ${user.email}:`, error.message)
    } else {
      console.log(`  ✅ Inserted user ${user.email}`)
    }
  }

  // 2. Seed products
  console.log("\n📦 Seeding products...")
  const products = readJson("products.json")
  for (const product of products) {
    const { data: existing } = await supabase
      .from("products")
      .select("id")
      .eq("slug", product.slug)
      .maybeSingle()

    if (existing) {
      console.log(`  ⏭️  Product ${product.slug} already exists, skipping`)
      continue
    }

    const { error } = await supabase.from("products").insert({
      id: product.id,
      name: product.name,
      brand: product.brand,
      slug: product.slug,
      sku: product.sku || null,
      description: product.description || null,
      short_description: product.shortDescription || null,
      image: product.image || null,
      images: product.images || [],
      price: product.price,
      original_price: product.originalPrice || null,
      discount: product.discount || null,
      rating: product.rating || 0,
      review_count: product.reviewCount || 0,
      category: product.category || null,
      category_slug: product.categorySlug || null,
      in_stock: product.inStock ?? true,
      stock_count: product.stockCount || 0,
      featured: product.featured || false,
      colors: product.colors || [],
      sizes: product.sizes || [],
      specifications: product.specifications || [],
      related_ids: product.relatedIds || [],
    })

    if (error) {
      console.error(`  ❌ Failed to insert product ${product.slug}:`, error.message)
    } else {
      console.log(`  ✅ Inserted product ${product.slug}`)
    }

    // Insert reviews if any
    if (product.reviews && product.reviews.length > 0) {
      for (const review of product.reviews) {
        const { error: reviewError } = await supabase.from("reviews").insert({
          id: review.id,
          product_id: product.id,
          author: review.author,
          rating: review.rating,
          date: review.date || new Date().toISOString().split("T")[0],
          title: review.title || null,
          content: review.content || null,
          helpful: review.helpful || 0,
          verified: review.verified || false,
        })
        if (reviewError) {
          console.error(`    ❌ Failed to insert review:`, reviewError.message)
        }
      }
    }
  }

  // 3. Seed orders
  console.log("\n📦 Seeding orders...")
  const orders = readJson("orders.json")
  for (const order of orders) {
    const { data: existing } = await supabase
      .from("orders")
      .select("id")
      .eq("order_number", order.orderNumber)
      .maybeSingle()

    if (existing) {
      console.log(`  ⏭️  Order ${order.orderNumber} already exists, skipping`)
      continue
    }

    const { error } = await supabase.from("orders").insert({
      id: order.id,
      order_number: order.orderNumber,
      user_id: order.userId || null,
      customer_name: order.customer?.name || null,
      customer_email: order.customer?.email || null,
      items: order.items || [],
      total: order.total,
      subtotal: order.subtotal,
      shipping: order.shipping || 0,
      tax: order.tax || 0,
      status: order.status || "pending",
      shipping_address: order.shippingAddress || {},
      payment_method: order.paymentMethod || null,
      notes: order.notes || null,
    })

    if (error) {
      console.error(`  ❌ Failed to insert order ${order.orderNumber}:`, error.message)
    } else {
      console.log(`  ✅ Inserted order ${order.orderNumber}`)
    }
  }

  // 4. Seed cart items
  console.log("\n📦 Seeding cart items...")
  const cartItems = readJson("cart.json")
  for (const item of cartItems) {
    // Check if product exists before inserting
    const { data: product } = await supabase
      .from("products")
      .select("id")
      .eq("id", item.id)
      .maybeSingle()

    if (!product) {
      console.log(`  ⏭️  Cart item ${item.name}: product ID "${item.id}" not found, skipping`)
      continue
    }

    const { error } = await supabase.from("cart_items").insert({
      session_id: "guest",
      product_id: item.id,
      name: item.name,
      price: item.price,
      image: item.image || "/placeholder-helmet.svg",
      quantity: item.quantity || 1,
      variant: item.variant || null,
    })
    if (error) {
      console.error(`  ❌ Failed to insert cart item:`, error.message)
    } else {
      console.log(`  ✅ Inserted cart item: ${item.name}`)
    }
  }

  // 5. Seed wishlist items
  console.log("\n📦 Seeding wishlist items...")
  const wishlistItems = readJson("wishlist.json")
  for (const item of wishlistItems) {
    const { error } = await supabase.from("wishlist_items").insert({
      user_id: item.userId || "guest",
      product_id: item.productId,
      name: item.name,
      price: item.price,
      image: item.image || "/placeholder-helmet.svg",
    })
    if (error) {
      console.error(`  ❌ Failed to insert wishlist item:`, error.message)
    } else {
      console.log(`  ✅ Inserted wishlist item: ${item.name}`)
    }
  }

  // 6. Seed addresses
  console.log("\n📦 Seeding addresses...")
  const addresses = readJson("addresses.json")
  for (const addr of addresses) {
    const { error } = await supabase.from("addresses").insert({
      user_id: addr.userId || "guest",
      full_name: addr.name || addr.fullName,
      phone: addr.phone || null,
      address: addr.street || addr.address || "",
      city: addr.city,
      state: addr.state,
      zip_code: addr.zipCode || null,
      is_default: addr.isDefault || false,
    })
    if (error) {
      console.error(`  ❌ Failed to insert address:`, error.message)
    } else {
      console.log(`  ✅ Inserted address for ${addr.name || addr.fullName}`)
    }
  }

  console.log("\n✅ Seed completed!")
}

seed().catch(console.error)