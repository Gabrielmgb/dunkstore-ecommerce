import { notFound } from "next/navigation"
import { getProductById, products } from "@/lib/products-data"
import ProductClientPage from "./ProductClientPage"
import type { Metadata } from "next"

// Generate metadata for each product page for better SEO
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const productId = Number.parseInt(params.id)
  const product = getProductById(productId)

  if (!product) {
    return {
      title: "Produto não encontrado",
      description: "O produto que você está procurando não existe.",
    }
  }

  return {
    title: `${product.name} | Dunkstore`,
    description: product.description,
    openGraph: {
      title: `${product.name} | Dunkstore`,
      description: product.description,
      images: [
        {
          url: product.image,
          width: 300,
          height: 300,
          alt: product.name,
        },
      ],
    },
  }
}

// Generate static paths for all products at build time
export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.id.toString(),
  }))
}

// This is now a Server Component
export default function ProductPage({ params }: { params: { id: string } }) {
  const productId = Number.parseInt(params.id)

  // If product doesn't exist, show 404 page
  const product = getProductById(productId)
  if (!product) {
    notFound()
  }

  return <ProductClientPage productId={productId} />
}
