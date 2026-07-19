// pages/quiz-history.jsx
import React, { useEffect, useState } from "react";
import API from "../utils/api";
import { endpoints } from "../utils/endpoints";
import useAuthGuard from "../hooks/useAuthGuard";
import useSlowLoading from "../hooks/useSlowLoading";
import { useRouter } from "next/router";

// ---------- Palette (matches the rest of the app) ----------
// ink navy   #233047   teal #3D6B78   amber #C98A3E
// sage       #4C8B5F   parchment #F7F5EF   border #E4DFD2

function formatDateTime(iso) {
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

// Compares two submissions' answers by matching question text, and returns
// the questions where the answer actually changed.
function diffAnswers(newer, older) {
  if (!newer || !older) return [];
  const olderMap = {};
  (older.answers || []).forEach((a) => {
    olderMap[a.question] = a.answer;
  });

  const changes = [];
  (newer.answers || []).forEach((a) => {
    const prevAnswer = olderMap[a.question];
    if (prevAnswer !== undefined && prevAnswer !== a.answer) {
      changes.push({ question: a.question, from: prevAnswer, to: a.answer });
    }
  });
  return changes;
}

export default function QuizHistoryPage() {
  const ready = useAuthGuard();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [submissions, setSubmissions] = useState([]);
  const [error, setError] = useState("");
  const [expanded, setExpanded] = useState(new Set());
  const isSlowLoad = useSlowLoading(loading);

  useEffect(() => {
    if (!ready) return;

    const fetchHistory = async () => {
      try {
        const { data } = await API.get(endpoints.quiz.historyAll);
        setSubmissions(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error("Error loading quiz history:", e);
        setError("Failed to load your quiz history.");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [ready]);

  const toggle = (id) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
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
          <span className="text-sm">Loading your quiz history…</span>
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

  // submissions are ordered most-recent-first from the backend
  const [latest, previous] = submissions;
  const changes = submissions.length >= 2 ? diffAnswers(latest, previous) : [];

  return (
    <div
      className="mt-20 md:mt-24 mb-12 px-6 lg:px-12 xl:px-20 max-w-[900px] mx-auto space-y-6"
      style={{ color: "#233047" }}
    >
      {/* Header */}
      <div className="rounded-2xl p-6 md:p-8" style={cardStyle}>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Quiz History</h1>
        <p className="text-sm mt-2" style={{ color: "#3D6B78" }}>
          Every time you've taken the career quiz, and what's changed along the way.
        </p>
      </div>

      {error && (
        <div className="rounded-2xl p-6 text-center" style={cardStyle}>
          <p className="text-sm" style={{ color: "#8A3A26" }}>{error}</p>
        </div>
      )}

      {!error && submissions.length === 0 && (
        <div className="rounded-2xl p-10 text-center" style={cardStyle}>
          <p className="text-sm mb-4" style={{ color: "#3D6B78" }}>
            You haven't taken the quiz yet.
          </p>
          <button
            onClick={() => router.push("/quiz")}
            className="px-5 py-2.5 rounded-lg text-sm text-white"
            style={{ background: "#233047" }}
          >
            Take the Quiz
          </button>
        </div>
      )}

      {/* What changed since last time */}
      {changes.length > 0 && (
        <div className="rounded-2xl p-6" style={{ background: "#FBF3E7", border: "1px solid #EAD3A8" }}>
          <p className="text-sm font-semibold mb-3" style={{ color: "#8A5F1E" }}>
            {changes.length} answer{changes.length > 1 ? "s" : ""} changed since your previous attempt
          </p>
          <div className="space-y-3">
            {changes.map((c, i) => (
              <div key={i} className="text-sm">
                <p className="font-medium mb-1" style={{ color: "#6B4A18" }}>{c.question}</p>
                <p className="text-xs" style={{ color: "#8A5F1E" }}>
                  <span className="line-through opacity-70">{c.from}</span>
                </p>
                <p className="text-xs font-medium" style={{ color: "#6B4A18" }}>→ {c.to}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      {submissions.length >= 2 && changes.length === 0 && (
        <div className="rounded-2xl p-5" style={{ background: "#F0EDE3", border: "1px solid #E4DFD2" }}>
          <p className="text-sm" style={{ color: "#3D6B78" }}>
            Your answers were identical to your previous attempt — your interests look
            consistent.
          </p>
        </div>
      )}

      {/* Each submission, expandable */}
      {submissions.length > 0 && (
        <div className="space-y-3">
          {submissions.map((s, idx) => {
            const isOpen = expanded.has(s.id);
            const isLatest = idx === 0;
            return (
              <div key={s.id} className="rounded-2xl overflow-hidden" style={cardStyle}>
                <button
                  onClick={() => toggle(s.id)}
                  className="w-full text-left p-5 flex items-center justify-between gap-3"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="font-semibold text-sm">{formatDateTime(s.submitted_at)}</h2>
                      {isLatest && (
                        <span
                          className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                          style={{ background: "#EAF2ED", color: "#2F5C3F" }}
                        >
                          Most recent
                        </span>
                      )}
                    </div>
                    <p className="text-xs mt-0.5" style={{ color: "#3D6B78" }}>
                      {(s.answers || []).length} questions answered
                    </p>
                  </div>
                  <ChevronIcon open={isOpen} />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 space-y-3" style={{ borderTop: "1px solid #E4DFD2" }}>
                    {(s.answers || []).map((a, i) => (
                      <div key={i} className="pt-3">
                        <p className="text-xs font-medium" style={{ color: "#3D6B78" }}>{a.question}</p>
                        <p className="text-sm mt-0.5" style={{ color: "#233047" }}>{a.answer}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {submissions.length > 0 && (
        <div className="text-center">
          <button
            onClick={() => router.push("/quiz")}
            className="text-sm hover:underline"
            style={{ color: "#3D6B78" }}
          >
            Retake the quiz
          </button>
        </div>
      )}
    </div>
  );
}