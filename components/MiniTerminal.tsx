"use client";

import { useEffect, useRef, useState } from "react";

type MiniTerminalProps = {
  filename: string;
  lines: string[];
  resultLine?: string;
};

const CHAR_DELAY_MS = 45; // typing speed per character
const RESULT_DELAY_MS = 200; // pause after typing finishes, before the result line appears
const HOLD_MS = 2400; // how long the finished state stays on screen before looping
const FADE_MS = 300; // fade-out duration when resetting to type again

// A terminal card that types its lines, holds, fades out, and retypes —
// looping continuously. Starts once scrolled into view (not on page load),
// with a small random stagger per instance so a grid of these doesn't type
// in perfect lockstep. Fixed min-height so every card in a grid lines up
// regardless of how many lines of code it holds.
export default function MiniTerminal({
  filename,
  lines,
  resultLine,
}: MiniTerminalProps) {
  const fullText = lines.join("\n");
  const [charsShown, setCharsShown] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [fading, setFading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const startedRef = useRef(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !startedRef.current) {
          startedRef.current = true;
          observer.disconnect();
          const stagger = Math.random() * 1000;
          schedule(() => runCycle(), stagger);
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      timers.current.forEach(clearTimeout);
    };

    function schedule(fn: () => void, delay: number) {
      const id = setTimeout(fn, delay);
      timers.current.push(id);
      return id;
    }

    function runCycle() {
      setFading(false);
      setShowResult(false);
      typeNext(0);
    }

    function typeNext(count: number) {
      setCharsShown(count);
      if (count < fullText.length) {
        schedule(() => typeNext(count + 1), CHAR_DELAY_MS);
        return;
      }
      // Finished typing this pass.
      if (resultLine) {
        schedule(() => setShowResult(true), RESULT_DELAY_MS);
      }
      schedule(() => resetCycle(), HOLD_MS);
    }

    function resetCycle() {
      setFading(true);
      schedule(() => {
        setCharsShown(0);
        setShowResult(false);
        setFading(false);
        runCycle();
      }, FADE_MS);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const displayedLines = fullText.slice(0, charsShown).split("\n");
  const isTyping = charsShown < fullText.length;

  return (
    <div
      ref={containerRef}
      className="rounded-xl overflow-hidden bg-[#0A0A0A] text-[#EDEDED] font-mono text-xs shadow-md flex flex-col min-h-[180px]"
    >
      <div className="flex items-center gap-1.5 px-3 py-2 border-b border-white/10 shrink-0">
        <span className="h-2 w-2 rounded-full bg-[#FF5F56]" />
        <span className="h-2 w-2 rounded-full bg-[#FFBD2E]" />
        <span className="h-2 w-2 rounded-full bg-[#27C93F]" />
        <span className="ml-2 text-[10px] text-white/40 truncate">
          {filename}
        </span>
      </div>
      <div
        className={`p-3 space-y-0.5 flex-1 transition-opacity duration-300 ${
          fading ? "opacity-0" : "opacity-100"
        }`}
      >
        {displayedLines.map((line, i) => (
          <div key={i} className="whitespace-pre-wrap leading-relaxed">
            {line}
            {isTyping && !fading && i === displayedLines.length - 1 && (
              <span className="inline-block w-[6px] h-[1em] align-middle ml-0.5 bg-[#EDEDED] animate-pulse" />
            )}
          </div>
        ))}
        {resultLine && (
          <div
            className={`pt-2 mt-2 border-t border-white/10 text-[#27C93F] transition-opacity duration-500 ${
              showResult && !fading ? "opacity-100" : "opacity-0"
            }`}
          >
            {resultLine}
          </div>
        )}
      </div>
    </div>
  );
}
