import type { Metadata } from "next";
import ProductBento from "@/components/product-bento/ProductBento";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Product Bento · Lab",
  description:
    "Platform capabilities bento board — Speaksy green theme, exact layout.",
  robots: { index: false, follow: false },
};

export default function ProductBentoPage() {
  return (
    <div className="fixed inset-0 z-[80] overflow-y-auto bg-background">
      <div className="px-5 pt-5">
        <Link
          href="/lab"
          className="text-xs text-muted-2 transition-colors hover:text-muted"
        >
          ← Lab
        </Link>
      </div>
      <ProductBento />
    </div>
  );
}
