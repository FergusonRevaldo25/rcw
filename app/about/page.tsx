export default function AboutPage() {
  return (
    <section className="container-page py-20 max-w-2xl">
      <h1 className="text-4xl font-bold mb-6">About RCW</h1>
      <p className="text-[var(--color-muted)] mb-4">
        RCW is a one-person operation(mine). I build custom websites for local
        businesses: the kind that live or die on whether a customer can find
        them, trust them, and get in touch quickly.
      </p>
      <p className="text-[var(--color-muted)] mb-4">
        I got here by building a lot, fast, leaning hard on AI tools to do it.
        It taught me a lot, and it's part of where my AI and automation skills
        come from but it also taught me something more important: most business
        owners can feel the difference between a site that was actually built
        for them and one that was generated and dressed up to look custom. That
        gap is exactly why RCW exists. Every site I build is planned and
        hand-coded with real intention I know what's going where, why it's
        there, and what needs to change as your business grows. Nothing here is
        a shortcut wearing a nice coat.
      </p>
      <p className="text-[var(--color-muted)] mb-4">
        I completed my NQF 5 in Information Technology – Software Development at
        Eduvos in February 2026 and will be starting my Bachelor’s degree next
        year, while currently working full-time as an IT Systems Administrator &
        Developer at Loot.co.za. That combination matters more than it sounds:
        managing real production infrastructure on AWS and Linux every day keeps
        me grounded in how systems actually behave under load, and that’s
        exactly what I bring into every project, not just clean code, but
        reliable, scalable solutions built to perform in real environments.
      </p>
      <a href="/contact" className="btn-primary mt-6 inline-flex">
        Get a quote
      </a>
    </section>
  );
}
