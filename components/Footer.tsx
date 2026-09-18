import Link from "next/link";
import Logo from "./Logo";

const SOCIALS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/fergusonrevaldo/?hl=en",
    icon: (
      <path d="M12 2.2c2.7 0 3 .01 4.1.06 1.1.05 1.8.22 2.2.37.5.2.9.44 1.3.84.4.4.64.8.84 1.3.15.4.32 1.1.37 2.2.05 1.1.06 1.4.06 4.1s-.01 3-.06 4.1c-.05 1.1-.22 1.8-.37 2.2-.2.5-.44.9-.84 1.3-.4.4-.8.64-1.3.84-.4.15-1.1.32-2.2.37-1.1.05-1.4.06-4.1.06s-3-.01-4.1-.06c-1.1-.05-1.8-.22-2.2-.37-.5-.2-.9-.44-1.3-.84-.4-.4-.64-.8-.84-1.3-.15-.4-.32-1.1-.37-2.2C2.21 15 2.2 14.7 2.2 12s.01-3 .06-4.1c.05-1.1.22-1.8.37-2.2.2-.5.44-.9.84-1.3.4-.4.8-.64 1.3-.84.4-.15 1.1-.32 2.2-.37C9 2.21 9.3 2.2 12 2.2zm0 1.8c-2.66 0-2.97.01-4.02.06-.97.04-1.5.2-1.85.34-.46.18-.79.4-1.14.75-.35.35-.57.68-.75 1.14-.14.35-.3.88-.34 1.85C3.85 9.03 3.84 9.34 3.84 12s.01 2.97.06 4.02c.04.97.2 1.5.34 1.85.18.46.4.79.75 1.14.35.35.68.57 1.14.75.35.14.88.3 1.85.34 1.05.05 1.36.06 4.02.06s2.97-.01 4.02-.06c.97-.04 1.5-.2 1.85-.34.46-.18.79-.4 1.14-.75.35-.35.57-.68.75-1.14.14-.35.3-.88.34-1.85.05-1.05.06-1.36.06-4.02s-.01-2.97-.06-4.02c-.04-.97-.2-1.5-.34-1.85a3.06 3.06 0 0 0-.75-1.14 3.06 3.06 0 0 0-1.14-.75c-.35-.14-.88-.3-1.85-.34C14.97 4.01 14.66 4 12 4zm0 3.05a4.95 4.95 0 1 1 0 9.9 4.95 4.95 0 0 1 0-9.9zm0 1.8a3.15 3.15 0 1 0 0 6.3 3.15 3.15 0 0 0 0-6.3zm5.15-1.99a1.16 1.16 0 1 1-2.31 0 1.16 1.16 0 0 1 2.31 0z" />
    ),
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=100007289116991",
    icon: (
      <path d="M13.5 21v-7.7h2.6l.4-3h-3v-1.9c0-.87.24-1.46 1.5-1.46H16.6V4.14C16.3 4.1 15.3 4 14.1 4c-2.4 0-4.1 1.47-4.1 4.16v2.14H7.4v3h2.6V21h3.5z" />
    ),
  },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-black/10 mt-24">
      <span
        className="gradient-accent absolute top-0 left-0 right-0 h-1"
        aria-hidden="true"
      />

      <div className="container-page py-14 grid gap-10 md:grid-cols-4">
        <div>
          <Link href="/" aria-label="RCW home" className="inline-block mb-3">
            <Logo />
          </Link>
          <p className="text-sm text-[var(--color-muted)] max-w-xs">
            Custom websites for local businesses. Built to bring in customers,
            not just look good.
          </p>

          <div className="flex items-center gap-3 mt-5">
            {SOCIALS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 text-[var(--color-muted)] hover:text-white hover:border-transparent hover:gradient-accent transition-colors"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  {social.icon}
                </svg>
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold mb-3">Site</p>
          <ul className="space-y-2 text-sm text-[var(--color-muted)]">
            <li>
              <Link href="/" className="hover:text-[var(--color-fg)]">
                Home
              </Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-[var(--color-fg)]">
                Services
              </Link>
            </li>
            <li>
              <Link href="/work" className="hover:text-[var(--color-fg)]">
                Work
              </Link>
            </li>
            <li>
              <Link href="/customize" className="hover:text-[var(--color-fg)]">
                Customize
              </Link>
            </li>
            <li>
              <Link
                href="/behind-the-scenes"
                className="hover:text-[var(--color-fg)]"
              >
                Process
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-[var(--color-fg)]">
                About
              </Link>
            </li>
            <li>
              <Link href="/faq" className="hover:text-[var(--color-fg)]">
                FAQ
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold mb-3">Get started</p>
          <ul className="space-y-2 text-sm text-[var(--color-muted)]">
            <li>
              <Link href="/contact" className="hover:text-[var(--color-fg)]">
                Get a quote
              </Link>
            </li>
            <li>
              <a
                href="https://wa.me/27656855335"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--color-fg)]"
              >
                Chat on WhatsApp
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold mb-3">Legal</p>
          <ul className="space-y-2 text-sm text-[var(--color-muted)]">
            <li>
              <Link
                href="/privacy-policy"
                className="hover:text-[var(--color-fg)]"
              >
                Privacy policy
              </Link>
            </li>
            <li>
              <Link
                href="/terms-of-service"
                className="hover:text-[var(--color-fg)]"
              >
                Terms of service
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-black/10">
        <div className="container-page py-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[var(--color-muted)]">
          <p>© {new Date().getFullYear()} RCW. All rights reserved.</p>
          <p>Designed &amp; built by RCW, Cape Town.</p>
        </div>
      </div>
    </footer>
  );
}
