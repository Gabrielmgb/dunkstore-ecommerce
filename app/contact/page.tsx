"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Phone, Mail, Clock, Instagram, MessageCircle, Send } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
  }

  const contactInfo = [
    {
      icon: MapPin,
      title: "ENDEREÇO",
      content: "Rua das Sneakers, 123\nVila Madalena, São Paulo - SP\nCEP: 05435-000",
    },
    {
      icon: Phone,
      title: "TELEFONE",
      content: "(11) 99999-9999\nSegunda a Sexta: 9h às 18h\nSábado: 9h às 14h",
    },
    {
      icon: Mail,
      title: "E-MAIL",
      content: "contato@dunkstore.com.br\nvendas@dunkstore.com.br\nsuporte@dunkstore.com.br",
    },
    {
      icon: Clock,
      title: "HORÁRIO",
      content: "Segunda a Sexta: 9h às 18h\nSábado: 9h às 14h\nDomingo: Fechado",
    },
  ]

  const socialLinks = [
    {
      icon: Instagram,
      name: "Instagram",
      handle: "@dunkstore_oficial",
      description: "Siga para ver os últimos lançamentos",
    },
    {
      icon: MessageCircle,
      name: "WhatsApp",
      handle: "(11) 99999-9999",
      description: "Atendimento direto e rápido",
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-black mb-4">
            FALE <span className="text-orange-500">CONOSCO</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Estamos aqui para ajudar! Entre em contato conosco através dos canais abaixo ou envie uma mensagem
            diretamente pelo formulário.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-2xl font-bold flex items-center">
                  <Send className="h-6 w-6 text-orange-500 mr-3" />
                  ENVIE SUA MENSAGEM
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name" className="text-sm font-bold text-gray-300 mb-2 block">
                        NOME COMPLETO *
                      </Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-orange-500"
                        placeholder="Seu nome completo"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-sm font-bold text-gray-300 mb-2 block">
                        E-MAIL *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-orange-500"
                        placeholder="seu@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="subject" className="text-sm font-bold text-gray-300 mb-2 block">
                      ASSUNTO *
                    </Label>
                    <Select
                      value={formData.subject}
                      onValueChange={(value) => setFormData({ ...formData, subject: value })}
                    >
                      <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                        <SelectValue placeholder="Selecione o assunto" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="duvida-produto">Dúvida sobre produto</SelectItem>
                        <SelectItem value="pedido">Acompanhar pedido</SelectItem>
                        <SelectItem value="troca-devolucao">Troca/Devolução</SelectItem>
                        <SelectItem value="sugestao">Sugestão</SelectItem>
                        <SelectItem value="reclamacao">Reclamação</SelectItem>
                        <SelectItem value="outros">Outros</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-sm font-bold text-gray-300 mb-2 block">
                      MENSAGEM *
                    </Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-orange-500 min-h-32"
                      placeholder="Descreva sua dúvida ou mensagem..."
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-orange-500 hover:bg-orange-600 text-black font-bold py-4"
                  >
                    ENVIAR MENSAGEM
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            {/* Contact Details */}
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <Card key={index} className="bg-gray-900 border-gray-800">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <info.icon className="h-6 w-6 text-orange-500 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-bold text-sm text-gray-300 mb-2">{info.title}</h3>
                        <p className="text-white text-sm whitespace-pre-line">{info.content}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Social Media */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-lg font-bold">REDES SOCIAIS</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {socialLinks.map((social, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer"
                  >
                    <social.icon className="h-8 w-8 text-orange-500" />
                    <div>
                      <h4 className="font-bold text-white">{social.name}</h4>
                      <p className="text-orange-500 text-sm">{social.handle}</p>
                      <p className="text-gray-400 text-xs">{social.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* FAQ Quick Links */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-lg font-bold">DÚVIDAS FREQUENTES</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <button className="w-full text-left p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                    <p className="text-white text-sm font-medium">Como rastrear meu pedido?</p>
                  </button>
                  <button className="w-full text-left p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                    <p className="text-white text-sm font-medium">Política de trocas e devoluções</p>
                  </button>
                  <button className="w-full text-left p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                    <p className="text-white text-sm font-medium">Como garantir a autenticidade?</p>
                  </button>
                  <button className="w-full text-left p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                    <p className="text-white text-sm font-medium">Formas de pagamento aceitas</p>
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="mt-16 text-center">
          <Card className="bg-gradient-to-r from-orange-500 to-red-600 border-none">
            <CardContent className="p-8">
              <h3 className="text-2xl font-black text-black mb-4">PRECISA DE AJUDA URGENTE?</h3>
              <p className="text-black/80 mb-6">Entre em contato direto pelo WhatsApp para atendimento imediato</p>
              <Button className="bg-black text-white hover:bg-gray-900 font-bold px-8 py-3">
                <MessageCircle className="h-5 w-5 mr-2" />
                CHAMAR NO WHATSAPP
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
