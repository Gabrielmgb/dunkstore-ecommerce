"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Menu, Search, ShoppingCart, User, Heart, X } from "lucide-react"

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [cartCount] = useState(3)

  const navigation = [
    { name: "HOME", href: "/" },
    { name: "LOJA", href: "/shop" },
    { name: "SOBRE", href: "/about" },
    { name: "CONTATO", href: "/contact" },
  ]

  return (
    <header className="sticky top-0 z-50 bg-black/95 backdrop-blur-sm border-b border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-black text-white">
              DUNK<span className="text-orange-500">STORE</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-300 hover:text-orange-500 font-medium transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Search Bar (Desktop) */}
          <div className="hidden lg:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Buscar Nike Dunk..."
                className="pl-10 bg-gray-900 border-gray-700 text-white placeholder-gray-400 focus:border-orange-500"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            {/* Search (Mobile) */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden text-gray-300 hover:text-orange-500"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              {isSearchOpen ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
            </Button>

            {/* Wishlist */}
            <Button variant="ghost" size="sm" className="hidden sm:flex text-gray-300 hover:text-orange-500">
              <Heart className="h-5 w-5" />
            </Button>

            {/* Cart */}
            <Button variant="ghost" size="sm" className="relative text-gray-300 hover:text-orange-500">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-orange-500 text-black text-xs flex items-center justify-center p-0">
                  {cartCount}
                </Badge>
              )}
            </Button>

            {/* User Account */}
            <Button variant="ghost" size="sm" className="hidden sm:flex text-gray-300 hover:text-orange-500">
              <User className="h-5 w-5" />
            </Button>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden text-gray-300 hover:text-orange-500">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-black border-gray-800 w-80">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-xl font-black text-white">
                      DUNK<span className="text-orange-500">STORE</span>
                    </span>
                  </div>

                  {/* Mobile Navigation */}
                  <nav className="flex flex-col space-y-6 mb-8">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="text-lg font-medium text-gray-300 hover:text-orange-500 transition-colors"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </nav>

                  {/* Mobile Actions */}
                  <div className="space-y-4 mt-auto">
                    <Button className="w-full bg-orange-500 hover:bg-orange-600 text-black font-bold">
                      <User className="h-5 w-5 mr-2" />
                      MINHA CONTA
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full border-gray-700 text-gray-300 hover:border-orange-500 hover:text-orange-500"
                    >
                      <Heart className="h-5 w-5 mr-2" />
                      FAVORITOS
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isSearchOpen && (
          <div className="lg:hidden py-4 border-t border-gray-800">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Buscar Nike Dunk..."
                className="pl-10 bg-gray-900 border-gray-700 text-white placeholder-gray-400 focus:border-orange-500"
                autoFocus
              />
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
