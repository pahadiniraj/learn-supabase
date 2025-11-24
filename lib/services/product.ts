"use server";

import { createActionClient } from "../../utils/supabase/action";
import { Product } from "../types/product";
import { ApiResponse } from "../types/response";

export async function getProducts(): Promise<ApiResponse<Product[]>> {
  try {
    const supabase = await createActionClient();
    const { data, error } = await supabase
      .from("products")
      .select(`*, categories(*)`);

    if (error) {
      throw new Error(error.message);
    }

    return { success: true, data: data, message: "Product Fetch sucess" };
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err);
      throw new Error(err.message);
    }
    throw new Error("Server error");
  }
}

export async function getProductsWithQuery(
  categoryId?: number,
  brandId?: number
): Promise<ApiResponse<Product[]>> {
  try {
    const supabase = await createActionClient();

    let query = supabase.from("products").select("*");

    if (categoryId) {
      query = query.eq("category_id", categoryId); // filter by category
    }

    if (brandId) {
      query = query.eq("brand_id", brandId); // filter by brand
    }

    const { data, error } = await query;

    if (error) {
      throw new Error(error.message);
    }

    return {
      success: true,
      data: data || [],
      message: "Products fetched successfully",
    };
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err);
      throw new Error(err.message);
    }
    throw new Error("Server error");
  }
}
