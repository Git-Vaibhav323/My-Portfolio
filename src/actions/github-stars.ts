"use server";

import { config } from "@/data/config";

// Soft-fail on rate limits / missing repos so the page never 500s.
// Optional GITHUB_TOKEN raises the rate limit well above unauthenticated 60/hr.
// Simple TTL cache — avoids "use cache" / cacheComponents (incompatible with GSAP).
let cachedStars: { value: number; expiresAt: number } | null = null;
const TTL_MS = 5 * 60 * 1000;

export async function getGithubStars(): Promise<number> {
  if (cachedStars && Date.now() < cachedStars.expiresAt) {
    return cachedStars.value;
  }

  try {
    const headers: HeadersInit = {
      Accept: "application/vnd.github+json",
      "User-Agent": "vaibhav-portfolio",
    };
    const token = process.env.GITHUB_TOKEN;
    if (token) headers.Authorization = `Bearer ${token}`;

    const res = await fetch(
      `https://api.github.com/repos/${config.githubUsername}/${config.githubRepo}`,
      {
        headers,
        next: { revalidate: 300 },
      },
    );
    if (!res.ok) return cachedStars?.value ?? 0;

    const data = await res.json();
    const value =
      typeof data.stargazers_count === "number" ? data.stargazers_count : 0;
    cachedStars = { value, expiresAt: Date.now() + TTL_MS };
    return value;
  } catch {
    return cachedStars?.value ?? 0;
  }
}
