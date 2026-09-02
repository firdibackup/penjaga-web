"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { Building2, CalendarDays, Factory, Home, Hotel, Store, UtensilsCrossed } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useAnimate } from "motion/react";
import { Container, Eyebrow } from "@/components/kit";
import { Reveal } from "@/components/motion/reveal";

const SECTORS: { icon: LucideIcon; label: string; note: string }[] = [
  { icon: Building2, label: "Corporate", note: "Gedung kantor & lingkungan perusahaan" },
  { icon: Factory, label: "Industrial", note: "Fasilitas & area industri" },
  { icon: Home, label: "Residential", note: "Perumahan & lingkungan hunian" },
  { icon: Hotel, label: "Hospitality", note: "Hotel & resort" },
  { icon: UtensilsCrossed, label: "F&B", note: "Restoran & kafe" },
  { icon: Store, label: "Commercial", note: "Pusat perbelanjaan & area komersial" },
  { icon: CalendarDays, label: "Event", note: "Konser, seminar, konferensi, pameran" },
];

const CLIENTS: { src: string; name: string }[] = [
  { src: "/assets/our-client/grand-indonesia.webp", name: "Grand Indonesia" },
  { src: "/assets/our-client/pasific-place_converted.webp", name: "Pacific Place" },
  { src: "/assets/our-client/senayan_city.webp", name: "Senayan City" },
  { src: "/assets/our-client/kuningan_converted.webp", name: "Kuningan City" },
  { src: "/assets/our-client/thamrin-city_converted.webp", name: "Thamrin City" },
  { src: "/assets/our-client/ciputra_converted.webp", name: "Ciputra" },
  { src: "/assets/our-client/Hotel_Indonesia_Kempinski_Jakarta_logo.webp", name: "Hotel Indonesia Kempinski" },
  { src: "/assets/our-client/JW-Marriott-Logo_converted.webp", name: "JW Marriott" },
  { src: "/assets/our-client/Westin_Hotels_Logo.webp", name: "Westin Hotels" },
  { src: "/assets/our-client/Lotte_Mart_(2023).webp", name: "Lotte Mart" },
  { src: "/assets/our-client/elysee_logo_v04_converted.webp", name: "Elysée" },
  { src: "/assets/our-client/DGC_converted.webp", name: "DGC" },
  { src: "/assets/our-client/amanaia.webp", name: "Amanaia" },
  { src: "/assets/our-client/SKG-logo_converted.webp", name: "SKG" },
  { src: "/assets/our-client/mbh_converted.webp", name: "MBH" },
  { src: "/assets/our-client/logo-new-color_converted.webp", name: "Logo New Color" },
  { src: "/assets/our-client/logo_converted.webp", name: "Logo" },
];

export function Industries() {
  const [marqueeScope, animateMarquee] = useAnimate();
  const marqueeControls = useRef<ReturnType<typeof animateMarquee> | null>(null);

  useEffect(() => {
    const controls = animateMarquee(
      marqueeScope.current,
      { x: ["0%", "-50%"] },
      { duration: 60, ease: "linear", repeat: Infinity },
    );

    marqueeControls.current = controls;
    return () => controls.stop();
  }, [animateMarquee, marqueeScope]);

  return (
    <section id="sektor" className="relative bg-operational py-[72px] md:py-[128px]">
      <Container>
        <div className="max-w-[720px]">
          <Reveal>
            <Eyebrow>Industries</Eyebrow>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mt-5 font-display text-[32px] font-bold uppercase leading-[0.98] text-obsidian sm:text-[38px] md:text-[46px]">
              Dibangun untuk berbagai lingkungan.
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-5 max-w-[560px] text-[16px] leading-[1.62] text-[#3a3a3a]">
              Layanan kami mendukung beragam sektor dengan kebutuhan keamanan dan
              kenyamanan yang berbeda-beda.
            </p>
          </Reveal>
        </div>

        <div className="mt-10 grid grid-cols-2 border-l border-t border-[var(--line-hairline)] sm:grid-cols-3 md:mt-14 lg:grid-cols-7">
          {SECTORS.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal
                key={s.label}
                delay={i * 0.05}
                className="group relative flex flex-col gap-4 border-b border-r border-[var(--line-hairline)] bg-white p-5 transition-colors duration-300 hover:bg-[var(--surface-page)]"
              >
                <Icon
                  className="h-8 w-8 text-obsidian transition-colors duration-300 group-hover:text-penjaga"
                  strokeWidth={1.5}
                />
                <div>
                  <div className="font-display text-[17px] font-semibold uppercase leading-none text-obsidian">
                    {s.label}
                  </div>
                  <p className="mt-2 text-[12px] leading-[1.45] text-steel">
                    {s.note}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* --- our clients --- */}
        <div className="mt-16 border-t border-[var(--line-hairline)] pt-12 md:mt-24 md:pt-16">
          <Reveal>
            <Eyebrow>Our Clients</Eyebrow>
          </Reveal>
          <Reveal delay={0.06}>
            <h3 className="mt-4 max-w-[560px] font-display text-[24px] font-bold uppercase leading-[1] text-obsidian sm:text-[28px] md:text-[32px]">
              Dipercaya oleh berbagai brand dan properti.
            </h3>
          </Reveal>

          <Reveal delay={0.12}>
            <div
              className="relative mt-8 overflow-hidden md:mt-10"
              onMouseEnter={() => marqueeControls.current?.pause()}
              onMouseLeave={() => marqueeControls.current?.play()}
            >
              <div ref={marqueeScope} className="flex w-max will-change-transform">
                {[0, 1].map((copy) => (
                  <div key={copy} className="flex shrink-0" aria-hidden={copy === 1}>
                    {CLIENTS.map((c) => (
                      <div
                        key={`${copy}-${c.src}`}
                        title={c.name}
                        className="group mr-4 flex h-[104px] w-[176px] shrink-0 items-center justify-center border border-[var(--line-hairline)] bg-white px-6 transition-colors duration-300 hover:border-penjaga/40 sm:mr-6 sm:h-[116px] sm:w-[200px]"
                      >
                        <Image
                          src={c.src}
                          alt={c.name}
                          width={320}
                          height={160}
                          className="h-auto max-h-[56px] w-auto max-w-full object-contain opacity-70 grayscale transition duration-300 group-hover:opacity-100 group-hover:grayscale-0"
                        />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
