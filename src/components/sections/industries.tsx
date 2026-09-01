"use client";

import { Building2, CalendarDays, Factory, Home, Hotel, Store, UtensilsCrossed } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Container, Eyebrow } from "@/components/kit";
import { Reveal } from "@/components/motion/reveal";

const SECTORS: { icon: LucideIcon; label: string; note: string }[] = [
  { icon: Building2, label: "Corporate", note: "Gedung kantor & lingkungan perusahaan" },
  { icon: Factory, label: "Industrial", note: "Fasilitas & area industri" },
  { icon: Home, label: "Residential", note: "Perumahan & lingkungan hunian" },
  { icon: Hotel, label: "Hospitality", note: "Hotel & resort" },
  { icon: UtensilsCrossed, label: "F&B", note: "Restoran & kafe" },
  { icon: Store, label: "Commercial", note: "Pusat perbelanjaan & area komersial" },
  { icon: CalendarDays, label: "Event", note: "Konser, seminar, konferensi, pameran" },
];

export function Industries() {
  return (
    <section id="sektor" className="relative bg-operational py-[72px] md:py-[128px]">
      <Container>
        <div className="max-w-[720px]">
          <Reveal>
            <Eyebrow>Industries</Eyebrow>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mt-5 font-display text-[32px] font-bold uppercase leading-[0.98] text-obsidian sm:text-[38px] md:text-[46px]">
              Dibangun untuk berbagai lingkungan.
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-5 max-w-[560px] text-[16px] leading-[1.62] text-[#3a3a3a]">
              Layanan kami mendukung beragam sektor dengan kebutuhan keamanan dan
              kenyamanan yang berbeda-beda.
            </p>
          </Reveal>
        </div>

        <div className="mt-10 grid grid-cols-2 border-l border-t border-[var(--line-hairline)] sm:grid-cols-3 md:mt-14 lg:grid-cols-7">
          {SECTORS.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal
                key={s.label}
                delay={i * 0.05}
                className="group relative flex flex-col gap-4 border-b border-r border-[var(--line-hairline)] bg-white p-5 transition-colors duration-300 hover:bg-[var(--surface-page)]"
              >
                <Icon
                  className="h-8 w-8 text-obsidian transition-colors duration-300 group-hover:text-penjaga"
                  strokeWidth={1.5}
                />
                <div>
                  <div className="font-display text-[17px] font-semibold uppercase leading-none text-obsidian">
                    {s.label}
                  </div>
                  <p className="mt-2 text-[12px] leading-[1.45] text-steel">
                    {s.note}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
