"use client";

import Image from "next/image";
import { ArrowUpRight, ShieldCheck, Building2, CalendarDays, Footprints } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Container, Eyebrow } from "@/components/kit";
import { Reveal } from "@/components/motion/reveal";

type Service = {
  no: string;
  icon: LucideIcon;
  title: string;
  body: string;
  photo: string;
  alt: string;
};

const SERVICES: Service[] = [
  {
    no: "01",
    icon: ShieldCheck,
    title: "Jasa Keamanan Pribadi",
    body: "Pengamanan individu untuk keperluan pribadi, eksekutif, atau keluarga yang membutuhkan perlindungan lebih intensif dalam kegiatan sehari-hari.",
    photo: "/assets/service-security/pengawal-pribadi.webp",
    alt: "Petugas pengawal pribadi profesional",
  },
  {
    no: "02",
    icon: Building2,
    title: "Keamanan Properti & Gedung",
    body: "Pengamanan perumahan, perkantoran, fasilitas industri, serta tempat umum dengan pengawasan 24/7 melalui CCTV dan perangkat keamanan lainnya.",
    photo: "/assets/service-security/jaga-gedung.webp",
    alt: "Petugas keamanan menjaga gedung",
  },
  {
    no: "03",
    icon: CalendarDays,
    title: "Keamanan Acara & Event",
    body: "Pengamanan untuk berbagai jenis acara seperti konser, seminar, konferensi, dan event lainnya.",
    photo: "/assets/service-security/jasa-konser.webp",
    alt: "Petugas keamanan mengamankan acara konser",
  },
  {
    no: "04",
    icon: Footprints,
    title: "Patroli Keamanan",
    body: "Patroli rutin untuk membantu mencegah potensi ancaman atau kejadian yang tidak diinginkan di area yang telah disepakati.",
    photo: "/assets/service-security/patroli-keamanan.webp",
    alt: "Petugas melakukan patroli keamanan",
  },
];

export function SecurityServices() {
  return (
    <section id="security" className="relative bg-white py-[72px] md:py-[128px]">
      <Container>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[5fr_7fr] lg:items-end lg:gap-16">
          <div>
            <Reveal>
              <Eyebrow>Security Services</Eyebrow>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="mt-5 max-w-[440px] font-display text-[30px] font-bold uppercase leading-[1] text-obsidian sm:text-[36px] md:text-[44px]">
                Pengamanan profesional untuk berbagai kebutuhan.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.12}>
            <p className="max-w-[520px] text-[16.5px] leading-[1.66] text-[#3a3a3a] lg:pb-2">
              Kami menyediakan layanan pengamanan yang dapat disesuaikan dengan
              kebutuhan individu maupun organisasi, dengan dukungan personel
              profesional dan sistem keamanan terintegrasi.
            </p>
          </Reveal>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 md:mt-14">
          {SERVICES.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal
                key={s.title}
                delay={(i % 2) * 0.08}
                className="group flex flex-col border border-[var(--line-hairline)] bg-white"
              >
                <div className="relative h-[220px] overflow-hidden sm:h-[240px]">
                  <Image
                    src={s.photo}
                    alt={s.alt}
                    fill
                    sizes="(max-width: 639px) 100vw, 50vw"
                    className="object-cover transition-transform duration-[900ms] ease-[var(--ease-standard)] group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-black/10" />
                  <span className="absolute left-4 top-4 z-20 inline-flex h-9 w-9 items-center justify-center border border-white/25 bg-obsidian/70 text-penjaga backdrop-blur-sm">
                    <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
                  </span>
                </div>
                <div className="relative flex flex-1 flex-col p-6 md:p-7">
                  <span className="absolute inset-x-0 top-0 h-[2px] overflow-hidden">
                    <span className="block h-full w-full -translate-x-full bg-penjaga transition-transform duration-300 ease-[var(--ease-standard)] group-hover:translate-x-0" />
                  </span>
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-display text-[21px] font-semibold uppercase leading-[1.05] text-obsidian">
                      {s.title}
                    </h3>
                    <span className="font-mono text-[12px] tracking-[0.1em] text-steel">
                      {s.no}
                    </span>
                  </div>
                  <p className="mt-3 flex-1 text-[14.5px] leading-[1.6] text-[#3a3a3a]">
                    {s.body}
                  </p>
                  <ArrowUpRight
                    className="mt-5 h-5 w-5 text-steel transition-[color,transform] duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5 group-hover:text-penjaga"
                    strokeWidth={1.75}
                  />
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
