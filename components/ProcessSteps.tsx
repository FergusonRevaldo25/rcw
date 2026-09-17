const steps = [
  {
    n: "1",
    title: "Discovery call",
    body: "We talk through your business, your customers, and what the site actually needs to do for you.",
  },
  {
    n: "2",
    title: "Design",
    body: "You see real layouts with your content and brand before a single line of code is written.",
  },
  {
    n: "3",
    title: "Build",
    body: "We build it fast, test it on real phones, and keep you updated as it comes together.",
  },
  {
    n: "4",
    title: "Launch",
    body: "Site goes live, connected to your domain, with you able to make basic edits yourself.",
  },
];

export default function ProcessSteps() {
  return (
    <section className="container-page py-20 border-t border-black/10">
      <h2 className="text-3xl font-bold mb-12">How it works</h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
        {steps.map((step) => (
          <div key={step.n}>
            <p className="text-4xl font-bold gradient-text mb-3 font-[var(--font-display)]">
              {step.n}
            </p>
            <p className="font-semibold mb-2">{step.title}</p>
            <p className="text-sm text-[var(--color-muted)]">{step.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
