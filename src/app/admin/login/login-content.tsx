"use client";
import Link from "next/link";
import { SymbolIcon } from "@/components/ui/symbol-icon";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { useState, type FormEvent } from "react";

export default function AdminLoginContent() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState<"idle" | "invalid" | "unavailable" | "config">("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("idle");
    const values = new FormData(event.currentTarget);
    const email = String(values.get("email") ?? "").trim();
    const password = String(values.get("password") ?? "");
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!validEmail || password.length < 8) {
      setStatus("invalid");
      return;
    }

    const supabase = createSupabaseBrowserClient();
    if (!supabase) {
      setStatus("config");
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setStatus("invalid");
      return;
    }

    router.replace("/admin");
    router.refresh();
  }

  return (

  <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12" data-stitch-vh="min-h-screen===min-h-screen">
    <div className="w-full max-w-md rounded-xl bg-light-surface border border-light-outline-variant p-8 flex flex-col gap-6">
      <div className="flex flex-col items-start gap-3">
        <Image src="/images/brand/bar-logo.png" alt="BAR Electric Vehicles" width={842} height={282} priority unoptimized className="h-14 w-[150px] object-contain" />
        <div>
          <h1 className="font-headline text-title-lg text-light-on-surface leading-none">BAR Staff Portal</h1>
          <p className="font-label text-label-sm text-light-on-surface-variant mt-1">BAR Green Energy Pvt. Ltd.</p>
        </div>
      </div>

      <div>
        <h2 className="font-headline text-headline-md text-light-on-surface">Sign in to Admin</h2>
        <p className="font-body text-body-sm text-light-on-surface-variant mt-1">
          Authorized staff access for product management and customer submissions. Sign in with your authorized staff account. Access is verified by Supabase.
        </p>
      </div>

      <div id="auth-error" className={`${status === "idle" ? "hidden" : ""} rounded-lg bg-error-container border border-error p-3.5 text-on-error-container flex items-start gap-2.5`} role="alert">
        <SymbolIcon name="error" className="text-[20px]" />
        <span className="font-body text-body-sm">{status === "invalid" ? "Email or password is incorrect, or this account is not enabled." : status === "config" ? "Supabase is not configured yet. Add its URL and publishable key to .env.local." : status === "unavailable" ? "Password recovery is not configured yet." : ""}</span>
      </div>

      <form id="signin-form" className="flex flex-col gap-4" noValidate onSubmit={handleSubmit}>
        <label className="flex flex-col gap-1.5">
          <span className="font-label text-label-lg text-light-on-surface">Staff email</span>
          <input id="a-email" name="email" type="email" required inputMode="email" placeholder="bar@bargreenenergy.com" className="w-full min-h-[44px] px-4 py-2.5 rounded-md border border-light-outline-variant bg-light-surface font-body text-body-md focus:border-bar-black focus:ring-2 focus:ring-bar-green" /></label>

        <label className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <span className="font-label text-label-lg text-light-on-surface">Password</span>
            <button type="button" onClick={() => setStatus("unavailable")} className="font-label text-label-sm text-light-on-surface-variant hover:text-light-on-surface underline">Forgot password?</button>
          </div>
          <div className="relative flex items-center">
            <input id="a-pass" name="password" type={showPassword ? "text" : "password"} required placeholder="••••••••" className="w-full min-h-[44px] pl-4 pr-12 py-2.5 rounded-md border border-light-outline-variant bg-light-surface font-body text-body-md focus:border-bar-black focus:ring-2 focus:ring-bar-green" /><button type="button" id="toggle-pass" aria-label={showPassword ? "Hide password" : "Show password"} onClick={() => setShowPassword((shown) => !shown)} className="absolute right-2 w-9 h-9 inline-flex items-center justify-center rounded-full text-light-on-surface-variant hover:bg-light-surface-low">
              <SymbolIcon name={showPassword ? "visibility_off" : "visibility"} className="text-[20px]" />
            </button>
          </div>
        </label>

        <button type="submit" className="mt-2 min-h-[48px] w-full px-6 py-3 rounded-full bg-bar-green text-on-bar-green font-label text-label-lg hover:bg-accent-container transition-colors duration-state-change">
          Sign In to Dashboard
        </button>
      </form>

      <div className="pt-4 border-t border-light-outline-variant flex items-center justify-between font-body text-body-sm text-light-on-surface-variant">
        <Link href="/" className="inline-flex items-center gap-1 hover:text-light-on-surface">
          <SymbolIcon name="arrow_back" className="text-[18px]" />
          <span>Back to public site</span>
        </Link>
        <button type="button" id="sim-auth-err" onClick={() => setStatus("invalid")} className="underline hover:text-light-on-surface">Preview error</button>
      </div>
    </div>
  </div>

  



  );
}
