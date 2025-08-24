import { useState } from "react";
import API from "../utils/api";
import { endpoints } from "../utils/endpoints";
import useAuthGuard from "../hooks/useAuthGuard";

export default function ChangePassword() {
  const ready = useAuthGuard();
  const [form, setForm] = useState({ old_password: "", new_password: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  if (!ready) return null;

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      await API.put(endpoints.auth.changePassword, form);
      setMessage("Password changed successfully ✔");
      setForm({ old_password: "", new_password: "" });
    } catch (e) {
      setMessage("Failed to change password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-30 px-8 text-black">
      <h1 className="text-xl font-semibold mb-4">Change Password</h1>
      {message && <div className="text-sm mb-3">{message}</div>}
      <form className="space-y-3" onSubmit={onSubmit}>
        <input
          className="w-full border rounded-lg px-3 py-2"
          type="password"
          name="old_password"
          placeholder="Current password"
          value={form.old_password}
          onChange={onChange}
          required
        />
        <input
          className="w-full border rounded-lg px-3 py-2"
          type="password"
          name="new_password"
          placeholder="New password"
          value={form.new_password}
          onChange={onChange}
          required
        />
        <button
          disabled={loading}
          className="w-full rounded-lg px-3 py-2 border bg-black text-white disabled:opacity-60"
        >
          {loading ? "Updating…" : "Update Password"}
        </button>
      </form>
    </div>
  );
}
