import { useEffect, useState } from "react";
import API from "../utils/api";
import { endpoints } from "../utils/endpoints";
import useAuthGuard from "../hooks/useAuthGuard";
import React from "react";

// ---------- Palette (matches dashboard, quiz, landing page) ----------
// ink navy   #233047   teal #3D6B78   amber #C98A3E
// sage       #4C8B5F   parchment #F7F5EF   border #E4DFD2

function getInitials(first, last) {
  const a = (first || "").trim()[0] || "";
  const b = (last || "").trim()[0] || "";
  const initials = `${a}${b}`.toUpperCase();
  return initials || "?";
}

export default function Profile() {
  const ready = useAuthGuard();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [goal, setGoal] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!ready) return;
    const fetchProfile = async () => {
      try {
        const { data } = await API.get(endpoints.auth.profile);
        setProfile(data);
        setGoal(data?.career_goal || ""); // backend might add career_goal to profile
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [ready]);

  const updateGoal = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      await API.put(endpoints.auth.updateCareerGoal, { career_goal: goal });
      setMessage("Career goal updated ✔");
    } catch (e) {
      setMessage("Update failed");
    }
  };

  if (!ready) return null;

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex items-center gap-3" style={{ color: "#3D6B78" }}>
          <span
            className="w-4 h-4 rounded-full border-2 animate-spin"
            style={{ borderColor: "#E4DFD2", borderTopColor: "#233047" }}
          />
          <span className="text-sm">Loading your profile…</span>
        </div>
      </div>
    );
  }

  const cardStyle = { background: "#FFFFFF", border: "1px solid #E4DFD2" };
  const initials = getInitials(profile?.first_name, profile?.last_name);

  return (
    <div style={{ background: "#F7F5EF", color: "#233047" }}>
      <section className="w-full overflow-hidden">
        <div className="flex flex-col">
          {/* Cover */}
          <div
            className="w-full xl:h-[16rem] lg:h-[14rem] md:h-[12rem] sm:h-[10rem] h-[8rem]"
            style={{
              background:
                "linear-gradient(120deg, #233047 0%, #3D6B78 55%, #4C8B5F 100%)",
            }}
          ></div>

          <div className="sm:w-[80%] w-[90%] mx-auto flex items-end">
            <input type="file" name="profile" id="upload_profile" hidden />

            <label htmlFor="upload_profile" className="relative cursor-pointer">
              <div
                className="rounded-full lg:w-[9rem] lg:h-[9rem] md:w-[8rem] md:h-[8rem] sm:w-[7rem] sm:h-[7rem] w-[6rem] h-[6rem] flex items-center justify-center relative lg:-bottom-8 sm:-bottom-6 -bottom-4 text-white font-bold lg:text-4xl text-2xl"
                style={{
                  background: "#C98A3E",
                  border: "4px solid #FFFFFF",
                  boxShadow: "0 4px 14px rgba(35,48,71,0.15)",
                }}
              >
                {initials}
              </div>
              <span
                className="absolute bottom-0 right-0 lg:-bottom-6 sm:-bottom-4 -bottom-2 w-7 h-7 rounded-full flex items-center justify-center"
                style={{ background: "#233047", border: "2px solid #FFFFFF" }}
              >
                <svg
                  className="w-3.5 h-3.5 text-white"
                  fill="none"
                  strokeWidth="1.8"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
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
              </span>
            </label>

            <h1 className="w-full text-left my-4 sm:mx-6 mx-4 pl-2 lg:text-3xl md:text-2xl text-xl font-bold tracking-tight">
              {profile?.first_name || ""} {profile?.last_name || ""}
            </h1>
          </div>

          <div className="xl:w-[80%] lg:w-[90%] md:w-[90%] sm:w-[92%] w-[90%] mx-auto flex flex-col gap-6 relative lg:-top-2 -top-1 pb-12">
            <div
              className="rounded-2xl p-5"
              style={{ background: "#F0EDE3", border: "1px solid #E4DFD2" }}
            >
              <p className="text-sm" style={{ color: "#3D6B78" }}>
                {profile?.career_goal
                  ? `Working toward ${profile.career_goal}. Keep your roadmap and quiz answers up to date so recommendations stay accurate.`
                  : "You haven't set a career goal yet — take the quiz or update your profile to set one."}
              </p>
            </div>

            <div className="w-full grid gap-6 sm:grid-cols-2">
              {/* Career info */}
              <div className="rounded-2xl p-6" style={cardStyle}>
                <dl className="divide-y" style={{ borderColor: "#E4DFD2" }}>
                  <div className="flex flex-col pb-3">
                    <dt className="mb-1 text-sm" style={{ color: "#3D6B78" }}>
                      First Name
                    </dt>
                    <dd className="text-base font-semibold">{profile?.first_name || "—"}</dd>
                  </div>
                  <div className="flex flex-col py-3">
                    <dt className="mb-1 text-sm" style={{ color: "#3D6B78" }}>
                      Last Name
                    </dt>
                    <dd className="text-base font-semibold">{profile?.last_name || "—"}</dd>
                  </div>
                  <div className="flex flex-col py-3">
                    <dt className="mb-1 text-sm" style={{ color: "#3D6B78" }}>
                      Career Goal
                    </dt>
                    <dd className="text-base font-semibold">{profile?.career_goal || "Not set yet"}</dd>
                  </div>
                  <div className="flex flex-col pt-4">
                    <a
                      href="/updateProfile"
                      className="rounded-lg px-4 py-2.5 text-sm text-white text-center transition-opacity hover:opacity-90 w-fit"
                      style={{ background: "#233047" }}
                    >
                      Update Profile
                    </a>
                  </div>
                </dl>
              </div>

              {/* Account info */}
              <div className="rounded-2xl p-6" style={cardStyle}>
                <dl className="divide-y" style={{ borderColor: "#E4DFD2" }}>
                  <div className="flex flex-col pb-3">
                    <dt className="mb-1 text-sm" style={{ color: "#3D6B78" }}>
                      Username
                    </dt>
                    <dd className="text-base font-semibold">{profile?.username || "—"}</dd>
                  </div>
                  <div className="flex flex-col py-3">
                    <dt className="mb-1 text-sm" style={{ color: "#3D6B78" }}>
                      Profile ID
                    </dt>
                    <dd className="text-base font-semibold">{profile?.id || "—"}</dd>
                  </div>
                  <div className="flex flex-col py-3">
                    <dt className="mb-1 text-sm" style={{ color: "#3D6B78" }}>
                      Email
                    </dt>
                    <dd className="text-base font-semibold">{profile?.email || "—"}</dd>
                  </div>
                  <div className="flex flex-col pt-4">
                    <a
                      href="/change-password"
                      className="rounded-lg px-4 py-2.5 text-sm text-center transition-opacity hover:opacity-90 w-fit"
                      style={{ background: "#F7F5EF", color: "#233047", border: "1px solid #E4DFD2" }}
                    >
                      Change Password
                    </a>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}