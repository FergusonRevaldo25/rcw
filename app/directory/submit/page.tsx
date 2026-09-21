"use client";

import { useState } from "react";

const CATEGORIES = [
  "Web design",
  "E-commerce",
  "Mobile app",
  "Branding / design",
  "Other",
];

export default function SubmitPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    if (data.rcw_hp_field) {
      setStatus("sent");
      return;
    }

    try {
      const res = await fetch("/api/directory-submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <section className="container-page py-20">
        <div className="gradient-ring rounded-2xl bg-[var(--color-bg-raised)] p-10 text-center max-w-lg mx-auto">
          <h1 className="text-2xl font-bold mb-2">Got it, thanks.</h1>
          <p className="text-[var(--color-muted)]">
            We'll check the link and screenshot, then add you to the{" "}
            <a
              href="/directory"
              className="underline hover:text-[var(--color-fg)]"
            >
              directory
            </a>{" "}
            — usually within a couple of days.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="container-page py-20">
      <h1 className="text-4xl font-bold mb-4">List your work</h1>
      <p className="text-[var(--color-muted)] max-w-lg mb-12">
        Show your own projects on the RCW directory. We review each submission
        before it goes live — mainly just to check the link and screenshot
        actually match.
      </p>

      <form onSubmit={handleSubmit} className="max-w-lg space-y-5">
        <input
          type="text"
          name="rcw_hp_field"
          tabIndex={-1}
          autoComplete="off"
          data-lpignore="true"
          style={{ display: "none" }}
          aria-hidden="true"
        />

        <div>
          <label
            htmlFor="devName"
            className="text-sm text-[var(--color-muted)]"
          >
            Your name *
          </label>
          <input
            id="devName"
            name="devName"
            type="text"
            required
            className="mt-1 w-full rounded-lg border border-black/15 bg-transparent px-4 py-2.5"
          />
        </div>

        <div>
          <label
            htmlFor="studioName"
            className="text-sm text-[var(--color-muted)]"
          >
            Studio / business name (optional)
          </label>
          <input
            id="studioName"
            name="studioName"
            type="text"
            className="mt-1 w-full rounded-lg border border-black/15 bg-transparent px-4 py-2.5"
          />
        </div>

        <div>
          <label htmlFor="url" className="text-sm text-[var(--color-muted)]">
            Link to the project *
          </label>
          <input
            id="url"
            name="url"
            type="url"
            required
            placeholder="https://"
            className="mt-1 w-full rounded-lg border border-black/15 bg-transparent px-4 py-2.5"
          />
        </div>

        <div>
          <label
            htmlFor="screenshotUrl"
            className="text-sm text-[var(--color-muted)]"
          >
            Screenshot URL *
          </label>
          <input
            id="screenshotUrl"
            name="screenshotUrl"
            type="url"
            required
            placeholder="https://"
            className="mt-1 w-full rounded-lg border border-black/15 bg-transparent px-4 py-2.5"
          />
          <p className="mt-1 text-xs text-[var(--color-muted)]">
            A direct image link (imgur, your own site, etc). No file upload yet.
          </p>
        </div>

        <div>
          <label
            htmlFor="category"
            className="text-sm text-[var(--color-muted)]"
          >
            Category
          </label>
          <select
            id="category"
            name="category"
            className="mt-1 w-full rounded-lg border border-black/15 bg-transparent px-4 py-2.5"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="tagline"
            className="text-sm text-[var(--color-muted)]"
          >
            One-line description *
          </label>
          <input
            id="tagline"
            name="tagline"
            type="text"
            required
            maxLength={80}
            placeholder="e.g. Shopify builds for small retailers"
            className="mt-1 w-full rounded-lg border border-black/15 bg-transparent px-4 py-2.5"
          />
        </div>

        <div>
          <label
            htmlFor="contact"
            className="text-sm text-[var(--color-muted)]"
          >
            Your contact (email or WhatsApp) *
          </label>
          <input
            id="contact"
            name="contact"
            type="text"
            required
            className="mt-1 w-full rounded-lg border border-black/15 bg-transparent px-4 py-2.5"
          />
          <p className="mt-1 text-xs text-[var(--color-muted)]">
            Only used if we have a question about your listing — never shown
            publicly.
          </p>
        </div>

        <button
          type="submit"
          disabled={status === "sending"}
          className="btn-primary"
        >
          {status === "sending" ? "Sending..." : "Submit for review"}
        </button>

        {status === "error" && (
          <p className="text-sm text-red-600">
            Something went wrong — try again, or message us directly.
          </p>
        )}
      </form>
    </section>
  );
}
