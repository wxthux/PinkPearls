import Link from "next/link"
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-card border-t mt-auto">
      <div className="container px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-red-300">Pink Pearls</h3>
            <p className="text-sm text-muted-foreground">
              Your complete solution for managing apparel products, from design to delivery. Quality, innovation, and
              customer satisfaction since 2015.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-red-300 transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-red-300 transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-red-300 transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/products" className="text-muted-foreground hover:text-red-300 transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/discover" className="text-muted-foreground hover:text-red-300 transition-colors">
                  Discover
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-red-300 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/support" className="text-muted-foreground hover:text-red-300 transition-colors">
                  Support
                </Link>
              </li> <li>
                <Link href="/admin/login" className="text-muted-foreground hover:text-red-300 transition-colors">
                  Admin
                </Link>
              </li>

            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Services</h4>
            <ul className="space-y-2 text-sm">
              <li className="text-muted-foreground">Custom T-Shirt Printing</li>
              <li className="text-muted-foreground">Bulk Orders</li>
              <li className="text-muted-foreground">Design Services</li>
              <li className="text-muted-foreground">Rush Orders</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Contact Info</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-red-300" />
                <span className="text-muted-foreground">No: 888, Panadura Road, Horana, SL.</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-red-300" />
                <span className="text-muted-foreground">(94) 76 381-3687</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-red-300" />
                <span className="text-muted-foreground">nethmisd2005@gmail.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © 2025 <span className="font-medium text-foreground">Pink Pearls</span> 💎 Less is more, perfected
          </p>
          <p className="text-xs text-muted-foreground">
            Designed by <span className="font-medium">Thanuda Warnakulage</span> 🧶
          </p>
        </div>
      </div>
    </footer>
  )
}
