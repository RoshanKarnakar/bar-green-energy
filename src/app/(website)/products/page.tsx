"use client";
import Link from "next/link";
import { SymbolIcon } from "@/components/ui/symbol-icon";
import { ProductCards, PublicContactDetails, FooterProductLinks } from "@/components/public/public-data";

import Image from "next/image";
import { useState } from "react";

export default function ProductsPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (

    <div className="min-h-screen flex flex-col" data-stitch-vh="min-h-screen===min-h-screen">


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

        <div
          id="mobile-menu"
          className={`${menuOpen ? "block" : "hidden"} lg:hidden border-t border-light-outline-variant bg-light-surface px-4 py-4`}
        >
          <nav aria-label="Mobile" className="flex flex-col gap-2">
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className="min-h-[44px] px-4 py-2.5 rounded-md text-light-on-surface-variant hover:bg-light-surface-low font-label text-label-lg flex items-center"
            >
              Home
            </Link>

            <Link
              href="/products"
              onClick={() => setMenuOpen(false)}
              className="min-h-[44px] px-4 py-2.5 rounded-md bg-accent-tint text-on-accent-container font-label text-label-lg flex items-center"
            >
              Products
            </Link>

            <Link
              href="/about"
              onClick={() => setMenuOpen(false)}
              className="min-h-[44px] px-4 py-2.5 rounded-md text-light-on-surface-variant hover:bg-light-surface-low font-label text-label-lg flex items-center"
            >
              About Us
            </Link>

            <Link
              href="/technology"
              onClick={() => setMenuOpen(false)}
              className="min-h-[44px] px-4 py-2.5 rounded-md text-light-on-surface-variant hover:bg-light-surface-low font-label text-label-lg flex items-center"
            >
              Technology
            </Link>

            <Link
              href="/sustainability"
              onClick={() => setMenuOpen(false)}
              className="min-h-[44px] px-4 py-2.5 rounded-md text-light-on-surface-variant hover:bg-light-surface-low font-label text-label-lg flex items-center"
            >
              Sustainability
            </Link>

            <Link
              href="/contact"
              onClick={() => setMenuOpen(false)}
              className="min-h-[44px] px-4 py-2.5 rounded-md text-light-on-surface-variant hover:bg-light-surface-low font-label text-label-lg flex items-center"
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

        <section className="bg-light-surface-low border-b border-light-outline-variant py-12 lg:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="font-display text-display-md-mobile lg:text-display-md text-light-on-surface">Electric Scooter Catalogue</h1>
              <p className="font-body text-body-lg text-light-on-surface-variant mt-2 max-w-2xl">
                Explore the published BAR electric scooter range and compare confirmed specifications for each model.
              </p>
            </div>


          </div>
        </section>





        <section className="py-12 lg:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">


            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch"><ProductCards /></div>











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
