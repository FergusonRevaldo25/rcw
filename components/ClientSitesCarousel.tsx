"use client";

import { FanCarousel } from "@/components/ui/card-fan-carousel";

type Slide = {
  id: string;
  clientName: string;
  category: string;
  // "live" = a real site you control, safe to embed via iframe.
  // "demo" = no real deployed site yet — rendered as a static card instead,
  // since embedding arbitrary third-party URLs is unreliable (see note below).
  kind: "live" | "demo";
  url?: string;
};

// Real clients go first. Add more entries here as you launch new sites —
// the carousel adjusts automatically to however many are in this array.
//
// IMPORTANT: only use kind: "live" for sites you actually deployed and
// control (Vercel/Netlify builds allow embedding by default). Do NOT point
// "live" at someone else's website — most real-world sites send a
// Content-Security-Policy `frame-ancestors` or X-Frame-Options header that
// blocks embedding outright, and the browser will refuse to render it (the
// card goes blank, or the console shows a "violates ... frame-ancestors"
// error). That's the site's own security setting, not a bug here. For
// anything without a live URL yet, use kind: "demo" — it renders a static
// placeholder card instead of trying to embed.
const SLIDES: Slide[] = [
  {
    id: "retreat-rfc",
    clientName: "Retreat RFC",
    category: "Rugby club · full website (live client)",
    kind: "live",
    url: "https://retreatrfc-full.vercel.app/",
  },
  {
    id: "corner-coffee",
    clientName: "Corner Coffee Co.",
    category: "Coffee shop · menu & ordering (sample site)",
    kind: "live",
    url: "https://corner-coffee-silk.vercel.app/",
  },
  {
    id: "atlas-auto",
    clientName: "Atlas Auto Repair",
    category: "Mechanic · service booking (sample site)",
    kind: "live",
    url: "https://atlas-auto-repair.vercel.app/",
  },
  {
    id: "bloom-and-co",
    clientName: "Bloom & Co Florist",
    category: "Florist · online ordering (sample site)",
    kind: "live",
    url: "https://bloom-and-co-rho.vercel.app/",
  },
  {
    id: "riverside-dental",
    clientName: "Riverside Dental",
    category: "Dentist · treatment booking (sample site)",
    kind: "live",
    url: "https://riverside-dental-one.vercel.app/",
  },
];

export default function ClientSitesCarousel() {
  return (
    <section className="container-page py-20 border-t border-black/10">
      <div className="mb-10">
        <h2 className="text-3xl font-bold">Sites we've built</h2>
      </div>

      <FanCarousel
        items={SLIDES}
        cardWidth={340}
        cardHeight={210}
        ariaLabel={(slide) => slide.clientName}
        caption={(slide) => (
          <>
            <p className="font-semibold">{slide.clientName}</p>
            <p className="text-sm text-[var(--color-muted)]">
              {slide.category}
            </p>
          </>
        )}
        renderCard={(slide, _index, isActive) => {
          if (slide.kind === "live" && slide.url) {
            return (
              <div className="relative w-full h-full bg-[var(--color-bg-raised)]">
                {/* Rendered at 2.5x size then scaled to 40% so the preview
                    shows the whole page layout, not a zoomed-in corner. */}
                <iframe
                  src={slide.url}
                  title={slide.clientName}
                  loading="lazy"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "250%",
                    height: "250%",
                    border: 0,
                    transform: "scale(0.4)",
                    transformOrigin: "0 0",
                    pointerEvents: "none",
                  }}
                />
                {/* Only let the active (front) card link out — side cards in
                    the fan are for clicking-to-select, not click-through. */}
                {isActive && (
                  <a
                    href={slide.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${slide.clientName} in a new tab`}
                    className="absolute inset-0"
                  />
                )}
              </div>
            );
          }

          // Static placeholder for demo entries with no live site yet.
          return (
            <div className="relative w-full h-full bg-[var(--color-bg-raised)] flex flex-col justify-end p-5 overflow-hidden">
              <span
                className="gradient-accent absolute top-0 left-0 right-0 h-1.5"
                aria-hidden="true"
              />
              <span className="absolute top-4 right-4 text-[10px] uppercase tracking-wide text-[var(--color-muted)] border border-black/10 rounded-full px-2 py-0.5">
                Demo
              </span>
              <p className="font-semibold">{slide.clientName}</p>
              <p className="text-sm text-[var(--color-muted)]">
                {slide.category}
              </p>
            </div>
          );
        }}
      />
    </section>
  );
}
