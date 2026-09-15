import { supabase } from "../config/supabase";
import {
  CreateProductInput,
  UpdateProductInput,
} from "../schemas/productSchema";

export const productRepository = {
  async findAll() {
    return supabase
      .from("products")
      .select("*")
      .order("name", { ascending: true });
  },

  async findBySlug(slug: string) {
    return supabase.from("products").select("*").eq("slug", slug).single();
  },

  async findById(id: string) {
    return supabase.from("products").select("*").eq("id", id).single();
  },

  async create(input: CreateProductInput) {
    return supabase.from("products").insert(input).select("*").single();
  },

  async updateById(id: string, input: UpdateProductInput) {
    return supabase
      .from("products")
      .update({
        ...input,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select("*")
      .single();
  },
};
