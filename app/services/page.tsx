import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Website design, e-commerce, ongoing support, and more — see exactly what's included at every RCW budget level.",
  alternates: { canonical: "/services" },
};

const services = [
  {
    title: "Website design & build",
    body: "A custom-designed site built around your business, not a template with your logo dropped in.",
  },
  {
    title: "Booking & contact forms",
    body: "So customers can reach you or book you directly from the site, no phone tag required.",
  },
  {
    title: "Online ordering & payments",
    body: "Take orders or deposits straight through the site if your business needs it.",
  },
  {
    title: "Ongoing edits & support",
    body: "Need a price changed or a new photo added? We keep the site current after launch.",
  },
];

export default function ServicesPage() {
  return (
    <section className="container-page py-20">
      <h1 className="text-4xl font-bold mb-4">Services</h1>
      <p className="text-[var(--color-muted)] max-w-lg mb-12">
        Everything below can be mixed and matched to fit your budget — use the
        budget slider on the home page to see what fits.
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        {services.map((s) => (
          <div
            key={s.title}
            className="rounded-xl border border-black/10 bg-[var(--color-bg-raised)] p-6 overflow-hidden relative"
          >
            <span
              className="gradient-accent absolute top-0 left-0 right-0 h-1.5"
              aria-hidden="true"
            />
            <p className="font-semibold mb-2">{s.title}</p>
            <p className="text-sm text-[var(--color-muted)]">{s.body}</p>
          </div>
        ))}
      </div>

      <a href="/contact" className="btn-primary mt-12 inline-flex">
        Get a quote
      </a>
    </section>
  );
}
