export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      categories: {
        Row: {
          id: number
          name: string
          description: string | null
          created_at: string
        }
        Insert: {
          id?: number
          name: string
          description?: string | null
          created_at?: string
        }
        Update: {
          id?: number
          name?: string
          description?: string | null
          created_at?: string
        }
      }
      products: {
        Row: {
          id: number
          name: string
          description: string
          price: number
          stock_count: number
          category_id: number
          image_url: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          name: string
          description: string
          price: number
          stock_count: number
          category_id: number
          image_url: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          name?: string
          description?: string
          price?: number
          stock_count?: number
          category_id?: number
          image_url?: string
          created_at?: string
          updated_at?: string
        }
      }
      orders: {
        Row: {
          id: number
          customer_name: string
          customer_email: string
          total_amount: number
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          customer_name: string
          customer_email: string
          total_amount: number
          status: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          customer_name?: string
          customer_email?: string
          total_amount?: number
          status?: string
          created_at?: string
          updated_at?: string
        }
      }
      order_items: {
        Row: {
          id: number
          order_id: number
          product_id: number
          quantity: number
          price: number
          created_at: string
        }
        Insert: {
          id?: number
          order_id: number
          product_id: number
          quantity: number
          price: number
          created_at?: string
        }
        Update: {
          id?: number
          order_id?: number
          product_id?: number
          quantity?: number
          price?: number
          created_at?: string
        }
      }
      sales_analytics: {
        Row: {
          id: number
          date: string
          total_sales: number
          total_orders: number
          avg_order_value: number
          created_at: string
        }
        Insert: {
          id?: number
          date: string
          total_sales: number
          total_orders: number
          avg_order_value: number
          created_at?: string
        }
        Update: {
          id?: number
          date?: string
          total_sales?: number
          total_orders?: number
          avg_order_value?: number
          created_at?: string
        }
      }
      support_questions: {
        Row: {
          id: number
          question: string
          answer: string
          created_at: string
        }
        Insert: {
          id?: number
          question: string
          answer: string
          created_at?: string
        }
        Update: {
          id?: number
          question?: string
          answer?: string
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
