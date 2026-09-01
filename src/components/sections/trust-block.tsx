"use client";

import { Cctv, Car, Shield } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Container, Eyebrow } from "@/components/kit";
import { Reveal } from "@/components/motion/reveal";

const PILLARS: { icon: LucideIcon; kicker: string; title: string }[] = [
  { icon: Shield, kicker: "Security", title: "Professional Security Service" },
  { icon: Cctv, kicker: "Technology", title: "Integrated Security Solutions" },
  { icon: Car, kicker: "Valet", title: "Professional Parking Experience" },
];

export function TrustBlock() {
  return (
    <section className="relative bg-operational py-[72px] md:py-[120px]">
      <Container>
        <div className="mx-auto max-w-[820px] text-center">
          <Reveal className="flex justify-center">
            <Eyebrow>Company Profile</Eyebrow>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mt-5 font-display text-[30px] font-bold uppercase leading-[1] text-obsidian sm:text-[38px] md:text-[44px]">
              Partner untuk keamanan dan kenyamanan operasional Anda.
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mx-auto mt-6 max-w-[640px] text-[16.5px] leading-[1.66] text-[#3a3a3a]">
              Kami percaya layanan keamanan dan valet bukan hanya tentang
              menjalankan tugas, tetapi menciptakan rasa aman, kenyamanan, dan
              pengalaman yang dapat diandalkan.
            </p>
          </Reveal>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-px overflow-hidden border border-[var(--line-hairline)] bg-[var(--line-hairline)] sm:grid-cols-3 md:mt-14">
          {PILLARS.map((p, i) => {
            const Icon = p.icon;
            return (
              <Reveal
                key={p.kicker}
                delay={i * 0.1}
                className="flex flex-col items-center gap-4 bg-white px-6 py-10 text-center"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center border border-[var(--line-hairline)] text-penjaga">
                  <Icon className="h-6 w-6" strokeWidth={1.75} />
                </span>
                <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-steel">
                  {p.kicker}
                </span>
                <span className="max-w-[220px] font-display text-[19px] font-semibold uppercase leading-[1.1] text-obsidian">
                  {p.title}
                </span>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
