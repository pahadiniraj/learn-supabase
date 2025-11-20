import LogoutButton from "@/_component/LogoutButton";
import { createActionClient } from "../../../utils/supabase/action";
import { RedirectIfNotAuthenticated } from "../../../utils/redirectIfNotAuthenticated";

export default async function PrivatePage() {
  await RedirectIfNotAuthenticated();

  const supabase = await createActionClient();

  const { data, error } = await supabase.auth.getUser();

  if (error) {
    throw error;
  }

  return (
    <>
      <div className="text-white"> {data.user?.email}</div>
      <LogoutButton />
    </>
  );
}
