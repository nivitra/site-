export type PreviewLink = {
  id: string;
  label: string;
  href: string;
  preview: string;
  previewAlt: string;
};

export const PREVIEW_LINKS: Record<string, PreviewLink> = {
  university: {
    id: "university",
    label: "Framer University",
    href: "https://www.framer.university/",
    preview: "/lab/link-previews/framer-university.jpg",
    previewAlt: "Framer University site preview",
  },
  guy: {
    id: "guy",
    label: "this guy",
    href: "https://21st.dev/",
    preview: "/lab/link-previews/this-guy.jpg",
    previewAlt: "Creator profile preview",
  },
  youtube: {
    id: "youtube",
    label: "this youtube",
    href: "https://www.youtube.com/@framer.university",
    preview: "/lab/link-previews/youtube.jpg",
    previewAlt: "YouTube channel preview",
  },
};
