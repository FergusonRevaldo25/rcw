"use client";

import { useEffect, useRef, useState } from "react";

const LINE = "site.build();";
const CHAR_MS = 70;
const HOLD_MS = 1400;

export default function MiniTypingCode() {
  const [charIndex, setCharIndex] = useState(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (charIndex < LINE.length) {
      timeoutRef.current = setTimeout(
        () => setCharIndex((c) => c + 1),
        CHAR_MS,
      );
    } else {
      timeoutRef.current = setTimeout(() => setCharIndex(0), HOLD_MS);
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [charIndex]);

  return (
    <div className="h-10 flex items-center font-mono text-xs text-[var(--color-fg)] whitespace-nowrap">
      {LINE.slice(0, charIndex)}
      <span className="inline-block w-1.5 h-3 -mb-0.5 ml-0.5 bg-[var(--color-magenta)] animate-pulse shrink-0" />
    </div>
  );
}
