import type { Metadata } from "next";
import AdminLoginContent from "./login-content";

export const metadata: Metadata = {
  title: "Admin Sign-In | BAR Electric Vehicles",
  description: "Authorized BAR Green Energy staff sign-in.",
};

export default function AdminLoginPage() {
  return <AdminLoginContent />;
}
