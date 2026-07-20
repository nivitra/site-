import type { Metadata } from "next";
import StackArticleCards from "@/components/stack-article-cards/StackArticleCards";

export const metadata: Metadata = {
  title: "Stack Article Cards · Lab",
  description:
    "Bottom-right stacked article cards that expand on hover with orange active state.",
  robots: { index: false, follow: false },
};

export default function StackArticlesPage() {
  return <StackArticleCards />;
}
