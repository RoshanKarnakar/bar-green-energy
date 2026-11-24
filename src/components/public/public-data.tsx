"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export type PublicProduct = {
  id: string; name: string; model_code: string; slug: string; sort_order: number;
  short_description: string; image_url: string; price_display: "enquire" | "show" | "hide";
  price_amount: number | null; top_speed_kmh: number | null; range_km: number | null; battery: string;
  gallery_urls: string[]; available_colors: string[];
};

export type PublicSettings = {
  contact_phone: string; public_email: string; business_hours: string; office_address: string;
  test_ride_locations: string[]; instagram_url: string; linkedin_url: string; youtube_url: string;
};

const emptySettings: PublicSettings = { contact_phone: "", public_email: "", business_hours: "", office_address: "", test_ride_locations: [], instagram_url: "", linkedin_url: "", youtube_url: "" };

export function usePublicProducts() {
  const [products, setProducts] = useState<PublicProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const refresh = useCallback(async () => {
    const supabase = createSupabaseBrowserClient();
    if (!supabase) { setLoading(false); return; }
    const { data, error } = await supabase.from("products").select("id,name,model_code,slug,sort_order,short_description,image_url,price_display,price_amount,top_speed_kmh,range_km,battery,gallery_urls,available_colors").eq("status", "published").order("sort_order").order("name");
    if (!error) setProducts((data ?? []) as PublicProduct[]);
    setLoading(false);
  }, []);
  useEffect(() => {
    const initialLoad = window.setTimeout(() => void refresh(), 0);
    const onFocus = () => void refresh();
    window.addEventListener("focus", onFocus);
    return () => { window.clearTimeout(initialLoad); window.removeEventListener("focus", onFocus); };
  }, [refresh]);
  return { products, loading };
}

export function usePublicSettings() {
  const [settings, setSettings] = useState<PublicSettings>(emptySettings);
  const refresh = useCallback(async () => {
    const supabase = createSupabaseBrowserClient();
    if (!supabase) return;
    const { data } = await supabase.rpc("get_public_site_settings");
    const row = Array.isArray(data) ? data[0] : data;
    if (row) setSettings({ ...emptySettings, ...row });
  }, []);
  useEffect(() => {
    const initialLoad = window.setTimeout(() => void refresh(), 0);
    const onFocus = () => void refresh();
    window.addEventListener("focus", onFocus);
    return () => { window.clearTimeout(initialLoad); window.removeEventListener("focus", onFocus); };
  }, [refresh]);
  return settings;
}

export function ProductCards({ compact = false }: { compact?: boolean }) {
  const { products, loading } = usePublicProducts();
  if (loading) return <p className="col-span-full py-8 text-center text-light-on-surface-variant">Loading available scooters…</p>;
  if (!products.length) return <p className="col-span-full py-8 text-center text-light-on-surface-variant">Our scooter range is being updated. Please check back soon.</p>;
  return <>{products.map((product) => <article key={product.id} className="h-full rounded-xl bg-light-surface border border-light-outline-variant overflow-hidden flex flex-col">
    <div className={`relative bg-light-surface-low p-5 ${compact ? "h-52" : "h-64"}`}><Image src={product.image_url || "/images/products/stitch-product.png"} alt={`BAR ${product.name} electric scooter`} fill unoptimized sizes={compact ? "25vw" : "33vw"} className="rounded-lg object-contain" /></div>
    <div className="p-5 flex flex-col flex-1 gap-3"><div><h2 className="font-title text-title-lg text-light-on-surface">{product.name}</h2><p className="font-body text-body-sm text-light-on-surface-variant">{product.model_code}</p></div>
      <p className="font-body text-body-md text-light-on-surface-variant">{product.short_description}</p>
      <div className="grid grid-cols-2 gap-3 pt-3 border-t border-light-outline-variant">
        {product.range_km != null && <p className="text-body-sm"><span className="block text-light-on-surface-variant">Range</span>{product.range_km} km</p>}
        {product.top_speed_kmh != null && <p className="text-body-sm"><span className="block text-light-on-surface-variant">Top speed</span>{product.top_speed_kmh} km/h</p>}
        {product.battery && <p className="text-body-sm"><span className="block text-light-on-surface-variant">Battery</span>{product.battery}</p>}
        {product.price_display === "show" && product.price_amount != null && <p className="text-body-sm"><span className="block text-light-on-surface-variant">Price</span>₹{Number(product.price_amount).toLocaleString("en-IN")}</p>}
      </div>
      <div className="mt-auto pt-3 flex gap-2"><Link href={`/products/${product.slug}`} className="flex-1 text-center rounded-full bg-light-primary text-light-on-primary px-4 py-3">View details</Link><Link href={`/book-test-ride?model=${encodeURIComponent(product.name)}`} className="rounded-full bg-bar-green px-4 py-3 text-on-bar-green">Test ride</Link></div>
    </div>
  </article>)}</>;
}

export function PublicContactDetails({ className = "" }: { className?: string }) {
  const settings = usePublicSettings();
  return <div className={className}>
    {settings.contact_phone && <p>Phone: <a href={`tel:${settings.contact_phone.replace(/[^+\d]/g, "")}`}>{settings.contact_phone}</a></p>}
    {settings.public_email && <p>Email: <a href={`mailto:${settings.public_email}`}>{settings.public_email}</a></p>}
    {settings.business_hours && <p>{settings.business_hours}</p>}
    {settings.office_address && <p>{settings.office_address}</p>}
  </div>;
}

export function FooterProductLinks() {
  const { products, loading } = usePublicProducts();
  if (loading) return <li><Link href="/products" className="hover:text-bar-green">Browse all scooters</Link></li>;
  if (!products.length) return <li><Link href="/products" className="hover:text-bar-green">Browse all scooters</Link></li>;
  return <>{products.map((product) => <li key={product.id}><Link href={`/products/${product.slug}`} className="hover:text-bar-green">{product.name}</Link></li>)}</>;
}

export function PublicProductSelect({ defaultValue = "" }: { defaultValue?: string }) {
  const { products, loading } = usePublicProducts();
  return <select name="model" defaultValue={defaultValue} disabled={loading} className="w-full min-h-[44px] px-4 py-2.5 rounded-md border border-light-outline-variant bg-light-surface font-body text-body-md focus:border-bar-black focus:ring-2 focus:ring-bar-green">
    <option value="">Not specific / General</option>
    {products.map((product) => <option key={product.id} value={product.name}>{product.name}</option>)}
  </select>;
}

export function TestRideLocationField() {
  const settings = usePublicSettings();
  const fieldClass = "w-full min-h-[44px] px-4 py-2.5 rounded-md border border-light-outline-variant bg-light-surface font-body text-body-md focus:border-bar-black focus:ring-2 focus:ring-bar-green";
  return settings.test_ride_locations.length ? <select name="city" required defaultValue="" className={fieldClass}>
    <option value="" disabled>Select a showroom location</option>
    {settings.test_ride_locations.map((location) => <option key={location} value={location}>{location}</option>)}
  </select> : <input name="city" type="text" required placeholder="Enter your preferred city or showroom" className={fieldClass} />;
}
