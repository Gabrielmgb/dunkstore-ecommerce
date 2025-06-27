import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { CartProvider } from "@/lib/cart-context"
import { SearchProvider } from "@/lib/search-context"
import { FavoritesProvider } from "@/lib/favorites-context"
import { AuthProvider } from "@/lib/auth-context"
import { Suspense } from "react"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Dunkstore - Seu Nike Dunk está aqui | Tênis Nike Dunk Original",
  description:
    "Dunkstore é a loja especializada em tênis Nike Dunk. Encontre os melhores modelos masculinos, femininos e unissex com autenticidade garantida e entrega rápida.",
  keywords: "Nike Dunk, tênis Nike, sneakers, streetwear, Nike Dunk Low, Nike Dunk High, tênis original",
  authors: [{ name: "Dunkstore" }],
  creator: "Dunkstore",
  publisher: "Dunkstore",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://dunkstore.com.br",
    siteName: "Dunkstore",
    title: "Dunkstore - Seu Nike Dunk está aqui",
    description: "A melhor seleção de tênis Nike Dunk com autenticidade garantida",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Dunkstore - Nike Dunk Collection",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dunkstore - Seu Nike Dunk está aqui",
    description: "A melhor seleção de tênis Nike Dunk com autenticidade garantida",
    images: ["/og-image.jpg"],
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body className={`${inter.className} antialiased`}>
        <AuthProvider>
          <SearchProvider>
            <FavoritesProvider>
              <CartProvider>
                <Suspense fallback={<div>Loading...</div>}>
                  <Header />
                  <main>{children}</main>
                  <Footer />
                </Suspense>
              </CartProvider>
            </FavoritesProvider>
          </SearchProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
