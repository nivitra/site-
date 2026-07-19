import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  href?: string;
  size?: number;
  withWordmark?: boolean;
  className?: string;
  priority?: boolean;
};

export default function Logo({
  href = "/",
  size = 36,
  withWordmark = true,
  className = "",
  priority = false,
}: LogoProps) {
  const mark = (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <Image
        src="/brand/logo-icon-128.png"
        alt="Speaksy"
        width={size}
        height={size}
        priority={priority}
        className="rounded-xl"
      />
      {withWordmark && (
        <span className="text-lg font-semibold tracking-tight text-foreground">
          Speaksy<span className="text-brand-600">.</span>
        </span>
      )}
    </span>
  );

  if (!href) return mark;
  return (
    <Link href={href} className="inline-flex" aria-label="Speaksy home">
      {mark}
    </Link>
  );
}
