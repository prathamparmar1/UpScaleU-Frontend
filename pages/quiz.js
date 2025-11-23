import { useState } from "react";
import API from "../utils/api";
import { endpoints } from "../utils/endpoints";
import useAuthGuard from "../hooks/useAuthGuard";
import { useRouter } from "next/router";

const QUESTIONS = [
  {
    question: "What kind of work sounds most exciting to you?",
    options: [
      "Designing and building software or technical systems",
      "Understanding people and improving their experiences",
      "Analyzing numbers, data, and patterns to get insights",
      "Organizing, managing, or leading people and projects",
    ],
  },
  {
    question: "When you imagine your ideal day at work, you are mostly…",
    options: [
      "Deeply focused, building or debugging something on your computer",
      "Brainstorming ideas and designing creative solutions",
      "Investigating data, trends, or research questions",
      "Talking with people, coordinating tasks, or helping them directly",
    ],
  },
  {
    question: "Which statement fits you the best?",
    options: [
      "I enjoy solving logical/technical problems",
      "I enjoy designing visuals, interfaces, or experiences",
      "I enjoy understanding why things happen using data or research",
      "I enjoy guiding people, organizing work, or making decisions",
    ],
  },
  {
    question: "How do you feel about math and abstract thinking?",
    options: [
      "I really enjoy math and complex technical concepts",
      "I’m okay with numbers if they’re used in real-world problems",
      "I prefer creative or people-focused work over math-heavy tasks",
      "I dislike math and want to avoid it as much as possible",
    ],
  },
  {
    question: "What motivates you the most in a career?",
    options: [
      "Building advanced technical skills and solving hard problems",
      "Creating beautiful, meaningful, or user-friendly experiences",
      "Discovering insights, truth, or knowledge from data/research",
      "Leading teams, earning well, and growing into leadership roles",
    ],
  },
  {
    question: "Which work environment sounds best for you?",
    options: [
      "Fast-paced startup where I build and ship quickly",
      "Structured company with clear processes and stability",
      "Mission-driven or impact-focused organization (education, health, social good)",
      "Remote or flexible environment where I control my schedule",
    ],
  },
  {
    question: "In the next 1–2 years, what are you MOST excited to learn?",
    options: [
      "Coding, system design, and building full products",
      "Design, branding, content creation, or user experience",
      "Data analysis, machine learning, or research skills",
      "Communication, leadership, networking, or business skills",
    ],
  },
  {
    question: "How do you feel about risk and uncertainty in your career path?",
    options: [
      "I’m okay with big risks if the upside is high",
      "I’m fine with some uncertainty, but I want general direction",
      "I prefer clear, structured roles with defined expectations",
      "I prefer stable paths where growth is steady and predictable",
    ],
  },
];

export default function Quiz() {
  const ready = useAuthGuard();
  const router = useRouter();

  const [answers, setAnswers] = useState(Array(QUESTIONS.length).fill(""));
  const [submitting, setSubmitting] = useState(false);
  const [err, setErr] = useState("");

  if (!ready) return null;

  const onChange = (i, value) => {
    const next = [...answers];
    next[i] = value;
    setAnswers(next);
  };

  const allAnswered = answers.every((a) => a && a.trim() !== "");

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!allAnswered) return;

    setSubmitting(true);
    setErr("");

    // Build {responses: [{question, answer}, ...]}
    const payload = {
      responses: QUESTIONS.map((q, idx) => ({
        question: q.question,
        answer: answers[idx] || "",
      })),
    };
    console.log("Submitting quiz payload:", payload);

    try {
      // 1) Save quiz + simple career_plan in backend
      await API.post(endpoints.quiz.submit, payload);

      // 2) Ask AI to generate career recommendations based on latest quiz
      await API.post(endpoints.ai.recommendCareers, {});

      // 3) Redirect user to recommendations page
      router.push("/recommendations");
    } catch (e) {
      console.error(e);
      setErr("Something went wrong while submitting your quiz. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-25 mb-5 space-y-6 text-black mt-8 px-4 lg:px-8">
      <div>
        <h1 className="text-2xl font-semibold">Career Quiz</h1>
        <p className="text-sm text-gray-600 mt-1">
          Answer based on what you actually enjoy and want — there are no right or wrong answers.
        </p>
      </div>

      {err && <div className="text-red-600 text-sm">{err}</div>}

      <form className="space-y-5" onSubmit={onSubmit}>
        {QUESTIONS.map((q, i) => (
          <div
            key={i}
            className="border rounded-xl p-4 bg-white space-y-3 shadow-sm"
          >
            <label className="block text-sm font-medium">
              Q{i + 1}. {q.question}
            </label>
            <div className="space-y-2">
              {q.options.map((opt, idx) => (
                <label
                  key={idx}
                  className="flex items-center gap-2 text-sm cursor-pointer"
                >
                  <input
                    type="radio"
                    name={`q-${i}`}
                    value={opt}
                    checked={answers[i] === opt}
                    onChange={(e) => onChange(i, e.target.value)}
                    className="h-4 w-4"
                    required={idx === 0 && !answers[i]}
                  />
                  <span>{opt}</span>
                </label>
              ))}
            </div>
          </div>
        ))}

        <button
          disabled={submitting || !allAnswered}
          className="px-4 py-2 rounded-lg bg-black text-white disabled:opacity-60"
        >
          {submitting ? "Submitting…" : "Submit Quiz"}
        </button>
      </form>
    </div>
  );
}