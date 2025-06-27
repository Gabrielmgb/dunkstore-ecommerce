import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Instagram, MessageCircle, Mail, MapPin, Phone } from "lucide-react"
import { ADMIN_EMAIL } from "@/lib/email-service"

export default function Footer() {
  const footerLinks = {
    shop: [
      { name: "Masculino", href: "/shop?gender=masculino" },
      { name: "Feminino", href: "/shop?gender=feminino" },
      { name: "Unissex", href: "/shop?gender=unissex" },
      { name: "Lançamentos", href: "/shop?filter=lancamentos" },
      { name: "Promoções", href: "/shop?filter=promocoes" },
    ],
    support: [
      { name: "Central de Ajuda", href: "/contact" },
      { name: "Rastrear Pedido", href: "/account?tab=orders" },
      { name: "Trocas e Devoluções", href: "/contact" },
      { name: "Guia de Tamanhos", href: "/contact" },
      { name: "Fale Conosco", href: "/contact" },
    ],
    company: [
      { name: "Sobre Nós", href: "/about" },
      { name: "Nossa História", href: "/about#historia" },
      { name: "Trabalhe Conosco", href: "/contact" },
      { name: "Imprensa", href: "/contact" },
      { name: "Blog", href: "/contact" },
    ],
    legal: [
      { name: "Política de Privacidade", href: "/contact" },
      { name: "Termos de Uso", href: "/contact" },
      { name: "Política de Cookies", href: "/contact" },
      { name: "Autenticidade", href: "/about" },
    ],
  }

  return (
    <footer className="bg-gray-900 text-white">
      {/* Newsletter Section */}
      <div className="border-b border-gray-800">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl font-black mb-4">
              FIQUE POR <span className="text-orange-500">DENTRO</span>
            </h3>
            <p className="text-gray-400 mb-8 text-lg">
              Receba em primeira mão os lançamentos, promoções exclusivas e novidades do mundo sneaker
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Seu melhor e-mail"
                className="flex-1 bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-orange-500"
              />
              <Button className="bg-orange-500 hover:bg-orange-600 text-black font-bold px-8">INSCREVER</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <span className="text-2xl font-black">
                DUNK<span className="text-orange-500">STORE</span>
              </span>
            </Link>
            <p className="text-gray-400 mb-6 text-sm leading-relaxed">
              Sua loja especializada em Nike Dunk. Autenticidade garantida, entrega rápida e atendimento especializado
              para sneakerheads.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-orange-500 p-2">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-orange-500 p-2">
                <MessageCircle className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-orange-500 p-2">
                <Mail className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="text-lg font-bold mb-6">PRODUTOS</h4>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-400 hover:text-orange-500 transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="text-lg font-bold mb-6">SUPORTE</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-400 hover:text-orange-500 transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-lg font-bold mb-6">EMPRESA</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-400 hover:text-orange-500 transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-6">CONTATO</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-gray-400">
                  <p>Rua das Sneakers, 123</p>
                  <p>Vila Madalena, São Paulo - SP</p>
                  <p>CEP: 05435-000</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-orange-500 flex-shrink-0" />
                <p className="text-sm text-gray-400">(11) 99999-9999</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-orange-500 flex-shrink-0" />
                <p className="text-sm text-gray-400">{ADMIN_EMAIL}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
              <p className="text-gray-400 text-sm">© 2024 Dunkstore. Todos os direitos reservados.</p>
              <div className="flex space-x-4">
                {footerLinks.legal.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-gray-500 hover:text-orange-500 transition-colors text-xs"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-400 text-sm">Formas de pagamento:</span>
              <div className="flex space-x-2">
                <div className="w-8 h-5 bg-gray-700 rounded flex items-center justify-center">
                  <span className="text-xs text-gray-300">💳</span>
                </div>
                <div className="w-8 h-5 bg-gray-700 rounded flex items-center justify-center">
                  <span className="text-xs text-gray-300">🏦</span>
                </div>
                <div className="w-8 h-5 bg-gray-700 rounded flex items-center justify-center">
                  <span className="text-xs text-gray-300">📱</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
