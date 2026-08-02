import { EmailTemplate } from "@/components/email-template";
import { config } from "@/data/config";
import { Resend } from "resend";
import { z } from "zod";
import type { ReactElement } from "react";

const Email = z.object({
  fullName: z.string().min(2, "Full name is invalid!"),
  email: z.string().email({ message: "Email is invalid!" }),
  message: z.string().min(10, "Message is too short!"),
});

const rateLimit = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_MS = 60 * 1000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimit.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  entry.count++;
  return entry.count > RATE_LIMIT_MAX;
}

export async function POST(req: Request) {
  try {
    if (!process.env.RESEND_API_KEY) {
      return Response.json(
        { error: "Email service is not configured. Missing RESEND_API_KEY." },
        { status: 503 },
      );
    }

    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
    if (isRateLimited(ip)) {
      return Response.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 },
      );
    }

    const body = await req.json();
    const parsed = Email.safeParse(body);
    if (!parsed.success) {
      return Response.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid form data" },
        { status: 400 },
      );
    }

    const { fullName, email, message } = parsed.data;
    const resend = new Resend(process.env.RESEND_API_KEY.trim());

    // Empty RESEND_FROM="" in .env must not win over the default — ?? only
    // skips null/undefined, so an empty string was sent as `from` and Resend
    // replied "The domain is invalid".
    const from =
      process.env.RESEND_FROM?.trim() ||
      "Portfolio <onboarding@resend.dev>";

    // Test mode (onboarding@resend.dev) can only deliver to the email on your
    // Resend account. Override with CONTACT_TO_EMAIL if that differs from config.
    const to =
      process.env.CONTACT_TO_EMAIL?.trim() || config.email;

    const { data, error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: email,
      subject: `Portfolio contact from ${fullName}`,
      react: EmailTemplate({ fullName, email, message }) as ReactElement,
    });

    if (error) {
      console.error("[api/send] Resend error:", error);
      return Response.json(
        { error: error.message || "Failed to send email" },
        { status: 500 },
      );
    }

    return Response.json({ ok: true, id: data?.id });
  } catch (error) {
    console.error("[api/send] Unexpected error:", error);
    return Response.json(
      { error: "Something went wrong while sending your message." },
      { status: 500 },
    );
  }
}
