"use client";
import { useQuery } from "@tanstack/react-query";
import { getBrands, getBrandsWithBikes } from "../services/brand";

export function useGetBrandsWithBikes() {
  return useQuery({
    queryKey: ["brands-with-bikes"],
    queryFn: () => getBrandsWithBikes(),
  });
}

export function useGetBrands() {
  return useQuery({
    queryKey: ["brands"],
    queryFn: () => getBrands(),
  });
}
