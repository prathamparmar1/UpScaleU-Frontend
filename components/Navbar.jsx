import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { isLoggedIn, clearTokens } from "../utils/auth";

// ---------- Palette (matches the rest of the app) ----------
// ink navy   #233047   teal #3D6B78   amber #C98A3E
// sage       #4C8B5F   parchment #F7F5EF   border #E4DFD2

const LOGGED_OUT_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact Us" },
];

const LOGGED_IN_LINKS = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/quiz", label: "Quiz" },
  { href: "/roadmaps", label: "My Roadmaps" },
  { href: "/profile", label: "Profile" },
];

export default function Navbar() {
  const router = useRouter();
  const [logged, setLogged] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Run only on client after mount — avoids server/client mismatch since
  // isLoggedIn() reads localStorage, which doesn't exist during SSR.
  useEffect(() => {
    setLogged(isLoggedIn());
  }, [router.pathname]);

  useEffect(() => {
    setMobileOpen(false);
  }, [router.pathname]);

  const logout = () => {
    clearTokens();
    setLogged(false);
    setMobileOpen(false);
    router.push("/login");
  };

  const isActive = (href) => router.pathname === href;

  const linkClass = (href, base) =>
    `${base} ${isActive(href) ? "font-semibold" : ""}`;

  return (
    <nav
      className="fixed inset-x-0 top-0 z-30 mx-auto w-full max-w-screen-md py-3 shadow-sm backdrop-blur-lg md:top-6 md:rounded-3xl lg:max-w-screen-lg"
      style={{ background: "rgba(255,255,255,0.92)", border: "1px solid #E4DFD2" }}
    >
      <div className="px-4 flex items-center justify-between gap-4 md:px-6 lg:px-8">
        <div className="flex shrink-0">
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-xl"
            style={{ color: "#233047" }}
          >
            <img src="/logo.png" className="h-9" alt="UpScaleU logo" />
            UpScaleU
          </Link>
        </div>

        {/* Desktop links */}
        <div className="hidden md:flex md:items-center md:justify-end md:gap-2">
          {!logged ? (
            <>
              {LOGGED_OUT_LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className={linkClass(
                    l.href,
                    "inline-flex items-center justify-center rounded-3xl px-3 py-2 text-sm transition-all duration-150"
                  )}
                  style={{
                    color: "#233047",
                    background: isActive(l.href) ? "#F0EDE3" : "transparent",
                  }}
                >
                  {l.label}
                </Link>
              ))}
              <Link
                href="/register"
                className="inline-flex items-center justify-center rounded-3xl px-3 py-2 text-sm font-semibold transition-all duration-150"
                style={{ color: "#233047" }}
              >
                Register
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center justify-center rounded-3xl px-4 py-2 text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-90"
                style={{ background: "#233047" }}
              >
                Login
              </Link>
            </>
          ) : (
            <>
              {LOGGED_IN_LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="inline-block rounded-3xl px-3 py-2 text-sm transition-all duration-150"
                  style={{
                    color: "#233047",
                    background: isActive(l.href) ? "#F0EDE3" : "transparent",
                    fontWeight: isActive(l.href) ? 600 : 500,
                  }}
                >
                  {l.label}
                </Link>
              ))}
              <button
                onClick={logout}
                className="inline-block rounded-3xl px-3 py-2 text-sm font-medium transition-colors duration-150"
                style={{ color: "#8A3A26" }}
              >
                Logout
              </button>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden inline-flex items-center justify-center w-9 h-9 rounded-full flex-shrink-0"
          style={{ color: "#233047" }}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="md:hidden mt-3 mx-4 rounded-2xl overflow-hidden"
          style={{ background: "#FFFFFF", border: "1px solid #E4DFD2" }}
        >
          {!logged ? (
            <>
              {LOGGED_OUT_LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="block px-4 py-3 text-sm"
                  style={{
                    color: "#233047",
                    background: isActive(l.href) ? "#F7F5EF" : "transparent",
                    borderBottom: "1px solid #E4DFD2",
                  }}
                >
                  {l.label}
                </Link>
              ))}
              <Link
                href="/register"
                className="block px-4 py-3 text-sm"
                style={{ color: "#233047", borderBottom: "1px solid #E4DFD2" }}
              >
                Register
              </Link>
              <Link
                href="/login"
                className="block px-4 py-3 text-sm font-semibold text-white"
                style={{ background: "#233047" }}
              >
                Login
              </Link>
            </>
          ) : (
            <>
              {LOGGED_IN_LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="block px-4 py-3 text-sm"
                  style={{
                    color: "#233047",
                    background: isActive(l.href) ? "#F7F5EF" : "transparent",
                    fontWeight: isActive(l.href) ? 600 : 400,
                    borderBottom: "1px solid #E4DFD2",
                  }}
                >
                  {l.label}
                </Link>
              ))}
              <button
                onClick={logout}
                className="block w-full text-left px-4 py-3 text-sm font-medium"
                style={{ color: "#8A3A26" }}
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}