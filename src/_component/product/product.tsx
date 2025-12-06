"use client";

import { useGetCategory } from "../../../lib/hooks/category";
import { useGetProductByQuery } from "../../../lib/hooks/product";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import FilterByBikeModel from "./filter-with-bike-model";
import { Button } from "@/components/ui/button";
import { useGetBrands } from "../../../lib/hooks/brand";
import FilterWithAttribute from "./filter-with-attribute";
import SelectedProduct from "./selected-product";

export default function Product() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // URL query params
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

  // State to store selected variant per product
  const [selectProduct, setSelectProduct] = useState<boolean>(false);
  const [selectProductId, setSelectProductId] = useState<number | null>(null);

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

  const { data: categoryData, isLoading: categoryLoading } = useGetCategory();
  const { data: brandsData, isLoading: brandsLoading } = useGetBrands();
  const { data: productData, isLoading: productLoading } = useGetProductByQuery(
    {
      productCategoryId: selectedCategoryId,
      productBrandId: selectedBrand,
      bikeBrandId,
      bikeModelId,
      bikeYearId,
    }
  );

  console.log(productData);

  const isLoading = categoryLoading || brandsLoading || productLoading;

  const selectedCategoryName = categoryData?.data.find(
    (cat) => cat.id === selectedCategoryId
  )?.name;

  const selectedBrandName = brandsData?.data.find(
    (b) => b.id === selectedBrand
  )?.name;

  // Update URL params
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
    setSelectedBrand(undefined); // Reset brand filter
    updateParams({ categoryId: value });
  };

  const handleBrandChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value ? Number(e.target.value) : undefined;
    setSelectedBrand(value);
    updateParams({ brandId: value });
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
        <div>
          <div className="p-6 text-xl rounded mb-4">
            <p>
              Selected Products:{" "}
              {selectedCategoryName && (
                <span className="font-semibold ml-3">
                  {selectedCategoryName}
                </span>
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
          <FilterWithAttribute selectedCategoryId={selectedCategoryId} />
        </div>
      )}

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {productData?.data?.map((product) => (
          <div
            key={product.id}
            className="bg-white text-black p-4 rounded-lg shadow hover:shadow-lg active:bg-yellow-200"
            onClick={() => {
              setSelectProduct(true);
              setSelectProductId(product.id);
            }}
          >
            <h2 className="text-lg font-semibold mb-1">{product.name}</h2>

            <p className="text-sm mb-1">SKU: {product.sku}</p>

            <p className="text-sm mb-2">Price: Rs {product.price}</p>

            <p className="text-sm mb-2">Category ID: {product.category_id}</p>

            <p className="text-sm mb-2">Description: {product.description}</p>

            <p className="text-xs mt-2 text-gray-400">
              Created: {new Date(product.created_at).toLocaleDateString()}
            </p>
          </div>
        ))}

        {productData?.data?.length === 0 && (
          <p className="text-center col-span-full text-gray-500">
            No products found.
          </p>
        )}
      </div>

      {selectProduct && (
        <SelectedProduct
          productId={selectProductId}
          selectProduct={selectProduct}
          setSelectProduct={setSelectProduct}
        />
      )}
    </>
  );
}
