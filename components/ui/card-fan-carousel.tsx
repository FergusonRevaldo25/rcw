"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Generic fan/arc carousel engine.
 *
 * Cards are arranged in a shallow arc around a centered "active" card:
 * further cards rotate more, shrink, drop lower, and fade out — producing
 * the spread-deck-of-cards look rather than a straight sideways slide.
 *
 * This file exports:
 *   - `FanCarousel`  (named) — generic engine, pass your own `renderCard`.
 *   - `SocialCards`  (default) — a ready-made photo version matching the
 *      `cards={[{ imgUrl, alt }]}` API.
 */

export type FanCarouselProps<T> = {
  items: T[];
  renderCard: (item: T, index: number, isActive: boolean) => ReactNode;
  caption?: (item: T, index: number) => ReactNode;
  cardWidth?: number;
  cardHeight?: number;
  autoplayMs?: number; // 0 disables autoplay
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

  useEffect(() => {
    if (paused || autoplayMs <= 0 || items.length <= 1) return;
    timerRef.current = setInterval(() => {
      setActive((i) => (i + 1) % items.length);
    }, autoplayMs);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [paused, autoplayMs, items.length]);

  function goTo(i: number) {
    setActive(((i % items.length) + items.length) % items.length);
  }

  // How far (in px) the furthest visible card sits below the active one —
  // used to size the container so nothing clips.
  const maxArcDrop = Math.pow(Math.min(items.length - 1, 4), 1.6) * 6;
  const containerHeight = cardHeight + maxArcDrop + 40;

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="relative mx-auto"
        style={{ height: containerHeight, perspective: 1400 }}
      >
        {items.map((item, i) => {
          const offset = i - active;
          const abs = Math.abs(offset);
          const isActive = offset === 0;

          // Cards more than this far from center are fully faded/inert —
          // still mounted (so autoplay/dot-jump transitions stay smooth)
          // but invisible and non-interactive.
          const isVisible = abs <= 5;

          const rotate = offset * 9; // degrees
          const translateX = offset * cardWidth * 0.58;
          const translateY = Math.pow(abs, 1.6) * 6; // arcs downward at the edges
          const scale = Math.max(1 - abs * 0.12, 0.5);
          const opacity = Math.max(1 - abs * 0.26, 0);

          return (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={
                ariaLabel ? ariaLabel(item, i) : `Go to slide ${i + 1}`
              }
              aria-current={isActive}
              className="absolute top-0 left-1/2 rounded-2xl overflow-hidden shadow-xl transition-[transform,opacity] duration-500 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
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
              {renderCard(item, i, isActive)}
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

// ---------------------------------------------------------------------
// Ready-made photo version — matches the `cards={[{ imgUrl, alt }]}` API
// from the demo snippet. Drop this in as-is to test the effect with
// plain images before wiring in anything more custom.
// ---------------------------------------------------------------------

export type SocialCard = {
  imgUrl: string;
  alt: string;
};

export default function SocialCards({ cards }: { cards: SocialCard[] }) {
  return (
    <FanCarousel
      items={cards}
      cardWidth={280}
      cardHeight={380}
      ariaLabel={(card) => card.alt}
      renderCard={(card) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={card.imgUrl}
          alt={card.alt}
          className="w-full h-full object-cover"
          draggable={false}
        />
      )}
    />
  );
}
