import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import { z } from "zod";

const contactSchema = z.object({
  kind: z.enum(["contact", "enquiry"]), name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(254), phone: z.string().trim().min(5).max(30),
  topic: z.string().trim().max(120).default("General Contact Message"), model: z.string().trim().max(100).default(""),
  message: z.string().trim().min(1).max(5000), website: z.string().max(0).optional(),
});
const testRideSchema = z.object({
  kind: z.literal("test_ride"), name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(254), phone: z.string().trim().min(5).max(30),
  city: z.string().trim().min(1).max(120), model: z.string().trim().max(100).default(""),
  preferred_at: z.string().datetime(), message: z.string().trim().max(5000).default(""),
  consent: z.literal(true), website: z.string().max(0).optional(),
});
const submissionSchema = z.discriminatedUnion("kind", [contactSchema, testRideSchema]);
type Submission = z.infer<typeof submissionSchema>;

type RateLimitState = { count: number; expiresAt: number };
const globalForRateLimit = globalThis as typeof globalThis & { barSubmissionRateLimit?: Map<string, RateLimitState> };
const rateLimit = globalForRateLimit.barSubmissionRateLimit ??= new Map<string, RateLimitState>();

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character] ?? character);
}
function takeRateLimit(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const ip = request.headers.get("x-real-ip") || forwardedFor || "unknown";
  const now = Date.now();
  const state = rateLimit.get(ip);
  if (!state || state.expiresAt <= now) { rateLimit.set(ip, { count: 1, expiresAt: now + 10 * 60 * 1000 }); return true; }
  if (state.count >= 5) return false;
  state.count += 1;
  return true;
}
function emailContent(submission: Submission) {
  const rows: Array<[string, string]> = [["Name", submission.name], ["Email", submission.email], ["Phone", submission.phone], ["Model", submission.model || "Not specified"]];
  const subject = submission.kind === "test_ride"
    ? `New Test Ride Request${submission.model ? ` — ${submission.model}` : ""}`
    : `New ${submission.kind === "enquiry" ? "Product Enquiry" : "Contact Message"}: ${submission.topic}`;
  if (submission.kind === "test_ride") rows.push(["City", submission.city], ["Preferred date", new Date(submission.preferred_at).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Kolkata" })]);
  else rows.push(["Topic", submission.topic]);
  rows.push(["Message", submission.message || "No additional message"]);
  const html = `<h2>${escapeHtml(subject)}</h2><table cellpadding="8" cellspacing="0" border="0">${rows.map(([label, value]) => `<tr><th align="left">${escapeHtml(label)}</th><td>${escapeHtml(value).replace(/\n/g, "<br>")}</td></tr>`).join("")}</table>`;
  const text = `${subject}\n\n${rows.map(([label, value]) => `${label}: ${value}`).join("\n")}`;
  return { subject, html, text };
}

export async function POST(request: Request) {
  if (!takeRateLimit(request)) return Response.json({ error: "Too many attempts. Please try again later." }, { status: 429 });
  let input: unknown;
  try { input = await request.json(); } catch { return Response.json({ error: "Invalid request." }, { status: 400 }); }
  const parsed = submissionSchema.safeParse(input);
  if (!parsed.success) return Response.json({ error: "Please check the required form fields and try again." }, { status: 400 });
  const submission = parsed.data;
  // Silently ignore bot submissions that fill the hidden honeypot field.
  if (submission.website) return Response.json({ ok: true, emailSent: true });

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !publishableKey) return Response.json({ error: "The form service is not configured." }, { status: 503 });
  const supabase = createClient(url, publishableKey, { auth: { autoRefreshToken: false, persistSession: false } });
  const insertResult = submission.kind === "test_ride"
    ? await supabase.from("submissions").insert({ kind: submission.kind, name: submission.name, email: submission.email, phone: submission.phone, model: submission.model, city: submission.city, preferred_at: submission.preferred_at, message: submission.message, consent: submission.consent })
    : await supabase.from("submissions").insert({ kind: submission.kind, name: submission.name, email: submission.email, phone: submission.phone, model: submission.model, topic: submission.topic, message: submission.message });
  const { error: insertError } = insertResult;
  if (insertError) {
    console.error("Submission database insert failed:", insertError.message);
    return Response.json({ error: "We couldn’t save your request. Please try again." }, { status: 500 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const recipient = process.env.RESEND_NOTIFY_EMAIL;
  if (!apiKey || !recipient) {
    console.warn("Submission saved, but email notification is not configured.");
    return Response.json({ ok: true, emailSent: false });
  }
  const resend = new Resend(apiKey);
  const { subject, html, text } = emailContent(submission);
  const { error: emailError } = await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL || "BAR Electric Vehicles <onboarding@resend.dev>",
    to: recipient, replyTo: submission.email, subject, html, text,
  });
  if (emailError) {
    console.error("Submission email notification failed:", emailError.message);
    return Response.json({ ok: true, emailSent: false });
  }
  return Response.json({ ok: true, emailSent: true });
}
