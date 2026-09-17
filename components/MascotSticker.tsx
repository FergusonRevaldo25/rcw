"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

// Same WhatsApp number as the main floating button — keep these two in sync
// if you ever change your business number.
const WHATSAPP_NUMBER = "27656855335";
const PREFILLED_MESSAGE = "Hi RCW, I'd like a quote for a website.";

// Each pose crossfades into the next automatically. Add/remove/reorder
// entries here — everything else adapts. Message is optional per pose;
// omit it to reuse the previous pose's message.
const POSES = [
  { src: "/mascot (1).png", message: "Speak to me on WhatsApp 👋" },
  { src: "/mascot (2).png", message: "Free quote? Just ask 👍" },
  { src: "/mascot (3).png", message: "Hey! Got a project in mind? 👋" },
  { src: "/mascot (4).png", message: "Why don't you have a website yet?! 😤" },
  { src: "/mascot (5).png", message: "Get one noooow!! 🔥" },
];

const POSE_INTERVAL_MS = 5000; // how long each pose shows before crossfading to the next
const VISIBLE_MS = 45000; // how long the whole sticker stays up before fading out
const HIDDEN_MS = 12000; // how long it stays gone before fading back in

export default function MascotSticker() {
  const [dismissed, setDismissed] = useState(false);
  const [visible, setVisible] = useState(true);
  const [poseIndex, setPoseIndex] = useState(0);

  // Reset the sticker when the visitor arrives back on the homepage —
  // this is what makes "return to the home page" bring it back, even if
  // this component lives in a root layout and never actually unmounts.
  const pathname = usePathname();
  const prevPathname = useRef(pathname);
  useEffect(() => {
    if (pathname === "/" && prevPathname.current !== "/") {
      setDismissed(false);
      setVisible(true);
      setPoseIndex(0);
    }
    prevPathname.current = pathname;
  }, [pathname]);

  // Show/hide loop — keeps repeating forever unless the user dismissed it.
  useEffect(() => {
    if (dismissed) return;
    const timer = setTimeout(
      () => setVisible((v) => !v),
      visible ? VISIBLE_MS : HIDDEN_MS,
    );
    return () => clearTimeout(timer);
  }, [visible, dismissed]);

  // Pose crossfade — only runs while the sticker is actually on screen.
  useEffect(() => {
    if (dismissed || !visible) return;
    const timer = setInterval(
      () => setPoseIndex((i) => (i + 1) % POSES.length),
      POSE_INTERVAL_MS,
    );
    return () => clearInterval(timer);
  }, [visible, dismissed]);

  if (dismissed) return null;

  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    PREFILLED_MESSAGE,
  )}`;
  const currentMessage =
    POSES[poseIndex].message ??
    [...POSES.slice(0, poseIndex + 1)].reverse().find((p) => p.message)
      ?.message;

  return (
    <div
      aria-hidden={!visible}
      className={`fixed bottom-0 left-2 sm:left-4 z-40 hidden sm:block transition-all duration-500 ${
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-6 pointer-events-none"
      }`}
    >
      <div className="relative w-44 md:w-56 lg:w-64">
        {/* Dismiss button — sits outside the <a> so it's valid HTML
            (a <button> can't nest inside an <a>) and clicks on it don't
            also trigger the WhatsApp link. */}
        <button
          type="button"
          onClick={() => setDismissed(true)}
          aria-label="Hide this sticker"
          className="absolute -top-2 -right-2 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-white border border-black/10 shadow-md text-black/60 hover:text-black hover:bg-black/5 transition-colors"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M1 1L11 11M11 1L1 11"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Speak to us on WhatsApp"
          className="group block"
        >
          {/* Mascot — all three poses stacked in the same spot, crossfaded
              via opacity so swapping never causes a layout jump. */}
          <div className="relative w-full aspect-[865/1092] transition-transform group-hover:-translate-y-1 group-hover:rotate-1">
            {POSES.map((pose, i) => (
              <Image
                key={pose.src}
                src={pose.src}
                alt=""
                aria-hidden="true"
                fill
                sizes="(min-width: 1024px) 256px, (min-width: 768px) 224px, 176px"
                className={`object-contain object-bottom drop-shadow-2xl transition-opacity duration-700 ease-in-out ${
                  i === poseIndex ? "opacity-100" : "opacity-0"
                }`}
                priority={i === 0}
              />
            ))}
          </div>

          {/* Speech bubble — anchored to the right of the head. Text
              crossfades along with the pose. */}
          <div
            aria-hidden="true"
            className="absolute top-[8%] left-[92%] w-44 sm:w-48 rounded-2xl bg-white border border-black/10 shadow-lg px-4 py-2.5 transition-transform group-hover:-translate-y-0.5"
          >
            <span className="relative flex h-2.5 w-2.5 shrink-0 mb-1">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-magenta)] opacity-60" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[var(--color-magenta)]" />
            </span>
            <p
              key={poseIndex}
              className="text-sm font-medium leading-snug text-[var(--color-fg)] transition-opacity duration-500"
            >
              {currentMessage}
            </p>
            {/* Tail pointing left, back at the mascot's head */}
            <span
              aria-hidden="true"
              className="absolute top-1/2 -left-2 -translate-y-1/2 h-4 w-4 bg-white border-l border-b border-black/10 rotate-45"
            />
          </div>
        </a>
      </div>
    </div>
  );
}
