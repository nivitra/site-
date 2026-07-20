import type { Metadata } from "next";
import CompareMatrix from "@/components/compare-matrix/CompareMatrix";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Compare Matrix · Lab",
  description:
    "Capabilities comparison table — Speaksy vs typical voice AI vendor (Speaksy theme).",
  robots: { index: false, follow: false },
};

export default function CompareMatrixPage() {
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
      <CompareMatrix />
    </div>
  );
}
