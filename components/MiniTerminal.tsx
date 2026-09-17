"use client";

import { useEffect, useRef, useState } from "react";

type MiniTerminalProps = {
  filename: string;
  lines: string[];
  resultLine?: string;
};

const CHAR_MS = 28;
const LINE_PAUSE_MS = 200;
const RESULT_DELAY_MS = 350;
const HOLD_MS = 1800;

function highlight(line: string) {
  const parts = line.split(
    /('[^']*'|"[^"]*"|\bexport\b|\bdefault\b|\bfunction\b|\breturn\b|\basync\b|\bawait\b|\bconst\b|\blet\b|\bSELECT\b|\bFROM\b|\bWHERE\b|\bINSERT\b|\bINTO\b|\bVALUES\b|<\/?[A-Za-z][^\s>]*|\/>|>)/g,
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
    if (/^<\/?[A-Za-z]/.test(part) || part === "/>" || part === ">") {
      return (
        <span key={i} style={{ color: "#E1306C" }}>
          {part}
        </span>
      );
    }
    if (
      [
        "export", "default", "function", "return", "async", "await",
        "const", "let", "SELECT", "FROM", "WHERE", "INSERT", "INTO", "VALUES",
      ].includes(part)
    ) {
      return (
        <span key={i} style={{ color: "#833AB4" }}>
          {part}
        </span>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

export default function MiniTerminal({ filename, lines, resultLine }: MiniTerminalProps) {
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    function clear() {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    }

    const currentLine = lines[lineIndex] ?? "";

    if (!showResult) {
      if (charIndex < currentLine.length) {
        timeoutRef.current = setTimeout(() => setCharIndex((c) => c + 1), CHAR_MS);
      } else if (lineIndex < lines.length - 1) {
        timeoutRef.current = setTimeout(() => {
          setLineIndex((l) => l + 1);
          setCharIndex(0);
        }, LINE_PAUSE_MS);
      } else if (resultLine) {
        timeoutRef.current = setTimeout(() => setShowResult(true), RESULT_DELAY_MS);
      } else {
        timeoutRef.current = setTimeout(() => {
          setLineIndex(0);
          setCharIndex(0);
        }, HOLD_MS);
      }
    } else {
      timeoutRef.current = setTimeout(() => {
        setShowResult(false);
        setLineIndex(0);
        setCharIndex(0);
      }, HOLD_MS);
    }

    return clear;
  }, [lineIndex, charIndex, showResult, lines, resultLine]);

  // Fixed row count for the whole cycle — same height-glitch fix as
  // CodeWindow/BuildDemo: rows always render. Not-yet-typed rows use a
  // non-breaking space (not an empty string) — an empty <div> collapses to
  // 0px with no line-box, so without this the box grows taller each time
  // a new line starts typing instead of holding a constant height.
  const rows = lines.map((line, i) => {
    if (i < lineIndex) return line;
    if (i === lineIndex) return line.slice(0, charIndex) || "\u00A0";
    return "\u00A0";
  });

  return (
    <div className="rounded-xl overflow-hidden bg-[#0A0A0A] text-[#EDEDED] font-mono text-[11px] shadow-md">
      <div className="flex items-center gap-1.5 px-3 py-2 border-b border-white/10">
        <span className="h-2 w-2 rounded-full bg-[#FF5F56]" />
        <span className="h-2 w-2 rounded-full bg-[#FFBD2E]" />
        <span className="h-2 w-2 rounded-full bg-[#27C93F]" />
        <span className="ml-2 text-[10px] text-white/40">{filename}</span>
      </div>

      <div className="p-3">
        {rows.map((row, i) => (
          <div key={i} className="leading-relaxed whitespace-pre">
            {highlight(row)}
            {i === lineIndex && !showResult && (
              <span className="inline-block w-1.5 h-3 -mb-0.5 ml-0.5 bg-white/70 animate-pulse" />
            )}
          </div>
        ))}

        {resultLine && (
          <div
            className={`mt-1 text-[#27C93F] transition-opacity duration-300 ${
              showResult ? "opacity-100" : "opacity-0"
            }`}
          >
            {showResult ? resultLine : "\u00A0"}
          </div>
        )}
      </div>
    </div>
  );
}
