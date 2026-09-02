"use client";

import { LazyMotion, domAnimation } from "motion/react";
import type { ReactNode } from "react";

/** Loads Motion's DOM animation features once for the whole app so every `m`
    component across the site stays code-split. Shipping the full `motion`
    component pulls in ~34kb that can't be tree-shaken; `m` + LazyMotion drops
    the initial render bundle to ~4.6kb. `domAnimation` covers every move used
    here (fade/translate/scale/opacity plus scroll-linked motion values); no
    component uses drag, pan, or layout animation, so `domMax` isn't needed. */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <LazyMotion features={domAnimation}>{children}</LazyMotion>;
}
