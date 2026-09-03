"use client";

import { useRef } from "react";
import { useReducedMotion, useScroll, useTransform } from "motion/react";
import * as m from "motion/react-m";
import { Container, Eyebrow } from "@/components/kit";
import { Reveal } from "@/components/motion/reveal";

const DATA: { k: string; v: string }[] = [
  { k: "Nama", v: "PT Penjaga Utama Indonesia" },
  { k: "Bidang", v: "Security Service & Valet Parking" },
  {
    k: "Riwayat Valet Partner",
    v: "Premier Valet sejak 2014",
  },
  { k: "Partner Valet", v: "PT. Primer Utama Indonesia / Premier Valet" },
  {
    k: "Alamat Partner",
    v: "Jl. Suryo Pranoto, Harmoni Plaza II Blok I No.5, Petojo Utara, Jakarta Pusat 10130",
  },
];

export function About() {
  const imageRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <section
      id="tentang"
      className="relative overflow-hidden bg-operational py-[72px] md:py-[132px]"
    >
      <Container>
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[6fr_7fr] lg:gap-[80px]">
          {/* --- photo (left) with parallax + diagonal shield crop --- */}
          <Reveal className="lg:sticky lg:top-[120px]">
            <div
              ref={imageRef}
              className="relative h-[380px] overflow-hidden bg-charcoal sm:h-[500px] lg:h-[600px]"
              style={{ clipPath: "var(--clip-shield-tl)" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <m.img
                src="/assets/about-briefing.webp"
                alt="Personel Penjaga Utama saat briefing sebelum penugasan"
                style={{ y: reduce ? 0 : y }}
                className="absolute left-0 top-[-8%] h-[116%] w-full object-cover object-[25%_75%] [will-change:transform]"
              />
            </div>
          </Reveal>

          {/* --- copy + company data (right) --- */}
          <div>
            <Reveal>
              <Eyebrow>Tentang PT Penjaga Utama Indonesia</Eyebrow>
            </Reveal>

            <Reveal delay={0.06}>
              <h2 className="mt-5 max-w-[640px] font-display text-[32px] font-bold uppercase leading-[0.98] text-obsidian sm:text-[38px] md:text-[48px]">
                Membangun rasa aman, menghadirkan kenyamanan.
              </h2>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="mt-6 flex max-w-[620px] flex-col gap-4 sm:mt-8">
                <p className="text-[16.5px] leading-[1.66] text-ink">
                  PT Penjaga Utama Indonesia adalah perusahaan yang bergerak di
                  bidang penyedia layanan keamanan dan Valet Parking yang
                  profesional, dengan fokus pada kepuasan dan kebutuhan klien.
                </p>
                <p className="text-[16.5px] leading-[1.66] text-[#3a3a3a]">
                  Kami hadir untuk memberikan solusi keamanan dan Valet Parking
                  yang inovatif dan terintegrasi dengan teknologi terkini, serta
                  didukung oleh tim profesional yang berpengalaman.
                </p>
                <p className="text-[16.5px] leading-[1.66] text-[#3a3a3a]">
                  Untuk lini Valet Parking, pengalaman operasional kami didukung
                  oleh{" "}
                  <span className="font-semibold text-ink">
                    Premier Valet sejak 2014
                  </span>
                  , sebagai bagian dari PT. Primer Utama Indonesia.
                </p>
                <p className="text-[16.5px] leading-[1.66] text-[#3a3a3a]">
                  Komitmen kami adalah memberikan rasa aman dan nyaman melalui
                  layanan yang dapat diandalkan, efektif, dan responsif.
                </p>
              </div>
            </Reveal>

            {/* --- Data Perusahaan --- */}
            {/* <Reveal delay={0.16}>
              <div className="mt-10 border-t border-[var(--line-hairline)] pt-6 sm:mt-12">
                <span className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-steel">
                  Data Perusahaan
                </span>
                <dl className="mt-4 flex flex-col">
                  {DATA.map((d) => (
                    <div
                      key={d.k}
                      className="grid grid-cols-1 gap-1 border-b border-[var(--line-hairline)] py-4 last:border-b-0 sm:grid-cols-[190px_1fr] sm:gap-6"
                    >
                      <dt className="font-mono text-[11px] uppercase tracking-[0.12em] text-steel">
                        {d.k}
                      </dt>
                      <dd className="text-[15px] leading-[1.5] text-ink">
                        {d.v}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal> */}
          </div>
        </div>
      </Container>
    </section>
  );
}
