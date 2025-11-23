"use client";
import { useSignout } from "../../../lib/hooks/auth";
import { ActionButton } from "./action-button";

export function SignoutButton() {
  const { mutate, isPending } = useSignout();

  return (
    <ActionButton onClick={() => mutate()} isLoading={isPending}>
      Logout
    </ActionButton>
  );
}
