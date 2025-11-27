"use server";
import { createActionClient } from "../../utils/supabase/action";
import { BikeResponseType, BikeYearResponseType } from "../types/bikes";
import { ApiResponse } from "../types/response";

export async function getBikes(): Promise<ApiResponse<BikeResponseType[]>> {
  try {
    const supabase = await createActionClient();
    const { data, error } = await supabase.from("bikes").select(`*`);

    if (error) {
      throw new Error(error.message);
    }

    return { success: true, data: data, message: "Bikes fetched success" };
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err);
      throw new Error(err.message);
    }
    throw new Error("Server error");
  }
}

export async function getBikeYear(
  bikeId: number
): Promise<ApiResponse<BikeYearResponseType[]>> {
  try {
    const supabase = await createActionClient();
    const { data, error } = await supabase
      .from("bike_years")
      .select(`*`)
      .eq("bike_id", bikeId);

    if (error) {
      throw new Error(error.message);
    }

    return { success: true, data: data, message: "Bike years fetched success" };
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err);
      throw new Error(err.message);
    }
    throw new Error("Server error");
  }
}
