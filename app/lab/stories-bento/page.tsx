import type { Metadata } from "next";
import StoriesBento from "@/components/stories-bento/StoriesBento";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Stories Bento · Lab",
  description:
    "Customer stories bento grid — metrics, video, and quote cards (Speaksy theme).",
  robots: { index: false, follow: false },
};

export default function StoriesBentoPage() {
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
      <StoriesBento />
    </div>
  );
}
