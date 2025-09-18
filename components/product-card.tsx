"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import type { Product } from "@/lib/db/products"
import { ShoppingCart } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/lib/context/cart-context"
import ProductDetailModal from "./product-detail-modal"

interface ProductCardProps {
  product: Product & {
    categories: {
      name: string
    }
  }
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const { addToCart } = useCart()

  const isInStock = product.stock_count > 0
  const isLowStock = product.stock_count > 0 && product.stock_count < 10

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (isInStock) {
      addToCart(product, 1)
    }
  }

  const handleCardClick = () => {
    setIsModalOpen(true)
  }

  return (
    <>
      <Card
        className={`overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg ${
          isHovered ? "transform scale-105" : ""
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleCardClick}
      >
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={product.image_url || "/placeholder.svg"}
            alt={product.name}
            fill
            className={`object-cover transition-transform duration-500 ${isHovered ? "scale-110" : "scale-100"}`}
          />
          {!isInStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <Badge variant="destructive" className="text-lg px-4 py-2">
                Out of Stock
              </Badge>
            </div>
          )}
        </div>

        <CardHeader className="p-4">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h3 className="font-semibold text-lg line-clamp-1">{product.name}</h3>
              <p className="text-sm text-muted-foreground">{product.categories.name}</p>
            </div>
            <div className="text-lg font-bold text-orange-500">${product.price.toFixed(2)}</div>
          </div>
        </CardHeader>

        <CardContent className="p-4 pt-0">
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{product.description}</p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium">Stock:</span>
              {isInStock ? (
                <Badge
                  variant="secondary"
                  className={`text-xs ${
                    isLowStock
                      ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                      : "bg-green-100 text-green-800 border-green-200"
                  }`}
                >
                  {isLowStock ? `${product.stock_count} left` : "In Stock"}
                </Badge>
              ) : (
                <Badge variant="destructive" className="text-xs">
                  Out of Stock
                </Badge>
              )}
            </div>
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0">
          <Button
            className="w-full bg-orange-500 hover:bg-orange-600"
            disabled={!isInStock}
            onClick={handleQuickAdd}
            size="sm"
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            {isInStock ? "Quick Add" : "Out of Stock"}
          </Button>
        </CardFooter>
      </Card>

      <ProductDetailModal product={product} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
