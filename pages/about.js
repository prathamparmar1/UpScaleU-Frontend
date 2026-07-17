import Link from "next/link";

// ---------- Palette (matches landing, dashboard, quiz, profile, roadmap, auth pages) ----------
// ink navy   #233047   teal #3D6B78   amber #C98A3E
// sage       #4C8B5F   parchment #F7F5EF   border #E4DFD2

const STEPS = [
  {
    title: "Take the quiz",
    desc: "16 quick questions about what actually excites you — not just the subjects you're good at.",
  },
  {
    title: "Get matched by AI",
    desc: "We match your answers against a wide range of real careers, including the ones nobody tells you about.",
  },
  {
    title: "Follow your roadmap",
    desc: "A phase-by-phase plan of the skills to learn, in order, so you always know your next step.",
  },
];

const ARCHETYPES = [
  { name: "Makers", desc: "Build with their hands" },
  { name: "Connectors", desc: "Work closely with people" },
  { name: "Explorers", desc: "Thrive outdoors, off-script" },
  { name: "Screen Workers", desc: "Create digitally" },
  { name: "Thinkers", desc: "Solve and analyze" },
  { name: "Performers", desc: "Express and entertain" },
  { name: "Healers", desc: "Care for others" },
  { name: "Builders", desc: "Start and grow things" },
];

export default function About() {
  return (
    <div style={{ background: "#F7F5EF", color: "#233047" }}>
      {/* Hero */}
      <section
        className="relative text-white overflow-hidden"
        style={{
          background:
            "radial-gradient(1000px 550px at 10% -10%, rgba(201,138,62,0.22), transparent 60%), radial-gradient(900px 600px at 100% 0%, rgba(76,139,95,0.18), transparent 55%), linear-gradient(160deg, #1A2438 0%, #233047 45%, #2E4A57 100%)",
        }}
      >
        <div className="container mx-auto px-6 lg:px-12 py-24 md:py-32 max-w-4xl">
          <p className="uppercase tracking-[0.2em] text-xs font-semibold mb-4" style={{ color: "#C98A3E" }}>
            About UpScaleU
          </p>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
            Most students only hear about seven careers.
            <br />
            <span style={{ color: "#E0B072" }}>There are hundreds.</span>
          </h1>
          <p className="text-lg leading-relaxed max-w-2xl" style={{ color: "#C7CFD6" }}>
            UpScaleU exists because most career advice students get comes from peer
            pressure, not self-knowledge — engineering, medicine, or a handful of
            "safe" paths, simply because that's what everyone around them chose.
            We help you find the path that actually fits who you are, then show you
            exactly how to get there.
          </p>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0 100L60 87.5C120 75 240 50 360 37.5C480 25 600 25 720 31.25C840 37.5 960 50 1080 56.25C1200 62.5 1320 62.5 1380 62.5L1440 62.5V100H0Z"
              fill="#F7F5EF"
            />
          </svg>
        </div>
      </section>

      {/* Mission */}
      <section className="container mx-auto px-6 lg:px-12 xl:px-20 py-16 max-w-5xl">
        <div className="grid md:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">Our mission</h2>
            <p className="text-base leading-relaxed" style={{ color: "#3D6B78" }}>
              We want every student to know that a fulfilling career doesn't have to
              look like anyone else's. Whether that's software engineering, wildlife
              photography, forensic science, or starting a business — the goal is
              clarity, not conformity.
            </p>
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">Why it matters</h2>
            <p className="text-base leading-relaxed" style={{ color: "#3D6B78" }}>
              Students choose familiar fields because that's where they have guidance
              — parents, teachers, and peers who understand those paths. UpScaleU
              gives you that same confident guidance for the paths nobody around you
              has walked yet.
            </p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16" style={{ background: "#FFFFFF", borderTop: "1px solid #E4DFD2", borderBottom: "1px solid #E4DFD2" }}>
        <div className="container mx-auto px-6 lg:px-12 xl:px-20 max-w-5xl">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-10 text-center">How UpScaleU works</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {STEPS.map((step, idx) => (
              <div
                key={idx}
                className="rounded-2xl p-6"
                style={{ background: "#F7F5EF", border: "1px solid #E4DFD2" }}
              >
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm mb-4"
                  style={{ background: "#C98A3E" }}
                >
                  {idx + 1}
                </div>
                <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                <p className="text-sm" style={{ color: "#3D6B78" }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Archetypes */}
      <section className="container mx-auto px-6 lg:px-12 xl:px-20 py-16 max-w-5xl">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-2 text-center">
          Careers come in more shapes than you think
        </h2>
        <p className="text-sm text-center mb-10 max-w-2xl mx-auto" style={{ color: "#3D6B78" }}>
          Our quiz maps your interests across eight broad ways people actually enjoy
          working — a much wider lens than "science stream vs. commerce stream."
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {ARCHETYPES.map((a) => (
            <div
              key={a.name}
              className="rounded-xl p-4 text-center"
              style={{ background: "#FFFFFF", border: "1px solid #E4DFD2" }}
            >
              <p className="font-semibold text-sm mb-1">{a.name}</p>
              <p className="text-xs" style={{ color: "#3D6B78" }}>{a.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16" style={{ background: "#233047" }}>
        <div className="container mx-auto px-6 text-center max-w-2xl">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Ready to find your path?
          </h2>
          <p className="text-sm mb-8" style={{ color: "#C7CFD6" }}>
            It takes about five minutes, and it might show you a career you never
            knew existed.
          </p>
          <Link
            href="/quiz"
            className="inline-block px-8 py-3 rounded-full text-sm font-semibold transition-opacity hover:opacity-90"
            style={{ background: "#C98A3E", color: "#233047" }}
          >
            Take the Quiz
          </Link>
        </div>
      </section>
    </div>
  );
}