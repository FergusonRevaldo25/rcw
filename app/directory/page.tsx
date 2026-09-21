type DirectoryEntry = {
  id: string;
  devName: string;
  studioName?: string;
  url: string;
  screenshotUrl: string;
  category: string;
  tagline: string;
};

// Manually curated after review from /directory/submit's emailed
// notifications — add an approved entry here once you've checked the
// link and screenshot actually belong to the person submitting.
const ENTRIES: DirectoryEntry[] = [
  // {
  //   id: "jane-doe",
  //   devName: "Jane Doe",
  //   studioName: "Studio Nine",
  //   url: "https://janedoe.dev",
  //   screenshotUrl: "https://.../screenshot.png",
  //   category: "E-commerce",
  //   tagline: "Shopify builds for small retailers",
  // },
];

export default function DirectoryPage() {
  return (
    <section className="container-page py-20">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-4">
        <h1 className="text-4xl font-bold">Directory</h1>
        <a href="/directory/submit" className="btn-primary shrink-0">
          List your work
        </a>
      </div>
      <p className="text-[var(--color-muted)] max-w-lg mb-12">
        Other local developers and studios, showcasing their own work. RCW
        doesn't build or vouch for these — just giving good work a place to be
        seen.
      </p>

      {ENTRIES.length === 0 ? (
        <div className="rounded-xl border-2 border-dashed border-black/15 p-12 text-center">
          <p className="font-semibold">No listings yet</p>
          <p className="text-sm text-[var(--color-muted)] mt-1">
            Be the first —{" "}
            <a
              href="/directory/submit"
              className="underline hover:text-[var(--color-fg)]"
            >
              submit your work
            </a>
            .
          </p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ENTRIES.map((entry) => (
            <a
              key={entry.id}
              href={entry.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-xl border border-black/10 bg-[var(--color-bg-raised)] overflow-hidden relative block transition-transform hover:-translate-y-1"
            >
              <span
                className="gradient-accent absolute top-0 left-0 right-0 h-1.5 z-10"
                aria-hidden="true"
              />
              <div className="aspect-[4/3] overflow-hidden bg-black/5">
                <img
                  src={entry.screenshotUrl}
                  alt={`Screenshot of ${entry.devName}'s work`}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="p-5">
                <p className="font-semibold">
                  {entry.studioName ?? entry.devName}
                </p>
                {entry.studioName && (
                  <p className="text-xs text-[var(--color-muted)]">
                    {entry.devName}
                  </p>
                )}
                <p className="text-sm text-[var(--color-muted)] mt-1">
                  {entry.category}
                </p>
                <p className="text-sm mt-2">{entry.tagline}</p>
              </div>
            </a>
          ))}
        </div>
      )}
    </section>
  );
}
