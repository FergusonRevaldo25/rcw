import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service — RCW",
  description: "The terms that apply when you work with RCW.",
};

export default function TermsOfServicePage() {
  return (
    <section className="container-page py-20 max-w-3xl">
      <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
      <p className="text-sm text-[var(--color-muted)] mb-12">
        Last updated:{" "}
        {new Date().toLocaleDateString("en-ZA", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>

      <div className="space-y-10 text-[var(--color-fg)]">
        <div>
          <h2 className="text-xl font-bold mb-3">1. Our service</h2>
          <p className="text-[var(--color-muted)]">
            RCW designs and builds custom websites for local businesses. The
            features included in your build depend on the package or budget you
            agree to before work begins.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-3">2. Quotes</h2>
          <p className="text-[var(--color-muted)]">
            Figures shown on this website (including the budget slider) are
            indicative starting points, not binding quotes. A final price is
            only confirmed once we've discussed your specific requirements
            directly.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-3">3. Payment</h2>
          <p className="text-[var(--color-muted)]">
            The build cost is a once-off fee, agreed before work begins. Your
            domain name is a separate, recurring yearly cost, renewed annually
            to keep your site live — this applies no matter who builds your
            site. Any ongoing support after launch is billed separately unless
            otherwise agreed in writing.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-3">4. Revisions</h2>
          <p className="text-[var(--color-muted)]">
            The scope of revisions included is agreed with you before work
            begins. Changes beyond that agreed scope may incur an additional
            cost, which we'll always discuss with you first.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-3">5. Ownership</h2>
          <p className="text-[var(--color-muted)]">
            Once your website is paid for in full, it's yours. You own the final
            site and its content, subject to any third-party licenses (such as
            stock imagery) disclosed at the time.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-3">6. Liability</h2>
          <p className="text-[var(--color-muted)]">
            We aim to deliver a working, reliable website, but we can't
            guarantee uninterrupted uptime, since hosting and third-party
            services are outside our direct control. We're not liable for
            indirect or consequential losses arising from use of your website.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-3">7. Governing law</h2>
          <p className="text-[var(--color-muted)]">
            These terms are governed by the laws of South Africa.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-3">Contact</h2>
          <p className="text-[var(--color-muted)]">
            Questions about these terms? Email{" "}
            <a
              href="mailto:welcome@rcwonline.co.za"
              className="underline hover:text-[var(--color-fg)]"
            >
              welcome@rcwonline.co.za
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
