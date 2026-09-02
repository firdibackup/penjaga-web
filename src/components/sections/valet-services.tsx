"use client";

import Image from "next/image";
import { ArrowRight, Briefcase, CalendarDays, Hotel, ShoppingBag, UtensilsCrossed } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Container, Eyebrow } from "@/components/kit";
import { Reveal } from "@/components/motion/reveal";

type Valet = {
  icon: LucideIcon;
  title: string;
  body: string;
  photo: string;
  alt: string;
};

const VALET: Valet[] = [
  {
    icon: Hotel,
    title: "Hotel & Resort",
    body: "Layanan valet elegan dan profesional untuk pengalaman kedatangan tamu yang lebih nyaman.",
    photo: "/assets/valet-service/hotel.webp",
    alt: "Layanan valet di hotel dan resort",
  },
  {
    icon: UtensilsCrossed,
    title: "Restoran & Kafe",
    body: "Membantu pelanggan menikmati pengalaman bersantap tanpa repot mencari tempat parkir.",
    photo: "/assets/valet-service/restoran.webp",
    alt: "Layanan valet di restoran dan kafe",
  },
  {
    icon: ShoppingBag,
    title: "Pusat Perbelanjaan",
    body: "Solusi valet untuk kenyamanan pelanggan di area komersial dengan kebutuhan parkir tinggi.",
    photo: "/assets/valet-service/pusat-pembelanjaan.webp",
    alt: "Layanan valet di pusat perbelanjaan",
  },
  {
    icon: CalendarDays,
    title: "Event",
    body: "Layanan valet untuk pernikahan, konser, konferensi, dan pameran.",
    photo: "/assets/valet-service/event.webp",
    alt: "Layanan valet untuk acara dan event",
  },
  {
    icon: Briefcase,
    title: "Perusahaan & Kantor",
    body: "Layanan valet untuk perusahaan dan kantor yang mengutamakan kenyamanan eksekutif dan tamu.",
    photo: "/assets/valet-service/kantor.webp",
    alt: "Layanan valet di perusahaan dan kantor",
  },
];

export function ValetServices() {
  return (
    <section id="valet" className="relative bg-operational py-[72px] md:py-[128px]">
      <Container>
        <div className="max-w-[720px]">
          <Reveal>
            <Eyebrow>Valet Parking</Eyebrow>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mt-5 font-display text-[32px] font-bold uppercase leading-[0.98] text-obsidian sm:text-[40px] md:text-[48px]">
              First impression starts at the entrance.
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-5 max-w-[560px] text-[16.5px] leading-[1.66] text-[#3a3a3a]">
              Layanan valet profesional untuk menciptakan pengalaman kedatangan
              yang nyaman, cepat, dan terorganisir bagi tamu maupun pelanggan.
            </p>
          </Reveal>
        </div>

        {/* mobile: snap carousel · desktop: grid */}
        <div className="-mx-4 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:mt-14 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0 md:pb-0">
          {VALET.map((v, i) => {
            const Icon = v.icon;
            return (
              <Reveal
                key={v.title}
                delay={(i % 3) * 0.08}
                className="group flex w-[80%] shrink-0 snap-start flex-col border border-[var(--line-hairline)] bg-white md:w-auto"
              >
                <div className="relative h-[190px] overflow-hidden">
                  <Image
                    src={v.photo}
                    alt={v.alt}
                    fill
                    sizes="(max-width: 767px) 80vw, 33vw"
                    className="object-cover transition-transform duration-[900ms] ease-[var(--ease-standard)] group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10" />
                  <span className="absolute left-4 top-4 z-20 inline-flex h-9 w-9 items-center justify-center border border-[var(--line-hairline)] bg-white text-penjaga">
                    <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
                  </span>
                </div>
                <div className="relative flex flex-1 flex-col p-6">
                  <span className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-penjaga transition-transform duration-300 ease-[var(--ease-standard)] group-hover:scale-x-100" />
                  <h3 className="font-display text-[20px] font-semibold uppercase leading-[1.05] text-obsidian">
                    {v.title}
                  </h3>
                  <p className="mt-3 text-[14px] leading-[1.6] text-[#3a3a3a]">
                    {v.body}
                  </p>
                </div>
              </Reveal>
            );
          })}

          {/* CTA cell fills the 6th slot on desktop */}
          <Reveal
            delay={0.16}
            className="hidden flex-col justify-between border border-penjaga bg-penjaga p-6 md:flex"
          >
            <span className="font-display text-[22px] font-bold uppercase leading-[1.05] text-white">
              Butuh valet untuk lokasi lain?
            </span>
            <a
              href="#kontak"
              className="mt-6 inline-flex items-center gap-2 text-[12.5px] font-semibold uppercase tracking-[0.14em] text-white no-underline"
            >
              Konsultasikan Kebutuhan
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2} />
            </a>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
