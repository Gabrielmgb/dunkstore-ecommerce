"use client"
import { notFound } from "next/navigation"
import { getProductById } from "@/lib/products-data"
import { getReviewsByProductId } from "@/lib/reviews-data"
import ProductView from "@/components/product/product-view"

// This is now a Client Component
export default function ProductClientPage({ productId }: { productId: number }) {
  const product = getProductById(productId)

  // If product doesn't exist, show 404 page
  if (!product) {
    notFound()
  }

  // Fetch reviews on the server
  const initialReviews = getReviewsByProductId(product.id)

  // Pass static data to the client component for interactivity
  return <ProductView product={product} initialReviews={initialReviews} />
}
