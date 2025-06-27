"use client"

import { useState } from "react"
import { useSearch } from "@/lib/search-context"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, X } from "lucide-react"
import ProductCard from "@/components/product/product-card"
import ProductModal from "@/components/product/product-modal"
import type { Product } from "@/lib/cart-context"

interface SearchResultsProps {
  isOpen: boolean
  onClose: () => void
}

export default function SearchResults({ isOpen, onClose }: SearchResultsProps) {
  const { searchQuery, setSearchQuery, searchResults, clearSearch } = useSearch()
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isProductModalOpen, setIsProductModalOpen] = useState(false)

  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product)
    setIsProductModalOpen(true)
  }

  const handleClose = () => {
    clearSearch()
    onClose()
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="bg-black border-gray-800 text-white max-w-4xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>Buscar Produtos</span>
              <Button variant="ghost" size="sm" onClick={handleClose}>
                <X className="h-4 w-4" />
              </Button>
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Digite o nome do produto, cor ou categoria..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-gray-900 border-gray-700 text-white placeholder-gray-400 focus:border-orange-500"
                autoFocus
              />
            </div>

            {/* Search Results */}
            <div className="max-h-96 overflow-y-auto">
              {searchQuery.trim() === "" ? (
                <div className="text-center py-8">
                  <Search className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400">Digite algo para buscar produtos</p>
                </div>
              ) : searchResults.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-400 mb-2">Nenhum produto encontrado</p>
                  <p className="text-sm text-gray-500">Tente buscar por outro termo</p>
                </div>
              ) : (
                <div>
                  <p className="text-gray-400 mb-4">{searchResults.length} produtos encontrados</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {searchResults.map((product) => (
                      <div key={product.id} className="scale-90">
                        <ProductCard product={product} onViewDetails={handleViewProduct} />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
      />
    </>
  )
}
