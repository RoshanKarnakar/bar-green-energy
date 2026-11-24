import type { Metadata } from "next";
import TestRidePageContent from "./test-ride-content";

export const metadata: Metadata = {
  title: "Book a Test Ride | BAR Electric Vehicles",
  description: "Request a preferred time and location to test ride a BAR electric scooter.",
};

export default function TestRidePage() {
  return <TestRidePageContent />;
}
