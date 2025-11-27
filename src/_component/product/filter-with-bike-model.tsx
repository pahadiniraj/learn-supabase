"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useGetBikes, useGetBikeYears } from "../../../lib/hooks/bikes";
import { useRouter, useSearchParams } from "next/navigation";
import { useGetBrandsWithBikes } from "../../../lib/hooks/brand";

export default function FilterByBikeModel() {
  const [openTab, setOpenTab] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const { data: brandData } = useGetBrandsWithBikes();
  const { data: bikeData } = useGetBikes();

  const [selectedBrandId, setSelectedBrandId] = useState<number | undefined>();
  const [selectedBikeId, setSelectedBikeId] = useState<number | undefined>();
  const [selectedYearId, setSelectedYearId] = useState<number | undefined>();

  const { data: bikeYearData } = useGetBikeYears(selectedBikeId || 0);

  function handleBrandChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value;
    setSelectedBrandId(value ? parseInt(value) : undefined);
    setSelectedBikeId(undefined);
    setSelectedYearId(undefined);
  }

  function handleBikeChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value;
    setSelectedBikeId(value ? parseInt(value) : undefined);
    setSelectedYearId(undefined);
  }

  function handleBikeYearChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value;
    setSelectedYearId(value ? parseInt(value) : undefined);
  }

  function handleSearch() {
    const params = new URLSearchParams(searchParams.toString());

    if (selectedBrandId) params.set("bikeBrandId", selectedBrandId.toString());
    else params.delete("bikeBrandId");

    if (selectedBikeId) params.set("bikeModelId", selectedBikeId.toString());
    else params.delete("bikeId");

    if (selectedYearId) params.set("bikeYearId", selectedYearId.toString());
    else params.delete("bikeYearId");

    router.replace(`/private?${params.toString()}`, { scroll: false });
    setOpenTab(false);
  }

  return (
    <>
      <Button
        className="rounded-none py-6"
        onClick={() => setOpenTab(!openTab)}
      >
        Search By Bike Model
      </Button>

      {openTab && <div className="fixed inset-0 bg-black/70 z-10"></div>}

      {openTab && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-20 bg-white shadow-lg p-6 rounded text-black">
          {/* Brand Select */}
          <select
            value={selectedBrandId ?? ""}
            onChange={handleBrandChange}
            className="text-black border p-2 bg-white border-black/40 mb-4"
          >
            <option value="">Select Bike Brand</option>
            {brandData?.data.map((brand) => (
              <option key={brand.id} value={brand.id}>
                {brand.name}
              </option>
            ))}
          </select>

          {/* Bike Select */}
          <select
            value={selectedBikeId ?? ""}
            onChange={handleBikeChange}
            className="text-black border p-2 bg-white border-black/40 mb-4"
            disabled={
              !selectedBrandId ||
              !bikeData?.data?.some((bike) => bike.brand_id === selectedBrandId)
            }
          >
            <option value="">
              {bikeData?.data?.some((bike) => bike.brand_id === selectedBrandId)
                ? "Select Bike Model"
                : "No Bike models available"}
            </option>
            {bikeData?.data
              ?.filter((bike) => bike.brand_id === selectedBrandId)
              .map((bike) => (
                <option key={bike.id} value={bike.id}>
                  {bike.model}
                </option>
              ))}
          </select>

          {/* Bike Year Select */}
          <select
            value={selectedYearId ?? ""}
            onChange={handleBikeYearChange}
            className="text-black border p-2 bg-white border-black/40 mb-4"
            disabled={!selectedBikeId}
          >
            <option value="">Select Model Year</option>
            {bikeYearData?.data.map((year) => (
              <option key={year.id} value={year.id}>
                {year.model_year}
              </option>
            ))}
          </select>

          <Button className="mt-4 w-full" onClick={handleSearch}>
            Search
          </Button>

          <Button className="mt-2 w-full" onClick={() => setOpenTab(false)}>
            Close
          </Button>
        </div>
      )}
    </>
  );
}
