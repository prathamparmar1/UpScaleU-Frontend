// pages/roadmaps.jsx
import React, { useEffect, useState } from "react";
import API from "../utils/api";
import { endpoints } from "../utils/endpoints";
import useAuthGuard from "../hooks/useAuthGuard";
import useSlowLoading from "../hooks/useSlowLoading";
import { useRouter } from "next/router";

// ---------- Palette (matches the rest of the app) ----------
// ink navy   #233047   teal #3D6B78   amber #C98A3E
// sage       #4C8B5F   parchment #F7F5EF   border #E4DFD2

function formatDate(iso) {
  if (!iso) return "";
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return "";
  }
}

export default function RoadmapsHistoryPage() {
  const ready = useAuthGuard();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [roadmaps, setRoadmaps] = useState([]);
  const [error, setError] = useState("");
  const isSlowLoad = useSlowLoading(loading);

  useEffect(() => {
    if (!ready) return;

    const fetchRoadmaps = async () => {
      try {
        const { data } = await API.get(endpoints.dash.roadmapHistory);
        setRoadmaps(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error("Error loading roadmap history:", e);
        setError("Failed to load your roadmaps.");
      } finally {
        setLoading(false);
      }
    };

    fetchRoadmaps();
  }, [ready]);

  if (!ready) return null;

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-2">
        <div className="flex items-center gap-3" style={{ color: "#3D6B78" }}>
          <span
            className="w-4 h-4 rounded-full border-2 animate-spin"
            style={{ borderColor: "#E4DFD2", borderTopColor: "#233047" }}
          />
          <span className="text-sm">Loading your roadmaps…</span>
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

  const cardStyle = { background: "#FFFFFF", border: "1px solid #E4DFD2" };

  return (
    <div
      className="mt-20 md:mt-24 mb-12 px-6 lg:px-12 xl:px-20 max-w-[1200px] mx-auto space-y-6"
      style={{ color: "#233047" }}
    >
      {/* Header */}
      <div className="rounded-2xl p-6 md:p-8" style={cardStyle}>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">My Roadmaps</h1>
        <p className="text-sm mt-2" style={{ color: "#3D6B78" }}>
          Every career path you've explored, with your progress on each — nothing gets
          lost when you start a new one.
        </p>
      </div>

      {error && (
        <div className="rounded-2xl p-6 text-center" style={cardStyle}>
          <p className="text-sm" style={{ color: "#8A3A26" }}>{error}</p>
        </div>
      )}

      {!error && roadmaps.length === 0 && (
        <div className="rounded-2xl p-10 text-center" style={cardStyle}>
          <p className="text-sm mb-4" style={{ color: "#3D6B78" }}>
            You haven't generated a roadmap yet.
          </p>
          <button
            onClick={() => router.push("/recommendations")}
            className="px-5 py-2.5 rounded-lg text-sm text-white"
            style={{ background: "#233047" }}
          >
            View Recommendations
          </button>
        </div>
      )}

      {roadmaps.length > 0 && (
        <div className="grid gap-4 md:grid-cols-2">
          {roadmaps.map((r) => {
            const isDone = r.overall_progress_percent >= 100;
            return (
              <button
                key={r.id}
                onClick={() => router.push(`/roadmap?id=${r.id}`)}
                className="text-left rounded-2xl p-5 transition-shadow hover:shadow-md"
                style={cardStyle}
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <h2 className="font-semibold text-lg">{r.target_career}</h2>
                    <p className="text-xs mt-0.5" style={{ color: "#3D6B78" }}>
                      Started {formatDate(r.created_at)}
                    </p>
                  </div>
                  {r.is_fallback && (
                    <span
                      className="text-[10px] font-semibold px-2 py-1 rounded-full flex-shrink-0"
                      style={{ background: "#FBF3E7", color: "#8A5F1E", border: "1px solid #EAD3A8" }}
                    >
                      Fallback
                    </span>
                  )}
                  {!r.is_fallback && isDone && (
                    <span
                      className="text-[10px] font-semibold px-2 py-1 rounded-full flex-shrink-0"
                      style={{ background: "#EAF2ED", color: "#2F5C3F", border: "1px solid #C9E2D2" }}
                    >
                      Completed
                    </span>
                  )}
                </div>

                <div className="w-full h-2 rounded-full overflow-hidden mb-2" style={{ background: "#E4DFD2" }}>
                  <div
                    className="h-2 rounded-full transition-all duration-700 ease-out"
                    style={{
                      width: `${r.overall_progress_percent || 0}%`,
                      background: isDone ? "#4C8B5F" : "#3D6B78",
                    }}
                  />
                </div>
                <p className="text-xs" style={{ color: "#3D6B78" }}>
                  {r.overall_progress_percent?.toFixed(0) || 0}% complete ·{" "}
                  {r.completed_skills || 0}/{r.total_skills || 0} skills
                </p>
              </button>
            );
          })}
        </div>
      )}

      <div className="text-center">
        <button
          onClick={() => router.push("/recommendations")}
          className="text-sm hover:underline"
          style={{ color: "#3D6B78" }}
        >
          + Explore another career path
        </button>
      </div>
    </div>
  );
}