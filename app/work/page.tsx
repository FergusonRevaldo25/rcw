type Project = {
  name: string;
  type: string;
  url: string;
};

const projects: Project[] = [
  {
    name: "Corner Coffee Co.",
    type: "Cafe · booking site",
    url: "https://corner-coffee-silk.vercel.app",
  },
  {
    name: "Atlas Auto Repair",
    type: "Mechanic · service booking",
    url: "https://atlas-auto-repair.vercel.app",
  },
  {
    name: "Bloom & Co Florist",
    type: "Retail · online ordering",
    url: "https://bloom-and-co-rho.vercel.app",
  },
  {
    name: "Riverside Dental",
    type: "Healthcare · appointment booking",
    url: "https://riverside-dental-one.vercel.app",
  },
];

export default function WorkPage() {
  return (
    <section className="container-page py-20">
      <h1 className="text-4xl font-bold mb-4 text-center mx-auto">
        Templates Build for Showcasing
      </h1>
      <p className="text-[var(--color-muted)] max-w-lg mb-12 mx-auto">
        "Standard Boring Templates I know , why dont you make them better?"
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {projects.map((project) => (
          <a
            key={project.name}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-xl border border-black/10 bg-[var(--color-bg-raised)] aspect-[4/3] overflow-hidden relative block transition-transform hover:-translate-y-1"
          >
            <span
              className="gradient-accent absolute top-0 left-0 right-0 h-1.5 z-20"
              aria-hidden="true"
            />

            {/* Live preview, no caption baked in — the site already shows its own name */}
            <div className="absolute inset-0 overflow-hidden">
              <iframe
                src={project.url}
                title={project.name}
                loading="lazy"
                tabIndex={-1}
                scrolling="no"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "250%",
                  height: "260%", // slightly taller overscan hides the iframe's own scrollbar
                  border: 0,
                  transform: "scale(0.4)",
                  transformOrigin: "0 0",
                  pointerEvents: "none",
                }}
              />
            </div>

            {/* Hover-only overlay carrying the caption, so nothing sits
                on top of the live preview until the user is actually hovering */}
            <div className="absolute inset-0 z-10 flex flex-col justify-end p-5 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
              <p className="font-semibold text-white">{project.name}</p>
              <p className="text-sm text-white/70">{project.type}</p>
              <span className="mt-1 text-xs font-medium text-white/90">
                Visit site ↗
              </span>
            </div>
          </a>
        ))}
      </div>

      <a
        href="/contact"
        className="group mt-6 rounded-xl border-2 border-dashed border-black/15 p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 transition-colors hover:border-black/30"
      >
        <div>
          <p className="font-semibold">This could be you</p>
          <p className="text-sm text-[var(--color-muted)]">
            Your business, live and advertised right here on RCW.
          </p>
        </div>
        <span className="text-sm font-medium text-[var(--color-fg)] shrink-0 opacity-70 group-hover:opacity-100 transition-opacity">
          Get a quote ↗
        </span>
      </a>
    </section>
  );
}
