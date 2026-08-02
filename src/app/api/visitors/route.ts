import { NextResponse } from "next/server";

const NAMESPACE = "vaibhavdwivedi-portfolio";
const KEY = "visits";
const COOKIE = "vd_visited";
const COUNTER_BASE = `https://api.counterapi.dev/v1/${NAMESPACE}/${KEY}`;

async function readOrBump(bump: boolean): Promise<number> {
  const url = bump ? `${COUNTER_BASE}/up` : `${COUNTER_BASE}/`;
  const res = await fetch(url, {
    cache: "no-store",
    headers: { Accept: "application/json" },
  });
  if (!res.ok) return 0;
  const data = (await res.json()) as { count?: number; value?: number };
  return typeof data.count === "number"
    ? data.count
    : typeof data.value === "number"
      ? data.value
      : 0;
}

export async function GET(req: Request) {
  try {
    const cookies = req.headers.get("cookie") ?? "";
    const alreadyVisited = cookies
      .split(";")
      .some((c) => c.trim().startsWith(`${COOKIE}=`));

    const count = await readOrBump(!alreadyVisited);

    const res = NextResponse.json({ count: Math.max(0, count) });
    if (!alreadyVisited) {
      // Count once per browser for ~1 year
      res.cookies.set(COOKIE, "1", {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60 * 24 * 365,
      });
    }
    return res;
  } catch {
    return NextResponse.json({ count: 0 });
  }
}
