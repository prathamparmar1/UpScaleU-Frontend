import { useState } from "react";
import API from "../utils/api";
import { endpoints } from "../utils/endpoints";
import { useRouter } from "next/router";

export default function Register() {
  const router = useRouter();
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErr("");
    try {
      await API.post(endpoints.auth.register, form);
      router.push("/login");
    } catch (error) {
      console.log("Error response:", error);
      setErr(error?.response?.data || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-xl font-semibold mb-4">Create your account</h1>
      {err && <div className="text-red-600 text-sm mb-3">{JSON.stringify(err)}</div>}
      <form className="space-y-3" onSubmit={onSubmit}>
        <input
          className="w-full border rounded-lg px-3 py-2"
          name="username" placeholder="Username" value={form.username} onChange={onChange} required
        />
        <input
          className="w-full border rounded-lg px-3 py-2"
          name="email" placeholder="Email" type="email" value={form.email} onChange={onChange}
        />
        <input
          className="w-full border rounded-lg px-3 py-2"
          name="password" placeholder="Password" type="password" value={form.password} onChange={onChange} required
        />
        <button
          className="w-full rounded-lg px-3 py-2 border bg-black text-white disabled:opacity-60"
          disabled={loading}
        >
          {loading ? "Creating..." : "Register"}
        </button>
      </form>
    </div>
  );
}
