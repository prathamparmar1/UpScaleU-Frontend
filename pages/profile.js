import { useEffect, useState } from "react";
import API from "../utils/api";
import { endpoints } from "../utils/endpoints";
import useAuthGuard from "../hooks/useAuthGuard";
import React from "react";

export default function Dashboard() {
    const ready = useAuthGuard();
    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState(null);
    const [goal, setGoal] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (!ready) return;
        const fetchProfile = async () => {
            try {
                const { data } = await API.get(endpoints.auth.profile);
                setProfile(data);
                setGoal(data?.career_goal || ""); // backend might add career_goal to profile
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, [ready]);

    const updateGoal = async (e) => {
        e.preventDefault();
        setMessage("");
        try {
            await API.put(endpoints.auth.updateCareerGoal, { career_goal: goal });
            setMessage("Career goal updated ✔");
        } catch (e) {
            setMessage("Update failed");
        }
    };

    if (!ready) return null;
    if (loading) return <p>Loading…</p>;

    return (
        <div className="text-black mt-30 px-8">

            <div className="space-y-6">
                <div>
                    <h1 className="text-xl font-semibold">Dashboard</h1>
                    <p className="text-sm text-gray-600">Welcome, {profile?.username}</p>
                </div>

                <div className="border rounded-xl p-4 space-y-2">
                    <h2 className="font-medium">Your profile</h2>
                    <div className="text-sm">
                        <div>Id: {profile?.id || "-"}</div>
                        <div>Email: {profile?.email || "-"}</div>
                        <div>First Name: {profile?.first_name || ""}</div>
                        <div>Last Name: {profile?.last_name || ""}</div>
                        <div>Username: {profile?.username || ""}</div>
                        <div>Career-Goal: {profile?.career_goal || ""}</div>

                    </div>
                    <a href="/updateProfile" className="px-2 py-1 rounded-lg border hover:underline mr-2">Update Profile</a>
                    <a href="/change-password" className="px-2 py-1 rounded-lg border hover:underline">Change Password</a>
                </div>
                
                

                <div className="border rounded-xl p-4 space-y-3">
                    <h2 className="font-medium">Career goal</h2>
                    <form onSubmit={updateGoal} className="flex gap-2">
                        <input
                            className="flex-1 border rounded-lg px-3 py-2"
                            placeholder="e.g., Full Stack Developer"
                            value={goal}
                            onChange={(e) => setGoal(e.target.value)}
                        />
                        <button className="px-4 py-2 rounded-lg bg-black text-white">
                            Save
                        </button>
                    </form>
                    {message && <p className="text-sm">{message}</p>}
                </div>

                <div className="flex gap-3">
                    <a href="/history" className="px-4 py-2 rounded-lg border">View History</a>
                </div>
            </div>
        </div>
    );
}
