import type { Metadata } from "next";
import ContactPageContent from "./contact-content";

export const metadata: Metadata = {
  title: "Contact BAR Green Energy | Electric Vehicles",
  description: "Contact BAR Green Energy for scooter, dealership, and fleet enquiries.",
};

export default function ContactPage() {
  return <ContactPageContent />;
}
