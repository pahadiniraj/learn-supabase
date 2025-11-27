import { CategoryResponseType } from "./category";

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
