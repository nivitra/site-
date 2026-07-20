"use client";

type Props = {
  kind: "trend" | "nodes" | "spark";
  className?: string;
};

export function CardIcon({ kind, className = "" }: Props) {
  if (kind === "trend") {
    return (
      <svg
        className={className}
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M4 17 10 11l4 4 6-8" />
        <path d="M15 7h5v5" />
      </svg>
    );
  }

  if (kind === "nodes") {
    return (
      <svg
        className={className}
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden
      >
        <circle cx="9" cy="8" r="1.6" />
        <circle cx="15" cy="8" r="1.6" />
        <circle cx="7" cy="13" r="1.6" />
        <circle cx="17" cy="13" r="1.6" />
        <circle cx="9" cy="18" r="1.6" />
        <circle cx="15" cy="18" r="1.6" />
      </svg>
    );
  }

  return (
    <svg
      className={className}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      aria-hidden
    >
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8" />
    </svg>
  );
}
