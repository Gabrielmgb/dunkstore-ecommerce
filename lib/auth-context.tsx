"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface User {
  id: string
  name: string
  email: string
  phone?: string
  birthDate?: string
  gender?: string
  address?: {
    street: string
    number: string
    complement?: string
    neighborhood: string
    city: string
    state: string
    zipCode: string
  }
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (userData: Partial<User> & { password: string }) => Promise<boolean>
  logout: () => void
  updateProfile: (userData: Partial<User>) => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("dunkstore-user")
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser)
        setUser(userData)
        setIsAuthenticated(true)
      } catch (error) {
        console.error("Error loading user from localStorage:", error)
      }
    }
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock authentication - in real app, this would be an API call
    if (email && password) {
      const mockUser: User = {
        id: "1",
        name: "João Silva",
        email: email,
        phone: "(11) 99999-9999",
        birthDate: "1990-01-01",
        gender: "Masculino",
        address: {
          street: "Rua das Flores",
          number: "123",
          complement: "Apto 45",
          neighborhood: "Vila Madalena",
          city: "São Paulo",
          state: "SP",
          zipCode: "05435-000",
        },
      }

      setUser(mockUser)
      setIsAuthenticated(true)
      localStorage.setItem("dunkstore-user", JSON.stringify(mockUser))
      return true
    }

    return false
  }

  const register = async (userData: Partial<User> & { password: string }): Promise<boolean> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock registration
    const newUser: User = {
      id: Date.now().toString(),
      name: userData.name || "",
      email: userData.email || "",
      phone: userData.phone,
      birthDate: userData.birthDate,
      gender: userData.gender,
    }

    setUser(newUser)
    setIsAuthenticated(true)
    localStorage.setItem("dunkstore-user", JSON.stringify(newUser))
    return true
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem("dunkstore-user")
  }

  const updateProfile = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData }
      setUser(updatedUser)
      localStorage.setItem("dunkstore-user", JSON.stringify(updatedUser))
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        register,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
