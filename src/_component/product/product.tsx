"use client";

import { useGetBrands } from "../../../lib/hooks/brand";
import { useGetCategory } from "../../../lib/hooks/category";
import { useGetProductByQuery } from "../../../lib/hooks/product";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function Product() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Get category from query param
  const { data: categoryData, isLoading: categoryLoading } = useGetCategory();
  const categoryIdFromQuery = searchParams.get("categoryId");
  const initialCategoryId = categoryIdFromQuery
    ? Number(categoryIdFromQuery)
    : undefined;

  const brandIdFromQuery = searchParams.get("brandId");
  const initialBrandId = brandIdFromQuery
    ? Number(brandIdFromQuery)
    : undefined;

  // Keep selected category in state
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>(
    initialCategoryId
  );

  const [selectedBrands, setSelectedBrands] = useState<number | undefined>(
    initialBrandId
  );

  const { data: brandsData, isLoading: brandsLoading } = useGetBrands();

  // Fetch products based on selected category
  const { data: productData, isLoading: productLoading } = useGetProductByQuery(
    selectedCategory,
    selectedBrands
  );

  if (categoryLoading || productLoading)
    return <div className="text-center mt-10">Loading.....</div>;

  function handleCategoryChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value ? Number(e.target.value) : undefined;
    setSelectedCategory(value); // update state
    router.replace(
      value ? `/private?categoryId=${value}` : `/private`,
      { scroll: false } // optional: prevent scroll to top
    );
  }

  function handleBrandsChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value ? Number(e.target.value) : undefined;
    setSelectedBrands(value); // update state
    router.replace(
      value ? `/private?brandId=${value}` : `/private`,
      { scroll: false } // optional: prevent scroll to top
    );
  }

  return (
    <>
      <select value={selectedCategory || ""} onChange={handleCategoryChange}>
        <option value="" className="text-black">
          Select Category
        </option>
        {categoryData?.data.map((opt) => (
          <option key={opt.id} value={opt.id} className="text-black">
            {opt.name}
          </option>
        ))}
      </select>

      <select value={selectedBrands || ""} onChange={handleBrandsChange}>
        <option value="" className="text-black">
          Select brand
        </option>
        {brandsData?.data.map((opt) => (
          <option key={opt.id} value={opt.id} className="text-black">
            {opt.name}
          </option>
        ))}
      </select>

      <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {productData?.data?.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg shadow hover:shadow-lg transition p-4 bg-white text-black"
          >
            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
            <p className=" mb-1">
              <span className="font-medium">Description:</span>{" "}
              {product.description}
            </p>
            <p className=" mb-1">
              <span className="font-medium">SKU:</span> {product.sku}
            </p>
            <p className=" mb-1">
              <span className="font-medium">Price:</span> ${product.price}
            </p>
            <p className=" mb-1">
              <span className="font-medium">Category:</span>{" "}
              {product.categories?.name}
            </p>
            <p className=" text-sm mt-2">
              Created at: {new Date(product.created_at).toLocaleDateString()}
            </p>
          </div>
        ))}
        {productData?.data?.length === 0 && (
          <p className="text-center">No data for this category</p>
        )}
      </div>
    </>
  );
}
