import type { Product } from "./cart-context"

export const products: Product[] = [
  {
    id: 1,
    name: "Nike Dunk Low Retro White/Black",
    price: 899.99,
    originalPrice: 1199.99,
    image: "/placeholder.svg?height=300&width=300",
    badge: "PROMOÇÃO",
    rating: 4.8,
    reviews: 127,
    sizes: ["38", "39", "40", "41", "42", "43"],
    colors: ["Branco/Preto", "Preto/Branco"],
    gender: "Unissex",
    description:
      "O Nike Dunk Low Retro traz de volta o ícone do basquete dos anos 80 com detalhes premium e conforto moderno. Com cabedal em couro genuíno e solado de borracha durável, este tênis combina estilo clássico com performance contemporânea.",
    features: [
      "Cabedal em couro genuíno premium",
      "Solado de borracha com tração multidirecional",
      "Espuma no colarinho para conforto extra",
      "Design icônico dos anos 80",
      "Palmilha acolchoada removível",
    ],
    stockCount: 15,
  },
  {
    id: 2,
    name: "Nike Dunk High Vintage Navy",
    price: 749.99,
    originalPrice: 999.99,
    image: "/placeholder.svg?height=300&width=300",
    badge: "LANÇAMENTO",
    rating: 4.9,
    reviews: 89,
    sizes: ["38", "39", "40", "41", "42"],
    colors: ["Azul Marinho", "Azul/Branco"],
    gender: "Masculino",
    description:
      "Nike Dunk High com design vintage e cores clássicas. Perfeito para quem busca estilo retrô com qualidade moderna.",
    features: [
      "Design vintage autêntico",
      "Cores clássicas atemporais",
      "Construção durável",
      "Conforto para uso diário",
      "Estilo icônico dos anos 80",
    ],
    stockCount: 8,
  },
  {
    id: 3,
    name: "Nike Dunk SB Street Pink",
    price: 1099.99,
    image: "/placeholder.svg?height=300&width=300",
    badge: "EXCLUSIVO",
    rating: 4.7,
    reviews: 67,
    sizes: ["35", "36", "37", "38", "39"],
    colors: ["Rosa/Branco", "Rosa Claro"],
    gender: "Feminino",
    description:
      "Nike Dunk SB com design exclusivo em rosa. Desenvolvido especialmente para skateboard com tecnologia avançada.",
    features: [
      "Tecnologia SB para skateboard",
      "Design exclusivo feminino",
      "Cores vibrantes",
      "Durabilidade superior",
      "Grip especializado",
    ],
    stockCount: 12,
  },
  {
    id: 4,
    name: "Nike Dunk Low Championship Red",
    price: 999.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.6,
    reviews: 156,
    sizes: ["39", "40", "41", "42", "43", "44"],
    colors: ["Vermelho/Branco", "Vermelho Escuro"],
    gender: "Masculino",
    description: "Nike Dunk Low em vermelho championship. Uma homenagem aos grandes momentos do basquete.",
    features: [
      "Cores championship clássicas",
      "Design inspirado no basquete",
      "Qualidade premium",
      "Conforto excepcional",
      "Estilo atemporal",
    ],
    stockCount: 20,
  },
  {
    id: 5,
    name: "Nike Dunk High Pro SB",
    price: 1299.99,
    image: "/placeholder.svg?height=300&width=300",
    badge: "LIMITADO",
    rating: 4.9,
    reviews: 203,
    sizes: ["38", "39", "40", "41", "42"],
    colors: ["Preto/Dourado", "Preto/Prata"],
    gender: "Unissex",
    description: "Nike Dunk High Pro SB edição limitada. O máximo em tecnologia e estilo para skateboard profissional.",
    features: [
      "Edição limitada",
      "Tecnologia Pro SB",
      "Detalhes premium",
      "Performance profissional",
      "Design exclusivo",
    ],
    stockCount: 5,
  },
  {
    id: 6,
    name: "Nike Dunk Low Coast",
    price: 849.99,
    originalPrice: 1099.99,
    image: "/placeholder.svg?height=300&width=300",
    badge: "OFERTA",
    rating: 4.5,
    reviews: 98,
    sizes: ["35", "36", "37", "38", "39", "40"],
    colors: ["Azul/Branco", "Azul Claro"],
    gender: "Feminino",
    description: "Nike Dunk Low Coast com inspiração praiana. Cores suaves e design relaxado para o dia a dia.",
    features: [
      "Inspiração praiana",
      "Cores suaves e relaxantes",
      "Design feminino",
      "Conforto para uso diário",
      "Estilo casual",
    ],
    stockCount: 18,
  },
]

export function getProductById(id: number): Product | undefined {
  return products.find((product) => product.id === id)
}

export function getProductsByGender(gender: string): Product[] {
  if (gender === "all") return products
  return products.filter((product) => product.gender.toLowerCase() === gender.toLowerCase())
}

export function getProductsByPriceRange(min: number, max: number): Product[] {
  return products.filter((product) => product.price >= min && product.price <= max)
}
