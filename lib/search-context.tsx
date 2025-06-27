"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { products } from "./products-data"
import type { Product } from "./cart-context"

interface SearchContextType {
  searchQuery: string
  setSearchQuery: (query: string) => void
  searchResults: Product[]
  isSearching: boolean
  clearSearch: () => void
  searchHistory: string[]
  addToSearchHistory: (query: string) => void
}

const SearchContext = createContext<SearchContextType | null>(null)

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [searchHistory, setSearchHistory] = useState<string[]>([])
  const [isMounted, setIsMounted] = useState(false)

  // Handle hydration
  useEffect(() => {
    setIsMounted(true)
    // Load search history from localStorage after mount
    if (typeof window !== "undefined") {
      const savedHistory = localStorage.getItem("dunkstore-search-history")
      if (savedHistory) {
        try {
          setSearchHistory(JSON.parse(savedHistory))
        } catch (error) {
          console.error("Error loading search history:", error)
        }
      }
    }
  }, [])

  // Save search history to localStorage
  useEffect(() => {
    if (isMounted && typeof window !== "undefined") {
      localStorage.setItem("dunkstore-search-history", JSON.stringify(searchHistory))
    }
  }, [searchHistory, isMounted])

  // Perform search
  const searchResults = searchQuery.trim()
    ? products.filter((product) => {
        const query = searchQuery.toLowerCase()
        return (
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.colors.some((color) => color.toLowerCase().includes(query)) ||
          product.gender.toLowerCase().includes(query) ||
          product.features.some((feature) => feature.toLowerCase().includes(query)) ||
          (product.brand && product.brand.toLowerCase().includes(query)) ||
          (product.category && product.category.toLowerCase().includes(query))
        )
      })
    : []

  const handleSetSearchQuery = (query: string) => {
    setSearchQuery(query)
    setIsSearching(query.trim().length > 0)
  }

  const clearSearch = () => {
    setSearchQuery("")
    setIsSearching(false)
  }

  const addToSearchHistory = (query: string) => {
    if (!query.trim() || searchHistory.includes(query.trim())) return

    const newHistory = [query.trim(), ...searchHistory.filter((item) => item !== query.trim())].slice(0, 10) // Keep only last 10 searches

    setSearchHistory(newHistory)
  }

  // Add to search history when search query changes (with debounce)
  useEffect(() => {
    if (searchQuery.trim().length > 2) {
      const timeoutId = setTimeout(() => {
        addToSearchHistory(searchQuery.trim())
      }, 1000) // Add to history after 1 second of no typing

      return () => clearTimeout(timeoutId)
    }
  }, [searchQuery])

  return (
    <SearchContext.Provider
      value={{
        searchQuery,
        setSearchQuery: handleSetSearchQuery,
        searchResults,
        isSearching,
        clearSearch,
        searchHistory,
        addToSearchHistory,
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
