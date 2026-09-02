"use client";

import Image from "next/image";

import { Container, Eyebrow } from "@/components/kit";
import { Reveal } from "@/components/motion/reveal";

const FACTS: { k: string; v: string }[] = [
  { k: "Brand", v: "Premier Security & Parking Services" },
  { k: "Legal Entity", v: "PT. Primer Utama Indonesia" },
  { k: "Services", v: "Security Services & Parking Services" },
  { k: "Heritage", v: "Diva Valet Parking Service — sejak 2003" },
  { k: "Premier Services", v: "Sejak 2014" },
  { k: "Telepon", v: "+62 21 632 7390" },
  { k: "Email", v: "info@premierutama.co.id" },
];

export function Partner() {
  return (
    <section id="partner" className="relative overflow-hidden bg-obsidian py-[72px] md:py-[128px]">
      <Container>
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[5fr_7fr] lg:gap-[80px]">
          {/* --- statement --- */}
          <div>
            <Reveal>
              <Eyebrow onDark>Our Partner</Eyebrow>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="mt-5 max-w-[520px] font-display text-[30px] font-bold uppercase leading-[1] text-white sm:text-[36px] md:text-[44px]">
                Premier Security & Parking Services — mitra keamanan dan layanan parkir berpengalaman.
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <div className="mt-6 flex max-w-[520px] flex-col gap-4">
                <p className="text-[16.5px] leading-[1.66] text-white/65">
                  PT Penjaga Utama Indonesia bekerja sama dengan{" "}
                  <span className="font-semibold">
                    Premier Security & Parking Services
                  </span>
                  , bagian dari PT. Primer Utama Indonesia, untuk mendukung
                  kebutuhan layanan keamanan dan parkir.
                </p>
              </div>
            </Reveal>

          </div>

          <Reveal delay={0.1} className="lg:pt-[76px]">
            <div className="relative overflow-hidden border border-white/[0.12] bg-charcoal p-2 sm:p-3">
              <div className="pointer-events-none absolute right-0 top-0 h-24 w-24 border-l border-b border-penjaga/30" />
              <div className="pointer-events-none absolute bottom-0 left-0 h-24 w-24 border-r border-t border-penjaga/30" />
              <div className="relative border border-white/[0.12] bg-charcoal">
                <div className="flex flex-col gap-5 border-b border-white/[0.12] bg-white px-5 py-6 sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:px-7 sm:py-7">
                  <Image
                    src="/assets/premier.webp"
                    alt="Premier Security & Parking Services"
                    width={360}
                    height={96}
                    className="h-auto w-[240px] object-contain object-left sm:w-[300px]"
                  />
                  <div className="flex items-center gap-3 sm:flex-col sm:items-end sm:gap-2">
                    <span className="h-2 w-2 bg-penjaga" />
                    <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-steel sm:text-right">
                      Partner profile
                    </span>
                  </div>
                </div>
                <dl className="grid grid-cols-1 sm:grid-cols-2">
                  {FACTS.map((f, i) => (
                    <div
                      key={f.k}
                      className={`px-5 py-4 sm:px-6 sm:py-5 ${
                        i % 2 === 0 ? "sm:border-r" : ""
                      } border-b border-white/[0.12] last:border-b-0 sm:[&:nth-last-child(2)]:border-b-0`}
                    >
                      <dt className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-white/40">
                        {f.k}
                      </dt>
                      <dd className="mt-1 text-[14.5px] leading-[1.4] text-white/75">
                        {f.v}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
            <p className="mt-4 text-[12.5px] leading-[1.5] text-white/40">
              Premier Security & Parking Services merupakan mitra layanan
              keamanan dan parkir serta entitas hukum yang terpisah dari PT
              Penjaga Utama Indonesia.
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
