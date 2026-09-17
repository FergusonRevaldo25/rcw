"use client";

import { useEffect, useRef, useState } from "react";

// A connected progress-line timeline — a track that fills left-to-right
// (top-to-bottom on mobile) as it scrolls into view, with numbered nodes
// lighting up in sequence along it. No fetch, no database call, nothing
// async — purely static content plus an IntersectionObserver trigger.

type Step = {
  step: string;
  title: string;
  description: string;
};

const STEPS: Step[] = [
  {
    step: "01",
    title: "Discovery call",
    description:
      "A quick chat about your business and what the site actually needs to do.",
  },
  {
    step: "02",
    title: "Design",
    description: "A look built for your business — not a reskinned template.",
  },
  {
    step: "03",
    title: "Build",
    description:
      "Real code, written and reviewed, with the infrastructure it needs.",
  },
  {
    step: "04",
    title: "Review",
    description:
      "You see it before it's live, and anything that needs changing gets changed.",
  },
  {
    step: "05",
    title: "Deploy",
    description:
      "Live on your own domain, hosting and email working end to end.",
  },
  {
    step: "06",
    title: "Handover",
    description: "You get access to everything — no lock-in, no surprise fees.",
  },
];

export default function ProjectTimeline() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect(); // only need to trigger once
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="container-page pb-20">
      {/* --- Desktop / tablet: horizontal line --- */}
      <div className="hidden sm:block relative">
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-black/10" />
        <div
          className="absolute top-5 left-0 h-0.5 gradient-accent transition-all duration-[1400ms] ease-out"
          style={{ width: visible ? "100%" : "0%" }}
        />
        <div className="relative z-10 flex justify-between">
          {STEPS.map((s, i) => (
            <div
              key={s.step}
              className="flex flex-col items-center text-center px-2 max-w-[160px]"
            >
              <div
                className={`h-10 w-10 shrink-0 rounded-full flex items-center justify-center text-xs font-mono border transition-colors duration-500 ${
                  visible
                    ? "gradient-accent text-white border-transparent"
                    : "bg-[var(--color-bg-raised)] text-[var(--color-muted)] border-black/10"
                }`}
                style={{ transitionDelay: visible ? `${i * 180}ms` : "0ms" }}
              >
                {s.step}
              </div>
              <p className="font-semibold text-sm mt-3">{s.title}</p>
              <p className="text-xs text-[var(--color-muted)] mt-1">
                {s.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* --- Mobile: vertical line --- */}
      <div className="sm:hidden relative pl-14">
        <div className="absolute top-0 bottom-0 left-5 w-0.5 bg-black/10" />
        <div
          className="absolute top-0 left-5 w-0.5 gradient-accent transition-all duration-[1400ms] ease-out"
          style={{ height: visible ? "100%" : "0%" }}
        />
        <div className="flex flex-col gap-8">
          {STEPS.map((s, i) => (
            <div key={s.step} className="relative">
              <div
                className={`absolute -left-14 h-10 w-10 shrink-0 rounded-full flex items-center justify-center text-xs font-mono border transition-colors duration-500 ${
                  visible
                    ? "gradient-accent text-white border-transparent"
                    : "bg-[var(--color-bg-raised)] text-[var(--color-muted)] border-black/10"
                }`}
                style={{ transitionDelay: visible ? `${i * 180}ms` : "0ms" }}
              >
                {s.step}
              </div>
              <p className="font-semibold text-sm">{s.title}</p>
              <p className="text-xs text-[var(--color-muted)] mt-1">
                {s.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
