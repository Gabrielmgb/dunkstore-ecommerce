"use client"

import { useState, useEffect } from "react"
import { useSearch } from "@/lib/search-context"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, X, Filter, SortAsc } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
  const [sortBy, setSortBy] = useState("relevance")
  const [filterGender, setFilterGender] = useState("all")
  const [isMounted, setIsMounted] = useState(false)

  // Handle hydration
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Sort and filter results
  const filteredAndSortedResults = searchResults
    .filter((product) => {
      if (filterGender === "all") return true
      return product.gender.toLowerCase() === filterGender.toLowerCase()
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "name":
          return a.name.localeCompare(b.name)
        case "rating":
          return b.rating - a.rating
        case "relevance":
        default:
          // Sort by relevance (how well the search term matches)
          const aRelevance = calculateRelevance(a, searchQuery)
          const bRelevance = calculateRelevance(b, searchQuery)
          return bRelevance - aRelevance
      }
    })

  function calculateRelevance(product: Product, query: string): number {
    const searchTerm = query.toLowerCase()
    let score = 0

    // Exact name match gets highest score
    if (product.name.toLowerCase().includes(searchTerm)) {
      score += 10
    }

    // Description match
    if (product.description.toLowerCase().includes(searchTerm)) {
      score += 5
    }

    // Color match
    if (product.colors.some((color) => color.toLowerCase().includes(searchTerm))) {
      score += 3
    }

    // Gender match
    if (product.gender.toLowerCase().includes(searchTerm)) {
      score += 2
    }

    return score
  }

  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product)
    setIsProductModalOpen(true)
  }

  const handleClose = () => {
    clearSearch()
    setSortBy("relevance")
    setFilterGender("all")
    onClose()
  }

  const handleQuickSearch = (term: string) => {
    setSearchQuery(term)
  }

  const popularSearches = ["Dunk Low", "Dunk High", "SB", "Vintage", "Retro", "White", "Black", "Navy"]

  // Prevent hydration mismatch
  if (!isMounted) {
    return null
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent
          className="bg-black border-gray-800 text-white max-w-6xl max-h-[90vh] p-0"
          suppressHydrationWarning
        >
          <DialogHeader className="p-6 border-b border-gray-800">
            <DialogTitle className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Search className="h-6 w-6 text-orange-500" />
                <span className="text-2xl font-bold">Buscar Produtos</span>
              </div>
              <Button variant="ghost" size="sm" onClick={handleClose} className="text-gray-400 hover:text-white">
                <X className="h-5 w-5" />
              </Button>
            </DialogTitle>
          </DialogHeader>

          <div className="flex flex-col h-full max-h-[calc(90vh-120px)]">
            {/* Search Input */}
            <div className="p-6 border-b border-gray-800">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Digite o nome do produto, cor ou categoria..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-12 h-12 bg-gray-900 border-gray-700 text-white placeholder-gray-400 focus:border-orange-500 text-lg"
                  autoFocus
                />
                {searchQuery && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                )}
              </div>

              {/* Popular Searches */}
              {!searchQuery.trim() && (
                <div className="mt-4">
                  <p className="text-sm text-gray-400 mb-3">Buscas populares:</p>
                  <div className="flex flex-wrap gap-2">
                    {popularSearches.map((term) => (
                      <Button
                        key={term}
                        variant="outline"
                        size="sm"
                        onClick={() => handleQuickSearch(term)}
                        className="border-gray-700 text-gray-300 hover:border-orange-500 hover:text-orange-500 bg-transparent"
                      >
                        {term}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Filters and Sort */}
            {searchQuery.trim() && (
              <div className="p-6 border-b border-gray-800">
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Filter className="h-4 w-4 text-gray-400" />
                      <span className="text-sm font-medium text-gray-300">Filtros:</span>
                    </div>
                    <Select value={filterGender} onValueChange={setFilterGender}>
                      <SelectTrigger className="w-40 bg-gray-900 border-gray-700 text-white">
                        <SelectValue placeholder="Gênero" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900 border-gray-700">
                        <SelectItem value="all">Todos</SelectItem>
                        <SelectItem value="masculino">Masculino</SelectItem>
                        <SelectItem value="feminino">Feminino</SelectItem>
                        <SelectItem value="unissex">Unissex</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <SortAsc className="h-4 w-4 text-gray-400" />
                      <span className="text-sm font-medium text-gray-300">Ordenar:</span>
                    </div>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-48 bg-gray-900 border-gray-700 text-white">
                        <SelectValue placeholder="Ordenar por" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900 border-gray-700">
                        <SelectItem value="relevance">Relevância</SelectItem>
                        <SelectItem value="name">Nome A-Z</SelectItem>
                        <SelectItem value="price-low">Menor preço</SelectItem>
                        <SelectItem value="price-high">Maior preço</SelectItem>
                        <SelectItem value="rating">Melhor avaliados</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}

            {/* Search Results */}
            <div className="flex-1 overflow-y-auto p-6">
              {searchQuery.trim() === "" ? (
                <div className="text-center py-16">
                  <Search className="h-24 w-24 text-gray-600 mx-auto mb-6" />
                  <h3 className="text-2xl font-bold mb-4">Encontre seu Nike Dunk ideal</h3>
                  <p className="text-gray-400 mb-8 max-w-md mx-auto">
                    Digite o nome do produto, cor ou categoria para encontrar exatamente o que você procura.
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gray-800 rounded-lg mx-auto mb-2 flex items-center justify-center">
                        👟
                      </div>
                      <p className="text-sm text-gray-400">Modelos</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gray-800 rounded-lg mx-auto mb-2 flex items-center justify-center">
                        🎨
                      </div>
                      <p className="text-sm text-gray-400">Cores</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gray-800 rounded-lg mx-auto mb-2 flex items-center justify-center">
                        📏
                      </div>
                      <p className="text-sm text-gray-400">Tamanhos</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gray-800 rounded-lg mx-auto mb-2 flex items-center justify-center">
                        ⭐
                      </div>
                      <p className="text-sm text-gray-400">Avaliações</p>
                    </div>
                  </div>
                </div>
              ) : filteredAndSortedResults.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-24 h-24 bg-gray-800 rounded-full mx-auto mb-6 flex items-center justify-center">
                    <Search className="h-12 w-12 text-gray-600" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Nenhum produto encontrado</h3>
                  <p className="text-gray-400 mb-8 max-w-md mx-auto">
                    Não encontramos produtos para "<span className="text-orange-500 font-semibold">{searchQuery}</span>
                    ". Tente buscar por outro termo.
                  </p>
                  <div className="space-y-4">
                    <p className="text-sm text-gray-500">Sugestões:</p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {popularSearches.slice(0, 4).map((term) => (
                        <Button
                          key={term}
                          variant="outline"
                          size="sm"
                          onClick={() => handleQuickSearch(term)}
                          className="border-gray-700 text-gray-300 hover:border-orange-500 hover:text-orange-500 bg-transparent"
                        >
                          {term}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  {/* Results Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-xl font-bold">
                        {filteredAndSortedResults.length} produto{filteredAndSortedResults.length !== 1 ? "s" : ""}{" "}
                        encontrado{filteredAndSortedResults.length !== 1 ? "s" : ""}
                      </h3>
                      <p className="text-gray-400">
                        para "<span className="text-orange-500 font-semibold">{searchQuery}</span>"
                      </p>
                    </div>
                    {(sortBy !== "relevance" || filterGender !== "all") && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSortBy("relevance")
                          setFilterGender("all")
                        }}
                        className="border-gray-700 text-gray-300 hover:border-orange-500 hover:text-orange-500 bg-transparent"
                      >
                        Limpar filtros
                      </Button>
                    )}
                  </div>

                  {/* Active Filters */}
                  {(sortBy !== "relevance" || filterGender !== "all") && (
                    <div className="flex items-center gap-2 mb-6">
                      <span className="text-sm text-gray-400">Filtros ativos:</span>
                      {filterGender !== "all" && (
                        <Badge
                          variant="secondary"
                          className="bg-orange-500 text-black hover:bg-orange-600 cursor-pointer"
                          onClick={() => setFilterGender("all")}
                        >
                          {filterGender} <X className="h-3 w-3 ml-1" />
                        </Badge>
                      )}
                      {sortBy !== "relevance" && (
                        <Badge
                          variant="secondary"
                          className="bg-gray-700 text-white hover:bg-gray-600 cursor-pointer"
                          onClick={() => setSortBy("relevance")}
                        >
                          {sortBy === "price-low"
                            ? "Menor preço"
                            : sortBy === "price-high"
                              ? "Maior preço"
                              : sortBy === "name"
                                ? "Nome A-Z"
                                : sortBy === "rating"
                                  ? "Melhor avaliados"
                                  : sortBy}{" "}
                          <X className="h-3 w-3 ml-1" />
                        </Badge>
                      )}
                    </div>
                  )}

                  {/* Products Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredAndSortedResults.map((product) => (
                      <div key={product.id} className="transform scale-95">
                        <ProductCard product={product} onViewDetails={handleViewProduct} />
                      </div>
                    ))}
                  </div>

                  {/* Load More (if needed) */}
                  {filteredAndSortedResults.length > 12 && (
                    <div className="text-center mt-8">
                      <Button
                        variant="outline"
                        className="border-gray-700 text-gray-300 hover:border-orange-500 hover:text-orange-500 bg-transparent"
                      >
                        Ver mais resultados
                      </Button>
                    </div>
                  )}
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
