"use client";

import Image from "next/image";
import { useState } from "react";

type ClientCardProps = {
  name: string;
  category: string;
  description: string;
  url: string;
  domain: string;
  initials: string;
  screenshot?: string;
};

export default function ClientCard({
  name,
  category,
  description,
  url,
  domain,
  initials,
  screenshot,
}: ClientCardProps) {
  // Nothing about the live site is fetched until "Load live preview" is
  // clicked — these are real client sites (one is ~10MB of video), so
  // loading them up-front would tank this page for mobile visitors.
  const [live, setLive] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);

  function openPreview() {
    setLoaded(false);
    setLive(true);
    setHasOpened(true);
  }

  const pillButton =
    "inline-flex items-center justify-center min-h-[44px] rounded-full bg-black/75 px-5 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-black/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-magenta)]";

  return (
    <div className="group gradient-ring rounded-2xl">
      <div className="rounded-2xl overflow-hidden bg-[var(--color-bg-raised)]">
        {/* Browser-window frame */}
        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-black/10 bg-[var(--color-bg)]">
          <span className="flex gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F56]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#27C93F]" />
          </span>
          <span className="ml-2 flex-1 truncate rounded-full bg-black/5 px-3 py-1 text-xs text-[var(--color-muted)]">
            {domain}
          </span>
        </div>

        <div className="relative aspect-[16/10] overflow-hidden bg-black/5">
          {live ? (
            <>
              {!loaded && (
                <span
                  role="status"
                  className="absolute inset-0 flex items-center justify-center text-sm text-[var(--color-muted)]"
                >
                  Loading preview…
                </span>
              )}

              {/* Rendered at 2.5x size then scaled to 40%, so the preview
                  shows the whole desktop layout instead of a cropped
                  corner. Non-interactive on purpose: scrolling inside a
                  shrunken frame would hijack page scrolling. */}
              <iframe
                src={url}
                title={`Live preview of ${name}`}
                scrolling="no"
                sandbox="allow-scripts allow-same-origin"
                onLoad={() => setLoaded(true)}
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
                  opacity: loaded ? 1 : 0,
                  transition: "opacity 300ms ease",
                }}
              />

              <button
                type="button"
                autoFocus
                onClick={() => setLive(false)}
                className={`${pillButton} absolute top-3 right-3 z-10`}
              >
                Close preview
              </button>
            </>
          ) : (
            <>
              {screenshot ? (
                <Image
                  src={screenshot}
                  alt={`Screenshot of the ${name} website`}
                  fill
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span
                    aria-hidden="true"
                    className="text-6xl font-bold gradient-text"
                  >
                    {initials}
                  </span>
                </div>
              )}

              <button
                type="button"
                autoFocus={hasOpened}
                onClick={openPreview}
                aria-label={`Load live preview of ${name}`}
                className={`${pillButton} absolute bottom-4 left-1/2 -translate-x-1/2 z-10`}
              >
                Load live preview
              </button>
            </>
          )}
        </div>

        <div className="p-6">
          <p className="text-xs uppercase tracking-widest text-[var(--color-muted)] mb-2">
            {category}
          </p>
          <h2 className="text-xl font-bold mb-2">{name}</h2>
          <p className="text-sm text-[var(--color-muted)] mb-2">{description}</p>
          {live && (
            <p className="text-xs text-[var(--color-muted)] mb-2">
              Preview blank? Some sites block being shown inside other pages —
              use the link below instead.
            </p>
          )}
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit ${name} (opens in a new tab)`}
            className="inline-flex items-center gap-1 min-h-[44px] text-sm font-semibold underline-offset-4 hover:underline"
          >
            Visit live site <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </div>
  );
}
