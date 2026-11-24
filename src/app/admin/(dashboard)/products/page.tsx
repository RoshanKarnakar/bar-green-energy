import type { Metadata } from "next";
import ProductsContent from "./products-content";

export const metadata: Metadata = { title: "Products | BAR Admin", description: "Manage BAR scooter products." };

export default function AdminProductsPage() {
  return <ProductsContent />;
}
