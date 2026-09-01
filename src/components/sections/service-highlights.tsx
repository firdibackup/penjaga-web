"use client";

import { Cctv, Car, RadioTower, Shield } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Container, Eyebrow } from "@/components/kit";
import { Reveal } from "@/components/motion/reveal";

type Highlight = {
  icon: LucideIcon;
  title: string;
  body: string;
};

const HIGHLIGHTS: Highlight[] = [
  {
    icon: Shield,
    title: "Security Service",
    body: "Pengamanan profesional untuk individu, properti, gedung, kawasan, dan event.",
  },
  {
    icon: Cctv,
    title: "Smart Security",
    body: "Integrasi CCTV, alarm, kontrol akses, dan monitoring jarak jauh.",
  },
  {
    icon: Car,
    title: "Valet Parking",
    body: "Layanan valet untuk hotel, restoran, pusat perbelanjaan, perusahaan, dan event.",
  },
  {
    icon: RadioTower,
    title: "Responsive Service",
    body: "Pelayanan yang cepat, terintegrasi, dan disesuaikan dengan kebutuhan klien.",
  },
];

export function ServiceHighlights() {
  return (
    <section
      id="highlights"
      className="relative bg-operational py-[72px] md:py-[120px]"
    >
      <Container>
        <div className="max-w-[760px]">
          <Reveal>
            <Eyebrow>Kapabilitas Layanan</Eyebrow>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mt-5 font-display text-[32px] font-bold uppercase leading-[0.98] text-obsidian sm:text-[38px] md:text-[46px]">
              Solusi profesional untuk keamanan &amp; kenyamanan.
            </h2>
          </Reveal>
        </div>

        <div className="mt-10 grid grid-cols-1 border-t border-l border-[var(--line-hairline)] sm:grid-cols-2 lg:grid-cols-4 md:mt-14">
          {HIGHLIGHTS.map((item, i) => {
            const Icon = item.icon;
            return (
              <Reveal
                key={item.title}
                delay={i * 0.08}
                className="group relative border-b border-r border-[var(--line-hairline)] bg-white p-6 transition-colors duration-300 hover:bg-[var(--surface-page)] md:p-8"
              >
                <span className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-penjaga transition-transform duration-300 ease-[var(--ease-standard)] group-hover:scale-x-100" />
                <div className="flex items-start justify-between">
                  <span className="inline-flex h-12 w-12 items-center justify-center border border-[var(--line-hairline)] text-obsidian transition-colors duration-300 group-hover:border-penjaga group-hover:text-penjaga">
                    <Icon className="h-6 w-6" strokeWidth={1.75} />
                  </span>
                  <span className="font-mono text-[12px] tracking-[0.1em] text-steel">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-6 font-display text-[21px] font-semibold uppercase leading-none text-obsidian">
                  {item.title}
                </h3>
                <p className="mt-3 text-[14.5px] leading-[1.6] text-[#3a3a3a]">
                  {item.body}
                </p>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
