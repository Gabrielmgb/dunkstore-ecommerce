import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Star, Truck, Shield, Headphones } from "lucide-react"

export default function HomePage() {
  const featuredProducts = [
    {
      id: 1,
      name: "Nike Dunk Low Retro",
      price: 899.99,
      originalPrice: 1199.99,
      image: "/nike-dunk-grey.jpg?height=300&width=300",
      badge: "LANÇAMENTO",
      rating: 4.8,
    },
    {
      id: 2,
      name: "Nike Dunk High Vintage",
      price: 749.99,
      originalPrice: 999.99,
      image: "/nike-dunk-panda.jpg?height=300&width=300",
      badge: "PROMOÇÃO",
      rating: 4.9,
    },
    {
      id: 3,
      name: "Nike Dunk SB Street",
      price: 1099.99,
      image: "/nike-dunk-brown.jpg?height=300&width=300",
      badge: "EXCLUSIVO",
      rating: 4.7,
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent z-10" />
        <Image
          src="/hero-dunk.jpg?height=1080&width=1920"
          alt="Nike Dunk Hero"
          fill
          className="object-cover"
          priority
        />
        <div className="relative z-20 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tight">
            DUNK<span className="text-orange-500">STORE</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-300 font-light">Seu Nike Dunk está aqui.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-orange-500 hover:bg-orange-600 text-black font-bold px-8 py-4 text-lg"
            >
              <Link href="/shop">
                EXPLORAR COLEÇÃO
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white text-black hover:bg-white hover:text-orange-600 px-8 py-4 text-lg"
            >
              <Link href="/about">NOSSA HISTÓRIA</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <Truck className="h-12 w-12 text-orange-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">FRETE GRÁTIS</h3>
              <p className="text-gray-400">Em compras acima de R$ 299</p>
            </div>
            <div className="text-center">
              <Shield className="h-12 w-12 text-orange-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">PRODUTO ORIGINAL</h3>
              <p className="text-gray-400">100% autenticidade garantida</p>
            </div>
            <div className="text-center">
              <Headphones className="h-12 w-12 text-orange-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">SUPORTE 24/7</h3>
              <p className="text-gray-400">Atendimento especializado</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              DESTAQUES DA <span className="text-orange-500">SEMANA</span>
            </h2>
            <p className="text-gray-400 text-lg">Os modelos mais desejados pelos sneakerheads</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
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
                  <Badge className="absolute top-4 left-4 bg-orange-500 text-black font-bold">{product.badge}</Badge>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center mb-2">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-orange-500 text-orange-500" />
                      <span className="ml-1 text-sm text-gray-400">{product.rating}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">{product.name}</h3>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-2xl font-bold text-orange-500">
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
                    <Link href={`/product/${product.id}`}>VER DETALHES</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-black"
            >
              <Link href="/shop">VER TODOS OS PRODUTOS</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-black">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-black mb-4">
            FIQUE POR <span className="text-orange-500">DENTRO</span>
          </h2>
          <p className="text-gray-400 mb-8 text-lg">Receba em primeira mão os lançamentos e promoções exclusivas</p>
          <div className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Seu melhor e-mail"
              className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500"
            />
            <Button className="bg-orange-500 hover:bg-orange-600 text-black font-bold px-6">INSCREVER</Button>
          </div>
        </div>
      </section>
    </div>
  )
}
