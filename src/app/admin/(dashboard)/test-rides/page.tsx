import type { Metadata } from "next";
import SubmissionsPage from "@/components/admin/submissions-page";

export const metadata: Metadata = { title: "Test Rides | BAR Admin" };
export default function TestRidesPage() {
  return <SubmissionsPage kind="test_ride" />;
}
