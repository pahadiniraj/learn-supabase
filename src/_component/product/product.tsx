"use client";

import { useGetCategory } from "../../../lib/hooks/category";
import { useGetProductByQuery } from "../../../lib/hooks/product";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import FilterByBikeModel from "./filter-with-bike-model";
import { Button } from "@/components/ui/button";
import { useGetBrands } from "../../../lib/hooks/brand";

export default function Product() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const categoryIdFromQuery = searchParams.get("categoryId");
  const brandIdFromQuery = searchParams.get("brandId");
  const bikeBrandIdFromQuery = searchParams.get("bikeBrandId");
  const bikeModelIdFromQuery = searchParams.get("bikeModelId");
  const bikeYearIdFromQuery = searchParams.get("bikeYearId");

  const [selectedCategoryId, setSelectedCategoryId] = useState<
    number | undefined
  >(categoryIdFromQuery ? Number(categoryIdFromQuery) : undefined);
  const [selectedBrand, setSelectedBrand] = useState<number | undefined>(
    brandIdFromQuery ? Number(brandIdFromQuery) : undefined
  );

  const { data: categoryData, isLoading: categoryLoading } = useGetCategory();
  const { data: brandsData, isLoading: brandsLoading } = useGetBrands();

  // Convert bike params to numbers
  const bikeBrandId = bikeBrandIdFromQuery
    ? Number(bikeBrandIdFromQuery)
    : undefined;
  const bikeModelId = bikeModelIdFromQuery
    ? Number(bikeModelIdFromQuery)
    : undefined;
  const bikeYearId = bikeYearIdFromQuery
    ? Number(bikeYearIdFromQuery)
    : undefined;

  const { data: productData, isLoading: productLoading } = useGetProductByQuery(
    {
      productCategoryId: selectedCategoryId,
      productBrandId: selectedBrand,
      bikeBrandId,
      bikeModelId,
      bikeYearId,
    }
  );

  const selectedCategoryName = categoryData?.data.find(
    (cat) => cat.id === selectedCategoryId
  )?.name;

  const selectedBrandName = brandsData?.data.find(
    (b) => b.id === selectedBrand
  )?.name;

  const isLoading = categoryLoading || brandsLoading || productLoading;

  const updateParams = (paramsObj: Record<string, number | undefined>) => {
    const params = new URLSearchParams();
    Object.entries(paramsObj).forEach(([key, value]) => {
      if (value !== undefined) params.set(key, value.toString());
    });
    router.replace(`/private?${params.toString()}`, { scroll: false });
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value ? Number(e.target.value) : undefined;
    setSelectedCategoryId(value);
    // Reset all other filters when category changes
    setSelectedBrand(undefined);
    updateParams({ categoryId: value });
  };

  const handleBrandChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value ? Number(e.target.value) : undefined;
    setSelectedBrand(value);
  };

  const handleClearFilters = () => {
    setSelectedCategoryId(undefined);
    setSelectedBrand(undefined);
    router.replace("/private", { scroll: false });
  };

  if (isLoading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <>
      {/* Filters */}
      <div className="flex gap-4 p-4 items-center">
        <select
          value={selectedCategoryId || ""}
          onChange={handleCategoryChange}
          className="text-black border p-2 bg-white"
        >
          <option value="">Select Category</option>
          {categoryData?.data.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        <select
          value={selectedBrand || ""}
          onChange={handleBrandChange}
          className="text-black border p-2 bg-white"
        >
          <option value="">Select Product Brand</option>
          {brandsData?.data.map((brand) => (
            <option key={brand.id} value={brand.id}>
              {brand.name}
            </option>
          ))}
        </select>

        {selectedCategoryName === "Tires" && <FilterByBikeModel />}

        <Button
          onClick={handleClearFilters}
          className="ml-4 bg-red-500 text-white"
        >
          Clear Filters
        </Button>
      </div>

      {/* Selected Product Breadcrumb */}
      {(selectedCategoryName || selectedBrandName || bikeBrandId) && (
        <div className="p-6 text-xl   rounded mb-4">
          <p>
            Selected Products:{" "}
            {selectedCategoryName && (
              <span className="font-semibold ml-3">{selectedCategoryName}</span>
            )}
            {selectedBrandName && (
              <>
                {" -> "}
                <span className="font-semibold">{selectedBrandName}</span>
              </>
            )}
            {bikeBrandId && (
              <>
                {" > "}
                <span className="font-semibold">Bike Filter Applied</span>
              </>
            )}
          </p>
        </div>
      )}

      {/* Product Grid */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {productData?.data?.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg shadow hover:shadow-lg transition p-4 bg-white text-black"
          >
            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
            <p>
              <span className="font-medium">Description:</span>{" "}
              {product.description}
            </p>
            <p>
              <span className="font-medium">SKU:</span> {product.sku}
            </p>
            <p>
              <span className="font-medium">Price:</span> ${product.price}
            </p>
            <p>
              <span className="font-medium">Category:</span>{" "}
              {product.categories?.name}
            </p>
            <p className="text-sm mt-2">
              Created: {new Date(product.created_at).toLocaleDateString()}
            </p>
          </div>
        ))}

        {productData?.data?.length === 0 && (
          <p className="text-center col-span-full">No products found.</p>
        )}
      </div>
    </>
  );
}
