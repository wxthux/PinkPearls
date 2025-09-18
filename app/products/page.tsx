import { getCategories, getProducts } from "@/lib/db/products"
import ProductCard from "@/components/product-card"
import ProductFilters from "@/components/product-filters"
import { Suspense } from "react"

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { search?: string; category?: string }
}) {
  const search = searchParams.search
  const categoryId = searchParams.category ? Number.parseInt(searchParams.category) : undefined

  const products = await getProducts(search, categoryId)
  const categories = await getCategories()

  return (
    <main className="flex-1 py-12">
      <div className="container px-4 md:px-6">
        <h1 className="text-3xl font-bold tracking-tight mb-8">All Products</h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1">
            <ProductFilters categories={categories} />
          </div>
          <div className="md:col-span-3">
            <Suspense fallback={<div>Loading products...</div>}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.length > 0 ? (
                  products.map((product) => <ProductCard key={product.id} product={product} />)
                ) : (
                  <div className="col-span-full text-center py-12">
                    <p className="text-muted-foreground">No products found</p>
                  </div>
                )}
              </div>
            </Suspense>
          </div>
        </div>
      </div>
    </main>
  )
}
