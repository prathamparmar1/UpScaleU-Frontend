import { useEffect, useState } from "react";
import API from "../utils/api";
import { endpoints } from "../utils/endpoints";
import useAuthGuard from "../hooks/useAuthGuard";
import React from "react";

export default function Dashboard() {
  const ready = useAuthGuard();
  const [loading, setLoading] = useState(true);
  const [overview, setOverview] = useState(null);
  const [error, setError] = useState("");
  const [profile, setProfile] = useState(null);
  const [goal, setGoal] = useState("");
  
  useEffect(() => {
    if (!ready) return;

    const fetchOverview = async () => {
      try {
        const { data } = await API.get(endpoints.dash.overview);
        console.log("Dashboard Overview Data:", data);
        setOverview(data);
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
        setGoal(data?.career_goal || ""); 
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
    fetchOverview();
  }, [ready]);

  if (!ready) return null;
  if (loading) return <p className="text-center mt-10">Loading…</p>;
  if (error) return <p className="text-center text-red-600">{error}</p>;

  const { career_goal, latest_quiz, latest_roadmap } = overview || {};

  return (
    <div className="text-black mt-10 px-8 space-y-6">
      {/* Header */}
      <div>
        <p className="text-sm text-gray-600">Welcome, {profile?.username}</p>
        <h1 className="text-2xl font-semibold">Dashboard Overview</h1>
        <p className="text-sm text-gray-600">
          Here’s your latest career insights and progress summary.
        </p>
      </div>

      {/* Career Goal */}
      <div className="border rounded-xl p-4 space-y-2">
        <h2 className="font-medium text-lg">Career Goal</h2>
        <p className="text-gray-700">
          {career_goal || "You haven’t set a career goal yet."}
        </p>
        <a
          href="/profile"
          className="text-sm text-blue-600 underline hover:text-blue-800"
        >
          Update goal
        </a>
      </div>

      {/* Latest Quiz Summary */}
      <div className="border rounded-xl p-4 space-y-3">
        <h2 className="font-medium text-lg">Latest Quiz Summary</h2>
        {latest_quiz ? (
          <>
            <p className="text-sm text-gray-600">
              <strong>Recommended Field:</strong>{" "}
              {latest_quiz.career_plan?.recommended_field || "N/A"}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Skills to Improve:</strong>{" "}
              {(latest_quiz.career_plan?.skills_to_improve || []).join(", ") ||
                "N/A"}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Submitted:</strong>{" "}
              {new Date(latest_quiz.submitted_at).toLocaleString()}
            </p>
            <a
              href="/quiz"
              className="text-sm text-blue-600 underline hover:text-blue-800"
            >
              Retake quiz
            </a>
          </>
        ) : (
          <p className="text-gray-700">
            You haven’t taken a quiz yet.{" "}
            <a
              href="/quiz"
              className="text-blue-600 underline hover:text-blue-800"
            >
              Take your first quiz
            </a>
          </p>
        )}
      </div>

      {/* Latest Roadmap */}
      <div className="border rounded-xl p-4 space-y-3">
        <h2 className="font-medium text-lg">Your Latest Roadmap</h2>
        {latest_roadmap ? (
          <>
            <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
              {(latest_roadmap.data?.milestones || []).map((m, idx) => (
                <li key={idx}>
                  <strong>Step {m.step}:</strong> {m.title}
                </li>
              ))}
            </ul>
            <p className="text-sm text-gray-500 mt-2">
              Created at:{" "}
              {new Date(latest_roadmap.created_at).toLocaleString()}
            </p>
            <a
              href="/roadmap"
              className="text-sm text-blue-600 underline hover:text-blue-800"
            >
              View full roadmap
            </a>
          </>
        ) : (
          <p className="text-gray-700">
            You don’t have a roadmap yet.{" "}
            <a
              href="/roadmap"
              className="text-blue-600 underline hover:text-blue-800"
            >
              Generate one
            </a>
          </p>
        )}
      </div>
    </div>
  );
}
