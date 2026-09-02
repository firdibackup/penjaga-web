"use client";

import { useRef, type ReactNode } from "react";
import { useScroll, useTransform, useReducedMotion } from "motion/react";
import * as m from "motion/react-m";
import { cn } from "@/lib/utils";

// The brief allows three moves only: fade-up, line-reveal, subtle image-zoom.
// Everything here is built from those. Easing matches the token --ease-standard.
const EASE = [0.2, 0.6, 0.2, 1] as const;

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Stagger offset in seconds. */
  delay?: number;
  /** Travel distance of the fade-up in px. */
  y?: number;
  once?: boolean;
  amount?: number;
};

/** Fade-up on scroll into view. Collapses to a plain fade when the user
    prefers reduced motion. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 18,
  once = true,
  amount = 0.25,
}: RevealProps) {
  const reduce = useReducedMotion();
  return (
    <m.div
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration: 0.62, ease: EASE, delay }}
    >
      {children}
    </m.div>
  );
}

type LineRevealProps = {
  className?: string;
  delay?: number;
  /** "h" grows a horizontal rule from the left, "v" a vertical one from top. */
  axis?: "h" | "v";
};

/** A 2px red rule that grows in from its origin — the brief's line-reveal. */
export function LineReveal({ className, delay = 0, axis = "h" }: LineRevealProps) {
  const reduce = useReducedMotion();
  const from = axis === "h" ? { scaleX: 0 } : { scaleY: 0 };
  const to = axis === "h" ? { scaleX: 1 } : { scaleY: 1 };
  return (
    <m.span
      aria-hidden
      className={cn("block bg-penjaga", className)}
      style={{ transformOrigin: axis === "h" ? "left center" : "top center" }}
      initial={reduce ? { opacity: 1 } : from}
      whileInView={reduce ? { opacity: 1 } : to}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.7, ease: EASE, delay }}
    />
  );
}

type ParallaxProps = {
  children: ReactNode;
  className?: string;
  /** Total vertical travel across the viewport, in percent of the layer. */
  distance?: number;
};

/** Wraps children in a layer that drifts as the section scrolls through the
    viewport. The layer is oversized so the drift never exposes an edge. */
export function Parallax({ children, className, distance = 10 }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [`-${distance}%`, `${distance}%`],
  );
  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <m.div
        className="absolute left-0 right-0"
        style={{ y: reduce ? 0 : y, top: `-${distance}%`, bottom: `-${distance}%` }}
      >
        {children}
      </m.div>
    </div>
  );
}
