import type { Metadata } from "next";
import { Suspense } from "react";
import { connection } from "next/server";
import ProductDetail from "@/components/public/product-detail";

export const metadata: Metadata = {
  title: "Electric Scooter Details | BAR Electric Vehicles",
  description: "Explore BAR electric scooter colors, specifications, gallery, and test-ride information.",
};

type ProductPageProps = { params: Promise<{ slug: string }> };

async function ProductPageContent({ params }: ProductPageProps) {
  await connection();
  const { slug } = await params;
  return <ProductDetail slug={slug} />;
}

export default function ProductPage({ params }: ProductPageProps) {
  return (
    <Suspense fallback={<main className="min-h-screen grid place-items-center bg-light-surface-low text-light-on-surface">Loading scooter details…</main>}>
      <ProductPageContent params={params} />
    </Suspense>
  );
}
