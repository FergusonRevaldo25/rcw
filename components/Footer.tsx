import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-black/10 mt-24">
      <div className="container-page py-12 grid gap-10 md:grid-cols-4">
        <div>
          <p className="text-lg font-bold mb-2">RCW</p>
          <p className="text-sm text-[var(--color-muted)] max-w-xs">
            Custom websites for local businesses. Built to bring in customers,
            not just look good.
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold mb-3">Site</p>
          <ul className="space-y-2 text-sm text-[var(--color-muted)]">
            <li><Link href="/services" className="hover:text-[var(--color-fg)]">Services</Link></li>
            <li><Link href="/work" className="hover:text-[var(--color-fg)]">Work</Link></li>
            <li><Link href="/about" className="hover:text-[var(--color-fg)]">About</Link></li>
            <li><Link href="/faq" className="hover:text-[var(--color-fg)]">FAQ</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold mb-3">Get started</p>
          <ul className="space-y-2 text-sm text-[var(--color-muted)]">
            <li><Link href="/contact" className="hover:text-[var(--color-fg)]">Get a quote</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold mb-3">Legal</p>
          <ul className="space-y-2 text-sm text-[var(--color-muted)]">
            <li><Link href="/privacy-policy" className="hover:text-[var(--color-fg)]">Privacy policy</Link></li>
            <li><Link href="/terms-of-service" className="hover:text-[var(--color-fg)]">Terms of service</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-black/10">
        <div className="container-page py-6 text-xs text-[var(--color-muted)]">
          © {new Date().getFullYear()} RCW. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
