"use client";
import { useQuery } from "@tanstack/react-query";
import { getBrands } from "../services/brand";

export function useGetBrands() {
  return useQuery({
    queryKey: ["brands"],
    queryFn: () => getBrands(),
  });
}
