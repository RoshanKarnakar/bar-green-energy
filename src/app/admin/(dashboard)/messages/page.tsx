import type { Metadata } from "next";
import SubmissionsPage from "@/components/admin/submissions-page";

export const metadata: Metadata = { title: "Contact Messages | BAR Admin" };
export default function ContactMessagesPage() {
  return <SubmissionsPage kind="contact" />;
}
