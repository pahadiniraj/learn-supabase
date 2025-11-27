"use client";
import { useQuery } from "@tanstack/react-query";
import { getAttributes } from "../services/attributes";

export function useGetAttributes() {
  return useQuery({
    queryKey: ["products"],
    queryFn: () => getAttributes(),
  });
}
