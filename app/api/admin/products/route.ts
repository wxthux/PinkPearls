import { type NextRequest, NextResponse } from "next/server"
import { getCurrentAdmin } from "@/lib/auth/admin-auth"
import { createProduct, getAdminProducts } from "@/lib/db/admin-products"

export async function GET(request: NextRequest) {
  try {
    const admin = await getCurrentAdmin()
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const search = searchParams.get("search") || undefined
    const categoryId = searchParams.get("category") ? Number(searchParams.get("category")) : undefined
    const page = Number(searchParams.get("page")) || 1

    const result = await getAdminProducts(search, categoryId, page)

    return NextResponse.json(result)
  } catch (error) {
    console.error("Error fetching products:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const admin = await getCurrentAdmin()
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const formData = await request.formData()
    const name = formData.get("name") as string
    const description = formData.get("description") as string
    const price = Number(formData.get("price"))
    const stock_count = Number(formData.get("stock_count"))
    const category_id = Number(formData.get("category_id"))
    const image = formData.get("image") as File | null

    const productData = {
      name,
      description,
      price,
      stock_count,
      category_id,
      ...(image && { image }),
    }

    const product = await createProduct(productData, admin.id)

    if (!product) {
      return NextResponse.json({ error: "Failed to create product" }, { status: 500 })
    }

    return NextResponse.json(product)
  } catch (error) {
    console.error("Error creating product:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
