import type { Metadata } from "next";
import SustainabilityPageContent from "./sustainability-content";

export const metadata: Metadata = {
  title: "Sustainability | BAR Electric Vehicles",
  description: "Learn about BAR Green Energy’s sustainability goals and approach to electric mobility.",
};

export default function SustainabilityPage() {
  return <SustainabilityPageContent />;
}
