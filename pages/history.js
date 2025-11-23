import { useEffect, useState } from "react";
import API from "../utils/api";
import { endpoints } from "../utils/endpoints";
import useAuthGuard from "../hooks/useAuthGuard";

export default function History() {
  const ready = useAuthGuard();
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [err, setErr] = useState("");

  useEffect(() => {
    if (!ready) return;
    const load = async () => {
      try {
        console.log("History fetching");
        const { data } = await API.get(endpoints.quiz.history);
        console.log("Raw API Response:", data);
        setItems(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error("Error fetching history:", e);
        setErr("Failed to load history");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [ready]);

  if (!ready) return null;
  if (loading) return <p>Loading…</p>;
  if (err) return <p className="text-red-600 text-sm">{err}</p>;

  const formatWhen = (item) => {
    const ts = item?.submitted_at || item?.created_at; // backend may use either key
    if (!ts) return "-";
    try {
      return new Date(ts).toLocaleString();
    } catch {
      return ts;
    }
  };

  const summaryOfPlan = (plan) => {
    if (!plan) return "-";
    if (typeof plan === "string") return plan.slice(0, 140) + (plan.length > 140 ? "…" : "");
    const field = plan?.recommended_field ? `Field: ${plan.recommended_field}` : "";
    const skills = Array.isArray(plan?.skills_to_improve) ? ` | Skills: ${plan.skills_to_improve.slice(0, 3).join(", ")}` : "";
    return (field + skills) || JSON.stringify(plan).slice(0, 140) + "…";
  };


  return (
    <div className="space-y-4z">
      <h1 className="text-xl font-semibold">Quiz History</h1>
      {items.length === 0 && <p className="text-sm text-gray-600">No submissions yet.</p>}

      <ul className="space-y-3 text-black">
        {items.map((item) => (
          <li key={item.id} className="border rounded-xl p-4">
            <div className="text-xs text-gray-600">{formatWhen(item)}</div>
            <div className="mt-1 text-sm">{summaryOfPlan(item.career_plan)}</div>

            <details className="mt-2">
              <summary className="cursor-pointer text-sm">View details</summary>
              <div className="mt-2">
                <h3 className="font-medium text-sm">Answers</h3>
                <pre className="text-xs bg-gray-50 p-2 rounded">{JSON.stringify(item.answers, null, 2)}</pre>
                <h3 className="font-medium text-sm mt-2">Career Plan</h3>
                <pre className="text-xs bg-gray-50 p-2 rounded">{JSON.stringify(item.career_plan, null, 2)}</pre>
              </div>
            </details>
          </li>
        ))}
      </ul>
    </div>
  );
}
