"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, SortAsc, X, Grid, List } from "lucide-react"
import { useSearch } from "@/lib/search-context"
import ProductCard from "@/components/product/product-card"
import ProductModal from "@/components/product/product-modal"
import type { Product } from "@/lib/cart-context"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { searchQuery, setSearchQuery, searchResults } = useSearch()

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isProductModalOpen, setIsProductModalOpen] = useState(false)
  const [sortBy, setSortBy] = useState("relevance")
  const [filterGender, setFilterGender] = useState("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [isMounted, setIsMounted] = useState(false)

  // Handle hydration
  useEffect(() => {
    setIsMounted(true)

    // Get search query from URL params after mount
    if (typeof window !== "undefined") {
      const query = searchParams.get("q")
      if (query) {
        setSearchQuery(query)
      }
    }
  }, [searchParams, setSearchQuery])

  // Update URL when search query changes
  useEffect(() => {
    if (isMounted && searchQuery.trim()) {
      const params = new URLSearchParams()
      params.set("q", searchQuery)
      router.replace(`/search?${params.toString()}`, { scroll: false })
    }
  }, [searchQuery, router, isMounted])

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
          return 0
      }
    })

  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product)
    setIsProductModalOpen(true)
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Search is already handled by the context
  }

  // Prevent hydration mismatch
  if (!isMounted) {
    return (
      <div className="min-h-screen bg-black text-white pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="h-12 bg-gray-800 rounded w-80 mb-8 animate-pulse"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
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
    <div className="min-h-screen bg-black text-white pt-20" suppressHydrationWarning>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-black mb-4">
            BUSCAR <span className="text-orange-500">PRODUTOS</span>
          </h1>
          <p className="text-gray-400">Encontre o Nike Dunk perfeito para você</p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <form onSubmit={handleSearchSubmit} className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="search"
              placeholder="Digite o nome do produto, cor ou categoria..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-12 h-14 bg-gray-900 border-gray-700 text-white placeholder-gray-400 focus:border-orange-500 text-lg"
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
          </form>
        </div>

        {/* Filters and Controls */}
        {searchQuery.trim() && (
          <div className="mb-8 p-6 bg-gray-900 rounded-lg border border-gray-800">
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-gray-400" />
                  <span className="text-sm font-medium text-gray-300">Filtros:</span>
                </div>
                <Select value={filterGender} onValueChange={setFilterGender}>
                  <SelectTrigger className="w-40 bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder="Gênero" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="masculino">Masculino</SelectItem>
                    <SelectItem value="feminino">Feminino</SelectItem>
                    <SelectItem value="unissex">Unissex</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Sort and View */}
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <SortAsc className="h-4 w-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-300">Ordenar:</span>
                  </div>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-48 bg-gray-800 border-gray-700 text-white">
                      <SelectValue placeholder="Ordenar por" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="relevance">Relevância</SelectItem>
                      <SelectItem value="name">Nome A-Z</SelectItem>
                      <SelectItem value="price-low">Menor preço</SelectItem>
                      <SelectItem value="price-high">Maior preço</SelectItem>
                      <SelectItem value="rating">Melhor avaliados</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

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

            {/* Active Filters */}
            {(sortBy !== "relevance" || filterGender !== "all") && (
              <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-800">
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
          </div>
        )}

        {/* Results */}
        {searchQuery.trim() === "" ? (
          <div className="text-center py-16">
            <Search className="h-24 w-24 text-gray-600 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Comece sua busca</h2>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">
              Digite o nome do produto, cor ou categoria para encontrar exatamente o que você procura.
            </p>
          </div>
        ) : filteredAndSortedResults.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-800 rounded-full mx-auto mb-6 flex items-center justify-center">
              <Search className="h-12 w-12 text-gray-600" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Nenhum produto encontrado</h2>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">
              Não encontramos produtos para "<span className="text-orange-500 font-semibold">{searchQuery}</span>".
              Tente buscar por outro termo.
            </p>
          </div>
        ) : (
          <div>
            {/* Results Header */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">
                {filteredAndSortedResults.length} produto{filteredAndSortedResults.length !== 1 ? "s" : ""} encontrado
                {filteredAndSortedResults.length !== 1 ? "s" : ""}
              </h2>
              <p className="text-gray-400">
                para "<span className="text-orange-500 font-semibold">{searchQuery}</span>"
              </p>
            </div>

            {/* Products */}
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                  : "space-y-4"
              }
            >
              {filteredAndSortedResults.map((product) => (
                <ProductCard key={product.id} product={product} onViewDetails={handleViewProduct} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
      />
    </div>
  )
}
