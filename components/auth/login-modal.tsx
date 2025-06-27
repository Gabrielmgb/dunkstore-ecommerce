"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/lib/auth-context"
import { User, Mail, Lock } from "lucide-react"

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const { login, register } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [loginData, setLoginData] = useState({ email: "", password: "" })
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    birthDate: "",
    gender: "",
  })

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const success = await login(loginData.email, loginData.password)
      if (success) {
        onClose()
        setLoginData({ email: "", password: "" })
      } else {
        alert("Email ou senha incorretos")
      }
    } catch (error) {
      alert("Erro ao fazer login")
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()

    if (registerData.password !== registerData.confirmPassword) {
      alert("As senhas não coincidem")
      return
    }

    setIsLoading(true)

    try {
      const success = await register(registerData)
      if (success) {
        onClose()
        setRegisterData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          phone: "",
          birthDate: "",
          gender: "",
        })
      } else {
        alert("Erro ao criar conta")
      }
    } catch (error) {
      alert("Erro ao criar conta")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-black border-gray-800 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">
            DUNK<span className="text-orange-500">STORE</span>
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-gray-900">
            <TabsTrigger value="login" className="data-[state=active]:bg-orange-500 data-[state=active]:text-black">
              ENTRAR
            </TabsTrigger>
            <TabsTrigger value="register" className="data-[state=active]:bg-orange-500 data-[state=active]:text-black">
              CADASTRAR
            </TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="space-y-4">
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="login-email" className="text-sm font-bold text-gray-300">
                  E-MAIL
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="seu@email.com"
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                    className="pl-10 bg-gray-900 border-gray-700 text-white placeholder-gray-400 focus:border-orange-500"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="login-password" className="text-sm font-bold text-gray-300">
                  SENHA
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="login-password"
                    type="password"
                    placeholder="Sua senha"
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    className="pl-10 bg-gray-900 border-gray-700 text-white placeholder-gray-400 focus:border-orange-500"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-black font-bold"
                disabled={isLoading}
              >
                {isLoading ? "ENTRANDO..." : "ENTRAR"}
              </Button>
            </form>

            <div className="text-center">
              <button className="text-sm text-gray-400 hover:text-orange-500">Esqueci minha senha</button>
            </div>
          </TabsContent>

          <TabsContent value="register" className="space-y-4">
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <Label htmlFor="register-name" className="text-sm font-bold text-gray-300">
                  NOME COMPLETO
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="register-name"
                    type="text"
                    placeholder="Seu nome completo"
                    value={registerData.name}
                    onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                    className="pl-10 bg-gray-900 border-gray-700 text-white placeholder-gray-400 focus:border-orange-500"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="register-email" className="text-sm font-bold text-gray-300">
                  E-MAIL
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="register-email"
                    type="email"
                    placeholder="seu@email.com"
                    value={registerData.email}
                    onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                    className="pl-10 bg-gray-900 border-gray-700 text-white placeholder-gray-400 focus:border-orange-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="register-password" className="text-sm font-bold text-gray-300">
                    SENHA
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="register-password"
                      type="password"
                      placeholder="Senha"
                      value={registerData.password}
                      onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                      className="pl-10 bg-gray-900 border-gray-700 text-white placeholder-gray-400 focus:border-orange-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="register-confirm-password" className="text-sm font-bold text-gray-300">
                    CONFIRMAR
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="register-confirm-password"
                      type="password"
                      placeholder="Confirmar"
                      value={registerData.confirmPassword}
                      onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                      className="pl-10 bg-gray-900 border-gray-700 text-white placeholder-gray-400 focus:border-orange-500"
                      required
                    />
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-black font-bold"
                disabled={isLoading}
              >
                {isLoading ? "CRIANDO CONTA..." : "CRIAR CONTA"}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
