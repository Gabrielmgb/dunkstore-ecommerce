"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Share2, Copy, Facebook, Instagram, MessageCircle, Mail, Check } from "lucide-react"
import type { Product } from "@/lib/cart-context"

interface ShareModalProps {
  product: Product | null
  isOpen: boolean
  onClose: () => void
}

export default function ShareModal({ product, isOpen, onClose }: ShareModalProps) {
  const [copied, setCopied] = useState(false)

  if (!product) return null

  const productUrl = `${window.location.origin}/product/${product.id}`
  const shareText = `Confira este Nike Dunk incrível: ${product.name} - R$ ${product.price.toFixed(2).replace(".", ",")} na Dunkstore!`

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(productUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Erro ao copiar:", err)
    }
  }

  const shareOptions = [
    {
      name: "WhatsApp",
      icon: MessageCircle,
      color: "bg-green-600 hover:bg-green-700",
      action: () => {
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${shareText} ${productUrl}`)}`
        window.open(whatsappUrl, "_blank")
      },
    },
    {
      name: "Facebook",
      icon: Facebook,
      color: "bg-blue-600 hover:bg-blue-700",
      action: () => {
        const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(productUrl)}`
        window.open(facebookUrl, "_blank")
      },
    },
    {
      name: "Instagram",
      icon: Instagram,
      color: "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600",
      action: () => {
        // Instagram doesn't have direct sharing, so we copy the text
        navigator.clipboard.writeText(`${shareText} ${productUrl}`)
        alert("Link copiado! Cole no Instagram Stories ou Posts.")
      },
    },
    {
      name: "E-mail",
      icon: Mail,
      color: "bg-gray-600 hover:bg-gray-700",
      action: () => {
        const emailUrl = `mailto:?subject=${encodeURIComponent(`Confira este Nike Dunk: ${product.name}`)}&body=${encodeURIComponent(`${shareText}\n\n${productUrl}`)}`
        window.location.href = emailUrl
      },
    },
  ]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-black border-gray-800 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Share2 className="h-5 w-5 text-orange-500 mr-2" />
            COMPARTILHAR PRODUTO
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Product Preview */}
          <div className="flex items-center gap-4 p-4 bg-gray-900 rounded-lg">
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              className="w-16 h-16 object-cover rounded-lg bg-gray-800"
            />
            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-sm truncate">{product.name}</h4>
              <p className="text-orange-500 font-bold">R$ {product.price.toFixed(2).replace(".", ",")}</p>
            </div>
          </div>

          {/* Copy Link */}
          <div>
            <Label className="text-sm font-bold text-gray-300 mb-2 block">LINK DO PRODUTO</Label>
            <div className="flex gap-2">
              <Input value={productUrl} readOnly className="bg-gray-900 border-gray-700 text-white text-sm" />
              <Button
                onClick={copyToClipboard}
                variant="outline"
                className="border-gray-700 text-gray-300 hover:border-orange-500 hover:text-orange-500 bg-transparent px-3"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
            {copied && <p className="text-green-500 text-xs mt-1">Link copiado!</p>}
          </div>

          {/* Share Options */}
          <div>
            <Label className="text-sm font-bold text-gray-300 mb-3 block">COMPARTILHAR EM</Label>
            <div className="grid grid-cols-2 gap-3">
              {shareOptions.map((option) => (
                <Button
                  key={option.name}
                  onClick={option.action}
                  className={`${option.color} text-white font-bold flex items-center justify-center gap-2 py-3`}
                >
                  <option.icon className="h-4 w-4" />
                  {option.name}
                </Button>
              ))}
            </div>
          </div>

          {/* Close Button */}
          <Button
            onClick={onClose}
            variant="outline"
            className="w-full border-gray-700 text-gray-300 hover:border-gray-600 bg-transparent"
          >
            FECHAR
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
