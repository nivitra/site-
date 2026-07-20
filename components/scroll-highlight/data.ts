/** Highlight colors — recording + Speaksy brand green. */
export const HL = {
  blue: "#1570c9",
  yellow: "#e8b008",
  purple: "#5c00c8",
  green: "#16a34a",
} as const;

export type HighlightColor = keyof typeof HL;

export type TextPart =
  | { type: "text"; value: string }
  | { type: "mark"; value: string; color: HighlightColor };

export type ContentBlock =
  | { type: "hero"; title: string; subtitle?: string }
  | { type: "heading"; value: string }
  | { type: "paragraph"; parts: TextPart[] };

/**
 * Exact article content + highlight ranges from the screen recording.
 */
export const CONTENT: ContentBlock[] = [
  {
    type: "hero",
    title: "Scroll Highlight\nfor Framer",
  },
  {
    type: "paragraph",
    parts: [
      { type: "mark", value: "Highlighting text", color: "blue" },
      {
        type: "text",
        value:
          " within paragraphs is a powerful tool that serves multiple purposes. For starters, it allows readers to quickly ",
      },
      { type: "mark", value: "identify crucial information", color: "blue" },
      {
        type: "text",
        value:
          ", assisting them to understand the main points without having to read an entire piece. It serves, essentially, as a kind of roadmap to the text. Furthermore, it's an effective aid; ",
      },
      {
        type: "mark",
        value:
          "highlighting can enhance recall and comprehension by visually emphasizing important",
        color: "blue",
      },
      { type: "text", value: " content." },
    ],
  },
  {
    type: "heading",
    value: "Oh and you can also\nswitch colors.",
  },
  {
    type: "paragraph",
    parts: [
      { type: "text", value: "It is particularly " },
      { type: "mark", value: "beneficial", color: "yellow" },
      {
        type: "text",
        value:
          " for students when reviewing notes or preparing for exams. Moreover, highlighted text can ",
      },
      { type: "mark", value: "promote active reading", color: "yellow" },
      {
        type: "text",
        value:
          ", encouraging interaction between the reader and the text. Not only does it provide clarification, but it can ",
      },
      {
        type: "mark",
        value: "also guide subsequent questioning",
        color: "yellow",
      },
      { type: "text", value: ", discussion, or further research." },
    ],
  },
  {
    type: "heading",
    value: "Another color? Done.",
  },
  {
    type: "paragraph",
    parts: [
      { type: "text", value: "Additionally, " },
      {
        type: "mark",
        value:
          "highlighting can help with organization of thoughts, enabling the reader to group related ideas together easily.",
        color: "purple",
      },
      {
        type: "text",
        value:
          " Therefore, whether it's for improved comprehension, memory, or a productive reading strategy, highlighting text is an invaluable resource. In the vast landscape of information, a highlighter can essentially ",
      },
      { type: "mark", value: "serve as your compass", color: "purple" },
      {
        type: "text",
        value:
          ", drawing your attention to where you need to focus.",
      },
    ],
  },
];
