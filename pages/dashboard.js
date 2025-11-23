import { useEffect, useState } from "react";
import API from "../utils/api";
import { endpoints } from "../utils/endpoints";
import useAuthGuard from "../hooks/useAuthGuard";
import React from "react";
import { useRouter } from "next/router";

const MOTIVATION_MESSAGES = [
  "Every small step you take today is building the career you dream about.",
  "Consistency beats intensity. Show up, learn a bit, build a bit — every day.",
  "You’re not behind. You’re exactly where you need to be to start growing.",
  "Skills compound like interest. Invest in yourself daily.",
  "Great developers weren’t born — they were built line by line, day by day."
];

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

  // ---------- Fetch Data ----------
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

  // Rotate motivational message
  useEffect(() => {
    const interval = setInterval(() => {
      setMotivationIndex((prev) => (prev + 1) % MOTIVATION_MESSAGES.length);
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  if (!ready) return null;
  if (loading) return <p className="text-center mt-10">Loading…</p>;
  if (error) return <p className="text-center text-red-600">{error}</p>;

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

  // ---------- Button Handlers ----------

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

      // Reload overview
      const { data } = await API.get(endpoints.dash.overview);
      setOverview(data);
    } catch (e) {
      console.error("Error generating roadmap:", e);
      alert("Failed to generate roadmap.");
    } finally {
      setIsGeneratingNew(false);
    }
  };

  return (
    <div className="text-black mt-12 mb-5 px-4 lg:px-8 space-y-6">
      {/* Page Title */}
      <div className="mb-2">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-sm text-gray-600">Welcome, {profile?.username}</p>
      </div>

      {/* Row 1 — Career Goal + Progress */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Career Goal */}
        <div className="border rounded-xl p-4 bg-white space-y-2">
          <h2 className="font-semibold text-lg">Career Goal</h2>
          <p className="text-gray-700">{career_goal || "Not set yet."}</p>
          <a href="/profile" className="text-sm text-blue-600 underline">
            Update goal
          </a>
        </div>

        {/* Progress Section */}
        <div className="border rounded-xl p-4 bg-white space-y-3">
          <h2 className="font-semibold text-lg">Roadmap Progress</h2>
          {latest_roadmap && latest_roadmap_progress ? (
            <>
              <p className="text-sm text-gray-600">Overall Progress</p>
              <div className="w-full bg-gray-200 h-3 rounded-full">
                <div
                  className="h-3 bg-green-500 rounded-full"
                  style={{ width: `${overallProgress}%` }}
                ></div>
              </div>
              <p className="text-xs">
                {overallProgress.toFixed(1)}% ({latest_roadmap_progress.overall.completed_skills}/
                {latest_roadmap_progress.overall.total_skills})
              </p>

              <div className="space-y-2">
                {phaseProgress.map((phase, idx) => (
                  <div key={idx} className="text-xs">
                    <div className="flex justify-between">
                      <span className="font-medium">{phase.phase_name}</span>
                      <span>
                        {phase.completed_skills}/{phase.total_skills} (
                        {phase.percent.toFixed(0)}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 h-2 rounded-full">
                      <div
                        className="h-2 bg-blue-500 rounded-full"
                        style={{ width: `${phase.percent}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p className="text-gray-700 text-sm">
              You don’t have a roadmap yet.
            </p>
          )}
        </div>
      </div>

      {/* Row 2 — Roadmap + Recommendations */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Roadmap Summary */}
        <div className="border rounded-xl p-4 h-64 bg-white flex flex-col">
          <h2 className="font-semibold text-lg mb-2">Your Roadmap</h2>

          {latest_roadmap && roadmapPhases.length > 0 ? (
            <div className="flex-1 overflow-y-auto space-y-3">
              {roadmapPhases.map((phase, idx) => (
                <div key={idx} className="border bg-gray-50 rounded-lg p-3 text-sm">
                  <p className="font-medium">{phase.name}</p>
                  <p className="text-xs text-gray-600 mb-1">{phase.description}</p>
                  <p className="text-xs">
                    <span className="font-semibold">Skills: </span>
                    {phase.skills?.join(", ")}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-700">
              You don't have a roadmap yet.
            </p>
          )}
        </div>

        {/* Recommendations */}
        <div className="border rounded-xl p-4 h-64 bg-white flex flex-col">
          <h2 className="font-semibold text-lg mb-2">Latest Recommendations</h2>

          {latest_recommendation && recList.length > 0 ? (
            <div className="flex-1 overflow-y-auto space-y-2 text-sm">
              {recList.map((rec, idx) => (
                <div key={idx} className="border rounded-lg p-2 bg-gray-50">
                  <p className="font-medium">{rec.career}</p>
                  <p className="text-xs text-gray-600">{rec.reason}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-700">No recommendations yet.</p>
          )}
        </div>
      </div>

      {/* Row 3 — Buttons Row */}
      <div className="grid mt-2 gap-3 md:grid-cols-3 items-center">
        {/* LEFT → View Full Roadmap */}
        <div className="flex justify-start">
          <button
            className="px-4 py-2 bg-black text-white rounded-lg text-sm"
            onClick={handleViewFullRoadmap}
          >
            View Full Roadmap
          </button>
        </div>

        {/* CENTER → Retake Quiz */}
        <div className="flex justify-center">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm"
            onClick={handleRetakeQuiz}
          >
            Retake Quiz
          </button>
        </div>

        {/* RIGHT → New Roadmap from chosen career */}
        <div className="flex justify-end gap-2 items-center">
          <select
            className="border rounded-lg px-2 py-1 text-sm"
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
            className="px-3 py-2 rounded-lg border bg-white text-sm disabled:opacity-60"
          >
            {isGeneratingNew ? "Generating…" : "New Roadmap"}
          </button>
        </div>
      </div>

      {/* Row 4 — Motivation Full Width */}
      <div className="border rounded-xl p-6 bg-gradient-to-r from-gray-900 to-gray-700 text-white">
        <h2 className="font-semibold text-lg mb-2">Daily Motivation</h2>
        <p className="text-sm">{MOTIVATION_MESSAGES[motivationIndex]}</p>
      </div>
    </div>
  );
}
