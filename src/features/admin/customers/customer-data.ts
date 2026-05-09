import type { AdminCustomer, CustomerFilters } from "./types"
import type { OrderStatus } from "../orders/types"

const now = new Date()
const daysAgo = (d: number) => {
  const date = new Date(now)
  date.setDate(date.getDate() - d)
  return date.toISOString()
}

const monthsAgo = (m: number) => {
  const date = new Date(now)
  date.setMonth(date.getMonth() - m)
  return date.toISOString()
}

function createRecentOrders(
  baseId: string,
  orderCount: number,
  baseSpent: number,
): {
  id: string
  orderNumber: string
  total: number
  status: OrderStatus
  createdAt: string
  items: number
}[] {
  const statuses: OrderStatus[] = [
    "delivered", "delivered", "shipped", "processing",
    "delivered", "pending", "delivered", "cancelled",
    "delivered", "confirmed",
  ]

  return Array.from({ length: Math.min(orderCount, 5) }, (_, i) => {
    const dayOffset = i * 7 + Math.floor(Math.random() * 5)
    return {
      id: `${baseId}-order-${i}`,
      orderNumber: `ORD-2026-${String(Number(baseId) * 10 + i).padStart(3, "0")}`,
      total: Math.round((baseSpent / Math.max(orderCount, 1)) * (1 + Math.random() * 0.4 - 0.2) * 100) / 100,
      status: statuses[i % statuses.length],
      createdAt: daysAgo(dayOffset),
      items: Math.floor(Math.random() * 3) + 1,
    }
  })
}

