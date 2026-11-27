import Link from "next/link";
import { Suspense, type ReactNode } from "react";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

function AdminSetupRequired() {
  return (
    <main className="min-h-screen grid place-items-center bg-light-surface-low p-6">
      <section className="max-w-xl rounded-xl border border-light-outline-variant bg-light-surface p-8">
        <h1 className="font-headline text-headline-md text-light-on-surface">Admin sign-in setup required</h1>
        <p className="mt-3 font-body text-body-md text-light-on-surface-variant">
          Configure the Supabase project and authorized admin email in your local environment before opening the dashboard.
        </p>
        <Link href="/admin/login" className="mt-5 inline-flex rounded-full bg-bar-green px-5 py-3 font-label text-label-lg text-on-bar-green">Go to admin sign-in</Link>
      </section>
    </main>
  );
}

async function RequireAdmin({ children }: { children: ReactNode }) {
  await connection();
  const allowedEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const supabase = await createSupabaseServerClient();
  if (!allowedEmail || !supabase) return <AdminSetupRequired />;

  const { data: { user } } = await supabase.auth.getUser();
  if (!user || user.email?.trim().toLowerCase() !== allowedEmail) {
    redirect("/admin/login");
  }

  return children;
}

export default function AdminDashboardLayout({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={<main className="min-h-screen grid place-items-center bg-light-surface-low">Checking admin access…</main>}>
      <RequireAdmin>{children}</RequireAdmin>
    </Suspense>
  );
}
