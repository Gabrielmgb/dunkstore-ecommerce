"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Plus, Minus, Trash2, X } from "lucide-react"

// Static cart data to prevent hydration issues
const staticCartItems = [
  {
    id: 1,
    name: "Nike Dunk Low Retro White/Black",
    price: 899.99,
    image: "/placeholder.svg?height=300&width=300",
    selectedSize: "42",
    selectedColor: "Branco/Preto",
    quantity: 1,
  },
  {
    id: 2,
    name: "Nike Dunk High Vintage Navy",
    price: 749.99,
    image: "/placeholder.svg?height=300&width=300",
    selectedSize: "41",
    selectedColor: "Azul Marinho",
    quantity: 2,
  },
]

const staticCartState = {
  items: staticCartItems,
  itemCount: 3,
  total: 2399.97,
}

export default function CartSidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const [cartState, setCartState] = useState(staticCartState)
  const [isMounted, setIsMounted] = useState(false)

  // Handle hydration
  useEffect(() => {
    setIsMounted(true)
  }, [])

  const updateQuantity = (id: number, newQuantity: number) => {
    setCartState((prev) => ({
      ...prev,
      items: prev.items.map((item) => (item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item)),
    }))
  }

  const removeItem = (id: number) => {
    setCartState((prev) => ({
      ...prev,
      items: prev.items.filter((item) => item.id !== id),
    }))
  }

  const clearCart = () => {
    setCartState({
      items: [],
      itemCount: 0,
      total: 0,
    })
  }

  // Prevent hydration mismatch
  if (!isMounted) {
    return (
      <Button variant="ghost" size="sm" className="relative text-white hover:text-orange-500">
        <ShoppingCart className="h-5 w-5" />
        <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-orange-500 text-black text-xs flex items-center justify-center p-0">
          3
        </Badge>
      </Button>
    )
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="relative text-white hover:text-orange-500">
          <ShoppingCart className="h-5 w-5" />
          {cartState.itemCount > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-orange-500 text-black text-xs flex items-center justify-center p-0">
              {cartState.itemCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="bg-black border-gray-800 w-96 flex flex-col" suppressHydrationWarning>
        <SheetHeader className="border-b border-gray-800 pb-4">
          <SheetTitle className="text-white flex items-center justify-between">
            <span>Carrinho ({cartState.itemCount})</span>
            {cartState.items.length > 0 && (
              <Button variant="ghost" size="sm" onClick={clearCart} className="text-gray-400 hover:text-red-500">
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto py-4">
          {cartState.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingCart className="h-16 w-16 text-gray-600 mb-4" />
              <p className="text-gray-400 mb-2">Seu carrinho está vazio</p>
              <p className="text-sm text-gray-500">Adicione produtos para começar</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cartState.items.map((item) => (
                <div key={item.id} className="bg-gray-900 rounded-lg p-4 border border-gray-800">
                  <div className="flex gap-3">
                    <div className="relative w-16 h-16 bg-gray-800 rounded-lg overflow-hidden flex-shrink-0">
                      <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="text-white font-semibold text-sm truncate">{item.name}</h4>
                      <p className="text-gray-400 text-xs">
                        Tamanho: {item.selectedSize} | Cor: {item.selectedColor}
                      </p>
                      <p className="text-orange-500 font-bold text-sm">R$ {item.price.toFixed(2).replace(".", ",")}</p>
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeItem(item.id)}
                      className="text-gray-400 hover:text-red-500 p-1 h-auto"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center border border-gray-700 rounded-lg">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="text-gray-400 hover:text-white p-2 h-auto"
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="px-3 py-1 text-white text-sm font-semibold">{item.quantity}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="text-gray-400 hover:text-white p-2 h-auto"
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>

                    <p className="text-white font-bold">
                      R$ {(item.price * item.quantity).toFixed(2).replace(".", ",")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cartState.items.length > 0 && (
          <div className="border-t border-gray-800 pt-4 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-white">Total:</span>
              <span className="text-xl font-bold text-orange-500">
                R$ {cartState.total.toFixed(2).replace(".", ",")}
              </span>
            </div>

            <Button
              className="w-full bg-orange-500 hover:bg-orange-600 text-black font-bold"
              onClick={() => setIsOpen(false)}
            >
              FINALIZAR COMPRA
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
