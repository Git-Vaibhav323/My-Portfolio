"use server";

import { cacheLife } from "next/cache";
import { config } from "@/data/config";

// Soft-fail on rate limits / missing repos so the page never 500s.
// Optional GITHUB_TOKEN raises the rate limit well above unauthenticated 60/hr.
export async function getGithubStars(): Promise<number> {
  "use cache";
  cacheLife({ stale: 300, revalidate: 300 });

  try {
    const headers: HeadersInit = {
      Accept: "application/vnd.github+json",
      "User-Agent": "vaibhav-portfolio",
    };
    const token = process.env.GITHUB_TOKEN;
    if (token) headers.Authorization = `Bearer ${token}`;

    const res = await fetch(
      `https://api.github.com/repos/${config.githubUsername}/${config.githubRepo}`,
      { headers },
    );
    if (!res.ok) return 0;

    const data = await res.json();
    return typeof data.stargazers_count === "number" ? data.stargazers_count : 0;
  } catch {
    return 0;
  }
}
