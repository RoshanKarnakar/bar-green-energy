import type { Metadata } from "next";
import SubmissionsPage from "@/components/admin/submissions-page";

export const metadata: Metadata = { title: "Enquiries | BAR Admin" };
export default function EnquiriesPage() {
  return <SubmissionsPage kind="enquiry" />;
}
