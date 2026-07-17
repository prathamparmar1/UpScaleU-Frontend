import { useState, useEffect } from "react";
import API from "../utils/api";
import { endpoints } from "../utils/endpoints";
import useAuthGuard from "../hooks/useAuthGuard";

// ---------- Palette (matches dashboard, quiz, profile, recommendations, roadmap, landing page) ----------
// ink navy   #233047   teal #3D6B78   amber #C98A3E
// sage       #4C8B5F   parchment #F7F5EF   border #E4DFD2

function getInitials(first, last) {
  const a = (first || "").trim()[0] || "";
  const b = (last || "").trim()[0] || "";
  return `${a}${b}`.toUpperCase() || "?";
}

export default function UpdateProfile() {
  const ready = useAuthGuard();
  const [form, setForm] = useState({ first_name: "", last_name: "", email: "" });
  const [goal, setGoal] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!ready) return;
    const fetchProfile = async () => {
      try {
        const { data } = await API.get(endpoints.auth.profile);
        setForm({
          first_name: data?.first_name || "",
          last_name: data?.last_name || "",
          email: data?.email || "",
        });
        setGoal(data?.career_goal || "");
      } catch (e) {
        console.error(e);
      } finally {
        setFetching(false);
      }
    };
    fetchProfile();
  }, [ready]);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await Promise.all([
        API.put(endpoints.auth.updateCareerGoal, { career_goal: goal }),
        API.put(endpoints.auth.updateProfile, form),
      ]);
      setMessage("Profile updated successfully ✔");
    } catch (e) {
      console.error(e);
      setMessage("Something went wrong while updating your profile.");
    } finally {
      setLoading(false);
    }
  };

  if (!ready) return null;

  const initials = getInitials(form.first_name, form.last_name);

  const inputStyle = {
    border: "1px solid #E4DFD2",
    color: "#233047",
    background: "#FFFFFF",
  };

  return (
    <div style={{ background: "#F7F5EF" }} className="min-h-screen py-16 md:py-24">
      <div className="lg:w-[70%] md:w-[85%] w-[94%] mx-auto" style={{ color: "#233047" }}>
        <div className="rounded-2xl p-6 md:p-10" style={{ background: "#FFFFFF", border: "1px solid #E4DFD2" }}>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-6">Update Profile</h1>

          {/* Cover + avatar preview */}
          <div
            className="w-full rounded-xl h-28 md:h-36 relative"
            style={{ background: "linear-gradient(120deg, #233047 0%, #3D6B78 55%, #4C8B5F 100%)" }}
          >
            <input type="file" name="cover" id="upload_cover" hidden />
            <label
              htmlFor="upload_cover"
              className="absolute top-3 right-3 flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg cursor-pointer"
              style={{ background: "rgba(255,255,255,0.9)", color: "#233047" }}
            >
              Change cover
              <svg className="w-4 h-4" fill="none" strokeWidth="1.8" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
                ></path>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
                ></path>
              </svg>
            </label>

            <div className="absolute -bottom-8 left-6">
              <input type="file" name="profile" id="upload_profile" hidden />
              <label htmlFor="upload_profile" className="relative cursor-pointer block">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl"
                  style={{ background: "#C98A3E", border: "3px solid #FFFFFF", boxShadow: "0 4px 14px rgba(35,48,71,0.15)" }}
                >
                  {initials}
                </div>
                <span
                  className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center"
                  style={{ background: "#233047", border: "2px solid #FFFFFF" }}
                >
                  <svg className="w-3 h-3 text-white" fill="none" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
                    ></path>
                  </svg>
                </span>
              </label>
            </div>
          </div>

          <p className="text-xs mt-10 mb-2" style={{ color: "#3D6B78" }}>
            Photo upload isn't wired to a storage backend yet — this preview shows your initials.
          </p>

          {message && (
            <div
              className="text-sm mt-4 mb-2 px-4 py-2.5 rounded-lg"
              style={{
                background: message.includes("success") ? "#EAF2ED" : "#FBEAE6",
                color: message.includes("success") ? "#2F5C3F" : "#8A3A26",
              }}
            >
              {message}
            </div>
          )}

          {fetching ? (
            <div className="flex items-center gap-3 mt-8" style={{ color: "#3D6B78" }}>
              <span
                className="w-4 h-4 rounded-full border-2 animate-spin"
                style={{ borderColor: "#E4DFD2", borderTopColor: "#233047" }}
              />
              <span className="text-sm">Loading your details…</span>
            </div>
          ) : (
            <form className="space-y-5 mt-8" onSubmit={onSubmit}>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm mb-1.5" style={{ color: "#3D6B78" }}>
                    First Name
                  </label>
                  <input
                    className="w-full rounded-lg px-3 py-2.5 text-sm outline-none"
                    style={inputStyle}
                    type="text"
                    name="first_name"
                    placeholder="First Name"
                    value={form.first_name}
                    onChange={onChange}
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1.5" style={{ color: "#3D6B78" }}>
                    Last Name
                  </label>
                  <input
                    className="w-full rounded-lg px-3 py-2.5 text-sm outline-none"
                    style={inputStyle}
                    type="text"
                    name="last_name"
                    placeholder="Last Name"
                    value={form.last_name}
                    onChange={onChange}
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm mb-1.5" style={{ color: "#3D6B78" }}>
                    Email
                  </label>
                  <input
                    className="w-full rounded-lg px-3 py-2.5 text-sm outline-none"
                    style={inputStyle}
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={onChange}
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1.5" style={{ color: "#3D6B78" }}>
                    Career Goal
                  </label>
                  <input
                    className="w-full rounded-lg px-3 py-2.5 text-sm outline-none"
                    style={inputStyle}
                    placeholder="e.g., Full Stack Developer"
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                  />
                </div>
              </div>

              <div className="w-full flex flex-col sm:flex-row justify-end gap-3 pt-4">
                <a
                  href="/profile"
                  className="rounded-lg px-6 py-2.5 text-sm font-semibold text-center transition-opacity hover:opacity-90"
                  style={{ background: "#F7F5EF", color: "#233047", border: "1px solid #E4DFD2" }}
                >
                  Back to Profile
                </a>
                <button
                  disabled={loading}
                  className="rounded-lg px-6 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
                  style={{ background: "#233047" }}
                >
                  {loading ? "Updating…" : "Update Profile"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}