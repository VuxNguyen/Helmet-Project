import type { AdminOrder, OrderFilters } from "./types"

const now = new Date()
const daysAgo = (d: number) => {
  const date = new Date(now)
  date.setDate(date.getDate() - d)
  return date.toISOString()
}

export const adminOrders: AdminOrder[] = [
  {
    id: "1",
    orderNumber: "ORD-2026-001",
    customer: { name: "Alice Johnson", email: "alice@example.com" },
    items: [
      { id: "p1", name: "Arai RX-7X Evo", sku: "HELM-0001", quantity: 1, price: 899.99, image: "/placeholder-helmet.svg" },
    ],
    total: 959.98,
    subtotal: 899.99,
    shipping: 29.99,
    tax: 30.00,
    status: "delivered",
    shippingAddress: {
      line1: "123 Main St", city: "Portland", state: "OR", zip: "97201", country: "US",
    },
    paymentMethod: "Visa **** 4242",
    createdAt: daysAgo(1),
    updatedAt: daysAgo(1),
  },
  {
    id: "2",
    orderNumber: "ORD-2026-002",
    customer: { name: "Bob Smith", email: "bob@example.com" },
    items: [
      { id: "p2", name: "Shoei X-Fifteen", sku: "HELM-0002", quantity: 1, price: 799.99, image: "/placeholder-helmet.svg" },
      { id: "p3", name: "Visor Tint", sku: "ACC-0012", quantity: 2, price: 39.99, image: "/placeholder-helmet.svg" },
    ],
    total: 919.96,
    subtotal: 879.97,
    shipping: 0,
    tax: 39.99,
    status: "processing",
    shippingAddress: {
      line1: "456 Oak Ave", city: "Seattle", state: "WA", zip: "98101", country: "US",
    },
    paymentMethod: "Mastercard **** 8888",
    createdAt: daysAgo(2),
    updatedAt: daysAgo(1),
  },
  {
    id: "3",
    orderNumber: "ORD-2026-003",
    customer: { name: "Carol Davis", email: "carol@example.com" },
    items: [
      { id: "p4", name: "AGV Pista GP RR", sku: "HELM-0003", quantity: 1, price: 1499.99, image: "/placeholder-helmet.svg" },
    ],
    total: 1559.98,
    subtotal: 1499.99,
    shipping: 29.99,
    tax: 30.00,
    status: "pending",
    shippingAddress: {
      line1: "789 Pine Rd", city: "Denver", state: "CO", zip: "80201", country: "US",
    },
    paymentMethod: "Amex **** 1234",
    createdAt: daysAgo(0.5),
    updatedAt: daysAgo(0.5),
  },
  {
    id: "4",
    orderNumber: "ORD-2026-004",
    customer: { name: "David Wilson", email: "david@example.com" },
    items: [
      { id: "p5", name: "Scorpion EXO-R1 Air", sku: "HELM-0004", quantity: 1, price: 549.99, image: "/placeholder-helmet.svg" },
    ],
    total: 579.98,
    subtotal: 549.99,
    shipping: 0,
    tax: 29.99,
    status: "shipped",
    shippingAddress: {
      line1: "321 Elm St", city: "Chicago", state: "IL", zip: "60601", country: "US",
    },
    paymentMethod: "Visa **** 5678",
    notes: "Leave at front door",
    createdAt: daysAgo(3),
    updatedAt: daysAgo(1),
  },
  {
    id: "5",
    orderNumber: "ORD-2026-005",
    customer: { name: "Eve Martinez", email: "eve@example.com" },
    items: [
      { id: "p6", name: "HJC RPHA 91", sku: "HELM-0005", quantity: 1, price: 499.99, image: "/placeholder-helmet.svg" },
      { id: "p7", name: "Pinlock Insert", sku: "ACC-0034", quantity: 1, price: 34.99, image: "/placeholder-helmet.svg" },
    ],
    total: 564.97,
    subtotal: 534.98,
    shipping: 0,
    tax: 29.99,
    status: "cancelled",
    shippingAddress: {
      line1: "654 Maple Dr", city: "Austin", state: "TX", zip: "73301", country: "US",
    },
    paymentMethod: "PayPal",
    createdAt: daysAgo(5),
    updatedAt: daysAgo(4),
  },
  {
    id: "6",
    orderNumber: "ORD-2026-006",
    customer: { name: "Frank Lee", email: "frank@example.com" },
    items: [
      { id: "p8", name: "Bell Race Star DLX", sku: "HELM-0006", quantity: 1, price: 699.99, image: "/placeholder-helmet.svg" },
    ],
    total: 759.98,
    subtotal: 699.99,
    shipping: 29.99,
    tax: 30.00,
    status: "confirmed",
    shippingAddress: {
      line1: "987 Cedar Ln", city: "Miami", state: "FL", zip: "33101", country: "US",
    },
    paymentMethod: "Discover **** 4321",
    createdAt: daysAgo(1),
    updatedAt: daysAgo(1),
  },
  {
    id: "7",
    orderNumber: "ORD-2026-007",
    customer: { name: "Grace Kim", email: "grace@example.com" },
    items: [
      { id: "p9", name: "LS2 Thunder Carbon", sku: "HELM-0007", quantity: 2, price: 399.99, image: "/placeholder-helmet.svg" },
    ],
    total: 859.97,
    subtotal: 799.98,
    shipping: 29.99,
    tax: 30.00,
    status: "delivered",
    shippingAddress: {
      line1: "246 Birch Ct", city: "San Francisco", state: "CA", zip: "94101", country: "US",
    },
    paymentMethod: "Visa **** 9999",
    createdAt: daysAgo(7),
    updatedAt: daysAgo(5),
  },
  {
    id: "8",
    orderNumber: "ORD-2026-008",
    customer: { name: "Henry Patel", email: "henry@example.com" },
    items: [
      { id: "p10", name: "KYT NZ Race", sku: "HELM-0008", quantity: 1, price: 299.99, image: "/placeholder-helmet.svg" },
    ],
    total: 329.98,
    subtotal: 299.99,
    shipping: 0,
    tax: 29.99,
    status: "processing",
    shippingAddress: {
      line1: "135 Walnut Ave", city: "Boston", state: "MA", zip: "02101", country: "US",
    },
    paymentMethod: "Mastercard **** 7777",
    createdAt: daysAgo(4),
    updatedAt: daysAgo(3),
  },
  {
    id: "9",
    orderNumber: "ORD-2026-009",
    customer: { name: "Iris Chen", email: "iris@example.com" },
    items: [
      { id: "p11", name: "Arai XD-4 Adventure", sku: "HELM-0009", quantity: 1, price: 749.99, image: "/placeholder-helmet.svg" },
      { id: "p12", name: "Chin Curtain", sku: "ACC-0056", quantity: 1, price: 24.99, image: "/placeholder-helmet.svg" },
    ],
    total: 824.97,
    subtotal: 774.98,
    shipping: 19.99,
    tax: 30.00,
    status: "shipped",
    shippingAddress: {
      line1: "864 Spruce St", city: "Atlanta", state: "GA", zip: "30301", country: "US",
    },
    paymentMethod: "PayPal",
    createdAt: daysAgo(6),
    updatedAt: daysAgo(2),
  },
  {
    id: "10",
    orderNumber: "ORD-2026-010",
    customer: { name: "Jack Thompson", email: "jack@example.com" },
    items: [
      { id: "p13", name: "Shoei Neotec 3", sku: "HELM-0010", quantity: 1, price: 649.99, image: "/placeholder-helmet.svg" },
    ],
    total: 709.98,
    subtotal: 649.99,
    shipping: 29.99,
    tax: 30.00,
    status: "pending",
    shippingAddress: {
      line1: "753 Cherry Blvd", city: "Dallas", state: "TX", zip: "75201", country: "US",
    },
    paymentMethod: "Amex **** 5555",
    createdAt: daysAgo(0.2),
    updatedAt: daysAgo(0.2),
  },
  {
    id: "11",
    orderNumber: "ORD-2026-011",
    customer: { name: "Karen Walsh", email: "karen@example.com" },
    items: [
      { id: "p14", name: "AGV K6 S", sku: "HELM-0011", quantity: 1, price: 549.99, image: "/placeholder-helmet.svg" },
    ],
    total: 579.98,
    subtotal: 549.99,
    shipping: 0,
    tax: 30.00,
    status: "delivered",
    shippingAddress: {
      line1: "429 Ash Way", city: "Phoenix", state: "AZ", zip: "85001", country: "US",
    },
    paymentMethod: "Visa **** 3333",
    createdAt: daysAgo(10),
    updatedAt: daysAgo(7),
  },
  {
    id: "12",
    orderNumber: "ORD-2026-012",
    customer: { name: "Leo Garcia", email: "leo@example.com" },
    items: [
      { id: "p15", name: "HJC i100", sku: "HELM-0012", quantity: 1, price: 329.99, image: "/placeholder-helmet.svg" },
    ],
    total: 359.98,
    subtotal: 329.99,
    shipping: 0,
    tax: 29.99,
    status: "cancelled",
    shippingAddress: {
      line1: "517 Poplar Ct", city: "Detroit", state: "MI", zip: "48201", country: "US",
    },
    paymentMethod: "Mastercard **** 2222",
    createdAt: daysAgo(12),
    updatedAt: daysAgo(11),
  },
  {
    id: "13",
    orderNumber: "ORD-2026-013",
    customer: { name: "Mia Robinson", email: "mia@example.com" },
    items: [
      { id: "p16", name: "Bell Qualifier DLX", sku: "HELM-0013", quantity: 2, price: 219.99, image: "/placeholder-helmet.svg" },
    ],
    total: 489.97,
    subtotal: 439.98,
    shipping: 19.99,
    tax: 30.00,
    status: "confirmed",
    shippingAddress: {
      line1: "238 Fir Ln", city: "Minneapolis", state: "MN", zip: "55401", country: "US",
    },
    paymentMethod: "PayPal",
    createdAt: daysAgo(2),
    updatedAt: daysAgo(2),
  },
  {
    id: "14",
    orderNumber: "ORD-2026-014",
    customer: { name: "Nathan Brown", email: "nathan@example.com" },
    items: [
      { id: "p17", name: "Scorpion EXO-491", sku: "HELM-0014", quantity: 1, price: 279.99, image: "/placeholder-helmet.svg" },
    ],
    total: 309.98,
    subtotal: 279.99,
    shipping: 0,
    tax: 29.99,
    status: "processing",
    shippingAddress: {
      line1: "671 Sycamore Dr", city: "Charlotte", state: "NC", zip: "28201", country: "US",
    },
    paymentMethod: "Visa **** 1111",
    createdAt: daysAgo(3),
    updatedAt: daysAgo(2),
  },
  {
    id: "15",
    orderNumber: "ORD-2026-015",
    customer: { name: "Olivia Taylor", email: "olivia@example.com" },
    items: [
      { id: "p18", name: "LS2 Flex Retro", sku: "HELM-0015", quantity: 1, price: 189.99, image: "/placeholder-helmet.svg" },
      { id: "p19", name: "Helmet Bag", sku: "ACC-0078", quantity: 1, price: 49.99, image: "/placeholder-helmet.svg" },
    ],
    total: 269.97,
    subtotal: 239.98,
    shipping: 0,
    tax: 29.99,
    status: "pending",
    shippingAddress: {
      line1: "352 Magnolia St", city: "Nashville", state: "TN", zip: "37201", country: "US",
    },
    paymentMethod: "Discover **** 6666",
    createdAt: daysAgo(0.8),
    updatedAt: daysAgo(0.8),
  },
]

export function getFilteredOrders(
  orders: AdminOrder[],
  filters: OrderFilters,
): AdminOrder[] {
  return orders.filter((order) => {
    if (filters.search) {
      const q = filters.search.toLowerCase()
      const match =
        order.orderNumber.toLowerCase().includes(q) ||
        order.customer.name.toLowerCase().includes(q) ||
        order.customer.email.toLowerCase().includes(q)
      if (!match) return false
    }

    if (filters.status && order.status !== filters.status) {
      return false
    }

    if (filters.dateFrom) {
      const from = new Date(filters.dateFrom)
      const created = new Date(order.createdAt)
      if (created < from) return false
    }

    if (filters.dateTo) {
      const to = new Date(filters.dateTo)
      to.setHours(23, 59, 59, 999)
      const created = new Date(order.createdAt)
      if (created > to) return false
    }

    return true
  })
}
