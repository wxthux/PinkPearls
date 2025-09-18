import { createServerSupabaseClient } from "../supabase/server"
import type { Product } from "./products"
import { put } from "@vercel/blob"
import { logProductActivity } from "./admin-analytics"

export interface CreateProductData {
  name: string
  description: string
  price: number
  stock_count: number
  category_id: number
  image?: File
}

export interface UpdateProductData extends Partial<CreateProductData> {
  id: number
}

export async function createProduct(data: CreateProductData, adminId: number): Promise<Product | null> {
  const supabase = createServerSupabaseClient()

  let imageUrl = "/placeholder.svg"
  let blobUrl = null

  // Upload image to Vercel Blob if provided
  if (data.image) {
    try {
      const blob = await put(`products/${Date.now()}-${data.image.name}`, data.image, {
        access: "public",
        token: process.env.BLOB_READ_WRITE_TOKEN,
      })
      imageUrl = blob.url
      blobUrl = blob.url
    } catch (error) {
      console.error("Error uploading image:", error)
    }
  }

  const { data: product, error } = await supabase
    .from("products")
    .insert({
      name: data.name,
      description: data.description,
      price: data.price,
      stock_count: data.stock_count,
      category_id: data.category_id,
      image_url: imageUrl,
      blob_url: blobUrl,
    })
    .select()
    .single()

  if (error) {
    console.error("Error creating product:", error)
    return null
  }

  // Log activity
  await logProductActivity(product.id, adminId, "created", {
    name: data.name,
    price: data.price,
    stock_count: data.stock_count,
  })

  return product
}

export async function updateProduct(data: UpdateProductData, adminId: number): Promise<Product | null> {
  const supabase = createServerSupabaseClient()

  // Get current product data for comparison
  const { data: currentProduct } = await supabase.from("products").select("*").eq("id", data.id).single()

  if (!currentProduct) {
    return null
  }

  const updateData: any = { ...data }
  delete updateData.id
  delete updateData.image

  // Upload new image if provided
  if (data.image) {
    try {
      const blob = await put(`products/${Date.now()}-${data.image.name}`, data.image, {
        access: "public",
        token: process.env.BLOB_READ_WRITE_TOKEN,
      })
      updateData.image_url = blob.url
      updateData.blob_url = blob.url
    } catch (error) {
      console.error("Error uploading image:", error)
    }
  }

  const { data: product, error } = await supabase
    .from("products")
    .update(updateData)
    .eq("id", data.id)
    .select()
    .single()

  if (error) {
    console.error("Error updating product:", error)
    return null
  }

  // Log activity with changes
  const changes: Record<string, any> = {}
  Object.keys(updateData).forEach((key) => {
    if (currentProduct[key] !== updateData[key]) {
      changes[key] = {
        from: currentProduct[key],
        to: updateData[key],
      }
    }
  })

  await logProductActivity(data.id, adminId, "updated", changes)

  return product
}

export async function deleteProduct(productId: number, adminId: number): Promise<boolean> {
  const supabase = createServerSupabaseClient()

  // Get product data before deletion
  const { data: product } = await supabase.from("products").select("*").eq("id", productId).single()

  if (!product) {
    return false
  }

  const { error } = await supabase.from("products").delete().eq("id", productId)

  if (error) {
    console.error("Error deleting product:", error)
    return false
  }

  // Log activity
  await logProductActivity(productId, adminId, "deleted", {
    name: product.name,
    price: product.price,
  })

  return true
}

export async function getAdminProducts(search?: string, categoryId?: number, page = 1, limit = 12) {
  const supabase = createServerSupabaseClient()
  const offset = (page - 1) * limit

  let query = supabase
    .from("products")
    .select("*, categories(name)", { count: "exact" })
    .order("created_at", { ascending: false })

  if (search) {
    query = query.ilike("name", `%${search}%`)
  }

  if (categoryId) {
    query = query.eq("category_id", categoryId)
  }

  const { data, error, count } = await query.range(offset, offset + limit - 1)

  if (error) {
    console.error("Error fetching admin products:", error)
    return { products: [], total: 0, totalPages: 0 }
  }

  return {
    products: data || [],
    total: count || 0,
    totalPages: Math.ceil((count || 0) / limit),
  }
}
