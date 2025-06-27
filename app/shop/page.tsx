"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Filter, Grid, List } from "lucide-react"
import { products } from "@/lib/products-data"
import type { Product } from "@/lib/cart-context"
import ProductCard from "@/components/product/product-card"
import ProductModal from "@/components/product/product-modal"

export default function ShopPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [priceRange, setPriceRange] = useState([0, 2000])
  const [selectedGender, setSelectedGender] = useState<string[]>([])
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [sortBy, setSortBy] = useState("relevance")
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Filter products based on selected filters
  const filteredProducts = products.filter((product) => {
    // Price filter
    if (product.price < priceRange[0] || product.price > priceRange[1]) return false

    // Gender filter
    if (selectedGender.length > 0 && !selectedGender.includes(product.gender.toLowerCase())) return false

    // Size filter
    if (selectedSizes.length > 0 && !selectedSizes.some((size) => product.sizes.includes(size))) return false

    // Color filter (simplified - checks if any selected color is mentioned in product colors)
    if (selectedColors.length > 0) {
      const hasMatchingColor = selectedColors.some((color) =>
        product.colors.some((productColor) => productColor.toLowerCase().includes(color.toLowerCase())),
      )
      if (!hasMatchingColor) return false
    }

    return true
  })

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "newest":
        return b.id - a.id // Assuming higher ID means newer
      case "rating":
        return b.rating - a.rating
      default:
        return 0
    }
  })

  const handleGenderChange = (gender: string, checked: boolean) => {
    if (checked) {
      setSelectedGender([...selectedGender, gender])
    } else {
      setSelectedGender(selectedGender.filter((g) => g !== gender))
    }
  }

  const handleSizeChange = (size: string, checked: boolean) => {
    if (checked) {
      setSelectedSizes([...selectedSizes, size])
    } else {
      setSelectedSizes(selectedSizes.filter((s) => s !== size))
    }
  }

  const handleColorChange = (color: string, checked: boolean) => {
    if (checked) {
      setSelectedColors([...selectedColors, color])
    } else {
      setSelectedColors(selectedColors.filter((c) => c !== color))
    }
  }

  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product)
    setIsModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-black mb-4">
            NOSSA <span className="text-orange-500">COLEÇÃO</span>
          </h1>
          <p className="text-gray-400">Descubra os melhores Nike Dunk para seu estilo</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-gray-900 p-6 rounded-lg sticky top-4">
              <div className="flex items-center mb-6">
                <Filter className="h-5 w-5 text-orange-500 mr-2" />
                <h2 className="text-xl font-bold">FILTROS</h2>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <Label className="text-sm font-bold text-gray-300 mb-3 block">PREÇO</Label>
                <Slider value={priceRange} onValueChange={setPriceRange} max={2000} step={50} className="mb-2" />
                <div className="flex justify-between text-sm text-gray-400">
                  <span>R$ {priceRange[0]}</span>
                  <span>R$ {priceRange[1]}</span>
                </div>
              </div>

              {/* Gender Filter */}
              <div className="mb-6">
                <Label className="text-sm font-bold text-gray-300 mb-3 block">GÊNERO</Label>
                <div className="space-y-2">
                  {["masculino", "feminino", "unissex"].map((gender) => (
                    <div key={gender} className="flex items-center space-x-2">
                      <Checkbox
                        id={gender}
                        checked={selectedGender.includes(gender)}
                        onCheckedChange={(checked) => handleGenderChange(gender, checked as boolean)}
                      />
                      <Label htmlFor={gender} className="text-sm capitalize">
                        {gender}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Size Filter */}
              <div className="mb-6">
                <Label className="text-sm font-bold text-gray-300 mb-3 block">TAMANHO</Label>
                <div className="grid grid-cols-3 gap-2">
                  {["35", "36", "37", "38", "39", "40", "41", "42", "43", "44"].map((size) => (
                    <Button
                      key={size}
                      variant={selectedSizes.includes(size) ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleSizeChange(size, !selectedSizes.includes(size))}
                      className={
                        selectedSizes.includes(size)
                          ? "bg-orange-500 text-black"
                          : "border-gray-700 text-gray-300 hover:border-orange-500 hover:text-orange-500"
                      }
                    >
                      {size}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Color Filter */}
              <div className="mb-6">
                <Label className="text-sm font-bold text-gray-300 mb-3 block">COR</Label>
                <div className="space-y-2">
                  {["preto", "branco", "vermelho", "azul", "rosa"].map((color) => (
                    <div key={color} className="flex items-center space-x-2">
                      <Checkbox
                        id={color}
                        checked={selectedColors.includes(color)}
                        onCheckedChange={(checked) => handleColorChange(color, checked as boolean)}
                      />
                      <Label htmlFor={color} className="text-sm capitalize">
                        {color}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Clear Filters */}
              <Button
                variant="outline"
                className="w-full border-gray-700 text-gray-300 hover:border-orange-500 hover:text-orange-500 bg-transparent"
                onClick={() => {
                  setPriceRange([0, 2000])
                  setSelectedGender([])
                  setSelectedSizes([])
                  setSelectedColors([])
                }}
              >
                LIMPAR FILTROS
              </Button>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:w-3/4">
            {/* Sort and View Controls */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
              <p className="text-gray-400">{sortedProducts.length} produtos encontrados</p>

              <div className="flex items-center gap-4">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48 bg-gray-900 border-gray-700">
                    <SelectValue placeholder="Ordenar por" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Relevância</SelectItem>
                    <SelectItem value="price-low">Menor preço</SelectItem>
                    <SelectItem value="price-high">Maior preço</SelectItem>
                    <SelectItem value="newest">Mais recentes</SelectItem>
                    <SelectItem value="rating">Melhor avaliados</SelectItem>
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
            {sortedProducts.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-gray-400 text-lg mb-4">Nenhum produto encontrado</p>
                <p className="text-gray-500">Tente ajustar os filtros para ver mais produtos</p>
              </div>
            ) : (
              <div
                className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" : "space-y-4"}
              >
                {sortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} onViewDetails={handleViewProduct} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Product Modal */}
      <ProductModal product={selectedProduct} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}
