"use client";
import Link from "next/link";
import { SymbolIcon } from "@/components/ui/symbol-icon";

import Image from "next/image";
import { PublicContactDetails, FooterProductLinks } from "@/components/public/public-data";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";


  export default function AboutPage() {
    const [menuOpen, setMenuOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
      setMenuOpen(false);
    }, [pathname]);

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
              <Link href="/about" className="font-label text-label-lg text-light-on-surface border-b-2 border-bar-green py-1">About Us</Link>
              <Link href="/technology" className="font-label text-label-lg text-light-on-surface-variant hover:text-light-on-surface py-1">Technology</Link>
              <Link href="/sustainability" className="font-label text-label-lg text-light-on-surface-variant hover:text-light-on-surface py-1">Sustainability</Link>
              <Link href="/contact" className="font-label text-label-lg text-light-on-surface-variant hover:text-light-on-surface py-1">Contact</Link>
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
              <Link
                href="/"
                onClick={() => setMenuOpen(false)}
                className="min-h-[44px] px-4 py-2.5 rounded-md text-light-on-surface-variant font-label text-label-lg flex items-center"
              >
                Home
              </Link>

              <Link
                href="/products"
                onClick={() => setMenuOpen(false)}
                className="min-h-[44px] px-4 py-2.5 rounded-md text-light-on-surface-variant font-label text-label-lg flex items-center"
              >
                Products
              </Link>

              <Link
                href="/about"
                onClick={() => setMenuOpen(false)}
                className="min-h-[44px] px-4 py-2.5 rounded-md bg-accent-tint text-on-accent-container font-label text-label-lg flex items-center"
              >
                About Us
              </Link>

              <Link
                href="/technology"
                onClick={() => setMenuOpen(false)}
                className="min-h-[44px] px-4 py-2.5 rounded-md text-light-on-surface-variant font-label text-label-lg flex items-center"
              >
                Technology
              </Link>

              <Link
                href="/sustainability"
                onClick={() => setMenuOpen(false)}
                className="min-h-[44px] px-4 py-2.5 rounded-md text-light-on-surface-variant font-label text-label-lg flex items-center"
              >
                Sustainability
              </Link>

              <Link
                href="/contact"
                onClick={() => setMenuOpen(false)}
                className="min-h-[44px] px-4 py-2.5 rounded-md text-light-on-surface-variant font-label text-label-lg flex items-center"
              >
                Contact
              </Link>

              <Link
                href="/book-test-ride"
                onClick={() => setMenuOpen(false)}
                className="mt-2 min-h-[44px] px-5 py-3 rounded-full bg-bar-green text-on-bar-green font-label text-label-lg flex items-center justify-center"
              >
                Book a Test Ride
              </Link>
            </nav>
          </div>
        </header>

        <main className="flex-1">
          <section className="bg-light-surface-low border-b border-light-outline-variant py-14 lg:py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-6 flex flex-col gap-5">
                <span className="inline-flex items-center self-start px-3 py-1 rounded-full bg-light-surface border border-light-outline-variant font-label text-label-sm">BAR Green Energy Pvt. Ltd.</span>
                <h1 className="font-display text-display-md-mobile lg:text-display-md text-light-on-surface text-balance">Practical electric mobility, built for everyday riders</h1>
                <p className="font-body text-body-lg text-light-on-surface-variant max-w-prose">
                  BAR Electric Vehicles is focused on making electric two-wheeler ownership approachable, practical, and suited to everyday travel.
                </p>
              </div>
              <div className="lg:col-span-6">
                <Image src="https://lh3.googleusercontent.com/aida/ALJJyrCOyq4uyAAl5oojgKr7Tz97iRzMGP-ZT03gVrUuO9azAQxLfyWhk6n2elDBP7d9RketEUVSc_5l_VkBskGjYn9NIAYIezphMvfCi76B9_GPLP3TVMeJgoe1iY7P9GsrXyDsxgcztnFKSbMNya9WzLEcEuy6suJ3LHEc4Aml-w81OS2beW1LVFf2a6LzSNMfroieDPkBY27phRkYGzluK1fEMeavhfsv9dpWTvifxSjeTiViz52oXUHdVQ" alt="BAR Electric Vehicles electric scooter" width={1000} height={700} unoptimized className="w-full h-[320px] lg:h-[380px] object-cover rounded-xl border border-light-outline-variant" /></div>
            </div>
          </section>


          <section className="py-16 lg:py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="rounded-xl bg-light-surface-low border border-light-outline-variant p-6 flex flex-col gap-3">
                <h2 className="font-headline text-title-lg text-light-on-surface">Our Story</h2>
                <p className="font-body text-body-md text-light-on-surface-variant">Our story is driven by a simple idea: make it easier for more people to choose electric mobility for their daily journeys.</p>
              </div>
              <div className="rounded-xl bg-light-surface-low border border-light-outline-variant p-6 flex flex-col gap-3">
                <h2 className="font-headline text-title-lg text-light-on-surface">Our Mission</h2>
                <p className="font-body text-body-md text-light-on-surface-variant">Build for Brighter Tomorrow by delivering reliable, accessible electric scooters backed by attentive local service.</p>
              </div>
              <div className="rounded-xl bg-light-surface-low border border-light-outline-variant p-6 flex flex-col gap-3">
                <h2 className="font-headline text-title-lg text-light-on-surface">Core Values</h2>
                <p className="font-body text-body-md text-light-on-surface-variant">Honest engineering, rider safety, transparent ownership costs, and measurable environmental responsibility.</p>
              </div>
            </div>
          </section>


          <section className="py-14 bg-light-surface-low border-t border-light-outline-variant">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="font-headline text-headline-md text-light-on-surface mb-8">What guides us</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="rounded-xl bg-light-surface border border-light-outline-variant p-6">
                  <span className="font-mono text-label-lg text-success">Our focus</span>
                  <h3 className="font-title text-title-md text-light-on-surface mt-2">Useful by design</h3>
                  <p className="font-body text-body-sm text-light-on-surface-variant mt-1">Build vehicles around the needs of everyday riders.</p>
                </div>
                <div className="rounded-xl bg-light-surface border border-light-outline-variant p-6">
                  <span className="font-mono text-label-lg text-success">Our promise</span>
                  <h3 className="font-title text-title-md text-light-on-surface mt-2">Clear information</h3>
                  <p className="font-body text-body-sm text-light-on-surface-variant mt-1">Share product details to help riders make informed choices.</p>
                </div>
                <div className="rounded-xl bg-light-surface border border-light-outline-variant p-6">
                  <span className="font-mono text-label-lg text-success">Our approach</span>
                  <h3 className="font-title text-title-md text-light-on-surface mt-2">Start with riders</h3>
                  <p className="font-body text-body-sm text-light-on-surface-variant mt-1">Listen to how people travel and design around real routines.</p>
                </div>
                <div className="rounded-xl bg-light-surface border border-light-outline-variant p-6">
                  <span className="font-mono text-label-lg text-success">Our standard</span>
                  <h3 className="font-title text-title-md text-light-on-surface mt-2">Keep improving</h3>
                  <p className="font-body text-body-sm text-light-on-surface-variant mt-1">Make useful progress through thoughtful engineering and service.</p>
                </div>
              </div>
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
