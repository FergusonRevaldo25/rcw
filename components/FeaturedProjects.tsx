// Drop v1.mp4, v2.mp4, v3.mp4, v4.mp4 into /public — that's all that's
// needed for these to show up. Muted/looping/autoplay so they play inline
// without the visitor needing to click anything (browsers block autoplay
// with sound, which is why muted is required here).
//
// Keep these files small — short clips, low resolution, heavily
// compressed. Four autoplaying videos on the home page adds directly to
// page weight and load time the same way the client-site carousel's
// iframes did; there's no lazy-load trick that helps once a video is set
// to autoplay, so the fix here has to be the files themselves staying
// tiny (aim for well under 1MB each).
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
              preload="metadata"
              aria-label="Website build preview clip"
              className="absolute inset-0 w-full h-full object-cover"
            >
              {/* Silent clips, no dialogue — this empty track exists so
                  the video passes accessibility checks that look for a
                  captions track, without fabricating captions for audio
                  that doesn't exist. */}
              <track
                kind="captions"
                srcLang="en"
                label="No spoken audio"
                src="/captions-empty.vtt"
                default
              />
            </video>
          </div>
        ))}
      </div>
    </section>
  );
}
