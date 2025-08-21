"use client";
import Link from "next/link";
import { useRouter } from "next/navigation"; // ✅ correct import in Next.js App Router
import { useState, useEffect } from "react";
import { isLoggedIn, clearTokens } from "../utils/auth";

export default function Navbar() {
  const router = useRouter();
  const [logged, setLogged] = useState(false);

  // Run only on client after mount
  useEffect(() => {
    setLogged(isLoggedIn());
  }, []);

  const logout = () => {
    clearTokens();
    setLogged(false); // update state immediately
    router.push("/login");
  };

  return (
    <nav className="fixed inset-x-0 top-0 z-30 mx-auto w-full max-w-screen-md border border-gray-100 bg-white/80 py-3 shadow backdrop-blur-lg md:top-6 md:rounded-3xl lg:max-w-screen-lg">
      <div className="px-4 flex justify-between gap-4 md:px-6 lg:px-8">
        <div class="flex shrink-0">

        <Link href="/" className="flex justify-between shrink-0 font-semibold flex items-center text-lg text-gray-900">
          UpScaleU
        </Link>
        </div>
        <div className="hidden md:flex md:items-center md:justify-end md:gap-5">
          {!logged ? (
            <>
              <Link className="hidden items-center justify-center rounded-xl bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 transition-all duration-150 hover:bg-gray-200 sm:inline-flex" href="/register">Register</Link>
              <Link className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600" href="/login">Login</Link>
              
            </>
          ) : (
            <>
              <Link className="inline-block rounded-lg px-2 py-1 text-sm font-medium text-gray-900 transition-all duration-200 hover:bg-gray-200 hover:text-gray-900" href="/dashboard">Dashboard</Link>
              <Link className="inline-block rounded-lg px-2 py-1 text-sm font-medium text-gray-900 transition-all duration-200 hover:bg-gray-200 hover:text-gray-900" href="/quiz">Quiz</Link>
              <button onClick={logout} className="inline-block rounded-lg px-2 py-1 text-sm font-medium text-gray-900 transition-all duration-200 hover:bg-gray-200 hover:text-gray-900">Logout</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
