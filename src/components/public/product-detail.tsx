"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ChevronRight, ShieldCheck } from "lucide-react";
import { SymbolIcon } from "@/components/ui/symbol-icon";
import { PublicContactDetails, FooterProductLinks, usePublicProducts } from "@/components/public/public-data";

function colorInfo(value: string) {
  try {
    const parsed = JSON.parse(value) as { name?: string; hex?: string; image_url?: string };
    if (parsed && typeof parsed.name === "string") return { name: parsed.name, swatch: parsed.hex || "#dfe2df", imageUrl: parsed.image_url || "" };
  } catch { /* Accept existing Name|#HEX entries. */ }
  const [namePart, colorPart, imagePart] = value.split("|");
  const name = namePart.trim();
  const custom = colorPart?.trim() ?? "";
  if (/^#[\da-f]{3}(?:[\da-f]{3})?$/i.test(custom)) return { name, swatch: custom, imageUrl: imagePart?.trim() || "" };
  const lower = name.toLowerCase();
  if (lower.includes("black")) return { name, swatch: "#111111", imageUrl: imagePart?.trim() || "" };
  if (lower.includes("white")) return { name, swatch: "#f7f7f4", imageUrl: imagePart?.trim() || "" };
  if (lower.includes("lime") || lower.includes("green")) return { name, swatch: "#8ed000", imageUrl: imagePart?.trim() || "" };
  if (lower.includes("red")) return { name, swatch: "#d8292f", imageUrl: imagePart?.trim() || "" };
  if (lower.includes("blue")) return { name, swatch: "#2463c5", imageUrl: imagePart?.trim() || "" };
  if (lower.includes("silver") || lower.includes("grey") || lower.includes("gray")) return { name, swatch: "#a9adae", imageUrl: imagePart?.trim() || "" };
  return { name, swatch: "#dfe2df", imageUrl: imagePart?.trim() || "" };
}

function money(value: number) {
  return `₹${Number(value).toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;
}

export default function ProductDetail({ slug }: { slug: string }) {
  const { products, loading } = usePublicProducts();
  const [activeImage, setActiveImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const product = products.find((item) => item.slug === slug);

  if (loading) return <main className="grid min-h-[60vh] place-items-center bg-light-surface text-light-on-surface">Loading scooter details…</main>;
  if (!product) return <main className="grid min-h-[60vh] place-items-center bg-light-surface p-6"><div className="text-center"><h1 className="text-3xl font-semibold">Scooter not found</h1><p className="mt-3 text-light-on-surface-variant">This model may be unavailable or no longer published.</p><Link className="mt-6 inline-flex rounded-full bg-bar-green px-6 py-3" href="/products">Browse scooters</Link></div></main>;

  const configuredColors = product.available_colors.length ? product.available_colors : ["Obsidian Black|#111111", "Electric Lime|#8ed000", "Pearl White|#f7f7f4"];
  const colors = configuredColors.map(colorInfo);
  const currentColor = colors.find((color) => color.name === selectedColor) || (!selectedColor ? colors[0] : undefined);
  const gallery = [...new Set([currentColor?.imageUrl || product.image_url, ...product.gallery_urls].filter(Boolean))];
  const image = gallery[activeImage] || "/images/products/stitch-product.png";
  const price = product.price_display === "show" && product.price_amount != null ? money(product.price_amount) : product.price_display === "enquire" ? "Enquire for price" : null;
  const specifications = [
    ["Model", product.model_code],
    ["Certified range", product.range_km != null ? `${product.range_km} km` : ""],
    ["Top speed", product.top_speed_kmh != null ? `${product.top_speed_kmh} km/h` : ""],
    ["Battery", product.battery],
  ].filter(([, value]) => value);

  return <div className="min-h-screen bg-light-surface text-light-on-surface">
    <header className="sticky top-0 z-40 bg-light-surface border-b border-light-outline-variant">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bar-black rounded-md p-1">
          <Image src="/images/brand/bar-logo.png" alt="BAR Electric Vehicles" width={842} height={282} priority className="h-16 w-[172px] sm:w-[190px] object-contain" />
        </Link>

        <nav aria-label="Primary" className="hidden lg:flex items-center gap-7">
          <Link href="/" className="font-label text-label-lg text-light-on-surface-variant hover:text-light-on-surface py-1 transition-colors duration-state-change">Home</Link>
          <Link href="/products" className="font-label text-label-lg text-light-on-surface border-b-2 border-bar-green py-1">Products</Link>
          <Link href="/about" className="font-label text-label-lg text-light-on-surface-variant hover:text-light-on-surface py-1 transition-colors duration-state-change">About Us</Link>
          <Link href="/technology" className="font-label text-label-lg text-light-on-surface-variant hover:text-light-on-surface py-1 transition-colors duration-state-change">Technology</Link>
          <Link href="/sustainability" className="font-label text-label-lg text-light-on-surface-variant hover:text-light-on-surface py-1 transition-colors duration-state-change">Sustainability</Link>
          <Link href="/contact" className="font-label text-label-lg text-light-on-surface-variant hover:text-light-on-surface py-1 transition-colors duration-state-change">Contact</Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/book-test-ride" data-component-id="button-primary" data-component-type="button" data-component-variant="primary" className="hidden sm:inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 rounded-full bg-bar-green text-on-bar-green font-label text-label-lg transition-colors duration-state-change hover:bg-accent-container focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bar-black focus-visible:ring-offset-2">
            <span data-design-text-token="label-lg">Book a Test Ride</span>
          </Link>
          <button type="button" id="mobile-menu-btn" aria-label="Toggle navigation menu" aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)} className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-full border border-light-outline-variant bg-light-surface text-light-on-surface hover:bg-light-surface-low">
            <SymbolIcon name="menu" className="text-[22px]" />
          </button>
        </div>
      </div>

      <div id="mobile-menu" className={`${menuOpen ? "block" : "hidden"} lg:hidden border-t border-light-outline-variant bg-light-surface px-4 py-4`}>
        <nav aria-label="Mobile" className="flex flex-col gap-2">
          <Link href="/" className="min-h-[44px] px-4 py-2.5 rounded-md text-light-on-surface-variant hover:bg-light-surface-low font-label text-label-lg flex items-center">Home</Link>
          <Link href="/products" className="min-h-[44px] px-4 py-2.5 rounded-md bg-accent-tint text-on-accent-container font-label text-label-lg flex items-center">Products</Link>
          <Link href="/about" className="min-h-[44px] px-4 py-2.5 rounded-md text-light-on-surface-variant hover:bg-light-surface-low font-label text-label-lg flex items-center">About Us</Link>
          <Link href="/technology" className="min-h-[44px] px-4 py-2.5 rounded-md text-light-on-surface-variant hover:bg-light-surface-low font-label text-label-lg flex items-center">Technology</Link>
          <Link href="/sustainability" className="min-h-[44px] px-4 py-2.5 rounded-md text-light-on-surface-variant hover:bg-light-surface-low font-label text-label-lg flex items-center">Sustainability</Link>
          <Link href="/contact" className="min-h-[44px] px-4 py-2.5 rounded-md text-light-on-surface-variant hover:bg-light-surface-low font-label text-label-lg flex items-center">Contact</Link>
          <Link href="/book-test-ride" className="mt-2 min-h-[44px] px-5 py-3 rounded-full bg-bar-green text-on-bar-green font-label text-label-lg flex items-center justify-center">Book a Test Ride</Link>
        </nav>
      </div>
    </header>

    <div className="border-b border-light-outline-variant bg-light-surface-low"><div className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-3 text-sm text-light-on-surface-variant sm:px-6 lg:px-8"><Link href="/products" className="hover:text-light-on-surface">Products</Link><ChevronRight size={15} /><span aria-current="page" className="font-medium text-light-on-surface">{product.name}</span></div></div>

    <main>
      <section className="py-8 sm:py-10 lg:py-12"><div className="mx-auto grid max-w-7xl items-start gap-8 px-4 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:px-8">
        <div className="flex min-w-0 flex-col gap-4 lg:col-span-7">
          <div className="relative aspect-[1.38] overflow-hidden rounded-3xl border border-light-outline-variant bg-light-surface-low p-5 sm:p-8 lg:p-10"><div className="relative h-full w-full overflow-hidden rounded-2xl"><Image key={image} src={image} alt={`${product.name}${selectedColor ? ` in ${selectedColor}` : ""} electric scooter`} fill priority unoptimized sizes="(max-width: 1024px) 100vw, 58vw" className="object-contain" /></div></div>
          {gallery.length > 0 && <div className="grid grid-cols-3 gap-3" aria-label="Product image gallery">{gallery.map((url, index) => <button key={url} type="button" onClick={() => setActiveImage(index)} aria-label={`Show product image ${index + 1}`} aria-pressed={activeImage === index} className={`relative aspect-[2.15] min-w-0 overflow-hidden rounded-2xl border-2 bg-light-surface-low p-1.5 ${activeImage === index ? "border-bar-green" : "border-light-outline-variant hover:border-light-outline"}`}><span className="relative block h-full w-full overflow-hidden rounded-lg"><Image src={url} alt="" fill unoptimized sizes="(max-width: 1024px) 33vw, 20vw" className="object-cover" /></span></button>)}</div>}
        </div>

        <div className="flex min-w-0 flex-col gap-5 lg:col-span-5 lg:pt-1">
          <div><span className="inline-flex rounded-full border border-bar-green/30 bg-bar-green/5 px-3 py-1 text-xs font-medium">Electric Scooter</span><h1 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">{product.name}</h1>{price && <p className="mt-2 font-mono text-base font-semibold">{price}</p>}<p className="mt-5 max-w-xl text-base leading-7 text-light-on-surface-variant">{product.short_description || `Discover the ${product.name}, designed for confident, everyday electric mobility.`}</p></div>

          <fieldset className="border-t border-light-outline-variant pt-3"><legend className="sr-only">Available colors</legend><p className="mb-3 text-sm font-semibold">Available Colors</p><div className="flex flex-wrap gap-2.5">{colors.map((color) => { const active = (selectedColor || colors[0]?.name) === color.name; return <button key={color.name} type="button" aria-label={`Select ${color.name}`} aria-pressed={active} onClick={() => { setSelectedColor(color.name); setActiveImage(0); }} className={`inline-flex min-h-11 items-center gap-2 rounded-full border px-3.5 py-2 text-xs transition sm:text-sm ${active ? "border-bar-black ring-1 ring-bar-black" : "border-light-outline-variant hover:border-light-outline"}`}><span aria-hidden="true" className="h-4 w-4 rounded-full border border-black/20" style={{ backgroundColor: color.swatch }} />{color.name}</button>; })}</div></fieldset>

          <div className="grid grid-cols-2 gap-3"><Link href={`/book-test-ride?model=${encodeURIComponent(product.name)}`} className="inline-flex min-h-12 items-center justify-center rounded-full bg-bar-green px-4 py-3 text-center text-sm font-semibold text-on-bar-green transition hover:bg-accent-container">Book a Test Ride</Link><Link href={`/contact?model=${encodeURIComponent(product.name)}`} className="inline-flex min-h-12 items-center justify-center rounded-full border border-light-outline-variant px-4 py-3 text-center text-sm font-semibold transition hover:bg-light-surface-low">Enquire Now</Link></div>

          <div className="grid grid-cols-2 gap-x-5 gap-y-4 rounded-3xl border border-light-outline-variant bg-light-surface-low p-5"><div><span className="block text-xs text-light-on-surface-variant">Estimated Range</span><strong className="mt-1 block font-mono text-sm">{product.range_km != null ? `${product.range_km} km` : "Contact for details"}</strong></div><div><span className="block text-xs text-light-on-surface-variant">Top Speed</span><strong className="mt-1 block font-mono text-sm">{product.top_speed_kmh != null ? `${product.top_speed_kmh} km/h` : "Contact for details"}</strong></div><div><span className="block text-xs text-light-on-surface-variant">Charging Time</span><strong className="mt-1 block font-mono text-sm">Contact for details</strong></div><div><span className="block text-xs text-light-on-surface-variant">Motor Output</span><strong className="mt-1 block font-mono text-sm">Contact for details</strong></div></div>
        </div>
      </div></section>

      <section className="border-y border-light-outline-variant bg-light-surface-low py-12 sm:py-16"><div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-12 lg:px-8"><div className="lg:col-span-7"><p className="font-label text-label-sm uppercase tracking-[0.16em] text-bar-green">Specifications</p><h2 className="mt-2 font-headline text-2xl font-semibold sm:text-3xl">{product.name} details</h2>{specifications.length ? <div className="mt-6 overflow-hidden rounded-xl border border-light-outline-variant bg-light-surface"><dl>{specifications.map(([label, value], index) => <div key={label} className={`grid grid-cols-2 gap-4 px-5 py-4 ${index ? "border-t border-light-outline-variant" : ""}`}><dt className="text-sm text-light-on-surface-variant sm:text-base">{label}</dt><dd className="text-sm font-medium sm:text-base">{value}</dd></div>)}</dl></div> : <p className="mt-5 rounded-xl border border-light-outline-variant bg-light-surface p-5 text-light-on-surface-variant">Detailed specifications are being updated. Contact our team for current product information.</p>}</div>
        <aside className="flex flex-col gap-4 lg:col-span-5"><div className="rounded-xl border border-light-outline-variant bg-light-surface p-6"><div className="flex items-center gap-2"><ShieldCheck size={19} className="text-bar-green"/><h3 className="font-title text-title-lg">Warranty &amp; support</h3></div><p className="mt-3 text-sm leading-6 text-light-on-surface-variant">For current warranty terms, service availability, and ownership support for {product.name}, please contact the BAR team.</p><Link href="/contact" className="mt-4 inline-flex items-center gap-1 font-medium text-bar-black underline decoration-bar-green decoration-2 underline-offset-4">Contact BAR <ChevronRight size={16}/></Link></div>
          <div className="rounded-xl border border-light-outline-variant bg-light-surface p-6"><h3 className="font-title text-title-lg">Frequently asked questions</h3><details className="group mt-3 border-b border-light-outline-variant py-3"><summary className="cursor-pointer font-medium">Can I book a test ride?</summary><p className="pt-3 text-sm leading-6 text-light-on-surface-variant">Yes. Send a preferred location and time through the booking form and the team will confirm availability.</p></details><details className="group border-b border-light-outline-variant py-3"><summary className="cursor-pointer font-medium">How can I confirm a specification?</summary><p className="pt-3 text-sm leading-6 text-light-on-surface-variant">Specifications shown here are the details currently published for this model. Contact the team if you need more information.</p></details><details className="group py-3"><summary className="cursor-pointer font-medium">Are all listed colors available at every showroom?</summary><p className="pt-3 text-sm leading-6 text-light-on-surface-variant">Color availability can vary. Please ask the team about your preferred color and location.</p></details></div>
        </aside></div></section>
    </main>

    <footer className="bg-dark-surface text-dark-on-surface border-t border-dark-outline-variant">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-4 flex flex-col gap-4">
          <div className="inline-flex w-fit">
            <Image src="/images/brand/bar-logo-dark.png" alt="BAR Electric Vehicles" width={842} height={282} unoptimized className="h-20 w-[220px] object-contain" />
          </div>
          <p className="font-body text-body-md text-dark-on-surface-variant">Build for Brighter Tomorrow.</p>
          <p className="font-body text-body-sm text-dark-on-surface-variant">Discover the BAR range, find a showroom, or request a test ride.</p>
        </div>
        <div className="lg:col-span-2 flex flex-col gap-3">
          <h3 className="font-label text-label-lg text-dark-on-surface">Scooters</h3>
          <ul className="flex flex-col gap-2 font-body text-body-sm text-dark-on-surface-variant">
            <FooterProductLinks />
          </ul>
        </div>
        <div className="lg:col-span-3 flex flex-col gap-3">
          <h3 className="font-label text-label-lg text-dark-on-surface">Company</h3>
          <ul className="flex flex-col gap-2 font-body text-body-sm text-dark-on-surface-variant">
            <li><Link href="/about" className="hover:text-bar-green">About Us</Link></li>
            <li><Link href="/technology" className="hover:text-bar-green">Technology</Link></li>
            <li><Link href="/sustainability" className="hover:text-bar-green">Sustainability</Link></li>
            <li><Link href="/contact" className="hover:text-bar-green">Contact</Link></li>
          </ul>
        </div>
        <div className="lg:col-span-3 flex flex-col gap-3">
          <h3 className="font-label text-label-lg text-dark-on-surface">Get in Touch</h3>
          <ul className="flex flex-col gap-2 font-body text-body-sm text-dark-on-surface-variant">
            <li><PublicContactDetails /></li>
            <li className="pt-2"><Link href="/book-test-ride" className="inline-flex items-center gap-1.5 text-bar-green font-label text-label-lg hover:underline">Book a Test Ride <SymbolIcon name="arrow_forward" className="text-[18px]" /></Link></li>
            <li><Link href="/admin/login" className="text-dark-on-surface-variant hover:text-dark-on-surface">Staff Admin Portal</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-dark-outline-variant py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-body text-body-sm text-dark-on-surface-variant">
          <span>© 2026 BAR Green Energy Pvt. Ltd. All rights reserved.</span>
          <span>Electric mobility for a brighter tomorrow.</span>
        </div>
      </div>
    </footer>
  </div>;
}
