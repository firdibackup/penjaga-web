"use client";

import { Container, Eyebrow } from "@/components/kit";
import { Placeholder } from "@/components/placeholder";
import { Reveal } from "@/components/motion/reveal";

const STEPS = [
  { no: "01", title: "Arrive", body: "Tamu tiba di entrance." },
  { no: "02", title: "Hand Over", body: "Kendaraan diserahkan kepada petugas valet." },
  { no: "03", title: "Park", body: "Kendaraan ditempatkan secara aman dan terorganisir." },
  { no: "04", title: "Enjoy", body: "Tamu dapat langsung menikmati tujuan mereka." },
];

export function ValetExperience() {
  return (
    <section className="relative bg-white py-[72px] md:py-[128px]">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-[620px]">
            <Reveal>
              <Eyebrow>Valet Experience</Eyebrow>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="mt-5 font-display text-[32px] font-bold uppercase leading-[0.98] text-obsidian sm:text-[40px] md:text-[48px]">
                Simple arrival.
                <br className="hidden sm:block" />{" "}
                <span className="text-penjaga">Better experience.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.12}>
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-steel">
              Editorial sequence · 4 langkah
            </span>
          </Reveal>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 md:mt-14 md:grid-cols-4 md:gap-6">
          {STEPS.map((s, i) => (
            <Reveal key={s.no} delay={i * 0.09} className="group flex flex-col">
              <div className="relative overflow-hidden">
                <Placeholder
                  label={`Frame ${s.no} · ${s.title}`}
                  parallax
                  className="aspect-[3/4] w-full transition-transform duration-[900ms] ease-[var(--ease-standard)] group-hover:scale-[1.04]"
                />
                <span className="absolute left-3 top-3 z-20 font-display text-[34px] font-bold leading-none text-white/90 md:text-[44px]">
                  {s.no}
                </span>
              </div>
              <div className="mt-4 flex items-center gap-3">
                <span className="block h-[2px] w-6 bg-penjaga" />
                <h3 className="font-display text-[20px] font-semibold uppercase leading-none text-obsidian md:text-[23px]">
                  {s.title}
                </h3>
              </div>
              <p className="mt-2 text-[13.5px] leading-[1.55] text-[#3a3a3a]">
                {s.body}
              </p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
