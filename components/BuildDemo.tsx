"use client";

import { useEffect, useRef, useState } from "react";

// A stylized, looping "watch it get built" animation: code types itself
// out like a live coding session, then a terminal panel shows it building
// and deploying with real-looking git commands. No video file involved —
// it's just state + timers, so it loads instantly and costs nothing to
// host. Swap this out for a real screen recording later if you ever film
// one; until then this sells the same story.

const CODE_LINES = [
  "export default function Hero() {",
  "  return (",
  '    <section className="hero">',
  "      <h1>Built for your business.</h1>",
  "      <BudgetBar />",
  "    </section>",
  "  );",
  "}",
];

const TERMINAL_LINES = [
  "\$ npm run build",
  "✓ Compiled successfully in 842ms",
  "\$ git add .",
  '\$ git commit -m "feat: launch cornercoffee.co.za"',
  "\$ git push origin main",
  "✓ Deployed to production — live in 12s",
];

const CHAR_MS = 22; // typing speed
const LINE_PAUSE_MS = 250; // pause between code lines
const TERMINAL_LINE_MS = 450; // delay between terminal lines appearing
const HOLD_MS = 2600; // how long to hold the finished state before looping

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = () => setReduced(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}

function highlight(line: string) {
  // Very light manual syntax coloring — enough to read as "real code"
  // without pulling in a full syntax highlighter for a decorative demo.
  const parts = line.split(
    /("[^"]*"|<\/?[A-Za-z][^\s>]*|\/>|>|export|default|function|return)/g,
  );
  return parts.map((part, i) => {
    if (!part) return null;
    if (part.startsWith('"')) {
      return (
        <span key={i} style={{ color: "#FCAF45" }}>
          {part}
        </span>
      );
    }
    if (/^<\/?[A-Za-z]/.test(part) || part === "/>" || part === ">") {
      return (
        <span key={i} style={{ color: "#E1306C" }}>
          {part}
        </span>
      );
    }
    if (["export", "default", "function", "return"].includes(part)) {
      return (
        <span key={i} style={{ color: "#833AB4" }}>
          {part}
        </span>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

export default function BuildDemo() {
  const reducedMotion = useReducedMotion();
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [terminalCount, setTerminalCount] = useState(0);
  const [phase, setPhase] = useState<"typing" | "terminal" | "hold">("typing");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (reducedMotion) {
      // Skip straight to the fully-built, static end state.
      setLineIndex(CODE_LINES.length - 1);
      setCharIndex(CODE_LINES[CODE_LINES.length - 1].length);
      setTerminalCount(TERMINAL_LINES.length);
      setPhase("hold");
      return;
    }

    function clearTimer() {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    }

    if (phase === "typing") {
      const currentLine = CODE_LINES[lineIndex] ?? "";
      if (charIndex < currentLine.length) {
        timeoutRef.current = setTimeout(
          () => setCharIndex((c) => c + 1),
          CHAR_MS,
        );
      } else if (lineIndex < CODE_LINES.length - 1) {
        timeoutRef.current = setTimeout(() => {
          setLineIndex((l) => l + 1);
          setCharIndex(0);
        }, LINE_PAUSE_MS);
      } else {
        timeoutRef.current = setTimeout(() => setPhase("terminal"), 500);
      }
    } else if (phase === "terminal") {
      if (terminalCount < TERMINAL_LINES.length) {
        timeoutRef.current = setTimeout(
          () => setTerminalCount((c) => c + 1),
          TERMINAL_LINE_MS,
        );
      } else {
        timeoutRef.current = setTimeout(() => setPhase("hold"), HOLD_MS);
      }
    } else if (phase === "hold") {
      timeoutRef.current = setTimeout(() => {
        setLineIndex(0);
        setCharIndex(0);
        setTerminalCount(0);
        setPhase("typing");
      }, 400);
    }

    return clearTimer;
  }, [phase, lineIndex, charIndex, terminalCount, reducedMotion]);

  const visibleLines = CODE_LINES.map((line, i) => {
    if (i < lineIndex) return line;
    if (i === lineIndex) return line.slice(0, charIndex) || "\u00A0";
    return "\u00A0"; // not reached yet — nbsp (not "") so this row keeps its height instead of collapsing to 0
  });

  return (
    <section className="container-page py-20 border-t border-black/10">
      <div className="grid md:grid-cols-2 gap-5 items-center">
        <div>
          <h2 className="text-3xl font-bold mb-4">
            Actually <span className="gradient-text">hand-coded</span>.
          </h2>
          <p className="text-[var(--color-muted)] max-w-md">
            I write every line. I also use Claude to review it, catch bugs, and
            flag things I'd otherwise miss which is the honest version of
            "hand-coded" in 2026. No drag-and-drop templates, no AI output
            pretending to be custom. Here's roughly what that looks like from
            the inside, from first component to production deploy.
          </p>
        </div>

        {/* Added w-fit and md:justify-self-start below */}
        <div className="w-fit md:justify-self-start gradient-ring rounded-2xl overflow-hidden bg-[#0A0A0A] text-[#EDEDED] font-mono text-sm shadow-xl">
          <div className="flex items-center gap-1.5 px-2 py-3 border-b border-white/10">
            <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F56]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#27C93F]" />
            <span className="ml-3 text-xs text-white/40">hero.tsx</span>
          </div>

          <div className="p-5 min-h-[220px] flex flex-col justify-between">
            <pre className="whitespace-pre-wrap leading-relaxed">
              {visibleLines.map((line, i) => (
                <div key={i}>
                  {highlight(line)}
                  {i === lineIndex && phase === "typing" && (
                    <span className="inline-block w-2 h-4 -mb-0.5 ml-0.5 bg-white/70 animate-pulse" />
                  )}
                </div>
              ))}
            </pre>

            <div
              className={`mt-4 pt-4 border-t border-white/10 text-xs sm:text-sm transition-opacity duration-300 ${
                phase === "typing" ? "opacity-0" : "opacity-100"
              }`}
            >
              {TERMINAL_LINES.map((line, i) => (
                <div
                  key={i}
                  className={
                    line.startsWith("✓") ? "text-[#27C93F]" : "text-white/70"
                  }
                >
                  {i < terminalCount ? line : "\u00A0"}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
