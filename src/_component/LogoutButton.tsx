import { logout } from "@/app/(auth)/action";

export default function LogoutButton() {
  return (
    <form action={logout}>
      <button type="submit">Logout</button>
    </form>
  );
}
