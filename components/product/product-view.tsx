"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, Heart, Share2, Truck, Shield, RotateCcw, Plus, Minus, ShoppingCart } from "lucide-react"
import { useCart, type Product } from "@/lib/cart-context"
import { useFavorites } from "@/lib/favorites-context"
import ShareModal from "@/components/share/share-modal"
import type { Review } from "@/lib/reviews-data"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"

interface ProductViewProps {
  product: Product
  initialReviews: Review[]
}

export default function ProductView({ product, initialReviews }: ProductViewProps) {
  const { dispatch } = useCart()
  const { toast } = useToast()
  const [selectedSize, setSelectedSize] = useState(product.sizes.length > 0 ? product.sizes[0] : "")
  const [selectedColor, setSelectedColor] = useState(product.colors.length > 0 ? product.colors[0] : "")
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  const { isFavorite, toggleFavorite } = useFavorites()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const reviewsCount = initialReviews.length
  const images = [product.image, product.image, product.image, product.image]

  const addToCart = () => {
    if (!selectedSize) {
      toast({
        title: "Atenção",
        description: "Por favor, selecione um tamanho.",
        variant: "destructive",
      })
      return
    }
    if (!selectedColor) {
      toast({
        title: "Atenção",
        description: "Por favor, selecione uma cor.",
        variant: "destructive",
      })
      return
    }

    dispatch({
      type: "ADD_TO_CART",
      payload: {
        product,
        size: selectedSize,
        color: selectedColor,
        quantity,
      },
    })

    toast({
      title: "Sucesso!",
      description: `${product.name} foi adicionado ao carrinho.`,
      className: "bg-green-600 text-white border-green-700",
    })
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Toaster />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-900">
              <Image
                src={images[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover"
              />
              {product.badge && (
                <Badge className="absolute top-4 left-4 bg-orange-500 text-black font-bold">{product.badge}</Badge>
              )}
            </div>
            <div className="grid grid-cols-4 gap-4">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === index ? "border-orange-500" : "border-gray-700"
                  }`}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} ${index + 1}`}
                    width={150}
                    height={150}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-black mb-2">{product.name}</h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating) ? "fill-orange-500 text-orange-500" : "text-gray-600"
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-gray-400">({product.reviews} avaliações)</span>
                </div>
              </div>
              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl font-bold text-orange-500">
                  R$ {product.price.toFixed(2).replace(".", ",")}
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-500 line-through">
                    R$ {product.originalPrice.toFixed(2).replace(".", ",")}
                  </span>
                )}
                {product.originalPrice && (
                  <Badge variant="secondary" className="bg-green-600 text-white">
                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                  </Badge>
                )}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="text-lg font-bold mb-3">TAMANHO</h3>
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                {product.sizes.map((size) => (
                  <Button
                    key={size}
                    variant={selectedSize === size ? "default" : "outline"}
                    onClick={() => setSelectedSize(size)}
                    className={
                      selectedSize === size
                        ? "bg-orange-500 text-black font-bold"
                        : "border-gray-700 text-gray-300 hover:border-orange-500 hover:text-orange-500"
                    }
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div>
              <h3 className="text-lg font-bold mb-3">COR</h3>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <Button
                    key={color}
                    variant={selectedColor === color ? "default" : "outline"}
                    onClick={() => setSelectedColor(color)}
                    className={
                      selectedColor === color
                        ? "bg-orange-500 text-black font-bold"
                        : "border-gray-700 text-gray-300 hover:border-orange-500 hover:text-orange-500"
                    }
                  >
                    {color}
                  </Button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="pt-2">
              <h3 className="text-lg font-bold mb-3">QUANTIDADE</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-700 rounded-lg">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="text-gray-400 hover:text-white"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="px-4 py-2 text-lg font-bold">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(quantity + 1)}
                    className="text-gray-400 hover:text-white"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <span className="text-sm text-gray-400">{product.stockCount} unidades disponíveis</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4 pt-4">
              <Button
                onClick={addToCart}
                size="lg"
                className="w-full bg-orange-500 hover:bg-orange-600 text-black font-bold py-4 text-lg"
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                ADICIONAR AO CARRINHO
              </Button>
              <div className="flex gap-4">
                <Button
                  onClick={() => isMounted && toggleFavorite(product)}
                  variant="outline"
                  size="lg"
                  className={`flex-1 border-gray-700 hover:bg-gray-800 bg-transparent ${
                    isMounted && isFavorite(product.id)
                      ? "text-orange-500 border-orange-500"
                      : "text-gray-300 hover:border-orange-500 hover:text-orange-500"
                  }`}
                >
                  <Heart className={`h-5 w-5 mr-2 ${isMounted && isFavorite(product.id) ? "fill-current" : ""}`} />
                  {isMounted && isFavorite(product.id) ? "FAVORITADO" : "FAVORITAR"}
                </Button>
                <Button
                  onClick={() => setIsShareModalOpen(true)}
                  variant="outline"
                  size="lg"
                  className="flex-1 border-gray-700 text-gray-300 hover:border-orange-500 hover:text-orange-500 bg-transparent"
                >
                  <Share2 className="h-5 w-5 mr-2" />
                  COMPARTILHAR
                </Button>
              </div>
            </div>

            {/* Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-gray-800">
              <div className="flex items-center gap-3">
                <Truck className="h-6 w-6 text-orange-500" />
                <div>
                  <p className="font-bold text-sm">FRETE GRÁTIS</p>
                  <p className="text-xs text-gray-400">Acima de R$ 299</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="h-6 w-6 text-orange-500" />
                <div>
                  <p className="font-bold text-sm">ORIGINAL</p>
                  <p className="text-xs text-gray-400">100% autêntico</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <RotateCcw className="h-6 w-6 text-orange-500" />
                <div>
                  <p className="font-bold text-sm">TROCA GRÁTIS</p>
                  <p className="text-xs text-gray-400">Até 30 dias</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-gray-900">
              <TabsTrigger
                value="description"
                className="data-[state=active]:bg-orange-500 data-[state=active]:text-black"
              >
                DESCRIÇÃO
              </TabsTrigger>
              <TabsTrigger
                value="features"
                className="data-[state=active]:bg-orange-500 data-[state=active]:text-black"
              >
                CARACTERÍSTICAS
              </TabsTrigger>
              <TabsTrigger value="reviews" className="data-[state=active]:bg-orange-500 data-[state=active]:text-black">
                AVALIAÇÕES ({reviewsCount})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="mt-6">
              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="p-6">
                  <p className="text-gray-300 leading-relaxed">{product.description}</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="features" className="mt-6">
              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="p-6">
                  <ul className="space-y-3">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-gray-300">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mr-3" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <div className="space-y-6">
                <div className="space-y-4">
                  {initialReviews.length === 0 ? (
                    <div className="text-center py-12 bg-gray-900 border border-gray-800 rounded-lg">
                      <Star className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                      <p className="text-gray-400 mb-2">Ainda não há avaliações para este produto</p>
                      <p className="text-sm text-gray-500">Seja o primeiro a avaliar!</p>
                    </div>
                  ) : (
                    initialReviews.map((review) => (
                      <Card key={review.id} className="bg-gray-900 border-gray-800">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-black font-bold">
                                {review.userName.charAt(0).toUpperCase()}
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <h4 className="font-bold">{review.userName}</h4>
                                </div>
                                <div className="flex items-center mt-1">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`h-4 w-4 ${
                                        i < review.rating ? "fill-orange-500 text-orange-500" : "text-gray-600"
                                      }`}
                                    />
                                  ))}
                                </div>
                              </div>
                            </div>
                            <span className="text-sm text-gray-400">{review.date}</span>
                          </div>
                          <p className="text-gray-300 leading-relaxed">{review.comment}</p>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <ShareModal product={product} isOpen={isShareModalOpen} onClose={() => setIsShareModalOpen(false)} />
    </div>
  )
}
