import { redirect } from "next/navigation";
import { createActionClient } from "./supabase/action";

export async function RedirectIfNotAuthenticated(path = "/login") {
  const supabase = await createActionClient();
  const { data } = await supabase.auth.getUser();

  if (!data?.user) {
    redirect(path);
  }

  return data.user;
}
