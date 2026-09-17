"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const PEEK_INTERVAL_MS = 4000; // how often it pops out / retreats

export default function TopRightMascotPeek() {
  const [popped, setPopped] = useState(false);

  // Pop out shortly after the page loads, then keep peeking in and out
  // on a loop.
  useEffect(() => {
    const initial = setTimeout(() => setPopped(true), 800);
    const loop = setInterval(() => setPopped((p) => !p), PEEK_INTERVAL_MS);
    return () => {
      clearTimeout(initial);
      clearInterval(loop);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className={`fixed top-25 right-0 z-20 hidden sm:block transition-transform duration-700 ease-in-out ${
        popped ? "translate-x-0" : "translate-x-[65%]"
      }`}
    >
      <div className="relative w-60 md:w-100">
        <Image
          src="/mascot (6).png"
          alt=""
          aria-hidden="true"
          width={865}
          height={1092}
          className="w-full h-auto drop-shadow-2xl"
        />
      </div>
    </div>
  );
}
