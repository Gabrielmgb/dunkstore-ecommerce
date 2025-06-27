"use client"

import type React from "react"
import { createContext, useContext, useReducer, useEffect } from "react"
import type { Product } from "./cart-context"

interface FavoritesState {
  items: Product[]
  count: number
}

type FavoritesAction =
  | { type: "ADD_TO_FAVORITES"; payload: Product }
  | { type: "REMOVE_FROM_FAVORITES"; payload: number }
  | { type: "CLEAR_FAVORITES" }
  | { type: "LOAD_FAVORITES"; payload: FavoritesState }

const FavoritesContext = createContext<{
  state: FavoritesState
  dispatch: React.Dispatch<FavoritesAction>
  isFavorite: (productId: number) => boolean
  toggleFavorite: (product: Product) => void
} | null>(null)

function favoritesReducer(state: FavoritesState, action: FavoritesAction): FavoritesState {
  switch (action.type) {
    case "ADD_TO_FAVORITES": {
      const exists = state.items.find((item) => item.id === action.payload.id)
      if (exists) return state

      const newItems = [...state.items, action.payload]
      return {
        items: newItems,
        count: newItems.length,
      }
    }

    case "REMOVE_FROM_FAVORITES": {
      const newItems = state.items.filter((item) => item.id !== action.payload)
      return {
        items: newItems,
        count: newItems.length,
      }
    }

    case "CLEAR_FAVORITES":
      return { items: [], count: 0 }

    case "LOAD_FAVORITES":
      return action.payload

    default:
      return state
  }
}

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(favoritesReducer, {
    items: [],
    count: 0,
  })

  // Load favorites from localStorage on mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem("dunkstore-favorites")
    if (savedFavorites) {
      try {
        const favoritesData = JSON.parse(savedFavorites)
        dispatch({ type: "LOAD_FAVORITES", payload: favoritesData })
      } catch (error) {
        console.error("Error loading favorites from localStorage:", error)
      }
    }
  }, [])

  // Save favorites to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("dunkstore-favorites", JSON.stringify(state))
  }, [state])

  const isFavorite = (productId: number): boolean => {
    return state.items.some((item) => item.id === productId)
  }

  const toggleFavorite = (product: Product) => {
    if (isFavorite(product.id)) {
      dispatch({ type: "REMOVE_FROM_FAVORITES", payload: product.id })
    } else {
      dispatch({ type: "ADD_TO_FAVORITES", payload: product })
    }
  }

  return (
    <FavoritesContext.Provider value={{ state, dispatch, isFavorite, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider")
  }
  return context
}
