import BudgetBar from "./BudgetBar";

export default function HeroBanner() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -left-40 w-[520px] h-[520px] rounded-full opacity-30 blur-[110px]"
        style={{
          background:
            "linear-gradient(135deg, #833AB4 0%, #E1306C 45%, #F77737 75%, #FCAF45 100%)",
        }}
      />

      <div className="container-page relative pt-16 pb-20 md:pt-24 md:pb-28">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold leading-[1.05] mb-6">
              A website built for
              <br />
              your <span className="gradient-text">actual business</span>.
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
                See our work
              </a>
            </div>
          </div>

          <BudgetBar />
        </div>
      </div>
    </section>
  );
}
