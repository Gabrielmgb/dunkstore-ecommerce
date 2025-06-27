"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { MapPin, Phone, Mail, Clock, Instagram, MessageCircle, Send, Search } from "lucide-react"
import { sendContactEmail, ADMIN_EMAIL } from "@/lib/email-service"
import { faqData, getAllCategories, getFAQByCategory, searchFAQ } from "@/lib/faq-data"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [faqSearch, setFaqSearch] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await sendContactEmail(formData)
      setSubmitSuccess(true)
      setFormData({ name: "", email: "", subject: "", message: "" })
    } catch (error) {
      alert("Erro ao enviar mensagem. Tente novamente.")
    } finally {
      setIsSubmitting(false)
    }
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
      content: `${ADMIN_EMAIL}\nsuporte@dunkstore.com.br\nvendas@dunkstore.com.br`,
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

  const categories = getAllCategories()
  const filteredFAQ = faqSearch
    ? searchFAQ(faqSearch)
    : selectedCategory === "all"
      ? faqData
      : getFAQByCategory(selectedCategory)

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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
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
                {submitSuccess ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Send className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-green-500 mb-2">Mensagem Enviada!</h3>
                    <p className="text-gray-400 mb-4">
                      Recebemos sua mensagem e responderemos em breve no email: {formData.email || "seu email"}
                    </p>
                    <Button
                      onClick={() => setSubmitSuccess(false)}
                      className="bg-orange-500 hover:bg-orange-600 text-black font-bold"
                    >
                      ENVIAR NOVA MENSAGEM
                    </Button>
                  </div>
                ) : (
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
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "ENVIANDO..." : "ENVIAR MENSAGEM"}
                    </Button>
                  </form>
                )}
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
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black mb-4">
              DÚVIDAS <span className="text-orange-500">FREQUENTES</span>
            </h2>
            <p className="text-gray-400 text-lg">Encontre respostas rápidas para as perguntas mais comuns</p>
          </div>

          {/* FAQ Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Buscar nas perguntas frequentes..."
                value={faqSearch}
                onChange={(e) => setFaqSearch(e.target.value)}
                className="pl-10 bg-gray-900 border-gray-700 text-white placeholder-gray-400 focus:border-orange-500"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-64 bg-gray-900 border-gray-700 text-white">
                <SelectValue placeholder="Filtrar por categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as categorias</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* FAQ Accordion */}
          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-6">
              {filteredFAQ.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-400">Nenhuma pergunta encontrada para sua busca.</p>
                </div>
              ) : (
                <Accordion type="single" collapsible className="w-full">
                  {filteredFAQ.map((faq) => (
                    <AccordionItem key={faq.id} value={`item-${faq.id}`} className="border-gray-800">
                      <AccordionTrigger className="text-left hover:text-orange-500 transition-colors">
                        <div>
                          <h3 className="font-semibold">{faq.question}</h3>
                          <p className="text-xs text-gray-500 mt-1">{faq.category}</p>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-300 leading-relaxed">{faq.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Emergency Contact */}
        <div className="text-center">
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
