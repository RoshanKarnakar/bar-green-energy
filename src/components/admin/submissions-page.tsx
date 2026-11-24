"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { Bike, CalendarDays, Check, CircleAlert, LayoutDashboard, LoaderCircle, Mail, Menu, Search, Settings, X } from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

type Kind = "enquiry" | "test_ride" | "contact";
type Status = "new" | "contacted" | "confirmed" | "completed" | "closed";
type Submission = {
  id: string; kind: Kind; name: string; email: string; phone: string;
  model: string; city: string; preferred_at: string | null; topic: string;
  message: string; status: Status; internal_notes: string | null;
  email_status: "pending" | "sent" | "failed" | "not_configured"; created_at: string;
};
const titles: Record<Kind, string> = { enquiry: "Enquiries", test_ride: "Test Rides", contact: "Contact Messages" };
const descriptions: Record<Kind, string> = {
  enquiry: "Review product, dealership, service, and fleet enquiries.",
  test_ride: "Review preferred scooter, showroom, and time requests.",
  contact: "Read and follow up on general messages sent through the contact form.",
};
const statuses: Status[] = ["new", "contacted", "confirmed", "completed", "closed"];
const label = (value: string) => value.replaceAll("_", " ").replace(/w/g, (c) => c.toUpperCase());
const inputClass = "min-h-11 w-full rounded-md border border-light-outline-variant bg-white px-3.5 py-2.5 font-body text-body-md outline-none focus:ring-2 focus:ring-bar-green";

function Field({ name, children }: { name: string; children: ReactNode }) {
  return <div><dt className="font-label text-label-sm text-light-on-surface-variant">{name}</dt><dd className="mt-1 break-words font-body text-body-md text-light-on-surface">{children || "—"}</dd></div>;
}

function Sidebar({ kind }: { kind: Kind }) {
  const [open, setOpen] = useState(false);
  const links = [
    ["/admin", "Dashboard", LayoutDashboard, false],
    ["/admin/products", "Products", Bike, false],
    ["/admin/enquiries", "Enquiries", Mail, kind === "enquiry"],
    ["/admin/test-rides", "Test Rides", CalendarDays, kind === "test_ride"],
    ["/admin/messages", "Contact Messages", Mail, kind === "contact"],
    ["/admin/settings", "Settings", Settings, false],
  ] as const;
  return <aside className="w-full shrink-0 border-b border-dark-outline-variant bg-dark-surface text-dark-on-surface lg:flex lg:min-h-screen lg:w-64 lg:flex-col lg:justify-between lg:border-b-0 lg:border-r">
    <div className="p-5"><div className="flex items-center justify-between gap-3">
      <Link href="/admin" className="flex items-center gap-3"><span className="rounded-md bg-dark-surface px-1.5 py-2"><Image src="/images/brand/bar-logo-dark.png" alt="BAR Electric Vehicles" width={842} height={282} unoptimized className="h-7 w-20 object-contain" /></span><span><b className="block font-headline text-title-md">BAR Admin</b><small className="text-dark-on-surface-variant">Staff Portal</small></span></Link>
      <button type="button" aria-label="Toggle admin navigation" aria-expanded={open} onClick={() => setOpen(!open)} className="h-10 w-10 rounded-full border border-dark-outline-variant lg:hidden">{open ? <X size={19} /> : <Menu size={19} />}</button>
    </div><nav className={(open ? "flex" : "hidden") + " mt-8 flex-col gap-1.5 lg:flex"} aria-label="Admin navigation">
      {links.map(([href, text, Icon, active]) => <Link key={href} href={href} aria-current={active ? "page" : undefined} className={"flex min-h-11 items-center gap-3 rounded-md px-3.5 py-2.5 font-label text-label-lg " + (active ? "bg-bar-green text-on-bar-green" : "text-dark-on-surface-variant hover:bg-dark-surface-high")}><Icon size={19} />{text}</Link>)}
    </nav></div><div className="hidden border-t border-dark-outline-variant p-5 lg:block"><Link href="/" target="_blank" className="text-label-sm text-dark-on-surface-variant">View Public Site ↗</Link></div>
  </aside>;
}

