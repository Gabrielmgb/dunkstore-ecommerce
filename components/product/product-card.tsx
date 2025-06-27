"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Product } from "@/lib/cart-context"
import { Star, Eye, Heart } from "lucide-react"

interface ProductCardProps {
  product: Product
  onViewDetails: (product: Product) => void
}

export default function ProductCard({ product, onViewDetails }: ProductCardProps) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  // Handle hydration
  useEffect(() => {
    setIsMounted(true)
    // Check if product is in favorites (static check)
    const staticFavoriteIds = [1, 2, 3] // Static favorite IDs
    setIsFavorite(staticFavoriteIds.includes(product.id))
  }, [product.id])

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite)
    console.log(`${isFavorite ? "Removed from" : "Added to"} favorites:`, product.name)
  }

  // Prevent hydration mismatch
  if (!isMounted) {
    return (
      <Card className="bg-gray-900 border-gray-800 overflow-hidden group hover:border-orange-500 transition-all duration-300">
        <div className="relative">
          <div className="w-full h-64 bg-gray-800 animate-pulse" />
          {product.badge && (
            <Badge className="absolute top-4 left-4 bg-orange-500 text-black font-bold">{product.badge}</Badge>
          )}
        </div>
        <CardContent className="p-6">
          <div className="h-4 bg-gray-800 rounded w-16 mb-2 animate-pulse"></div>
          <div className="h-6 bg-gray-800 rounded w-full mb-2 animate-pulse"></div>
          <div className="h-4 bg-gray-800 rounded w-32 mb-3 animate-pulse"></div>
          <div className="h-8 bg-gray-800 rounded w-24 mb-4 animate-pulse"></div>
          <div className="h-10 bg-gray-800 rounded w-full animate-pulse"></div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card
      className="bg-gray-900 border-gray-800 overflow-hidden group hover:border-orange-500 transition-all duration-300"
      suppressHydrationWarning
    >
      <div className="relative">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          width={300}
          height={300}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.badge && (
          <Badge className="absolute top-4 left-4 bg-orange-500 text-black font-bold">{product.badge}</Badge>
        )}

        {/* Overlay with View Details button */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Button
            onClick={() => onViewDetails(product)}
            className="bg-orange-500 hover:bg-orange-600 text-black font-bold"
          >
            <Eye className="h-4 w-4 mr-2" />
            VER DETALHES
          </Button>
        </div>

        {/* Favorite Button */}
        <Button
          onClick={(e) => {
            e.stopPropagation()
            toggleFavorite()
          }}
          variant="ghost"
          size="sm"
          className={`absolute top-4 right-4 p-2 rounded-full transition-colors ${
            isFavorite ? "bg-orange-500 text-black hover:bg-orange-600" : "bg-black/60 text-white hover:bg-black/80"
          }`}
        >
          <Heart className={`h-4 w-4 ${isFavorite ? "fill-current" : ""}`} />
        </Button>
      </div>

      <CardContent className="p-6">
        <div className="flex items-center mb-2">
          <div className="flex items-center">
            <Star className="h-4 w-4 fill-orange-500 text-orange-500" />
            <span className="ml-1 text-sm text-gray-400">
              {product.rating} ({product.reviews || 0})
            </span>
          </div>
          <span className="ml-auto text-xs text-gray-500">{product.gender}</span>
        </div>

        <h3 className="text-lg font-bold mb-2 text-white">{product.name}</h3>
        <p className="text-sm text-gray-400 mb-3">Tamanhos: {product.sizes.join(", ")}</p>

        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-xl font-bold text-orange-500">R$ {product.price.toFixed(2).replace(".", ",")}</span>
            {product.originalPrice && (
              <span className="ml-2 text-sm text-gray-500 line-through">
                R$ {product.originalPrice.toFixed(2).replace(".", ",")}
              </span>
            )}
          </div>
        </div>

        <Button
          onClick={() => onViewDetails(product)}
          className="w-full bg-orange-500 hover:bg-orange-600 text-black font-bold"
        >
          VER PRODUTO
        </Button>
      </CardContent>
    </Card>
  )
}
