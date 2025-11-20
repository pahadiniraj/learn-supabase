import { createActionClient } from "../../../utils/supabase/action";
import { logout } from "../logout/page";

export default async function PrivatePage() {
  const supabase = await createActionClient();

  const { data, error } = await supabase.auth.getUser();

  if (error) {
    throw error;
  }

  return (
    <>
      <div className="text-white"> {data.user?.email}</div>
      <form action={logout}>
        <button className="bg-red-600 p-2" type="submit">
          Logout
        </button>
      </form>
    </>
  );
}
