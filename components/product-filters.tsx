"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { Category } from "@/lib/db/products"
import { Search, X } from "lucide-react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback, useState } from "react"

interface ProductFiltersProps {
  categories: Category[]
}

export default function ProductFilters({ categories }: ProductFiltersProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "")

  // Get the currently selected category
  const currentCategory = searchParams.get("category")

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (value) {
        params.set(name, value)
      } else {
        params.delete(name)
      }
      return params.toString()
    },
    [searchParams],
  )

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    router.push(`${pathname}?${createQueryString("search", searchQuery)}`)
  }

  const handleCategoryClick = (categoryId: string) => {
    router.push(`${pathname}?${createQueryString("category", categoryId)}`)
  }

  const clearFilters = () => {
    setSearchQuery("")
    router.push(pathname)
  }

  const hasActiveFilters = searchQuery || currentCategory

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Search</h3>
        <form onSubmit={handleSearch} className="flex gap-2">
          <Input
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" size="icon" variant="ghost">
            <Search className="h-4 w-4" />
          </Button>
        </form>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={currentCategory === category.id.toString() ? "default" : "ghost"}
              className={
                currentCategory === category.id.toString()
                  ? "w-full justify-start bg-red-300 hover:bg-rose-400"
                  : "w-full justify-start"
              }
              onClick={() => handleCategoryClick(category.id.toString())}
            >
              {category.name}
            </Button>
          ))}
        </div>
      </div>

      {hasActiveFilters && (
        <Button variant="outline" className="w-full" onClick={clearFilters}>
          <X className="mr-2 h-4 w-4" /> Clear Filters
        </Button>
      )}
    </div>
  )
}
