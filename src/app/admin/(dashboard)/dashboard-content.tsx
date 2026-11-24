"use client";

import Link from "next/link";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { CalendarDays, LayoutDashboard, Mail, MessageSquareText, Settings, Bike, ExternalLink, RefreshCw } from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

type Submission = {
  id: string; kind: "enquiry" | "test_ride" | "contact"; name: string; email: string;
  model: string; city: string; topic: string; status: string; preferred_at: string | null; created_at: string;
};
type Counts = { enquiries: number; rides: number; messages: number; products: number };
const emptyCounts: Counts = { enquiries: 0, rides: 0, messages: 0, products: 0 };
const nav = [["/admin", "Dashboard", LayoutDashboard], ["/admin/products", "Products", Bike], ["/admin/enquiries", "Enquiries", Mail], ["/admin/test-rides", "Test Rides", CalendarDays], ["/admin/messages", "Contact Messages", MessageSquareText], ["/admin/settings", "Settings", Settings]] as const;

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-IN", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value));
}

export default function AdminDashboardContent() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [counts, setCounts] = useState(emptyCounts);
  const [recent, setRecent] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadDashboard = useCallback(async () => {
    const supabase = createSupabaseBrowserClient();
    if (!supabase) { setError("Supabase is not configured. Check the public project URL and key."); setLoading(false); return; }
    setError("");
    const now = new Date().toISOString();
    const [enquiries, rides, messages, products, submissions] = await Promise.all([
      supabase.from("submissions").select("id", { count: "exact", head: true }).eq("kind", "enquiry").eq("status", "new"),
      supabase.from("submissions").select("id", { count: "exact", head: true }).eq("kind", "test_ride").gte("preferred_at", now).neq("status", "closed"),
      supabase.from("submissions").select("id", { count: "exact", head: true }).eq("kind", "contact").eq("status", "new"),
      supabase.from("products").select("id", { count: "exact", head: true }).eq("status", "published"),
      supabase.from("submissions").select("id,kind,name,email,model,city,topic,status,preferred_at,created_at").order("created_at", { ascending: false }).limit(8),
    ]);
    const issue = enquiries.error ?? rides.error ?? messages.error ?? products.error ?? submissions.error;
    if (issue) { setError(issue.message.includes("relation") ? "A required Supabase table is missing. Apply the migrations, then refresh." : issue.message); setLoading(false); return; }
    setCounts({ enquiries: enquiries.count ?? 0, rides: rides.count ?? 0, messages: messages.count ?? 0, products: products.count ?? 0 });
    setRecent((submissions.data ?? []) as Submission[]);
    setLoading(false);
  }, []);

  useEffect(() => {
    const initialLoad = window.setTimeout(() => void loadDashboard(), 0);
    return () => window.clearTimeout(initialLoad);
  }, [loadDashboard]);

  const cards = [
    { label: "New enquiries", value: counts.enquiries, detail: "Awaiting a first response", Icon: Mail, href: "/admin/enquiries" },
    { label: "Upcoming test rides", value: counts.rides, detail: "Open requests with future dates", Icon: CalendarDays, href: "/admin/test-rides" },
    { label: "New contact messages", value: counts.messages, detail: "Awaiting review", Icon: MessageSquareText, href: "/admin/messages" },
    { label: "Published products", value: counts.products, detail: "Visible in the public catalogue", Icon: Bike, href: "/admin/products" },
  ];

  return <div className="min-h-screen bg-light-surface-low lg:flex">
    <aside className="w-full shrink-0 bg-dark-surface text-dark-on-surface lg:w-64 lg:min-h-screen lg:flex lg:flex-col lg:justify-between">
      <div className="p-5"><div className="flex items-center justify-between"><Link href="/admin" className="flex items-center gap-3"><Image src="/images/brand/bar-logo-dark.png" alt="BAR Electric Vehicles" width={842} height={282} priority unoptimized className="h-10 w-[120px] object-contain" /><span className="font-headline text-title-md">Staff Portal</span></Link><button type="button" aria-label="Toggle admin navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)} className="rounded-full border border-dark-outline-variant px-3 py-2 lg:hidden">Menu</button></div>
        <nav aria-label="Admin navigation" className={`${menuOpen ? "flex" : "hidden"} mt-7 flex-col gap-1.5 lg:flex`}>
          {nav.map(([href, label, Icon]) => <a key={href} href={href} aria-current={href === "/admin" ? "page" : undefined} className={`flex min-h-11 items-center gap-3 rounded-md px-3.5 py-2.5 font-label text-label-lg ${href === "/admin" ? "bg-bar-green text-on-bar-green" : "text-dark-on-surface-variant hover:bg-dark-surface-high hover:text-dark-on-surface"}`}><Icon size={19} aria-hidden="true" />{label}</a>)}
        </nav>
      </div>
      <div className="hidden border-t border-dark-outline-variant p-5 lg:block"><Link href="/" className="flex items-center gap-2 text-dark-on-surface-variant hover:text-bar-green"><ExternalLink size={17} />View Public Site</Link></div>
    </aside>

    <main className="mx-auto flex w-full max-w-7xl flex-col gap-7 p-4 sm:p-8">
      <header className="flex flex-wrap items-end justify-between gap-4"><div><p className="font-label text-label-sm uppercase tracking-wider text-light-on-surface-variant">BAR Green Energy</p><h1 className="mt-1 font-headline text-headline-lg-mobile text-light-on-surface sm:text-headline-lg">Dashboard</h1><p className="mt-1 text-body-sm text-light-on-surface-variant">Live overview of your products and customer requests.</p></div><div className="flex gap-2"><button type="button" onClick={() => { setLoading(true); void loadDashboard(); }} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-light-outline-variant bg-light-surface px-4"><RefreshCw size={17} />Refresh</button><Link href="/admin/products" className="inline-flex min-h-11 items-center rounded-full bg-bar-green px-5 font-label text-label-lg text-on-bar-green">Manage products</Link></div></header>
      {error && <div role="alert" className="rounded-lg border border-error bg-error-container p-4 text-on-error-container">{error}</div>}
      <section aria-label="Current totals" className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">{cards.map(({ label, value, detail, Icon, href }) => <a key={label} href={href} className="rounded-xl border border-light-outline-variant bg-light-surface p-5 transition-shadow hover:shadow-md"><div className="flex items-center justify-between"><span className="text-label-sm text-light-on-surface-variant">{label}</span><Icon size={19} className="text-bar-green" aria-hidden="true" /></div><p className="mt-3 text-4xl font-semibold tabular-nums text-light-on-surface">{loading ? "—" : value}</p><p className="mt-2 text-body-sm text-light-on-surface-variant">{detail}</p></a>)}</section>
      <section className="overflow-hidden rounded-xl border border-light-outline-variant bg-light-surface">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-light-outline-variant p-5"><div><h2 className="font-headline text-title-lg">Recent submissions</h2><p className="mt-1 text-body-sm text-light-on-surface-variant">Latest customer requests across all inboxes.</p></div><Link href="/admin/enquiries" className="font-label text-label-lg underline">Open enquiries</Link></div>
        <div className="overflow-x-auto"><table className="w-full min-w-[720px] text-left"><thead className="bg-light-surface-low"><tr>{["Received", "Customer", "Type", "Request", "Status"].map((heading) => <th key={heading} scope="col" className="px-5 py-3 text-label-sm text-light-on-surface-variant">{heading}</th>)}</tr></thead><tbody className="divide-y divide-light-outline-variant">
          {loading ? <tr><td colSpan={5} className="p-10 text-center text-light-on-surface-variant">Loading recent submissions…</td></tr> : recent.length === 0 ? <tr><td colSpan={5} className="p-10 text-center"><p className="font-medium">No submissions yet</p><p className="mt-1 text-body-sm text-light-on-surface-variant">New enquiries, contact messages, and test ride requests will appear here.</p></td></tr> : recent.map((item) => <tr key={item.id} className="hover:bg-light-surface-low"><td className="whitespace-nowrap px-5 py-4 text-body-sm text-light-on-surface-variant">{formatDate(item.created_at)}</td><td className="px-5 py-4"><span className="block font-medium">{item.name}</span><span className="text-body-sm text-light-on-surface-variant">{item.email}</span></td><td className="px-5 py-4 text-body-sm">{item.kind === "test_ride" ? "Test ride" : item.kind === "contact" ? "Contact" : "Enquiry"}</td><td className="px-5 py-4 text-body-sm">{[item.model, item.city, item.topic].filter(Boolean).join(" · ") || "—"}</td><td className="px-5 py-4"><span className="rounded-full bg-light-surface-low px-2.5 py-1 text-label-sm capitalize">{item.status.replaceAll("_", " ")}</span></td></tr>)}
        </tbody></table></div>
      </section>
    </main>
  </div>;
}
