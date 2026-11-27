"use client";
import Link from "next/link";
import { SymbolIcon } from "@/components/ui/symbol-icon";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import { PublicContactDetails, PublicProductSelect, usePublicSettings, FooterProductLinks } from "@/components/public/public-data";

export default function ContactPageContent() {
  const siteSettings = usePublicSettings();
  const [status, setStatus] = useState<"idle" | "success" | "error" | "submitting">("idle");
  const [submitError, setSubmitError] = useState("");
  const [notificationNote, setNotificationNote] = useState("");
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const values = new FormData(form);
    const name = String(values.get("name") ?? "").trim();
    const phone = String(values.get("phone") ?? "").trim();
    const email = String(values.get("email") ?? "").trim();
    const message = String(values.get("message") ?? "").trim();
    const topic = String(values.get("enquiryType") ?? "General Contact Message");
    const model = String(values.get("model") ?? "");
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!name || !phone || !validEmail || !message) {
      setSubmitError("Please enter your name, a valid phone number and email, and a message.");
      setStatus("error");
      return;
    }
    setStatus("submitting");
    setSubmitError("");
    setNotificationNote("");
    try {
      const response = await fetch("/api/submissions", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kind: topic === "General Contact Message" ? "contact" : "enquiry",
          name, phone, email, topic, model, message,
          website: String(values.get("website") ?? ""),
        }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "We couldn’t send your message. Please try again.");
      setNotificationNote(result.emailSent ? "An email notification has been sent to the BAR team." : "Your message was saved, but email notification is not configured yet.");
      setStatus("success");
      form.reset();
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "We couldn’t send your message. Please try again.");
      setStatus("error");
    }
  }

  useEffect(() => {
    const menuBtn = document.getElementById("mobile-menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");
    if (!menuBtn || !mobileMenu) return;
    const toggleMenu = () => {
      const expanded = menuBtn.getAttribute("aria-expanded") === "true";
      menuBtn.setAttribute("aria-expanded", String(!expanded));
      mobileMenu.classList.toggle("hidden");
    };
    menuBtn.addEventListener("click", toggleMenu);
    return () => menuBtn.removeEventListener("click", toggleMenu);
  }, []);

  return (

    <div className="min-h-screen flex flex-col" data-stitch-vh="min-h-screen===min-h-screen">
      <header className="sticky top-0 z-40 bg-light-surface border-b border-light-outline-variant">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-6">
          <Link href="/" className="flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bar-black rounded-md p-1">
            <Image src="/images/brand/bar-logo.png" alt="BAR Electric Vehicles" width={842} height={282} priority className="h-16 w-[172px] sm:w-[190px] object-contain" />
          </Link>
          <nav aria-label="Primary" className="hidden lg:flex items-center gap-7">
            <Link href="/" className="font-label text-label-lg text-light-on-surface-variant hover:text-light-on-surface py-1">Home</Link>
            <Link href="/products" className="font-label text-label-lg text-light-on-surface-variant hover:text-light-on-surface py-1">Products</Link>
            <Link href="/about" className="font-label text-label-lg text-light-on-surface-variant hover:text-light-on-surface py-1">About Us</Link>
            <Link href="/technology" className="font-label text-label-lg text-light-on-surface-variant hover:text-light-on-surface py-1">Technology</Link>
            <Link href="/sustainability" className="font-label text-label-lg text-light-on-surface-variant hover:text-light-on-surface py-1">Sustainability</Link>
            <Link href="/contact" className="font-label text-label-lg text-light-on-surface border-b-2 border-bar-green py-1">Contact</Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/book-test-ride" className="hidden sm:inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 rounded-full bg-bar-green text-on-bar-green font-label text-label-lg hover:bg-accent-container">Book a Test Ride</Link>
            <button
              type="button"
              id="mobile-menu-btn"
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen((open) => !open)}
              className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-full border border-light-outline-variant bg-light-surface text-light-on-surface"
            >
              <SymbolIcon name="menu" className="text-[22px]" />
            </button>
          </div>
        </div>
        <div
          id="mobile-menu"
          className={`${menuOpen ? "block" : "hidden"} lg:hidden border-t border-light-outline-variant bg-light-surface px-4 py-4`}
        >
          <nav aria-label="Mobile" className="flex flex-col gap-2">
            <Link href="/" onClick={() => setMenuOpen(false)} className="min-h-[44px] px-4 py-2.5 rounded-md text-light-on-surface-variant font-label text-label-lg flex items-center">
              Home
            </Link>
            <Link href="/products" onClick={() => setMenuOpen(false)} className="min-h-[44px] px-4 py-2.5 rounded-md text-light-on-surface-variant font-label text-label-lg flex items-center">
              Products
            </Link>
            <Link href="/about" onClick={() => setMenuOpen(false)} className="min-h-[44px] px-4 py-2.5 rounded-md text-light-on-surface-variant font-label text-label-lg flex items-center">
              About Us
            </Link>
            <Link href="/technology" onClick={() => setMenuOpen(false)} className="min-h-[44px] px-4 py-2.5 rounded-md text-light-on-surface-variant font-label text-label-lg flex items-center">
              Technology
            </Link>
            <Link href="/sustainability" onClick={() => setMenuOpen(false)} className="min-h-[44px] px-4 py-2.5 rounded-md text-light-on-surface-variant font-label text-label-lg flex items-center">
              Sustainability
            </Link>
            <Link href="/contact" onClick={() => setMenuOpen(false)} className="min-h-[44px] px-4 py-2.5 rounded-md bg-accent-tint text-on-accent-container font-label text-label-lg flex items-center">
              Contact
            </Link>
            <Link href="/book-test-ride" onClick={() => setMenuOpen(false)} className="mt-2 min-h-[44px] px-5 py-3 rounded-full bg-bar-green text-on-bar-green font-label text-label-lg flex items-center justify-center">
              Book a Test Ride
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">


          <div className="lg:col-span-7 rounded-xl bg-light-surface border border-light-outline-variant p-6 sm:p-8">
            <h1 className="font-display text-display-md-mobile lg:text-headline-lg text-light-on-surface">Contact BAR Green Energy</h1>
            <p className="font-body text-body-md text-light-on-surface-variant mt-2">
              Have a question about our scooters, dealerships, or fleet enquiries? Send us a message below.
            </p>


            <div id="contact-success" className={`${status === "success" ? "" : "hidden"} mt-6 rounded-lg bg-success-container border border-success p-4 text-on-success-container flex items-start gap-3`} role="status">
              <SymbolIcon name="check_circle" className="text-[22px]" />
              <div>
                <p className="font-label text-label-lg">Message received</p>
                <p className="font-body text-body-sm mt-0.5">{notificationNote}</p>
              </div>
            </div>

            <div id="contact-error" className={`${status === "error" ? "" : "hidden"} mt-6 rounded-lg bg-error-container border border-error p-4 text-on-error-container flex items-start gap-3`} role="alert">
              <SymbolIcon name="error" className="text-[22px]" />
              <div>
                <p className="font-label text-label-lg">Message not sent</p>
                <p className="font-body text-body-sm mt-0.5">{submitError}</p>
              </div>
            </div>

            <form id="contact-form" className="mt-6 flex flex-col gap-5" noValidate onSubmit={handleSubmit}>
              <div aria-hidden="true" className="absolute -left-[10000px] h-px w-px overflow-hidden"><label>Leave this field empty<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <label data-component-id="input-field-text" data-component-type="input-field" data-component-variant="text" className="flex flex-col gap-1.5">
                  <span data-design-text-token="label-lg" className="font-label text-label-lg text-light-on-surface">Full name *</span>
                  <input id="c-name" name="name" type="text" required placeholder="Your full name" className="w-full min-h-[44px] px-4 py-2.5 rounded-md border border-light-outline-variant bg-light-surface font-body text-body-md focus:border-bar-black focus:ring-2 focus:ring-bar-green" /></label>
                <label data-component-id="input-field-text" data-component-type="input-field" data-component-variant="text" className="flex flex-col gap-1.5">
                  <span data-design-text-token="label-lg" className="font-label text-label-lg text-light-on-surface">Phone number *</span>
                  <input id="c-phone" name="phone" type="tel" required inputMode="tel" placeholder="+91 98XXX XXXXX" className="w-full min-h-[44px] px-4 py-2.5 rounded-md border border-light-outline-variant bg-light-surface font-body text-body-md focus:border-bar-black focus:ring-2 focus:ring-bar-green" /></label>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <label data-component-id="input-field-text" data-component-type="input-field" data-component-variant="text" className="flex flex-col gap-1.5">
                  <span data-design-text-token="label-lg" className="font-label text-label-lg text-light-on-surface">Email address *</span>
                  <input id="c-email" name="email" type="email" required inputMode="email" placeholder="you@example.com" className="w-full min-h-[44px] px-4 py-2.5 rounded-md border border-light-outline-variant bg-light-surface font-body text-body-md focus:border-bar-black focus:ring-2 focus:ring-bar-green" /></label>
                <label className="flex flex-col gap-1.5">
                  <span className="font-label text-label-lg text-light-on-surface">Enquiry type</span>
                  <select name="enquiryType" defaultValue="General Contact Message" className="w-full min-h-[44px] px-4 py-2.5 rounded-md border border-light-outline-variant bg-light-surface font-body text-body-md focus:border-bar-black focus:ring-2 focus:ring-bar-green">
                    <option>General Contact Message</option>
                    <option>General Product Enquiry</option>
                    <option>Dealership / Partnership</option>
                    <option>Service &amp; Warranty Support</option>
                    <option>Fleet / Corporate Orders</option>
                  </select>
                </label>
              </div>

              <label className="flex flex-col gap-1.5">
                <span className="font-label text-label-lg text-light-on-surface">Related product</span>
                <PublicProductSelect />
              </label>

              <label className="flex flex-col gap-1.5">
                <span className="font-label text-label-lg text-light-on-surface">Message *</span>
                <textarea id="c-msg" name="message" rows={4} required placeholder="Tell us how we can help..." className="w-full px-4 py-3 rounded-md border border-light-outline-variant bg-light-surface font-body text-body-md focus:border-bar-black focus:ring-2 focus:ring-bar-green"></textarea>
              </label>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button type="submit" disabled={status === "submitting"} className="min-h-[48px] px-7 py-3 rounded-full bg-bar-green text-on-bar-green font-label text-label-lg hover:bg-accent-container transition-colors duration-state-change disabled:opacity-60">
                  {status === "submitting" ? "Sending…" : "Send Message"}
                </button>
              </div>
            </form>
          </div>


          <aside className="lg:col-span-5 flex flex-col gap-6">
            <div className="rounded-xl bg-light-surface-low border border-light-outline-variant p-6 flex flex-col gap-4">
              <h2 className="font-headline text-title-lg text-light-on-surface">Direct Contact</h2>
              <div className="flex items-start gap-3">
                <SymbolIcon name="call" className="text-[20px] text-success mt-0.5" />
                <div>
                  <p className="font-label text-label-sm text-light-on-surface-variant">Phone</p>
                  <p className="font-mono text-body-md text-light-on-surface">{siteSettings.contact_phone || "Contact details coming soon"}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <SymbolIcon name="mail" className="text-[20px] text-success mt-0.5" />
                <div>
                  <p className="font-label text-label-sm text-light-on-surface-variant">Email</p>
                  <p className="font-mono text-body-md text-light-on-surface">{siteSettings.public_email || "Email coming soon"}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <SymbolIcon name="schedule" className="text-[20px] text-success mt-0.5" />
                <div>
                  <p className="font-label text-label-sm text-light-on-surface-variant">Business Hours</p>
                  <p className="font-body text-body-md text-light-on-surface">{siteSettings.business_hours || "Business hours to be announced"}</p>
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-light-surface-low border border-light-outline-variant p-6 flex flex-col gap-3">
              <h2 className="font-headline text-title-lg text-light-on-surface">Showroom &amp; Office Locations</h2>
              <p className="font-body text-body-md text-light-on-surface-variant">
                {siteSettings.office_address || "Office address to be announced"}
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {siteSettings.instagram_url && <a href={siteSettings.instagram_url} target="_blank" rel="noreferrer" className="px-3 py-1 rounded-full bg-light-surface border border-light-outline-variant font-label text-label-sm">Instagram</a>}
                {siteSettings.linkedin_url && <a href={siteSettings.linkedin_url} target="_blank" rel="noreferrer" className="px-3 py-1 rounded-full bg-light-surface border border-light-outline-variant font-label text-label-sm">LinkedIn</a>}
                {siteSettings.youtube_url && <a href={siteSettings.youtube_url} target="_blank" rel="noreferrer" className="px-3 py-1 rounded-full bg-light-surface border border-light-outline-variant font-label text-label-sm">YouTube</a>}
              </div>
            </div>
          </aside>

        </div>
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
    </div>




  );
}
