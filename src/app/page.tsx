import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 bg-black text-white">
      <Link
        href="/login"
        className="px-6 py-3 bg-white text-black font-semibold rounded-xl hover:bg-gray-200 transition"
      >
        Get Started
      </Link>

      <Link
        href="/signup"
        className="px-6 py-3 border border-white font-semibold rounded-xl hover:bg-white hover:text-black transition"
      >
        Create Account
      </Link>
    </div>
  );
}
