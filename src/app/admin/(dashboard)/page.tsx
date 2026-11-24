import type { Metadata } from "next";
import AdminDashboardContent from "./dashboard-content";

export const metadata: Metadata = {
  title: "Admin Dashboard | BAR Electric Vehicles",
  description: "BAR Green Energy staff dashboard for products and customer requests.",
};

export default function AdminDashboardPage() {
  return <AdminDashboardContent />;
}
