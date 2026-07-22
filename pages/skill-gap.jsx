// pages/skill-gap.jsx
import React, { useEffect, useState } from "react";
import API from "../utils/api";
import { endpoints } from "../utils/endpoints";
import useAuthGuard from "../hooks/useAuthGuard";
import useSlowLoading from "../hooks/useSlowLoading";

// ---------- Palette (matches the rest of the app) ----------
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

function FallbackBanner() {
  return (
    <div
      className="rounded-2xl p-5 flex items-start gap-3"
      style={{ background: "#FBF3E7", border: "1px solid #EAD3A8" }}
    >
      <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="#C98A3E" strokeWidth="1.8" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v3.75m0 3.75h.008v.008H12V16.5zm9-4.5a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <div>
        <p className="text-sm font-semibold" style={{ color: "#8A5F1E" }}>
          This is a general estimate, not an AI-reasoned analysis
        </p>
        <p className="text-xs mt-0.5" style={{ color: "#6B4A18" }}>
          We couldn't reach our AI service, so this comparison used a broader baseline
          instead of one tailored specifically to this career. Try running it again in a
          bit for a more specific breakdown.
        </p>
      </div>
    </div>
  );
}

function ChipInput({ chips, onAdd, onRemove, placeholder }) {
  const [value, setValue] = useState("");

  const commit = () => {
    const trimmed = value.trim();
    if (trimmed && !chips.some((c) => c.toLowerCase() === trimmed.toLowerCase())) {
      onAdd(trimmed);
    }
    setValue("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      commit();
    }
  };

  return (
    <div>
      <div
        className="flex flex-wrap gap-2 p-2.5 rounded-lg"
        style={{ border: "1px solid #E4DFD2", background: "#FFFFFF" }}
      >
        {chips.map((chip, i) => (
          <span
            key={i}
            className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full"
            style={{ background: "#F7F5EF", color: "#233047", border: "1px solid #E4DFD2" }}
          >
            {chip}
            <button
              type="button"
              onClick={() => onRemove(chip)}
              style={{ color: "#8A9AA5" }}
              aria-label={`Remove ${chip}`}
            >
              ×
            </button>
          </span>
        ))}
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={commit}
          placeholder={chips.length === 0 ? placeholder : "Add another…"}
          className="flex-1 min-w-[120px] text-sm outline-none"
          style={{ color: "#233047" }}
        />
      </div>
      <p className="text-xs mt-1" style={{ color: "#3D6B78" }}>
        Press Enter or comma after each skill.
      </p>
    </div>
  );
}

