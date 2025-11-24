"use client";
import { useQuery } from "@tanstack/react-query";
import { getProducts, getProductsWithQuery } from "../services/product";

export function useGetProduct() {
  return useQuery({
    queryKey: ["products"],
    queryFn: () => getProducts(),
  });
}

export function useGetProductByQuery(categoryId?: number, brandId?: number) {
  return useQuery({
    queryKey: ["product-with-query", categoryId, brandId],
    queryFn: () => getProductsWithQuery(categoryId, brandId),
  });
}
