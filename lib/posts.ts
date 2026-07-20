import raw from "./blog-posts.generated.json";

export type BlogBlock =
  | { type: "h2"; text: string }
  | { type: "p"; html: string }
  | { type: "ul"; items: string[] };

export type ArcTakeaway = {
  id: string;
  label: string;
  body: string;
};

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readMins: number;
  author: string;
  role: string;
  body: BlogBlock[];
  highlights: string[];
  arc: ArcTakeaway[] | null;
  /** Legacy shape for any old callers */
  // body legacy was {h?, p}[] — use BlogBlock now
};

export const posts = raw as Post[];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
