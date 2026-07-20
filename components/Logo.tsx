import Image from "next/image";
import Link from "next/link";

/** Speaksy pill from 50.png — includes wordmark. Aspect ~3.39:1 */
const LOGO_SRC = "/brand/logo-nav.png";
const LOGO_ASPECT = 640 / 189;

type LogoProps = {
  href?: string;
  /** Height in px; width follows pill aspect ratio */
  size?: number;
  /** Kept for API compat; pill already includes “Speaksy.” */
  withWordmark?: boolean;
  className?: string;
  priority?: boolean;
  /** Open home link in a new tab (e.g. from navbar) */
  newTab?: boolean;
};

export default function Logo({
  href = "/",
  size = 36,
  withWordmark: _withWordmark = false,
  className = "",
  priority = false,
  newTab = false,
}: LogoProps) {
  const height = size;
  const width = Math.round(size * LOGO_ASPECT);

  const mark = (
    <span
      className={`inline-flex items-center justify-center leading-none ${className}`}
      style={{ height, width }}
    >
      <Image
        src={LOGO_SRC}
        alt="Speaksy"
        width={width}
        height={height}
        priority={priority}
        className="object-contain object-left"
        style={{ height, width, maxHeight: height }}
      />
    </span>
  );

  if (!href) return mark;
  return (
    <Link
      href={href}
      target={newTab ? "_blank" : undefined}
      rel={newTab ? "noopener noreferrer" : undefined}
      className="inline-flex shrink-0 items-center self-center leading-none"
      aria-label="Speaksy home"
    >
      {mark}
    </Link>
  );
}
