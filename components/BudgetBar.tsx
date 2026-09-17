"use client";

import { useEffect, useMemo, useState } from "react";
import { useSiteConfig } from "@/lib/site-config";

type Tier = {
  min: number;
  label: string;
  includes: string[];
};

const TIERS: Tier[] = [
  {
    min: 500,
    label: "Starter landing page",
    includes: ["1 page", "Mobile-friendly", "Live in 3–5 days"],
  },
  {
    min: 2000,
    label: "Single-page site",
    includes: ["1 page, custom design", "Contact form", "Live in a week"],
  },
  {
    min: 5000,
    label: "Small multi-page site",
    includes: ["Up to 3 pages", "Contact form", "Basic SEO setup"],
  },
  {
    min: 8000,
    label: "Multi-page site",
    includes: ["Up to 5 pages", "Photo gallery / testimonials", "WhatsApp integration"],
  },
  {
    min: 15000,
    label: "Full custom build",
    includes: ["Unlimited pages", "Animations", "CMS — log in and edit content yourself"],
  },
  {
    min: 22000,
    label: "Booking-enabled site",
    includes: ["Everything above", "Calendar / booking system", "Automated email confirmations"],
  },
  {
    min: 30000,
    label: "E-commerce starter",
    includes: ["Online payments", "Product catalog", "Order management"],
  },
  {
    min: 36000,
    label: "Full web app",
    includes: ["Custom features", "Admin dashboard", "PWA — installable, works offline"],
  },
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

  const tier = useMemo(() => {
    return [...TIERS].reverse().find((t) => budget >= t.min) ?? TIERS[0];
  }, [budget]);

  // Keep the shared config in sync so the Contact page can send along
  // whatever budget/tier the visitor last landed on here.
  useEffect(() => {
    update({ budget, tierLabel: tier.label });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [budget, tier.label]);

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

      <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <p className="text-lg font-semibold">{tier.label}</p>
          <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-[var(--color-muted)]">
            {tier.includes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <a href="/contact" className="btn-primary shrink-0">
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
