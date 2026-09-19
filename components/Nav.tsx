"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Logo from "./Logo";

const links = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/customize", label: "Customize" },
  { href: "/behind-the-scenes", label: "Process" },
  { href: "/rcw-lab", label: "RCW Lab" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const containerRef = useRef<HTMLElement>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const [indicator, setIndicator] = useState<{
    left: number;
    width: number;
  } | null>(null);

  useEffect(() => {
    function measure() {
      const container = containerRef.current;
      const activeLink = linkRefs.current[pathname];
      if (!container || !activeLink) {
        setIndicator(null);
        return;
      }
      const containerBox = container.getBoundingClientRect();
      const linkBox = activeLink.getBoundingClientRect();
      setIndicator({
        left: linkBox.left - containerBox.left,
        width: linkBox.width,
      });
    }

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [pathname]);

  return (
    <header className="nav-gradient-wash sticky top-0 z-50 border-b border-black/10 backdrop-blur">
      <div className="container-page flex items-center justify-between py-4">
        <Link href="/" aria-label="RCW home">
          <Logo />
        </Link>

        {/* Pill-shaped nav with a sliding gradient indicator behind the
            active tab. The indicator's position/width is measured from the
            actual DOM node, so it stays correct no matter the label length. */}
        <nav
          ref={containerRef}
          className="relative hidden md:flex items-center gap-1 rounded-full border border-black/10 bg-[var(--color-bg-raised)] p-1"
        >
          {indicator && (
            <span
              aria-hidden="true"
              className="gradient-accent absolute inset-y-1 rounded-full transition-all duration-300 ease-out pointer-events-none"
              style={{ left: indicator.left, width: indicator.width }}
            />
          )}

          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                ref={(el) => {
                  linkRefs.current[link.href] = el;
                }}
                className={`relative z-10 px-4 py-1.5 rounded-full text-sm font-medium transition-colors duration-300 ${
                  isActive
                    ? "text-white"
                    : "text-[var(--color-muted)] hover:text-[var(--color-fg)]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <Link
          href="/contact"
          className="btn-primary hidden md:inline-flex text-sm"
        >
          Get a quote
        </Link>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 -mr-2"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          <span className="block w-6 h-0.5 bg-[var(--color-fg)] mb-1.5" />
          <span className="block w-6 h-0.5 bg-[var(--color-fg)] mb-1.5" />
          <span className="block w-4 h-0.5 bg-[var(--color-fg)]" />
        </button>
      </div>

      {open && (
        <nav className="md:hidden border-t border-black/10 px-6 py-4 flex flex-col gap-4">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`rounded-full px-4 py-2 text-sm font-medium ${
                  isActive
                    ? "gradient-accent text-white w-fit"
                    : "text-[var(--color-fg)]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="btn-primary justify-center"
          >
            Get a quote
          </Link>
        </nav>
      )}
    </header>
  );
}
