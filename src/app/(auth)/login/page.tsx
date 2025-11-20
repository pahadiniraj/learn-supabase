import Link from "next/link";
import { login } from "../action";
import { RedirectIfAuthenticated } from "../../../../utils/redirectIfAuthenticated";

export default async function LoginPage() {
  await RedirectIfAuthenticated();
  return (
    <form className="max-w-sm mx-auto mt-20 p-6 bg-white text-black shadow-lg rounded-xl space-y-4">
      <h2 className="text-2xl font-semibold text-center">Welcome Back</h2>
      <div className="flex flex-col space-y-1">
        <label htmlFor="email" className="text-sm font-medium">
          Email:
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex flex-col space-y-1">
        <label htmlFor="password" className="text-sm font-medium">
          Password:
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex items-center justify-between pt-2">
        <button
          formAction={login}
          className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
        >
          Log in
        </button>
      </div>

      <Link href={"/signup"}>Create account</Link>
    </form>
  );
}
