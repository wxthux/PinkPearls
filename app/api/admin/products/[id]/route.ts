import { type NextRequest, NextResponse } from "next/server"
import { getCurrentAdmin } from "@/lib/auth/admin-auth"
import { updateProduct, deleteProduct } from "@/lib/db/admin-products"

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const admin = await getCurrentAdmin()
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const productId = Number(params.id)
    const formData = await request.formData()

    const updateData: any = { id: productId }

    const name = formData.get("name") as string
    const description = formData.get("description") as string
    const price = formData.get("price") as string
    const stock_count = formData.get("stock_count") as string
    const category_id = formData.get("category_id") as string
    const image = formData.get("image") as File | null

    if (name) updateData.name = name
    if (description) updateData.description = description
    if (price) updateData.price = Number(price)
    if (stock_count) updateData.stock_count = Number(stock_count)
    if (category_id) updateData.category_id = Number(category_id)
    if (image && image.size > 0) updateData.image = image

    const product = await updateProduct(updateData, admin.id)

    if (!product) {
      return NextResponse.json({ error: "Failed to update product" }, { status: 500 })
    }

    return NextResponse.json(product)
  } catch (error) {
    console.error("Error updating product:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const admin = await getCurrentAdmin()
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const productId = Number(params.id)
    const success = await deleteProduct(productId, admin.id)

    if (!success) {
      return NextResponse.json({ error: "Failed to delete product" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting product:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