export default function SubmissionsPage({ kind }: { kind: Kind }) {
  const client = useMemo(() => createSupabaseBrowserClient(), []);
  const [rows, setRows] = useState<Submission[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<"all" | Status>("all");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<Status>("new");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const load = useCallback(async () => {
    if (!client) { setLoading(false); setError("Supabase isn’t configured. Add the project URL and publishable key to .env.local."); return; }
    setLoading(true);
    const { data, error: e } = await client.from("submissions").select("*").eq("kind", kind).order("created_at", { ascending: false });
    if (e) { setRows([]); setError(e.message.includes("submissions") ? "The submissions table is missing. Apply the submissions migration in Supabase, then reload." : e.message); }
    else { setRows((data ?? []) as Submission[]); setError(""); }
    setLoading(false);
  }, [client, kind]);
  useEffect(() => {
    const initialLoad = window.setTimeout(() => void load(), 0);
    return () => window.clearTimeout(initialLoad);
  }, [load]);

  const filtered = useMemo(() => rows.filter((row) => (statusFilter === "all" || row.status === statusFilter) && (!search.trim() || [row.name, row.email, row.phone, row.model, row.city, row.topic].some((v) => v.toLowerCase().includes(search.trim().toLowerCase())))), [rows, search, statusFilter]);
  const selected = rows.find((row) => row.id === selectedId) ?? null;
  function select(row: Submission) { setSelectedId(row.id); setStatus(row.status); setNotes(row.internal_notes ?? ""); setNotice(""); setError(""); }

  async function updateRecord() {
    if (!client || !selected) return;
    setSaving(true); setError(""); setNotice("");
    const { error: e } = await client.from("submissions").update({ status, internal_notes: notes.trim() || null }).eq("id", selected.id);
    if (e) setError(e.message);
    else { setNotice("Submission updated."); await load(); }
    setSaving(false);
  }

  return <div className="min-h-screen bg-light-surface-low lg:flex"><Sidebar kind={kind} /><main className="mx-auto flex w-full max-w-[1500px] flex-1 flex-col gap-6 p-4 sm:p-8">
    <header><p className="font-label text-label-sm uppercase tracking-widest text-light-on-surface-variant">Customer submissions</p><h1 className="mt-1 font-headline text-headline-lg-mobile sm:text-headline-lg">{titles[kind]}</h1><p className="mt-1 text-body-sm text-light-on-surface-variant">{descriptions[kind]}</p></header>
    {error && <p role="alert" className="flex gap-2 rounded-lg border border-error bg-error-container p-4 text-body-sm text-on-error-container"><CircleAlert size={18} />{error}</p>}
    {notice && <p role="status" className="flex gap-2 rounded-lg border border-success bg-success-container p-4 text-body-sm text-on-success-container"><Check size={18} />{notice}</p>}
    <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
      <label className="relative"><span className="sr-only">Search submissions</span><Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-light-on-surface-variant" /><input value={search} onChange={(e) => setSearch(e.target.value)} className={inputClass + " pl-10"} placeholder="Search name, email, phone, model, city…" /></label>
      <label><span className="sr-only">Filter by status</span><select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)} className={inputClass + " min-w-44"}><option value="all">All statuses</option>{statuses.map((s) => <option key={s} value={s}>{label(s)}</option>)}</select></label>
    </div>
    <div className="grid items-start gap-6 xl:grid-cols-12">
      <section aria-label={titles[kind] + " list"} className="overflow-hidden rounded-xl border border-light-outline-variant bg-white xl:col-span-7">
        <div className="flex items-center justify-between border-b border-light-outline-variant p-4"><h2 className="font-headline text-title-lg">{titles[kind]} queue</h2><span className="font-mono text-mono-sm text-light-on-surface-variant">{filtered.length} records</span></div>
        <div className="overflow-x-auto"><table className="w-full min-w-[600px] text-left"><thead className="bg-light-surface-low"><tr>{["Date", "Customer", kind === "test_ride" ? "Model / City" : "Topic", "Status"].map((h) => <th key={h} className="px-4 py-3 font-label text-label-sm text-light-on-surface-variant">{h}</th>)}</tr></thead>
          <tbody className="divide-y divide-light-outline-variant">
            {loading && <tr><td colSpan={4} className="p-10 text-center"><LoaderCircle size={18} className="mr-2 inline animate-spin" />Loading…</td></tr>}
            {!loading && filtered.length === 0 && <tr><td colSpan={4} className="p-10 text-center text-body-sm text-light-on-surface-variant">{rows.length ? "No submissions match these filters." : "No submissions in this queue yet. New form entries will appear here."}</td></tr>}
            {!loading && filtered.map((row) => (
              <tr key={row.id} className={selectedId === row.id ? "bg-accent-tint" : "hover:bg-light-surface-low"}>
                <td className="px-4 py-3.5 font-mono text-mono-sm">{new Date(row.created_at).toLocaleDateString()}</td>
                <td className="px-4 py-3.5"><button onClick={() => select(row)} className="text-left"><span className="block font-title text-title-md">{row.name}</span><span className="text-body-sm text-light-on-surface-variant">{row.email}</span></button></td>
                <td className="px-4 py-3.5 text-body-sm">{kind === "test_ride" ? [row.model, row.city].filter(Boolean).join(" · ") || "—" : row.topic || "General"}</td>
                <td className="px-4 py-3.5"><span className="rounded-full bg-accent-tint px-2.5 py-1 font-label text-label-sm">{label(row.status)}</span></td>
              </tr>
            ))}
          </tbody>
        </table></div>
      </section>
      <aside aria-label="Submission details" className="rounded-xl border border-light-outline-variant bg-white p-5 sm:p-6 xl:col-span-5">
        {selected ? <div className="flex flex-col gap-5">
          <header><div className="flex items-start justify-between gap-2"><div><h2 className="font-headline text-title-lg">{selected.name}</h2><p className="mt-1 text-body-sm text-light-on-surface-variant">Received {new Date(selected.created_at).toLocaleString()} · {titles[kind]}</p></div><span className="rounded-full bg-accent-tint px-2.5 py-1 font-label text-label-sm">{label(selected.status)}</span></div></header>
          <dl className="grid grid-cols-2 gap-4 border-y border-light-outline-variant py-4"><Field name="Email"><a className="break-all underline" href={"mailto:" + selected.email}>{selected.email}</a></Field><Field name="Phone"><a className="underline" href={"tel:" + selected.phone}>{selected.phone}</a></Field>{kind === "test_ride" && <><Field name="Model">{selected.model}</Field><Field name="City">{selected.city}</Field><Field name="Preferred slot">{selected.preferred_at ? new Date(selected.preferred_at).toLocaleString() : "—"}</Field></>}{kind === "enquiry" && <><Field name="Enquiry type">{selected.topic}</Field><Field name="Related model">{selected.model}</Field></>}{selected.message && <div className="col-span-2"><Field name="Message">{selected.message}</Field></div>}</dl>
          <div className="flex items-center justify-between rounded-lg border border-light-outline-variant bg-light-surface-low px-4 py-3"><span className="font-label text-label-sm text-light-on-surface-variant">Email delivery</span><span className="rounded-full bg-light-surface-container px-2.5 py-1 font-label text-label-sm">{label(selected.email_status)}</span></div>
          <label className="flex flex-col gap-1.5"><span className="font-label text-label-sm">Internal staff notes</span><textarea rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} maxLength={5000} placeholder="Add follow-up notes…" className={inputClass} /></label>
          <div className="flex gap-3"><label className="flex-1"><span className="sr-only">Submission status</span><select value={status} onChange={(e) => setStatus(e.target.value as Status)} className={inputClass}>{statuses.map((s) => <option key={s} value={s}>Status: {label(s)}</option>)}</select></label><button type="button" disabled={saving} onClick={() => void updateRecord()} className="min-h-11 rounded-full bg-bar-green px-5 font-label text-label-lg disabled:opacity-60">{saving ? "Saving…" : "Update"}</button></div>
        </div> : <div className="grid min-h-56 place-items-center text-center"><div><Mail className="mx-auto mb-3 text-light-outline" size={32} /><h2 className="font-headline text-title-lg">Submission details</h2><p className="mt-1 text-body-sm text-light-on-surface-variant">Select a row to review details and add staff notes.</p></div></div>}
      </aside>
    </div>
  </main></div>;
}
