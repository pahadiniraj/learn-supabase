"use client";
import { useQuery } from "@tanstack/react-query";
import { getCategory } from "../services/category";

export function useGetCategory() {
  return useQuery({
    queryKey: ["category"],
    queryFn: () => getCategory(),
  });
}
