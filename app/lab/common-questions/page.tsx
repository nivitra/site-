import type { Metadata } from "next";
import CommonQuestions from "@/components/common-questions/CommonQuestions";

export const metadata: Metadata = {
  title: "Common Questions · Lab",
  description:
    "FAQ carousel with faded neighbors, IN/OUT answer card, and mono UI — exact from recording.",
  robots: { index: false, follow: false },
};

export default function CommonQuestionsPage() {
  return <CommonQuestions />;
}
