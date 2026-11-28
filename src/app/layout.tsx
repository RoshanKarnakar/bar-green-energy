import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BAR Electric Vehicles — Drive a Brighter Tomorrow",
  description: "Explore BAR electric scooters and discover practical electric mobility for everyday journeys.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  );
}
