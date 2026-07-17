import { useState } from "react";
import API from "../utils/api";
import { endpoints } from "../utils/endpoints";
import useAuthGuard from "../hooks/useAuthGuard";

// ---------- Palette (matches the rest of the app) ----------
// ink navy   #233047   teal #3D6B78   amber #C98A3E
// sage       #4C8B5F   parchment #F7F5EF   border #E4DFD2

function EyeIcon({ open }) {
  return open ? (
    <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
      />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ) : (
    <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.243 4.243L9.88 9.88"
      />
    </svg>
  );
}

export default function ChangePassword() {
  const ready = useAuthGuard();
  const [form, setForm] = useState({ old_password: "", new_password: "" });
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(""); // "success" | "error" | ""

  if (!ready) return null;

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setStatus("");
    try {
      await API.put(endpoints.auth.changePassword, form);
      setMessage("Password changed successfully ✔");
      setStatus("success");
      setForm({ old_password: "", new_password: "" });
    } catch (e) {
      setMessage("Failed to change password. Check your current password and try again.");
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    border: "1px solid #E4DFD2",
    color: "#233047",
    background: "#FFFFFF",
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "#F7F5EF" }}>
      <div className="w-full max-w-md rounded-2xl p-8" style={{ background: "#FFFFFF", border: "1px solid #E4DFD2" }}>
        <div
          className="w-11 h-11 rounded-full flex items-center justify-center mb-5"
          style={{ background: "#233047" }}
        >
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
            />
          </svg>
        </div>

        <h1 className="text-2xl font-bold tracking-tight mb-1" style={{ color: "#233047" }}>
          Change Password
        </h1>
        <p className="text-sm mb-6" style={{ color: "#3D6B78" }}>
          Choose a new password to keep your account secure.
        </p>

        {message && (
          <div
            className="text-sm mb-5 px-4 py-2.5 rounded-lg"
            style={{
              background: status === "success" ? "#EAF2ED" : "#FBEAE6",
              color: status === "success" ? "#2F5C3F" : "#8A3A26",
            }}
          >
            {message}
          </div>
        )}

        <form className="space-y-4" onSubmit={onSubmit}>
          <div>
            <label className="block text-sm mb-1.5" style={{ color: "#3D6B78" }}>
              Current Password
            </label>
            <div className="relative">
              <input
                className="w-full rounded-lg px-3.5 py-2.5 pr-10 text-sm outline-none focus:ring-2"
                style={inputStyle}
                type={showOld ? "text" : "password"}
                name="old_password"
                placeholder="Current password"
                value={form.old_password}
                onChange={onChange}
                required
              />
              <button
                type="button"
                onClick={() => setShowOld(!showOld)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
                style={{ color: "#3D6B78" }}
                aria-label={showOld ? "Hide password" : "Show password"}
              >
                <EyeIcon open={showOld} />
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm mb-1.5" style={{ color: "#3D6B78" }}>
              New Password
            </label>
            <div className="relative">
              <input
                className="w-full rounded-lg px-3.5 py-2.5 pr-10 text-sm outline-none focus:ring-2"
                style={inputStyle}
                type={showNew ? "text" : "password"}
                name="new_password"
                placeholder="New password"
                value={form.new_password}
                onChange={onChange}
                required
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
                style={{ color: "#3D6B78" }}
                aria-label={showNew ? "Hide password" : "Show password"}
              >
                <EyeIcon open={showNew} />
              </button>
            </div>
          </div>

          <button
            disabled={loading}
            className="w-full rounded-lg px-3 py-3 text-white font-medium transition-opacity hover:opacity-90 disabled:opacity-60"
            style={{ background: "#233047" }}
          >
            {loading ? "Updating…" : "Update Password"}
          </button>
        </form>

        <a
          href="/profile"
          className="block text-center text-sm mt-5 hover:underline"
          style={{ color: "#3D6B78" }}
        >
          ← Back to Profile
        </a>
      </div>
    </div>
  );
}