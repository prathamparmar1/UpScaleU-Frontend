// pages/roadmap.js
import React, { useEffect, useState } from "react";
import API from "../utils/api";
import { endpoints } from "../utils/endpoints";
import useAuthGuard from "../hooks/useAuthGuard";
import { useRouter } from "next/router";

// ---------- Palette (matches dashboard, quiz, profile, recommendations, landing page) ----------
// ink navy   #233047   teal #3D6B78   amber #C98A3E
// sage       #4C8B5F   parchment #F7F5EF   border #E4DFD2

function weeksToHuman(weeks) {
  if (!weeks || weeks <= 0) return null;
  if (weeks < 8) return `${weeks} week${weeks > 1 ? "s" : ""}`;
  const months = Math.round(weeks / 4.345);
  return `~${months} month${months > 1 ? "s" : ""}`;
}

function ChevronIcon({ open }) {
  return (
    <svg
      className="w-5 h-5 transition-transform duration-200"
      style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

function MilestoneIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="#C98A3E" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 21V4m0 0h13l-2 4 2 4H3" />
    </svg>
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
            This is a simplified fallback roadmap, not an AI-tailored one
          </p>
          <p className="text-xs mt-0.5" style={{ color: "#6B4A18" }}>
            We couldn't reach our AI service, so this plan was built with a general
            template rather than one reasoned specifically for you. Try regenerating —
            your progress on this roadmap will stay saved separately.
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

export default function RoadmapPage() {
  const router = useRouter();
  const ready = useAuthGuard();
  const [loading, setLoading] = useState(true);
  const [roadmap, setRoadmap] = useState(null);
  const [progress, setProgress] = useState(null);
  const [error, setError] = useState("");
  const [expanded, setExpanded] = useState(new Set());
  const [regenerating, setRegenerating] = useState(false);

  const loadRoadmapAndProgress = async ({ preserveExpanded } = {}) => {
    try {
      // 1) Get latest roadmap from overview
      const { data: overview } = await API.get(endpoints.dash.overview);
      const latestRoadmap = overview.latest_roadmap;

      if (!latestRoadmap || !latestRoadmap.generated_roadmap) {
        setError(
          "You don't have a roadmap yet. Go to Dashboard and generate one from your AI recommendations."
        );
        return;
      }

      setRoadmap(latestRoadmap);
      setError("");

      if (!preserveExpanded) {
        const phases = latestRoadmap.generated_roadmap?.phases || [];
        if (phases.length > 0) setExpanded(new Set([0]));
      }

      // 2) Get progress for this roadmap
      const { data: progressData } = await API.get(
        `${endpoints.dash.roadmapProgress}?roadmap_id=${latestRoadmap.id}`
      );
      setProgress(progressData);
    } catch (e) {
      console.error("Error loading roadmap:", e);
      setError("Failed to load roadmap.");
    }
  };

  useEffect(() => {
    if (!ready) return;
    loadRoadmapAndProgress().finally(() => setLoading(false));
  }, [ready]);

  const handleRegenerate = async () => {
    if (!roadmap) return;
    setRegenerating(true);
    try {
      const targetCareer = roadmap.generated_roadmap?.target_career;
      await API.post(endpoints.dash.roadmapFromRecommendation, {
        career: targetCareer,
      });
      await loadRoadmapAndProgress();
    } catch (e) {
      console.error("Error regenerating roadmap:", e);
      alert("Failed to regenerate roadmap. Please try again.");
    } finally {
      setRegenerating(false);
    }
  };

  const handleToggleSkill = async (skill) => {
    if (!roadmap || !roadmap.id || !progress) return;

    try {
      const { data } = await API.post(endpoints.dash.markSkill, {
        roadmap_id: roadmap.id,
        skill,
        completed: !(progress.completed_skills || []).includes(skill),
      });
      setProgress(data);
    } catch (e) {
      console.error("Error updating skill progress:", e);
      alert("Failed to update skill progress. Please try again.");
    }
  };

  const togglePhase = (idx) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
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
          <span className="text-sm">Loading your roadmap…</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-xl mx-auto mt-24 px-4 text-center">
        <div className="rounded-2xl p-8" style={{ background: "#FFFFFF", border: "1px solid #E4DFD2" }}>
          <h1 className="text-xl font-bold mb-2" style={{ color: "#233047" }}>
            Roadmap
          </h1>
          <p className="text-sm mb-5" style={{ color: "#3D6B78" }}>{error}</p>
          <a
            href="/"
            className="inline-block px-5 py-2.5 rounded-lg text-sm text-white"
            style={{ background: "#233047" }}
          >
            Go back to Dashboard
          </a>
        </div>
      </div>
    );
  }

  const data = roadmap.generated_roadmap || {};
  const phases = data.phases || [];
  const completedSkills = new Set(progress?.completed_skills || []);
  const overall = progress?.progress?.overall || {
    total_skills: 0,
    completed_skills: 0,
    percent: 0,
  };
  const totalDurationLabel = weeksToHuman(data.estimated_total_duration_weeks);
  const isFallback = !!data.is_fallback;

  const handleGetBackToDashboard = () => {
    router.push("/dashboard");
  };

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
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Your Roadmap</h1>
            <p className="text-sm mt-2" style={{ color: "#3D6B78" }}>
              Target career:{" "}
              <span className="font-semibold" style={{ color: "#233047" }}>
                {data.target_career || "Not specified"}
              </span>
            </p>
          </div>

          {totalDurationLabel && (
            <span
              className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full flex-shrink-0"
              style={{ background: "#F7F5EF", border: "1px solid #E4DFD2", color: "#3D6B78" }}
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="9" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v5l3 3" />
              </svg>
              {totalDurationLabel} total
            </span>
          )}
        </div>

        {data.summary && (
          <p className="text-sm mt-3 max-w-3xl" style={{ color: "#3D6B78" }}>{data.summary}</p>
        )}
      </div>

      {/* Overall Progress Card */}
      <div className="rounded-2xl p-6" style={cardStyle}>
        <h2 className="font-semibold text-lg mb-4">Progress Overview</h2>
        <div className="w-full h-3 rounded-full overflow-hidden mb-2" style={{ background: "#E4DFD2" }}>
          <div
            className="h-3 rounded-full transition-all duration-700 ease-out"
            style={{ width: `${overall.percent || 0}%`, background: "#4C8B5F" }}
          />
        </div>
        <p className="text-sm" style={{ color: "#233047" }}>
          <span className="font-semibold">{overall.percent?.toFixed(1) || 0}%</span> completed (
          {overall.completed_skills || 0}/{overall.total_skills || 0} skills)
        </p>
        <p className="text-xs mt-1" style={{ color: "#3D6B78" }}>
          Check off skills as you complete them — your progress updates automatically.
        </p>
      </div>

      {/* Timeline-style phases */}
      <div className="rounded-2xl p-6 md:p-8" style={cardStyle}>
        <h2 className="font-semibold text-lg mb-6">Roadmap Timeline</h2>

        <div className="relative pl-7">
          {/* Vertical line */}
          <div className="absolute left-2.5 top-1 bottom-1 w-px" style={{ background: "#E4DFD2" }} />

          {phases.length === 0 && (
            <p className="text-sm" style={{ color: "#3D6B78" }}>No phases available.</p>
          )}

          {phases.map((phase, idx) => {
            const phaseProgress = progress?.progress?.phases?.[idx] || {
              completed_skills: 0,
              total_skills: (phase.skills || []).length,
              percent: 0,
            };
            const isDone = phaseProgress.percent >= 100;
            const isOpen = expanded.has(idx);
            const skillDetailsMap = {};
            (phase.skill_details || []).forEach((sd) => {
              if (sd && sd.skill) skillDetailsMap[sd.skill] = sd;
            });

            return (
              <div key={idx} className="relative mb-6 last:mb-0">
                {/* Timeline dot */}
                <div
                  className="absolute -left-[1.85rem] mt-1.5 w-4 h-4 rounded-full flex items-center justify-center z-10"
                  style={{
                    background: isDone ? "#4C8B5F" : "#C98A3E",
                    border: "2px solid #FFFFFF",
                    boxShadow: "0 0 0 2px #E4DFD2",
                  }}
                >
                  {isDone && (
                    <svg className="w-2.5 h-2.5" fill="none" stroke="#FFFFFF" strokeWidth="3" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>

                {/* Phase Card */}
                <div className="rounded-xl overflow-hidden" style={{ background: "#F7F5EF", border: "1px solid #E4DFD2" }}>
                  {/* Header row — always visible, click to expand */}
                  <button
                    onClick={() => togglePhase(idx)}
                    className="w-full text-left p-4 flex items-start justify-between gap-3"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-semibold text-sm">{phase.name || `Phase ${idx + 1}`}</h3>
                        {phase.duration_weeks && (
                          <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "#E4DFD2", color: "#3D6B78" }}>
                            {weeksToHuman(phase.duration_weeks) || `${phase.duration_weeks}w`}
                          </span>
                        )}
                      </div>

                      {!isOpen && phase.description && (
                        <p
                          className="text-xs mt-1"
                          style={{
                            color: "#3D6B78",
                            display: "-webkit-box",
                            WebkitLineClamp: 1,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}
                        >
                          {phase.description}
                        </p>
                      )}

                      <div className="flex items-center gap-2 mt-2">
                        <div className="w-24 h-1.5 rounded-full overflow-hidden flex-shrink-0" style={{ background: "#E4DFD2" }}>
                          <div
                            className="h-1.5 rounded-full transition-all duration-700 ease-out"
                            style={{ width: `${phaseProgress.percent || 0}%`, background: "#3D6B78" }}
                          />
                        </div>
                        <span className="text-xs flex-shrink-0" style={{ color: "#3D6B78" }}>
                          {phaseProgress.completed_skills}/{phaseProgress.total_skills} skills · {phaseProgress.percent?.toFixed(0)}%
                        </span>
                      </div>
                    </div>

                    <span className="flex-shrink-0 mt-0.5" style={{ color: "#3D6B78" }}>
                      <ChevronIcon open={isOpen} />
                    </span>
                  </button>

                  {/* Expanded detail */}
                  {isOpen && (
                    <div className="px-4 pb-4 space-y-4" style={{ borderTop: "1px solid #E4DFD2" }}>
                      {phase.description && (
                        <p className="text-sm pt-4" style={{ color: "#233047" }}>{phase.description}</p>
                      )}

                      {phase.milestone && (
                        <div
                          className="flex items-start gap-2.5 rounded-lg p-3"
                          style={{ background: "#FBF3E7", border: "1px solid #EAD3A8" }}
                        >
                          <span className="mt-0.5 flex-shrink-0"><MilestoneIcon /></span>
                          <div>
                            <p className="text-xs font-semibold mb-0.5" style={{ color: "#8A5F1E" }}>
                              Milestone for this phase
                            </p>
                            <p className="text-sm" style={{ color: "#6B4A18" }}>{phase.milestone}</p>
                          </div>
                        </div>
                      )}

                      {/* Skills with checkboxes + nested detail */}
                      <div>
                        <p className="text-xs font-semibold mb-2" style={{ color: "#233047" }}>
                          Skills in this phase
                        </p>
                        {(phase.skills || []).length > 0 ? (
                          <div className="space-y-2.5">
                            {phase.skills.map((skill, i) => {
                              const checked = completedSkills.has(skill);
                              const detail = skillDetailsMap[skill];
                              const hasDetail = detail && (detail.why_it_matters || detail.how_to_practice);

                              return (
                                <div key={i} className="rounded-lg p-2.5" style={{ background: "#FFFFFF", border: "1px solid #E4DFD2" }}>
                                  <label className="flex items-center gap-2.5 text-sm cursor-pointer">
                                    <span
                                      className="relative flex items-center justify-center w-4 h-4 rounded flex-shrink-0"
                                      style={{
                                        background: checked ? "#4C8B5F" : "#FFFFFF",
                                        border: `1.5px solid ${checked ? "#4C8B5F" : "#C6BDA8"}`,
                                      }}
                                    >
                                      <input
                                        type="checkbox"
                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                        checked={checked}
                                        onChange={() => handleToggleSkill(skill)}
                                      />
                                      {checked && (
                                        <svg className="w-2.5 h-2.5" fill="none" stroke="#FFFFFF" strokeWidth="3" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                      )}
                                    </span>
                                    <span
                                      className="font-medium"
                                      style={{
                                        color: checked ? "#8A9AA5" : "#233047",
                                        textDecoration: checked ? "line-through" : "none",
                                      }}
                                    >
                                      {skill}
                                    </span>
                                  </label>

                                  {hasDetail && (
                                    <div className="mt-2 ml-6 pl-3 space-y-1" style={{ borderLeft: "2px solid #E4DFD2" }}>
                                      {detail.why_it_matters && (
                                        <p className="text-xs" style={{ color: "#3D6B78" }}>
                                          <span className="font-semibold" style={{ color: "#233047" }}>Why it matters: </span>
                                          {detail.why_it_matters}
                                        </p>
                                      )}
                                      {detail.how_to_practice && (
                                        <p className="text-xs" style={{ color: "#3D6B78" }}>
                                          <span className="font-semibold" style={{ color: "#233047" }}>How to practice: </span>
                                          {detail.how_to_practice}
                                        </p>
                                      )}
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        ) : (
                          <p className="text-xs" style={{ color: "#3D6B78" }}>No skills listed for this phase.</p>
                        )}
                      </div>

                      {/* Suggested actions */}
                      {(phase.suggested_actions || []).length > 0 && (
                        <div>
                          <p className="text-xs font-semibold mb-2" style={{ color: "#233047" }}>
                            What to actually do
                          </p>
                          <ol className="space-y-1.5">
                            {phase.suggested_actions.map((action, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "#233047" }}>
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
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Back to dashboard */}
      <div>
        <button
          className="px-5 py-2.5 rounded-lg text-white text-sm transition-opacity hover:opacity-90"
          style={{ background: "#233047" }}
          onClick={handleGetBackToDashboard}
        >
          Back to Dashboard
        </button>
      </div>

      {/* Footer hint */}
      <div
        className="rounded-2xl p-5 flex items-start gap-3"
        style={{ background: "#F0EDE3", border: "1px solid #E4DFD2" }}
      >
        <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="#C98A3E" strokeWidth="1.8" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8"
          />
        </svg>
        <p className="text-sm" style={{ color: "#3D6B78" }}>
          Use this roadmap as a guide, not a cage. Adjust durations and order based on
          your actual learning pace.
        </p>
      </div>
    </div>
  );
}