export const adminCustomers: AdminCustomer[] = [
  {
    id: "1",
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    phone: "+1 (555) 123-4567",
    status: "active",
    totalOrders: 12,
    totalSpent: 8420.50,
    averageOrderValue: 701.71,
    lastOrderDate: daysAgo(2),
    createdAt: monthsAgo(14),
    city: "Portland",
    state: "OR",
    country: "US",
    tags: ["VIP", "Helmet Enthusiast"],
    recentOrders: createRecentOrders("1", 12, 8420.50),
  },
  {
    id: "2",
    name: "Bob Smith",
    email: "bob.smith@example.com",
    phone: "+1 (555) 234-5678",
    status: "active",
    totalOrders: 8,
    totalSpent: 5230.00,
    averageOrderValue: 653.75,
    lastOrderDate: daysAgo(5),
    createdAt: monthsAgo(10),
    city: "Seattle",
    state: "WA",
    country: "US",
    tags: ["Repeat Buyer"],
    recentOrders: createRecentOrders("2", 8, 5230.00),
  },
  {
    id: "3",
    name: "Carol Davis",
    email: "carol.davis@example.com",
    phone: "+1 (555) 345-6789",
    status: "active",
    totalOrders: 3,
    totalSpent: 1240.00,
    averageOrderValue: 413.33,
    lastOrderDate: daysAgo(1),
    createdAt: monthsAgo(3),
    city: "Denver",
    state: "CO",
    country: "US",
    tags: ["New"],
    recentOrders: createRecentOrders("3", 3, 1240.00),
  },
  {
    id: "4",
    name: "David Wilson",
    email: "david.wilson@example.com",
    phone: "+1 (555) 456-7890",
    status: "active",
    totalOrders: 25,
    totalSpent: 18340.75,
    averageOrderValue: 733.63,
    lastOrderDate: daysAgo(0.5),
    createdAt: monthsAgo(24),
    city: "Chicago",
    state: "IL",
    country: "US",
    tags: ["VIP", "Wholesale", "Frequent"],
    recentOrders: createRecentOrders("4", 25, 18340.75),
  },
  {
    id: "5",
    name: "Eve Martinez",
    email: "eve.martinez@example.com",
    phone: "+1 (555) 567-8901",
    status: "inactive",
    totalOrders: 2,
    totalSpent: 530.00,
    averageOrderValue: 265.00,
    lastOrderDate: daysAgo(180),
    createdAt: monthsAgo(6),
    city: "Austin",
    state: "TX",
    country: "US",
    tags: [],
    recentOrders: createRecentOrders("5", 2, 530.00),
  },
  {
    id: "6",
    name: "Frank Lee",
    email: "frank.lee@example.com",
    phone: "+1 (555) 678-9012",
    status: "active",
    totalOrders: 15,
    totalSpent: 9870.25,
    averageOrderValue: 658.02,
    lastOrderDate: daysAgo(3),
    createdAt: monthsAgo(18),
    city: "Miami",
    state: "FL",
    country: "US",
    tags: ["Gear Collector"],
    recentOrders: createRecentOrders("6", 15, 9870.25),
  },
  {
    id: "7",
    name: "Grace Kim",
    email: "grace.kim@example.com",
    phone: "+1 (555) 789-0123",
    status: "active",
    totalOrders: 6,
    totalSpent: 4120.00,
    averageOrderValue: 686.67,
    lastOrderDate: daysAgo(7),
    createdAt: monthsAgo(8),
    city: "San Francisco",
    state: "CA",
    country: "US",
    tags: ["Premium"],
    recentOrders: createRecentOrders("7", 6, 4120.00),
  },
  {
    id: "8",
    name: "Henry Patel",
    email: "henry.patel@example.com",
    phone: "+1 (555) 890-1234",
    status: "active",
    totalOrders: 18,
    totalSpent: 12450.00,
    averageOrderValue: 691.67,
    lastOrderDate: daysAgo(1),
    createdAt: monthsAgo(20),
    city: "Boston",
    state: "MA",
    country: "US",
    tags: ["Frequent", "VIP"],
    recentOrders: createRecentOrders("8", 18, 12450.00),
  },
  {
    id: "9",
    name: "Iris Chen",
    email: "iris.chen@example.com",
    phone: "+1 (555) 901-2345",
    status: "blocked",
    totalOrders: 1,
    totalSpent: 749.99,
    averageOrderValue: 749.99,
    lastOrderDate: daysAgo(45),
    createdAt: monthsAgo(2),
    city: "Atlanta",
    state: "GA",
    country: "US",
    tags: [],
    recentOrders: createRecentOrders("9", 1, 749.99),
  },
  {
    id: "10",
    name: "Jack Thompson",
    email: "jack.thompson@example.com",
    phone: "+1 (555) 012-3456",
    status: "active",
    totalOrders: 9,
    totalSpent: 6780.50,
    averageOrderValue: 753.39,
    lastOrderDate: daysAgo(4),
    createdAt: monthsAgo(12),
    city: "Dallas",
    state: "TX",
    country: "US",
    tags: ["Adventure Rider"],
    recentOrders: createRecentOrders("10", 9, 6780.50),
  },
  {
    id: "11",
    name: "Karen Walsh",
    email: "karen.walsh@example.com",
    phone: "+1 (555) 123-7890",
    status: "active",
    totalOrders: 4,
    totalSpent: 1890.00,
    averageOrderValue: 472.50,
    lastOrderDate: daysAgo(10),
    createdAt: monthsAgo(5),
    city: "Phoenix",
    state: "AZ",
    country: "US",
    tags: ["Seasonal"],
    recentOrders: createRecentOrders("11", 4, 1890.00),
  },
  {
    id: "12",
    name: "Leo Garcia",
    email: "leo.garcia@example.com",
    phone: "+1 (555) 234-8901",
    status: "inactive",
    totalOrders: 1,
    totalSpent: 329.99,
    averageOrderValue: 329.99,
    lastOrderDate: daysAgo(200),
    createdAt: monthsAgo(7),
    city: "Detroit",
    state: "MI",
    country: "US",
    tags: [],
    recentOrders: createRecentOrders("12", 1, 329.99),
  },
  {
    id: "13",
    name: "Mia Robinson",
    email: "mia.robinson@example.com",
    phone: "+1 (555) 345-9012",
    status: "active",
    totalOrders: 20,
    totalSpent: 14230.00,
    averageOrderValue: 711.50,
    lastOrderDate: daysAgo(2),
    createdAt: monthsAgo(22),
    city: "Minneapolis",
    state: "MN",
    country: "US",
    tags: ["VIP", "Early Adopter"],
    recentOrders: createRecentOrders("13", 20, 14230.00),
  },
  {
    id: "14",
    name: "Nathan Brown",
    email: "nathan.brown@example.com",
    phone: "+1 (555) 456-0123",
    status: "active",
    totalOrders: 7,
    totalSpent: 4350.00,
    averageOrderValue: 621.43,
    lastOrderDate: daysAgo(6),
    createdAt: monthsAgo(9),
    city: "Charlotte",
    state: "NC",
    country: "US",
    tags: ["Street Rider"],
    recentOrders: createRecentOrders("14", 7, 4350.00),
  },
  {
    id: "15",
    name: "Olivia Taylor",
    email: "olivia.taylor@example.com",
    phone: "+1 (555) 567-1234",
    status: "active",
    totalOrders: 5,
    totalSpent: 2890.00,
    averageOrderValue: 578.00,
    lastOrderDate: daysAgo(8),
    createdAt: monthsAgo(6),
    city: "Nashville",
    state: "TN",
    country: "US",
    tags: ["Touring"],
    recentOrders: createRecentOrders("15", 5, 2890.00),
  },
]

export function getFilteredCustomers(
  customers: AdminCustomer[],
  filters: CustomerFilters,
): AdminCustomer[] {
  return customers.filter((customer) => {
    if (filters.search) {
      const q = filters.search.toLowerCase()
      const match =
        customer.name.toLowerCase().includes(q) ||
        customer.email.toLowerCase().includes(q) ||
        customer.phone.includes(q) ||
        customer.city.toLowerCase().includes(q)
      if (!match) return false
    }

    if (filters.status && customer.status !== filters.status) {
      return false
    }

    if (filters.minSpent) {
      const min = Number.parseFloat(filters.minSpent)
      if (!isNaN(min) && customer.totalSpent < min) return false
    }

    return true
  })
}
