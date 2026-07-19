import { useState } from "react";
import API from "../utils/api";
import { endpoints } from "../utils/endpoints";
import useAuthGuard from "../hooks/useAuthGuard";
import useSlowLoading from "../hooks/useSlowLoading";
import { useRouter } from "next/router";

// ---------- Palette (matches dashboard + landing page) ----------
// ink navy   #233047   teal #3D6B78   amber #C98A3E
// sage       #4C8B5F   parchment #F7F5EF   border #E4DFD2

// Each option is tagged with one of the 8 archetypes from the careers guide
// (Makers, Connectors, Explorers, Screen Workers, Thinkers, Performers, Healers, Builders).
// Only the option's `label` is ever sent to the backend as the answer — the `tag`
// is used purely for the local progress/encouragement UI, so the API contract
// (question/answer text pairs) is unchanged.

const QUESTIONS = [
  {
    question: "When you're fully absorbed in something, what are you usually doing?",
    options: [
      { label: "Building or fixing something with my hands", tag: "Makers" },
      { label: "Deep in a conversation, helping someone figure something out", tag: "Connectors" },
      { label: "Outdoors, exploring or noticing the world around me", tag: "Explorers" },
      { label: "Lost in a screen — designing, coding, or editing something", tag: "Screen Workers" },
    ],
  },
  {
    question: "Which of these would you rather spend a free Saturday doing?",
    options: [
      { label: "Digging into a question until I understand exactly why it happens", tag: "Thinkers" },
      { label: "Performing, filming, or putting myself in front of an audience", tag: "Performers" },
      { label: "Volunteering somewhere I can directly help people feel better", tag: "Healers" },
      { label: "Sketching out an idea for a small business or side project", tag: "Builders" },
    ],
  },
  {
    question: "A friend describes you as someone who...",
    options: [
      { label: "Notices small physical details others miss", tag: "Makers" },
      { label: "Can read a room and knows what people need", tag: "Connectors" },
      { label: "Gets restless sitting still for too long", tag: "Explorers" },
      { label: "Always has fifteen browser tabs open", tag: "Screen Workers" },
    ],
  },
  {
    question: "Pick the sentence that feels most like you:",
    options: [
      { label: "\"I need to know how this actually works.\"", tag: "Thinkers" },
      { label: "\"I want people to feel something when they see my work.\"", tag: "Performers" },
      { label: "\"I feel most useful when someone else feels less alone.\"", tag: "Healers" },
      { label: "\"I keep seeing problems as businesses waiting to happen.\"", tag: "Builders" },
    ],
  },
  {
    question: "In a group project, you naturally end up...",
    options: [
      { label: "Actually making the physical or visual thing", tag: "Makers" },
      { label: "Coordinating people and keeping everyone aligned", tag: "Connectors" },
      { label: "Scouting outside information or on-the-ground research", tag: "Explorers" },
      { label: "Owning the tech, the deck, or the digital output", tag: "Screen Workers" },
    ],
  },
  {
    question: "Which kind of 'win' feels most satisfying?",
    options: [
      { label: "Solving a puzzle no one else could crack", tag: "Thinkers" },
      { label: "Getting a genuine laugh or reaction from a crowd", tag: "Performers" },
      { label: "Watching someone recover, heal, or grow because of you", tag: "Healers" },
      { label: "Watching something you started actually make money", tag: "Builders" },
    ],
  },
  {
    question: "How do you feel about math and abstract, technical thinking?",
    options: [
      { label: "I genuinely enjoy it — the harder the better", tag: "Thinkers" },
      { label: "Fine with it if it's in service of something creative", tag: "Screen Workers" },
      { label: "I'd rather work with people or ideas than numbers", tag: "Connectors" },
      { label: "I actively want to avoid it", tag: "Performers" },
    ],
  },
  {
    question: "Which environment pulls you in the most?",
    options: [
      { label: "A workshop, studio, or hands-on space", tag: "Makers" },
      { label: "Somewhere unpredictable — trails, fields, open water", tag: "Explorers" },
      { label: "A clinic, care center, or anywhere people need support", tag: "Healers" },
      { label: "A fast-moving room full of ideas and pitches", tag: "Builders" },
    ],
  },
  {
    question: "What would genuinely excite you to learn in the next year?",
    options: [
      { label: "A hands-on craft or trade skill", tag: "Makers" },
      { label: "How to run events, negotiate, or manage people", tag: "Connectors" },
      { label: "A field-based or outdoor certification", tag: "Explorers" },
      { label: "Coding, design tools, or AI/data skills", tag: "Screen Workers" },
    ],
  },
  {
    question: "How do you feel about risk and uncertainty in a career?",
    options: [
      { label: "I'm drawn to big risk if the upside is real", tag: "Builders" },
      { label: "Some uncertainty is fine as long as I have direction", tag: "Explorers" },
      { label: "I prefer clear, structured roles with defined expectations", tag: "Thinkers" },
      { label: "I want steady, predictable growth over time", tag: "Healers" },
    ],
  },
  {
    question: "When something upsets you in the world, your instinct is to...",
    options: [
      { label: "Research it properly and understand the root cause", tag: "Thinkers" },
      { label: "Talk to someone about it and organize a response", tag: "Connectors" },
      { label: "Make something — art, content, a project — about it", tag: "Performers" },
      { label: "Think about how to actually fix it at a systemic level", tag: "Builders" },
    ],
  },
  {
    question: "Which compliment would mean the most to you?",
    options: [
      { label: "\"You clearly built this with your own hands.\"", tag: "Makers" },
      { label: "\"You made that so much easier to understand.\"", tag: "Thinkers" },
      { label: "\"You made me feel truly cared for.\"", tag: "Healers" },
      { label: "\"You turned nothing into something real.\"", tag: "Builders" },
    ],
  },
  {
    question: "Pick the workspace that sounds most like home:",
    options: [
      { label: "Anywhere with tools, materials, or equipment", tag: "Makers" },
      { label: "A stage, studio, or anywhere with an audience", tag: "Performers" },
      { label: "A laptop, anywhere in the world", tag: "Screen Workers" },
      { label: "Wherever the next opportunity or client is", tag: "Builders" },
    ],
  },
  {
    question: "What motivates you most, honestly?",
    options: [
      { label: "Mastering a hard technical or creative skill", tag: "Makers" },
      { label: "Financial upside and eventually leading something of my own", tag: "Builders" },
      { label: "Understanding truth, data, or how things really work", tag: "Thinkers" },
      { label: "Making someone's life measurably better", tag: "Healers" },
    ],
  },
];

