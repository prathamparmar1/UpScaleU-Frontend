import { useState } from "react";
import API from "../utils/api";
import { endpoints } from "../utils/endpoints";
import { setTokens } from "../utils/auth";
import { useRouter } from "next/router";
import Link from "next/link";

// ---------- Palette (matches the rest of the app) ----------
// ink navy   #233047   teal #3D6B78   amber #C98A3E
// sage       #4C8B5F   parchment #F7F5EF   border #E4DFD2

function errorMessage(err) {
  if (!err) return "";
  if (typeof err === "string") return err;
  if (err.detail) return err.detail;
  const firstKey = Object.keys(err)[0];
  if (firstKey) {
    const val = err[firstKey];
    return Array.isArray(val) ? val[0] : String(val);
  }
  return "Something went wrong. Please try again.";
}

export default function Login() {
  const router = useRouter();
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErr("");
    try {
      const { data } = await API.post(endpoints.auth.login, form);
      setTokens({ access: data.access, refresh: data.refresh });
      router.push("/dashboard");
    } catch (error) {
      setErr(error?.response?.data || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Left panel */}
      <div
        className="text-white p-8 md:p-12 md:w-1/2 relative overflow-hidden"
        style={{ background: "linear-gradient(150deg, #1A2438 0%, #233047 50%, #2E4A57 100%)" }}
      >
        <div className="z-10 relative">
          <h2 className="text-2xl font-bold mb-6">UpScaleU</h2>
          <div className="mt-20 md:mt-32">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome back</h1>
            <h2 className="text-2xl md:text-3xl font-semibold mb-6" style={{ color: "#E0B072" }}>
              Your roadmap is waiting
            </h2>
            <p className="max-w-md" style={{ color: "#C7CFD6" }}>
              Sign in to pick up your career quiz, roadmap progress, and AI-matched
              recommendations right where you left off.
            </p>
          </div>
        </div>

        <div className="absolute right-0 top-1/3 transform translate-x-1/4">
          <div className="relative w-64 h-64">
            <svg
              className="absolute top-10 left-10 w-16 h-16"
              style={{ color: "rgba(255,255,255,0.12)" }}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
            </svg>

            <svg
              className="absolute bottom-10 right-10 w-20 h-20"
              style={{ color: "rgba(255,255,255,0.12)" }}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
            </svg>

            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="relative w-40 h-40">
                <svg
                  className="w-40 h-40 transform rotate-45"
                  style={{ color: "#C98A3E" }}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                >
                  <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
                  <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
                  <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
                  <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <svg
          className="absolute bottom-10 left-10 w-24 h-24"
          style={{ color: "rgba(255,255,255,0.12)" }}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
        >
          <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
        </svg>
      </div>

      {/* Right panel */}
      <div className="p-8 md:p-12 md:w-1/2 flex items-center justify-center" style={{ background: "#F7F5EF" }}>
        <div className="w-full max-w-md rounded-3xl p-8" style={{ background: "#FFFFFF", boxShadow: "0 10px 40px rgba(35,48,71,0.08)" }}>
          <div className="text-right mb-6 text-sm">
            <span style={{ color: "#3D6B78" }}>No account? </span>
            <Link className="font-semibold" style={{ color: "#233047" }} href="/register">
              Sign up
            </Link>
          </div>

          <div className="mb-8">
            <p className="mb-1" style={{ color: "#3D6B78" }}>
              Welcome to <span className="font-bold" style={{ color: "#233047" }}>UpScaleU</span>
            </p>
            <h1 className="text-3xl md:text-4xl font-bold" style={{ color: "#233047" }}>
              Sign in
            </h1>
          </div>

          {err && (
            <div
              className="text-sm mb-4 px-4 py-2.5 rounded-lg"
              style={{ background: "#FBEAE6", color: "#8A3A26" }}
            >
              {errorMessage(err)}
            </div>
          )}

          <form className="space-y-4" onSubmit={onSubmit}>
            <input
              className="w-full h-12 px-3.5 rounded-lg text-sm outline-none focus:ring-2"
              style={{ border: "1px solid #E4DFD2", color: "#233047" }}
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={onChange}
              required
            />
            <input
              className="w-full h-12 px-3.5 rounded-lg text-sm outline-none focus:ring-2"
              style={{ border: "1px solid #E4DFD2", color: "#233047" }}
              name="password"
              placeholder="Password"
              type="password"
              value={form.password}
              onChange={onChange}
              required
            />
            <button
              className="w-full h-12 text-white font-medium rounded-lg transition-opacity hover:opacity-90 disabled:opacity-60"
              style={{ background: "#233047" }}
              disabled={loading}
            >
              {loading ? "Signing in…" : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}