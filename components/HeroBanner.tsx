import BudgetBar from "./BudgetBar";

export default function HeroBanner() {
  return (
    <section className="relative overflow-hidden">
      <div className="container-page relative pt-16 pb-20 md:pt-24 md:pb-28">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold leading-[1.05] mb-6">
              Websites designed to
              <br />
              your <span className="gradient-text">Standards</span>.
            </h1>
            <p className="text-[var(--color-muted)] text-lg max-w-md mb-8">
              No templates pretending to be custom. RCW designs and builds sites
              for local businesses that need customers to call, book, or walk in
              not just admire the homepage.
            </p>
            <div className="flex gap-4">
              <a href="/contact" className="btn-primary">
                Get a quote
              </a>
              <a href="/work" className="btn-outline">
                See my work
              </a>
            </div>
          </div>

          <BudgetBar />
        </div>
      </div>
    </section>
  );
}
