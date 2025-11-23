import { ActionButton } from "@/_component/button/action-button";
import { RedirectIfNotAuthenticated } from "../../../../utils/redirectIfNotAuthenticated";
import { createClient } from "../../../../utils/supabase/server";
import { SignoutButton } from "@/_component/button/signout-button";

export type Product = {
  id: number;
  category_id: number;
  brand_id: number;
  name: string;
  description: string;
  sku: string;
  price: number;
  thumbnail: string | null;
  created_at: string;
  updated_at: string;
};

export default async function PrivatePage() {
  await RedirectIfNotAuthenticated();

  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error) {
    throw error;
  }

  const { data: products, error: productError } = await supabase
    .from("products")
    .select();

  const typedProducts = products as Product[];

  if (productError) throw productError;

  console.log(typedProducts);

  return (
    <>
      <div> {data.user?.email}</div>
      <div>
        {typedProducts.map((value) => (
          <div key={value.id}>
            {value.id} {value.brand_id} {value.name}
          </div>
        ))}
      </div>
      <SignoutButton />
    </>
  );
}
