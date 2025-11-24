"use server";
import { createActionClient } from "../../utils/supabase/action";
import {
  LoginSchemaType,
  SignupSchemaType,
} from "../validation/user.validation";

export async function login(payload: LoginSchemaType) {
  try {
    const supabase = await createActionClient();
    const { error, data } = await supabase.auth.signInWithPassword(payload);

    if (error) {
      throw new Error(error.message);
    }

    return { success: true, data: data, message: "Login Success" };
  } catch (err) {
    if (err instanceof Error) {
      console.error(err);
      throw new Error(err.message);
    }
    throw new Error("Server error");
  }
}

export async function signup(payload: SignupSchemaType) {
  try {
    const supabase = await createActionClient();
    const { error, data } = await supabase.auth.signUp({
      email: payload.email,
      password: payload.password,
    });

    if (error) {
      throw new Error(error.message);
    }

    return { success: true, data: data, message: "Signup Success" };
  } catch (err) {
    if (err instanceof Error) {
      console.error(err);
      throw new Error(err.message);
    }
  }
}

export async function signout() {
  try {
    const supabase = await createActionClient();
    const { error } = await supabase.auth.signOut();

    if (error) {
      throw new Error(error.message);
    }

    return { success: true, message: "SignOut Success" };
  } catch (err) {
    if (err instanceof Error) {
      console.error(err);
    }
  }
}
