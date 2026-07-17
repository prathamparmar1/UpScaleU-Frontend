import { useEffect, useState } from "react";
import API from "../utils/api";
import { endpoints } from "../utils/endpoints";
import useAuthGuard from "../hooks/useAuthGuard";
import React from "react";
import { useRouter } from "next/router";

const MOTIVATION_MESSAGES = [
  "Every small step you take today is building the career you dream about.",
  "Consistency beats intensity. Show up, learn a bit, build a bit — every day.",
  "You're not behind. You're exactly where you need to be to start growing.",
  "Skills compound like interest. Invest in yourself daily.",
  "Great developers weren't born — they were built line by line, day by day."
];

// ---------- Palette (single source of truth) ----------
// ink navy   #233047  -- headings, primary buttons, primary text
// teal       #3D6B78  -- secondary accents, links
// amber      #C98A3E  -- goals / highlights / "you are here"
// sage       #4C8B5F  -- progress / growth
// parchment  #F7F5EF  -- page background
// border     #E4DFD2  -- warm hairlines

// ---------- Small presentational helpers ----------

function ProgressRing({ percent = 0, size = 104, stroke = 10 }) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div className="relative flex-shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#E4DFD2" strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#4C8B5F"
          strokeWidth={stroke}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-700 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-xl font-bold leading-none" style={{ color: "#233047" }}>
          {percent.toFixed(0)}%
        </span>
      </div>
    </div>
  );
}

