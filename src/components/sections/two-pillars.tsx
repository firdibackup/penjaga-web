"use client";

import { ArrowRight } from "lucide-react";
import { Container, Eyebrow } from "@/components/kit";
import { Placeholder } from "@/components/placeholder";
import { Reveal } from "@/components/motion/reveal";

type Pillar = {
  no: string;
  title: string;
  copy: string;
  cta: string;
  href: string;
  photo: string;
  onDark: boolean;
};

const PILLARS: Pillar[] = [
  {
    no: "01",
    title: "Security Services",
    copy: "Menjaga aset, lingkungan, dan orang-orang yang penting bagi Anda.",
    cta: "Explore Security",
    href: "#security",
    photo: "Security Officer · CCTV Overlay",
    onDark: true,
  },
  {
    no: "02",
    title: "Valet Parking",
    copy: "Menciptakan pengalaman kedatangan yang lebih nyaman dan profesional.",
    cta: "Explore Valet",
    href: "#valet",
    photo: "Valet Officer · Luxury Vehicle",
    onDark: false,
  },
];

export function TwoPillars() {
  return (
    <section id="layanan" className="relative bg-operational py-[72px] md:py-[128px]">
      <Container>
        <div className="mx-auto max-w-[760px] text-center">
          <Reveal className="flex justify-center">
            <Eyebrow>Dua Pilar Layanan</Eyebrow>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mt-5 font-display text-[32px] font-bold uppercase leading-[0.98] text-obsidian sm:text-[40px] md:text-[50px]">
              Two services.
              <br className="hidden sm:block" />{" "}
              <span className="text-penjaga">One standard of excellence.</span>
            </h2>
          </Reveal>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:mt-14 lg:grid-cols-2 lg:gap-8">
          {PILLARS.map((p, i) => (
            <Reveal
              key={p.title}
              delay={i * 0.1}
              className="group relative min-h-[440px] overflow-hidden border border-[var(--line-hairline)] md:min-h-[560px]"
            >
              <Placeholder
                label={p.photo}
                onDark={p.onDark}
                parallax
                className="absolute inset-0 h-full w-full"
              />
              <div
                className="absolute inset-0"
                style={{
                  background: p.onDark
                    ? "linear-gradient(180deg, rgba(5,5,5,.15) 0%, rgba(5,5,5,.35) 45%, rgba(5,5,5,.9) 100%)"
                    : "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,.35) 45%, rgba(255,255,255,.94) 100%)",
                }}
              />
              <a
                href={p.href}
                className="absolute inset-0 z-10 flex flex-col justify-end p-7 no-underline md:p-10"
              >
                <span
                  className={`font-mono text-[12px] tracking-[0.14em] ${
                    p.onDark ? "text-penjaga" : "text-penjaga"
                  }`}
                >
                  {p.no}
                </span>
                <h3
                  className={`mt-3 font-display text-[30px] font-bold uppercase leading-[0.98] md:text-[40px] ${
                    p.onDark ? "text-white" : "text-obsidian"
                  }`}
                >
                  {p.title}
                </h3>
                <p
                  className={`mt-3 max-w-[420px] text-[15.5px] leading-[1.55] ${
                    p.onDark ? "text-white/75" : "text-[#3a3a3a]"
                  }`}
                >
                  {p.copy}
                </p>
                <span
                  className={`mt-6 inline-flex items-center gap-2 text-[12.5px] font-semibold uppercase tracking-[0.14em] ${
                    p.onDark ? "text-white" : "text-obsidian"
                  }`}
                >
                  {p.cta}
                  <ArrowRight
                    className="h-4 w-4 text-penjaga transition-transform duration-300 group-hover:translate-x-1.5"
                    strokeWidth={2}
                  />
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
