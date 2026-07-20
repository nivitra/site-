import type { Metadata } from "next";
import IntegrationHub from "@/components/integration-hub/IntegrationHub";

export const metadata: Metadata = {
  title: "Integration Hub · Lab",
  description:
    "Hub-and-spoke integrations diagram with Speaksy logo in the center.",
  robots: { index: false, follow: false },
};

export default function IntegrationHubPage() {
  return (
    <div className="fixed inset-0 z-[80] overflow-y-auto bg-white">
      <IntegrationHub />
    </div>
  );
}
