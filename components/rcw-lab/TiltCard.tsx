"use client";

import { useRef } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
};

// Rotates the card toward the cursor as it moves across it, resets smoothly
// on mouse leave. Pure CSS transform, no 3D library required.
export default function TiltCard({
  children,
  className,
  intensity = 10,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    const rotateY = x * intensity * 2;
    const rotateX = -y * intensity * 2;
    el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`;
  }

  function handleMouseLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.transform =
      "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`transition-transform duration-200 ease-out will-change-transform ${className ?? ""}`}
      // transform-style: preserve-3d removed — it forced any <video>
      // inside the card into a 3D compositing path that flickers/tears in
      // Chrome and Safari. Not needed here since every usage wraps a
      // single flat image or video, not layered 3D children, so dropping
      // it changes nothing visually while fixing the video glitch.
      // backfaceVisibility hidden is extra insurance against the same bug.
      style={{
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
      }}
    >
      {children}
    </div>
  );
}
