"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { login, signout, signup } from "../services/auth";

export function useLogin() {
  const router = useRouter();

  return useMutation({
    mutationFn: login,

    onSuccess: (data) => {
      console.log("Login successful!", data);
      router.push("/private");
    },

    onError: (error) => {
      alert(error.message);
    },
  });
}

export function useSignup() {
  const router = useRouter();

  return useMutation({
    mutationFn: signup,

    onSuccess: (data) => {
      console.log("Signup successful!", data);
      router.push("/private");
    },

    onError: (error) => {
      alert(error.message);
    },
  });
}

export function useSignout() {
  const router = useRouter();

  return useMutation({
    mutationFn: signout,

    onSuccess: () => {
      console.log("Logout successful!");
      router.push("/login");
    },

    onError: (error) => {
      alert(error.message);
    },
  });
}