export default function SkillGapPage() {
  const ready = useAuthGuard();

  const [loadingLatest, setLoadingLatest] = useState(true);
  const [careerGoal, setCareerGoal] = useState("");
  const [currentSkills, setCurrentSkills] = useState([]);
  const [result, setResult] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState("");
  const isSlowLoad = useSlowLoading(loadingLatest || analyzing);

  useEffect(() => {
    if (!ready) return;

    const fetchLatest = async () => {
      try {
        const { data } = await API.get(endpoints.dash.latestSkillGap);
        setResult(data);
        setCareerGoal(data.career_goal || "");
        setCurrentSkills(data.current_skills || []);
      } catch (e) {
        // 404 just means no analysis has been run yet — not an error state.
      } finally {
        setLoadingLatest(false);
      }
    };

    fetchLatest();
  }, [ready]);

  const runAnalysis = async (e) => {
    e.preventDefault();
    if (!careerGoal.trim()) return;

    setAnalyzing(true);
    setError("");
    try {
      const { data } = await API.post(endpoints.dash.skillGap, {
        career_goal: careerGoal.trim(),
        current_skills: currentSkills,
      });
      setResult(data);
    } catch (e) {
      console.error("Error running skill gap analysis:", e);
      setError(rateLimitMessage(e, "Failed to run the analysis. Please try again."));
    } finally {
      setAnalyzing(false);
    }
  };

  if (!ready) return null;

  const cardStyle = { background: "#FFFFFF", border: "1px solid #E4DFD2" };
  const recData = result?.recommendations || {};
  const isFallback = !!recData.is_fallback;
  const strengths = recData.strengths || [];
  const actionItems = recData.action_items || [];

  return (
    <div
      className="mt-20 md:mt-24 mb-12 px-6 lg:px-12 xl:px-20 max-w-[1000px] mx-auto space-y-6"
      style={{ color: "#233047" }}
    >
      {/* Header + form */}
      <div className="rounded-2xl p-6 md:p-8" style={cardStyle}>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Skill Gap Analysis</h1>
        <p className="text-sm mt-2 mb-6" style={{ color: "#3D6B78" }}>
          Tell us a target career and what you already know — we'll show you exactly
          what's missing.
        </p>

        <form onSubmit={runAnalysis} className="space-y-4">
          <div>
            <label className="block text-sm mb-1.5" style={{ color: "#3D6B78" }}>
              Target career
            </label>
            <input
              value={careerGoal}
              onChange={(e) => setCareerGoal(e.target.value)}
              placeholder="e.g., Wildlife Photographer"
              className="w-full rounded-lg px-3.5 py-2.5 text-sm outline-none"
              style={{ border: "1px solid #E4DFD2", color: "#233047" }}
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1.5" style={{ color: "#3D6B78" }}>
              Your current skills
            </label>
            <ChipInput
              chips={currentSkills}
              onAdd={(c) => setCurrentSkills([...currentSkills, c])}
              onRemove={(c) => setCurrentSkills(currentSkills.filter((s) => s !== c))}
              placeholder="e.g., Photography"
            />
          </div>

          {error && (
            <div className="text-sm px-4 py-2.5 rounded-lg" style={{ background: "#FBEAE6", color: "#8A3A26" }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={analyzing || !careerGoal.trim()}
            className="px-5 py-2.5 rounded-lg text-sm text-white transition-opacity hover:opacity-90 disabled:opacity-60"
            style={{ background: "#233047" }}
          >
            {analyzing ? "Analyzing…" : result ? "Run New Analysis" : "Analyze"}
          </button>

          {isSlowLoad && (analyzing || loadingLatest) && (
            <p className="text-xs" style={{ color: "#C98A3E" }}>
              Our server may be waking up after being idle — this can take up to a
              minute on the first request.
            </p>
          )}
        </form>
      </div>

      {/* Results */}
      {result && !analyzing && (
        <>
          {isFallback && <FallbackBanner />}

          <div className="rounded-2xl p-6 md:p-8" style={cardStyle}>
            <h2 className="font-semibold text-lg mb-1">
              {result.career_goal}
            </h2>
            <p className="text-xs mb-5" style={{ color: "#3D6B78" }}>
              Based on {currentSkills.length} skill{currentSkills.length !== 1 ? "s" : ""} you listed
            </p>

            {/* Required skills, with strengths highlighted */}
            <p className="text-xs font-semibold mb-2" style={{ color: "#233047" }}>
              What this career requires
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              {(result.required_skills || []).map((skill, i) => {
                const isStrength = strengths.some((s) => s.toLowerCase() === skill.toLowerCase());
                return (
                  <span
                    key={i}
                    className="text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5"
                    style={{
                      background: isStrength ? "#EAF2ED" : "#F7F5EF",
                      color: isStrength ? "#2F5C3F" : "#233047",
                      border: `1px solid ${isStrength ? "#C9E2D2" : "#E4DFD2"}`,
                    }}
                  >
                    {isStrength && "✓ "}
                    {skill}
                  </span>
                );
              })}
            </div>

            {strengths.length > 0 && (
              <p className="text-xs mb-6" style={{ color: "#3D6B78" }}>
                <span style={{ color: "#4C8B5F" }}>✓</span> = you already have this skill
              </p>
            )}

            {/* Skill gaps */}
            {(result.skill_gaps || []).length > 0 ? (
              <>
                <p className="text-xs font-semibold mb-3" style={{ color: "#233047" }}>
                  What's missing
                </p>
                <div className="space-y-3 mb-6">
                  {result.skill_gaps.map((gap, i) => (
                    <div key={i} className="rounded-xl p-4" style={{ background: "#F7F5EF", border: "1px solid #E4DFD2" }}>
                      <p className="text-sm font-medium mb-1">{gap.skill}</p>
                      {gap.why_it_matters && (
                        <p className="text-xs mb-1" style={{ color: "#3D6B78" }}>
                          <span className="font-semibold" style={{ color: "#233047" }}>Why it matters: </span>
                          {gap.why_it_matters}
                        </p>
                      )}
                      {gap.how_to_close && (
                        <p className="text-xs" style={{ color: "#3D6B78" }}>
                          <span className="font-semibold" style={{ color: "#233047" }}>How to close it: </span>
                          {gap.how_to_close}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="rounded-xl p-4 mb-6" style={{ background: "#EAF2ED", border: "1px solid #C9E2D2" }}>
                <p className="text-sm" style={{ color: "#2F5C3F" }}>
                  You already cover the core skills we identified for this career. Nice work.
                </p>
              </div>
            )}

            {/* Action items */}
            {actionItems.length > 0 && (
              <>
                <p className="text-xs font-semibold mb-3" style={{ color: "#233047" }}>
                  What to do next
                </p>
                <ol className="space-y-1.5">
                  {actionItems.map((action, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <span
                        className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white mt-0.5"
                        style={{ background: "#3D6B78" }}
                      >
                        {i + 1}
                      </span>
                      <span>{action}</span>
                    </li>
                  ))}
                </ol>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}