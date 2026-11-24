import type { Metadata } from "next";
import AboutPageContent from "./about-content";

export const metadata: Metadata = {
  title: "About BAR Green Energy | Electric Vehicles",
  description: "Learn about BAR Green Energy and its vision for practical electric mobility.",
};

export default function AboutPage() {
  return <AboutPageContent />;
}
