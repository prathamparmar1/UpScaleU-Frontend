import React, { useState } from "react";

// ---------- Palette (matches the rest of the app) ----------
// ink navy   #233047   teal #3D6B78   amber #C98A3E
// sage       #4C8B5F   parchment #F7F5EF   border #E4DFD2

const inputStyle = {
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.15)",
  color: "#FFFFFF",
};

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(""); // "sent" | "error" | ""

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setStatus("error");
      return;
    }
    // No contact-form backend endpoint is wired yet — this confirms locally.
    // Swap this for a real API.post(endpoints.contact.send, form) once one exists.
    console.log("Contact form submitted:", form);
    setStatus("sent");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="py-20 md:py-28 px-6 lg:px-16" style={{ background: "#F7F5EF", color: "#233047" }}>
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Contact Details */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Get In <span style={{ color: "#C98A3E" }}>Touch</span>
            </h2>
            <p className="text-lg mb-8" style={{ color: "#3D6B78" }}>
              Have questions about UpScaleU, your roadmap, or a partnership idea?
              Reach out anytime.
            </p>

            <div className="space-y-6">
              {/* Location */}
              <div className="flex items-start gap-4">
                <span
                  className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: "#FFFFFF", border: "1px solid #E4DFD2" }}
                >
                  <svg className="h-5 w-5" style={{ color: "#C98A3E" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 11c1.656 0 3-1.343 3-3s-1.344-3-3-3-3 1.343-3 3 1.344 3 3 3zm0 1c-2.667 0-8 1.333-8 4v2h16v-2c0-2.667-5.333-4-8-4z"
                    />
                  </svg>
                </span>
                <div>
                  <h3 className="font-semibold text-base mb-0.5">Location</h3>
                  <p style={{ color: "#3D6B78" }}>Lucknow, UP, India</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <span
                  className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: "#FFFFFF", border: "1px solid #E4DFD2" }}
                >
                  <svg className="h-5 w-5" style={{ color: "#C98A3E" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 5a2 2 0 012-2h1l2 5-2 1a11 11 0 006 6l1-2 5 2v1a2 2 0 01-2 2h-1c-6.627 0-12-5.373-12-12V5z"
                    />
                  </svg>
                </span>
                <div>
                  <h3 className="font-semibold text-base mb-0.5">Phone</h3>
                  <p style={{ color: "#3D6B78" }}>+91 9998887776</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <span
                  className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: "#FFFFFF", border: "1px solid #E4DFD2" }}
                >
                  <svg className="h-5 w-5" style={{ color: "#C98A3E" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 12l-4-4-4 4m8 0v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4m0-4a2 2 0 012-2h8a2 2 0 012 2v4z"
                    />
                  </svg>
                </span>
                <div>
                  <h3 className="font-semibold text-base mb-0.5">Email</h3>
                  <p style={{ color: "#3D6B78" }}>support@upscaleu.in</p>
                </div>
              </div>
            </div>

            {/* Social Icons */}
            <div className="mt-8 flex space-x-3">
              {[
                {
                  label: "Facebook",
                  path: "M22 12a10 10 0 10-11.5 9.9v-7h-2v-3h2v-2c0-2 1.2-3 3-3h2v3h-1c-1 0-1 .5-1 1v1h3l-1 3h-2v7A10 10 0 0022 12z",
                },
                {
                  label: "Instagram",
                  path: "M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm10 2a3 3 0 013 3v10a3 3 0 01-3 3H7a3 3 0 01-3-3V7a3 3 0 013-3h10zm-5 3a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6zm4.5-.5a1 1 0 100 2 1 1 0 000-2z",
                },
                {
                  label: "Twitter",
                  path: "M22.46 6c-.77.35-1.6.58-2.46.69a4.28 4.28 0 001.88-2.37 8.59 8.59 0 01-2.72 1.04A4.26 4.26 0 0016.11 4c-2.36 0-4.27 1.91-4.27 4.27 0 .33.04.66.1.97C7.7 8.99 4.07 7.13 1.64 4.16a4.26 4.26 0 00-.58 2.15c0 1.48.75 2.79 1.88 3.55a4.22 4.22 0 01-1.93-.53v.05c0 2.07 1.47 3.8 3.42 4.19a4.3 4.3 0 01-1.93.07c.55 1.71 2.13 2.96 4 2.99A8.58 8.58 0 012 19.54a12.1 12.1 0 006.56 1.92c7.88 0 12.2-6.53 12.2-12.2 0-.19 0-.38-.01-.57A8.72 8.72 0 0024 5.5a8.52 8.52 0 01-2.54.7z",
                },
                {
                  label: "LinkedIn",
                  path: "M4.98 3.5a2.5 2.5 0 112.5 2.5 2.5 2.5 0 01-2.5-2.5zM3 8h4v12H3zm6 0h3.8v1.75h.05a4.15 4.15 0 013.7-2.05c3.95 0 4.7 2.6 4.7 5.95V20h-4v-5.5c0-1.3-.02-3-1.85-3-1.86 0-2.15 1.45-2.15 2.9V20h-4z",
                },
              ].map((s) => (
                <a
                  key={s.label}
                  href="#"
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                  style={{ background: "#233047" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#C98A3E")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "#233047")}
                  aria-label={s.label}
                >
                  <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="p-8 rounded-2xl" style={{ background: "#233047" }}>
            <h3 className="text-2xl font-bold mb-6 text-white">Send Us a Message</h3>

            {status === "sent" && (
              <div className="text-sm mb-5 px-4 py-2.5 rounded-lg" style={{ background: "rgba(76,139,95,0.2)", color: "#9FD4B3" }}>
                Thanks — your message has been noted. We'll get back to you soon.
              </div>
            )}
            {status === "error" && (
              <div className="text-sm mb-5 px-4 py-2.5 rounded-lg" style={{ background: "rgba(176,71,44,0.2)", color: "#F0A98F" }}>
                Please fill in your name, email, and message.
              </div>
            )}

            <form className="space-y-5" onSubmit={onSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1.5 text-white/80">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={onChange}
                  className="w-full px-4 py-3 rounded-lg outline-none focus:ring-2"
                  style={inputStyle}
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1.5 text-white/80">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={onChange}
                  className="w-full px-4 py-3 rounded-lg outline-none focus:ring-2"
                  style={inputStyle}
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1.5 text-white/80">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={form.message}
                  onChange={onChange}
                  className="w-full px-4 py-3 rounded-lg outline-none focus:ring-2"
                  style={inputStyle}
                  placeholder="Your message here..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full font-bold py-3 px-6 rounded-lg transition-opacity hover:opacity-90"
                style={{ background: "#C98A3E", color: "#233047" }}
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;