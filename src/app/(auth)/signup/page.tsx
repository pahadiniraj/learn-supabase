import { SignupForm } from "@/_component/auth/signup-form";
import { RedirectIfAuthenticated } from "../../../../utils/redirectIfAuthenticated";

export default async function page() {
  await RedirectIfAuthenticated();

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-4xl">
        <SignupForm />
      </div>
    </div>
  );
}
