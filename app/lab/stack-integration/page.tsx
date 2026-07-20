import type { Metadata } from "next";
import StackIntegration from "@/components/stack-integration/StackIntegration";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Stack Integration · Lab",
  description:
    "Seamless Integration with Your Existing Stack — Speaksy hub + CRM/CDP/dialer panels.",
  robots: { index: false, follow: false },
};

export default function StackIntegrationPage() {
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
      <StackIntegration />
    </div>
  );
}
