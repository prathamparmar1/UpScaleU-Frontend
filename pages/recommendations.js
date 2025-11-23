// pages/recommendations.js
import React, { useEffect, useState } from "react";
import API from "../utils/api";
import { endpoints } from "../utils/endpoints";
import useAuthGuard from "../hooks/useAuthGuard";
import { useRouter } from "next/router";

export default function RecommendationsPage() {
  const ready = useAuthGuard();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [rec, setRec] = useState(null);
  const [error, setError] = useState("");
  const [generatingCareer, setGeneratingCareer] = useState("");

  useEffect(() => {
    if (!ready) return;

    const fetchLatestRecommendation = async () => {
      try {
        const { data } = await API.get(endpoints.ai.latestRecommendation);
        setRec(data);
      } catch (e) {
        console.error("Error loading latest recommendation:", e);
        setError(
          "No AI recommendations found yet. Please take the quiz to generate them."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchLatestRecommendation();
  }, [ready]);

  const handleGenerateRoadmap = async (career) => {
    if (!rec || !rec.id) {
      alert("No recommendation context found.");
      return;
    }

    try {
      setGeneratingCareer(career);
      await API.post(endpoints.dash.roadmapFromRecommendation, {
        career_recommendation_id: rec.id,
        career,
      });
      router.push("/roadmap");
    } catch (e) {
      console.error("Error generating roadmap:", e);
      alert("Failed to generate roadmap. Please try again.");
    } finally {
      setGeneratingCareer("");
    }
  };

  if (!ready) return null;
  if (loading) return <p className="text-center mt-10">Loading recommendations…</p>;
  if (error) {
    return (
      <div className="mt-6 px-4 lg:px-8">
        <h1 className="text-2xl font-bold mb-2">AI Career Recommendations</h1>
        <p className="text-sm text-red-600">{error}</p>
        <a
          href="/quiz"
          className="mt-2 inline-block text-sm text-blue-600 underline"
        >
          Go to Quiz
        </a>
      </div>
    );
  }

  const recData = rec?.recommendations || {};
  const recList = recData?.recommendations || [];
  const careerGoal = recData?.career_goal || "";
  const summary = recData?.summary || "";

  return (
    <div className="mt-6 px-4 lg:px-8 mt-25 mb- 5 space-y-6 text-black">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">AI Career Recommendations</h1>
        {careerGoal && (
          <p className="text-sm text-gray-600 mt-1">
            Based on your goal: <span className="font-semibold">{careerGoal}</span>
          </p>
        )}
        {summary && (
          <p className="text-xs text-gray-500 mt-1 max-w-2xl">{summary}</p>
        )}
      </div>

      {/* Recommendations list */}
      <div className="space-y-4">
        {recList.length === 0 && (
          <p className="text-sm text-gray-700">
            No recommendations found. Try taking the quiz again.
          </p>
        )}

        {recList.map((item, idx) => (
          <div
            key={idx}
            className="border rounded-xl p-4 bg-white shadow-sm space-y-2"
          >
            <div className="flex justify-between items-center">
              <div>
                <h2 className="font-semibold text-lg">{item.career}</h2>
                <p className="text-xs text-gray-600">
                  Score: {item.score ?? "N/A"}
                </p>
              </div>
              <button
                onClick={() => handleGenerateRoadmap(item.career)}
                disabled={generatingCareer === item.career}
                className="px-3 py-2 rounded-lg bg-black text-white text-xs disabled:opacity-60"
              >
                {generatingCareer === item.career
                  ? "Generating..."
                  : "Generate roadmap"}
              </button>
            </div>

            <p className="text-sm text-gray-700">{item.reason}</p>

            <p className="text-xs">
              <span className="font-semibold">Key skills: </span>
              {(item.required_skills || []).join(", ") || "N/A"}
            </p>
          </div>
        ))}
      </div>

      <div className="text-xs text-gray-500 mb-6">
        Tip: Explore each path and pick the one that feels exciting, not just
        “safe”. You can always regenerate a new roadmap later.
      </div>
    </div>
  );
}
