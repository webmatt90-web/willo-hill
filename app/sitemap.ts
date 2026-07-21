import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-url";

const ROUTES: { path: string; priority: number }[] = [
  { path: "", priority: 1 },
  { path: "/new", priority: 0.9 },
  { path: "/visit", priority: 0.9 },
  { path: "/next", priority: 0.8 },
  { path: "/connect", priority: 0.8 },
  { path: "/connect/prayer", priority: 0.6 },
  { path: "/about", priority: 0.7 },
  { path: "/leadership", priority: 0.6 },
  { path: "/contact", priority: 0.7 },
  { path: "/app", priority: 0.5 },
  { path: "/sermons", priority: 0.8 },
  { path: "/live", priority: 0.7 },
  { path: "/kids", priority: 0.7 },
  { path: "/youth", priority: 0.7 },
  { path: "/family", priority: 0.6 },
  { path: "/jesus", priority: 0.8 },
  { path: "/baptism", priority: 0.6 },
  { path: "/music", priority: 0.5 },
  { path: "/groups", priority: 0.6 },
  { path: "/events", priority: 0.8 },
  { path: "/missions", priority: 0.5 },
  { path: "/internships", priority: 0.4 },
  { path: "/teams", priority: 0.5 },
  { path: "/give", priority: 0.7 },
  { path: "/privacy", priority: 0.2 },
  { path: "/terms", priority: 0.2 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return ROUTES.map(({ path, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency: "weekly",
    priority,
  }));
}
