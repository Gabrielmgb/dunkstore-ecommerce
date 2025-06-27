"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, Grid, List, Share2, ShoppingCart, Trash2 } from "lucide-react"
import { useFavorites } from "@/lib/favorites-context"
import { useCart } from "@/lib/cart-context"
import ProductCard from "@/components/product/product-card"
import ProductModal from "@/components/product/product-modal"
import ShareModal from "@/components/share/share-modal"
import type { Product } from "@/lib/cart-context"

export default function FavoritesPage() {
  const { state: favoritesState, dispatch: favoritesDispatch } = useFavorites()
  const { dispatch: cartDispatch } = useCart()
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("recent")
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isProductModalOpen, setIsProductModalOpen] = useState(false)
  const [shareProduct, setShareProduct] = useState<Product | null>(null)
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)

  // Sort favorites
  const sortedFavorites = [...favoritesState.items].sort((a, b) => {
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
    // Add with default size and color - in real app, would open size/color selector
    cartDispatch({
      type: "ADD_TO_CART",
      payload: {
        product,
        size: product.sizes[0],
        color: product.colors[0],
        quantity: 1,
      },
    })
    alert("Produto adicionado ao carrinho!")
  }

  const handleRemoveFromFavorites = (productId: number) => {
    favoritesDispatch({ type: "REMOVE_FROM_FAVORITES", payload: productId })
  }

  const handleClearAllFavorites = () => {
    if (confirm("Tem certeza que deseja remover todos os produtos dos favoritos?")) {
      favoritesDispatch({ type: "CLEAR_FAVORITES" })
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-black mb-2">
              MEUS <span className="text-orange-500">FAVORITOS</span>
            </h1>
            <p className="text-gray-400">
              {favoritesState.count} {favoritesState.count === 1 ? "produto favoritado" : "produtos favoritados"}
            </p>
          </div>
          {favoritesState.count > 0 && (
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

        {favoritesState.count === 0 ? (
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
                      // Add all favorites to cart with default options
                      sortedFavorites.forEach((product) => {
                        cartDispatch({
                          type: "ADD_TO_CART",
                          payload: {
                            product,
                            size: product.sizes[0],
                            color: product.colors[0],
                            quantity: 1,
                          },
                        })
                      })
                      alert("Todos os favoritos foram adicionados ao carrinho!")
                    }}
                    variant="outline"
                    className="border-gray-700 text-gray-300 hover:border-orange-500 hover:text-orange-500 bg-transparent"
                    disabled={favoritesState.count === 0}
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
