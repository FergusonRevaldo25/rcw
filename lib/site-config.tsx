"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type SiteConfig = {
  primary: string | null;
  secondary: string | null;
  accent: string | null;
  background: string | null;
  images: string | null;
  domainIdea: string;
  budget: number | null;
  tierLabel: string | null;
  budgetFeatures: string[];
};

const defaultConfig: SiteConfig = {
  primary: null,
  secondary: null,
  accent: null,
  background: null,
  images: null,
  domainIdea: "",
  budget: null,
  tierLabel: null,
  budgetFeatures: [],
};

type SiteConfigContextValue = SiteConfig & {
  update: (patch: Partial<SiteConfig>) => void;
};

const SiteConfigContext = createContext<SiteConfigContextValue | null>(null);

export function SiteConfigProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<SiteConfig>(defaultConfig);

  function update(patch: Partial<SiteConfig>) {
    setConfig((prev) => ({ ...prev, ...patch }));
  }

  return (
    <SiteConfigContext.Provider value={{ ...config, update }}>
      {children}
    </SiteConfigContext.Provider>
  );
}

// Lives in memory only, for the current visit — resets on a full page
// reload. That's fine for "pick on Customize, land on Contact a minute
// later," which is the flow this supports. It does NOT persist across
// browser sessions or send anything anywhere by itself — see ContactPage
// for where the collected values actually get sent.
export function useSiteConfig() {
  const ctx = useContext(SiteConfigContext);
  if (!ctx) {
    throw new Error("useSiteConfig must be used inside <SiteConfigProvider>");
  }
  return ctx;
}
