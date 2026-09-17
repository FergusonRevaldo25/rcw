"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export type FanCarouselProps<T> = {
  items: T[];
  renderCard: (item: T, index: number, isActive: boolean) => ReactNode;
  caption?: (item: T, index: number) => ReactNode;
  cardWidth?: number;
  cardHeight?: number;
  autoplayMs?: number;
  ariaLabel?: (item: T, index: number) => string;
};

export function FanCarousel<T>({
  items,
  renderCard,
  caption,
  cardWidth = 320,
  cardHeight = 200,
  autoplayMs = 6000,
  ariaLabel,
}: FanCarouselProps<T>) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [reduceMotion, setReduceMotion] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (paused || autoplayMs <= 0 || items.length <= 1 || reduceMotion) return;

    timerRef.current = setInterval(() => {
      setActive((i) => (i + 1) % items.length);
    }, autoplayMs);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [paused, autoplayMs, items.length, reduceMotion]);

  function goTo(i: number) {
    setActive(((i % items.length) + items.length) % items.length);
  }

  // Gentler vertical arc
  const maxAbs = Math.min(items.length - 1, 4);
  const maxArcDrop = Math.pow(maxAbs, 1.4) * 5;
  const containerHeight = cardHeight + maxArcDrop + 28;

  // How far the outermost card will travel horizontally
  const maxOffset = Math.min(items.length - 1, 4);
  const maxTranslateX = maxOffset * cardWidth * 0.42;
  // Extra padding so the side cards are never clipped
  const sidePadding = maxTranslateX + cardWidth * 0.15;

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="relative mx-auto"
        style={{
          height: containerHeight,
          perspective: reduceMotion ? "none" : 1400,
          // This is the important part – gives the fan room to breathe
          paddingLeft: sidePadding,
          paddingRight: sidePadding,
          marginLeft: -sidePadding,
          marginRight: -sidePadding,
        }}
      >
        {items.map((item, i) => {
          const offset = i - active;
          const abs = Math.abs(offset);
          const isActive = offset === 0;
          const isVisible = abs <= 4; // hide cards that are too far

          const rotate = reduceMotion ? 0 : offset * 7.5;
          const translateX = offset * cardWidth * 0.42; // ← reduced spread
          const translateY = reduceMotion ? 0 : Math.pow(abs, 1.4) * 5;
          const scale = Math.max(1 - abs * 0.13, 0.58); // stronger shrink
          const opacity = Math.max(1 - abs * 0.24, 0);

          return (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={
                ariaLabel ? ariaLabel(item, i) : `Go to slide ${i + 1}`
              }
              aria-current={isActive}
              className="absolute top-0 left-1/2 rounded-2xl overflow-hidden shadow-xl transition-[transform,opacity] duration-500 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black/40"
              style={{
                width: cardWidth,
                height: cardHeight,
                marginLeft: -cardWidth / 2,
                transform: `translateX(${translateX}px) translateY(${translateY}px) rotate(${rotate}deg) scale(${scale})`,
                opacity: isVisible ? opacity : 0,
                zIndex: 100 - abs,
                pointerEvents: isVisible ? "auto" : "none",
                cursor: isActive ? "default" : "pointer",
              }}
            >
              <div className="relative w-full h-full bg-transparent">
                {renderCard(item, i, isActive)}
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-6 flex flex-col items-center gap-4">
        {caption && (
          <div className="text-center min-h-[2.5rem]">
            {caption(items[active], active)}
          </div>
        )}

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => goTo(active - 1)}
            aria-label="Previous"
            className="h-10 w-10 rounded-full bg-black/60 text-white flex items-center justify-center backdrop-blur hover:bg-black/80 transition-colors shrink-0"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <div className="flex gap-2">
            {items.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === active}
                className={`h-2.5 rounded-full transition-all ${
                  i === active ? "w-6 gradient-accent" : "w-2.5 bg-black/15"
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => goTo(active + 1)}
            aria-label="Next"
            className="h-10 w-10 rounded-full bg-black/60 text-white flex items-center justify-center backdrop-blur hover:bg-black/80 transition-colors shrink-0"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
