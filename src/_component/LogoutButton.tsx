import { logout } from "@/app/(auth)/action";

export default function LogoutButton() {
  return (
    <form action={logout}>
      <button type="submit" className="bg-red-600 p-2">
        Logout
      </button>
    </form>
  );
}
