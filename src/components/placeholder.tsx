"use client";

import { useRef, type ReactNode } from "react";
import { useScroll, useTransform, useReducedMotion } from "motion/react";
import * as m from "motion/react-m";
import { cn } from "@/lib/utils";
import { ShieldGlyph } from "@/components/kit";

const clipMap = {
  none: undefined,
  tl: "var(--clip-shield-tl)",
  br: "var(--clip-shield-br)",
} as const;

type PlaceholderProps = {
  /** Describes the intended photograph, e.g. "SECURITY OFFICER · LOBBY". */
  label: string;
  caption?: string;
  className?: string;
  onDark?: boolean;
  clip?: keyof typeof clipMap;
  parallax?: boolean;
  icon?: ReactNode;
};

/** A designed stand-in for photography that has not been shot yet. Reads as an
    intentional brand surface — shield watermark, hairline texture, mono label —
    not a broken image. Swap for real operational photos before production. */
export function Placeholder({
  label,
  caption,
  className,
  onDark = true,
  clip = "none",
  parallax = false,
  icon,
}: PlaceholderProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-7%", "7%"]);

  return (
    <div
      ref={ref}
      className={cn(
        "relative isolate overflow-hidden",
        onDark ? "bg-obsidian" : "bg-[var(--silver-200)]",
        className,
      )}
      style={{ clipPath: clipMap[clip] }}
    >
      <m.div
        aria-hidden
        style={{ y: parallax && !reduce ? y : 0 }}
        className="absolute -inset-y-[10%] inset-x-0"
      >
        <div
          className={cn(
            "absolute inset-0",
            onDark
              ? "bg-[radial-gradient(130%_120%_at_78%_12%,#262626_0%,#101010_55%,#050505_100%)]"
              : "bg-[radial-gradient(130%_120%_at_78%_12%,#ffffff_0%,#e6e6e2_58%,#d3d3ce_100%)]",
          )}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: onDark
              ? "repeating-linear-gradient(135deg, rgba(255,255,255,.045) 0 1px, transparent 1px 24px)"
              : "repeating-linear-gradient(135deg, rgba(5,5,5,.05) 0 1px, transparent 1px 24px)",
          }}
        />
        <ShieldGlyph
          className={cn(
            "absolute -right-[8%] top-1/2 h-[128%] -translate-y-1/2",
            onDark ? "text-white/[0.055]" : "text-obsidian/[0.06]",
          )}
        />
      </m.div>

      {/* centre label */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 px-6 text-center">
        <span className="text-penjaga [&_svg]:h-7 [&_svg]:w-7">
          {icon ?? <ShieldGlyph className="h-9 w-8 text-penjaga" />}
        </span>
        <span
          className={cn(
            "max-w-[85%] font-mono text-[10.5px] uppercase leading-[1.5] tracking-[0.18em]",
            onDark ? "text-white/55" : "text-steel",
          )}
        >
          {label}
        </span>
      </div>

      <span
        className={cn(
          "absolute left-4 top-4 z-10 font-mono text-[9.5px] uppercase tracking-[0.16em]",
          onDark ? "text-white/35" : "text-steel/70",
        )}
      >
        Visual placeholder
      </span>
      {caption ? (
        <span
          className={cn(
            "absolute inset-x-4 bottom-4 z-10 font-mono text-[9.5px] uppercase tracking-[0.14em]",
            onDark ? "text-white/45" : "text-steel/80",
          )}
        >
          {caption}
        </span>
      ) : null}
    </div>
  );
}
