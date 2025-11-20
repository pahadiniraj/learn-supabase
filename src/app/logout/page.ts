"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createActionClient } from "../../../utils/supabase/action";

export const logout = async () => {
  const supabase = await createActionClient();
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.log(error);
  }

  revalidatePath("/", "layout");
  redirect("/login");
};
