"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Star, Filter, Grid, List } from "lucide-react"

export default function ShopPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [priceRange, setPriceRange] = useState([0, 2000])

  const products = [
    {
      id: 1,
      name: "Nike Dunk Low Retro White/Black",
      price: 899.99,
      originalPrice: 1199.99,
      image: "/placeholder.svg?height=300&width=300",
      badge: "PROMOÇÃO",
      rating: 4.8,
      sizes: ["38", "39", "40", "41", "42", "43"],
      colors: ["Branco/Preto", "Preto/Branco"],
      gender: "Unissex",
    },
    {
      id: 2,
      name: "Nike Dunk High Vintage Navy",
      price: 749.99,
      image: "/placeholder.svg?height=300&width=300",
      badge: "LANÇAMENTO",
      rating: 4.9,
      sizes: ["38", "39", "40", "41", "42"],
      colors: ["Azul Marinho"],
      gender: "Masculino",
    },
    {
      id: 3,
      name: "Nike Dunk SB Street Pink",
      price: 1099.99,
      image: "/placeholder.svg?height=300&width=300",
      badge: "EXCLUSIVO",
      rating: 4.7,
      sizes: ["35", "36", "37", "38", "39"],
      colors: ["Rosa/Branco"],
      gender: "Feminino",
    },
    {
      id: 4,
      name: "Nike Dunk Low Championship Red",
      price: 999.99,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.6,
      sizes: ["39", "40", "41", "42", "43", "44"],
      colors: ["Vermelho/Branco"],
      gender: "Masculino",
    },
    {
      id: 5,
      name: "Nike Dunk High Pro SB",
      price: 1299.99,
      image: "/placeholder.svg?height=300&width=300",
      badge: "LIMITADO",
      rating: 4.9,
      sizes: ["38", "39", "40", "41", "42"],
      colors: ["Preto/Dourado"],
      gender: "Unissex",
    },
    {
      id: 6,
      name: "Nike Dunk Low Coast",
      price: 849.99,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.5,
      sizes: ["35", "36", "37", "38", "39", "40"],
      colors: ["Azul/Branco"],
      gender: "Feminino",
    },
  ]

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
                <div className="space-y-2 p-3 text-black bg-white rounded-xl">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="masculino" />
                    <Label htmlFor="masculino" className="text-sm">
                      Masculino
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="feminino" />
                    <Label htmlFor="feminino" className="text-sm">
                      Feminino
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="unissex" />
                    <Label htmlFor="unissex" className="text-sm">
                      Unissex
                    </Label>
                  </div>
                </div>
              </div>

              {/* Size Filter */}
              <div className="mb-6">
                <Label className="text-sm font-bold text-gray-300 mb-3 block">TAMANHO</Label>
                <div className="grid grid-cols-3 gap-2">
                  {["35", "36", "37", "38", "39", "40", "41", "42", "43", "44"].map((size) => (
                    <Button
                      key={size}
                      variant="outline"
                      size="sm"
                      className="border-gray-700 text-gray-800 hover:border-orange-500 hover:text-orange-500"
                    >
                      {size}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Color Filter */}
              <div className="mb-6">
                <Label className="text-sm font-bold text-gray-300 mb-3 block">COR</Label>
                <div className="space-y-2 text-black bg-white rounded-xl p-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="preto" />
                    <Label htmlFor="preto" className="text-sm">
                      Preto
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="branco" />
                    <Label htmlFor="branco" className="text-sm">
                      Branco
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="vermelho" />
                    <Label htmlFor="vermelho" className="text-sm">
                      Vermelho
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="azul" />
                    <Label htmlFor="azul" className="text-sm">
                      Azul
                    </Label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:w-3/4">
            {/* Sort and View Controls */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
              <p className="text-gray-400">{products.length} produtos encontrados</p>

              <div className="flex items-center gap-4">
                <Select defaultValue="relevance">
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
            <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" : "space-y-4"}>
              {products.map((product) => (
                <Card
                  key={product.id}
                  className="bg-gray-900 border-gray-800 overflow-hidden group hover:border-orange-500 transition-all duration-300"
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
                      <Badge className="absolute top-4 left-4 bg-orange-500 text-black font-bold">
                        {product.badge}
                      </Badge>
                    )}
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center mb-2">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-orange-500 text-orange-500" />
                        <span className="ml-1 text-sm text-gray-400">{product.rating}</span>
                      </div>
                      <span className="ml-auto text-xs text-gray-500">{product.gender}</span>
                    </div>
                    <h3 className="text-lg font-bold mb-2 text-white">{product.name}</h3>
                    <p className="text-sm text-gray-400 mb-3">Tamanhos: {product.sizes.join(", ")}</p>
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <span className="text-xl font-bold text-orange-500">
                          R$ {product.price.toFixed(2).replace(".", ",")}
                        </span>
                        {product.originalPrice && (
                          <span className="ml-2 text-sm text-gray-500 line-through">
                            R$ {product.originalPrice.toFixed(2).replace(".", ",")}
                          </span>
                        )}
                      </div>
                    </div>
                    <Button asChild className="w-full bg-orange-500 hover:bg-orange-600 text-black font-bold">
                      <Link href={`/product/${product.id}`}>VER PRODUTO</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
