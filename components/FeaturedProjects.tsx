// Drop v1.mp4, v2.mp4, v3.mp4, v4.mp4 into /public — that's all that's
// needed for these to show up. Muted/looping/autoplay so they play inline
// without the visitor needing to click anything (browsers block autoplay
// with sound, which is why muted is required here).
const projects = [
  { name: "Corner Coffee Co.", type: "Cafe · booking site", video: "/v1.mp4" },
  {
    name: "Atlas Auto Repair",
    type: "Mechanic · service booking",
    video: "/v2.mp4",
  },
  {
    name: "Bloom & Co Florist",
    type: "Retail · online ordering",
    video: "/v3.mp4",
  },
  {
    name: "Riverside Dental",
    type: "Healthcare · appointment booking",
    video: "/v4.mp4",
  },
];

export default function FeaturedProjects() {
  return (
    <section className="container-page py-20 border-t border-black/10">
      <div className="flex items-baseline justify-between mb-12">
        <h2 className="text-3xl font-bold">CODING</h2>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {projects.map((project) => (
          <div
            key={project.name}
            className="rounded-xl border border-black/10 bg-[var(--color-bg-raised)] aspect-[4/3] overflow-hidden relative"
          >
            <video
              src={project.video}
              autoPlay
              muted
              loop
              playsInline
              aria-label={`${project.name} — ${project.type}`}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
