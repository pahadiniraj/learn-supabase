"use server";
import { createActionClient } from "../../utils/supabase/action";
import { Category } from "../types/category";
import { ApiResponse } from "../types/response";

export async function getAttributes(): Promise<ApiResponse<Category[]>> {
  try {
    const supabase = await createActionClient();
    const { data, error } = await supabase.from("attributes").select(`*`);

    if (error) {
      throw new Error(error.message);
    }

    return { success: true, data: data, message: "Attributes fetched success" };
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err);
      throw new Error(err.message);
    }
    throw new Error("Server error");
  }
}
