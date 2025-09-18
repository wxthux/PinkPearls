"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Share2, ShoppingCart, X, Minus, Plus } from "lucide-react"
import Image from "next/image"
import type { Product } from "@/lib/db/products"
import { useCart } from "@/lib/context/cart-context"

interface ProductDetailModalProps {
  product: (Product & { categories: { name: string } }) | null
  isOpen: boolean
  onClose: () => void
}

export default function ProductDetailModal({ product, isOpen, onClose }: ProductDetailModalProps) {
  const [quantity, setQuantity] = useState(1)
  const [isImageZoomed, setIsImageZoomed] = useState(false)
  const { addToCart } = useCart()

  if (!product) return null

  const isInStock = product.stock_count > 0
  const isLowStock = product.stock_count > 0 && product.stock_count < 10

  const handleShare = () => {
    const text = `Check out this awesome product: ${product.name} - $${product.price}\n\n${product.description}\n\nAvailable at Elantré!`
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`
    window.open(url, "_blank")
  }

  const handleAddToCart = () => {
    if (isInStock) {
      addToCart(product, quantity)
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="sr-only">Product Details</DialogTitle>
          <Button variant="ghost" size="icon" className="absolute right-4 top-4 z-10" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
          {/* Product Image */}
          <div className="relative">
            <div
              className="relative aspect-square overflow-hidden rounded-lg cursor-zoom-in"
              onMouseEnter={() => setIsImageZoomed(true)}
              onMouseLeave={() => setIsImageZoomed(false)}
            >
              <Image
                src={product.image_url || "/placeholder.svg"}
                alt={product.name}
                fill
                className={`object-cover transition-transform duration-500 ${
                  isImageZoomed ? "scale-110" : "scale-100"
                }`}
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-start justify-between mb-2">
                <h1 className="text-3xl font-bold">{product.name}</h1>
                <div className="text-2xl font-bold text-orange-500">${product.price.toFixed(2)}</div>
              </div>
              <p className="text-muted-foreground">{product.categories.name}</p>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Description</h3>
                <p className="text-muted-foreground leading-relaxed">{product.description}</p>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-medium">Availability:</span>
                {isInStock ? (
                  <Badge className={isLowStock ? "bg-yellow-500" : "bg-green-500"}>
                    {isLowStock ? `Low Stock (${product.stock_count})` : `In Stock (${product.stock_count})`}
                  </Badge>
                ) : (
                  <Badge variant="destructive">Out of Stock</Badge>
                )}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Quantity</label>
                <div className="flex items-center space-x-3">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={!isInStock}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-16 text-center font-medium text-lg">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.min(product.stock_count, quantity + 1))}
                    disabled={!isInStock || quantity >= product.stock_count}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                {isInStock && (
                  <p className="text-xs text-muted-foreground mt-1">Maximum available: {product.stock_count}</p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button
                  className="w-full bg-orange-500 hover:bg-orange-600"
                  size="lg"
                  onClick={handleAddToCart}
                  disabled={!isInStock}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart - ${(product.price * quantity).toFixed(2)}
                </Button>

                <Button variant="outline" className="w-full" onClick={handleShare}>
                  <Share2 className="mr-2 h-4 w-4" />
                  Share via WhatsApp
                </Button>
              </div>
            </div>

            {/* Product Features */}
            <div className="border-t pt-6">
              <h3 className="font-semibold mb-3">Product Features</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Premium quality materials</li>
                <li>• Professional printing technology</li>
                <li>• Fade-resistant colors</li>
                <li>• Pre-shrunk fabric</li>
                <li>• Machine washable</li>
                <li>• 30-day return policy</li>
              </ul>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
