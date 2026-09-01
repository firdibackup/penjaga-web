"use client";

import { Activity, PencilRuler, Search, Users, MessageSquare } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Container, Eyebrow } from "@/components/kit";
import { Reveal } from "@/components/motion/reveal";

type Step = { no: string; label: string; body: string; icon: LucideIcon };

const STEPS: Step[] = [
  { no: "01", label: "Consultation", body: "Diskusikan kebutuhan keamanan atau valet Anda.", icon: MessageSquare },
  { no: "02", label: "Assessment", body: "Identifikasi lokasi, aktivitas, risiko, dan kebutuhan operasional.", icon: Search },
  { no: "03", label: "Solution", body: "Tentukan layanan dan sistem yang sesuai.", icon: PencilRuler },
  { no: "04", label: "Deployment", body: "Tim dan layanan ditempatkan sesuai kesepakatan.", icon: Users },
  { no: "05", label: "Monitoring", body: "Layanan dipantau dan dievaluasi untuk menjaga kualitas.", icon: Activity },
];

export function ServiceProcess() {
  return (
    <section className="relative bg-white py-[72px] md:py-[128px]">
      <Container>
        <div className="max-w-[720px]">
          <Reveal>
            <Eyebrow>Service Process</Eyebrow>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mt-5 font-display text-[32px] font-bold uppercase leading-[0.98] text-obsidian sm:text-[40px] md:text-[48px]">
              Dari kebutuhan menjadi solusi.
            </h2>
          </Reveal>
        </div>

        <div className="relative mt-12 md:mt-16">
          {/* connectors */}
          <span className="absolute left-0 right-0 top-[26px] hidden h-px bg-[var(--line-hairline)] md:block" />
          <span className="absolute bottom-8 left-[26px] top-8 w-px bg-[var(--line-hairline)] md:hidden" />

          <div className="grid grid-cols-1 gap-9 md:grid-cols-5 md:gap-6">
            {STEPS.map((s, i) => {
              const Icon = s.icon;
              return (
                <Reveal
                  key={s.no}
                  delay={i * 0.09}
                  className="relative flex items-start gap-5 md:flex-col md:gap-0"
                >
                  <span className="relative z-10 inline-flex h-[52px] w-[52px] shrink-0 items-center justify-center border border-[var(--line-hairline)] bg-white text-obsidian">
                    <Icon className="h-[22px] w-[22px]" strokeWidth={1.75} />
                  </span>
                  <div className="md:mt-6">
                    <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-penjaga">
                      {s.no} · {s.label}
                    </span>
                    <p className="mt-2 max-w-[230px] text-[14px] leading-[1.55] text-[#3a3a3a]">
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
