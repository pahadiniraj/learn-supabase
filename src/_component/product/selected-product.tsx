import React, { useState, useMemo } from "react";
import { useGetProductById } from "../../../lib/hooks/product";

type SelectedProductProps = {
  selectProduct: boolean;
  setSelectProduct: React.Dispatch<React.SetStateAction<boolean>>;
  productId: number | null;
};

function SelectedProduct({
  productId,
  selectProduct,
  setSelectProduct,
}: SelectedProductProps) {
  const { data, isLoading, error } = useGetProductById(productId);
  const product = data?.data;

  console.log(product);

  // Memoize sizes and colors
  const sizes = useMemo(
    () =>
      product?.variants
        ? Array.from(
            new Set(
              product.variants.flatMap((v) =>
                v.attributes
                  .filter((a) => a.attribute_name === "Size")
                  .map((a) => a.value)
              )
            )
          )
        : [],
    [product]
  );

  const colors = useMemo(
    () =>
      product?.variants
        ? Array.from(
            new Set(
              product.variants.flatMap((v) =>
                v.attributes
                  .filter((a) => a.attribute_name === "Color")
                  .map((a) => a.value)
              )
            )
          )
        : [],
    [product]
  );

  // Lazy initialization: only runs on first render
  const [selectedSize, setSelectedSize] = useState<string>(
    () => sizes[0] || ""
  );
  const [selectedColor, setSelectedColor] = useState<string>(
    () => colors[0] || ""
  );

  // Update state when product changes (safely) using memoized function
  if (product && selectedSize === "" && sizes.length > 0) {
    setSelectedSize(sizes[0]);
  }
  if (product && selectedColor === "" && colors.length > 0) {
    setSelectedColor(colors[0]);
  }

  const selectedVariant = useMemo(
    () =>
      product?.variants?.find(
        (v) =>
          v.attributes.some(
            (a) => a.attribute_name === "Size" && a.value === selectedSize
          ) &&
          v.attributes.some(
            (a) => a.attribute_name === "Color" && a.value === selectedColor
          )
      ),
    [selectedSize, selectedColor, product]
  );

  if (!selectProduct) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
      <div className="bg-white text-black p-6 rounded-lg w-[400px] relative max-h-[80vh] overflow-y-auto">
        <button
          className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded"
          onClick={() => setSelectProduct(false)}
        >
          Close
        </button>

        {isLoading && <p>Loading product...</p>}
        {error && <p>Error loading product</p>}
        {!isLoading && !error && product && (
          <>
            <h2 className="text-xl font-bold mb-2">{product.name}</h2>
            <p className="mb-1">
              Price: ${selectedVariant?.variant_price ?? product.price}
            </p>
            <p className="mb-1">
              SKU: {selectedVariant?.variant_sku ?? product.sku}
            </p>
            <p className="mb-2">
              Stock: {selectedVariant?.stock ?? "No Stock"}
            </p>
            <p className="mb-4">{product.description}</p>

            {/* Size Selection */}
            {sizes.length > 0 && (
              <div className="mb-4">
                <h3 className="font-semibold mb-1">Select Size:</h3>
                <select
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                  className="border p-1 rounded w-full"
                >
                  {sizes.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Color Selection */}
            {colors.length > 0 && (
              <div className="mb-4">
                <h3 className="font-semibold mb-1">Select Color:</h3>
                <select
                  value={selectedColor}
                  onChange={(e) => setSelectedColor(e.target.value)}
                  className="border p-1 rounded w-full"
                >
                  {colors.map((color) => (
                    <option key={color} value={color}>
                      {color}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default SelectedProduct;
