/**
 * System diagnostic script
 * Run with: npx tsx scripts/diagnostic.ts
 */
import { createClient } from "@supabase/supabase-js"
import fs from "fs"
import path from "path"

// Read .env.local
const envPath = path.join(process.cwd(), ".env.local")
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf-8")
  envContent.split("\n").forEach((line) => {
    const [key, ...rest] = line.split("=")
    if (key && rest.length > 0) {
      const value = rest.join("=").trim().replace(/^["']|["']$/g, "")
      process.env[key.trim()] = value
    }
  })
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("❌ Missing environment variables")
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function diagnostic() {
  console.log("=".repeat(50))
  console.log("🔍 SYSTEM DIAGNOSTIC REPORT")
  console.log("=".repeat(50))
  console.log(`Supabase URL: ${supabaseUrl}\n`)

  // Test 1: Check all tables exist and have data
  const tables = ["users", "products", "reviews", "orders", "cart_items", "wishlist_items", "addresses"]
  let allOk = true

  console.log("📊 DATABASE TABLES:")
  for (const table of tables) {
    const { data, error, count } = await supabase
      .from(table)
      .select("*", { count: "exact", head: true })

    if (error) {
      console.error(`  ❌ ${table}: ${error.message}`)
      allOk = false
    } else {
      console.log(`  ✅ ${table}: ${count || 0} rows`)
    }
  }

  // Test 2: Check specific records
  console.log("\n🔎 SAMPLE DATA CHECKS:")

  const { data: users } = await supabase.from("users").select("id, name, email").limit(3)
  console.log(`  Users sample: ${users?.length ? users.map(u => u.email).join(", ") : "EMPTY!"}`)
  if (!users?.length) allOk = false

  const { data: products } = await supabase.from("products").select("name, slug").limit(3)
  console.log(`  Products sample: ${products?.length ? products.map(p => p.name).join(", ") : "EMPTY!"}`)
  if (!products?.length) allOk = false

  const { data: orders } = await supabase.from("orders").select("order_number, status").limit(3)
  console.log(`  Orders sample: ${orders?.length ? orders.map(o => `${o.order_number} (${o.status})`).join(", ") : "EMPTY!"}`)
  if (!orders?.length) allOk = false

  // Test 3: Check specific lookups
  console.log("\n🔗 RELATIONSHIP CHECKS:")
  
  if (products?.length) {
    const firstProduct = products[0] as unknown as { id: string; name: string }
    const { data: reviews } = await supabase
      .from("reviews")
      .select("id, product_id")
      .eq("product_id", firstProduct.id)
    console.log(`  Reviews for "${firstProduct.name}": ${reviews?.length || 0} reviews`)
  }

  const { data: addresses } = await supabase.from("addresses").select("user_id, full_name")
  if (addresses?.length) {
    console.log(`  Addresses linked to users: ${addresses.map(a => a.full_name).join(", ")}`)
  }

  // Test 4: Verify featured products
  const { data: featured } = await supabase
    .from("products")
    .select("name")
    .eq("featured", true)
  console.log(`\n⭐ Featured products: ${featured?.length || 0}`)

  // Summary
  console.log("\n" + "=".repeat(50))
  if (allOk) {
    console.log("✅ DIAGNOSTIC PASSED - All systems operational!")
  } else {
    console.log("❌ DIAGNOSTIC FAILED - Issues found!")
    process.exit(1)
  }
  console.log("=".repeat(50))
}

diagnostic().catch(console.error)