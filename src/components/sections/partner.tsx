"use client";

import { Container, Eyebrow } from "@/components/kit";
import { Placeholder } from "@/components/placeholder";
import { Reveal } from "@/components/motion/reveal";

const FACTS: { k: string; v: string }[] = [
  { k: "Brand", v: "Premier Valet" },
  { k: "Legal Entity", v: "PT. Primer Utama Indonesia" },
  { k: "Heritage", v: "Diva Valet Parking Service — sejak 2003" },
  { k: "Premier Valet", v: "Sejak 2014" },
  { k: "Telepon", v: "+62 21 632 7390" },
  { k: "Email", v: "info@premierutama.co.id" },
];

export function Partner() {
  return (
    <section id="partner" className="relative bg-white py-[72px] md:py-[128px]">
      <Container>
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[6fr_6fr] lg:gap-[80px]">
          {/* --- statement --- */}
          <div>
            <Reveal>
              <Eyebrow>Our Partner</Eyebrow>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="mt-5 max-w-[520px] font-display text-[30px] font-bold uppercase leading-[1] text-obsidian sm:text-[36px] md:text-[44px]">
                Premier Valet — mitra valet parking berpengalaman.
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <div className="mt-6 flex max-w-[520px] flex-col gap-4">
                <p className="text-[16.5px] leading-[1.66] text-ink">
                  PT Penjaga Utama Indonesia bekerja sama dengan{" "}
                  <span className="font-semibold">Premier Valet</span>, bagian
                  dari PT. Primer Utama Indonesia, untuk mendukung kebutuhan
                  layanan Valet Parking.
                </p>
              </div>
            </Reveal>

            {/* partner mark + facts */}
            <Reveal delay={0.18}>
              <div className="mt-9 border border-[var(--line-hairline)]">
                <div className="flex items-center justify-between gap-4 border-b border-[var(--line-hairline)] bg-[var(--surface-page)] px-5 py-4">
                  <span className="font-display text-[22px] font-bold uppercase leading-none tracking-[0.02em] text-obsidian">
                    Premier<span className="text-penjaga">·</span>Valet
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-steel">
                    Valet Parking Partner
                  </span>
                </div>
                <dl className="grid grid-cols-1 sm:grid-cols-2">
                  {FACTS.map((f, i) => (
                    <div
                      key={f.k}
                      className={`px-5 py-4 ${
                        i % 2 === 0 ? "sm:border-r" : ""
                      } border-b border-[var(--line-hairline)] last:border-b-0 sm:[&:nth-last-child(2)]:border-b-0`}
                    >
                      <dt className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-steel">
                        {f.k}
                      </dt>
                      <dd className="mt-1 text-[14.5px] leading-[1.4] text-ink">
                        {f.v}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
              <p className="mt-4 text-[12.5px] leading-[1.5] text-steel">
                Premier Valet merupakan mitra layanan valet dan entitas hukum
                yang terpisah dari PT Penjaga Utama Indonesia.
              </p>
            </Reveal>
          </div>

          {/* --- operational photo --- */}
          <Reveal delay={0.1} className="lg:sticky lg:top-[120px]">
            <Placeholder
              label="Valet · Entrance & Premium Vehicle"
              caption="Operasional valet — foto menyusul"
              parallax
              clip="br"
              className="h-[380px] w-full sm:h-[460px] lg:h-[560px]"
            />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
