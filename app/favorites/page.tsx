"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, Grid, List, Share2, ShoppingCart, Trash2 } from "lucide-react"
import ProductCard from "@/components/product/product-card"
import ProductModal from "@/components/product/product-modal"
import ShareModal from "@/components/share/share-modal"
import type { Product } from "@/lib/cart-context"

// Static favorites data
const staticFavorites = [
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
    brand: "Nike",
    category: "Dunk Low",
    description:
      "O Nike Dunk Low Retro traz de volta o ícone do basquete dos anos 80 com detalhes premium e conforto moderno.",
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
    brand: "Nike",
    category: "Dunk High",
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
    brand: "Nike",
    category: "Dunk SB",
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
]

export default function FavoritesPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("recent")
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isProductModalOpen, setIsProductModalOpen] = useState(false)
  const [shareProduct, setShareProduct] = useState<Product | null>(null)
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)
  const [favorites, setFavorites] = useState(staticFavorites)
  const [isMounted, setIsMounted] = useState(false)

  // Handle hydration
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Sort favorites
  const sortedFavorites = [...favorites].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "name":
        return a.name.localeCompare(b.name)
      case "recent":
      default:
        return b.id - a.id // Assuming higher ID means more recent
    }
  })

  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product)
    setIsProductModalOpen(true)
  }

  const handleShareProduct = (product: Product) => {
    setShareProduct(product)
    setIsShareModalOpen(true)
  }

  const handleAddToCart = (product: Product) => {
    console.log("Added to cart:", product.name)
    alert("Produto adicionado ao carrinho!")
  }

  const handleRemoveFromFavorites = (productId: number) => {
    setFavorites(favorites.filter((fav) => fav.id !== productId))
  }

  const handleClearAllFavorites = () => {
    if (confirm("Tem certeza que deseja remover todos os produtos dos favoritos?")) {
      setFavorites([])
    }
  }

  // Prevent hydration mismatch
  if (!isMounted) {
    return (
      <div className="min-h-screen bg-black text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="h-12 bg-gray-800 rounded w-80 mb-2 animate-pulse"></div>
              <div className="h-4 bg-gray-800 rounded w-48 animate-pulse"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-gray-900 border border-gray-800 rounded-lg p-6 animate-pulse">
                <div className="h-48 bg-gray-800 rounded mb-4"></div>
                <div className="h-4 bg-gray-800 rounded w-3/4 mb-2"></div>
                <div className="h-6 bg-gray-800 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white" suppressHydrationWarning>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-black mb-2">
              MEUS <span className="text-orange-500">FAVORITOS</span>
            </h1>
            <p className="text-gray-400">
              {favorites.length} {favorites.length === 1 ? "produto favoritado" : "produtos favoritados"}
            </p>
          </div>
          {favorites.length > 0 && (
            <Button
              onClick={handleClearAllFavorites}
              variant="outline"
              className="border-gray-700 text-gray-300 hover:border-red-500 hover:text-red-500 bg-transparent"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              LIMPAR TUDO
            </Button>
          )}
        </div>

        {favorites.length === 0 ? (
          /* Empty State */
          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="text-center py-16">
              <Heart className="h-24 w-24 text-gray-600 mx-auto mb-6" />
              <h2 className="text-2xl font-bold mb-4">Nenhum produto favoritado</h2>
              <p className="text-gray-400 mb-8 max-w-md mx-auto">
                Explore nossa coleção e adicione produtos aos favoritos para vê-los aqui!
              </p>
              <Button
                onClick={() => (window.location.href = "/shop")}
                className="bg-orange-500 hover:bg-orange-600 text-black font-bold px-8 py-3"
              >
                EXPLORAR PRODUTOS
              </Button>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Controls */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
              <div className="flex items-center gap-4">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48 bg-gray-900 border-gray-700">
                    <SelectValue placeholder="Ordenar por" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recent">Mais recentes</SelectItem>
                    <SelectItem value="name">Nome A-Z</SelectItem>
                    <SelectItem value="price-low">Menor preço</SelectItem>
                    <SelectItem value="price-high">Maior preço</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex border border-gray-700 rounded-lg overflow-hidden">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className={viewMode === "grid" ? "bg-orange-500 text-black" : "text-gray-400"}
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className={viewMode === "list" ? "bg-orange-500 text-black" : "text-gray-400"}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Products */}
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {sortedFavorites.map((product) => (
                  <ProductCard key={product.id} product={product} onViewDetails={handleViewProduct} />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {sortedFavorites.map((product) => (
                  <Card key={product.id} className="bg-gray-900 border-gray-800">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-6">
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="w-24 h-24 object-cover rounded-lg bg-gray-800"
                        />
                        <div className="flex-1">
                          <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                          <p className="text-gray-400 mb-2">Tamanhos: {product.sizes.join(", ")}</p>
                          <div className="flex items-center gap-4">
                            <span className="text-2xl font-bold text-orange-500">
                              R$ {product.price.toFixed(2).replace(".", ",")}
                            </span>
                            {product.originalPrice && (
                              <span className="text-lg text-gray-500 line-through">
                                R$ {product.originalPrice.toFixed(2).replace(".", ",")}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <Button
                            onClick={() => handleViewProduct(product)}
                            className="bg-orange-500 hover:bg-orange-600 text-black font-bold"
                          >
                            VER DETALHES
                          </Button>
                          <div className="flex gap-2">
                            <Button
                              onClick={() => handleAddToCart(product)}
                              variant="outline"
                              size="sm"
                              className="border-gray-700 text-gray-300 hover:border-orange-500 hover:text-orange-500 bg-transparent"
                            >
                              <ShoppingCart className="h-4 w-4" />
                            </Button>
                            <Button
                              onClick={() => handleShareProduct(product)}
                              variant="outline"
                              size="sm"
                              className="border-gray-700 text-gray-300 hover:border-orange-500 hover:text-orange-500 bg-transparent"
                            >
                              <Share2 className="h-4 w-4" />
                            </Button>
                            <Button
                              onClick={() => handleRemoveFromFavorites(product.id)}
                              variant="outline"
                              size="sm"
                              className="border-gray-700 text-gray-300 hover:border-red-500 hover:text-red-500 bg-transparent"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Quick Actions */}
            <div className="mt-12 text-center">
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle>AÇÕES RÁPIDAS</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    onClick={() => (window.location.href = "/shop")}
                    className="bg-orange-500 hover:bg-orange-600 text-black font-bold"
                  >
                    CONTINUAR COMPRANDO
                  </Button>
                  <Button
                    onClick={() => {
                      sortedFavorites.forEach((product) => {
                        console.log("Added to cart:", product.name)
                      })
                      alert("Todos os favoritos foram adicionados ao carrinho!")
                    }}
                    variant="outline"
                    className="border-gray-700 text-gray-300 hover:border-orange-500 hover:text-orange-500 bg-transparent"
                    disabled={favorites.length === 0}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    ADICIONAR TODOS AO CARRINHO
                  </Button>
                </CardContent>
              </Card>
            </div>
          </>
        )}
      </div>

      {/* Modals */}
      <ProductModal
        product={selectedProduct}
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
      />
      <ShareModal product={shareProduct} isOpen={isShareModalOpen} onClose={() => setIsShareModalOpen(false)} />
    </div>
  )
}
