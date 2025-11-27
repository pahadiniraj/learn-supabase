"use client";
import { useQuery } from "@tanstack/react-query";
import {
  getProducts,
  getProductsWithAttributes,
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

export function useGetProductByAttributes(
  categoryId?: number,
  brandId?: number
) {
  return useQuery({
    queryKey: ["product-with-attributes"],
    queryFn: () => getProductsWithAttributes(),
  });
}
