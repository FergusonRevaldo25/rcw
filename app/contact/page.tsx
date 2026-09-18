"use client";

import { useRef, useState } from "react";
import { useSiteConfig } from "@/lib/site-config";
import {
  BACKGROUND_STYLES,
  IMAGE_OPTIONS,
  swatchLabel,
  optionLabel,
} from "@/lib/customize-options";

// Same number used by the floating WhatsApp button and the mascot sticker —
// keep all three in sync if the business number ever changes.
const WHATSAPP_NUMBER = "27656855335";

function formatRand(value: number) {
  return `R${value.toLocaleString("en-ZA")}`;
}

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [sentVia, setSentVia] = useState<"whatsapp" | "email" | null>(null);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const {
    primary,
    secondary,
    accent,
    background,
    images,
    domainIdea,
    budget,
    tierLabel,
    budgetFeatures,
  } = useSiteConfig();

  const primaryLabel = swatchLabel(primary);
  const secondaryLabel = swatchLabel(secondary);
  const accentLabel = swatchLabel(accent);
  const backgroundLabel = optionLabel(BACKGROUND_STYLES, background);
  const imagesLabel = optionLabel(IMAGE_OPTIONS, images);

  const hasCustomizeSelections =
    primaryLabel ||
    secondaryLabel ||
    accentLabel ||
    backgroundLabel ||
    imagesLabel ||
    domainIdea;
  const hasBudgetSelection = budget !== null && tierLabel;

  function buildMessage(formData: FormData) {
    const name = formData.get("name") as string;
    const business = formData.get("business") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    const lines = [
      `New quote request from ${name || "—"}`,
      business ? `Business: ${business}` : null,
      email ? `Email: ${email}` : null,
      "",
      message || "(no message added)",
    ];

    if (hasBudgetSelection) {
      lines.push("", "--- Budget ---", `${formatRand(budget!)} — ${tierLabel}`);
      if (budgetFeatures.length > 0) {
        lines.push("Included at this budget:");
        budgetFeatures.forEach((f) => lines.push(`  • ${f}`));
      }
    }

    if (hasCustomizeSelections) {
      lines.push("", "--- Picked on /customize ---");
      if (primaryLabel) lines.push(`Primary colour: ${primaryLabel}`);
      if (secondaryLabel) lines.push(`Secondary colour: ${secondaryLabel}`);
      if (accentLabel) lines.push(`Accent colour: ${accentLabel}`);
      if (backgroundLabel) lines.push(`Background style: ${backgroundLabel}`);
      if (imagesLabel) lines.push(`Images: ${imagesLabel}`);
      if (domainIdea) lines.push(`Domain idea: ${domainIdea}`);
    }

    return lines.filter((l) => l !== null).join("\n");
  }

  async function handleSend(channel: "whatsapp" | "email") {
    const form = formRef.current;
    if (!form || !form.reportValidity()) return;

    const formData = new FormData(form);
    const messageBody = buildMessage(formData);

    if (channel === "whatsapp") {
      const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(messageBody)}`;
      window.open(url, "_blank", "noopener,noreferrer");
      setSentVia(channel);
      setSubmitted(true);
      return;
    }

    // Real server-side send via /api/contact — reaches your inbox no
    // matter what email setup the visitor's own device has (or doesn't
    // have), unlike mailto which depended on that.
    setSending(true);
    setError(null);

    const business = formData.get("business") as string;
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject: `Quote request — ${business || name || "New enquiry"}`,
          message: messageBody,
          replyTo: email,
          customerName: name,
          honeypot: formData.get("company_website"),
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || "Something went wrong sending this.");
      }

      setSentVia("email");
      setSubmitted(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Couldn't send that — try WhatsApp instead, or check back shortly.",
      );
    } finally {
      setSending(false);
    }
  }

  return (
    <section className="container-page py-20 max-w-xl">
      <h1 className="text-4xl font-bold mb-4">Get a quote</h1>
      <p className="text-[var(--color-muted)] mb-10">
        Tell us about your business and what you need. We'll reply within a day
        with a straight answer on cost and timeline.
      </p>

      {submitted ? (
        <div className="rounded-xl border border-black/10 bg-[var(--color-bg-raised)] p-6">
          <p className="font-semibold mb-1">
            {sentVia === "whatsapp" ? "WhatsApp opened" : "Message sent"}
          </p>
          <p className="text-sm text-[var(--color-muted)]">
            {sentVia === "whatsapp"
              ? "Your details, budget, and any Customize picks are already in the message — just hit send in WhatsApp."
              : "It's landed in our inbox with your budget and any Customize picks attached. We'll reply within a day. Check your email for a confirmation with your reference number."}
          </p>
        </div>
      ) : (
        <>
          {error && (
            <div className="rounded-xl border border-[var(--color-magenta)]/30 bg-[var(--color-bg-raised)] p-4 mb-6 text-sm">
              {error}
            </div>
          )}

          {(hasCustomizeSelections || hasBudgetSelection) && (
            <div className="rounded-xl border border-black/10 bg-[var(--color-bg-raised)] p-5 mb-8">
              <p className="text-sm font-semibold mb-3">
                This will be sent along with your message
              </p>
              <ul className="space-y-1 text-sm text-[var(--color-muted)]">
                {hasBudgetSelection && (
                  <li>
                    Budget: {formatRand(budget!)} — {tierLabel}
                    {budgetFeatures.length > 0 && (
                      <span className="block text-xs mt-0.5">
                        {budgetFeatures.length} items included
                      </span>
                    )}
                  </li>
                )}
                {primaryLabel && <li>Primary colour: {primaryLabel}</li>}
                {secondaryLabel && <li>Secondary colour: {secondaryLabel}</li>}
                {accentLabel && <li>Accent colour: {accentLabel}</li>}
                {backgroundLabel && (
                  <li>Background style: {backgroundLabel}</li>
                )}
                {imagesLabel && <li>Images: {imagesLabel}</li>}
                {domainIdea && <li>Domain idea: {domainIdea}</li>}
              </ul>
            </div>
          )}

          <form ref={formRef} className="space-y-5">
            {/* Honeypot field — hidden from real users via CSS, bots fill
                it in. Checked server-side in /api/contact. */}
            <input
              type="text"
              name="company_website"
              tabIndex={-1}
              autoComplete="off"
              className="absolute -left-[9999px]"
              aria-hidden="true"
            />

            <div>
              <label htmlFor="name" className="block text-sm mb-1.5">
                Name
              </label>
              <input
                id="name"
                name="name"
                required
                className="w-full rounded-md bg-[var(--color-bg-raised)] border border-black/10 px-4 py-2.5 focus:outline-none focus:border-[var(--color-magenta)]"
              />
            </div>

            <div>
              <label htmlFor="business" className="block text-sm mb-1.5">
                Business name
              </label>
              <input
                id="business"
                name="business"
                className="w-full rounded-md bg-[var(--color-bg-raised)] border border-black/10 px-4 py-2.5 focus:outline-none focus:border-[var(--color-magenta)]"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm mb-1.5">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full rounded-md bg-[var(--color-bg-raised)] border border-black/10 px-4 py-2.5 focus:outline-none focus:border-[var(--color-magenta)]"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm mb-1.5">
                What do you need?
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                className="w-full rounded-md bg-[var(--color-bg-raised)] border border-black/10 px-4 py-2.5 focus:outline-none focus:border-[var(--color-magenta)]"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => handleSend("whatsapp")}
                className="btn-primary flex-1 justify-center"
              >
                Send via WhatsApp
              </button>
              <button
                type="button"
                onClick={() => handleSend("email")}
                disabled={sending}
                className="btn-outline flex-1 justify-center disabled:opacity-60"
              >
                {sending ? "Sending…" : "Send via email"}
              </button>
            </div>
          </form>
        </>
      )}
    </section>
  );
}
