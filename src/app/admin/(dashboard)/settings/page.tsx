import type { Metadata } from "next";
import SettingsContent from "./settings-content";

export const metadata: Metadata = {
  title: "Settings | BAR Admin",
  description: "Manage BAR Green Energy company and notification settings.",
};

export default function AdminSettingsPage() {
  return <SettingsContent />;
}
