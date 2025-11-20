import { redirect } from "next/navigation";
import { createClient } from "./supabase/server";

export async function RedirectIfAuthenticated(path = "/private") {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  if (data?.user) {
    redirect(path);
  }
}
