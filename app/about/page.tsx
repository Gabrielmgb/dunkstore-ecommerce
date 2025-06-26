import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Target, Users, Award, Truck } from "lucide-react"

export default function AboutPage() {
  const stats = [
    { number: "28K+", label: "Clientes Satisfeitos" },
    { number: "50+", label: "Modelos Disponíveis" },
    { number: "100%", label: "Produtos Originais" },
    { number: "24h", label: "Suporte Ativo" },
  ]

  const values = [
    {
      icon: Target,
      title: "AUTENTICIDADE",
      description: "Todos os nossos produtos são 100% originais, direto da Nike.",
    },
    {
      icon: Users,
      title: "COMUNIDADE",
      description: "Conectamos sneakerheads e amantes da cultura urbana.",
    },
    {
      icon: Award,
      title: "QUALIDADE",
      description: "Selecionamos apenas os melhores modelos para você.",
    },
    {
      icon: Truck,
      title: "ENTREGA",
      description: "Entregamos rapidez e segurança em todo o Brasil.",
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent z-10" />
        <Image src="/banner-dunk.jpg?height=800&width=1920" alt="About Hero" fill className="object-cover" />
        <div className="relative z-20 container mx-auto px-4">
          <div className="max-w-3xl">
            <Badge className="bg-orange-500 text-black font-bold mb-6">NOSSA HISTÓRIA</Badge>
            <h1 className="text-5xl md:text-6xl font-black mb-6">
              DUNK<span className="text-orange-500">STORE</span>
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Nascemos da paixão pelos tênis Nike Dunk e pela cultura streetwear. Somos mais que uma loja - somos uma
              comunidade que celebra o estilo, a autenticidade e a expressão individual através dos sneakers.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-black text-orange-500 mb-2">{stat.number}</div>
                <div className="text-gray-400 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-black mb-6">
                NOSSA <span className="text-orange-500">MISSÃO</span>
              </h2>
              <div className="space-y-6 text-gray-300 leading-relaxed">
                <p>
                  A Dunkstore foi criada em 2020 por um grupo de amigos apaixonados por sneakers e cultura urbana.
                  Começamos pequenos, mas com um grande sonho: democratizar o acesso aos melhores Nike Dunk do mercado.
                </p>
                <p>
                  Acreditamos que cada tênis conta uma história e que o estilo é uma forma de expressão pessoal. Por
                  isso, selecionamos cuidadosamente cada modelo em nosso catálogo, garantindo que você tenha acesso
                  apenas aos produtos mais autênticos e desejados.
                </p>
                <p>
                  Hoje, somos referência no Brasil quando o assunto é Nike Dunk, atendendo milhares de clientes que
                  confiam na nossa curadoria e compromisso com a qualidade.
                </p>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/about-dunk.jpeg?height=600&width=600"
                alt="Nossa História"
                width={600}
                height={600}
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-4">
              NOSSOS <span className="text-orange-500">VALORES</span>
            </h2>
            <p className="text-gray-400 text-lg">Os pilares que guiam nossa jornada e definem quem somos</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card
                key={index}
                className="bg-black border-gray-800 text-center hover:border-orange-500 transition-colors"
              >
                <CardContent className="p-8">
                  <value.icon className="h-12 w-12 text-orange-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-4">
              NOSSO <span className="text-orange-500">TIME</span>
            </h2>
            <p className="text-gray-400 text-lg">Conheça as pessoas por trás da Dunkstore</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Marcus Silva",
                role: "CEO & Fundador",
                image: "/placeholder.svg?height=300&width=300",
                description: "Sneakerhead desde os 15 anos, Marcus transformou sua paixão em negócio.",
              },
              {
                name: "Ana Costa",
                role: "Head de Curadoria",
                image: "/placeholder.svg?height=300&width=300",
                description: "Especialista em tendências, Ana seleciona os melhores lançamentos.",
              },
              {
                name: "Pedro Santos",
                role: "Diretor de Experiência",
                image: "/placeholder.svg?height=300&width=300",
                description: "Focado em proporcionar a melhor experiência para nossos clientes.",
              },
            ].map((member, index) => (
              <Card key={index} className="bg-gray-900 border-gray-800 overflow-hidden">
                <div className="relative h-64">
                  <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                </div>
                <CardContent className="p-6 text-center">
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-orange-500 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-400 text-sm">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-red-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-black mb-4 text-black">FAÇA PARTE DA NOSSA HISTÓRIA</h2>
          <p className="text-black/80 text-lg mb-8 max-w-2xl mx-auto">
            Junte-se à comunidade Dunkstore e descubra os melhores Nike Dunk selecionados especialmente para você.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-black text-white px-8 py-4 rounded-lg font-bold hover:bg-gray-900 transition-colors">
              EXPLORAR COLEÇÃO
            </button>
            <button className="border-2 border-black text-black px-8 py-4 rounded-lg font-bold hover:bg-black hover:text-white transition-colors">
              FALE CONOSCO
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
