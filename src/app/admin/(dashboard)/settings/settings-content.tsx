"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState, type FormEvent } from "react";
import { Bike, Bell, CalendarDays, Check, CircleAlert, LayoutDashboard, LoaderCircle, Mail, Menu, Save, Settings as SettingsIcon, X } from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

type SiteSettings = {
  contact_phone: string;
  public_email: string;
  notification_email: string;
  business_hours: string;
  office_address: string;
  test_ride_locations: string;
  instagram_url: string;
  linkedin_url: string;
  youtube_url: string;
  notify_enquiries: boolean;
  notify_test_rides: boolean;
  notify_contact: boolean;
};

const initial: SiteSettings = {
  contact_phone: "", public_email: "", notification_email: "",
  business_hours: "", office_address: "", test_ride_locations: "",
  instagram_url: "", linkedin_url: "", youtube_url: "",
  notify_enquiries: true, notify_test_rides: true, notify_contact: true,
};
const field = "min-h-11 w-full rounded-md border border-light-outline-variant bg-white px-3.5 py-2.5 font-body text-body-md outline-none focus:ring-2 focus:ring-bar-green";

function Sidebar() {
  const [open, setOpen] = useState(false);
  const links = [["/admin", "Dashboard", LayoutDashboard], ["/admin/products", "Products", Bike], ["/admin/enquiries", "Enquiries", Mail], ["/admin/test-rides", "Test Rides", CalendarDays], ["/admin/messages", "Contact Messages", Mail], ["/admin/settings", "Settings", SettingsIcon]] as const;
  return <aside className="w-full shrink-0 border-b border-dark-outline-variant bg-dark-surface text-dark-on-surface lg:flex lg:min-h-screen lg:w-64 lg:flex-col lg:justify-between lg:border-b-0 lg:border-r">
    <div className="p-5"><div className="flex items-center justify-between gap-3">
      <Link href="/admin" className="flex items-center gap-3"><span className="rounded-md bg-dark-surface px-1.5 py-2"><Image src="/images/brand/bar-logo-dark.png" alt="BAR Electric Vehicles" width={842} height={282} unoptimized className="h-7 w-20 object-contain" /></span><span><b className="block font-headline text-title-md">BAR Admin</b><small className="text-dark-on-surface-variant">Staff Portal</small></span></Link>
      <button type="button" aria-label="Toggle admin navigation" aria-expanded={open} onClick={() => setOpen(!open)} className="h-10 w-10 rounded-full border border-dark-outline-variant lg:hidden">{open ? <X size={19} /> : <Menu size={19} />}</button>
    </div><nav className={(open ? "flex" : "hidden") + " mt-8 flex-col gap-1.5 lg:flex"} aria-label="Admin navigation">
      {links.map(([href, label, Icon]) => <Link key={href} href={href} aria-current={href === "/admin/settings" ? "page" : undefined} className={"flex min-h-11 items-center gap-3 rounded-md px-3.5 py-2.5 font-label text-label-lg " + (href === "/admin/settings" ? "bg-bar-green text-on-bar-green" : "text-dark-on-surface-variant hover:bg-dark-surface-high")}><Icon size={19} />{label}</Link>)}
    </nav></div><div className="hidden border-t border-dark-outline-variant p-5 lg:block"><Link href="/" target="_blank" className="text-label-sm text-dark-on-surface-variant">View Public Site ↗</Link></div>
  </aside>;
}

