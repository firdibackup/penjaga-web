import type { ReactNode, SVGProps } from "react";
import { cn } from "@/lib/utils";

/** The section container used across the whole page. */
export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-[1240px] px-4 sm:px-6 md:px-10",
        className,
      )}
    >
      {children}
    </div>
  );
}

/** 3px red marker + tracked uppercase label. The recurring section kicker. */
export function Eyebrow({
  children,
  onDark = false,
  className,
}: {
  children: ReactNode;
  onDark?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-3 sm:gap-[14px]", className)}>
      <span className="block h-4 w-[3px] bg-penjaga sm:h-[18px]" />
      <span
        className={cn(
          "text-[11px] font-semibold uppercase tracking-[0.16em] sm:text-[12.5px]",
          onDark ? "text-white/85" : "text-ink",
        )}
      >
        {children}
      </span>
    </div>
  );
}

/** The Penjaga shield, used as a brand graphic (watermark, mask, motif). */
export function ShieldGlyph(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 100 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      {...props}
    >
      <path
        d="M50 3 L93 19 V60 C93 90 74 111 50 118 C26 111 7 90 7 60 V19 Z"
        stroke="currentColor"
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
      />
      <path
        d="M50 21 L77 31 V60 C77 79 65 93 50 98 C35 93 23 79 23 60 V31 Z"
        stroke="currentColor"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
        opacity="0.6"
      />
    </svg>
  );
}
