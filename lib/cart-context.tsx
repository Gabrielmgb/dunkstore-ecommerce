"use client"

import type React from "react"
import { createContext, useContext, useReducer, useEffect } from "react"

export interface Product {
  id: number
  name: string
  price: number
  originalPrice?: number
  image: string
  badge?: string
  rating: number
  sizes: string[]
  colors: string[]
  gender: string
  description: string
  features: string[]
  reviews?: number
  stockCount?: number
}

export interface CartItem extends Product {
  quantity: number
  selectedSize: string
  selectedColor: string
}

interface CartState {
  items: CartItem[]
  total: number
  itemCount: number
}

type CartAction =
  | { type: "ADD_TO_CART"; payload: { product: Product; size: string; color: string; quantity: number } }
  | { type: "REMOVE_FROM_CART"; payload: { id: number; size: string; color: string } }
  | { type: "UPDATE_QUANTITY"; payload: { id: number; size: string; color: string; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "SET_STATE"; payload: CartState }

const CartContext = createContext<{
  state: CartState
  dispatch: React.Dispatch<CartAction>
} | null>(null)

function cartReducer(state: CartState, action: CartAction): CartState {
  let newItems: CartItem[]
  let total: number
  let itemCount: number

  switch (action.type) {
    case "ADD_TO_CART": {
      const { product, size, color, quantity } = action.payload
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === product.id && item.selectedSize === size && item.selectedColor === color,
      )

      if (existingItemIndex >= 0) {
        newItems = state.items.map((item, index) =>
          index === existingItemIndex ? { ...item, quantity: item.quantity + quantity } : item,
        )
      } else {
        const newItem: CartItem = {
          ...product,
          quantity,
          selectedSize: size,
          selectedColor: color,
        }
        newItems = [...state.items, newItem]
      }
      break
    }

    case "REMOVE_FROM_CART": {
      const { id, size, color } = action.payload
      newItems = state.items.filter(
        (item) => !(item.id === id && item.selectedSize === size && item.selectedColor === color),
      )
      break
    }

    case "UPDATE_QUANTITY": {
      const { id, size, color, quantity } = action.payload
      if (quantity <= 0) {
        return cartReducer(state, { type: "REMOVE_FROM_CART", payload: { id, size, color } })
      }
      newItems = state.items.map((item) =>
        item.id === id && item.selectedSize === size && item.selectedColor === color ? { ...item, quantity } : item,
      )
      break
    }

    case "CLEAR_CART":
      newItems = []
      break

    case "SET_STATE":
      return action.payload

    default:
      return state
  }

  total = newItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0)
  const newState = { items: newItems, total, itemCount }

  // Save to localStorage on every state change derived from actions
  if (typeof window !== "undefined") {
    localStorage.setItem("dunkstore-cart", JSON.stringify(newState))
  }

  return newState
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const initialState = { items: [], total: 0, itemCount: 0 }
  const [state, dispatch] = useReducer(cartReducer, initialState)

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("dunkstore-cart")
      if (savedCart) {
        const cartData = JSON.parse(savedCart)
        dispatch({ type: "SET_STATE", payload: cartData })
      }
    } catch (error) {
      console.error("Error loading cart from localStorage:", error)
      localStorage.removeItem("dunkstore-cart")
    }
  }, [])

  return <CartContext.Provider value={{ state, dispatch }}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
