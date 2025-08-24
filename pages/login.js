import { useState } from "react";
import API from "../utils/api";
import { endpoints } from "../utils/endpoints";
import { setTokens } from "../utils/auth";
import { useRouter } from "next/router";
import Link from "next/link";

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
      <div class="bg-blue-500 text-white p-8 md:p-12 md:w-1/2 relative overflow-hidden">
        <div class="z-10 relative">
          <h2 class="text-2xl font-bold mb-6">UpScaleU</h2>
          <div class="mt-20 md:mt-32">
            <h1 class="text-4xl md:text-5xl font-bold mb-4">Sign in to</h1>
            <h2 class="text-2xl md:text-3xl font-semibold mb-6">UpScaleU is simple</h2>
            <p class="max-w-md opacity-90">
              UpScaleU is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
              industry's standard dummy text ever since the 1500s.
            </p>
          </div>
        </div>

        <div class="absolute right-0 top-1/3 transform translate-x-1/4">
          <div class="relative w-64 h-64">
            <svg class="text-white/20 absolute top-10 left-10 w-16 h-16" xmlns="http://www.w3.org/2000/svg" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
              <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
            </svg>

            <svg class="text-white/20 absolute bottom-10 right-10 w-20 h-20" xmlns="http://www.w3.org/2000/svg"
              fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              viewBox="0 0 24 24">
              <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
            </svg>

            <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div class="relative w-40 h-40">
                <svg class="text-orange-400 w-40 h-40 transform rotate-45" xmlns="http://www.w3.org/2000/svg" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                  viewBox="0 0 24 24">
                  <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
                  <path
                    d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
                  <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
                  <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <svg class="text-white/20 absolute bottom-10 left-10 w-24 h-24" xmlns="http://www.w3.org/2000/svg" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
          <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
        </svg>
      </div>

      {/* <!-- Right Section --> */}

      <div class="p-8 md:p-12 md:w-1/2 flex items-center justify-center">
      <div class="w-full max-w-md bg-white rounded-3xl shadow-lg p-8">
        <div class="text-right mb-4">
          <span class="text-gray-500">No Account?</span>
          <Link className="text-blue-500 font-medium" href="/register">Sign up</Link>
        </div>

        <div class="mb-8">
          <p class="text-gray-600 mb-1">
            Welcome to <span class="text-blue-500 font-bold">UpScaleU</span>
          </p>
          <h1 class="text-4xl font-bold text-gray-800">Sign in</h1>
        </div>

        {/* <!-- Social Login Buttons --> */}
        <div class="flex flex-col space-y-4 mb-8">
          <button class="flex items-center justify-center gap-2 h-12 border border-gray-200 rounded-md hover:bg-gray-50 text-gray-400">
              {/* <!-- Google icon can go here --> */}
              Sign in with Google
            </button>
          <div class="flex gap-4">
            <button class="flex-1 m-  h-12 border border-gray-200 rounded-md hover:bg-gray-50"> <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-blue-600"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg></button>
            <button class="flex-1 h-12 border border-gray-200 rounded-md hover:bg-gray-50"> <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gray-800"
                >
                  <path d="M9 7c-3 0-4 3-4 5.5 0 3 2 7.5 5 7.5 1.5 0 2.5-.5 3.5-1.5"></path>
                  <path d="M9 12h13"></path>
                  <path d="M15 7c3 0 4 3 4 5.5 0 3-2 7.5-5 7.5-1.5 0-2.5-.5-3.5-1.5"></path>
                </svg></button>
          </div>
        </div>
      <h1 className="text-xl font-semibold mb-4 text-gray-500">Welcome back</h1>
      {err && <div className="text-red-600 text-sm mb-3">{JSON.stringify(err)}</div>}
      <form className="space-y-6" onSubmit={onSubmit}>
        <input
          className="w-full h-12 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-500"
          name="username" placeholder="Username" value={form.username} onChange={onChange} required
        />
        <input
          className="w-full h-12 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-500"
          name="password" placeholder="Password" type="password" value={form.password} onChange={onChange} required
        />
        <button
          className="w-full h-12 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md transition duration-200"
          disabled={loading}
        >
          {loading ? "Signing in..." : "Login"}
        </button>
      </form>
    </div>
    </div>
    </div>
    

  );
}
