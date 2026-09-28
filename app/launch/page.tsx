import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Launch — how your site goes live | RCW",
  description:
    "From signed-off design to live on your own web address: choosing a host and domain, connecting them, and getting found on Google. Who does what, step by step.",
};

type Who = "You" | "RCW" | "You and RCW";

type Step = {
  title: string;
  who: Who;
  body: string;
  extra?: ReactNode;
};

function WhoTag({ who }: { who: Who }) {
  const isRcw = who === "RCW";
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
        isRcw
          ? "gradient-accent text-white"
          : "border border-black/20 text-[var(--color-fg)]"
      }`}
    >
      {who}
    </span>
  );
}

function OptionTile({ name, note }: { name: string; note: string }) {
  return (
    <div className="rounded-xl border border-black/10 bg-[var(--color-bg)]/60 p-4">
      <p className="font-semibold">{name}</p>
      <p className="mt-1 text-sm text-[var(--color-muted)]">{note}</p>
    </div>
  );
}

const STEPS: Step[] = [
  {
    title: "Your site is built and signed off",
    who: "You and RCW",
    body: "We build it on a private preview link. You go through every page on your phone and your computer, and we adjust until you're happy. Nothing goes public until you say so.",
  },
  {
    title: "Choose where your site lives",
    who: "You",
    body: "A host is the computer that keeps your website online around the clock. Pick one below, or tell us if you already have one. The price depends on the host and the plan, and we quote the exact monthly amount before anything is set up.",
    extra: (
      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <OptionTile
          name="Vercel"
          note="Fast, secure by default, and what most RCW sites run on."
        />
        <OptionTile
          name="Netlify"
          note="A close alternative with its own free and paid plans."
        />
        <OptionTile
          name="A host you already have"
          note="We check it can run your site, then set it up there."
        />
      </div>
    ),
  },
  {
    title: "Choose your domain name",
    who: "You and RCW",
    body: "Your domain is your web address, like yourbusiness.co.za. Tell us your first choice and we check whether it's free. Names are first-come, first-served, so if yours is taken we bring you 2–3 close alternatives. Nothing gets bought until you approve one.",
    extra: (
      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <OptionTile
          name=".co.za"
          note="South Africa's standard, and the natural pick for a local business."
        />
        <OptionTile
          name=".com"
          note="Recognised worldwide. Good if you plan to reach beyond South Africa."
        />
        <OptionTile
          name=".org.za"
          note="For non-profits and community organisations."
        />
      </div>
    ),
  },
  {
    title: "We buy the domain once it's available",
    who: "RCW",
    body: "As soon as you approve a name that's free, we register it in your name, not ours. A domain is rented one year at a time and renews every 12 months. The price depends on the extension and is separate from your build cost.",
  },
  {
    title: "The domain is handed over to you",
    who: "You and RCW",
    body: "You receive the login for the account the domain is registered in, so it's yours to keep and renew. We only use the access we need to connect it.",
  },
  {
    title: "We connect the domain to your host",
    who: "RCW",
    body: "We add a few DNS records, which are signposts that tell the internet where your site lives. It usually takes minutes to a few hours to spread across the internet, and rarely up to 48 hours. Most hosts add the padlock (HTTPS) automatically once it connects.",
  },
  {
    title: "We add your site's private settings to the host",
    who: "RCW",
    body: "Some settings must stay secret, like the key that lets your contact form send you email. These are stored as environment variables on whichever host you chose, never written into the website's public code. We set them up on your host so your forms and emails work from day one.",
  },
  {
    title: "We set you up on Google",
    who: "RCW",
    body: "We register your domain with Google Search Console, submit a sitemap (a list of all your pages), and ask Google to visit. After that it's on Google's clock: your site can start appearing within days, and extras like your logo beside the search result can take a couple of weeks longer.",
  },
  {
    title: "Final checks, then launch",
    who: "You and RCW",
    body: "Before we announce it, we check that your forms email you, the WhatsApp buttons open the right chat, every page works on a phone, and the padlock shows. Then you're live. Your 30 days of free fixes start on launch day.",
  },
];

export default function LaunchPage() {
  return (
    <>
      <section className="container-page pt-20 pb-12">
        <h1 className="text-4xl md:text-5xl font-bold max-w-2xl mb-6">
          How your site goes live
        </h1>
        <p className="text-[var(--color-muted)] max-w-xl">
          Building the site is only half the job. This is what happens between
          &quot;design approved&quot; and &quot;live on your own web
          address&quot;: who does what, and what to expect at each stage.
        </p>
      </section>

      <section className="container-page pb-20">
        <ol className="relative max-w-3xl">
          {/* One continuous line running behind every numbered marker. */}
          <span
            aria-hidden="true"
            className="gradient-accent absolute left-5 top-5 bottom-5 w-0.5 -translate-x-1/2 rounded-full"
          />

          {STEPS.map((step, i) => (
            <li key={step.title} className="relative pl-16 pb-12 last:pb-0">
              <span
                aria-hidden="true"
                className="gradient-accent absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white ring-4 ring-[var(--color-bg)]"
              >
                {i + 1}
              </span>

              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 min-h-10">
                <h2 className="text-xl font-bold">{step.title}</h2>
                <WhoTag who={step.who} />
              </div>

              <p className="mt-2 max-w-xl text-[var(--color-muted)]">
                {step.body}
              </p>

              {step.extra}
            </li>
          ))}
        </ol>
      </section>

      <section className="container-page pb-20">
        <div className="gradient-ring rounded-2xl bg-[var(--color-bg-raised)] p-10 md:p-14 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Ready to get yours live?
          </h2>
          <p className="text-[var(--color-muted)] max-w-md mx-auto mb-8">
            Tell us about your business and we&apos;ll quote the build. Host and
            domain costs are always shown to you before we buy anything.
          </p>
          <a href="/contact" className="btn-primary">
            Get a quote
          </a>
        </div>
      </section>
    </>
  );
}
