import type { Metadata } from "next";
import TechnologyPageContent from "./technology-content";

export const metadata: Metadata = {
  title: "Technology | BAR Electric Vehicles",
  description: "Explore the technology behind BAR electric vehicles, including battery, motor, charging, and safety features.",
};

export default function TechnologyPage() {
  return <TechnologyPageContent />;
}
