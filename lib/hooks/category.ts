"use client";
import { useQuery } from "@tanstack/react-query";
import { getAttributesWithCategoryId, getCategory } from "../services/category";

export function useGetCategory() {
  return useQuery({
    queryKey: ["category"],
    queryFn: () => getCategory(),
  });
}

export function useGetAttributesWithCategoryId(categoryId?: number) {
  return useQuery({
    queryKey: ["attributes-with-category-id", categoryId],
    queryFn: () => getAttributesWithCategoryId(categoryId),
    enabled: !!categoryId,
  });
}
