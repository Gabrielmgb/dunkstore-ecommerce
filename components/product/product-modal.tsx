"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useCart, type Product } from "@/lib/cart-context"
import { Star, Heart, Share2, Plus, Minus, ShoppingCart } from "lucide-react"
import { useFavorites } from "@/lib/favorites-context"
import ShareModal from "@/components/share/share-modal"

interface ProductModalProps {
  product: Product | null
  isOpen: boolean
  onClose: () => void
}

export default function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  const { dispatch } = useCart()
  const [selectedSize, setSelectedSize] = useState<string>("")
  const [selectedColor, setSelectedColor] = useState<string>("")
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)

  const { isFavorite, toggleFavorite } = useFavorites()

  if (!product) return null

  const images = [product.image, product.image, product.image, product.image]

  const addToCart = () => {
    if (!selectedSize || !selectedColor) {
      alert("Por favor, selecione o tamanho e a cor")
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

    // Reset form
    setSelectedSize("")
    setSelectedColor("")
    setQuantity(1)
    onClose()
  }

  const resetForm = () => {
    setSelectedSize("")
    setSelectedColor("")
    setQuantity(1)
    setSelectedImage(0)
  }

  const handleClose = () => {
    resetForm()
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-black border-gray-800 text-white max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{product.name}</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-gray-900 rounded-lg overflow-hidden">
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

            <div className="grid grid-cols-4 gap-2">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square bg-gray-900 rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === index ? "border-orange-500" : "border-gray-700"
                  }`}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} ${index + 1}`}
                    width={100}
                    height={100}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Rating and Reviews */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(product.rating) ? "fill-orange-500 text-orange-500" : "text-gray-400"
                    }`}
                  />
                ))}
                <span className="ml-2 text-sm text-gray-400">
                  {product.rating} ({product.reviews || 0} avaliações)
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-4">
              <span className="text-2xl font-bold text-orange-500">
                R$ {product.price.toFixed(2).replace(".", ",")}
              </span>
              {product.originalPrice && (
                <span className="text-lg text-gray-500 line-through">
                  R$ {product.originalPrice.toFixed(2).replace(".", ",")}
                </span>
              )}
            </div>

            {/* Size Selection */}
            <div>
              <h4 className="text-lg font-semibold mb-3">Tamanho *</h4>
              <div className="grid grid-cols-4 gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-2 px-3 border rounded-lg font-semibold transition-colors ${
                      selectedSize === size
                        ? "border-orange-500 bg-orange-500 text-black"
                        : "border-gray-700 text-white hover:border-gray-600"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div>
              <h4 className="text-lg font-semibold mb-3">Cor *</h4>
              <div className="space-y-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-full py-2 px-4 border rounded-lg font-semibold transition-colors text-left ${
                      selectedColor === color
                        ? "border-orange-500 bg-orange-500 text-black"
                        : "border-gray-700 text-white hover:border-gray-600"
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h4 className="text-lg font-semibold mb-3">Quantidade</h4>
              <div className="flex items-center space-x-4">
                <div className="flex items-center border border-gray-700 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-gray-800 transition-colors"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="px-4 py-2 font-semibold">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="p-2 hover:bg-gray-800 transition-colors">
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <span className="text-sm text-gray-400">{product.stockCount} unidades disponíveis</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <Button
                onClick={addToCart}
                className="w-full bg-orange-500 hover:bg-orange-600 text-black font-bold py-3"
                disabled={!selectedSize || !selectedColor}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                ADICIONAR AO CARRINHO
              </Button>

              <div className="flex space-x-4">
                <Button
                  onClick={() => toggleFavorite(product)}
                  variant="outline"
                  className={`flex-1 border-gray-700 hover:bg-gray-800 bg-transparent ${
                    isFavorite(product.id)
                      ? "text-orange-500 border-orange-500"
                      : "text-white hover:border-orange-500 hover:text-orange-500"
                  }`}
                >
                  <Heart className={`h-4 w-4 mr-2 ${isFavorite(product.id) ? "fill-current" : ""}`} />
                  {isFavorite(product.id) ? "FAVORITADO" : "FAVORITAR"}
                </Button>

                <Button
                  onClick={() => setIsShareModalOpen(true)}
                  variant="outline"
                  className="flex-1 border-gray-700 text-white hover:bg-gray-800 bg-transparent hover:border-orange-500 hover:text-orange-500"
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  COMPARTILHAR
                </Button>
              </div>
            </div>

            {/* Product Details Tabs */}
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-gray-900">
                <TabsTrigger value="description">Descrição</TabsTrigger>
                <TabsTrigger value="features">Características</TabsTrigger>
              </TabsList>

              <TabsContent value="description" className="mt-4">
                <div className="bg-gray-900 rounded-lg p-4">
                  <p className="text-gray-300 leading-relaxed">{product.description}</p>
                </div>
              </TabsContent>

              <TabsContent value="features" className="mt-4">
                <div className="bg-gray-900 rounded-lg p-4">
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-gray-300">
                        <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        {/* Share Modal */}
        <ShareModal product={product} isOpen={isShareModalOpen} onClose={() => setIsShareModalOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}
