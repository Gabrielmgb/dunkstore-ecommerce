"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function PhotoGallery() {
  const photos = [
    {
      id: 1,
      src: "/placeholder.svg?height=400&width=600&text=Nike+Dunk+Street+Style",
      alt: "Nike Dunk Street Style",
      title: "Street Style",
      description: "Nike Dunk no estilo urbano",
    },
    {
      id: 2,
      src: "/placeholder.svg?height=400&width=600&text=Nike+Dunk+Collection",
      alt: "Nike Dunk Collection",
      title: "Coleção Completa",
      description: "Diversos modelos Nike Dunk",
    },
    {
      id: 3,
      src: "/placeholder.svg?height=400&width=600&text=Nike+Dunk+Lifestyle",
      alt: "Nike Dunk Lifestyle",
      title: "Lifestyle",
      description: "Nike Dunk no dia a dia",
    },
    {
      id: 4,
      src: "/placeholder.svg?height=400&width=600&text=Nike+Dunk+Skateboard",
      alt: "Nike Dunk Skateboard",
      title: "Skateboard Culture",
      description: "Nike Dunk SB na cultura skate",
    },
    {
      id: 5,
      src: "/placeholder.svg?height=400&width=600&text=Nike+Dunk+Vintage",
      alt: "Nike Dunk Vintage",
      title: "Vintage Vibes",
      description: "Nike Dunk com pegada retrô",
    },
    {
      id: 6,
      src: "/placeholder.svg?height=400&width=600&text=Nike+Dunk+Fashion",
      alt: "Nike Dunk Fashion",
      title: "Fashion Forward",
      description: "Nike Dunk na moda atual",
    },
    {
      id: 7,
      src: "/placeholder.svg?height=400&width=600&text=Nike+Dunk+Colors",
      alt: "Nike Dunk Colors",
      title: "Cores Vibrantes",
      description: "Nike Dunk em diversas cores",
    },
    {
      id: 8,
      src: "/placeholder.svg?height=400&width=600&text=Nike+Dunk+Details",
      alt: "Nike Dunk Details",
      title: "Detalhes Únicos",
      description: "Detalhes exclusivos do Nike Dunk",
    },
  ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const photosPerPage = 4

  const totalPages = Math.ceil(photos.length / photosPerPage)
  const currentPhotos = photos.slice(currentIndex, currentIndex + photosPerPage)

  const goToPrevious = () => {
    setCurrentIndex((prev) => {
      const newIndex = prev - photosPerPage
      return newIndex < 0 ? Math.max(0, photos.length - photosPerPage) : newIndex
    })
  }

  const goToNext = () => {
    setCurrentIndex((prev) => {
      const newIndex = prev + photosPerPage
      return newIndex >= photos.length ? 0 : newIndex
    })
  }

  return (
    <div className="relative">
      {/* Navigation Buttons */}
      <div className="flex justify-between items-center mb-8">
        <Button
          onClick={goToPrevious}
          variant="outline"
          size="lg"
          className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-black"
        >
          <ChevronLeft className="h-5 w-5 mr-2" />      
        </Button>

        <div className="text-center">
          <span className="text-gray-400">
            {Math.floor(currentIndex / photosPerPage) + 1} de {totalPages}
          </span>
        </div>

        <Button
          onClick={goToNext}
          variant="outline"
          size="lg"
          className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-black"
        >
          <ChevronRight className="h-5 w-5 ml-2" />
        </Button>
      </div>

      {/* Photo Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {currentPhotos.map((photo, index) => (
          <div
            key={photo.id}
            className="group relative overflow-hidden rounded-lg bg-gray-800 hover:bg-gray-700 transition-all duration-300"
          >
            <div className="aspect-[3/4] relative">
              <Image
                src={photo.src || "/placeholder.svg"}
                alt={photo.alt}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Overlay Content */}
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-lg font-bold mb-1">{photo.title}</h3>
                <p className="text-sm text-gray-300">{photo.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center mt-8 space-x-2">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index * photosPerPage)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              Math.floor(currentIndex / photosPerPage) === index
                ? "bg-orange-500 scale-125"
                : "bg-gray-600 hover:bg-gray-500"
            }`}
            aria-label={`Ir para página ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
