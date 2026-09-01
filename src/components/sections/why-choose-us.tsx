"use client";

import { Cpu, SlidersHorizontal, UserCheck, Zap } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Container, Eyebrow } from "@/components/kit";
import { Reveal } from "@/components/motion/reveal";

type Reason = {
  no: string;
  kicker: string;
  title: string;
  body: string;
  icon: LucideIcon;
};

const REASONS: Reason[] = [
  {
    no: "01",
    kicker: "Professional Team",
    title: "Tim Profesional",
    body: "Petugas dilatih secara profesional dan mampu menangani berbagai situasi yang membutuhkan respons cepat.",
    icon: UserCheck,
  },
  {
    no: "02",
    kicker: "Modern Technology",
    title: "Teknologi Terkini",
    body: "CCTV, alarm otomatis, kontrol akses, dan sistem monitoring untuk mendukung efektivitas layanan.",
    icon: Cpu,
  },
  {
    no: "03",
    kicker: "Responsive Service",
    title: "Respons Cepat",
    body: "Sistem komunikasi terintegrasi mendukung respons cepat terhadap situasi yang membutuhkan perhatian.",
    icon: Zap,
  },
  {
    no: "04",
    kicker: "Custom Solution",
    title: "Solusi yang Disesuaikan",
    body: "Setiap lokasi dan klien berbeda. Solusi dapat disesuaikan dengan kebutuhan individu maupun organisasi.",
    icon: SlidersHorizontal,
  },
];

export function WhyChooseUs() {
  return (
    <section id="keunggulan" className="relative bg-operational py-[72px] md:py-[128px]">
      <Container>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[5fr_7fr] lg:gap-16">
          <div className="lg:sticky lg:top-[120px] lg:self-start">
            <Reveal>
              <Eyebrow>Keunggulan</Eyebrow>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="mt-5 max-w-[420px] font-display text-[32px] font-bold uppercase leading-[0.98] text-obsidian sm:text-[38px] md:text-[46px]">
                Mengapa memilih Penjaga Utama Indonesia?
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-5 max-w-[380px] text-[16px] leading-[1.62] text-[#3a3a3a]">
                Empat prinsip yang menjadi dasar kualitas layanan kami di
                lapangan.
              </p>
            </Reveal>
          </div>

          <div className="border-t border-[var(--line-hairline)]">
            {REASONS.map((r, i) => {
              const Icon = r.icon;
              return (
                <Reveal
                  key={r.no}
                  delay={i * 0.08}
                  className="group grid grid-cols-[auto_1fr] items-start gap-5 border-b border-[var(--line-hairline)] py-7 sm:gap-8 md:py-8"
                >
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono text-[13px] tracking-[0.1em] text-penjaga">
                      {r.no}
                    </span>
                    <span className="inline-flex h-11 w-11 items-center justify-center border border-[var(--line-hairline)] text-obsidian transition-colors duration-300 group-hover:border-penjaga group-hover:text-penjaga">
                      <Icon className="h-[22px] w-[22px]" strokeWidth={1.75} />
                    </span>
                  </div>
                  <div>
                    <span className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-steel">
                      {r.kicker}
                    </span>
                    <h3 className="mt-1 font-display text-[23px] font-semibold uppercase leading-[1.05] text-obsidian md:text-[26px]">
                      {r.title}
                    </h3>
                    <p className="mt-2 max-w-[520px] text-[15px] leading-[1.62] text-[#3a3a3a]">
                      {r.body}
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