const ARCHETYPE_BLURBS = {
  Makers: "You lean toward building things with your hands.",
  Connectors: "You lean toward working closely with people.",
  Explorers: "You lean toward open, unpredictable, outdoor work.",
  "Screen Workers": "You lean toward digital, screen-based creation.",
  Thinkers: "You lean toward solving and analyzing problems.",
  Performers: "You lean toward expression and audiences.",
  Healers: "You lean toward caring for and supporting others.",
  Builders: "You lean toward starting and growing things.",
};

export default function Quiz() {
  const ready = useAuthGuard();
  const router = useRouter();

  const [step, setStep] = useState(0); // index into QUESTIONS, or -1 for the milestone interstitial
  const [answers, setAnswers] = useState(Array(QUESTIONS.length).fill(""));
  const [tags, setTags] = useState(Array(QUESTIONS.length).fill(""));
  const [showMilestone, setShowMilestone] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [err, setErr] = useState("");
  const isSlowSubmit = useSlowLoading(submitting);

  if (!ready) return null;

  const total = QUESTIONS.length;
  const current = QUESTIONS[step];
  const progressPct = Math.round((step / total) * 100);

  const topTag = () => {
    const counts = {};
    tags.forEach((t) => {
      if (!t) return;
      counts[t] = (counts[t] || 0) + 1;
    });
    const entries = Object.entries(counts);
    if (entries.length === 0) return null;
    entries.sort((a, b) => b[1] - a[1]);
    return entries[0][0];
  };

  const finalizeSubmit = async (finalAnswers) => {
    setSubmitting(true);
    setErr("");

    const payload = {
      responses: QUESTIONS.map((q, idx) => ({
        question: q.question,
        answer: finalAnswers[idx] || "",
      })),
    };

    try {
      await API.post(endpoints.quiz.submit, payload);
      await API.post(endpoints.ai.recommendCareers, {});
      router.push("/recommendations");
    } catch (e) {
      console.error(e);
      setErr("Something went wrong while submitting your quiz. Please try again.");
      setSubmitting(false);
    }
  };

  const selectOption = (opt) => {
    const nextAnswers = [...answers];
    nextAnswers[step] = opt.label;
    setAnswers(nextAnswers);

    const nextTags = [...tags];
    nextTags[step] = opt.tag;
    setTags(nextTags);

    setTimeout(() => {
      if (step === total - 1) {
        finalizeSubmit(nextAnswers);
        return;
      }
      if (step === 6) {
        // brief halfway encouragement
        setShowMilestone(true);
      } else {
        setStep(step + 1);
      }
    }, 220);
  };

  const goBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const cardStyle = { background: "#FFFFFF", border: "1px solid #E4DFD2" };

  if (submitting) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4" style={{ color: "#233047" }}>
        <span
          className="w-6 h-6 rounded-full border-2 animate-spin"
          style={{ borderColor: "#E4DFD2", borderTopColor: "#233047" }}
        />
        <p className="text-sm" style={{ color: "#3D6B78" }}>
          Matching your answers to real career paths…
        </p>
        {isSlowSubmit && (
          <p className="text-xs max-w-xs text-center" style={{ color: "#C98A3E" }}>
            Our server may be waking up after being idle — this can take up to a minute
            on the first request. Hang tight.
          </p>
        )}
      </div>
    );
  }

  if (showMilestone) {
    const lead = topTag();
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="max-w-md w-full rounded-2xl p-8 text-center" style={cardStyle}>
          <div
            className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center text-white font-bold"
            style={{ background: "#C98A3E" }}
          >
            {step + 1}/{total}
          </div>
          <h2 className="text-xl font-bold mb-2" style={{ color: "#233047" }}>
            Halfway there.
          </h2>
          <p className="text-sm mb-6" style={{ color: "#3D6B78" }}>
            {lead
              ? ARCHETYPE_BLURBS[lead]
              : "Keep going — every answer sharpens your matches."}{" "}
            {total - step - 1} questions left.
          </p>
          <button
            onClick={() => {
              setShowMilestone(false);
              setStep(step + 1);
            }}
            className="px-6 py-2.5 rounded-lg text-sm text-white"
            style={{ background: "#233047" }}
          >
            Continue
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-20 md:mt-24 mb-12 px-4 lg:px-0" style={{ color: "#233047" }}>
      <div className="mb-6 flex items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Career Quiz</h1>
          <p className="text-sm mt-1" style={{ color: "#3D6B78" }}>
            Answer honestly — there are no right or wrong answers, only better matches.
          </p>
        </div>
        <button
          onClick={() => router.push("/quiz-history")}
          className="text-xs hover:underline flex-shrink-0 mt-1"
          style={{ color: "#3D6B78" }}
        >
          Past attempts →
        </button>
      </div>

      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex justify-between text-xs mb-1.5" style={{ color: "#3D6B78" }}>
          <span>Question {step + 1} of {total}</span>
          <span>{progressPct}%</span>
        </div>
        <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: "#E4DFD2" }}>
          <div
            className="h-2 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPct}%`, background: "#4C8B5F" }}
          ></div>
        </div>
      </div>

      {err && <div className="text-sm mb-4" style={{ color: "#B0472C" }}>{err}</div>}

      {/* Question card */}
      <div className="rounded-2xl p-6 md:p-8" style={cardStyle}>
        <h2 className="text-lg font-semibold mb-6">{current.question}</h2>

        <div className="grid gap-3">
          {current.options.map((opt, idx) => {
            const selected = answers[step] === opt.label;
            return (
              <button
                key={idx}
                onClick={() => selectOption(opt)}
                className="text-left rounded-xl p-4 text-sm transition-all duration-200"
                style={{
                  background: selected ? "#233047" : "#F7F5EF",
                  color: selected ? "#FFFFFF" : "#233047",
                  border: `1px solid ${selected ? "#233047" : "#E4DFD2"}`,
                }}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>

      {step > 0 && (
        <button
          onClick={goBack}
          className="mt-5 text-sm hover:underline"
          style={{ color: "#3D6B78" }}
        >
          ← Back
        </button>
      )}
    </div>
  );
}