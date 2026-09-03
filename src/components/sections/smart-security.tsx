"use client";

import { Cctv, Fingerprint, RadioTower, Siren } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Image from "next/image";
import { useReducedMotion } from "motion/react";
import * as m from "motion/react-m";
import { Container, Eyebrow } from "@/components/kit";
import { Reveal } from "@/components/motion/reveal";

type Stage = {
  step: string;
  label: string;
  title: string;
  body: string;
  icon: LucideIcon;
};

const STAGES: Stage[] = [
  {
    step: "01",
    label: "Detect",
    title: "Alarm",
    body: "Membantu mendeteksi kondisi yang membutuhkan perhatian.",
    icon: Siren,
  },
  {
    step: "02",
    label: "Monitor",
    title: "CCTV",
    body: "Pengawasan area secara visual.",
    icon: Cctv,
  },
  {
    step: "03",
    label: "Control",
    title: "Access Control",
    body: "Mengatur akses ke area tertentu.",
    icon: Fingerprint,
  },
  {
    step: "04",
    label: "Respond",
    title: "Remote Monitoring",
    body: "Mendukung pemantauan dan respons secara terintegrasi.",
    icon: RadioTower,
  },
];

const TILES: { src: string; label: string; alt: string }[] = [
  {
    src: "/assets/smart-security/1.webp",
    label: "01 · Ruang Kontrol",
    alt: "Operator keamanan memantau layar CCTV di ruang kontrol",
  },
  {
    src: "/assets/smart-security/2.webp",
    label: "02 · Koordinasi Lapangan",
    alt: "Personel keamanan berkoordinasi menggunakan peta area",
  },
];