function SettingField({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return <label className="flex flex-col gap-1.5"><span className="font-label text-label-sm">{label}</span>{children}{hint && <span className="text-xs text-light-on-surface-variant">{hint}</span>}</label>;
}

export default function SettingsContent() {
  const client = useMemo(() => createSupabaseBrowserClient(), []);
  const [settings, setSettings] = useState<SiteSettings>(initial);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const load = useCallback(async () => {
    if (!client) { setLoading(false); setError("Supabase isn’t configured. Check the project URL and publishable key in .env.local."); return; }
    setLoading(true);
    const { data, error: loadError } = await client.from("site_settings").select("*").eq("id", 1).maybeSingle();
    if (loadError) setError(loadError.message.includes("site_settings") ? "The settings table is missing. Run the settings migration in Supabase, then reload this page." : loadError.message);
    else if (data) setSettings({
      contact_phone: data.contact_phone ?? "",
      public_email: data.public_email ?? "",
      notification_email: data.notification_email ?? "",
      business_hours: data.business_hours ?? "",
      office_address: data.office_address ?? "",
      test_ride_locations: (data.test_ride_locations ?? []).join("\n"),
      instagram_url: data.instagram_url ?? "",
      linkedin_url: data.linkedin_url ?? "",
      youtube_url: data.youtube_url ?? "",
      notify_enquiries: data.notify_enquiries ?? true,
      notify_test_rides: data.notify_test_rides ?? true,
      notify_contact: data.notify_contact ?? true,
    });
    setLoading(false);
  }, [client]);
  useEffect(() => {
    const initialLoad = window.setTimeout(() => void load(), 0);
    return () => window.clearTimeout(initialLoad);
  }, [load]);

  function update<K extends keyof SiteSettings>(key: K, value: SiteSettings[K]) {
    setSettings((current) => ({ ...current, [key]: value }));
  }

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!client) return;
    setSaving(true); setError(""); setNotice("");
    const payload = {
      ...settings,
      contact_phone: settings.contact_phone.trim(),
      public_email: settings.public_email.trim(),
      notification_email: settings.notification_email.trim(),
      office_address: settings.office_address.trim(),
      test_ride_locations: settings.test_ride_locations.split("\n").map((item) => item.trim()).filter(Boolean),
      instagram_url: settings.instagram_url.trim(),
      linkedin_url: settings.linkedin_url.trim(),
      youtube_url: settings.youtube_url.trim(),
    };
    const { error: saveError } = await client.from("site_settings").update(payload).eq("id", 1);
    if (saveError) setError(saveError.message);
    else setNotice("Settings saved.");
    setSaving(false);
  }

  return <div className="min-h-screen bg-light-surface-low lg:flex"><Sidebar /><main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-6 p-4 sm:p-8">
    <header><p className="font-label text-label-sm uppercase tracking-widest text-light-on-surface-variant">Admin preferences</p><h1 className="mt-1 font-headline text-headline-lg-mobile sm:text-headline-lg">Settings</h1><p className="mt-1 text-body-sm text-light-on-surface-variant">Manage company contact details, locations, social links, and submission notification preferences.</p></header>
    {error && <p role="alert" className="flex gap-2 rounded-lg border border-error bg-error-container p-4 text-body-sm text-on-error-container"><CircleAlert size={18} />{error}</p>}
    {notice && <p role="status" className="flex gap-2 rounded-lg border border-success bg-success-container p-4 text-body-sm text-on-success-container"><Check size={18} />{notice}</p>}
    <form onSubmit={(event) => void save(event)} className="flex flex-col gap-6">
      <section className="rounded-xl border border-light-outline-variant bg-white p-5 sm:p-6">
        <div className="mb-5"><h2 className="font-headline text-title-lg">Company contact information</h2><p className="mt-1 text-body-sm text-light-on-surface-variant">Details staff can keep up to date for customer enquiries.</p></div>
        <div className="grid gap-4 sm:grid-cols-2">
          <SettingField label="Public phone number"><input type="tel" maxLength={30} value={settings.contact_phone} onChange={(e) => update("contact_phone", e.target.value)} className={field} placeholder="+91 …" /></SettingField>
          <SettingField label="Public contact email"><input type="email" maxLength={254} value={settings.public_email} onChange={(e) => update("public_email", e.target.value)} className={field} placeholder="info@company.com" /></SettingField>
          <SettingField label="Enquiry notification email" hint="Address intended to receive new submission alerts. Email delivery needs a configured email service."><input type="email" maxLength={254} value={settings.notification_email} onChange={(e) => update("notification_email", e.target.value)} className={field} placeholder="team@company.com" /></SettingField>
          <SettingField label="Business hours"><input maxLength={160} value={settings.business_hours} onChange={(e) => update("business_hours", e.target.value)} className={field} placeholder="Mon–Sat, 9:30 AM–6:30 PM" /></SettingField>
          <div className="sm:col-span-2"><SettingField label="Office / showroom address"><textarea rows={3} maxLength={500} value={settings.office_address} onChange={(e) => update("office_address", e.target.value)} className={field} placeholder="Street, city, state, PIN code" /></SettingField></div>
          <div className="sm:col-span-2"><SettingField label="Test ride locations" hint="Enter one city or showroom per line."><textarea rows={3} maxLength={1000} value={settings.test_ride_locations} onChange={(e) => update("test_ride_locations", e.target.value)} className={field} placeholder={"Bengaluru\nPune"} /></SettingField></div>
        </div>
      </section>
      <section className="rounded-xl border border-light-outline-variant bg-white p-5 sm:p-6">
        <div className="mb-5"><h2 className="font-headline text-title-lg">Social links</h2><p className="mt-1 text-body-sm text-light-on-surface-variant">Add the official BAR Green Energy profiles.</p></div>
        <div className="grid gap-4 sm:grid-cols-3">
          <SettingField label="Instagram URL"><input type="url" maxLength={500} value={settings.instagram_url} onChange={(e) => update("instagram_url", e.target.value)} className={field} placeholder="https://instagram.com/…" /></SettingField>
          <SettingField label="LinkedIn URL"><input type="url" maxLength={500} value={settings.linkedin_url} onChange={(e) => update("linkedin_url", e.target.value)} className={field} placeholder="https://linkedin.com/company/…" /></SettingField>
          <SettingField label="YouTube URL"><input type="url" maxLength={500} value={settings.youtube_url} onChange={(e) => update("youtube_url", e.target.value)} className={field} placeholder="https://youtube.com/…" /></SettingField>
        </div>
      </section>
      <section className="rounded-xl border border-light-outline-variant bg-white p-5 sm:p-6">
        <div className="mb-5 flex items-center gap-3"><Bell size={20} className="text-success" /><div><h2 className="font-headline text-title-lg">Notification preferences</h2><p className="mt-1 text-body-sm text-light-on-surface-variant">Choose which submission types should send admin alerts when email delivery is configured.</p></div></div>
        <div className="grid gap-3 sm:grid-cols-3">
          {([["notify_enquiries", "New enquiries"], ["notify_test_rides", "Test ride requests"], ["notify_contact", "Contact messages"]] as const).map(([key, label]) => <label key={key} className="flex min-h-12 cursor-pointer items-center gap-3 rounded-lg border border-light-outline-variant px-4"><input type="checkbox" checked={settings[key]} onChange={(e) => update(key, e.target.checked)} className="h-4 w-4 accent-[#8ED000]" /><span className="font-label text-label-sm">{label}</span></label>)}
        </div>
      </section>
      <div className="flex flex-col gap-3 sm:flex-row sm:justify-end"><button type="submit" disabled={saving || loading} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-bar-green px-6 font-label text-label-lg text-on-bar-green disabled:opacity-60">{saving ? <LoaderCircle size={18} className="animate-spin" /> : <Save size={18} />}{saving ? "Saving…" : "Save Settings"}</button></div>
    </form>
    <p className="text-xs leading-5 text-light-on-surface-variant">Settings are stored securely in Supabase. Public website sections and email alerts must be connected to these values separately before they change for visitors.</p>
  </main></div>;
}
