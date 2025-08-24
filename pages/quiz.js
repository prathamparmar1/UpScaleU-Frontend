import { useState } from "react";
import API from "../utils/api";
import { endpoints } from "../utils/endpoints";
import useAuthGuard from "../hooks/useAuthGuard";

const QUESTIONS = [
  "Which subjects do you enjoy most?",
  "What type of work excites you?",
  "Do you prefer teamwork or individual work?",
  "What motivates you in a job?",
];

export default function Quiz() {
  const ready = useAuthGuard();
  const [answers, setAnswers] = useState(Array(QUESTIONS.length).fill(""));
  const [submitting, setSubmitting] = useState(false);
  const [plan, setPlan] = useState(null);
  const [err, setErr] = useState("");

  if (!ready) return null;

  const onChange = (i, value) => {
    const next = [...answers];
    next[i] = value;
    setAnswers(next);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErr("");
    setPlan(null);

    // build {responses: [{question, answer}, ...]}
    const payload = {
      responses: QUESTIONS.map((q, idx) => ({ question: q, answer: answers[idx] || "" })),
    };

    try {
      const { data } = await API.post(endpoints.quiz.submit, payload);
      setPlan(data?.career_plan || null);
    } catch (e) {
      setErr("Submission failed");
    } finally {
      setSubmitting(false);
    }
  };

  const renderPlan = () => {
    if (!plan) return null;

    // backend might return an object (mock) or a string (future OpenAI)
    if (typeof plan === "string") {
      return (
        <div className="border rounded-xl p-4 whitespace-pre-wrap">
          {plan}
        </div>
      );
    }

    return (
      <div className="border rounded-xl p-4 space-y-3 text-black">
        <div>
          <h3 className="font-semibold">Recommended field</h3>
          <p>{plan?.recommended_field || "-"}</p>
        </div>
        <div>
          <h3 className="font-semibold">Skills to improve</h3>
          <ul className="list-disc ml-6">
            {(plan?.skills_to_improve || []).map((s, i) => <li key={i}>{s}</li>)}
          </ul>
        </div>
        <div>
          <h3 className="font-semibold">Learning roadmap</h3>
          <ol className="list-decimal ml-6">
            {(plan?.learning_roadmap || []).map((s, i) => <li key={i}>{s}</li>)}
          </ol>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 text-black mt-30 px-8">
      <h1 className="text-xl font-semibold">Career Quiz</h1>
      {err && <div className="text-red-600 text-sm">{err}</div>}

      <form className="space-y-4" onSubmit={onSubmit}>
        {QUESTIONS.map((q, i) => (
          <div key={i} className="space-y-2">
            <label className="block text-sm font-medium">{q}</label>
            <input
              className="w-full border rounded-lg px-3 py-2"
              value={answers[i]}
              onChange={(e) => onChange(i, e.target.value)}
              placeholder="Type your answer"
              required
            />
          </div>
        ))}

        <button
          disabled={submitting}
          className="px-4 py-2 rounded-lg bg-black text-white disabled:opacity-60"
        >
          {submitting ? "Submitting…" : "Submit Quiz"}
        </button>
      </form>

      {renderPlan()}
    </div>
  );
}
