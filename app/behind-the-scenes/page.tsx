import type { ReactNode } from "react";
import MiniTerminal from "@/components/MiniTerminal";

type Item = {
  tag: string;
  title: string;
  description: string;
  visual: ReactNode;
};

const ITEMS: Item[] = [
  {
    tag: "Code",
    title: "Hand-typed, not templated",
    description:
      "Every site starts from scratch and gets built line by line, then reviewed and adjusted by hand — not spat out of a generator and left as-is.",
    visual: (
      <MiniTerminal
        filename="hero.tsx"
        lines={[
          "export default function Hero() {",
          "  return (",
          '    <section className="hero">',
          "      <h1>Built for your business.</h1>",
        ]}
      />
    ),
  },
  {
    tag: "Infrastructure",
    title: "Deployed on Vercel",
    description:
      "Every site gets its own Vercel project — automatic HTTPS, a global CDN, and live in minutes whenever a change ships.",
    visual: (
      <MiniTerminal
        filename="deploy.sh"
        lines={["$ vercel --prod"]}
        resultLine="✓ Deployed to production"
      />
    ),
  },
  {
    tag: "Infrastructure",
    title: "Neon Postgres database",
    description:
      "Anything that needs to persist — bookings, form submissions, orders — is backed by a real Postgres database on Neon, not a spreadsheet or a form that vanishes into the void.",
    visual: (
      <MiniTerminal
        filename="query.sql"
        lines={["INSERT INTO bookings", "VALUES ('Corner Coffee', 'Sat 10am');"]}
        resultLine="✓ 1 row inserted"
      />
    ),
  },
  {
    tag: "Infrastructure",
    title: "Blob storage for media",
    description:
      "Photos, screenshots, and uploads live in proper blob storage, not hardcoded into the repo — so they load fast and update without a redeploy.",
    visual: (
      <MiniTerminal
        filename="upload.ts"
        lines={["await put('photos/hero.jpg', file);"]}
        resultLine="✓ Uploaded to blob storage"
      />
    ),
  },
  {
    tag: "Comms",
    title: "Email set up properly",
    description:
      "Contact and booking forms are wired to real transactional email, so a submission actually lands in an inbox instead of silently failing.",
    visual: (
      <MiniTerminal
        filename="notify.ts"
        lines={["await sendEmail({", "  to: owner,", "  subject: 'New booking',", "});"]}
        resultLine="✓ Email sent"
      />
    ),
  },
  {
    tag: "Comms",
    title: "WhatsApp wired in",
    description:
      "Booking and order CTAs link straight to a real WhatsApp number, tested end to end — not a placeholder that never got swapped in.",
    visual: (
      <MiniTerminal
        filename="whatsapp.ts"
        lines={["sendMessage(customer,", "  'Booking confirmed');"]}
        resultLine="✓ Message delivered"
      />
    ),
  },
  {
    tag: "Polish",
    title: "Tags & metadata, per site",
    description:
      "Page titles, descriptions, and social preview tags are set individually for each business — not left on a generic default that hurts how the site shows up in search or when shared.",
    visual: (
      <MiniTerminal
        filename="layout.tsx"
        lines={["export const metadata = {", "  title: 'Corner Coffee Co.',", "};"]}
        resultLine="✓ Meta tags set"
      />
    ),
  },
];

export default function BehindTheScenesPage() {
  return (
    <>
      <section className="container-page pt-20 pb-12">
        <p className="text-sm text-[var(--color-muted)] mb-3">
          How a site actually gets built
        </p>
        <h1 className="text-4xl md:text-5xl font-bold max-w-2xl mb-6">
          Behind the scenes
        </h1>
        <p className="text-[var(--color-muted)] max-w-lg">
          Not a black box. Here&apos;s what&apos;s actually happening between
          &quot;let&apos;s do this&quot; and your site going live — the
          code, the infrastructure, and the parts most agencies
          don&apos;t show you.
        </p>
      </section>

      <section className="container-page pb-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ITEMS.map((item) => (
            <div
              key={item.title}
              className="gradient-ring rounded-2xl bg-[var(--color-bg-raised)] p-5 flex flex-col"
            >
              <div className="mb-4">{item.visual}</div>
              <span className="text-xs uppercase tracking-wide text-[var(--color-muted)] mb-1">
                {item.tag}
              </span>
              <p className="font-semibold mb-2">{item.title}</p>
              <p className="text-sm text-[var(--color-muted)]">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-page pb-20">
        <div className="gradient-ring rounded-2xl bg-[var(--color-bg-raised)] p-10 md:p-14 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Want to see it built for your business?
          </h2>
          <p className="text-[var(--color-muted)] max-w-md mx-auto mb-8">
            Same process, every time — real code, a real database, and a
            site that&apos;s actually yours to keep.
          </p>
          <a href="/contact" className="btn-primary">
            Get a quote
          </a>
        </div>
      </section>
    </>
  );
}
