"use client"

import React, { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, Heart, Share2, Truck, Shield, RotateCcw, Plus, Minus } from "lucide-react"

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params)

  const [selectedSize, setSelectedSize] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)

  const product = {
    id,
    name: "Nike Dunk Low Retro White/Black",
    price: 899.99,
    originalPrice: 1199.99,
    rating: 4.8,
    reviews: 127,
    badge: "PROMOÇÃO",
    images: [
      "/nike-dunk-panda.jpg?height=600&width=600",
      "/nike-dunk-panda-2.jpg?height=600&width=600",
      "/nike-dunk-panda-3.jpg?height=600&width=600",
      "/nike-dunk-panda-4.webp?height=600&width=600",
    ],
    sizes: ["38", "39", "40", "41", "42", "43"],
    description:
      "O Nike Dunk Low Retro traz de volta o ícone do basquete dos anos 80 com detalhes premium e conforto moderno. Com cabedal em couro genuíno e solado de borracha durável, este tênis combina estilo clássico com performance contemporânea.",
    features: [
      "Cabedal em couro genuíno premium",
      "Solado de borracha com tração multidirecional",
      "Espuma no colarinho para conforto extra",
      "Design icônico dos anos 80",
      "Palmilha acolchoada removível",
    ],
    inStock: true,
    stockCount: 15,
  }

  const reviews = [
    {
      id: 1,
      name: "Carlos Silva",
      rating: 5,
      comment: "Tênis incrível! Qualidade excepcional e muito confortável. Recomendo!",
      date: "15/12/2024",
    },
    {
      id: 2,
      name: "Ana Santos",
      rating: 4,
      comment: "Muito bonito e bem feito. Chegou rapidinho e exatamente como nas fotos.",
      date: "10/12/2024",
    },
    {
      id: 3,
      name: "Pedro Costa",
      rating: 5,
      comment: "Melhor compra que fiz! Qualidade Nike original, super recomendo a loja.",
      date: "08/12/2024",
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-900">
              <Image
                src={product.images[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover"
              />
              {product.badge && (
                <Badge className="absolute top-4 left-4 bg-orange-500 text-black font-bold">{product.badge}</Badge>
              )}
            </div>
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
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
              <div className="grid grid-cols-6 gap-2">
                {product.sizes.map((size) => (
                  <Button
                    key={size}
                    variant={selectedSize === size ? "default" : "outline"}
                    onClick={() => setSelectedSize(size)}
                    className={
                      selectedSize === size
                        ? "bg-orange-500 text-black font-bold"
                        : "border-gray-700 text-gray-800 hover:border-orange-500 hover:text-orange-500"
                    }
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="text-lg font-bold mb-3">QUANTIDADE</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-700 rounded-lg">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="text-gray-400 hover:text-black"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="px-4 py-2 text-lg font-bold">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(quantity + 1)}
                    className="text-gray-400 hover:text-black"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <span className="text-sm text-gray-400">{product.stockCount} unidades disponíveis</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <Button
                size="lg"
                className="w-full bg-orange-500 hover:bg-orange-600 text-black font-bold py-4 text-lg"
                disabled={!selectedSize}
              >
                ADICIONAR AO CARRINHO
              </Button>
              <div className="flex gap-4">
                <Button
                  variant="outline"
                  size="lg"
                  className="flex-1 border-gray-700 text-gray-800 hover:border-orange-500 hover:text-orange-500"
                >
                  <Heart className="h-5 w-5 mr-2" />
                  FAVORITAR
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="flex-1 border-gray-700 text-gray-800 hover:border-orange-500 hover:text-orange-500"
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
                AVALIAÇÕES ({product.reviews})
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
              <div className="space-y-4">
                {reviews.map((review) => (
                  <Card key={review.id} className="bg-gray-900 border-gray-800">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <h4 className="font-bold">{review.name}</h4>
                          <div className="flex items-center">
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
                        <span className="text-sm text-gray-400">{review.date}</span>
                      </div>
                      <p className="text-gray-300">{review.comment}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
