"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/lib/auth-context"
import { useCart } from "@/lib/cart-context"
import { useFavorites } from "@/lib/favorites-context"
import {
  User,
  MapPin,
  ShoppingBag,
  Heart,
  LogOut,
  Edit,
  Package,
  Truck,
  Eye,
  Star,
  Settings,
  Save,
  X,
  Mail,
  Phone,
  Calendar,
  Users,
} from "lucide-react"
import ProductCard from "@/components/product/product-card"
import ProductModal from "@/components/product/product-modal"
import LoginModal from "@/components/auth/login-modal"
import type { Product } from "@/lib/cart-context"

// Mock orders data
const mockOrders = [
  {
    id: "ORD-001",
    date: "15/12/2024",
    status: "delivered",
    total: 899.99,
    items: [
      {
        productName: "Nike Dunk Low Panda",
        productImage: "/placeholder.svg?height=400&width=400",
        size: "42",
        color: "Preto/Branco",
        quantity: 1,
        price: 899.99,
      },
    ],
    trackingCode: "BR123456789",
    estimatedDelivery: "20/12/2024",
  },
  {
    id: "ORD-002",
    date: "10/12/2024",
    status: "shipped",
    total: 1299.99,
    items: [
      {
        productName: "Nike Dunk High Chicago",
        productImage: "/placeholder.svg?height=400&width=400",
        size: "41",
        color: "Vermelho/Branco",
        quantity: 1,
        price: 1299.99,
      },
    ],
    trackingCode: "BR987654321",
    estimatedDelivery: "18/12/2024",
  },
  {
    id: "ORD-003",
    date: "05/12/2024",
    status: "processing",
    total: 599.99,
    items: [
      {
        productName: "Nike Dunk Low White",
        productImage: "/placeholder.svg?height=400&width=400",
        size: "40",
        color: "Branco",
        quantity: 1,
        price: 599.99,
      },
    ],
    trackingCode: null,
    estimatedDelivery: null,
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "delivered":
      return "bg-green-600"
    case "shipped":
      return "bg-blue-600"
    case "processing":
      return "bg-yellow-600"
    case "cancelled":
      return "bg-red-600"
    default:
      return "bg-gray-600"
  }
}

const getStatusText = (status: string) => {
  switch (status) {
    case "delivered":
      return "Entregue"
    case "shipped":
      return "Em trânsito"
    case "processing":
      return "Processando"
    case "cancelled":
      return "Cancelado"
    default:
      return "Desconhecido"
  }
}

