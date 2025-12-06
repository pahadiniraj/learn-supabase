"use client";
import { useQuery } from "@tanstack/react-query";
import {
  getProducts,
  getProductsWithId,
  getProductsWithQuery,
} from "../services/product";
import { ProductQuery } from "../types/product";

export function useGetProduct() {
  return useQuery({
    queryKey: ["products"],
    queryFn: () => getProducts(),
  });
}

export function useGetProductByQuery(params: ProductQuery) {
  return useQuery({
    queryKey: ["product-with-query", params],
    queryFn: () => getProductsWithQuery(params),
  });
}

export function useGetProductById(productId?: number | null) {
  return useQuery({
    queryKey: ["product-with-attributes", productId],
    queryFn: () => getProductsWithId(productId),
    enabled: !!productId,
  });
}
