// Placeholder names — swap these for the real app names once they're
// locked in. Kept generic on purpose rather than inventing fake products.
const apps = [
  { name: "Mobile App #1" },
  { name: "Mobile App #2" },
  { name: "Mobile App #3" },
  { name: "Mobile App #4" },
];

export default function MobileAppsSection() {
  return (
    <section className="container-page py-20 border-t border-black/10">
      <h2 className="text-3xl font-bold mb-3">Mobile apps</h2>
      <p className="text-sm text-[var(--color-muted)] mb-12 max-w-md">
        Next up — a few mobile apps currently in the works. Check back soon.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {apps.map((app) => (
          <div
            key={app.name}
            className="gradient-ring rounded-2xl bg-[var(--color-bg-raised)] aspect-square flex flex-col items-center justify-center gap-3 text-center p-6"
          >
            <span className="flex items-end gap-1.5" aria-hidden="true">
              <span className="anim-dot w-2 h-2 rounded-full bg-[var(--color-magenta)]" style={{ animationDelay: "0ms" }} />
              <span className="anim-dot w-2 h-2 rounded-full bg-[var(--color-magenta)]" style={{ animationDelay: "150ms" }} />
              <span className="anim-dot w-2 h-2 rounded-full bg-[var(--color-magenta)]" style={{ animationDelay: "300ms" }} />
            </span>
            <p className="font-semibold">{app.name}</p>
            <p className="text-xs uppercase tracking-wide text-[var(--color-muted)]">
              Coming soon
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
