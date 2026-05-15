const shippingMethods = [
  { id: "standard", name: "Standard", price: 0, estimatedDays: "5-7 business days" },
  { id: "express", name: "Express", price: 12.99, estimatedDays: "2-3 business days" },
  { id: "next-day", name: "Next Day", price: 24.99, estimatedDays: "Next business day" },
]

export async function GET() {
  return Response.json({ shippingMethods })
}
