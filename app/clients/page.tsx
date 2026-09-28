import type { Metadata } from "next";
import Link from "next/link";
import { existsSync } from "fs";
import path from "path";
import ClientCard from "@/components/ClientCard";

export const metadata: Metadata = {
  title: "Clients",
  description:
    "Real websites RCW has built for real clients — see the live sites for Retreat RFC and Hope Rugby Academy.",
  alternates: { canonical: "/clients" },
};

type Client = {
  id: string;
  name: string;
  category: string;
  description: string;
  url: string;
  // Optional manual override. Normally you don't need this — just save a
  // screenshot as /public/clients/<id>.webp (or .png / .jpg) and it's
  // picked up automatically. With no file, the card shows initials.
  screenshot?: string;
};

// Add a new client by adding one entry here — the grid adapts automatically.
const CLIENTS: Client[] = [
  {
    id: "retreat-rfc",
    name: "Retreat RFC",
    category: "Rugby club",
    description: "A full website built for a local rugby club.",
    url: "https://retreatrfc-full.vercel.app/",
  },
  {
    id: "hope-rugby-academy",
    name: "Hope Rugby Academy",
    category: "Rugby academy",
    description: "A website built for a rugby academy.",
    url: "https://www.hoperugbyacademy.co.za/",
  },
];

function displayDomain(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

// Looks for /public/clients/<id>.webp|png|jpg at build/render time, so a
// missing file just falls back to the placeholder instead of a broken image.
function findScreenshot(id: string) {
  for (const ext of ["webp", "png", "jpg"]) {
    const file = path.join(process.cwd(), "public", "clients", `${id}.${ext}`);
    if (existsSync(file)) return `/clients/${id}.${ext}`;
  }
  return undefined;
}

export default function ClientsPage() {
  return (
    <>
      <section className="container-page pt-20 pb-12">
        <p className="text-sm text-[var(--color-muted)] mb-3">Clients</p>
        <h1 className="text-4xl md:text-5xl font-bold max-w-2xl mb-6">
          Real sites, live right now.
        </h1>
        <p className="text-[var(--color-muted)] max-w-lg">
          Every site below is built, deployed, and running for a real client.
          Load a live preview right on the card, or open the site itself.
        </p>
      </section>

      <section className="container-page pb-20">
        <div className="grid sm:grid-cols-2 gap-8">
          {CLIENTS.map((client) => (
            <ClientCard
              key={client.id}
              name={client.name}
              category={client.category}
              description={client.description}
              url={client.url}
              domain={displayDomain(client.url)}
              initials={initials(client.name)}
              screenshot={client.screenshot ?? findScreenshot(client.id)}
            />
          ))}
        </div>
      </section>

      <section className="container-page pb-20">
        <div className="gradient-ring rounded-2xl bg-[var(--color-bg-raised)] p-10 md:p-14 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Want yours to be next?
          </h2>
          <p className="text-[var(--color-muted)] max-w-md mx-auto mb-8">
            Tell us about your business and we&apos;ll reply with a straight
            answer on cost and timeline.
          </p>
          <Link href="/contact" className="btn-primary">
            Get a quote
          </Link>
        </div>
      </section>
    </>
  );
}
