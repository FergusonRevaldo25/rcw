import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — RCW",
  description: "How RCW collects, uses, and protects your information.",
};

export default function PrivacyPolicyPage() {
  return (
    <section className="container-page py-20 max-w-3xl">
      <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
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
          <h2 className="text-xl font-bold mb-3">Who we are</h2>
          <p className="text-[var(--color-muted)]">
            RCW ("we", "us") builds custom websites for local businesses. This
            policy explains what information we collect through this website,
            why, and what you can do about it.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-3">What we collect</h2>
          <p className="text-[var(--color-muted)] mb-3">
            When you use the Get a Quote form, Customize page, or Directory
            submission form, we collect what you choose to give us, which may
            include:
          </p>
          <ul className="list-disc pl-5 text-[var(--color-muted)] space-y-1">
            <li>Your name and business name</li>
            <li>Your email address</li>
            <li>Any message or project details you write</li>
            <li>Budget and design preferences you select on the site</li>
          </ul>
          <p className="text-[var(--color-muted)] mt-3">
            We do not collect payment card details through this website.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-3">How we use it</h2>
          <p className="text-[var(--color-muted)]">
            We use the information you submit solely to respond to your enquiry,
            provide a quote, and — if you become a client — to build and deliver
            your website. We don't sell your information to third parties.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-3">Who we share it with</h2>
          <p className="text-[var(--color-muted)]">
            We use third-party services to run this site and deliver emails —
            currently Resend (email delivery) and Vercel (hosting). These
            providers process your information only to perform that function on
            our behalf.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-3">How long we keep it</h2>
          <p className="text-[var(--color-muted)]">
            We keep enquiry information for as long as reasonably needed to
            respond to you and, if you become a client, for the duration of our
            working relationship plus a reasonable period afterward for
            record-keeping.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-3">Your rights</h2>
          <p className="text-[var(--color-muted)]">
            Under South Africa's Protection of Personal Information Act (POPIA),
            you have the right to ask what information we hold about you,
            request a correction, or ask us to delete it. To do any of this,
            contact us using the details below.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-3">Contact</h2>
          <p className="text-[var(--color-muted)]">
            Questions about this policy? Email{" "}
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