export default function AccountPage() {
  const { user, isAuthenticated, logout, updateProfile } = useAuth()
  const { state: cartState } = useCart()
  const { state: favoritesState } = useFavorites()
  const router = useRouter()
  const searchParams = useSearchParams()

  // State management
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isProductModalOpen, setIsProductModalOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("profile")
  const [isLoading, setIsLoading] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)

  // Form data
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
    birthDate: "",
    gender: "",
    address: {
      street: "",
      number: "",
      complement: "",
      neighborhood: "",
      city: "",
      state: "",
      zipCode: "",
    },
  })

  // Initialize profile data from user - only run once when user changes
  useEffect(() => {
    if (user && !isInitialized) {
      setProfileData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        birthDate: user.birthDate || "",
        gender: user.gender || "",
        address: user.address || {
          street: "",
          number: "",
          complement: "",
          neighborhood: "",
          city: "",
          state: "",
          zipCode: "",
        },
      })
      setIsInitialized(true)
    }
  }, [user, isInitialized])

  // Handle URL tab parameter - only run once on mount
  useEffect(() => {
    const tab = searchParams.get("tab")
    if (tab && ["profile", "orders", "favorites", "address", "settings"].includes(tab)) {
      setActiveTab(tab)
    }
  }, [searchParams])

  // Event handlers
  const handleSaveProfile = useCallback(async () => {
    setIsLoading(true)
    try {
      await updateProfile(profileData)
      setIsEditing(false)
    } catch (error) {
      console.error("Error updating profile:", error)
      alert("Erro ao salvar perfil. Tente novamente.")
    } finally {
      setIsLoading(false)
    }
  }, [profileData, updateProfile])

  const handleCancelEdit = useCallback(() => {
    if (user) {
      setProfileData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        birthDate: user.birthDate || "",
        gender: user.gender || "",
        address: user.address || {
          street: "",
          number: "",
          complement: "",
          neighborhood: "",
          city: "",
          state: "",
          zipCode: "",
        },
      })
    }
    setIsEditing(false)
  }, [user])

  const handleLogout = useCallback(() => {
    logout()
    router.push("/")
  }, [logout, router])

  const handleViewProduct = useCallback((product: Product) => {
    setSelectedProduct(product)
    setIsProductModalOpen(true)
  }, [])

  const handleCloseProductModal = useCallback(() => {
    setIsProductModalOpen(false)
    setSelectedProduct(null)
  }, [])

  // Show login modal if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <Card className="bg-gray-900 border-gray-800 w-full max-w-md mx-4">
          <CardContent className="p-8 text-center">
            <User className="h-16 w-16 text-gray-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">ACESSE SUA CONTA</h2>
            <p className="text-gray-400 mb-6">Faça login para ver seus pedidos, favoritos e informações pessoais.</p>
            <Button
              onClick={() => setIsLoginModalOpen(true)}
              className="w-full bg-orange-500 hover:bg-orange-600 text-black font-bold"
            >
              FAZER LOGIN
            </Button>
          </CardContent>
        </Card>
        <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
      </div>
    )
  }

  // Show loading if user data is not available
  if (!user) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Carregando dados da conta...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-black mb-2">
              MINHA <span className="text-orange-500">CONTA</span>
            </h1>
            <p className="text-gray-400">Bem-vindo de volta, {user.name}!</p>
            <p className="text-sm text-gray-500">gabrielmgb.nd@gmail.com</p>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="border-gray-700 text-gray-300 hover:border-red-500 hover:text-red-500 bg-transparent"
          >
            <LogOut className="h-4 w-4 mr-2" />
            SAIR
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-6 text-center">
              <ShoppingBag className="h-8 w-8 text-orange-500 mx-auto mb-2" />
              <div className="text-2xl font-bold">{mockOrders.length}</div>
              <div className="text-sm text-gray-400">Pedidos</div>
            </CardContent>
          </Card>
          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-6 text-center">
              <Heart className="h-8 w-8 text-red-500 mx-auto mb-2" />
              <div className="text-2xl font-bold">{favoritesState.count}</div>
              <div className="text-sm text-gray-400">Favoritos</div>
            </CardContent>
          </Card>
          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-6 text-center">
              <Package className="h-8 w-8 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold">{cartState.itemCount}</div>
              <div className="text-sm text-gray-400">No Carrinho</div>
            </CardContent>
          </Card>
          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-6 text-center">
              <Star className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
              <div className="text-2xl font-bold">VIP</div>
              <div className="text-sm text-gray-400">Status</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-gray-900 mb-8">
            <TabsTrigger
              value="profile"
              className="data-[state=active]:bg-orange-500 data-[state=active]:text-black flex items-center gap-2"
            >
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">PERFIL</span>
            </TabsTrigger>
            <TabsTrigger
              value="orders"
              className="data-[state=active]:bg-orange-500 data-[state=active]:text-black flex items-center gap-2"
            >
              <ShoppingBag className="h-4 w-4" />
              <span className="hidden sm:inline">PEDIDOS</span>
            </TabsTrigger>
            <TabsTrigger
              value="favorites"
              className="data-[state=active]:bg-orange-500 data-[state=active]:text-black flex items-center gap-2"
            >
              <Heart className="h-4 w-4" />
              <span className="hidden sm:inline">FAVORITOS</span>
            </TabsTrigger>
            <TabsTrigger
              value="address"
              className="data-[state=active]:bg-orange-500 data-[state=active]:text-black flex items-center gap-2"
            >
              <MapPin className="h-4 w-4" />
              <span className="hidden sm:inline">ENDEREÇO</span>
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="data-[state=active]:bg-orange-500 data-[state=active]:text-black flex items-center gap-2"
            >
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">CONFIG</span>
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <User className="h-5 w-5 text-orange-500" />
                    DADOS PESSOAIS
                  </span>
                  {!isEditing ? (
                    <Button
                      onClick={() => setIsEditing(true)}
                      variant="outline"
                      size="sm"
                      className="border-gray-700 text-gray-300 hover:border-orange-500 hover:text-orange-500 bg-transparent"
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      EDITAR
                    </Button>
                  ) : (
                    <div className="flex gap-2">
                      <Button
                        onClick={handleSaveProfile}
                        size="sm"
                        disabled={isLoading}
                        className="bg-orange-500 hover:bg-orange-600 text-black font-bold"
                      >
                        <Save className="h-4 w-4 mr-2" />
                        {isLoading ? "SALVANDO..." : "SALVAR"}
                      </Button>
                      <Button
                        onClick={handleCancelEdit}
                        variant="outline"
                        size="sm"
                        disabled={isLoading}
                        className="border-gray-700 text-gray-300 hover:border-red-500 hover:text-red-500 bg-transparent"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name" className="text-sm font-bold text-gray-300 flex items-center gap-2">
                      <User className="h-4 w-4" />
                      NOME COMPLETO
                    </Label>
                    <Input
                      id="name"
                      value={profileData.name}
                      onChange={(e) => setProfileData((prev) => ({ ...prev, name: e.target.value }))}
                      disabled={!isEditing}
                      className="bg-gray-800 border-gray-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                      placeholder="Seu nome completo"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-sm font-bold text-gray-300 flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      E-MAIL
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData((prev) => ({ ...prev, email: e.target.value }))}
                      disabled={!isEditing}
                      className="bg-gray-800 border-gray-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                      placeholder="seu@email.com"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone" className="text-sm font-bold text-gray-300 flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      TELEFONE
                    </Label>
                    <Input
                      id="phone"
                      value={profileData.phone}
                      onChange={(e) => setProfileData((prev) => ({ ...prev, phone: e.target.value }))}
                      disabled={!isEditing}
                      className="bg-gray-800 border-gray-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                      placeholder="(11) 99999-9999"
                    />
                  </div>

                  <div>
                    <Label htmlFor="birthDate" className="text-sm font-bold text-gray-300 flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      DATA DE NASCIMENTO
                    </Label>
                    <Input
                      id="birthDate"
                      type="date"
                      value={profileData.birthDate}
                      onChange={(e) => setProfileData((prev) => ({ ...prev, birthDate: e.target.value }))}
                      disabled={!isEditing}
                      className="bg-gray-800 border-gray-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <Label htmlFor="gender" className="text-sm font-bold text-gray-300 flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      GÊNERO
                    </Label>
                    <Select
                      value={profileData.gender}
                      onValueChange={(value) => setProfileData((prev) => ({ ...prev, gender: value }))}
                      disabled={!isEditing}
                    >
                      <SelectTrigger className="bg-gray-800 border-gray-700 text-white disabled:opacity-50 disabled:cursor-not-allowed">
                        <SelectValue placeholder="Selecione seu gênero" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        <SelectItem value="Masculino">Masculino</SelectItem>
                        <SelectItem value="Feminino">Feminino</SelectItem>
                        <SelectItem value="Outro">Outro</SelectItem>
                        <SelectItem value="Prefiro não informar">Prefiro não informar</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5 text-orange-500" />
                  MEUS PEDIDOS ({mockOrders.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {mockOrders.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingBag className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400 mb-2">Você ainda não fez nenhum pedido</p>
                    <p className="text-sm text-gray-500 mb-6">Explore nossa coleção e faça seu primeiro pedido!</p>
                    <Button
                      onClick={() => router.push("/shop")}
                      className="bg-orange-500 hover:bg-orange-600 text-black font-bold"
                    >
                      EXPLORAR PRODUTOS
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {mockOrders.map((order) => (
                      <Card key={order.id} className="bg-gray-800 border-gray-700">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <h3 className="font-bold text-lg">Pedido #{order.id}</h3>
                              <p className="text-gray-400 text-sm">{order.date}</p>
                            </div>
                            <div className="text-right">
                              <Badge className={`${getStatusColor(order.status)} text-white mb-2`}>
                                {getStatusText(order.status)}
                              </Badge>
                              <p className="text-lg font-bold text-orange-500">
                                R$ {order.total.toFixed(2).replace(".", ",")}
                              </p>
                            </div>
                          </div>

                          <div className="space-y-3">
                            {order.items.map((item, index) => (
                              <div key={index} className="flex items-center gap-4 p-3 bg-gray-900 rounded-lg">
                                <img
                                  src={item.productImage || "/placeholder.svg"}
                                  alt={item.productName}
                                  className="w-16 h-16 object-cover rounded-lg bg-gray-700"
                                />
                                <div className="flex-1">
                                  <h4 className="font-semibold">{item.productName}</h4>
                                  <p className="text-sm text-gray-400">
                                    Tamanho: {item.size} | Cor: {item.color} | Qtd: {item.quantity}
                                  </p>
                                </div>
                                <div className="text-right">
                                  <p className="font-bold">R$ {item.price.toFixed(2).replace(".", ",")}</p>
                                </div>
                              </div>
                            ))}
                          </div>

                          {order.trackingCode && (
                            <div className="mt-4 p-3 bg-gray-900 rounded-lg">
                              <div className="flex items-center gap-2 mb-1">
                                <Truck className="h-4 w-4 text-orange-500" />
                                <span className="text-sm font-semibold">Código de Rastreamento:</span>
                                <span className="text-sm text-orange-500 font-mono">{order.trackingCode}</span>
                              </div>
                              {order.estimatedDelivery && (
                                <p className="text-xs text-gray-400">Previsão de entrega: {order.estimatedDelivery}</p>
                              )}
                            </div>
                          )}

                          <div className="flex flex-wrap gap-2 mt-4">
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-gray-700 text-gray-300 hover:border-orange-500 hover:text-orange-500 bg-transparent"
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              VER DETALHES
                            </Button>
                            {order.trackingCode && (
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-gray-700 text-gray-300 hover:border-blue-500 hover:text-blue-500 bg-transparent"
                              >
                                <Truck className="h-4 w-4 mr-2" />
                                RASTREAR
                              </Button>
                            )}
                            {order.status === "delivered" && (
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-gray-700 text-gray-300 hover:border-yellow-500 hover:text-yellow-500 bg-transparent"
                              >
                                <Star className="h-4 w-4 mr-2" />
                                AVALIAR
                              </Button>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Favorites Tab */}
          <TabsContent value="favorites">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-orange-500" />
                    MEUS FAVORITOS ({favoritesState.count})
                  </span>
                  {favoritesState.count > 0 && (
                    <Button
                      onClick={() => router.push("/favorites")}
                      className="bg-orange-500 hover:bg-orange-600 text-black font-bold"
                    >
                      VER TODOS
                    </Button>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {favoritesState.items.length === 0 ? (
                  <div className="text-center py-12">
                    <Heart className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400 mb-2">Você ainda não tem produtos favoritos</p>
                    <p className="text-sm text-gray-500 mb-6">Adicione produtos aos favoritos para vê-los aqui!</p>
                    <Button
                      onClick={() => router.push("/shop")}
                      className="bg-orange-500 hover:bg-orange-600 text-black font-bold"
                    >
                      EXPLORAR PRODUTOS
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {favoritesState.items.slice(0, 6).map((product) => (
                      <ProductCard key={product.id} product={product} onViewDetails={handleViewProduct} />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Address Tab */}
          <TabsContent value="address">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-orange-500" />
                    ENDEREÇO DE ENTREGA
                  </span>
                  {!isEditing ? (
                    <Button
                      onClick={() => setIsEditing(true)}
                      variant="outline"
                      size="sm"
                      className="border-gray-700 text-gray-300 hover:border-orange-500 hover:text-orange-500 bg-transparent"
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      EDITAR
                    </Button>
                  ) : (
                    <div className="flex gap-2">
                      <Button
                        onClick={handleSaveProfile}
                        size="sm"
                        disabled={isLoading}
                        className="bg-orange-500 hover:bg-orange-600 text-black font-bold"
                      >
                        <Save className="h-4 w-4 mr-2" />
                        {isLoading ? "SALVANDO..." : "SALVAR"}
                      </Button>
                      <Button
                        onClick={handleCancelEdit}
                        variant="outline"
                        size="sm"
                        disabled={isLoading}
                        className="border-gray-700 text-gray-300 hover:border-red-500 hover:text-red-500 bg-transparent"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="street" className="text-sm font-bold text-gray-300">
                      RUA
                    </Label>
                    <Input
                      id="street"
                      value={profileData.address.street}
                      onChange={(e) =>
                        setProfileData((prev) => ({
                          ...prev,
                          address: { ...prev.address, street: e.target.value },
                        }))
                      }
                      disabled={!isEditing}
                      className="bg-gray-800 border-gray-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                      placeholder="Nome da rua"
                    />
                  </div>

                  <div>
                    <Label htmlFor="number" className="text-sm font-bold text-gray-300">
                      NÚMERO
                    </Label>
                    <Input
                      id="number"
                      value={profileData.address.number}
                      onChange={(e) =>
                        setProfileData((prev) => ({
                          ...prev,
                          address: { ...prev.address, number: e.target.value },
                        }))
                      }
                      disabled={!isEditing}
                      className="bg-gray-800 border-gray-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                      placeholder="123"
                    />
                  </div>

                  <div>
                    <Label htmlFor="complement" className="text-sm font-bold text-gray-300">
                      COMPLEMENTO
                    </Label>
                    <Input
                      id="complement"
                      value={profileData.address.complement}
                      onChange={(e) =>
                        setProfileData((prev) => ({
                          ...prev,
                          address: { ...prev.address, complement: e.target.value },
                        }))
                      }
                      disabled={!isEditing}
                      className="bg-gray-800 border-gray-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                      placeholder="Apto, bloco, etc. (opcional)"
                    />
                  </div>

                  <div>
                    <Label htmlFor="neighborhood" className="text-sm font-bold text-gray-300">
                      BAIRRO
                    </Label>
                    <Input
                      id="neighborhood"
                      value={profileData.address.neighborhood}
                      onChange={(e) =>
                        setProfileData((prev) => ({
                          ...prev,
                          address: { ...prev.address, neighborhood: e.target.value },
                        }))
                      }
                      disabled={!isEditing}
                      className="bg-gray-800 border-gray-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                      placeholder="Nome do bairro"
                    />
                  </div>

                  <div>
                    <Label htmlFor="city" className="text-sm font-bold text-gray-300">
                      CIDADE
                    </Label>
                    <Input
                      id="city"
                      value={profileData.address.city}
                      onChange={(e) =>
                        setProfileData((prev) => ({
                          ...prev,
                          address: { ...prev.address, city: e.target.value },
                        }))
                      }
                      disabled={!isEditing}
                      className="bg-gray-800 border-gray-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                      placeholder="Nome da cidade"
                    />
                  </div>

                  <div>
                    <Label htmlFor="state" className="text-sm font-bold text-gray-300">
                      ESTADO
                    </Label>
                    <Input
                      id="state"
                      value={profileData.address.state}
                      onChange={(e) =>
                        setProfileData((prev) => ({
                          ...prev,
                          address: { ...prev.address, state: e.target.value },
                        }))
                      }
                      disabled={!isEditing}
                      className="bg-gray-800 border-gray-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                      placeholder="SP"
                    />
                  </div>

                  <div>
                    <Label htmlFor="zipCode" className="text-sm font-bold text-gray-300">
                      CEP
                    </Label>
                    <Input
                      id="zipCode"
                      value={profileData.address.zipCode}
                      onChange={(e) =>
                        setProfileData((prev) => ({
                          ...prev,
                          address: { ...prev.address, zipCode: e.target.value },
                        }))
                      }
                      disabled={!isEditing}
                      className="bg-gray-800 border-gray-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                      placeholder="00000-000"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <div className="space-y-6">
              {/* Notifications */}
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5 text-orange-500" />
                    NOTIFICAÇÕES
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                    <div>
                      <h4 className="font-semibold">Promoções e Ofertas</h4>
                      <p className="text-sm text-gray-400">Receba ofertas exclusivas por email</p>
                    </div>
                    <input
                      type="checkbox"
                      defaultChecked
                      className="w-4 h-4 text-orange-500 bg-gray-700 border-gray-600 rounded focus:ring-orange-500"
                    />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                    <div>
                      <h4 className="font-semibold">Atualizações de Pedidos</h4>
                      <p className="text-sm text-gray-400">Status de entrega e rastreamento</p>
                    </div>
                    <input
                      type="checkbox"
                      defaultChecked
                      className="w-4 h-4 text-orange-500 bg-gray-700 border-gray-600 rounded focus:ring-orange-500"
                    />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                    <div>
                      <h4 className="font-semibold">Novos Produtos</h4>
                      <p className="text-sm text-gray-400">Seja o primeiro a saber sobre lançamentos</p>
                    </div>
                    <input
                      type="checkbox"
                      defaultChecked
                      className="w-4 h-4 text-orange-500 bg-gray-700 border-gray-600 rounded focus:ring-orange-500"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Privacy */}
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle>PRIVACIDADE</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                    <div>
                      <h4 className="font-semibold">Perfil Público</h4>
                      <p className="text-sm text-gray-400">Permitir que outros vejam suas avaliações</p>
                    </div>
                    <input
                      type="checkbox"
                      defaultChecked
                      className="w-4 h-4 text-orange-500 bg-gray-700 border-gray-600 rounded focus:ring-orange-500"
                    />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                    <div>
                      <h4 className="font-semibold">Histórico de Compras</h4>
                      <p className="text-sm text-gray-400">Usar histórico para recomendações personalizadas</p>
                    </div>
                    <input
                      type="checkbox"
                      defaultChecked
                      className="w-4 h-4 text-orange-500 bg-gray-700 border-gray-600 rounded focus:ring-orange-500"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Account Actions */}
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle>AÇÕES DA CONTA</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full justify-start border-gray-700 text-gray-300 hover:border-orange-500 hover:text-orange-500 bg-transparent"
                  >
                    Alterar Senha
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start border-gray-700 text-gray-300 hover:border-orange-500 hover:text-orange-500 bg-transparent"
                  >
                    Baixar Meus Dados
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start border-gray-700 text-gray-300 hover:border-red-500 hover:text-red-500 bg-transparent"
                  >
                    Excluir Conta
                  </Button>
                </CardContent>
              </Card>

              {/* Support */}
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle>SUPORTE</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400 text-sm mb-4">
                    Precisa de ajuda? Entre em contato conosco para suporte técnico ou dúvidas sobre sua conta.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      onClick={() => router.push("/contact")}
                      className="bg-orange-500 hover:bg-orange-600 text-black font-bold"
                    >
                      FALE CONOSCO
                    </Button>
                    <Button
                      variant="outline"
                      className="border-gray-700 text-gray-300 hover:border-orange-500 hover:text-orange-500 bg-transparent"
                      onClick={() => window.open("mailto:gabrielmgb.nd@gmail.com", "_blank")}
                    >
                      ENVIAR EMAIL
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Product Modal */}
      {selectedProduct && (
        <ProductModal product={selectedProduct} isOpen={isProductModalOpen} onClose={handleCloseProductModal} />
      )}
    </div>
  )
}
