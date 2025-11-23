// pages/roadmap.js
import React, { useEffect, useState } from "react";
import API from "../utils/api";
import { endpoints } from "../utils/endpoints";
import useAuthGuard from "../hooks/useAuthGuard";
import { useRouter } from "next/router";

export default function RoadmapPage() {
    const router = useRouter();
    const ready = useAuthGuard();
    const [loading, setLoading] = useState(true);
    const [roadmap, setRoadmap] = useState(null);
    const [progress, setProgress] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!ready) return;

        const loadRoadmapAndProgress = async () => {
            try {
                // 1) Get latest roadmap from overview
                const { data: overview } = await API.get(endpoints.dash.overview);
                const latestRoadmap = overview.latest_roadmap;

                if (!latestRoadmap || !latestRoadmap.generated_roadmap) {
                    setError(
                        "You don't have a roadmap yet. Go to Dashboard and generate one from your AI recommendations."
                    );
                    setLoading(false);
                    return;
                }

                setRoadmap(latestRoadmap);

                // 2) Get progress for this roadmap
                const { data: progressData } = await API.get(
                    `${endpoints.dash.roadmapProgress}?roadmap_id=${latestRoadmap.id}`
                );
                setProgress(progressData);
            } catch (e) {
                console.error("Error loading roadmap:", e);
                setError("Failed to load roadmap.");
            } finally {
                setLoading(false);
            }
        };

        loadRoadmapAndProgress();
    }, [ready]);

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

    if (!ready) return null;
    if (loading) return <p className="text-center mt-10">Loading roadmap…</p>;
    if (error) {
        return (
            <div className="mt-6 px-4 lg:px-8">
                <h1 className="text-2xl font-bold mb-2">Roadmap</h1>
                <p className="text-sm text-red-600">{error}</p>
                <a
                    href="/"
                    className="mt-2 inline-block text-sm text-blue-600 underline"
                >
                    Go back to Dashboard
                </a>
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
    const handleGetBackToDashboard = () => {
        router.push("/dashboard");
    };


    return (
        <div className="mt-18 px-4 lg:px-8 space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Your Roadmap</h1>
                <p className="text-sm text-gray-700">
                    Target career:{" "}
                    <span className="font-semibold">
                        {data.target_career || "Not specified"}
                    </span>
                </p>
                {data.summary && (
                    <p className="text-xs text-gray-600 mt-1 max-w-3xl">
                        {data.summary}
                    </p>
                )}
            </div>

            {/* Overall Progress Card */}
            <div className="border rounded-xl p-4 bg-white space-y-3">
                <h2 className="font-semibold text-lg text-gray-800">Progress Overview</h2>
                <div className="w-full bg-gray-300 rounded-full h-3 mb-1">
                    <div
                        className="h-3 rounded-full bg-green-500"
                        style={{ width: `${overall.percent || 0}%` }}
                    />
                </div>
                <p className="text-xs text-gray-700">
                    {overall.percent?.toFixed(1) || 0}% completed (
                    {overall.completed_skills || 0}/{overall.total_skills || 0} skills)
                </p>
                <p className="text-xs text-gray-500">
                    Check off skills as you complete them — your progress updates
                    automatically.
                </p>
            </div>

            {/* Timeline-style phases */}
            <div className="border rounded-xl p-4 bg-white">
                <h2 className="font-semibold text-lg mb-3 text-gray-800">Roadmap Timeline</h2>

                <div className="relative pl-6">
                    {/* Vertical line */}
                    <div className="absolute left-2 top-0 bottom-0 w-px bg-gray-300 text-gray-900" />

                    {phases.length === 0 && (
                        <p className="text-sm text-gray-600">No phases available.</p>
                    )}

                    {phases.map((phase, idx) => {
                        const phaseProgress = progress?.progress?.phases?.[idx] || {
                            completed_skills: 0,
                            total_skills: (phase.skills || []).length,
                            percent: 0,
                        };

                        return (
                            <div key={idx} className="relative mb-8">
                                {/* Timeline dot */}
                                <div className="absolute -left-1.5 mt-1 w-3 h-3 rounded-full bg-blue-500 border border-white shadow" />

                                {/* Phase Card */}
                                <div className="border rounded-lg p-3 bg-gray-50 text-gray-700 shadow-sm">
                                    <div className="flex justify-between items-center">
                                        <h3 className="font-semibold text-sm">
                                            {phase.name || `Phase ${idx + 1}`}
                                        </h3>
                                        <span className="text-xs text-gray-600">
                                            {phaseProgress.completed_skills}/
                                            {phaseProgress.total_skills} skills (
                                            {phaseProgress.percent?.toFixed(0)}%)
                                        </span>
                                    </div>

                                    {phase.description && (
                                        <p className="text-xs text-gray-600 mt-1">
                                            {phase.description}
                                        </p>
                                    )}

                                    <div className="w-full bg-gray-300 rounded-full h-2 mt-2 mb-2">
                                        <div
                                            className="h-2 rounded-full bg-blue-500"
                                            style={{
                                                width: `${phaseProgress.percent || 0}%`,
                                            }}
                                        />
                                    </div>

                                    {phase.duration_weeks && (
                                        <p className="text-xs text-gray-500 mb-2">
                                            Suggested duration:{" "}
                                            {phase.duration_weeks} week
                                            {phase.duration_weeks > 1 ? "s" : ""}
                                        </p>
                                    )}

                                    {/* Skills with checkboxes */}
                                    <div className="mt-2 space-y-1">
                                        <p className="text-xs font-medium">Skills in this phase:</p>
                                        {(phase.skills || []).length > 0 ? (
                                            (phase.skills || []).map((skill, i) => {
                                                const checked = completedSkills.has(skill);
                                                return (
                                                    <label
                                                        key={i}
                                                        className="flex items-center gap-2 text-xs"
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            className="h-3 w-3"
                                                            checked={checked}
                                                            onChange={() => handleToggleSkill(skill)}
                                                        />
                                                        <span
                                                            className={
                                                                checked
                                                                    ? "line-through text-gray-500"
                                                                    : "text-gray-800"
                                                            }
                                                        >
                                                            {skill}
                                                        </span>
                                                    </label>
                                                );
                                            })
                                        ) : (
                                            <p className="text-xs text-gray-500">
                                                No skills listed for this phase.
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="grid mt-2 gap-3 md:grid-cols-3 items-center">
                {/* LEFT → View Full Roadmap */}
                <div className="flex justify-start">
                    <button
                        className="px-4 py-2 bg-black text-white rounded-lg text-sm"
                        onClick={handleGetBackToDashboard}
                    >
                        Back to Dashboard
                    </button>
                </div>
            </div>

            {/* Footer hint */}
            <div className="text-xs text-gray-500 mb-6">
                Tip: Use this roadmap as a guide, not a cage. Adjust durations and
                order based on your actual learning pace.
            </div>
        </div>
    );
}