/** Security console framing real operational photography. */
function Console() {
  const reduce = useReducedMotion();
  return (
    <div className="relative border border-white/[0.12] bg-charcoal">
      <div className="flex items-center justify-between border-b border-white/[0.12] px-4 py-3">
        <span className="flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.16em] text-white/70">
          <span className="relative flex h-2 w-2">
            {!reduce && (
              <m.span
                className="absolute inset-0 rounded-full bg-penjaga"
                animate={{ opacity: [0.9, 0.1, 0.9], scale: [1, 1.9, 1] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              />
            )}
            <span className="relative h-2 w-2 rounded-full bg-penjaga" />
          </span>
          Security Console
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/40">
          Live
        </span>
      </div>

      <div className="grid grid-cols-2 gap-px bg-white/[0.08] p-px">
        {TILES.map((tile, i) => (
          <div
            key={tile.src}
            className="relative aspect-video overflow-hidden bg-black"
          >
            <Image
              src={tile.src}
              alt={tile.alt}
              fill
              sizes="(max-width: 1023px) 100vw, 45vw"
              className="object-cover"
            />
            {/* keep monitor overlays legible over the photo */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
            {!reduce && (
              // Full-tile layer translated on the compositor (translateY), with
              // the gradient band pinned to its top edge — a subtle scan sweep.
              <m.span
                aria-hidden
                className="absolute inset-0"
                initial={{ y: "-20%" }}
                animate={{ y: ["-20%", "120%"] }}
                transition={{
                  duration: 3.6,
                  repeat: Infinity,
                  ease: "linear",
                  delay: i * 0.9,
                }}
              >
                <span className="absolute inset-x-0 top-0 h-8 bg-[linear-gradient(180deg,transparent,rgba(237,28,36,.12),transparent)]" />
              </m.span>
            )}
            <span className="absolute left-2 top-2 font-mono text-[8.5px] uppercase tracking-[0.12em] text-white/70">
              {tile.label}
            </span>
            {i === 0 && (
              <span className="absolute bottom-2 right-2 flex items-center gap-1.5 border border-penjaga/60 bg-penjaga/15 px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-[0.1em] text-penjaga">
                <span className="h-1 w-1 rounded-full bg-penjaga" />
                Rec
              </span>
            )}
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-white/[0.12] px-4 py-3">
        <span className="font-mono text-[9.5px] uppercase tracking-[0.12em] text-white/45">
          Access · 2 titik aktif
        </span>
        <span className="flex items-center gap-2 font-mono text-[9.5px] uppercase tracking-[0.12em] text-white/60">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/80" />
          Sektor nominal
        </span>
      </div>
    </div>
  );
}

export function SmartSecurity() {
  return (
    <section id="smart" className="relative overflow-hidden bg-obsidian py-[72px] md:py-[128px]">
      {/* faint connection-grid backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.04) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(120% 90% at 80% 0%, #000 0%, transparent 70%)",
        }}
      />
      <Container className="relative">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[6fr_6fr] lg:gap-16">
          <div>
            <Reveal>
              <Eyebrow onDark>Smart Security Solutions</Eyebrow>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="mt-5 max-w-[480px] font-display text-[32px] font-bold uppercase leading-[0.98] text-white sm:text-[38px] md:text-[46px]">
                Keamanan yang terintegrasi dengan teknologi.
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-5 max-w-[500px] text-[16px] leading-[1.66] text-white/60">
                Selain personel profesional, kami menyediakan sistem keamanan
                berbasis teknologi untuk membantu meningkatkan pengawasan dan
                respons terhadap kondisi di lapangan.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <Console />
          </Reveal>
        </div>

        {/* --- Detect → Monitor → Control → Respond --- */}
        <div className="mt-14 md:mt-20">
          <div className="grid grid-cols-1 gap-y-8 md:grid-cols-4 md:gap-x-6 md:gap-y-0">
            {STAGES.map((s, i) => {
              const Icon = s.icon;
              const notLast = i < STAGES.length - 1;
              return (
                <Reveal
                  key={s.label}
                  delay={i * 0.1}
                  className="relative flex items-start gap-5 md:flex-col md:gap-0"
                >
                  {/* connector to the next node — a precise segment, never dangling */}
                  {notLast && (
                    <>
                      <span className="pointer-events-none absolute left-[56px] right-[-20px] top-[26px] hidden h-px bg-white/15 md:block">
                        <FlowPulse delay={i * 0.7} />
                      </span>
                      <span className="pointer-events-none absolute left-[26px] top-[58px] -bottom-[26px] w-px bg-white/15 md:hidden" />
                    </>
                  )}
                  <span className="relative z-10 inline-flex h-[52px] w-[52px] shrink-0 items-center justify-center border border-white/20 bg-obsidian text-penjaga">
                    <Icon className="h-6 w-6" strokeWidth={1.75} />
                  </span>
                  <div className="md:mt-6">
                    <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-penjaga">
                      {s.step} · {s.label}
                    </span>
                    <h3 className="mt-2 font-display text-[22px] font-semibold uppercase leading-none text-white">
                      {s.title}
                    </h3>
                    <p className="mt-2 max-w-[240px] text-[14px] leading-[1.55] text-white/55">
                      {s.body}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}

/** A dot that travels along one flow segment. Staggered per segment so the
    signal reads as moving down the chain. */
function FlowPulse({ delay = 0 }: { delay?: number }) {
  const reduce = useReducedMotion();
  if (reduce) return null;
  return (
    // Full-width track layer translated on the compositor (translateX); the dot
    // rides its left edge, so it sweeps the same 0% → 100% as before without
    // animating `left` (which would relayout the row every frame).
    <m.span
      aria-hidden
      className="absolute inset-x-0 top-1/2"
      initial={{ x: "0%" }}
      animate={{ x: ["0%", "100%"] }}
      transition={{ duration: 2.1, repeat: Infinity, repeatDelay: 0.5, ease: "linear", delay }}
    >
      <span className="absolute left-0 top-0 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-penjaga shadow-[0_0_10px_2px_rgba(237,28,36,.6)]" />
    </m.span>
  );
}
