import { Category } from "./category";

export type Product = {
  id: number;
  name: string;
  description: string;
  sku: string;
  price: number;
  category_id: number;
  brand_id: number;
  created_at: string;
  categories: Category; // relation
};
