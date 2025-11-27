"use server";

import { createActionClient } from "../../utils/supabase/action";
import {
  ProductQuery,
  ProductsType,
  ProductsWithAttributesType,
} from "../types/product";
import { ApiResponse } from "../types/response";

export async function getProducts(): Promise<ApiResponse<ProductsType[]>> {
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
  queryParams: ProductQuery
): Promise<ApiResponse<ProductsType[]>> {
  try {
    const {
      productCategoryId,
      productBrandId,
      bikeBrandId,
      bikeModelId,
      bikeYearId,
    } = queryParams;
    const supabase = await createActionClient();

    const { data, error } = await supabase.rpc("get_products", {
      p_category_id: productCategoryId,
      p_brand_id: productBrandId,
      p_bike_brand_id: bikeBrandId,
      p_bike_id: bikeModelId,
      p_bike_year_id: bikeYearId,
    });

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

export async function getProductsWithAttributes(): Promise<
  ApiResponse<ProductsWithAttributesType[]>
> {
  try {
    const supabase = await createActionClient();

    const { data, error } = await supabase
      .from("product_attributes")
      .select(`* `);

    if (error) {
      throw new Error(error.message);
    }

    return {
      success: true,
      data: data || [],
      message: "Products Attributes fetched successfully",
    };
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err);
      throw new Error(err.message);
    }
    throw new Error("Server error");
  }
}
