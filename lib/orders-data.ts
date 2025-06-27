export interface OrderItem {
  productId: number
  productName: string
  productImage: string
  size: string
  color: string
  quantity: number
  price: number
}

export interface Order {
  id: string
  date: string
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled"
  items: OrderItem[]
  total: number
  shippingAddress: {
    street: string
    number: string
    complement?: string
    neighborhood: string
    city: string
    state: string
    zipCode: string
  }
  trackingCode?: string
  estimatedDelivery?: string
}

export const mockOrders: Order[] = [
  {
    id: "DK2024001",
    date: "15/12/2024",
    status: "delivered",
    items: [
      {
        productId: 1,
        productName: "Nike Dunk Low Retro White/Black",
        productImage: "/placeholder.svg?height=300&width=300",
        size: "42",
        color: "Branco/Preto",
        quantity: 1,
        price: 899.99,
      },
    ],
    total: 899.99,
    shippingAddress: {
      street: "Rua das Flores",
      number: "123",
      complement: "Apto 45",
      neighborhood: "Vila Madalena",
      city: "São Paulo",
      state: "SP",
      zipCode: "05435-000",
    },
    trackingCode: "BR123456789",
    estimatedDelivery: "18/12/2024",
  },
  {
    id: "DK2024002",
    date: "10/12/2024",
    status: "shipped",
    items: [
      {
        productId: 3,
        productName: "Nike Dunk SB Street Pink",
        productImage: "/placeholder.svg?height=300&width=300",
        size: "38",
        color: "Rosa/Branco",
        quantity: 1,
        price: 1099.99,
      },
    ],
    total: 1099.99,
    shippingAddress: {
      street: "Rua das Flores",
      number: "123",
      complement: "Apto 45",
      neighborhood: "Vila Madalena",
      city: "São Paulo",
      state: "SP",
      zipCode: "05435-000",
    },
    trackingCode: "BR987654321",
    estimatedDelivery: "20/12/2024",
  },
  {
    id: "DK2024003",
    date: "05/12/2024",
    status: "confirmed",
    items: [
      {
        productId: 2,
        productName: "Nike Dunk High Vintage Navy",
        productImage: "/placeholder.svg?height=300&width=300",
        size: "41",
        color: "Azul Marinho",
        quantity: 1,
        price: 749.99,
      },
      {
        productId: 6,
        productName: "Nike Dunk Low Coast",
        productImage: "/placeholder.svg?height=300&width=300",
        size: "39",
        color: "Azul/Branco",
        quantity: 1,
        price: 849.99,
      },
    ],
    total: 1599.98,
    shippingAddress: {
      street: "Rua das Flores",
      number: "123",
      complement: "Apto 45",
      neighborhood: "Vila Madalena",
      city: "São Paulo",
      state: "SP",
      zipCode: "05435-000",
    },
    estimatedDelivery: "22/12/2024",
  },
]

export function getOrdersByUserId(userId: string): Order[] {
  // In a real app, this would filter by actual user ID
  return mockOrders
}

export function getOrderById(orderId: string): Order | undefined {
  return mockOrders.find((order) => order.id === orderId)
}

export function getOrderStatusText(status: Order["status"]): string {
  const statusMap = {
    pending: "Aguardando Pagamento",
    confirmed: "Pagamento Confirmado",
    shipped: "Enviado",
    delivered: "Entregue",
    cancelled: "Cancelado",
  }
  return statusMap[status]
}

export function getOrderStatusColor(status: Order["status"]): string {
  const colorMap = {
    pending: "bg-yellow-600",
    confirmed: "bg-blue-600",
    shipped: "bg-orange-600",
    delivered: "bg-green-600",
    cancelled: "bg-red-600",
  }
  return colorMap[status]
}
