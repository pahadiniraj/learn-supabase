"use server";

import { redirect } from "next/navigation";
import { createActionClient } from "../../../utils/supabase/action";

export async function login(formData: FormData) {
  const supabase = await createActionClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    throw error;
  }

  redirect("/private");
}

export async function signup(formData: FormData) {
  const supabase = await createActionClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    throw error;
  }

  redirect("/login");
}

export async function logout() {
  const supabase = await createActionClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw error;
  }

  redirect("/login");
}
