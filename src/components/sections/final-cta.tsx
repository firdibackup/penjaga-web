"use client";

import { ArrowRight, Phone } from "lucide-react";
import { useReducedMotion } from "motion/react";
import * as m from "motion/react-m";
import { Container, Eyebrow, ShieldGlyph } from "@/components/kit";
import { Reveal } from "@/components/motion/reveal";

export function FinalCTA() {
  const reduce = useReducedMotion();
  return (
    <section className="relative overflow-hidden bg-obsidian py-[84px] md:py-[150px]">
      {/* drifting red glow — the brief's subtle #BC2027 → #ED1C24 movement */}
      <m.div
        aria-hidden
        className="pointer-events-none absolute -right-[10%] top-1/2 h-[560px] w-[560px] -translate-y-1/2 rounded-full opacity-60 blur-[90px]"
        style={{
          background:
            "radial-gradient(circle, rgba(237,28,36,.42) 0%, rgba(188,32,39,.18) 45%, transparent 72%)",
        }}
        animate={reduce ? undefined : { x: [0, -40, 0], y: [0, 24, 0], opacity: [0.5, 0.7, 0.5] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <ShieldGlyph
        aria-hidden
        className="pointer-events-none absolute -left-[6%] top-1/2 h-[130%] -translate-y-1/2 text-white/[0.04]"
      />

      <Container className="relative">
        <div className="max-w-[860px]">
          <Reveal>
            <Eyebrow onDark>Konsultasi</Eyebrow>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mt-5 font-display text-[38px] font-bold uppercase leading-[0.98] text-white sm:text-[52px] md:text-[72px]">
              Mari ciptakan lingkungan yang lebih{" "}
              <span className="text-penjaga">aman dan nyaman.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-6 max-w-[560px] text-[16.5px] leading-[1.66] text-white/65">
              Diskusikan kebutuhan Security Service atau Valet Parking untuk
              bisnis, properti, event, maupun kebutuhan personal Anda.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
              <a
                href="#kontak"
                className="inline-flex h-[54px] items-center justify-center gap-3 rounded-[2px] bg-[linear-gradient(90deg,#bc2027,#ed1c24)] px-8 text-[13px] font-semibold uppercase tracking-[0.14em] text-white no-underline transition-[filter,transform] duration-200 hover:brightness-110 active:scale-[0.985]"
              >
                Konsultasikan Kebutuhan
                <ArrowRight className="h-4 w-4" strokeWidth={2} />
              </a>
              <a
                href="tel:+6281388801886"
                className="inline-flex h-[54px] items-center justify-center gap-3 rounded-[2px] border border-white/40 px-8 text-[13px] font-semibold uppercase tracking-[0.14em] text-white no-underline transition-colors duration-150 hover:border-white hover:bg-white hover:text-obsidian"
              >
                <Phone className="h-4 w-4" strokeWidth={1.75} />
                Hubungi 0813 8880 1886
              </a>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
