import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ParallaxImage from "@/components/rcw-lab/ParallaxImage";
import ScrollReveal from "@/components/rcw-lab/ScrollReveal";
import TiltCard from "@/components/rcw-lab/TiltCard";
import CursorSpotlight from "@/components/rcw-lab/CursorSpotlight";

export const metadata: Metadata = {
  title: "RCW Lab — Where the RCW world comes to life",
  description:
    "Explore the character, visuals, and digital experiments behind RCW.",
  alternates: { canonical: "/rcw-lab" },
};

export default function RcwLabPage() {
  return (
    <>
      <CursorSpotlight />

      {/* Hero */}
      <section className="container-page pt-20 pb-16 text-center relative">
        <ScrollReveal variant="scale">
          <p className="text-sm text-[var(--color-muted)] mb-3">RCW LAB</p>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 gradient-text">
            Where the RCW world comes to life.
          </h1>
          <p className="text-[var(--color-muted)] max-w-lg mx-auto">
            Explore the character, visuals, and digital experiments behind RCW.
          </p>
        </ScrollReveal>
      </section>

      {/* THE BUILDER */}
      <section className="border-t border-black/10">
        <div className="container-page py-24 grid lg:grid-cols-2 gap-12 items-center">
          <ScrollReveal variant="left" className="order-2 lg:order-1">
            <TiltCard
              className="relative aspect-[4/5] rounded-2xl overflow-hidden"
              intensity={6}
            >
              <div className="absolute inset-0 animate-float-a glow-pulse">
                <Image
                  src="/macot (15).png"
                  alt="The Builder — RCW's character"
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-contain"
                />
              </div>
            </TiltCard>
          </ScrollReveal>
          <ScrollReveal
            variant="right"
            delay={150}
            className="order-1 lg:order-2"
          >
            <p className="text-xs uppercase tracking-widest text-[var(--color-muted)] mb-3">
              01 — The Builder
            </p>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              The face behind the build.
            </h2>
            <p className="text-[var(--color-muted)] max-w-md mb-8">
              Every RCW site starts with someone actually sitting down and
              building it — this is who that is.
            </p>
            <Link href="#the-workspace" className="btn-outline inline-flex">
              Meet the character
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* THE WORKSPACE */}
      <section
        id="the-workspace"
        className="border-t border-black/10 bg-[var(--color-bg-raised)]"
      >
        <div className="container-page py-24">
          <ScrollReveal variant="up" className="text-center mb-10">
            <p className="text-xs uppercase tracking-widest text-[var(--color-muted)] mb-3">
              02 — The Workspace
            </p>
            <h2 className="text-3xl md:text-5xl font-bold">Build mode.</h2>
          </ScrollReveal>
          <ScrollReveal variant="scale">
            <TiltCard
              className="group relative aspect-[16/9] rounded-2xl gradient-ring overflow-hidden cursor-pointer"
              intensity={4}
            >
              <video
                src="/mascot (10).mp4"
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                aria-label="From idea to working website"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-90"
              >
                <track
                  kind="captions"
                  srcLang="en"
                  label="No spoken audio"
                  src="/captions-empty.vtt"
                  default
                />
              </video>
            </TiltCard>
          </ScrollReveal>
          <p className="text-center text-sm text-[var(--color-muted)] mt-4">
            Hover or tap the image — from idea to working website.
          </p>
        </div>
      </section>

      {/* THE RCW RIDE — bigger, more cinematic */}
      <section className="border-t border-black/10">
        <div className="relative h-[90vh] overflow-hidden">
          <ParallaxImage
            src="/macot (11).png"
            alt="2013 Toyota 86"
            className="absolute inset-0 h-full w-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="relative z-10 h-full flex flex-col justify-end container-page pb-20 text-white">
            <ScrollReveal variant="up">
              <p className="text-xs uppercase tracking-widest text-white/70 mb-3">
                03 — The RCW Ride
              </p>
              <h2 className="text-5xl md:text-7xl font-bold mb-2 gradient-text">
                Built different.
              </h2>
              <p className="text-white/80 text-lg">
                A little taste of the world behind RCW. 2013 Toyota 86.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* THE JOURNEY */}
      {/* THE JOURNEY */}
      <section className="border-t border-black/10">
        <div className="container-page py-24 grid lg:grid-cols-2 gap-12 items-center">
          <ScrollReveal variant="left">
            <p className="text-xs uppercase tracking-widest text-[var(--color-muted)] mb-3">
              04 — The Journey
            </p>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Keep moving.
            </h2>
            <p className="text-[var(--color-muted)] max-w-md mb-8">
              Every business starts somewhere. RCW helps build what comes next.
            </p>
            <Link href="/services" className="btn-primary inline-flex">
              See what we build
            </Link>
          </ScrollReveal>
          <ScrollReveal variant="right" delay={150}>
            <TiltCard
              className="relative aspect-[4/5] rounded-2xl overflow-hidden"
              intensity={6}
            >
              <video
                src="/mascot (18).mp4"
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                aria-label="Keep moving"
                className="absolute inset-0 h-full w-full object-cover"
              >
                <track
                  kind="captions"
                  srcLang="en"
                  label="No spoken audio"
                  src="/captions-empty.vtt"
                  default
                />
              </video>
            </TiltCard>
          </ScrollReveal>
        </div>
      </section>

      {/* THE ATTITUDE */}
      <section className="border-t border-black/10 bg-[var(--color-bg-raised)]">
        <div className="container-page py-24 grid lg:grid-cols-2 gap-12 items-center">
          <ScrollReveal variant="right" className="order-2 lg:order-2">
            <TiltCard
              className="relative aspect-square rounded-2xl overflow-hidden"
              intensity={8}
            >
              <Image
                src="/macot (14).png"
                alt="Your standards, your vision, your build"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </TiltCard>
          </ScrollReveal>
          <ScrollReveal
            variant="left"
            delay={150}
            className="order-1 lg:order-1"
          >
            <p className="text-xs uppercase tracking-widest text-[var(--color-muted)] mb-3">
              05 — The Attitude
            </p>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight">
              Your standards.
              <br />
              Your vision.
              <br />
              Your build.
            </h2>
          </ScrollReveal>
        </div>
      </section>

      {/* COMING TO LIFE */}
      <section className="border-t border-black/10">
        <div className="container-page py-24">
          <ScrollReveal variant="up" className="text-center mb-10">
            <p className="text-xs uppercase tracking-widest text-[var(--color-muted)] mb-3">
              06 — Coming to Life
            </p>
            <h2 className="text-3xl md:text-5xl font-bold">Image → motion.</h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 gap-6">
            <ScrollReveal variant="left">
              <TiltCard
                className="relative aspect-square rounded-2xl overflow-hidden gradient-ring"
                intensity={5}
              >
                <Image
                  src="/macot (13).png"
                  alt="Original artwork"
                  fill
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
                <span className="absolute bottom-3 left-3 text-xs font-medium text-white bg-black/50 rounded-full px-3 py-1">
                  Original
                </span>
              </TiltCard>
            </ScrollReveal>
            <ScrollReveal variant="right">
              <TiltCard
                className="relative aspect-square rounded-2xl overflow-hidden gradient-ring"
                intensity={5}
              >
                <video
                  src="/macot (12).mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <span className="absolute bottom-3 left-3 text-xs font-medium text-white bg-black/50 rounded-full px-3 py-1">
                  In motion
                </span>
              </TiltCard>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
}
