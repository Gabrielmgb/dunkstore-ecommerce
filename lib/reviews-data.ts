export interface Review {
  id: number
  productId: number
  userName: string
  rating: number
  comment: string
  date: string
  verified?: boolean
}

export const reviews: Review[] = [
  // Nike Dunk Low Retro White/Black (Product ID: 1)
  {
    id: 1,
    productId: 1,
    userName: "Carlos Silva",
    rating: 5,
    comment: "Tênis incrível! Qualidade excepcional e muito confortável. Recomendo!",
    date: "15/12/2024",
    verified: true,
  },
  {
    id: 2,
    productId: 1,
    userName: "Ana Santos",
    rating: 4,
    comment: "Muito bonito e bem feito. Chegou rapidinho e exatamente como nas fotos.",
    date: "10/12/2024",
    verified: true,
  },
  {
    id: 3,
    productId: 1,
    userName: "Pedro Costa",
    rating: 5,
    comment: "Melhor compra que fiz! Qualidade Nike original, super recomendo a loja.",
    date: "08/12/2024",
    verified: true,
  },
  {
    id: 4,
    productId: 1,
    userName: "Maria Oliveira",
    rating: 5,
    comment: "Perfeito! Chegou antes do prazo e a qualidade é excelente. Já é meu tênis favorito!",
    date: "05/12/2024",
    verified: true,
  },
  {
    id: 5,
    productId: 1,
    userName: "João Ferreira",
    rating: 4,
    comment: "Muito bom produto, só achei que poderia ter mais opções de cor.",
    date: "02/12/2024",
    verified: false,
  },

  // Nike Dunk High Vintage Navy (Product ID: 2)
  {
    id: 6,
    productId: 2,
    userName: "Lucas Mendes",
    rating: 5,
    comment: "Design vintage incrível! Muito confortável para uso diário.",
    date: "12/12/2024",
    verified: true,
  },
  {
    id: 7,
    productId: 2,
    userName: "Fernanda Lima",
    rating: 4,
    comment: "Lindo tênis, qualidade boa. Recomendo!",
    date: "08/12/2024",
    verified: true,
  },
  {
    id: 8,
    productId: 2,
    userName: "Roberto Silva",
    rating: 5,
    comment: "Excelente produto, superou minhas expectativas!",
    date: "04/12/2024",
    verified: true,
  },

  // Nike Dunk SB Street Pink (Product ID: 3)
  {
    id: 9,
    productId: 3,
    userName: "Camila Rodrigues",
    rating: 5,
    comment: "Apaixonada por esse tênis! A cor é linda e o conforto é perfeito.",
    date: "14/12/2024",
    verified: true,
  },
  {
    id: 10,
    productId: 3,
    userName: "Juliana Costa",
    rating: 4,
    comment: "Muito bonito, mas achei um pouco apertado. Talvez seja melhor pedir um número maior.",
    date: "09/12/2024",
    verified: true,
  },
  {
    id: 11,
    productId: 3,
    userName: "Amanda Souza",
    rating: 5,
    comment: "Perfeito para skateboard! Design exclusivo e muito resistente.",
    date: "06/12/2024",
    verified: true,
  },

  // Nike Dunk Low Championship Red (Product ID: 4)
  {
    id: 12,
    productId: 4,
    userName: "Rafael Santos",
    rating: 5,
    comment: "Cor incrível! Muito estiloso e confortável.",
    date: "13/12/2024",
    verified: true,
  },
  {
    id: 13,
    productId: 4,
    userName: "Diego Almeida",
    rating: 4,
    comment: "Bom produto, mas demorou um pouco para chegar.",
    date: "07/12/2024",
    verified: true,
  },
  {
    id: 14,
    productId: 4,
    userName: "Thiago Pereira",
    rating: 5,
    comment: "Excelente qualidade! Já comprei outros modelos na loja.",
    date: "03/12/2024",
    verified: true,
  },

  // Nike Dunk High Pro SB (Product ID: 5)
  {
    id: 15,
    productId: 5,
    userName: "Bruno Martins",
    rating: 5,
    comment: "Edição limitada incrível! Vale cada centavo.",
    date: "11/12/2024",
    verified: true,
  },
  {
    id: 16,
    productId: 5,
    userName: "Gabriel Silva",
    rating: 5,
    comment: "Perfeito para skateboard profissional. Tecnologia de ponta!",
    date: "05/12/2024",
    verified: true,
  },

  // Nike Dunk Low Coast (Product ID: 6)
  {
    id: 17,
    productId: 6,
    userName: "Isabella Rocha",
    rating: 4,
    comment: "Cores suaves e muito bonito. Confortável para o dia a dia.",
    date: "10/12/2024",
    verified: true,
  },
  {
    id: 18,
    productId: 6,
    userName: "Sophia Oliveira",
    rating: 5,
    comment: "Apaixonada! Design praiano perfeito para o verão.",
    date: "06/12/2024",
    verified: true,
  },
]

export function getReviewsByProductId(productId: number): Review[] {
  return reviews.filter((review) => review.productId === productId)
}

export function getAverageRating(productId: number): number {
  const productReviews = getReviewsByProductId(productId)
  if (productReviews.length === 0) return 0

  const sum = productReviews.reduce((acc, review) => acc + review.rating, 0)
  return Number((sum / productReviews.length).toFixed(1))
}

export function getReviewsCount(productId: number): number {
  return getReviewsByProductId(productId).length
}
