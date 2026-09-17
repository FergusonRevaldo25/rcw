"use client";

import {
  PALETTE,
  BACKGROUND_STYLES,
  IMAGE_OPTIONS,
  swatchLabel,
  swatchHex,
  type Option,
} from "@/lib/customize-options";
import { useSiteConfig } from "@/lib/site-config";

function ColorRolePicker({
  role,
  helper,
  selected,
  onSelect,
}: {
  role: string;
  helper: string;
  selected: string | null;
  onSelect: (id: string) => void;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between mb-1">
        <h3 className="font-semibold">{role}</h3>
        <span className="text-sm text-[var(--color-muted)]">
          {selected ? swatchLabel(selected) : "Not selected"}
        </span>
      </div>
      <p className="text-sm text-[var(--color-muted)] mb-4">{helper}</p>
      <div className="flex flex-wrap gap-3">
        {PALETTE.map((s) => {
          const isSelected = selected === s.id;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => onSelect(s.id)}
              aria-pressed={isSelected}
              aria-label={s.label}
              title={s.label}
              className={`relative h-11 w-11 rounded-full border transition-transform ${
                isSelected
                  ? "border-[var(--color-magenta)] scale-110"
                  : "border-black/15"
              }`}
              style={{ background: s.hex }}
            >
              {isSelected && (
                <span className="absolute inset-0 flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 12 12" fill="none">
                    <path
                      d="M2 6l2.5 2.5L10 3"
                      stroke={
                        s.hex === "#FFFFFF" || s.hex === "#F4EFE9"
                          ? "#0A0A0A"
                          : "#FFFFFF"
                      }
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function OptionGrid({
  options,
  selected,
  onSelect,
}: {
  options: Option[];
  selected: string | null;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="grid sm:grid-cols-2 gap-4">
      {options.map((opt) => {
        const isSelected = selected === opt.id;
        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => onSelect(opt.id)}
            aria-pressed={isSelected}
            className={`text-left rounded-xl border p-5 transition-colors ${
              isSelected
                ? "border-[var(--color-magenta)] bg-[var(--color-bg-raised)]"
                : "border-black/10 hover:border-black/25"
            }`}
          >
            <div className="flex items-start justify-between gap-3 mb-2">
              <p className="font-semibold">{opt.label}</p>
              <span
                aria-hidden="true"
                className={`shrink-0 mt-0.5 h-5 w-5 rounded border flex items-center justify-center ${
                  isSelected
                    ? "border-[var(--color-magenta)] bg-[var(--color-magenta)]"
                    : "border-black/25"
                }`}
              >
                {isSelected && (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path
                      d="M2 6l2.5 2.5L10 3"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </span>
            </div>
            <p className="text-sm text-[var(--color-muted)]">
              {opt.description}
            </p>
          </button>
        );
      })}
    </div>
  );
}

export default function CustomizePage() {
  const { primary, secondary, accent, background, images, domainIdea, update } =
    useSiteConfig();

  const previewColors = [primary, secondary, accent]
    .map(swatchHex)
    .filter((hex): hex is string => Boolean(hex));

  return (
    <section className="container-page py-20 max-w-3xl">
      <h1 className="text-4xl font-bold mb-3">Customize your site</h1>
      <p className="text-[var(--color-muted)] mb-14 max-w-xl">
        Tick what you like below. There's no wrong answer — this just gives us a
        starting point so the first design we show you is already close to what
        you want. Whatever you pick here comes through automatically when you
        get in touch on the next page.
      </p>

      <div className="space-y-14">
        <div>
          <h2 className="text-2xl font-bold mb-1">Colours</h2>
          <p className="text-sm text-[var(--color-muted)] mb-8">
            Build your own combination by picking a colour for each role. Every
            colour we offer is shown for each one, so you have the full range
            every time.
          </p>

          {previewColors.length > 0 && (
            <div className="flex rounded-xl overflow-hidden h-16 mb-10 border border-black/10">
              {previewColors.map((hex, i) => (
                <div key={i} className="flex-1" style={{ background: hex }} />
              ))}
            </div>
          )}

          <div className="space-y-10">
            <ColorRolePicker
              role="Primary colour"
              helper="The main colour — used for backgrounds or the largest areas of the site."
              selected={primary}
              onSelect={(id) => update({ primary: primary === id ? null : id })}
            />
            <ColorRolePicker
              role="Secondary colour"
              helper="Supports the primary colour — used for sections, cards, or text."
              selected={secondary}
              onSelect={(id) =>
                update({ secondary: secondary === id ? null : id })
              }
            />
            <ColorRolePicker
              role="Accent colour"
              helper="Used sparingly, for buttons, links, and anything that should stand out."
              selected={accent}
              onSelect={(id) => update({ accent: accent === id ? null : id })}
            />
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-1">Background style</h2>
          <p className="text-sm text-[var(--color-muted)] mb-6">
            What should sit behind your content?
          </p>
          <OptionGrid
            options={BACKGROUND_STYLES}
            selected={background}
            onSelect={(id) =>
              update({ background: background === id ? null : id })
            }
          />
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-1">Photos & images</h2>
          <p className="text-sm text-[var(--color-muted)] mb-6">
            Where should the images on your site come from?
          </p>
          <OptionGrid
            options={IMAGE_OPTIONS}
            selected={images}
            onSelect={(id) => update({ images: images === id ? null : id })}
          />
        </div>

        <div className="rounded-xl border border-black/10 bg-[var(--color-bg-raised)] p-6 md:p-8">
          <h2 className="text-2xl font-bold mb-3">Your domain name</h2>
          <p className="text-sm mb-4 max-w-xl">
            A domain is the web address people type to find your site —
            something like{" "}
            <span className="font-medium">www.yourbusiness.co.za</span>. You
            don't need to know anything technical here. Just tell us what you'd
            like, and we'll take it from there.
          </p>

          <div className="space-y-3 text-sm mb-6">
            <p>
              <span className="font-semibold">
                We do the searching for you.
              </span>{" "}
              Once you tell us your first choice, we check whether it's free to
              register.
            </p>
            <p>
              <span className="font-semibold">
                Availability isn't guaranteed.
              </span>{" "}
              Domain names are taken on a first-come, first-served basis, so
              sometimes your first choice is already registered by someone else.
              This is normal and out of our control.
            </p>
            <p>
              <span className="font-semibold">You'll always have options.</span>{" "}
              If your first choice is taken, we'll bring you 2–3 close
              alternatives to choose from before we register anything — nothing
              gets bought without you agreeing to it first.
            </p>
            <p>
              <span className="font-semibold">
                It's a yearly cost, separate from the build.
              </span>{" "}
              A domain isn't a once-off purchase — it's rented for a year at a
              time and needs to be renewed annually to keep your site live. This
              is a normal part of owning a website and applies no matter who
              builds your site, not just with us.
            </p>
          </div>

          <label htmlFor="domain" className="block text-sm font-medium mb-1.5">
            What would you like your website address to be?
          </label>
          <input
            id="domain"
            value={domainIdea}
            onChange={(e) => update({ domainIdea: e.target.value })}
            placeholder="e.g. cornercoffee.co.za"
            className="w-full rounded-md bg-white border border-black/10 px-4 py-2.5 focus:outline-none focus:border-[var(--color-magenta)]"
          />
        </div>

        <div className="flex justify-end">
          <a href="/contact" className="btn-primary">
            Continue to get a quote
          </a>
        </div>
      </div>
    </section>
  );
}
