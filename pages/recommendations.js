// pages/recommendations.js
import React, { useEffect, useState } from "react";
import API from "../utils/api";
import { endpoints } from "../utils/endpoints";
import useAuthGuard from "../hooks/useAuthGuard";
import useSlowLoading from "../hooks/useSlowLoading";
import { useRouter } from "next/router";

// ---------- Palette (matches dashboard, quiz, profile, roadmap, landing page) ----------
// ink navy   #233047   teal #3D6B78   amber #C98A3E
// sage       #4C8B5F   parchment #F7F5EF   border #E4DFD2

function rateLimitMessage(e, fallback) {
  if (e?.response?.status === 429) {
    const data = e.response.data || {};
    const retrySeconds = data.retry_after_seconds;
    const retryText = retrySeconds
      ? ` Try again in about ${Math.ceil(retrySeconds / 60)} minute${Math.ceil(retrySeconds / 60) > 1 ? "s" : ""}.`
      : "";
    return (data.error || "You've made too many requests recently.") + retryText;
  }
  return fallback;
}

function ScoreBadge({ score }) {
  const value = typeof score === "number" ? score : null;
  const pct = value !== null ? Math.max(0, Math.min(100, value <= 1 ? value * 100 : value)) : null;

  return (
    <div className="flex items-center gap-2">
      <div className="w-16 h-1.5 rounded-full overflow-hidden" style={{ background: "#E4DFD2" }}>
        <div
          className="h-1.5 rounded-full"
          style={{ width: `${pct ?? 0}%`, background: "#4C8B5F" }}
        ></div>
      </div>
      <span className="text-xs font-medium" style={{ color: "#3D6B78" }}>
        {value !== null ? `${Math.round(pct)}% match` : "N/A"}
      </span>
    </div>
  );
}

function FallbackBanner({ onRegenerate, regenerating }) {
  return (
    <div
      className="rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center gap-4 justify-between"
      style={{ background: "#FBF3E7", border: "1px solid #EAD3A8" }}
    >
      <div className="flex items-start gap-3">
        <svg
          className="w-5 h-5 flex-shrink-0 mt-0.5"
          fill="none"
          stroke="#C98A3E"
          strokeWidth="1.8"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3.75m0 3.75h.008v.008H12V16.5zm9-4.5a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <div>
          <p className="text-sm font-semibold" style={{ color: "#8A5F1E" }}>
            These are estimated matches, not AI-reasoned ones
          </p>
          <p className="text-xs mt-0.5" style={{ color: "#6B4A18" }}>
            We couldn't reach our AI service, so these were matched using a simpler
            keyword-based method. Try regenerating for more specific, reasoned results.
          </p>
        </div>
      </div>
      <button
        onClick={onRegenerate}
        disabled={regenerating}
        className="flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-60"
        style={{ background: "#233047" }}
      >
        {regenerating ? "Regenerating…" : "Regenerate with AI"}
      </button>
    </div>
  );
}

