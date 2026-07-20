import type { Metadata } from "next";
import DataEncrypted from "@/components/data-encrypted/DataEncrypted";

export const metadata: Metadata = {
  title: "Data Encrypted · Lab",
  description:
    "Glass encryption capsule — plain text becomes cipher through a laser beam. Maximum privacy.",
  robots: { index: false, follow: false },
};

export default function DataEncryptedPage() {
  return <DataEncrypted />;
}