function IconTarget({ className = "w-5 h-5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}

function IconMap({ className = "w-5 h-5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2Z" strokeLinejoin="round" />
      <path d="M9 4v14M15 6v14" />
    </svg>
  );
}

function IconSpark({ className = "w-5 h-5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8" />
    </svg>
  );
}

// ---------- Page ----------

export default function Dashboard() {
  const ready = useAuthGuard();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [overview, setOverview] = useState(null);
  const [error, setError] = useState("");
  const [profile, setProfile] = useState(null);
  const [motivationIndex, setMotivationIndex] = useState(0);

  const [selectedCareerForNewRoadmap, setSelectedCareerForNewRoadmap] =
    useState("");
  const [isGeneratingNew, setIsGeneratingNew] = useState(false);

  useEffect(() => {
    if (!ready) return;

    const fetchOverview = async () => {
      try {
        const { data } = await API.get(endpoints.dash.overview);
        setOverview(data);

        const recData = data.latest_recommendation?.recommendations;
        const recList = recData?.recommendations || [];
        if (recList.length > 0) {
          setSelectedCareerForNewRoadmap(recList[0].career);
        }
      } catch (e) {
        console.error("Error fetching dashboard overview:", e);
        setError("Failed to load dashboard overview.");
      } finally {
        setLoading(false);
      }
    };

    const fetchProfile = async () => {
      try {
        const { data } = await API.get(endpoints.auth.profile);
        setProfile(data);
      } catch (e) {
        console.error(e);
      }
    };

    fetchProfile();
    fetchOverview();
  }, [ready]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMotivationIndex((prev) => (prev + 1) % MOTIVATION_MESSAGES.length);
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  if (!ready) return null;

  if (loading) {
    return (
      <div className="flex items-center justify-center mt-32">
        <div className="flex items-center gap-3" style={{ color: "#3D6B78" }}>
          <span
            className="w-4 h-4 rounded-full border-2 animate-spin"
            style={{ borderColor: "#E4DFD2", borderTopColor: "#233047" }}
          />
          <span className="text-sm">Loading your dashboard…</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="max-w-md mx-auto mt-32 text-center rounded-xl p-6"
        style={{ background: "#FFFFFF", border: "1px solid #E4DFD2" }}
      >
        <p className="font-medium mb-1" style={{ color: "#B0472C" }}>
          Couldn't load your dashboard
        </p>
        <p className="text-sm" style={{ color: "#3D6B78" }}>{error}</p>
      </div>
    );
  }

  const {
    career_goal,
    latest_quiz,
    latest_roadmap,
    latest_roadmap_progress,
    latest_recommendation,
  } = overview || {};

  const overallProgress = latest_roadmap_progress?.overall?.percent || 0;
  const phaseProgress = latest_roadmap_progress?.phases || [];

  const roadmapData = latest_roadmap?.generated_roadmap || null;
  const roadmapPhases = roadmapData?.phases || [];

  const recData = latest_recommendation?.recommendations || null;
  const recList = recData?.recommendations || [];

  const handleViewFullRoadmap = () => {
    router.push("/roadmap");
  };

  const handleRetakeQuiz = () => {
    router.push("/quiz");
  };

  const handleGenerateNewRoadmapFromSelectedCareer = async () => {
    if (!latest_recommendation || !latest_recommendation.id) {
      alert("No AI recommendations found. Please generate them first.");
      return;
    }
    if (!selectedCareerForNewRoadmap) {
      alert("Please select a career to generate roadmap for.");
      return;
    }

    try {
      setIsGeneratingNew(true);
      const payload = {
        career_recommendation_id: latest_recommendation.id,
        career: selectedCareerForNewRoadmap,
      };

      await API.post(endpoints.dash.roadmapFromRecommendation, payload);

      const { data } = await API.get(endpoints.dash.overview);
      setOverview(data);
    } catch (e) {
      console.error("Error generating roadmap:", e);
      alert("Failed to generate roadmap.");
    } finally {
      setIsGeneratingNew(false);
    }
  };

  const cardStyle = { background: "#FFFFFF", border: "1px solid #E4DFD2" };

  return (
    <div
      className="mt-20 md:mt-24 mb-12 px-6 lg:px-12 xl:px-20 max-w-[1600px] mx-auto space-y-6"
      style={{ color: "#233047" }}
    >
      {/* Hero strip — greeting + career goal */}
      <div
        className="rounded-2xl p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-5"
        style={cardStyle}
      >
        <div>
          <p className="text-sm" style={{ color: "#3D6B78" }}>Welcome back</p>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            {profile?.username || "there"}
          </h1>
        </div>

        <div className="flex items-center gap-3 md:pl-6" style={{ borderLeft: "1px solid #E4DFD2" }}>
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-white"
            style={{ background: "#C98A3E" }}
          >
            <IconTarget className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide" style={{ color: "#3D6B78" }}>
              Career goal
            </p>
            <div className="flex items-center gap-2">
              <p className="font-medium">{career_goal || "Not set yet"}</p>
              <a href="/profile" className="text-xs hover:underline" style={{ color: "#3D6B78" }}>
                Update
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Row 1 — Progress */}
      <div className="rounded-2xl p-6 md:p-8" style={cardStyle}>
        <div className="flex items-center gap-2 mb-5">
          <IconSpark className="w-5 h-5" style={{ color: "#C98A3E" }} />
          <h2 className="font-semibold text-lg">Roadmap Progress</h2>
        </div>

        {latest_roadmap && latest_roadmap_progress ? (
          <div className="flex flex-col md:flex-row gap-8 md:gap-12">
            <div className="flex items-center gap-4">
              <ProgressRing percent={overallProgress} />
              <div>
                <p className="text-sm" style={{ color: "#3D6B78" }}>Overall</p>
                <p className="text-sm font-medium">
                  {latest_roadmap_progress.overall.completed_skills} of{" "}
                  {latest_roadmap_progress.overall.total_skills} skills
                </p>
              </div>
            </div>

            <div className="flex-1 space-y-4">
              {phaseProgress.map((phase, idx) => (
                <div key={idx}>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="font-medium">{phase.phase_name}</span>
                    <span style={{ color: "#3D6B78" }}>
                      {phase.completed_skills}/{phase.total_skills} · {phase.percent.toFixed(0)}%
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: "#EFEAE0" }}>
                    <div
                      className="h-2 rounded-full transition-all duration-700 ease-out"
                      style={{ width: `${phase.percent}%`, background: "#3D6B78" }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-sm mb-4" style={{ color: "#3D6B78" }}>
              No roadmap yet — take the quiz to get your first personalized plan.
            </p>
            <button
              onClick={handleRetakeQuiz}
              className="px-5 py-2.5 rounded-lg text-sm text-white"
              style={{ background: "#233047" }}
            >
              Start the quiz
            </button>
          </div>
        )}
      </div>

      {/* Row 2 — Roadmap + Recommendations */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl p-6 h-80 flex flex-col" style={cardStyle}>
          <div className="flex items-center gap-2 mb-4">
            <IconMap className="w-5 h-5" style={{ color: "#C98A3E" }} />
            <h2 className="font-semibold text-lg">Your Roadmap</h2>
          </div>

          {latest_roadmap && roadmapPhases.length > 0 ? (
            <div className="flex-1 overflow-y-auto space-y-3 pr-1">
              {roadmapPhases.map((phase, idx) => (
                <div
                  key={idx}
                  className="rounded-xl p-4 text-sm"
                  style={{ background: "#F7F5EF", border: "1px solid #E4DFD2" }}
                >
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 text-xs font-semibold flex-shrink-0" style={{ color: "#C98A3E" }}>
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <p className="font-medium">{phase.name}</p>
                      <p className="text-xs mb-1" style={{ color: "#3D6B78" }}>
                        {phase.description}
                      </p>
                      <p className="text-xs">
                        <span className="font-semibold">Skills: </span>
                        {phase.skills?.join(", ")}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center text-center">
              <p className="text-sm" style={{ color: "#3D6B78" }}>
                Your roadmap will show up here once it's generated.
              </p>
            </div>
          )}
        </div>

        <div className="rounded-2xl p-6 h-80 flex flex-col" style={cardStyle}>
          <div className="flex items-center gap-2 mb-4">
            <IconTarget className="w-5 h-5" style={{ color: "#C98A3E" }} />
            <h2 className="font-semibold text-lg">Latest Recommendations</h2>
          </div>

          {latest_recommendation && recList.length > 0 ? (
            <div className="flex-1 overflow-y-auto space-y-2.5 pr-1">
              {recList.map((rec, idx) => (
                <div
                  key={idx}
                  className="rounded-xl p-3.5"
                  style={{ background: "#F7F5EF", border: "1px solid #E4DFD2" }}
                >
                  <p className="font-medium text-sm">{rec.career}</p>
                  <p className="text-xs" style={{ color: "#3D6B78" }}>{rec.reason}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center text-center">
              <p className="text-sm" style={{ color: "#3D6B78" }}>
                Take the quiz to get career recommendations tailored to you.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Row 3 — Actions */}
      <div
        className="rounded-2xl p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
        style={cardStyle}
      >
        <div className="flex gap-3">
          <button
            className="px-5 py-2.5 rounded-lg text-sm text-white transition-opacity hover:opacity-90"
            style={{ background: "#233047" }}
            onClick={handleViewFullRoadmap}
          >
            View Full Roadmap
          </button>
          <button
            className="px-5 py-2.5 rounded-lg text-sm text-white transition-opacity hover:opacity-90"
            style={{ background: "#3D6B78" }}
            onClick={handleRetakeQuiz}
          >
            Retake Quiz
          </button>
        </div>

        {recList.length > 0 && (
          <div className="flex gap-2 items-center">
            <select
              className="rounded-lg px-3 py-2.5 text-sm bg-white"
              style={{ border: "1px solid #E4DFD2", color: "#233047" }}
              value={selectedCareerForNewRoadmap}
              onChange={(e) => setSelectedCareerForNewRoadmap(e.target.value)}
            >
              {recList.map((rec, idx) => (
                <option key={idx} value={rec.career}>
                  {rec.career}
                </option>
              ))}
            </select>

            <button
              disabled={isGeneratingNew}
              onClick={handleGenerateNewRoadmapFromSelectedCareer}
              className="px-4 py-2.5 rounded-lg text-sm transition-opacity hover:opacity-90 disabled:opacity-50"
              style={{ background: "#C98A3E", color: "#FFFFFF" }}
            >
              {isGeneratingNew ? "Generating…" : "New Roadmap"}
            </button>
          </div>
        )}
      </div>

      {/* Row 4 — Motivation */}
      <div className="rounded-2xl p-7 md:p-9 flex items-start gap-4" style={{ background: "#233047", color: "#F7F5EF" }}>
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ background: "#C98A3E" }}
        >
          <IconSpark className="w-4 h-4 text-white" />
        </div>
        <div>
          <h2 className="font-semibold text-sm uppercase tracking-wide mb-1.5" style={{ color: "#B7C4CE" }}>
            Daily Motivation
          </h2>
          <p className="text-base leading-relaxed">{MOTIVATION_MESSAGES[motivationIndex]}</p>
        </div>
      </div>
    </div>
  );
}