export default function RecommendationsPage() {
  const ready = useAuthGuard();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [rec, setRec] = useState(null);
  const [error, setError] = useState("");
  const [generatingCareer, setGeneratingCareer] = useState("");
  const [regenerating, setRegenerating] = useState(false);
  const isSlowLoad = useSlowLoading(loading);

  const fetchLatestRecommendation = async () => {
    try {
      const { data } = await API.get(endpoints.ai.latestRecommendation);
      setRec(data);
      setError("");
    } catch (e) {
      console.error("Error loading latest recommendation:", e);
      setError(
        "No AI recommendations found yet. Please take the quiz to generate them."
      );
    }
  };

  useEffect(() => {
    if (!ready) return;
    fetchLatestRecommendation().finally(() => setLoading(false));
  }, [ready]);

  const handleRegenerate = async () => {
    setRegenerating(true);
    try {
      await API.post(endpoints.ai.recommendCareers, {});
      await fetchLatestRecommendation();
    } catch (e) {
      console.error("Error regenerating recommendations:", e);
      alert(rateLimitMessage(e, "Failed to regenerate recommendations. Please try again."));
    } finally {
      setRegenerating(false);
    }
  };

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
      alert(rateLimitMessage(e, "Failed to generate roadmap. Please try again."));
    } finally {
      setGeneratingCareer("");
    }
  };

  if (!ready) return null;

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-2">
        <div className="flex items-center gap-3" style={{ color: "#3D6B78" }}>
          <span
            className="w-4 h-4 rounded-full border-2 animate-spin"
            style={{ borderColor: "#E4DFD2", borderTopColor: "#233047" }}
          />
          <span className="text-sm">Loading your recommendations…</span>
        </div>
        {isSlowLoad && (
          <p className="text-xs max-w-xs text-center" style={{ color: "#C98A3E" }}>
            Our server may be waking up after being idle — this can take up to a minute
            on the first request.
          </p>
        )}
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-xl mx-auto mt-24 px-4 text-center">
        <div className="rounded-2xl p-8" style={{ background: "#FFFFFF", border: "1px solid #E4DFD2" }}>
          <h1 className="text-xl font-bold mb-2" style={{ color: "#233047" }}>
            AI Career Recommendations
          </h1>
          <p className="text-sm mb-5" style={{ color: "#3D6B78" }}>{error}</p>
          <a
            href="/quiz"
            className="inline-block px-5 py-2.5 rounded-lg text-sm text-white"
            style={{ background: "#233047" }}
          >
            Go to Quiz
          </a>
        </div>
      </div>
    );
  }

  const recData = rec?.recommendations || {};
  const recList = recData?.recommendations || [];
  const careerGoal = recData?.career_goal || "";
  const summary = recData?.summary || "";
  const isFallback = !!recData?.is_fallback;

  const cardStyle = { background: "#FFFFFF", border: "1px solid #E4DFD2" };

  return (
    <div
      className="mt-20 md:mt-24 mb-12 px-6 lg:px-12 xl:px-20 max-w-[1200px] mx-auto space-y-6"
      style={{ color: "#233047" }}
    >
      {isFallback && (
        <FallbackBanner onRegenerate={handleRegenerate} regenerating={regenerating} />
      )}

      {/* Header */}
      <div className="rounded-2xl p-6 md:p-8" style={cardStyle}>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">AI Career Recommendations</h1>
        {careerGoal && (
          <p className="text-sm mt-2" style={{ color: "#3D6B78" }}>
            Based on your goal: <span className="font-semibold" style={{ color: "#233047" }}>{careerGoal}</span>
          </p>
        )}
        {summary && (
          <p className="text-sm mt-2 max-w-2xl" style={{ color: "#3D6B78" }}>{summary}</p>
        )}
      </div>

      {/* Recommendations list */}
      <div className="space-y-4">
        {recList.length === 0 && (
          <div className="rounded-2xl p-8 text-center" style={cardStyle}>
            <p className="text-sm" style={{ color: "#3D6B78" }}>
              No recommendations found. Try taking the quiz again.
            </p>
          </div>
        )}

        {recList.map((item, idx) => (
          <div key={idx} className="rounded-2xl p-6" style={cardStyle}>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1.5">
                  <span
                    className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                    style={{ background: "#C98A3E" }}
                  >
                    {idx + 1}
                  </span>
                  <h2 className="font-semibold text-lg">{item.career}</h2>
                </div>
                <div className="ml-10 mb-2">
                  <ScoreBadge score={item.score} />
                </div>
                <p className="text-sm ml-10" style={{ color: "#3D6B78" }}>{item.reason}</p>

                {(item.required_skills || []).length > 0 && (
                  <div className="ml-10 mt-3 flex flex-wrap gap-2">
                    {item.required_skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-xs px-2.5 py-1 rounded-full"
                        style={{ background: "#F7F5EF", color: "#233047", border: "1px solid #E4DFD2" }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={() => handleGenerateRoadmap(item.career)}
                disabled={generatingCareer === item.career}
                className="px-4 py-2.5 rounded-lg text-white text-sm transition-opacity hover:opacity-90 disabled:opacity-60 flex-shrink-0"
                style={{ background: "#233047" }}
              >
                {generatingCareer === item.career ? "Generating…" : "Generate roadmap"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {recList.length > 0 && (
        <div
          className="rounded-2xl p-5 flex items-start gap-3"
          style={{ background: "#F0EDE3", border: "1px solid #E4DFD2" }}
        >
          <svg
            className="w-5 h-5 flex-shrink-0 mt-0.5"
            fill="none"
            stroke="#C98A3E"
            strokeWidth="1.8"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8"
            />
          </svg>
          <p className="text-sm" style={{ color: "#3D6B78" }}>
            Explore each path and pick the one that feels exciting, not just "safe". You
            can always regenerate a new roadmap later.
          </p>
        </div>
      )}
    </div>
  );
}