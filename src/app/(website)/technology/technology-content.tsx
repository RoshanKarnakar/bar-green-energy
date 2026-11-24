"use client";
import Link from "next/link";
import { SymbolIcon } from "@/components/ui/symbol-icon";

import Image from "next/image";
import { PublicContactDetails, FooterProductLinks } from "@/components/public/public-data";
import { useEffect } from "react";

export default function TechnologyPageContent() {
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
          <Link href="/technology" className="font-label text-label-lg text-light-on-surface border-b-2 border-bar-green py-1">Technology</Link>
          <Link href="/sustainability" className="font-label text-label-lg text-light-on-surface-variant hover:text-light-on-surface py-1">Sustainability</Link>
          <Link href="/contact" className="font-label text-label-lg text-light-on-surface-variant hover:text-light-on-surface py-1">Contact</Link>
        </nav>
        <div className="flex items-center gap-3">
          <Link href="/book-test-ride" className="hidden sm:inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 rounded-full bg-bar-green text-on-bar-green font-label text-label-lg hover:bg-accent-container">Book a Test Ride</Link>
          <button type="button" id="mobile-menu-btn" aria-label="Toggle navigation menu" aria-expanded="false" className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-full border border-light-outline-variant bg-light-surface text-light-on-surface"><SymbolIcon name="menu" className="text-[22px]" /></button>
        </div>
      </div>
      <div id="mobile-menu" className="hidden lg:hidden border-t border-light-outline-variant bg-light-surface px-4 py-4">
        <nav aria-label="Mobile" className="flex flex-col gap-2">
          <Link href="/" className="min-h-[44px] px-4 py-2.5 rounded-md text-light-on-surface-variant font-label text-label-lg flex items-center">Home</Link>
          <Link href="/products" className="min-h-[44px] px-4 py-2.5 rounded-md text-light-on-surface-variant font-label text-label-lg flex items-center">Products</Link>
          <Link href="/about" className="min-h-[44px] px-4 py-2.5 rounded-md text-light-on-surface-variant font-label text-label-lg flex items-center">About Us</Link>
          <Link href="/technology" className="min-h-[44px] px-4 py-2.5 rounded-md bg-accent-tint text-on-accent-container font-label text-label-lg flex items-center">Technology</Link>
          <Link href="/sustainability" className="min-h-[44px] px-4 py-2.5 rounded-md text-light-on-surface-variant font-label text-label-lg flex items-center">Sustainability</Link>
          <Link href="/contact" className="min-h-[44px] px-4 py-2.5 rounded-md text-light-on-surface-variant font-label text-label-lg flex items-center">Contact</Link>
          <Link href="/book-test-ride" className="mt-2 min-h-[44px] px-5 py-3 rounded-full bg-bar-green text-on-bar-green font-label text-label-lg flex items-center justify-center">Book a Test Ride</Link>
        </nav>
      </div>
    </header>

    <main className="flex-1">
      <section className="bg-dark-surface text-dark-on-surface py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 flex flex-col gap-5">
            <span className="inline-flex items-center self-start px-3 py-1 rounded-full bg-dark-surface-high border border-dark-outline-variant font-label text-label-sm text-bar-green">EV Engineering</span>
            <h1 className="font-display text-display-md-mobile lg:text-display-md text-dark-on-surface text-balance">Engineered for dependable daily range</h1>
            <p className="font-body text-body-lg text-dark-on-surface-variant max-w-prose">
              Learn how battery, motor, charging, safety, and rider features shape each BAR electric scooter. Model-specific specifications are listed with the published product.
            </p>
          </div>
          <div className="lg:col-span-6">
            <Image src="https://lh3.googleusercontent.com/aida/ALJJyrDw6IA3uTdpWz0jZuaMMz0no7cbJgHHB6MAkY2cADPRFoP4EgtB17gz0mXM7aTzUpczxPrDrYZrzSFUGiVqFcqiKNv7Rs6rdp2v1r8MvT2TA_1kN4EXBNGMnrCuvQEbPgkGAxZfL8SBsK-cV-zq-ldKMXZcgAocbqlRZu2B9eck2nlppICZ3ZqiI7mCDteSnkgcWKwTJAuoiuy01U6oeCFeFsXConp3wije1UostlQXqqh0wBib" alt="Modular lithium-ion electric scooter battery pack" width={1000} height={700} unoptimized className="w-full h-[300px] lg:h-[360px] object-cover rounded-xl border border-dark-outline-variant" /></div>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <article className="rounded-xl bg-light-surface-low border border-light-outline-variant p-6 flex flex-col gap-3">
            <SymbolIcon name="battery_full" className="text-[28px] text-success" />
            <h2 className="font-headline text-title-lg text-light-on-surface">Battery Architecture</h2>
            <p className="font-body text-body-md text-light-on-surface-variant">Battery capacity and protection details depend on the model. See each published product listing for confirmed specifications.</p>
          </article>

          <article className="rounded-xl bg-light-surface-low border border-light-outline-variant p-6 flex flex-col gap-3">
            <SymbolIcon name="speed" className="text-[28px] text-success" />
            <h2 className="font-headline text-title-lg text-light-on-surface">Electric Motor</h2>
            <p className="font-body text-body-md text-light-on-surface-variant">Motor output and performance specifications are shown on each published model when confirmed.</p>
          </article>

          <article className="rounded-xl bg-light-surface-low border border-light-outline-variant p-6 flex flex-col gap-3">
            <SymbolIcon name="ev_station" className="text-[28px] text-success" />
            <h2 className="font-headline text-title-lg text-light-on-surface">Home &amp; Fast Charging</h2>
            <p className="font-body text-body-md text-light-on-surface-variant">Charging requirements and estimated times vary by vehicle and charger. Contact our team for model-specific guidance.</p>
          </article>

          <article className="rounded-xl bg-light-surface-low border border-light-outline-variant p-6 flex flex-col gap-3">
            <SymbolIcon name="shield" className="text-[28px] text-success" />
            <h2 className="font-headline text-title-lg text-light-on-surface">Rider Safety Systems</h2>
            <p className="font-body text-body-md text-light-on-surface-variant">Safety equipment and chassis details vary by model. Refer to the confirmed product specifications before purchase.</p>
          </article>

          <article className="rounded-xl bg-light-surface-low border border-light-outline-variant p-6 flex flex-col gap-3 md:col-span-2">
            <SymbolIcon name="smartphone" className="text-[28px] text-success" />
            <h2 className="font-headline text-title-lg text-light-on-surface">Connected Features</h2>
            <p className="font-body text-body-md text-light-on-surface-variant">Connected and display features vary by model. Ask our team which features are available on the scooter you are considering.</p>
          </article>
        </div>
      </section>
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
