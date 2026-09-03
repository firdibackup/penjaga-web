"use client";

import { Container, Eyebrow } from "@/components/kit";
import { Reveal } from "@/components/motion/reveal";

const FACTS: { k: string; v: string }[] = [
  { k: "Brand", v: "Security & Parking Services" },
  { k: "Legal Entity", v: "PT. Primer Utama Indonesia" },
  { k: "Security & Parking Services", v: "Sejak 2014" },
  { k: "Telepon", v: "+62 21 632 7390" },
  { k: "Email", v: "info@penjagaindonesia.com" },
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
                Security & Parking Services — mitra valet parking berpengalaman.
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <div className="mt-6 flex max-w-[520px] flex-col gap-4">
                <p className="text-[16.5px] leading-[1.66] text-ink">
                  PT Penjaga Utama Indonesia bekerja sama dengan{" "}
                  <span className="font-semibold">Security & Parking Services</span>,
                  bagian dari PT. Primer Utama Indonesia, untuk mendukung
                  kebutuhan layanan Valet Parking.
                </p>
              </div>
            </Reveal>
          </div>

          {/* --- partner mark (logo) + facts --- */}
          <Reveal delay={0.1} className="lg:sticky lg:top-[120px]">
            <div className="border border-[var(--line-hairline)]">
              <div className="flex flex-col items-center gap-3 border-b border-[var(--line-hairline)] bg-[var(--surface-page)] px-5 py-9">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/premier.webp"
                  alt="Premier — Security & Parking Services"
                  className="h-[88px] w-auto max-w-full object-contain"
                />
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-steel">
                  Security & Parking Services
                </span>
              </div>
              <dl className="grid grid-cols-1 sm:grid-cols-2">
                {FACTS.map((f, i) => (
                  <div
                    key={f.k}
                    className={`border-b border-[var(--line-hairline)] px-5 py-4 last:border-b-0 ${
                      i % 2 === 0 && i !== FACTS.length - 1 ? "sm:border-r" : ""
                    } ${
                      i === FACTS.length - 1 && FACTS.length % 2 === 1
                        ? "sm:col-span-2"
                        : ""
                    }`}
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
              Security & Parking Services merupakan mitra layanan valet dan
              entitas hukum yang terpisah dari PT Penjaga Utama Indonesia.
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
