"use client";
import { useQuery } from "@tanstack/react-query";
import { getBikes, getBikeYear } from "../services/bikes";

export function useGetBikes() {
  return useQuery({
    queryKey: ["bikes"],
    queryFn: () => getBikes(),
  });
}

export function useGetBikeYears(bikeId: number) {
  return useQuery({
    queryKey: ["bike-year", bikeId],
    queryFn: () => getBikeYear(bikeId),
  });
}
