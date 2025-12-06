import { CategoryResponseType } from "./category";

export type VariantAttribute = {
  attribute_id: number;
  attribute_name: string;
  value_id: number;
  value: string;
};

export type ProductVariant = {
  variant_id: number;
  variant_sku: string;
  variant_price: number;
  stock: number;
  attributes: VariantAttribute[];
};

export type ProductsType = {
  id: number;
  name: string;
  description: string;
  sku: string;
  price: number;
  category_id: number;
  brand_id: number;
  created_at: string;
  categories: CategoryResponseType;
};

export type ProductWithId = {
  id: number;
  name: string;
  description: string;
  sku: string;
  price: number;
  category_id: number;
  brand_id: number;
  created_at: string;
  categories: CategoryResponseType;
  variants: ProductVariant[];
};

export type ProductsWithAttributesType = {
  id: string;
  product_id: ProductsType;
  attribute_value_id: string;
};

export type ProductQuery = {
  productCategoryId?: number;
  productBrandId?: number;
  bikeBrandId?: number;
  bikeModelId?: number;
  bikeYearId?: number;
};
