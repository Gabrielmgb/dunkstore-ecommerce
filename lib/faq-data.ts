export interface FAQItem {
  id: number
  question: string
  answer: string
  category: string
}

export const faqData: FAQItem[] = [
  // Pedidos e Entrega
  {
    id: 1,
    question: "Como rastrear meu pedido?",
    answer:
      "Após a confirmação do pagamento, você receberá um código de rastreamento por email. Você também pode acompanhar o status do seu pedido na seção 'Meus Pedidos' da sua conta.",
    category: "Pedidos e Entrega",
  },
  {
    id: 2,
    question: "Qual o prazo de entrega?",
    answer:
      "O prazo de entrega varia conforme sua localização: Região Sudeste: 2-4 dias úteis, Região Sul: 3-5 dias úteis, Região Nordeste: 4-7 dias úteis, Região Norte e Centro-Oeste: 5-10 dias úteis. Oferecemos frete grátis para compras acima de R$ 299.",
    category: "Pedidos e Entrega",
  },
  {
    id: 3,
    question: "Vocês entregam em todo o Brasil?",
    answer:
      "Sim! Entregamos em todo território nacional através dos Correios e transportadoras parceiras. O frete é calculado automaticamente no checkout baseado no seu CEP.",
    category: "Pedidos e Entrega",
  },

  // Produtos e Autenticidade
  {
    id: 4,
    question: "Como garantir a autenticidade dos produtos?",
    answer:
      "Todos os nossos Nike Dunk são 100% originais e adquiridos diretamente da Nike ou distribuidores autorizados. Cada produto vem com nota fiscal e certificado de autenticidade. Oferecemos garantia total contra produtos falsificados.",
    category: "Produtos e Autenticidade",
  },
  {
    id: 5,
    question: "Os produtos têm garantia?",
    answer:
      "Sim! Todos os produtos têm garantia de 90 dias contra defeitos de fabricação, conforme o Código de Defesa do Consumidor. A garantia Nike original também se aplica.",
    category: "Produtos e Autenticidade",
  },
  {
    id: 6,
    question: "Como escolher o tamanho correto?",
    answer:
      "Recomendamos consultar nossa tabela de tamanhos disponível em cada produto. Os Nike Dunk geralmente seguem a numeração padrão Nike. Em caso de dúvida, entre em contato conosco pelo WhatsApp para orientação personalizada.",
    category: "Produtos e Autenticidade",
  },

  // Trocas e Devoluções
  {
    id: 7,
    question: "Política de trocas e devoluções",
    answer:
      "Você tem até 30 dias para solicitar troca ou devolução. O produto deve estar em perfeito estado, com etiquetas e embalagem original. A primeira troca é gratuita. Para devoluções, o estorno é feito em até 5 dias úteis.",
    category: "Trocas e Devoluções",
  },
  {
    id: 8,
    question: "Como solicitar uma troca?",
    answer:
      "Acesse 'Meus Pedidos' na sua conta, selecione o item e clique em 'Solicitar Troca'. Você também pode entrar em contato pelo WhatsApp (11) 99999-9999 ou email gabrielmgb.nd@gmail.com.",
    category: "Trocas e Devoluções",
  },
  {
    id: 9,
    question: "Posso trocar por outro modelo?",
    answer:
      "Sim! Você pode trocar por qualquer produto de valor igual ou superior (pagando a diferença). Para produtos de valor menor, o crédito fica disponível para futuras compras.",
    category: "Trocas e Devoluções",
  },

  // Pagamento
  {
    id: 10,
    question: "Formas de pagamento aceitas",
    answer:
      "Aceitamos: Cartão de crédito (Visa, Mastercard, Elo, American Express) em até 12x sem juros, Cartão de débito, PIX (5% de desconto), Boleto bancário. Todos os pagamentos são processados com segurança.",
    category: "Pagamento",
  },
  {
    id: 11,
    question: "O pagamento é seguro?",
    answer:
      "Sim! Utilizamos criptografia SSL e processamos pagamentos através de gateways seguros. Seus dados financeiros são protegidos e nunca armazenados em nossos servidores.",
    category: "Pagamento",
  },
  {
    id: 12,
    question: "Posso parcelar minha compra?",
    answer:
      "Sim! Oferecemos parcelamento em até 12x sem juros no cartão de crédito para compras acima de R$ 200. Para valores menores, o parcelamento pode ter juros conforme a operadora do cartão.",
    category: "Pagamento",
  },

  // Conta e Cadastro
  {
    id: 13,
    question: "Como criar uma conta?",
    answer:
      "Clique em 'Entrar' no topo da página e depois em 'Cadastrar'. Preencha seus dados básicos e pronto! Ter uma conta facilita suas compras e permite acompanhar pedidos e favoritos.",
    category: "Conta e Cadastro",
  },
  {
    id: 14,
    question: "Esqueci minha senha, como recuperar?",
    answer:
      "Na página de login, clique em 'Esqueci minha senha'. Digite seu email e enviaremos instruções para criar uma nova senha. Se não receber o email, verifique a caixa de spam.",
    category: "Conta e Cadastro",
  },
  {
    id: 15,
    question: "Posso alterar meus dados cadastrais?",
    answer:
      "Sim! Acesse 'Minha Conta' e edite suas informações pessoais, endereço de entrega e preferências. Mantenha seus dados sempre atualizados para uma melhor experiência.",
    category: "Conta e Cadastro",
  },
]

export function getFAQByCategory(category: string): FAQItem[] {
  return faqData.filter((item) => item.category === category)
}

export function getAllCategories(): string[] {
  return [...new Set(faqData.map((item) => item.category))]
}

export function searchFAQ(query: string): FAQItem[] {
  const searchTerm = query.toLowerCase()
  return faqData.filter(
    (item) => item.question.toLowerCase().includes(searchTerm) || item.answer.toLowerCase().includes(searchTerm),
  )
}
