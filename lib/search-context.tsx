"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"
import { products } from "./products-data"
import type { Product } from "./cart-context"

interface SearchContextType {
  searchQuery: string
  setSearchQuery: (query: string) => void
  searchResults: Product[]
  isSearching: boolean
  clearSearch: () => void
}

const SearchContext = createContext<SearchContextType | null>(null)

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)

  const searchResults = searchQuery.trim()
    ? products.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.colors.some((color) => color.toLowerCase().includes(searchQuery.toLowerCase())) ||
          product.gender.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : []

  const handleSetSearchQuery = (query: string) => {
    setSearchQuery(query)
    setIsSearching(query.trim().length > 0)
  }

  const clearSearch = () => {
    setSearchQuery("")
    setIsSearching(false)
  }

  return (
    <SearchContext.Provider
      value={{
        searchQuery,
        setSearchQuery: handleSetSearchQuery,
        searchResults,
        isSearching,
        clearSearch,
      }}
    >
      {children}
    </SearchContext.Provider>
  )
}

export function useSearch() {
  const context = useContext(SearchContext)
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider")
  }
  return context
}
