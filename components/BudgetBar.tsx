"use client";

import { useEffect, useMemo, useState } from "react";
import { useSiteConfig } from "@/lib/site-config";

// Broad stage name shown as the big header — a handful of milestones, not
// tied to every R500 step. Just gives the price a "feel."
type Stage = { min: number; label: string };

const STAGES: Stage[] = [
  { min: 500, label: "Starter landing page" },
  { min: 2000, label: "Single-page site" },
  { min: 5000, label: "Small multi-page site" },
  { min: 8000, label: "Multi-page site" },
  { min: 15000, label: "Full custom build" },
  { min: 22000, label: "Booking-enabled site" },
  { min: 30000, label: "E-commerce starter" },
  { min: 36000, label: "Full web app" },
];

// The actual checklist — a specific thing unlocks roughly every R500–1500,
// so dragging the slider visibly builds up the quote step by step instead
// of jumping between a few big brackets.
type Feature = { min: number; label: string };

const FEATURES: Feature[] = [
  { min: 500, label: "1 page" },
  { min: 1000, label: "Mobile-friendly design" },
  { min: 1500, label: "Custom colour scheme" },
  { min: 2000, label: "Custom design, not a template" },
  { min: 2500, label: "Contact form" },
  { min: 3000, label: "Up to 3 pages" },
  { min: 3500, label: "Basic SEO setup" },
  { min: 4000, label: "Social media links" },
  { min: 4500, label: "Google Maps embed" },
  { min: 5000, label: "Up to 5 pages" },
  { min: 5500, label: "Photo gallery" },
  { min: 6000, label: "Testimonials section" },
  { min: 6500, label: "WhatsApp click-to-chat button" },
  { min: 7000, label: "FAQ section" },
  { min: 7500, label: "Blog / news section" },
  { min: 8500, label: "Animations & transitions" },
  { min: 9500, label: "CMS — log in and edit content yourself" },
  { min: 10500, label: "Unlimited pages" },
  { min: 12000, label: "Newsletter signup" },
  { min: 13500, label: "Advanced SEO (schema, sitemap)" },
  { min: 15000, label: "Calendar / booking system" },
  { min: 17000, label: "Automated email confirmations" },
  { min: 19500, label: "Customer accounts / login" },
  { min: 22000, label: "Online payments" },
  { min: 25000, label: "Product catalog" },
  { min: 28000, label: "Order management dashboard" },
  { min: 31000, label: "Admin dashboard" },
  { min: 34000, label: "PWA — installable, works offline" },
  { min: 37000, label: "Custom integrations / API work" },
];

const MIN = 500;
const MAX = 40000;
const STEP = 500;

function formatRand(value: number) {
  return `R${value.toLocaleString("en-ZA")}`;
}

export default function BudgetBar() {
  const [budget, setBudget] = useState(10000);
  const { update } = useSiteConfig();

  const stage = useMemo(() => {
    return [...STAGES].reverse().find((s) => budget >= s.min) ?? STAGES[0];
  }, [budget]);

  const unlockedFeatures = useMemo(
    () => FEATURES.filter((f) => budget >= f.min),
    [budget],
  );

  const nextFeature = useMemo(
    () => FEATURES.find((f) => budget < f.min),
    [budget],
  );

  // Keep the shared config in sync so the Contact page can send along the
  // full checklist, not just the broad stage name.
  useEffect(() => {
    update({
      budget,
      tierLabel: stage.label,
      budgetFeatures: unlockedFeatures.map((f) => f.label),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [budget, stage.label, unlockedFeatures]);

  return (
    <div className="gradient-ring rounded-2xl bg-[var(--color-bg-raised)] p-6 md:p-8">
      <div className="flex items-baseline justify-between mb-6">
        <p className="text-sm text-[var(--color-muted)]">Drag your budget</p>
        <p className="text-3xl font-bold gradient-text font-[var(--font-display)]">
          {formatRand(budget)}
        </p>
      </div>

      <input
        type="range"
        min={MIN}
        max={MAX}
        step={STEP}
        value={budget}
        onChange={(e) => setBudget(Number(e.target.value))}
        className="gradient-range"
        aria-label="Select your budget"
      />

      <div className="mt-8">
        <p className="text-lg font-semibold mb-3">{stage.label}</p>

        <ul className="space-y-1.5 max-h-48 overflow-y-auto no-scrollbar pr-1">
          {unlockedFeatures.map((f) => (
            <li key={f.label} className="flex items-center gap-2 text-sm">
              <svg width="14" height="14" viewBox="0 0 12 12" fill="none" className="shrink-0 text-[var(--color-magenta)]">
                <path d="M2 6l2.5 2.5L10 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {f.label}
            </li>
          ))}
        </ul>

        {nextFeature && (
          <p className="mt-3 text-xs text-[var(--color-muted)]">
            +{formatRand(nextFeature.min - budget)} unlocks:{" "}
            <span className="font-medium text-[var(--color-fg)]">{nextFeature.label}</span>
          </p>
        )}

        <a href="/contact" className="btn-primary mt-6 inline-flex">
          Get this quote
        </a>
      </div>

      <p className="mt-6 text-xs text-[var(--color-muted)] border-t border-black/10 pt-4">
        This is a once-off build cost. Your domain (renewed yearly, price
        depends on which one you pick) and any support after launch are
        billed separately —{" "}
        <a href="/faq" className="underline hover:text-[var(--color-fg)]">
          see the FAQ
        </a>{" "}
        for how that works.
      </p>
    </div>
  );
}
