import type { MetadataRoute } from "next";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://rcw-eta.vercel.app";

// Update this list whenever you add or remove a route.
const routes = [
  "",
  "/services",
  "/work",
  "/about",
  "/faq",
  "/contact",
  "/customize",
  "/behind-the-scenes",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
