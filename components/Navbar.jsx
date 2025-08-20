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
    <nav className="w-full border-b">
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="font-semibold">
          UpScaleU
        </Link>
        <div className="flex items-center gap-4">
          {!logged ? (
            <>
              <Link className="text-sm" href="/login">Login</Link>
              <Link className="text-sm" href="/register">Register</Link>
            </>
          ) : (
            <>
              <Link className="text-sm" href="/dashboard">Dashboard</Link>
              <button onClick={logout} className="text-sm">Logout</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
