"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState, type FormEvent, type ReactNode } from "react";
import { Bike, CalendarDays, Check, CircleAlert, LayoutDashboard, LoaderCircle, Mail, Menu, Plus, Search, Settings, Trash2, X } from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

type Status = "published" | "draft" | "archived";
type ProductColor = { name: string; hex: string; image_url: string };
type Product = {
  id: string; name: string; model_code: string; slug: string; sort_order: number;
  short_description: string; image_url: string; price_display: "enquire" | "show" | "hide";
  price_amount: number | null; status: Status; top_speed_kmh: number | null;
  range_km: number | null; battery: string;
  gallery_urls: string[]; available_colors: string[];
};
type FormData = Omit<Product, "id">;
const blankColor: ProductColor = { name: "", hex: "#111111", image_url: "" };
const encodeColor = (color: ProductColor) => JSON.stringify(color);
function decodeColor(value: string): ProductColor {
  try {
    const parsed = JSON.parse(value) as Partial<ProductColor>;
    if (parsed && typeof parsed === "object" && typeof parsed.name === "string") return { name: parsed.name, hex: parsed.hex || "#111111", image_url: parsed.image_url || "" };
  } catch { /* Support existing Name|#HEX values. */ }
  const [name = "", hex = "#111111", image_url = ""] = value.split("|");
  return { name, hex: /^#[\da-f]{6}$/i.test(hex) ? hex : "#111111", image_url };
}
function validColorImageUrl(value: string) {
  return value.startsWith("/") ? !value.startsWith("//") : /^https?:\/\//i.test(value);
}
const empty: FormData = { name: "", model_code: "", slug: "", sort_order: 0, short_description: "", image_url: "", price_display: "enquire", price_amount: null, status: "draft", top_speed_kmh: null, range_km: null, battery: "", gallery_urls: [], available_colors: [] };
const field = "min-h-11 w-full rounded-md border border-light-outline-variant bg-white px-3.5 py-2.5 font-body text-body-md outline-none focus:ring-2 focus:ring-bar-green";
const slugify = (s: string) => s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

function Field({ label, children }: { label: string; children: ReactNode }) {
  return <label className="flex min-w-0 flex-col gap-1.5"><span className="font-label text-label-sm">{label}</span>{children}</label>;
}

function Sidebar() {
  const [open, setOpen] = useState(false);
  const links = [["/admin", "Dashboard", LayoutDashboard], ["/admin/products", "Products", Bike], ["/admin/enquiries", "Enquiries", Mail], ["/admin/test-rides", "Test Rides", CalendarDays], ["/admin/messages", "Contact Messages", Mail], ["/admin/settings", "Settings", Settings]] as const;
  return <aside className="w-full shrink-0 border-b border-dark-outline-variant bg-dark-surface text-dark-on-surface lg:flex lg:min-h-screen lg:w-64 lg:flex-col lg:justify-between lg:border-b-0 lg:border-r">
    <div className="p-5"><div className="flex items-center justify-between gap-3">
      <Link href="/admin" className="flex items-center gap-3"><span className="rounded-md bg-dark-surface px-1.5 py-2"><Image src="/images/brand/bar-logo-dark.png" alt="BAR Electric Vehicles" width={842} height={282} unoptimized className="h-7 w-20 object-contain" /></span><span><b className="block font-headline text-title-md">BAR Admin</b><small className="text-dark-on-surface-variant">Staff Portal</small></span></Link>
      <button type="button" aria-label="Toggle admin navigation" onClick={() => setOpen(!open)} className="h-10 w-10 rounded-full border border-dark-outline-variant lg:hidden">{open ? <X size={19} /> : <Menu size={19} />}</button>
    </div><nav className={(open ? "flex" : "hidden") + " mt-8 flex-col gap-1.5 lg:flex"} aria-label="Admin navigation">
      {links.map(([href, label, Icon]) => <Link key={href} href={href} aria-current={href === "/admin/products" ? "page" : undefined} className={"flex min-h-11 items-center gap-3 rounded-md px-3.5 py-2.5 font-label text-label-lg " + (href === "/admin/products" ? "bg-bar-green text-on-bar-green" : "text-dark-on-surface-variant hover:bg-dark-surface-high")}><Icon size={19} />{label}</Link>)}
    </nav></div><div className="hidden border-t border-dark-outline-variant p-5 lg:block"><Link href="/" target="_blank" className="text-label-sm text-dark-on-surface-variant">View Public Site ↗</Link></div>
  </aside>;
}

export default function ProductsContent() {
  const client = useMemo(() => createSupabaseBrowserClient(), []);
  const [products, setProducts] = useState<Product[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [form, setForm] = useState<FormData>(empty);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | Status>("all");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const load = useCallback(async () => {
    if (!client) { setLoading(false); setError("Supabase isn’t configured. Add its URL and publishable key to .env.local, then restart the dev server."); return; }
    setLoading(true);
    const { data, error: e } = await client.from("products").select("*").order("sort_order").order("name");
    if (e) { setProducts([]); setError(e.message.includes("products") ? "The products table is missing. Apply the Supabase migration, then reload this page." : e.message); }
    else { setProducts((data ?? []) as Product[]); setError(""); }
    setLoading(false);
  }, [client]);
  useEffect(() => {
    const initialLoad = window.setTimeout(() => void load(), 0);
    return () => window.clearTimeout(initialLoad);
  }, [load]);

  const shown = useMemo(() => products.filter((p) => (filter === "all" || p.status === filter) && (!query.trim() || [p.name, p.model_code, p.slug].some((v) => v.toLowerCase().includes(query.trim().toLowerCase())))), [products, filter, query]);
  const update = <K extends keyof FormData>(key: K, value: FormData[K]) => setForm((old) => ({ ...old, [key]: value }));
  function updateColor(index: number, color: ProductColor) {
    update("available_colors", form.available_colors.map((entry, i) => i === index ? encodeColor(color) : entry));
  }
  function newProduct() { setSelected(null); setForm({ ...empty, sort_order: products.length + 1, available_colors: [encodeColor(blankColor)] }); setNotice(""); setError(""); }
  function edit(p: Product) { const { id, ...values } = p; setSelected(id); setForm({ ...values, available_colors: values.available_colors.length ? values.available_colors : [encodeColor(blankColor)] }); setNotice(""); setError(""); }

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); if (!client) return;
    const colors = form.available_colors.map(decodeColor);
    if (!colors.length) { setError("Add at least one product color before saving."); return; }
    if (colors.some((color) => !color.name.trim() || !/^#[\da-f]{6}$/i.test(color.hex) || !validColorImageUrl(color.image_url.trim()))) {
      setError("Each color needs a name, a valid 6-digit hex code, and an image URL starting with https:// or /."); return;
    }
    setSaving(true); setError(""); setNotice("");
    const payload = { ...form, name: form.name.trim(), model_code: form.model_code.trim(), slug: slugify(form.slug || form.name), short_description: form.short_description.trim(), image_url: form.image_url.trim(), battery: form.battery.trim(), gallery_urls: form.gallery_urls.map((url) => url.trim()).filter(Boolean), available_colors: colors.map((color) => encodeColor({ ...color, name: color.name.trim(), image_url: color.image_url.trim() })), price_amount: form.price_display === "show" ? form.price_amount : null };
    const { error: e } = selected ? await client.from("products").update(payload).eq("id", selected) : await client.from("products").insert(payload);
    if (e) setError(e.code === "23505" ? "That model code or slug already exists. Choose a unique value." : e.message);
    else { setNotice(selected ? "Product changes saved." : "Product added."); await load(); if (!selected) newProduct(); }
    setSaving(false);
  }

  async function changeStatus(p: Product, status: Status) {
    if (!client) return;
    const { error: e } = await client.from("products").update({ status }).eq("id", p.id);
    if (e) setError(e.message); else { setNotice(p.name + " updated."); await load(); if (selected === p.id) setForm((old) => ({ ...old, status })); }
  }
  async function remove(p: Product) {
    if (!client || !window.confirm("Permanently delete " + p.name + "? This cannot be undone.")) return;
    const { error: e } = await client.from("products").delete().eq("id", p.id);
    if (e) setError(e.message); else { setNotice(p.name + " deleted."); if (selected === p.id) newProduct(); await load(); }
  }

  return <div className="min-h-screen bg-light-surface-low lg:flex"><Sidebar /><main className="mx-auto flex w-full max-w-[1500px] flex-1 flex-col gap-6 p-4 sm:p-8">
    <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center"><div><p className="font-label text-label-sm uppercase tracking-widest text-light-on-surface-variant">Catalogue</p><h1 className="mt-1 font-headline text-headline-lg-mobile sm:text-headline-lg">Product Management</h1><p className="mt-1 text-body-sm text-light-on-surface-variant">Manage scooter details, visibility, and catalogue order.</p></div><button onClick={newProduct} type="button" className="inline-flex min-h-11 items-center justify-center gap-2 self-start rounded-full bg-bar-green px-5 font-label text-label-lg"><Plus size={18} />Add Product</button></header>
    {error && <p role="alert" className="flex gap-2 rounded-lg border border-error bg-error-container p-4 text-body-sm text-on-error-container"><CircleAlert size={18} />{error}</p>}
    {notice && <p role="status" className="flex gap-2 rounded-lg border border-success bg-success-container p-4 text-body-sm text-on-success-container"><Check size={18} />{notice}</p>}
    <div className="flex flex-col gap-3 sm:flex-row"><label className="relative flex-1"><span className="sr-only">Search products</span><Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-light-on-surface-variant" /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search model, code, or slug…" className={field + " pl-10"} /></label><label><span className="sr-only">Filter products</span><select value={filter} onChange={(e) => setFilter(e.target.value as typeof filter)} className={field + " min-w-44"}><option value="all">All statuses</option><option value="published">Published</option><option value="draft">Draft</option><option value="archived">Archived</option></select></label></div>
    <div className="grid items-start gap-6 xl:grid-cols-12"><section className="overflow-hidden rounded-xl border border-light-outline-variant bg-white xl:col-span-7" aria-label="Product list"><div className="flex justify-between border-b border-light-outline-variant p-4"><h2 className="font-headline text-title-lg">Scooter models</h2><span className="text-mono-sm text-light-on-surface-variant">{shown.length} shown</span></div><div className="overflow-x-auto"><table className="w-full min-w-[560px] text-left"><thead className="bg-light-surface-low"><tr>{["Order", "Model", "Status", "Actions"].map((v) => <th key={v} className="px-4 py-3 text-label-sm text-light-on-surface-variant">{v}</th>)}</tr></thead><tbody className="divide-y divide-light-outline-variant">
      {loading ? <tr><td colSpan={4} className="p-10 text-center"><LoaderCircle className="mr-2 inline animate-spin" size={18} />Loading…</td></tr> : shown.length === 0 ? <tr><td colSpan={4} className="p-10 text-center text-body-sm text-light-on-surface-variant">{products.length ? "No products match." : "No products yet. Add your first scooter model."}</td></tr> : shown.map((p, i) => <tr key={p.id} className={selected === p.id ? "bg-accent-tint" : "hover:bg-light-surface-low"}><td className="px-4 py-4 font-mono text-mono-sm">{String(p.sort_order ?? i + 1).padStart(2, "0")}</td><td className="px-4 py-4"><button onClick={() => edit(p)} className="text-left"><b className="block text-title-md">{p.name}</b><small className="text-light-on-surface-variant">/products/{p.slug}</small></button></td><td className="px-4 py-4"><span className="rounded-full bg-light-surface-container px-2.5 py-1 text-label-sm">{p.status}</span></td><td className="px-4 py-4 text-right"><button onClick={() => edit(p)} className="mr-3 underline">Edit</button>{p.status === "published" ? <button onClick={() => void changeStatus(p, "draft")} className="text-light-on-surface-variant">Unpublish</button> : <button onClick={() => void changeStatus(p, p.status === "draft" ? "archived" : "draft")} className="text-light-on-surface-variant">{p.status === "draft" ? "Archive" : "Restore"}</button>}</td></tr>)}
    </tbody></table></div></section>
    <section className="rounded-xl border border-light-outline-variant bg-white p-5 sm:p-6 xl:col-span-5" aria-labelledby="editor-title"><div className="mb-5 flex justify-between"><div><p className="text-label-sm uppercase text-light-on-surface-variant">{selected ? "Selected model" : "New model"}</p><h2 id="editor-title" className="font-headline text-title-lg">{selected ? "Edit " + form.name : "Add a product"}</h2></div>{selected && <button type="button" aria-label="Create new product" onClick={newProduct}><X size={19} /></button>}</div>
      <form onSubmit={(e) => void save(e)} className="flex flex-col gap-4">
        <div className="grid gap-4 sm:grid-cols-2"><Field label="Product name *"><input required maxLength={100} value={form.name} onChange={(e) => update("name", e.target.value)} className={field} /></Field><Field label="Model code *"><input required maxLength={50} value={form.model_code} onChange={(e) => update("model_code", e.target.value)} className={field} /></Field></div>
        <div className="grid gap-4 sm:grid-cols-2"><Field label="URL slug *"><input required value={form.slug} onChange={(e) => update("slug", slugify(e.target.value))} onBlur={() => { if (!form.slug && form.name) update("slug", slugify(form.name)); }} className={field + " font-mono"} /></Field><Field label="Display order"><input type="number" min="0" max="9999" value={form.sort_order} onChange={(e) => update("sort_order", Number(e.target.value))} className={field} /></Field></div>
        <Field label="Short description"><textarea rows={3} maxLength={500} value={form.short_description} onChange={(e) => update("short_description", e.target.value)} className={field} /></Field>
        <Field label="Product image URL"><input type="url" value={form.image_url} onChange={(e) => update("image_url", e.target.value)} className={field} placeholder="https://…" /></Field>
        <Field label="Gallery image URLs (one per line)"><textarea rows={3} value={form.gallery_urls.join("\n")} onChange={(e) => update("gallery_urls", e.target.value.split(/\r?\n/).slice(0, 12))} className={field + " font-mono text-body-sm"} placeholder="https://…/side-view.jpg\nhttps://…/rear-view.jpg" /></Field>
        <section className="flex flex-col gap-3 rounded-lg border border-light-outline-variant p-4" aria-labelledby="product-colors-title"><div className="flex flex-wrap items-center justify-between gap-3"><div><h3 id="product-colors-title" className="font-label text-label-md">Available colors <span className="text-error">*</span></h3><p className="text-xs text-light-on-surface-variant">At least one is required. Each color needs its matching scooter image.</p></div><button type="button" disabled={form.available_colors.length >= 12} onClick={() => update("available_colors", [...form.available_colors, encodeColor(blankColor)])} className="inline-flex min-h-10 items-center gap-2 rounded-full border border-light-outline-variant px-3 text-sm disabled:opacity-50"><Plus size={16} />Add color</button></div>
          <div className="flex flex-col gap-3">{form.available_colors.map((entry, index) => { const color = decodeColor(entry); return <div key={index} className="rounded-lg border border-light-outline-variant bg-light-surface-low p-3"><div className="mb-3 flex items-center justify-between"><span className="text-sm font-semibold">Color {index + 1}</span><button type="button" disabled={form.available_colors.length <= 1} onClick={() => update("available_colors", form.available_colors.filter((_, i) => i !== index))} className="text-sm text-error underline disabled:cursor-not-allowed disabled:opacity-40">Remove</button></div><div className="grid gap-3 sm:grid-cols-2"><label className="flex flex-col gap-1.5"><span className="text-xs font-medium">Color name *</span><input required maxLength={60} value={color.name} onChange={(e) => updateColor(index, { ...color, name: e.target.value })} className={field} placeholder="Obsidian Black" /></label><label className="flex flex-col gap-1.5"><span className="text-xs font-medium">Hex code *</span><div className="flex gap-2"><input type="color" aria-label={`Color swatch ${index + 1}`} value={color.hex} onChange={(e) => updateColor(index, { ...color, hex: e.target.value })} className="h-11 w-14 rounded-md border border-light-outline-variant bg-white p-1" /><input required pattern="^#[0-9A-Fa-f]{6}$" value={color.hex} onChange={(e) => updateColor(index, { ...color, hex: e.target.value })} className={field + " font-mono"} placeholder="#111111" /></div></label><label className="flex flex-col gap-1.5 sm:col-span-2"><span className="text-xs font-medium">Scooter image URL for this color *</span><input required value={color.image_url} onChange={(e) => updateColor(index, { ...color, image_url: e.target.value })} className={field + " font-mono text-sm"} placeholder="https://… or /images/products/volt-x-black.png" /></label></div></div>; })}</div>
        </section>
        <div className="grid gap-4 sm:grid-cols-2"><Field label="Top speed (km/h)"><input type="number" min="0" value={form.top_speed_kmh ?? ""} onChange={(e) => update("top_speed_kmh", e.target.value ? Number(e.target.value) : null)} className={field} /></Field><Field label="Range (km)"><input type="number" min="0" value={form.range_km ?? ""} onChange={(e) => update("range_km", e.target.value ? Number(e.target.value) : null)} className={field} /></Field></div>
        <div className="grid gap-4 sm:grid-cols-2"><Field label="Battery"><input maxLength={100} value={form.battery} onChange={(e) => update("battery", e.target.value)} className={field} /></Field><Field label="Publish status"><select value={form.status} onChange={(e) => update("status", e.target.value as Status)} className={field}><option value="draft">Draft</option><option value="published">Published</option><option value="archived">Archived</option></select></Field></div>
        <div className="grid gap-4 sm:grid-cols-2"><Field label="Price display"><select value={form.price_display} onChange={(e) => update("price_display", e.target.value as FormData["price_display"])} className={field}><option value="enquire">Enquire for price</option><option value="show">Show price</option><option value="hide">Hide price</option></select></Field>{form.price_display === "show" && <Field label="Price (₹)"><input type="number" min="0" value={form.price_amount ?? ""} onChange={(e) => update("price_amount", e.target.value ? Number(e.target.value) : null)} className={field} /></Field>}</div>
        <div className="flex flex-col gap-3 border-t border-light-outline-variant pt-4 sm:flex-row"><button disabled={saving || loading} className="flex min-h-11 flex-1 items-center justify-center gap-2 rounded-full bg-bar-green px-5 font-label text-label-lg disabled:opacity-60">{saving ? <LoaderCircle className="animate-spin" size={18} /> : <Check size={18} />}{saving ? "Saving…" : selected ? "Save Product" : "Add Product"}</button>{selected && <button type="button" onClick={() => { const p = products.find((v) => v.id === selected); if (p) void remove(p); }} className="flex min-h-11 items-center justify-center gap-2 rounded-full border border-error px-4 text-error"><Trash2 size={16} />Delete</button>}</div>
        <p className="text-xs text-light-on-surface-variant">Product images are currently stored as URLs. Only published products are readable by public visitors.</p>
      </form></section></div>
  </main></div>;
}
