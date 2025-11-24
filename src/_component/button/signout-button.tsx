"use client";
import { useSignout } from "../../../lib/hooks/auth";
import { ActionButton } from "./action-button";

export function SignoutButton() {
  const { mutate, isPending } = useSignout();

  return (
    <ActionButton
      onClick={() => mutate()}
      isLoading={isPending}
      className="bg-red-500 text-white rounded-none hover:bg-red-600"
    >
      Logout
    </ActionButton>
  );
}
