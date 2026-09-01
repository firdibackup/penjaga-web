"use client";

import { Container, Eyebrow } from "@/components/kit";
import { Placeholder } from "@/components/placeholder";
import { Reveal } from "@/components/motion/reveal";

type Shot = { label: string; span: string };

const SHOTS: Shot[] = [
  { label: "Security Officer · Building Frontage", span: "col-span-2 row-span-2" },
  { label: "Security Patrol · Perimeter", span: "col-span-2" },
  { label: "Officer · Lobby", span: "" },
  { label: "CCTV · Monitoring", span: "" },
  { label: "Valet · Vehicle Handover", span: "col-span-2" },
  { label: "Valet · Hotel Entrance", span: "" },
  { label: "Valet · Event", span: "" },
];

export function Gallery() {
  return (
    <section className="relative bg-obsidian py-[72px] md:py-[128px]">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-[620px]">
            <Reveal>
              <Eyebrow onDark>Operational Gallery</Eyebrow>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="mt-5 font-display text-[32px] font-bold uppercase leading-[0.98] text-white sm:text-[38px] md:text-[46px]">
                Professional in every detail.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.12}>
            <p className="max-w-[300px] text-[13.5px] leading-[1.55] text-white/50">
              Dokumentasi operasional. Foto placeholder akan diganti foto asli
              tim, seragam, lokasi, dan kendaraan.
            </p>
          </Reveal>
        </div>

        <div className="mt-10 grid auto-rows-[150px] grid-cols-2 gap-3 md:mt-14 md:auto-rows-[190px] md:grid-cols-4 md:gap-4">
          {SHOTS.map((s, i) => (
            <Reveal
              key={s.label}
              delay={(i % 4) * 0.07}
              className={`group overflow-hidden ${s.span}`}
            >
              <Placeholder
                label={s.label}
                onDark
                parallax
                className="h-full w-full transition-transform duration-[900ms] ease-[var(--ease-standard)] group-hover:scale-[1.05]"
              />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
