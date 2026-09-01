"use client";

import { Car, Shield } from "lucide-react";
import { Container, Eyebrow } from "@/components/kit";
import { Reveal } from "@/components/motion/reveal";

const ROWS: { security: string; valet: string }[] = [
  { security: "Protect People", valet: "Welcome People" },
  { security: "Protect Property", valet: "Manage Arrival" },
  { security: "Monitor Environment", valet: "Manage Parking" },
  { security: "Respond to Risk", valet: "Improve Convenience" },
];

export function SecurityVsValet() {
  return (
    <section className="relative bg-white py-[72px] md:py-[128px]">
      <Container>
        <div className="mx-auto max-w-[720px] text-center">
          <Reveal className="flex justify-center">
            <Eyebrow>Security vs Valet</Eyebrow>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mt-5 font-display text-[32px] font-bold uppercase leading-[0.98] text-obsidian sm:text-[38px] md:text-[46px]">
              One company. Two essential experiences.
            </h2>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="mt-10 grid grid-cols-2 overflow-hidden border border-[var(--line-hairline)] md:mt-14">
            {/* headers */}
            <div className="flex items-center gap-3 bg-obsidian px-5 py-5 md:px-8 md:py-7">
              <Shield className="h-5 w-5 text-penjaga md:h-6 md:w-6" strokeWidth={1.75} />
              <span className="font-display text-[20px] font-bold uppercase leading-none text-white md:text-[26px]">
                Security
              </span>
            </div>
            <div className="flex items-center gap-3 bg-[var(--surface-page)] px-5 py-5 md:px-8 md:py-7">
              <Car className="h-5 w-5 text-penjaga md:h-6 md:w-6" strokeWidth={1.75} />
              <span className="font-display text-[20px] font-bold uppercase leading-none text-obsidian md:text-[26px]">
                Valet
              </span>
            </div>

            {/* value rows */}
            {ROWS.map((row) => (
              <div key={row.security} className="contents">
                <div className="flex items-center gap-3 border-t border-white/[0.1] bg-obsidian px-5 py-5 md:px-8 md:py-6">
                  <span className="h-[3px] w-4 shrink-0 bg-penjaga" />
                  <span className="text-[14.5px] font-medium text-white/85 md:text-[17px]">
                    {row.security}
                  </span>
                </div>
                <div className="flex items-center gap-3 border-t border-[var(--line-hairline)] bg-[var(--surface-page)] px-5 py-5 md:px-8 md:py-6">
                  <span className="h-[3px] w-4 shrink-0 bg-penjaga" />
                  <span className="text-[14.5px] font-medium text-ink md:text-[17px]">
                    {row.valet}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.14}>
          <p className="mx-auto mt-6 max-w-[640px] text-center text-[14.5px] leading-[1.6] text-steel">
            Kedua layanan memiliki fungsi berbeda, tetapi sama-sama berorientasi
            pada keamanan, kenyamanan, dan pengalaman pelanggan.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
