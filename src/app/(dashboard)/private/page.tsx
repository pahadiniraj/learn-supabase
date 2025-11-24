import Product from "@/_component/product/product";
import { RedirectIfNotAuthenticated } from "../../../../utils/redirectIfNotAuthenticated";
import { SignoutButton } from "@/_component/button/signout-button";

export default async function PrivatePage() {
  await RedirectIfNotAuthenticated();

  return (
    <>
      <Product />
      <SignoutButton />
    </>
  );
}
