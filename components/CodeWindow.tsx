"use client";

import { useEffect, useRef, useState } from "react";

// Same "watch it get built" idea as BuildDemo on the home page, but built
// as a standalone component so it can be dropped into any page. Fixed row
// counts from the start (see the note in BuildDemo about the height-glitch
// bug) — every phase renders the same number of lines, just some are
// empty, so the box never resizes itself while it's animating.

const CODE_LINES = [
  "export async function build(site: Project) {",
  "  const files = await compile(site.source);",
  "  await optimize(files);",
  "  return deploy(files, { target: 'vercel' });",
  "}",
];

const TERMINAL_LINES = [
  "$ npm run build",
  "✓ Compiled successfully in 611ms",
  "$ vercel --prod",
  "✓ Deployed — https://yourbusiness.co.za",
];

const CHAR_MS = 24;
const LINE_PAUSE_MS = 250;
const TERMINAL_LINE_MS = 450;
const HOLD_MS = 2600;

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
  const parts = line.split(
    /('[^']*'|"[^"]*"|\bexport\b|\basync\b|\bfunction\b|\breturn\b|\bawait\b|\bconst\b)/g,
  );
  return parts.map((part, i) => {
    if (!part) return null;
    if (part.startsWith("'") || part.startsWith('"')) {
      return (
        <span key={i} style={{ color: "#FCAF45" }}>
          {part}
        </span>
      );
    }
    if (["export", "async", "function", "return", "await", "const"].includes(part)) {
      return (
        <span key={i} style={{ color: "#833AB4" }}>
          {part}
        </span>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

export default function CodeWindow() {
  const reducedMotion = useReducedMotion();
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [terminalCount, setTerminalCount] = useState(0);
  const [phase, setPhase] = useState<"typing" | "terminal" | "hold">("typing");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (reducedMotion) {
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
        timeoutRef.current = setTimeout(() => setCharIndex((c) => c + 1), CHAR_MS);
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
        timeoutRef.current = setTimeout(() => setTerminalCount((c) => c + 1), TERMINAL_LINE_MS);
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

  // Fixed number of rows for the whole animation cycle — code rows never
  // grow or shrink, so this component never resizes its own container.
  const codeRows = CODE_LINES.map((line, i) => {
    if (i < lineIndex) return line;
    if (i === lineIndex) return line.slice(0, charIndex) || "\u00A0";
    return "\u00A0";
  });

  return (
    <div className="gradient-ring rounded-2xl overflow-hidden bg-[#0A0A0A] text-[#EDEDED] font-mono text-sm shadow-xl">
      <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/10">
        <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F56]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#27C93F]" />
        <span className="ml-3 text-xs text-white/40">deploy.ts</span>
      </div>

      <div className="p-5">
        <pre className="whitespace-pre-wrap leading-relaxed">
          {codeRows.map((line, i) => (
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
            <div key={i} className={line.startsWith("✓") ? "text-[#27C93F]" : "text-white/70"}>
              {i < terminalCount ? line : "\u00A0"}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
