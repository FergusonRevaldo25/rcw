const faqs = [
  {
    q: "How long does a site take?",
    a: "A single-page site is usually live within a week. Larger multi-page or custom builds typically take two to four weeks depending on scope.",
  },
  {
    q: "Do I need to know anything technical?",
    a: "No. We handle the build and hosting setup, and show you how to make basic edits yourself if you want to.",
  },
  {
    q: "What if my budget is tight?",
    a: "Use the budget slider on the home page it shows exactly what's realistic at different price points so there are no surprises.",
  },
  {
    q: "Is the price I pay a one-time cost?",
    a: "Yes what you pay for the build is a once-off payment for the design and development of your site. It doesn't recur. Two things sit outside of that: your domain name and any support after launch, both explained below.",
  },
  {
    q: "Do I have to pay for my domain every year?",
    a: "Yes. A domain (your website address, like yourbusiness.co.za) is rented annually, not bought outright this is standard no matter who builds your site, not something specific to us. We'll search for and set up your domain as part of the build, but the yearly renewal cost is separate from what you pay us.",
  },
  {
    q: "Do you offer support after launch?",
    a: "Your first 30 days after launch are free if something needs fixing or tweaking in that window, we sort it out at no charge. After the 30 days, ongoing edits, updates, or support are billed separately, either per request or as an ongoing plan if you'd rather not think about it. We'll always tell you the cost before doing any paid work.",
  },
];

export default function FaqPage() {
  return (
    <section className="container-page py-20 max-w-2xl">
      <h1 className="text-4xl font-bold mb-10">FAQ</h1>
      <div className="divide-y divide-black/10">
        {faqs.map((item) => (
          <div key={item.q} className="py-6">
            <p className="font-semibold mb-2">{item.q}</p>
            <p className="text-sm text-[var(--color-muted)]">{item.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
