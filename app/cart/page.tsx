"use client"

import { useCart } from "@/lib/context/cart-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Minus, Plus, Trash2, ShoppingBag, MessageCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

export default function CartPage() {
  const { state, updateQuantity, removeFromCart, clearCart, getCartTotal } = useCart()
  const [isCheckingOut, setIsCheckingOut] = useState(false)

  const handleCheckout = () => {
    if (state.items.length === 0) return

    setIsCheckingOut(true)

    // Create WhatsApp message
    let message = "🛍️ *New Order Request from Elantré*\n\n"
    message += "📋 *Order Details:*\n"

    state.items.forEach((item, index) => {
      message += `${index + 1}. *${item.product.name}*\n`
      message += `   • Quantity: ${item.quantity}\n`
      message += `   • Price: $${item.product.price.toFixed(2)} each\n`
      message += `   • Subtotal: $${(item.product.price * item.quantity).toFixed(2)}\n\n`
    })

    message += `💰 *Total Amount: $${getCartTotal().toFixed(2)}*\n\n`
    message += "📞 Please confirm this order and provide delivery details.\n"
    message += "Thank you for choosing Elantré! 🙏"

    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/94763813687?text=${encodedMessage}`

    window.open(whatsappUrl, "_blank")
    setIsCheckingOut(false)
  }

  if (state.items.length === 0) {
    return (
      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-6">
            <ShoppingBag className="mx-auto h-24 w-24 text-muted-foreground" />
            <h1 className="text-3xl font-bold">Your Cart is Empty</h1>
            <p className="text-muted-foreground max-w-[600px] mx-auto">
              Looks like you haven't added any items to your cart yet. Start shopping to fill it up!
            </p>
            <Link href="/products">
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="flex-1 py-12">
      <div className="container px-4 md:px-6">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Shopping Cart</h1>
          <Badge variant="secondary" className="text-lg px-3 py-1">
            {state.itemCount} {state.itemCount === 1 ? "item" : "items"}
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {state.items.map((item) => (
              <Card key={item.product.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative w-full sm:w-24 h-48 sm:h-24 flex-shrink-0">
                      <Image
                        src={item.product.image_url || "/placeholder.svg"}
                        alt={item.product.name}
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>

                    <div className="flex-1 space-y-2">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <h3 className="font-semibold text-lg">{item.product.name}</h3>
                          <p className="text-sm text-muted-foreground">{item.product.categories.name}</p>
                          <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{item.product.description}</p>
                        </div>
                        <div className="text-right mt-2 sm:mt-0">
                          <p className="text-lg font-bold">${item.product.price.toFixed(2)}</p>
                          <p className="text-sm text-muted-foreground">each</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4">
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-12 text-center font-medium">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            disabled={item.quantity >= item.product.stock_count}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <p className="font-semibold">${(item.product.price * item.quantity).toFixed(2)}</p>
                            <p className="text-xs text-muted-foreground">subtotal</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive hover:text-destructive"
                            onClick={() => removeFromCart(item.product.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {state.items.map((item) => (
                    <div key={item.product.id} className="flex justify-between text-sm">
                      <span>
                        {item.product.name} × {item.quantity}
                      </span>
                      <span>${(item.product.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>${getCartTotal().toFixed(2)}</span>
                  </div>
                </div>

                <div className="space-y-3 pt-4">
                  <Button
                    className="w-full bg-orange-500 hover:bg-orange-600"
                    size="lg"
                    onClick={handleCheckout}
                    disabled={isCheckingOut}
                  >
                    <MessageCircle className="mr-2 h-5 w-5" />
                    {isCheckingOut ? "Opening WhatsApp..." : "Checkout via WhatsApp"}
                  </Button>

                  <Button variant="outline" className="w-full" onClick={clearCart}>
                    Clear Cart
                  </Button>

                  <Link href="/products">
                    <Button variant="ghost" className="w-full">
                      Continue Shopping
                    </Button>
                  </Link>
                </div>

                <div className="text-xs text-muted-foreground pt-4 border-t">
                  <p>• Secure checkout via WhatsApp</p>
                  <p>• Free shipping on orders over $100</p>
                  <p>• 30-day return policy</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}
