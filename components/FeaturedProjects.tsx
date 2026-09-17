const projects = [
  { name: "Corner Coffee Co.", type: "Cafe · booking site" },
  { name: "Atlas Auto Repair", type: "Mechanic · service booking" },
  { name: "Bloom & Co Florist", type: "Retail · online ordering" },
];

export default function FeaturedProjects() {
  return (
    <section className="container-page py-20 border-t border-black/10">
      <div className="flex items-baseline justify-between mb-12">
        <h2 className="text-3xl font-bold">Recent work</h2>
        <a href="/work" className="text-sm text-[var(--color-muted)] hover:text-[var(--color-fg)]">
          View all
        </a>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project.name}
            className="rounded-xl border border-black/10 bg-[var(--color-bg-raised)] aspect-[4/3] p-6 flex flex-col justify-end overflow-hidden relative"
          >
            <span className="gradient-accent absolute top-0 left-0 right-0 h-1.5" aria-hidden="true" />
            <p className="font-semibold">{project.name}</p>
            <p className="text-sm text-[var(--color-muted)]">{project.type}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
