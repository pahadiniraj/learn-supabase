import { redirect } from "next/navigation";
import { createActionClient } from "./supabase/action";

export async function RedirectIfAuthenticated(path = "/private") {
  const supabase = await createActionClient();
  const { data } = await supabase.auth.getUser();

  if (data?.user) {
    redirect(path);
  }
}
