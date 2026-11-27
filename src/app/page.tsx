"use client";
import Link from "next/link";
import { SymbolIcon } from "@/components/ui/symbol-icon";
import { ProductCards, PublicContactDetails, FooterProductLinks } from "@/components/public/public-data";
import { usePathname } from "next/navigation";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function HomePage() {
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
            <Image src="/images/brand/bar-logo.png" alt="BAR Electric Vehicles" width={842} height={282} priority className="h-16 w-[172px] sm:w-[215px] object-contain" />
          </Link>

          <nav aria-label="Primary" className="hidden lg:flex items-center gap-7">
            <Link href="/" className="font-label text-label-lg text-light-on-surface border-b-2 border-bar-green py-1">Home</Link>
            <Link href="/products" className="font-label text-label-lg text-light-on-surface-variant hover:text-light-on-surface py-1 transition-colors duration-state-change">Products</Link>
            <Link href="/about" className="font-label text-label-lg text-light-on-surface-variant hover:text-light-on-surface py-1 transition-colors duration-state-change">About Us</Link>
            <Link href="/technology" className="font-label text-label-lg text-light-on-surface-variant hover:text-light-on-surface py-1 transition-colors duration-state-change">Technology</Link>
            <Link href="/sustainability" className="font-label text-label-lg text-light-on-surface-variant hover:text-light-on-surface py-1 transition-colors duration-state-change">Sustainability</Link>
            <Link href="/contact" className="font-label text-label-lg text-light-on-surface-variant hover:text-light-on-surface py-1 transition-colors duration-state-change">Contact</Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/book-test-ride" data-component-id="button-primary" data-component-type="button" data-component-variant="primary" className="hidden sm:inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 rounded-full bg-bar-green text-on-bar-green font-label text-label-lg transition-colors duration-state-change hover:bg-accent-container focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bar-black focus-visible:ring-offset-2">
              <span data-design-text-token="label-lg">Book a Test Ride</span>
            </Link>
            <button
              type="button"
              id="mobile-menu-btn"
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen((open) => !open)}
              className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-full border border-light-outline-variant bg-light-surface text-light-on-surface hover:bg-light-surface-low focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bar-black"
            >
              <SymbolIcon name="menu" className="text-[22px]" />
            </button>
          </div>
        </div>


        <div id="mobile-menu" className={`${menuOpen ? "block" : "hidden"} lg:hidden border-t border-light-outline-variant bg-light-surface px-4 py-4`}>
          <nav aria-label="Mobile" className="flex flex-col gap-2">
            <Link href="/" className="min-h-[44px] px-4 py-2.5 rounded-md bg-accent-tint text-on-accent-container font-label text-label-lg flex items-center">Home</Link>
            <Link href="/products" className="min-h-[44px] px-4 py-2.5 rounded-md text-light-on-surface-variant hover:bg-light-surface-low font-label text-label-lg flex items-center">Products</Link>
            <Link href="/about" className="min-h-[44px] px-4 py-2.5 rounded-md text-light-on-surface-variant hover:bg-light-surface-low font-label text-label-lg flex items-center">About Us</Link>
            <Link href="/technology" className="min-h-[44px] px-4 py-2.5 rounded-md text-light-on-surface-variant hover:bg-light-surface-low font-label text-label-lg flex items-center">Technology</Link>
            <Link href="/sustainability" className="min-h-[44px] px-4 py-2.5 rounded-md text-light-on-surface-variant hover:bg-light-surface-low font-label text-label-lg flex items-center">Sustainability</Link>
            <Link href="/contact" className="min-h-[44px] px-4 py-2.5 rounded-md text-light-on-surface-variant hover:bg-light-surface-low font-label text-label-lg flex items-center">Contact</Link>
            <Link href="/book-test-ride" className="mt-2 min-h-[44px] px-5 py-3 rounded-full bg-bar-green text-on-bar-green font-label text-label-lg flex items-center justify-center">Book a Test Ride</Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">

        <section className="bg-light-surface-low border-b border-light-outline-variant">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-5 flex flex-col gap-6">
              <span className="inline-flex items-center gap-2 self-start px-3.5 py-1.5 rounded-full bg-light-surface border border-light-outline-variant font-label text-label-sm text-light-on-surface">
                <span className="w-2 h-2 rounded-full bg-bar-green"></span>
                BAR Green Energy Pvt. Ltd.
              </span>
              <h1 className="font-display text-display-lg-mobile lg:text-display-lg text-light-on-surface text-balance">
                Drive a Brighter Tomorrow
              </h1>
              <p className="font-body text-body-lg text-light-on-surface-variant max-w-prose text-pretty">
                Practical, confident electric scooters engineered for clean urban commutes. Built around quiet efficiency, approachable ergonomics, and everyday reliability.
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link href="/products" data-component-id="button-secondary" data-component-type="button" data-component-variant="secondary" className="inline-flex items-center justify-center gap-2 min-h-[44px] px-6 py-3 rounded-full bg-light-primary text-light-on-primary font-label text-label-lg transition-colors duration-state-change hover:bg-dark-gray focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bar-green focus-visible:ring-offset-2">
                  <span data-design-text-token="label-lg">Explore Our Scooters</span>
                </Link>
                <Link href="/book-test-ride" data-component-id="button-primary" data-component-type="button" data-component-variant="primary" className="inline-flex items-center justify-center gap-2 min-h-[44px] px-6 py-3 rounded-full bg-bar-green text-on-bar-green font-label text-label-lg transition-colors duration-state-change hover:bg-accent-container focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bar-black focus-visible:ring-offset-2">
                  <span data-design-text-token="label-lg">Book a Test Ride</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="rounded-xl overflow-hidden border border-light-outline-variant bg-light-surface">
                <Image src="https://lh3.googleusercontent.com/aida/ALJJyrCUKj4KhgsdJsulNbRndudpMJ_utopEeRKL_B6eTaSDqfCG5u69wIOhNbvuDOa1svp-5DxxSqr7tCQ-Zg6l6HdCuJP_vsnpOMVfnOiI1jyEhWlRCHTUAk4cfwjMekyBO53wmBFtGIqqaRQM_IISghH2t5kcS83M7nlI8JjmTEbzBMA7l2WLLrgnSgejYEUOhEsbbvJ60nHbi5qREDlqXUE1rFwxFzTChjhXUA00udZoWi5sRcKIaQ" alt="BAR electric scooter in matte black and electric green" width={1280} height={720} priority unoptimized className="w-full h-[320px] sm:h-[420px] lg:h-[480px] object-cover" /></div>
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-24 bg-light-surface">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
              <div>
                <h2 className="font-headline text-headline-lg-mobile lg:text-headline-lg text-light-on-surface">Featured Electric Scooters</h2>
                <p className="font-body text-body-md text-light-on-surface-variant mt-2 max-w-prose">
                  Four distinct models tailored for city errands, spirited commutes, utility loads, and agile daily travel.
                </p>
              </div>
              <Link href="/products" className="inline-flex items-center gap-2 font-label text-label-lg text-light-on-surface hover:text-success transition-colors duration-state-change">
                <span>View full catalogue</span>
                <SymbolIcon name="arrow_forward" className="text-[20px]" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
              <ProductCards compact />
            </div>

          </div>
        </section>


        <section className="py-16 lg:py-24 bg-light-surface-low border-y border-light-outline-variant">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mb-12">
              <h2 className="font-headline text-headline-lg-mobile lg:text-headline-lg text-light-on-surface">Why BAR Electric Vehicles</h2>
              <p className="font-body text-body-md text-light-on-surface-variant mt-3">
                Designed around practical ownership, transparent specifications, and dependable service support.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="rounded-xl bg-light-surface border border-light-outline-variant p-6 flex flex-col gap-3">
                <span className="w-11 h-11 rounded-lg bg-accent-tint border border-accent-container flex items-center justify-center text-on-accent-container">
                  <SymbolIcon name="battery_charging_full" className="text-[22px]" />
                </span>
                <h3 className="font-title text-title-lg text-light-on-surface">Convenient Charging</h3>
                <p className="font-body text-body-md text-light-on-surface-variant">Plug into standard domestic sockets or swap modules at home without specialized hardware.</p>
              </div>

              <div className="rounded-xl bg-light-surface border border-light-outline-variant p-6 flex flex-col gap-3">
                <span className="w-11 h-11 rounded-lg bg-accent-tint border border-accent-container flex items-center justify-center text-on-accent-container">
                  <SymbolIcon name="build_circle" className="text-[22px]" />
                </span>
                <h3 className="font-title text-title-lg text-light-on-surface">Low Maintenance</h3>
                <p className="font-body text-body-md text-light-on-surface-variant">Fewer moving drivetrain parts mean quieter rides and predictable service intervals.</p>
              </div>

              <div className="rounded-xl bg-light-surface border border-light-outline-variant p-6 flex flex-col gap-3">
                <span className="w-11 h-11 rounded-lg bg-accent-tint border border-accent-container flex items-center justify-center text-on-accent-container">
                  <SymbolIcon name="verified_user" className="text-[22px]" />
                </span>
                <h3 className="font-title text-title-lg text-light-on-surface">Safety First</h3>
                <p className="font-body text-body-md text-light-on-surface-variant">Balanced weight distribution, responsive braking, and high-visibility LED lighting.</p>
              </div>

              <div className="rounded-xl bg-light-surface border border-light-outline-variant p-6 flex flex-col gap-3">
                <span className="w-11 h-11 rounded-lg bg-accent-tint border border-accent-container flex items-center justify-center text-on-accent-container">
                  <SymbolIcon name="eco" className="text-[22px]" />
                </span>
                <h3 className="font-title text-title-lg text-light-on-surface">Zero Tailpipe Emissions</h3>
                <p className="font-body text-body-md text-light-on-surface-variant">Cleaner daily commutes that reduce local noise and urban air pollution.</p>
              </div>
            </div>
          </div>
        </section>


        <section className="py-16 lg:py-24 bg-dark-surface text-dark-on-surface">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 flex flex-col gap-5">
              <span className="inline-flex items-center gap-2 self-start px-3 py-1 rounded-full bg-dark-surface-high border border-dark-outline-variant font-label text-label-sm text-bar-green">
                Sustainability Commitment
              </span>
              <h2 className="font-headline text-headline-lg-mobile lg:text-headline-lg text-dark-on-surface text-balance">
                Build for Brighter Tomorrow.
              </h2>
              <p className="font-body text-body-lg text-dark-on-surface-variant max-w-prose">
                We are building a practical electric mobility range for everyday journeys. Explore our scooters and learn more about the choices behind cleaner travel.
              </p>
              <div>
                <Link href="/sustainability" className="inline-flex items-center gap-2 font-label text-label-lg text-bar-green hover:underline">
                  <span>Read our sustainability approach</span>
                  <SymbolIcon name="arrow_forward" className="text-[20px]" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-xl bg-dark-surface-container border border-dark-outline-variant p-6 flex flex-col gap-2">
                <span className="font-mono text-headline-lg text-bar-green tabular-nums">Electric</span>
                <span className="font-title text-title-md text-dark-on-surface">No tailpipe emissions</span>
                <span className="font-body text-body-sm text-dark-on-surface-variant">Electric travel for everyday journeys</span>
              </div>
              <div className="rounded-xl bg-dark-surface-container border border-dark-outline-variant p-6 flex flex-col gap-2">
                <span className="font-mono text-headline-lg text-bar-green tabular-nums">Designed</span>
                <span className="font-title text-title-md text-dark-on-surface">For daily commutes</span>
                <span className="font-body text-body-sm text-dark-on-surface-variant">Practical mobility, made electric</span>
              </div>
              <div className="rounded-xl bg-dark-surface-container border border-dark-outline-variant p-6 flex flex-col gap-2">
                <span className="font-mono text-headline-lg text-bar-green tabular-nums">Thoughtful</span>
                <span className="font-title text-title-md text-dark-on-surface">Ownership experience</span>
                <span className="font-body text-body-sm text-dark-on-surface-variant">Learn about our sustainability approach</span>
              </div>
              <div className="rounded-xl bg-dark-surface-container border border-dark-outline-variant p-6 flex flex-col gap-2">
                <span className="font-mono text-headline-lg text-bar-green tabular-nums">Local</span>
                <span className="font-title text-title-md text-dark-on-surface">Service support</span>
                <span className="font-body text-body-sm text-dark-on-surface-variant">Contact our team for current service information</span>
              </div>
            </div>
          </div>
        </section>


        <section className="py-16 lg:py-20 bg-light-surface">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-xl bg-light-surface-low border border-light-outline-variant p-8 sm:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <div className="max-w-xl flex flex-col gap-3">
                <h2 className="font-headline text-headline-lg-mobile lg:text-headline-lg text-light-on-surface">Experience BAR on the road</h2>
                <p className="font-body text-body-md text-light-on-surface-variant">
                  Request a preferred date, time, and city showroom to test ride Scotty, VOLT-X, STARK, or FLINK in person.
                </p>
              </div>
              <Link href="/book-test-ride" className="inline-flex items-center justify-center gap-2 min-h-[48px] px-7 py-3.5 rounded-full bg-bar-green text-on-bar-green font-label text-label-lg hover:bg-accent-container transition-colors duration-state-change shrink-0">
                <span>Book a Test Ride</span>
                <SymbolIcon name="arrow_forward" className="text-[20px]" />
              </Link>
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
            <p className="font-body text-body-sm text-dark-on-surface-variant">
              Discover the BAR range, find a showroom, or request a test ride.
            </p>
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
