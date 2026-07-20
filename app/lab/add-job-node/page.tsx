import type { Metadata } from "next";
import AddJobNode from "@/components/add-job-node/AddJobNode";

export const metadata: Metadata = {
  title: "Add Job Node · Lab",
  description:
    "Pipeline node that expands into an Add job action grid — from the reference screen recording.",
  robots: { index: false, follow: false },
};

export default function AddJobNodePage() {
  return <AddJobNode />;
}
